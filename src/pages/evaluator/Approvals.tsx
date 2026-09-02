import { useState } from "react";
import { UserCheck, UserPlus, CheckCircle2 } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function EvaluatorApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("evaluator");

  return (
    <AppShell
      title="Evaluation Queue"
      subtitle="Applications awaiting evaluation & technical reviewer assignment."
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
                <p className="text-xs text-graphite-500 mt-1">Department: {app.department}</p>
              </div>
              <span className="rounded-full bg-violet-50 px-3 py-1 text-xs font-semibold text-violet-700">
                Evaluation Pending
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-graphite-100 pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">
                <UserPlus size={14} /> Assign to Technical User 01
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
