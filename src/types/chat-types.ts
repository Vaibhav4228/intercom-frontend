

export interface IHumanDecision {
  chatHistoryId:string
  numberOfActionRequest:number;
  threadId: string;
  type: "approve" | "reject"
}

export type HITLActionType = {
  status: boolean,
  action?: {
    id: string
    interruptId:string
    tool_name: string,
    tool_description: string,
    args: Record<string, any>
    numberOfActionRequest:number
  }

}
export interface HITLApprovalCardProps {
  hitl: HITLActionType
  onApprove: () => void | Promise<void>;
  onReject: () => void | Promise<void>;
}
export type ChatMessage = {

  role: 'ai' | 'user',
  content: string
  thinking: string
  userId: string
  threadId: string
  loading?: boolean
  hitl: HITLActionType
  humanTakeOver?:boolean
}


export type ChatHistoryReturnType = { messages: ChatMessage[] }

export type FetchChatHistoryProps= { userId: string,threadId:string ,agentId:string }
