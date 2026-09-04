import {
  Copy,
  Globe,
  UserCircle2,
} from "lucide-react";

export default function VisitorProfile() {
  return (
    <div className="border-b border-slate-800 p-6">

      {/* Avatar */}

      <div className="flex items-start gap-4">

        <div className="flex h-16 w-16 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-violet-600 text-lg font-bold text-white">

          UV

        </div>

        <div className="flex-1">

          <div className="flex items-center gap-2">

            <h2 className="text-lg font-semibold text-white">

              Unknown Visitor

            </h2>

            <span className="rounded-full border border-slate-700 bg-slate-900 px-2 py-0.5 text-xs text-slate-400">

              Unknown

            </span>

          </div>

          <p className="mt-2 text-sm leading-6 text-slate-400">

            No identification has been collected yet.

          </p>

        </div>

      </div>

      {/* Visitor ID */}

      <div className="mt-6 rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex items-center justify-between">

          <div>

            <p className="text-xs uppercase tracking-widest text-slate-500">

              Visitor ID

            </p>

            <p className="mt-2 font-mono text-sm text-slate-300">

              07b762e7-aef2-4728-8b6f...

            </p>

          </div>

          <button className="rounded-lg p-2 transition hover:bg-slate-800">

            <Copy
              size={16}
              className="text-slate-400"
            />

          </button>

        </div>

      </div>

      {/* Status */}

      <div className="mt-6 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-emerald-500/10 p-2">

            <Globe
              size={18}
              className="text-emerald-400"
            />

          </div>

          <div>

            <p className="text-sm font-medium text-white">

              Active Session

            </p>

            <p className="text-xs text-slate-400">

              Visitor is currently online

            </p>

          </div>

        </div>

        <div className="h-2.5 w-2.5 rounded-full bg-emerald-400" />

      </div>

      {/* Owner */}

      <div className="mt-4 flex items-center justify-between rounded-xl border border-slate-800 bg-slate-900 p-4">

        <div className="flex items-center gap-3">

          <div className="rounded-lg bg-indigo-500/10 p-2">

            <UserCircle2
              size={18}
              className="text-indigo-400"
            />

          </div>

          <div>

            <p className="text-sm font-medium text-white">

              Assigned To

            </p>

            <p className="text-xs text-slate-400">

              AI Sales Agent

            </p>

          </div>

        </div>

      </div>

    </div>
  );
}