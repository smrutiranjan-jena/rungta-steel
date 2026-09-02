import { NavLink } from "react-router-dom";
import { LogOut, UserCircle2 } from "lucide-react";
import { roleNavigation } from "../../data/navigation";
import { roles, type RoleKey } from "../../data/roles";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
  activeRole: RoleKey;
  onLogout?: () => void;
}

export default function Sidebar({
  open,
  onClose,
  activeRole = "admin",
  onLogout,
}: SidebarProps) {
  const currentRoleInfo = roles.find((r) => r.key === activeRole);
  const navItems = roleNavigation[activeRole] || roleNavigation.admin;

  return (
    <>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-30 bg-graphite-900/40 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed inset-y-4 left-4 z-40 flex w-[250px] flex-none flex-col transition-transform duration-300 ease-out lg:static lg:h-full lg:translate-x-0 text-white ${open ? "translate-x-0" : "-translate-x-[120%]"
          }`}
      >
        <div className="flex h-full flex-col gap-2">
          {/* Brand */}
          <div className="flex h-20 shrink-0 items-center gap-3 rounded-3xl border border-white/5 bg-primary-900 px-5 shadow-lg">
            {/* <div className="flex h-10 w-10 flex-none items-center justify-center rounded-xl bg-gradient-to-br from-primary-500 to-primary-700 font-display text-sm font-bold shadow-inner">
              RS
            </div> */}
            <img src="/icons/logo.png" alt="Logo" width={'70px'} />
            <div className="min-w-0">

              <p className="truncate font-display text-[15px] font-semibold leading-tight tracking-wide">
                Plant Document
              </p>
              <p className="truncate text-xs font-medium text-primary-300 mt-0.5">Approval System</p>
            </div>
          </div>

          {/* Menus Inner Container */}
          <div className="flex flex-1 flex-col overflow-hidden rounded-3xl bg-primary-900 shadow-lg border border-white/5">

            {/* Nav */}
            <nav className="flex-1 overflow-y-auto px-4 py-5 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden">
              <div className="mb-3 px-2 text-[10px] font-bold uppercase tracking-widest text-primary-300/70">
                {currentRoleInfo?.title || "Role"} Navigation
              </div>
              <ul className="space-y-1">
                {navItems.map(({ label, href, icon: Icon, badge }) => (
                  <li key={href}>
                    <NavLink
                      to={href}
                      onClick={onClose}
                      className={({ isActive }) =>
                        `group relative flex items-center gap-3 rounded-xl px-3 py-3 text-sm font-medium transition-all duration-200 ${isActive
                          ? "bg-primary-700/80 text-white shadow-sm"
                          : "text-primary-200 hover:bg-white/5 hover:text-white"
                        }`
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <span
                            className={`absolute left-0 top-1/2 h-5 w-0.5 -translate-y-1/2 rounded-r bg-accent-500 transition-opacity ${isActive ? "opacity-100" : "opacity-0"
                              }`}
                            aria-hidden="true"
                          />
                          <Icon size={17} strokeWidth={1.75} className="flex-none" />
                          <span className="truncate">{label}</span>
                          {badge != null && (
                            <span className="ml-auto flex h-5 min-w-5 items-center justify-center rounded-full bg-accent-500 px-1 text-[11px] font-semibold text-white">
                              {badge}
                            </span>
                          )}
                        </>
                      )}
                    </NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            {/* User footer */}
            <div className="border-t border-white/10 bg-primary-950/20 px-5 py-5">
              <div className="flex items-center gap-3 px-1">
                <div className="flex h-10 w-10 flex-none items-center justify-center rounded-full bg-primary-800 border border-primary-700">
                  <UserCircle2 size={24} strokeWidth={1.5} className="text-primary-300" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-[13px] font-semibold tracking-wide text-white">
                    {activeRole === "purchase_rep"
                      ? "R. Sharma"
                      : activeRole === "office_coordinator"
                        ? "S. Verma"
                        : activeRole === "evaluator"
                          ? "A. Iyer"
                          : activeRole === "technical_user"
                            ? "Technical User 01"
                            : activeRole === "finance_user"
                              ? "M. Kapoor"
                              : "Administrator"}
                  </p>
                  <p className="truncate text-[11px] font-medium text-primary-300 mt-0.5">{currentRoleInfo?.title}</p>
                </div>
              </div>
              <button
                type="button"
                onClick={onLogout}
                className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-white/5 border border-white/10 px-3 py-2.5 text-xs font-semibold tracking-wide text-primary-100 transition-all hover:bg-white/10 hover:text-white"
              >
                <LogOut size={16} strokeWidth={2} />
                Logout
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}