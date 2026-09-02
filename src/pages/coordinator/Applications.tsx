import { useState } from "react";
import { Search, Eye, Filter, CheckCircle2, Send } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function CoordinatorApplicationsPage() {
  const [role, setRole] = useState<RoleKey>("office_coordinator");
  const [search, setSearch] = useState("");

  return (
    <AppShell
      title="Applications Pool (Office Coordinator)"
      subtitle="Verify, validate and route submitted applications to respective Evaluators."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="mb-5 flex items-center justify-between">
        <div className="relative max-w-sm flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
          <input
            type="text"
            placeholder="Search applications..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-graphite-200 bg-white py-2 pl-9 pr-3 text-sm text-graphite-700 outline-none focus:border-primary-400"
          />
        </div>
      </div>

      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Title</th>
              <th className="px-5 py-3">Plant</th>
              <th className="px-5 py-3">Status</th>
              <th className="px-5 py-3 text-right">Verification Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {defaultApplications.map((app) => (
              <tr key={app.id} className="hover:bg-graphite-50/50">
                <td className="px-5 py-3.5 font-mono text-xs font-medium text-primary-600">{app.id}</td>
                <td className="px-5 py-3.5 font-medium text-graphite-800">{app.title}</td>
                <td className="px-5 py-3.5 text-xs text-graphite-600">{app.plant}</td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full bg-sky-50 px-2.5 py-0.5 text-xs font-medium text-sky-700">
                    {app.status}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-right">
                  <button className="inline-flex items-center gap-1 rounded-md bg-primary-600 px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary-700">
                    <Send size={13} /> Verify & Forward
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
