import { Clock, Calendar, Eye } from "lucide-react";
import { useNavigate } from "react-router";
export interface Session {
  _id: string;
  title?: string;
  duration: number;
  status: "active" | "inactive";
  threadId:string
  agentId:string
  createdAt: string;
  updatedAt: string;
}

interface SessionTableProps {
  sessions: Session[];
}

export default function SessionTable({
  sessions,
}: SessionTableProps) {

  const navigate = useNavigate();

  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="border-b border-slate-800 bg-slate-950">
          <tr>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Session
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Duration
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Status
            </th>

            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              Created At
            </th>
            <th className="px-6 py-4 text-left text-sm font-medium text-slate-400">
              View Session
            </th>
          </tr>
        </thead>

        <tbody>
          {sessions.length === 0 ? (
            <tr>
              <td
                colSpan={4}
                className="px-6 py-12 text-center text-slate-500"
              >
                No sessions found.
              </td>
            </tr>
          ) : (
            sessions.map((session) => (
              <tr
                key={session._id}
                className="border-b border-slate-800 transition hover:bg-slate-800/40 last:border-0"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-lg bg-indigo-600/20 p-2">
                      <Clock className="h-5 w-5 text-indigo-400" />
                    </div>

                    <div>
                      <p className="font-medium text-white">
                        {session.title || "Untitled Session"}
                      </p>

                      <p className="text-xs text-slate-500">
                        {session._id}
                      </p>
                    </div>
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
                  {Math.floor(session.duration / 60)}m{" "}
                  {session.duration % 60}s
                </td>

                <td className="px-6 py-4">
                  <span
                    className={`
                      rounded-full px-3 py-1 text-xs font-medium
                      ${session.status === "active"
                        ? "bg-green-500/20 text-green-400"
                        : session.status === "inactive"
                          ? "bg-blue-500/20 text-blue-400"
                          : "bg-red-500/20 text-red-400"
                      }
                    `}
                  >
                    {session.status}
                  </span>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(session.createdAt).toLocaleString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </div>
                </td>

                <td className="px-6 py-4 text-sm text-slate-400">
  <button
    onClick={() => navigate(`/admin/chats?sessionId=${session.threadId}&agentId=${session.agentId}`)}
    className="
      inline-flex
      items-center
      gap-2
      rounded-lg
      bg-indigo-600/10
      px-3
      py-2
      text-sm
      font-medium
      text-indigo-400
      transition
      hover:bg-indigo-600/20
      hover:text-indigo-300
    "
  >
    <Eye className="h-4 w-4" />
    View Session
  </button>
</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}