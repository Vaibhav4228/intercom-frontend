
import { useEffect, useRef, useState } from "react";
import { addAIPlaceholder, addUserAndAiPlaceholder, addUserPlaceholder, appendToLastAiMessage, getChatHistory } from "../../../stores/chatSlice";
import { chat } from "../../../api/chat";
import type { IHumanDecision } from "../../../types/chat-types";
import { useDispatch, useSelector } from "react-redux";
import type { AppDispatch, RootState } from "../../../stores";
import { ChatMessage } from "./ChatMessage";
import { ChatInput } from "./ChatInput";
import { getUserId } from "../../../helper/getUserData";
import { wsURL } from "../../../config/get-env";
import TakeOverBar from "./TakeOverBar";
import { makeHttpReq } from "../../../helper/makeHttpReq";

interface ChatWindowProps {
  userId: string
  agentId: string
  threadId: string
  page: "embedded"
}
export default function ChatWindow(props: ChatWindowProps) {


  const dispatch = useDispatch<AppDispatch>();
  const { messages } = useSelector((state: RootState) => state.chat)

  const bottomRef = useRef<HTMLDivElement | null>(null);

  const params = new URLSearchParams(window.location.search);
  const sessionId = params.get("sessionId");
  const agentIdFromUrl = params.get("agentId");


  const isEmbeddedPage = props.page === "embedded"
  const userId = isEmbeddedPage ? props.userId : getUserId() as string
  const agentId = isEmbeddedPage ? props.agentId : agentIdFromUrl as string
  const threadId = isEmbeddedPage ? props.threadId : sessionId as string
  let sender = isEmbeddedPage ? "user" : "admin"


  const [takeOverChat, setTakeOverChat] = useState(false)


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


      const res = await chat({
        agentId,
        userId,
        threadId,
        message: userMessage,
        sender,
        takeOverChat,
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



  //change to human
  const isFirstRender = useRef(true);
  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    async function backToAI() {
      await makeHttpReq("GET", "ai-take-over?actor=ai");
    }

    async function backToHuman() {
      await makeHttpReq("GET", "ai-take-over?actor=human");
    }

    if (!takeOverChat) {
      backToAI();
    }
    if (takeOverChat) {
      backToHuman()
    }
  }, [takeOverChat]);








  useEffect(() => {
    const ws = new WebSocket('ws://localhost:3001');

    ws.onopen = () => {
      console.log("Connected");
    };

    ws.onmessage = (event) => {
      const data = JSON.parse(event.data);
      switch (data.type) {
        case "CONTENT":
          if (!isEmbeddedPage && data.type == "CONTENT") {
            dispatch(appendToLastAiMessage(data.message));
          }
          break;

        case "userMessage":
          if (!isEmbeddedPage) {
            if (data.type === "userMessage") {
              dispatch(
                addUserAndAiPlaceholder({
                  role: "ai", userId, thinking: "", threadId: "", content: data.message, loading: true, hitl: { status: false }
                })
              );
            }

          }
          break;


        case "takeOverChat":


          if (data.sender === sender) {
            // show human message in customer widget
            setTakeOverChat(data.takeOverChat)

          } else {

            if (data.message) {
              dispatch(
                addAIPlaceholder({
                  role: "ai", userId, thinking: "", threadId: "", content: data?.message, loading: true, hitl: { status: false }
                })
              );
            }

            setTakeOverChat(data.takeOverChat)

          }

          break;

      }
    };

    ws.onclose = () => {
      console.log("Disconnected");
    };

    ws.onerror = (err) => {
      console.error(err);
    };

    return () => {
      console.log("Closing websocket");
      ws.close();
    };

  }, []);


  return (
    <div className="h-full flex flex-col bg-slate-950">

      {/* ================= SCROLLABLE CHAT ================= */}
      <div className="flex-1 overflow-y-auto px-8 py-8 space-y-8 custom-scrollbar">

        {messages.map((message, i) => (
          <ChatMessage key={i} {...message} onSend={() => ""} />
        ))}

        <div ref={bottomRef} />

      </div>

      {(<span
        className={`inline-flex items-center rounded-md px-3 py-1 text-xs font-semibold ${takeOverChat
          ? "bg-green-600 text-white"
          : "bg-indigo-600 text-white"
          }`}
      >
        {takeOverChat ? "Human Take over Chat" : "AI Take over Chat"}
      </span>)}


      {!takeOverChat && !isEmbeddedPage
        ? (<div onClick={() => setTakeOverChat(true)}>
          <TakeOverBar />
        </div>) :
        <ChatInput onTakeOverChat={() => setTakeOverChat(false)} loading={loading} onSend={sendMessage} />
      }




    </div>
  );
}