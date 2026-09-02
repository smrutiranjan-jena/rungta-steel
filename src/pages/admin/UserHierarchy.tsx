import { useState } from "react";
import { UserCircle2, ChevronRight } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { hierarchyTree, hierarchyRows, type HierarchyNode } from "../../data/userHierarchy";
import AppShell from "../../components/shared/AppShell";

/* ── Role badge color helper ── */
function roleBadge(role: string) {
  const map: Record<string, string> = {
    Admin:                    "bg-primary-50 text-primary-700",
    "Office Coordinator":     "bg-sky-50 text-sky-700",
    "Purchase Representative":"bg-amber-50 text-amber-700",
    Evaluator:                "bg-violet-50 text-violet-700",
    "Technical User":         "bg-teal-50 text-teal-700",
    "Finance User":           "bg-emerald-50 text-emerald-700",
  };
  return map[role] ?? "bg-graphite-100 text-graphite-600";
}

/* ── Recursive tree card ── */
function TreeNode({ node, depth = 0 }: { node: HierarchyNode; depth?: number }) {
  return (
    <div className={`flex flex-col items-center ${depth > 0 ? "mt-1" : ""}`}>
      {/* Card */}
      <div className="group relative w-56 rounded-xl border border-graphite-200 bg-white p-4 shadow-card transition hover:-translate-y-0.5 hover:shadow-lg">
        <div className="mb-2 flex items-center gap-2.5">
          <div className="flex h-9 w-9 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-600">
            <UserCircle2 size={20} strokeWidth={1.5} />
          </div>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-graphite-800">{node.name}</p>
            <span className={`mt-0.5 inline-block rounded-full px-2 py-px text-[11px] font-medium ${roleBadge(node.role)}`}>
              {node.role}
            </span>
          </div>
        </div>
      </div>

      {/* Children connector */}
      {node.children.length > 0 && (
        <>
          {/* Vertical line down */}
          <div className="h-6 w-px bg-graphite-200" />

          {/* Horizontal rail + branches */}
          <div className="relative flex gap-10">
            {/* horizontal bar connecting siblings */}
            {node.children.length > 1 && (
              <div className="pointer-events-none absolute left-1/2 top-0 h-px -translate-x-1/2 bg-graphite-200"
                style={{ width: `calc(100% - 14rem)` }}
              />
            )}

            {node.children.map((child) => (
              <div key={child.id} className="flex flex-col items-center">
                <div className="h-6 w-px bg-graphite-200" />
                <TreeNode node={child} depth={depth + 1} />
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default function UserHierarchyPage() {
  const [role, setRole] = useState<RoleKey>("admin");

  return (
    <AppShell
      title="User Hierarchy"
      subtitle="User hierarchy & reporting structure for the approval workflow."
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* ── Visual Tree ── */}
      <section className="mb-10">
        <h2 className="mb-4 font-display text-base font-semibold text-graphite-800">Reporting Structure</h2>
        <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-graphite-50/40 p-8 shadow-card animate-[fadeInUp_.4s_ease_forwards]">
          <div className="flex justify-center">
            <TreeNode node={hierarchyTree} />
          </div>
        </div>
      </section>

      {/* ── Reporting Table ── */}
      <section>
        <h2 className="mb-3 font-display text-base font-semibold text-graphite-800">Reporting Table</h2>
        <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]" style={{ animationDelay: "150ms" }}>
          <table className="min-w-full text-left text-sm">
            <thead>
              <tr className="border-b border-graphite-100 bg-graphite-50/60">
                <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">User</th>
                <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Role</th>
                <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Reports To</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-graphite-100">
              {hierarchyRows.map((row) => (
                <tr key={row.userId} className="transition hover:bg-graphite-50/50">
                  <td className="whitespace-nowrap px-5 py-3">
                    <div className="flex items-center gap-2.5">
                      <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-600">
                        <UserCircle2 size={18} strokeWidth={1.5} />
                      </div>
                      <span className="font-medium text-graphite-800">{row.userName}</span>
                    </div>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${roleBadge(row.role)}`}>
                      {row.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-3">
                    <div className="flex items-center gap-1 text-graphite-600">
                      {row.reportsTo !== "—" && <ChevronRight size={13} className="text-graphite-300" />}
                      {row.reportsTo}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </AppShell>
  );
}
