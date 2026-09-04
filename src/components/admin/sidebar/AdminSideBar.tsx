import { LogOut, X } from "lucide-react";
import { navigationItems } from "./sidebar";
import { NavLink } from "react-router";
import { getUserEmail } from "../../../helper/getUserData";

interface AdminSidebarProps {
  // user: User;
  isMobileOpen: boolean;
  setIsMobileOpen: (open: boolean) => void;
  handleLogout: () => void;
}

export default function AdminSidebar({

  isMobileOpen,
  setIsMobileOpen,
  handleLogout,
}: AdminSidebarProps) {

  
  const userEmail=getUserEmail() as string
  return (
    <aside
      className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-slate-900 border-r border-slate-800
        flex flex-col justify-between
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0 lg:static lg:h-screen
        ${isMobileOpen ? "translate-x-0" : "-translate-x-full"}
      `}
    >
      <div className="flex flex-col flex-1 min-h-0">
        {/* Logo */}
        <div className="h-16 flex items-center justify-between px-6 border-b border-slate-800 shrink-0">
          <div className="flex items-center space-x-2.5">
            <div className="w-8 h-8 rounded-lg bg-indigo-600 flex items-center justify-center font-bold text-white">
              S
            </div>

            <span className="font-bold text-lg tracking-tight bg-gradient-to-r from-white to-slate-400 bg-clip-text text-transparent">
              B2B Agent Builder
            </span>
          </div>

          <button
            onClick={() => setIsMobileOpen(false)}
            className="p-1 rounded-md text-slate-400 hover:text-white hover:bg-slate-800 lg:hidden"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto px-4 py-6 space-y-1.5 custom-scrollbar">
          {navigationItems.map((item) => {
            const Icon = item.icon;

            return (
              <NavLink
                key={item.href}
                to={item.href}
                end
                onClick={() => setIsMobileOpen(false)}
                className={({ isActive }) =>
                  `
                  w-full flex items-center justify-between
                  px-3.5 py-2.5 rounded-xl text-sm font-medium
                  transition-all group
                  ${
                    isActive
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/10"
                      : "text-slate-400 hover:text-slate-200 hover:bg-slate-800/60"
                  }
                `
                }
              >
                {({ isActive }) => (
                  <>
                    <div className="flex items-center space-x-3">
                      <Icon
                        className={`w-[18px] h-[18px] shrink-0 ${
                          isActive
                            ? "text-white"
                            : "text-slate-400 group-hover:text-slate-200"
                        }`}
                      />

                      <span>{item.name}</span>
                    </div>

                   
                  </>
                )}
              </NavLink>
            );
          })}
        </nav>
      </div>

      {/* Footer */}
      <div className="p-4 border-t border-slate-800 bg-slate-900/50 shrink-0">
        <div className="flex items-center justify-between p-2 rounded-xl bg-slate-950/40 border border-slate-800/50">
          <div className="flex items-center space-x-3 min-w-0">
            <div className="w-9 h-9 rounded-lg bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 flex items-center justify-center font-semibold text-sm shrink-0">
              {userEmail
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>

            <div className="min-w-0 flex-1">
              <p className="text-xs font-semibold text-slate-200 truncate">
                {userEmail?.split('@')[0]}
              </p>

              <p className="text-[11px] text-slate-500 truncate">
                {userEmail}
              </p>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="p-1.5 text-slate-500 hover:text-rose-400 hover:bg-rose-500/10 rounded-lg transition"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}