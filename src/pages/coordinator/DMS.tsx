import { useState } from "react";
import { Folder, FolderOpen, FileText, Upload, ChevronRight, ChevronDown, Search } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultDocuments } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function CoordinatorDMSPage() {
  const [role, setRole] = useState<RoleKey>("office_coordinator");

  return (
    <AppShell
      title="DMS Folders (Office Coordinator)"
      subtitle="Organize, structure and store documents across plants."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="rounded-xl border border-graphite-200 bg-white p-6 shadow-card">
        <h3 className="font-display text-base font-semibold text-graphite-800 mb-3">Plant Folder Directory</h3>
        <div className="space-y-2 text-xs font-medium text-graphite-700">
          <div className="flex items-center gap-2 p-2 rounded-lg bg-primary-50 text-primary-700">
            <FolderOpen size={16} /> Kamanda Steel Plant (KSP) / Purchase
          </div>
          <div className="pl-6 space-y-1">
            {defaultDocuments.map((doc) => (
              <div key={doc.id} className="flex items-center gap-2 p-1.5 hover:bg-graphite-50 rounded">
                <FileText size={14} className="text-graphite-400" />
                <span>{doc.name}</span>
                <span className="ml-auto font-mono text-[10px] text-graphite-400">{doc.applicationId}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </AppShell>
  );
}
