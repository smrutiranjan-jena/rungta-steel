import { useState } from "react";
import { CheckCircle2, RotateCcw, Wrench } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function TechnicalApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("technical_user");

  return (
    <AppShell
      title="Technical Review Queue"
      subtitle="Verify technical compliance, equipment specs & structural parameters."
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
                <p className="text-xs text-graphite-500 mt-1">Plant: {app.plant}</p>
              </div>
              <span className="rounded-full bg-teal-50 px-3 py-1 text-xs font-semibold text-teal-700">
                Technical Clearance Pending
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-graphite-100 pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-teal-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-teal-700">
                <CheckCircle2 size={14} /> Grant Technical Clearance
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-amber-300 bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700 hover:bg-amber-100">
                <RotateCcw size={14} /> Request Tech Revision
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
