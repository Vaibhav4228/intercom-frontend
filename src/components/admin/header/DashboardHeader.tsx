import { Bell, ChevronRight, Menu, Search } from "lucide-react";

interface DashboardHeaderProps {
  title: string;
  onOpenSidebar: () => void;
}

export default function DashboardHeader({
  title,
  onOpenSidebar,
}: DashboardHeaderProps) {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center justify-between px-6 bg-slate-900/20 shrink-0">
      {/* Left */}
      <div className="flex items-center space-x-4">
        <button
          onClick={onOpenSidebar}
          className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="flex items-center space-x-2 text-xs text-slate-500 font-medium">
          <span>Workspace</span>

          <ChevronRight className="w-3 h-3" />

          <span className="text-indigo-400 font-semibold">{title}</span>
        </div>
      </div>

      {/* Right */}
      <div className="flex items-center space-x-4">
       

        <button className="relative rounded-xl border border-transparent p-2 text-slate-400 transition hover:border-slate-800 hover:bg-slate-900 hover:text-white">
          <Bell className="w-[18px] h-[18px]" />

          <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-indigo-500" />
        </button>
      </div>
    </header>
  );
}