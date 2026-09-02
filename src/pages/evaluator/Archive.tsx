import { useState } from "react";
import { FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import AppShell from "../../components/shared/AppShell";

export default function EvaluatorArchivePage() {
  const [role, setRole] = useState<RoleKey>("evaluator");

  return (
    <AppShell
      title="Evaluator Archive"
      subtitle="Evaluated & closed vendor applications."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="rounded-xl border border-graphite-200 bg-white p-8 text-center shadow-card">
        <FileText size={40} className="mx-auto text-graphite-300 mb-2" />
        <h3 className="text-base font-semibold text-graphite-800">Evaluated Records Archive</h3>
        <p className="text-xs text-graphite-500 mt-1">Read-only historical evaluations.</p>
      </div>
    </AppShell>
  );
}
