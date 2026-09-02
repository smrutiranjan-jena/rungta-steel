import { useState } from "react";
import { Search, Eye, UserPlus } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function EvaluatorApplicationsPage() {
  const [role, setRole] = useState<RoleKey>("evaluator");

  return (
    <AppShell
      title="Applications (Evaluator)"
      subtitle="Evaluate vendor proposals & assign specialized Technical Reviewers."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Plant</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Evaluation Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {defaultApplications.map((app) => (
              <tr key={app.id} className="hover:bg-graphite-50/50">
                <td className="px-5 py-3.5 font-mono text-xs font-medium text-primary-600">{app.id}</td>
                <td className="px-5 py-3.5 font-medium text-graphite-800">{app.title}</td>
                <td className="px-5 py-3.5 text-xs text-graphite-600">{app.plant}</td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full bg-violet-50 px-2.5 py-0.5 text-xs font-medium text-violet-700">
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="inline-flex items-center gap-1.5 rounded-md bg-violet-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-violet-700">
                    <UserPlus size={13} /> Assign Technical User
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
