import ChatWindow from "../../components/admin/chat/ChatWindow";
import VisitorPanel from "../../components/admin/chat/VisitorPanel";

export default function ChatPage() {
  return (
    <div className="h-[calc(100vh-120px)] rounded-2xl overflow-hidden border border-slate-800 bg-slate-900 flex">

      <div className="flex-1 min-w-0">
        <ChatWindow />
      </div>

      <div className="hidden xl:flex w-[380px] border-l border-slate-800 bg-slate-950">
        <VisitorPanel />
      </div>

    </div>
  );
}