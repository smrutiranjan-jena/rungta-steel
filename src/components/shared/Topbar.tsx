import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Menu, ChevronDown, Clock, Bell, UserCircle2 } from "lucide-react";
import { roles, type RoleKey } from "../../data/roles";

interface TopbarProps {
  title: string;
  subtitle?: string;
  activeRole: RoleKey;
  onRoleChange: (role: RoleKey) => void;
  onMenuClick: () => void;
}


function useClock() {
  const [now, setNow] = useState(new Date());
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(id);
  }, []);
  return now;
}

export default function Topbar({
  title,
  subtitle,
  activeRole,
  onRoleChange,
  onMenuClick,
}: TopbarProps) {

  const now = useClock();

  return (
    <header className="z-20 flex h-20 shrink-0 items-center justify-between gap-4 rounded-3xl border border-white/5 bg-primary-900 px-5 shadow-lg lg:px-6">
      <div className="flex min-w-0 items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="flex h-9 w-9 flex-none items-center justify-center rounded-md text-primary-200 transition hover:bg-white/10 lg:hidden"
          aria-label="Open menu"
        >
          <Menu size={19} />
        </button>
        <div className="min-w-0">
          <h1 className="truncate font-display text-lg font-semibold text-white lg:text-xl">
            {title}
          </h1>
          {subtitle && (
            <p className="truncate text-xs text-primary-300">{subtitle}</p>
          )}
        </div>
      </div>

      <div className="flex flex-none items-center gap-3">
        <div className="hidden items-center gap-2 rounded-full border border-white/10 px-3 py-2.5 font-mono text-xs text-primary-200 md:inline-flex">
          <Clock size={13} className="text-primary-400" />
          <span>
            {now.toLocaleDateString(undefined, { day: "2-digit", month: "short", year: "numeric" })}
          </span>
          <span className="text-white/20">·</span>
          <span className="tabular-nums">
            {now.toLocaleTimeString(undefined, { hour: "2-digit", minute: "2-digit", second: "2-digit" })}
          </span>
        </div>

        {/* Divider */}
        <div className="hidden h-6 w-px bg-white/10 md:block" />

        {/* <div className="relative">
          <select
            value={activeRole}
            onChange={(e) => onRoleChange(e.target.value as RoleKey)}
            aria-label="Switch role"
            className="appearance-none rounded-3xl border border-white/10 bg-primary-800 py-2 pl-3 pr-8 text-sm font-medium text-white outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-400/20"
          >
            {roles.map((r) => (
              <option key={r.key} value={r.key}>
                {r.title}
              </option>
            ))}
          </select>
          <ChevronDown
            size={14}
            className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-primary-300"
          />
        </div> */}

        {/* Divider */}
        {/* <div className="hidden h-6 w-px bg-white/10 md:block" /> */}

        {/* Notifications */}
        <button
          type="button"
          className="relative flex h-9 w-9 items-center justify-center rounded-full text-primary-200 transition hover:bg-white/10 hover:text-white"
          aria-label="Notifications"
        >
          <Bell size={18} />
          <span className="absolute right-2 top-2 h-2 w-2 rounded-full bg-accent-500 ring-2 ring-primary-900" />
        </button>

        {/* Profile */}
        <div className="hidden sm:block pl-1">
          <Link
            to="/profile"
            className="flex items-center gap-2 transition hover:opacity-80 focus:outline-none"
          >
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-primary-800 border border-primary-700">
              <UserCircle2 size={20} className="text-primary-300" strokeWidth={1.5} />
            </div>
            <div className="text-left">
              <p className="text-[13px] font-semibold text-white leading-tight">
                {activeRole === "purchase_rep"
                  ? "R. Sharma"
                  : activeRole === "office_coordinator"
                    ? "S. Verma"
                    : activeRole === "evaluator"
                      ? "A. Iyer"
                      : activeRole === "technical_user"
                        ? "Tech User 01"
                        : activeRole === "finance_user"
                          ? "M. Kapoor"
                          : "Admin"}
              </p>
              <p className="text-[11px] font-medium text-primary-300">
                View Profile
              </p>
            </div>
          </Link>
        </div>

        {/* Divider */}
        <div className="hidden h-6 w-px bg-white/10 sm:block ml-1" />
      </div>
    </header>
  );
}