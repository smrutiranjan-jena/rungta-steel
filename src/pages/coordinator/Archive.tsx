import { useState } from "react";
import { Search, Eye, FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import AppShell from "../../components/shared/AppShell";

export default function CoordinatorArchivePage() {
  const [role, setRole] = useState<RoleKey>("office_coordinator");

  return (
    <AppShell
      title="Coordinator Archive"
      subtitle="Closed applications processed by Coordinator."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="rounded-xl border border-graphite-200 bg-white p-8 text-center shadow-card">
        <FileText size={40} className="mx-auto text-graphite-300 mb-2" />
        <h3 className="text-base font-semibold text-graphite-800">Archived Verification Records</h3>
        <p className="text-xs text-graphite-500 mt-1">Read-only repository for verified and closed files.</p>
      </div>
    </AppShell>
  );
}
