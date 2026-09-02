import { useState } from "react";
import { FileText, Download } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultDocuments } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function EvaluatorDocumentsPage() {
  const [role, setRole] = useState<RoleKey>("evaluator");

  return (
    <AppShell
      title="Evaluator Documents"
      subtitle="Technical reports & vendor evaluation matrices."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-5 py-3">Document Name</th>
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Type</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {defaultDocuments.map((doc) => (
              <tr key={doc.id} className="hover:bg-graphite-50/50">
                <td className="px-5 py-3.5 flex items-center gap-2 font-medium text-graphite-800">
                  <FileText size={16} className="text-violet-600" /> {doc.name}
                </td>
                <td className="px-5 py-3.5 font-mono text-xs font-medium text-primary-600">{doc.applicationId}</td>
                <td className="px-5 py-3.5 text-xs text-graphite-600">{doc.type}</td>
                <td className="px-5 py-3.5 text-right">
                  <button className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-semibold text-graphite-700 hover:border-violet-300 hover:text-violet-700">
                    <Download size={13} /> Download
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
