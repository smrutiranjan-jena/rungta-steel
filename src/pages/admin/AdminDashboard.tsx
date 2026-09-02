import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Users,
  ShieldCheck,
  Factory,
  Layers,
  ClipboardCheck,
  CheckCircle2,
  UserCog,
  Network,
  ChevronRight,
} from "lucide-react";
import type { RoleKey } from "../../data/roles";
import AppShell from "../../components/shared/AppShell";


interface Stat {
  key: string;
  label: string;
  count: number;
  icon: typeof Users;
  iconBg: string;
  iconText: string;
}

interface MasterCard {
  key: string;
  title: string;
  description: string;
  icon: typeof Users;
  to: string;
}

const stats: Stat[] = [
  { key: "users", label: "Total Users", count: 6, icon: Users, iconBg: "bg-primary-50", iconText: "text-primary-600" },
  { key: "roles", label: "Roles", count: 6, icon: ShieldCheck, iconBg: "bg-primary-50", iconText: "text-primary-600" },
  { key: "plants", label: "Plants", count: 1, icon: Factory, iconBg: "bg-primary-50", iconText: "text-primary-600" },
  { key: "applications", label: "Applications", count: 3, icon: Layers, iconBg: "bg-primary-50", iconText: "text-primary-600" },
  { key: "pending", label: "Pending Approvals", count: 1, icon: ClipboardCheck, iconBg: "bg-amber-50", iconText: "text-amber-600" },
  { key: "closed", label: "Closed", count: 1, icon: CheckCircle2, iconBg: "bg-emerald-50", iconText: "text-emerald-600" },
];

// TODO: point these at your actual admin routes
const masterCards: MasterCard[] = [
  { key: "user-management", title: "User Management", description: "Create users, assign roles & plants", icon: Users, to: "/admin/users" },
  { key: "user-mapping", title: "User Mapping", description: "Map users to roles, plants & managers", icon: UserCog, to: "/admin/user-mapping" },
  { key: "user-hierarchy", title: "User Hierarchy", description: "Reporting structure of workflow users", icon: Network, to: "/admin/user-hierarchy" },
  { key: "rbac", title: "Roles & Access (RBAC)", description: "Role-based permission matrix", icon: ShieldCheck, to: "/admin/roles" },
  { key: "plant-master", title: "Plant Master", description: "Manage plant master data", icon: Factory, to: "/admin/plants" },
];

function prefersReducedMotion() {
  return typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}

function useCountUp(target: number, duration = 800) {
  const [value, setValue] = useState(prefersReducedMotion() ? target : 0);

  useEffect(() => {
    if (prefersReducedMotion()) {
      setValue(target);
      return;
    }
    let start: number | null = null;
    let raf: number;
    const step = (ts: number) => {
      if (start === null) start = ts;
      const progress = Math.min((ts - start) / duration, 1);
      setValue(Math.round(progress * target));
      if (progress < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [target, duration]);

  return value;
}

function StatCard({ stat, index }: { stat: Stat; index: number }) {
  const value = useCountUp(stat.count);
  const Icon = stat.icon;

  return (
    <div
      className="group rounded-xl border border-graphite-200 bg-white p-4 opacity-0 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg animate-[fadeInUp_.4s_ease_forwards]"
      style={{ animationDelay: `${index * 60}ms` }}
    >
      <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${stat.iconBg} ${stat.iconText} transition-transform duration-200 group-hover:scale-105`}>
        <Icon size={18} />
      </div>
      <p className="font-display text-2xl font-semibold tabular-nums text-graphite-800">{value}</p>
      <p className="mt-0.5 text-xs font-medium leading-snug text-graphite-500">{stat.label}</p>
    </div>
  );
}

function MasterCardTile({ card, index }: { card: MasterCard; index: number }) {
  const Icon = card.icon;

  return (
    <Link
      to={card.to}
      className="group block rounded-xl border border-graphite-200 bg-white p-5 opacity-0 shadow-card transition duration-200 hover:-translate-y-0.5 hover:border-primary-200 hover:shadow-lg animate-[fadeInUp_.4s_ease_forwards]"
      style={{ animationDelay: `${300 + index * 70}ms` }}
    >
      <div className="mb-4 flex h-11 w-11 items-center justify-center rounded-lg bg-primary-50 text-primary-600 transition-transform duration-200 group-hover:scale-105">
        <Icon size={20} />
      </div>
      <div className="flex items-center gap-1.5">
        <h3 className="font-display text-[15px] font-semibold text-graphite-800">{card.title}</h3>
        <ChevronRight
          size={15}
          className="text-graphite-300 transition-transform duration-200 group-hover:translate-x-0.5 group-hover:text-primary-500"
        />
      </div>
      <p className="mt-1 text-[13px] leading-snug text-graphite-500">{card.description}</p>
    </Link>
  );
}

export default function AdminDashboardPage() {
  const [role, setRole] = useState<RoleKey>("admin");

  return (
    <AppShell
      title="Admin Dashboard"
      subtitle="System overview, users, and master configuration"
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {stats.map((stat, i) => (
          <StatCard key={stat.key} stat={stat} index={i} />
        ))}
      </div>

      <div className="mt-8">
        <h2 className="mb-3 font-display text-base font-semibold text-graphite-800">Masters &amp; Configuration</h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {masterCards.map((card, i) => (
            <MasterCardTile key={card.key} card={card} index={i} />
          ))}
        </div>
      </div>
    </AppShell>
  );
}