import { useState } from "react";
import { CheckCircle2, Send, RotateCcw, AlertCircle } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function CoordinatorApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("office_coordinator");

  return (
    <AppShell
      title="Coordinator Verification Queue"
      subtitle="Applications awaiting initial verification & routing."
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
              <span className="rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">
                Pending Verification
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-graphite-100 pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-emerald-700">
                <CheckCircle2 size={14} /> Verify & Assign Evaluator
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100">
                <RotateCcw size={14} /> Return to Purchase Rep
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
