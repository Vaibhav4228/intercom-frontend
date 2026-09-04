import {
  Activity,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";

export default function Dashboard() {
  return (
    <div className="max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-bold text-white tracking-tight">
          Analytics
        </h1>

        <p className="mt-1 text-sm text-slate-400">
          Review platform performance, usage metrics, system health, and
          operational insights.
        </p>
      </div>

      {/* Metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Active Handshakes
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">1,482</h2>
          </div>

          <div className="rounded-xl border border-indigo-500/10 bg-indigo-600/10 p-3 text-indigo-400">
            <Activity className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900 p-5">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              Conversion Rate
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">23.8%</h2>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-emerald-600/10 p-3 text-emerald-400">
            <TrendingUp className="w-5 h-5" />
          </div>
        </div>

        <div className="flex items-center justify-between rounded-2xl border border-slate-800/80 bg-slate-900 p-5 sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-slate-500">
              API Sync Node
            </p>

            <h2 className="mt-1 text-2xl font-bold text-white">
              Healthy
            </h2>
          </div>

          <div className="rounded-xl border border-emerald-500/10 bg-emerald-600/10 p-3 text-emerald-400">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left */}
        <div className="space-y-6 lg:col-span-2">
          <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
            <div className="flex items-center justify-between border-b border-slate-800 bg-slate-900/50 p-6">
              <div>
                <h2 className="text-lg font-semibold text-white">
                  Active Analytics Overview
                </h2>

                <p className="mt-1 text-xs text-slate-500">
                  Live operational metrics collected from the platform.
                </p>
              </div>

              <button className="rounded-lg border border-indigo-500/10 bg-indigo-600/10 px-3 py-1.5 text-xs font-semibold text-indigo-400 transition hover:bg-indigo-600/20">
                View All
              </button>
            </div>

            <div className="space-y-4 p-6">
              {[1, 2, 3].map((item) => (
                <div
                  key={item}
                  className="group flex items-center justify-between rounded-xl border border-slate-800 bg-slate-950 p-4 transition hover:border-slate-700"
                >
                  <div className="flex items-center gap-4">
                    <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 font-semibold text-slate-400 transition group-hover:text-indigo-400">
                      #{item}
                    </div>

                    <div>
                      <p className="font-medium text-slate-200">
                        Analytics Stream #{item}
                      </p>

                      <p className="mt-1 text-xs text-slate-500">
                        Updated 4 minutes ago • Healthy
                      </p>
                    </div>
                  </div>

                  <span className="rounded-full border border-indigo-500/10 bg-indigo-500/10 px-3 py-1 text-xs font-medium text-indigo-400">
                    Active
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}