import {
  Bot,
  User,
  Loader2,
  Hand,
  CheckCircle2
} from "lucide-react";

import { MarkDownFormatter } from "./MarkDownFormatter";
import type { IHumanDecision, ChatMessage } from "../../../types/chat-types";

export interface ChatMessageProps extends ChatMessage {
  id?: string
  onSend: (text: string, resumeDecision?: IHumanDecision) => Promise<void>;
}





export function ChatMessage({
  role,
  loading,
  content,
  humanTakeOver,
  hitl,
  id,
  onSend
}: ChatMessageProps) {

  const isAgent = role?.toLowerCase() === "ai"
  const isHumanTakeOver = role?.toLowerCase() === "humanTakeOver"


  


  return (
    <div
      className={`
        flex gap-3 mb-6
        ${isAgent ? "justify-start" : "justify-end"}
      `}
    >


      {/* Visitor Avatar */}
      {!isAgent && (
        <div
          className="
            order-2
            flex h-9 w-9 shrink-0
            items-center justify-center
            rounded-full
            border border-zinc-800
            bg-zinc-900
          "
        >
          <User
            size={17}
            className="text-zinc-400"
          />
        </div>
      )}



      <div
        className={`
          max-w-[80%]
          space-y-2
          ${isAgent ? "items-start" : "items-end"}
        `}
      >


        {/* Agent Header */}
        {isAgent && (
          <div className="
            flex items-center gap-2
            ml-1
            text-xs
          ">
            <div
              className="
                flex h-6 w-6
                items-center justify-center
                rounded-full
                border border-indigo-500/20
                bg-indigo-500/10
              "
            >
              

               {humanTakeOver?(
              <User
                size={13}
                className="text-green-500"
              />
            ):(
              <Bot
                size={13}
                className="text-indigo-400"
              />
            ) }  
            </div>

            <span className="font-medium ">
            {humanTakeOver?(
              <div className="text-green-500 ">
                Human
              </div>
            ):(
              <div className="text-indigo-400"></div>
            ) }   
            </span>


            
          </div>
        )}






        {/* Message Bubble */}
        {content && (
          <div
            className={`
              rounded-lg
              
              shadow-sm

              ${isAgent
                ? `
                  border-indigo-500/20
                  bg-indigo-500/5
                  text-zinc-200
                `
                :
                `border
              px-3 py-2
                  bg-zinc-900
                  text-zinc-100
                `
              }
            `}
          >

            <div
              className="
                prose prose-invert
                prose-sm
                max-w-none

                prose-p:leading-7

                prose-code:text-xs
                prose-code:bg-zinc-800
                prose-code:px-1
                prose-code:rounded

                prose-pre:bg-[#111]
                prose-pre:border
                prose-pre:border-zinc-800
              "
            >
              <MarkDownFormatter text={content} />
            </div>



          </div>
        )}




    


        {/* Footer */}
        <div
          className={`
            flex items-center gap-2
            px-1
            text-[11px]
            text-zinc-600

            ${isAgent ? "" : "justify-end"}
          `}
        >

          {loading ? (
            "Generating..."
          ) : (
            <>
              <CheckCircle2 size={12} />
              Delivered
            </>
          )}

        </div>

      </div>





    </div>
  );
}