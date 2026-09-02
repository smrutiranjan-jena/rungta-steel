import { useState } from "react";
import { Plus, Pencil, X } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import type { UserMapping } from "../../data/userMappings";
import { defaultMappings } from "../../data/userMappings";
import { defaultUsers } from "../../data/users";
import { defaultPlants } from "../../data/plants";
import AppShell from "../../components/shared/AppShell";

const allRoles = [
  "Admin",
  "Purchase Representative",
  "Office Coordinator",
  "Evaluator",
  "Technical User",
  "Finance User",
];

const departments = ["Administration", "Office", "Purchase", "Engineering", "Finance"];

const emptyForm = {
  userId: "",
  role: allRoles[0],
  plant: defaultPlants[0]?.name ?? "",
  department: departments[0],
  reportsToId: "",
};

export default function UserMappingPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [mappings, setMappings] = useState<UserMapping[]>(defaultMappings);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function openAdd() {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(m: UserMapping) {
    setEditId(m.id);
    setForm({
      userId: m.userId,
      role: m.role,
      plant: m.plant,
      department: m.department,
      reportsToId: m.reportsToId,
    });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.userId) return;
    const user = defaultUsers.find((u) => u.id === form.userId);
    const reportsTo = defaultUsers.find((u) => u.id === form.reportsToId);

    if (editId) {
      setMappings((prev) =>
        prev.map((m) =>
          m.id === editId
            ? {
                ...m,
                userId: form.userId,
                userName: user?.name ?? "",
                role: form.role,
                plant: form.plant,
                department: form.department,
                reportsToId: form.reportsToId,
                reportsToName: reportsTo?.name ?? "—",
              }
            : m
        )
      );
    } else {
      const newMapping: UserMapping = {
        id: `m${Date.now()}`,
        userId: form.userId,
        userName: user?.name ?? "",
        role: form.role,
        plant: form.plant,
        department: form.department,
        reportsToId: form.reportsToId,
        reportsToName: reportsTo?.name ?? "—",
      };
      setMappings((prev) => [...prev, newMapping]);
    }
    setShowModal(false);
  }

  return (
    <AppShell
      title="User Mapping"
      subtitle="Map users to roles, plants, departments and their reporting manager."
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes modalIn {
          from { opacity: 0; transform: scale(0.96) translateY(8px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }
      `}</style>

      {/* Toolbar */}
      <div className="mb-5 flex items-center justify-end">
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:translate-y-px"
        >
          <Plus size={15} />
          Add Mapping
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">User</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Role</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Plant</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Department</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Reports To</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {mappings.map((m) => (
              <tr key={m.id} className="transition hover:bg-graphite-50/50">
                <td className="whitespace-nowrap px-5 py-3 font-medium text-graphite-800">{m.userName}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">{m.role}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{m.plant}</td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{m.department}</td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{m.reportsToName}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <button
                    onClick={() => openEdit(m)}
                    className="rounded-md p-1.5 text-graphite-400 transition hover:bg-graphite-100 hover:text-primary-600"
                    title="Edit mapping"
                  >
                    <Pencil size={15} />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/40 backdrop-blur-sm">
          <div className="w-full max-w-md rounded-2xl border border-graphite-200 bg-white p-6 shadow-xl animate-[modalIn_.25s_ease_forwards]">
            <div className="mb-5 flex items-center justify-between">
              <div>
                <h2 className="font-display text-lg font-semibold text-graphite-800">
                  {editId ? "Edit User Mapping" : "Add User Mapping"}
                </h2>
                <p className="text-xs text-graphite-500 mt-0.5">
                  {editId
                    ? "Update mapping details below."
                    : "Map a user to a role, plant, department and reporting manager. Prototype only."}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">User</label>
                <select
                  value={form.userId}
                  onChange={(e) => setForm({ ...form, userId: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">Select user…</option>
                  {defaultUsers.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Role</label>
                <select
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  {allRoles.map((r) => (
                    <option key={r} value={r}>{r}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Plant</label>
                <select
                  value={form.plant}
                  onChange={(e) => setForm({ ...form, plant: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  {defaultPlants.map((p) => (
                    <option key={p.id} value={p.name}>{p.name} ({p.code})</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Department</label>
                <select
                  value={form.department}
                  onChange={(e) => setForm({ ...form, department: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  {departments.map((d) => (
                    <option key={d} value={d}>{d}</option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Reports To</label>
                <select
                  value={form.reportsToId}
                  onChange={(e) => setForm({ ...form, reportsToId: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="">None</option>
                  {defaultUsers.map((u) => (
                    <option key={u.id} value={u.id}>{u.name}</option>
                  ))}
                </select>
              </div>
            </div>

            <div className="mt-6 flex justify-end gap-2">
              <button
                onClick={() => setShowModal(false)}
                className="rounded-lg border border-graphite-200 px-4 py-2 text-sm font-medium text-graphite-600 transition hover:bg-graphite-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="rounded-lg bg-primary-600 px-4 py-2 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:translate-y-px"
              >
                {editId ? "Update Mapping" : "Save Mapping"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
