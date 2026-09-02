import { useState } from "react";
import { Search, Eye, FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import AppShell from "../../components/shared/AppShell";

export default function PurchaseArchivePage() {
  const [role, setRole] = useState<RoleKey>("purchase_rep");

  return (
    <AppShell
      title="Purchase Archive"
      subtitle="Closed purchase applications & archived procurement files."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="rounded-xl border border-graphite-200 bg-white p-8 text-center shadow-card">
        <FileText size={40} className="mx-auto text-graphite-300 mb-2" />
        <h3 className="text-base font-semibold text-graphite-800">Archived Purchase Records</h3>
        <p className="text-xs text-graphite-500 mt-1 max-w-md mx-auto">
          All finalized, closed purchase orders and procurement reports are stored here for audit history.
        </p>
      </div>
    </AppShell>
  );
}
