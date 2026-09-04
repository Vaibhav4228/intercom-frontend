import ChatWindow from "../../components/admin/chat/ChatWindow";

export default function EmbeddedPage() {

  const params = new URLSearchParams(window.location.search);

const userId = params.get("userId");
const agentId = params.get("agentId");
const sessionId = params.get("sessionId");

  return (

        <ChatWindow
        threadId={sessionId}
        page="embedded"
         agentId={agentId}
         userId={userId} />
  );
}