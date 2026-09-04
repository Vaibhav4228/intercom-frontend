import { Bot, Briefcase, Check, Copy, Pencil, Tag, Target, UserCircle2 } from "lucide-react";
import { useState } from "react";
import { getUserId } from "../../../helper/getUserData";


export interface Agent {
  _id: string;
  name: string;
  goal: string;
  persona: string;
  companyContext: string;
  category: string;
}

interface AgentCardProps {
  agent: Agent;
  onEdit: (agent: Agent) => void;
}


export default function AgentCard({
  agent,
  onEdit,
}: AgentCardProps) {

  const [copied, setCopied] = useState(false);
const userId=getUserId()

  const copyToClipboard = async () => {
    const embedCode = `<script
  src="http://localhost:5173/sdk/chat-sdk.js"
  data-agent-id="${agent._id}"
  data-user-id="${userId}"
></script>`;

    await navigator.clipboard.writeText(embedCode);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  };


  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">

      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600/10 text-indigo-400">
          <Bot className="h-6 w-6" />
        </div>

        <div className="flex gap-2">

          <button
            onClick={copyToClipboard}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
            title="Copy embed code"
          >
            {copied ? (
              <Check className="h-4 w-4 text-green-400" />
            ) : (
              <Copy className="h-4 w-4" />
            )}
          </button>


          <button
            onClick={() => onEdit(agent)}
            className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white"
          >
            <Pencil className="h-4 w-4" />
          </button>

        </div>
      </div>


      <h2 className="mt-5 text-lg font-semibold text-white">
        {agent.name}
      </h2>


      <div className="mt-6">
        <span className="inline-flex items-center gap-2 rounded-full bg-indigo-600/10 px-3 py-1 text-xs font-medium text-indigo-400">
          <Tag className="h-3 w-3" />
          {agent.category}
        </span>
      </div>

    </div>
  );
}