import { useState } from "react";
import { CheckCircle2, RotateCcw, AlertCircle, Eye, FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function PurchaseApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("purchase_rep");

  const actionItems = defaultApplications.filter((a) => a.status === "Under Review" || a.status === "Submitted");

  return (
    <AppShell
      title="Purchase Pending Actions"
      subtitle="Track status and respond to revision requests on your submitted applications."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="space-y-4">
        {actionItems.map((app) => (
          <div key={app.id} className="rounded-xl border border-graphite-200 bg-white p-5 shadow-card">
            <div className="flex items-start justify-between">
              <div>
                <span className="font-mono text-xs font-semibold text-primary-600">{app.id}</span>
                <h3 className="text-base font-semibold text-graphite-800 mt-1">{app.title}</h3>
                <p className="text-xs text-graphite-500 mt-1">Submitted on {app.submittedOn}</p>
              </div>
              <span className="rounded-full bg-amber-50 px-3 py-1 text-xs font-semibold text-amber-700">
                {app.status}
              </span>
            </div>

            <div className="mt-4 flex justify-end gap-2 border-t border-graphite-100 pt-3">
              <button className="inline-flex items-center gap-1.5 rounded-lg border border-graphite-200 px-3 py-1.5 text-xs font-semibold text-graphite-700 hover:bg-graphite-50">
                <Eye size={14} /> View Details & Remarks
              </button>
            </div>
          </div>
        ))}
      </div>
    </AppShell>
  );
}
