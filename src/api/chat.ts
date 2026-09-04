import { apiURL, apiVersion } from "../config/get-env"
import { makeHttpReq } from "../helper/makeHttpReq"
import type { ChatHistoryReturnType, FetchChatHistoryProps, IHumanDecision } from "../types/chat-types"


export async function fetchChatHistory(props: FetchChatHistoryProps): Promise<ChatHistoryReturnType> {
  const { userId, threadId ,agentId} = props
  const data = await makeHttpReq('GET', `chathistory?userId=${userId}&threadId=${threadId}&agentId=${agentId}`) as ChatHistoryReturnType
  return data
}




export type ChatInputProps = {
  message: string
  agentId:string
  userId: string
  threadId:string
  takeOverChat:boolean
  sender:string
  
}


export async function chat(props: ChatInputProps) {
  const { userId, message,agentId,threadId,sender ,takeOverChat} = props

  const res = await fetch(`${apiURL}/api/${apiVersion}/chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream",
    },

    body: JSON.stringify({
      userId,
      threadId,
      message,
      agentId,
    sender,
    takeOverChat
    }),
  });
  return res
}



export async function testAgentChat(props: Omit<ChatInputProps, "sender" | "takeOverChat">) {
  const { userId, message,agentId,threadId} = props

  const res = await fetch(`${apiURL}/api/${apiVersion}/test-chats`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Accept": "text/event-stream",
    },

    body: JSON.stringify({
      userId,
      threadId,
      message,
      agentId,
    }),
  });
  return res
}











