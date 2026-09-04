
import { useEffect, useRef, useState } from "react";
import { addAIPlaceholder, addUserAndAiPlaceholder, addUserPlaceholder, appendToLastAiMessage, getChatHistory } from "../../../stores/chatSlice";
import { chat, testAgentChat } from "../../../api/chat";
import type { IHumanDecision } from "../../../types/chat-types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../stores";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { getUserId } from "../../../helper/getUserData";



interface TestChatWindowProps{
        agentId:string
}

export default function TestChatWindow({agentId}:TestChatWindowProps) {


  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: RootState) => state.chat)

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const userId = getUserId() as string
  const threadId = 'randomThreadid01'

  const [loading, setLoading] = useState(false)

  const userMessageRef = useRef<string[]>([]);
  const typingRef = useRef(false);






  const typeNextUserMessage = () => {
    if (userMessageRef.current.length === 0) {
      typingRef.current = false;
      return;
    }

    typingRef.current = true;
    const chunk = userMessageRef.current
      .splice(0, 18)
      .join("");

    dispatch(appendToLastAiMessage(chunk));
    setTimeout(typeNextUserMessage, 3);
  };



  const sendMessage = async (input: string, resumeDecision?: IHumanDecision) => {
    const userMessage = input.trim();

    if (!userMessage && !resumeDecision) return;
    userMessageRef.current = [];



    dispatch(
      addUserAndAiPlaceholder({
        role: "ai", userId, thinking: "", threadId: "", content: userMessage, loading: true, hitl: { status: false }
      })
    );


    try {
      setLoading(true);


      const res = await testAgentChat({
        agentId,
        userId,
        threadId,
        message: userMessage,
  
      });

      if (!res.body) return;
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let buffer = "";


      while (true) {
        const { value, done } = await reader.read();
        if (done) break;


        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split("\n");
        buffer = lines.pop() ?? "";

        let currentEvent = "";


        for (const line of lines) {
          const trimmed = line.trim();
          if (!trimmed) continue;



          if (trimmed.startsWith("event:")) {
            currentEvent = trimmed.replace("event:", "").trim();
          }
          else if (trimmed.startsWith("data:")) {
            const payload = trimmed.replace("data:", "").trim();
            const data = JSON.parse(payload);
            // 2. HANDLE CONTENT
            if (data.message !== undefined && data.message !== null) {
              for (const char of data.message) {
                userMessageRef.current.push(char);
              }
              if (!typingRef.current) typeNextUserMessage();
            }



          }



          // Handle End/Error
          if (currentEvent === "end" || currentEvent === "error") {
            setLoading(false);
            reader.cancel();
          }
        }
      }
    } catch (err) {
      setLoading(false);
      console.error("Streaming error:", err);
    } finally {
      setLoading(false);
    }
  };

  /* ---------------- AUTO SCROLL ---------------- */
  useEffect(() => {
    if (messages) {
      bottomRef.current?.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);



  useEffect(() => {
    if (userId) {
      dispatch(getChatHistory({
        userId: userId,
        threadId,
        agentId
      }));
    }
  }, [userId, dispatch]);




  return (
    <div className="h-full flex flex-col bg-slate-950">

      {/* ================= SCROLLABLE CHAT ================= */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">

        {messages.map((message, i) => (
          <ChatMessage key={i} {...message} onSend={() => ""} />
        ))}

        <div ref={bottomRef} />

      </div>

   

        <ChatInput onTakeOverChat={() => ""} loading={loading} onSend={sendMessage} />




    </div>
  );
}