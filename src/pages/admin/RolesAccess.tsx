import { useState } from "react";
import {
  FilePlus2,
  ClipboardList,
  SearchCheck,
  Wrench,
  Landmark,
  ShieldCheck,
  Check,
} from "lucide-react";
import type { RoleKey } from "../../data/roles";
import {
  permissionModules,
  roleColumns,
  permissionMatrix,
  type RoleColumn,
} from "../../data/rbac";
import AppShell from "../../components/shared/AppShell";

const roleIcons: Record<string, typeof ShieldCheck> = {
  "Purchase Representative": FilePlus2,
  "Office Coordinator": ClipboardList,
  Evaluator: SearchCheck,
  "Technical User": Wrench,
  "Finance User": Landmark,
  Admin: ShieldCheck,
};

const roleColors: Record<string, { bg: string; text: string; ring: string }> = {
  "Purchase Representative": { bg: "bg-amber-50",   text: "text-amber-700",   ring: "ring-amber-200" },
  "Office Coordinator":      { bg: "bg-sky-50",     text: "text-sky-700",     ring: "ring-sky-200" },
  Evaluator:                 { bg: "bg-violet-50",  text: "text-violet-700",  ring: "ring-violet-200" },
  "Technical User":          { bg: "bg-teal-50",    text: "text-teal-700",    ring: "ring-teal-200" },
  "Finance User":            { bg: "bg-emerald-50", text: "text-emerald-700", ring: "ring-emerald-200" },
  Admin:                     { bg: "bg-primary-50", text: "text-primary-700", ring: "ring-primary-200" },
};

export default function RolesAccessPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [matrix, setMatrix] = useState(permissionMatrix);

  function toggle(moduleKey: string, col: RoleColumn) {
    setMatrix((prev) => ({
      ...prev,
      [moduleKey]: {
        ...prev[moduleKey],
        [col]: !prev[moduleKey][col],
      },
    }));
  }

  return (
    <AppShell
      title="Roles & Access (RBAC)"
      subtitle="Role-based access control matrix — which role can perform which action."
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Role summary cards ── */}
      <div className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
        {roleColumns.map((r, i) => {
          const Icon = roleIcons[r] ?? ShieldCheck;
          const c = roleColors[r];
          const count = permissionModules.filter((m) => matrix[m.key]?.[r]).length;
          return (
            <div
              key={r}
              className={`group rounded-xl border border-graphite-200 bg-white p-4 opacity-0 shadow-card transition duration-200 hover:-translate-y-0.5 hover:shadow-lg animate-[fadeInUp_.4s_ease_forwards]`}
              style={{ animationDelay: `${i * 60}ms` }}
            >
              <div className={`mb-3 flex h-10 w-10 items-center justify-center rounded-lg ${c.bg} ${c.text}`}>
                <Icon size={18} />
              </div>
              <p className="font-display text-2xl font-semibold tabular-nums text-graphite-800">{count}</p>
              <p className="mt-0.5 text-xs font-medium leading-snug text-graphite-500 truncate">{r}</p>
            </div>
          );
        })}
      </div>

      {/* ── Permission Matrix ── */}
      <h2 className="mb-3 font-display text-base font-semibold text-graphite-800">Permission Matrix</h2>
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]" style={{ animationDelay: "200ms" }}>
        <table className="min-w-full text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="sticky left-0 z-10 bg-graphite-50/60 px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-graphite-500">
                Module / Permission
              </th>
              {roleColumns.map((r) => (
                <th key={r} className="px-4 py-3 text-center text-xs font-semibold uppercase tracking-wide text-graphite-500 whitespace-nowrap">
                  {r}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {permissionModules.map((mod) => (
              <tr key={mod.key} className="transition hover:bg-graphite-50/50">
                <td className="sticky left-0 z-10 bg-white whitespace-nowrap px-5 py-3 font-medium text-graphite-700">
                  {mod.label}
                </td>
                {roleColumns.map((col) => {
                  const allowed = matrix[mod.key]?.[col] ?? false;
                  return (
                    <td key={col} className="px-4 py-3 text-center">
                      <button
                        onClick={() => toggle(mod.key, col)}
                        className={`inline-flex h-7 w-7 items-center justify-center rounded-md border transition ${
                          allowed
                            ? "border-emerald-300 bg-emerald-50 text-emerald-600 hover:bg-emerald-100"
                            : "border-graphite-200 bg-graphite-50 text-graphite-300 hover:bg-graphite-100 hover:text-graphite-500"
                        }`}
                        title={allowed ? "Revoke" : "Grant"}
                      >
                        {allowed && <Check size={15} strokeWidth={2.5} />}
                      </button>
                    </td>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p className="mt-4 text-xs text-graphite-400">
        Click a cell to toggle the permission. Admin has full access by default.
      </p>
    </AppShell>
  );
}
