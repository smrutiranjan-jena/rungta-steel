import { useState } from "react";
import { CheckCircle2, RotateCcw, Landmark } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function FinanceApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("finance_user");

  return (
    <AppShell
      title="Finance Approval Queue"
      subtitle="Review financial budget allocations and approve release of funds."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="space-y-4">
        {defaultApplications.map((app) => (
          <div key={app.id} className="rounded-xl border border-graphite-200 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-primary-600">{app.id}</span>
                <h3 className="text-base font-semibold text-graphite-800 mt-1">{app.title}</h3>
                <p className="text-xs text-graphite-500 mt-1">Submitted by {app.submittedBy}</p>
              </div>
              <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700">
                Finance Clearance Pending
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-graphite-100 pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
                <CheckCircle2 size={14} /> Grant Finance Approval
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-rose-200 bg-rose-50 px-3 py-1.5 text-xs font-semibold text-rose-700 hover:bg-rose-100">
                Reject Budget
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
