import { useState } from "react";
import { Search, Eye, FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import AppShell from "../../components/shared/AppShell";

interface ArchivedDocument {
  applicationId: string;
  document: string;
  plant: string;
  department: string;
  closedBy: string;
  closedOn: string;
}

const mockDocuments: ArchivedDocument[] = [
  {
    applicationId: "PLT-2026-000118",
    document: "KSP_Technical_Report.pdf",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    closedBy: "Office Coordinator",
    closedOn: "26 Aug 2026, 14:35",
  },
  {
    applicationId: "PLT-2026-000118",
    document: "KSP_Cost_Statement.pdf",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    closedBy: "Office Coordinator",
    closedOn: "26 Aug 2026, 14:35",
  },
];

export default function AdminArchivePage() {
  const [role, setRole] = useState<RoleKey>("admin");

  return (
    <AppShell
      title="System Archive (Admin)"
      subtitle="Read-only repository for all closed applications."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Document</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Closed On</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {mockDocuments.map((doc, i) => (
              <tr key={i} className="hover:bg-graphite-50/50">
                <td className="px-5 py-3.5 font-mono text-xs text-primary-600">{doc.applicationId}</td>
                <td className="px-5 py-3.5 text-graphite-800">{doc.document}</td>
                <td className="px-5 py-3.5 text-xs text-graphite-600">{doc.department}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-graphite-500">{doc.closedOn}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </AppShell>
  );
}
