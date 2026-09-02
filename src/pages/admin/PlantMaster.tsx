import { useState } from "react";
import { Plus, Pencil, X, Factory, CheckCircle2 } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import type { Plant } from "../../data/plants";
import { defaultPlants } from "../../data/plants";
import AppShell from "../../components/shared/AppShell";

const emptyForm = { code: "", name: "", location: "", status: "Active" as Plant["status"] };

export default function PlantMasterPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [plants, setPlants] = useState<Plant[]>(defaultPlants);
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  function openAdd() {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(p: Plant) {
    setEditId(p.id);
    setForm({ code: p.code, name: p.name, location: p.location, status: p.status });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.code.trim() || !form.name.trim()) return;
    if (editId) {
      setPlants((prev) =>
        prev.map((p) =>
          p.id === editId ? { ...p, code: form.code, name: form.name, location: form.location, status: form.status } : p
        )
      );
    } else {
      const newPlant: Plant = {
        id: `p${Date.now()}`,
        code: form.code,
        name: form.name,
        location: form.location,
        status: form.status,
      };
      setPlants((prev) => [...prev, newPlant]);
    }
    setShowModal(false);
  }

  return (
    <AppShell
      title="Plant Master"
      subtitle="Master list of plants available for document submissions."
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
          Add Plant
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Plant Code</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Plant Name</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Location</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Status</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {plants.map((p) => (
              <tr key={p.id} className="transition hover:bg-graphite-50/50">
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-primary-50 text-primary-600">
                      <Factory size={16} />
                    </div>
                    <span className="font-semibold text-graphite-800">{p.code}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-700">{p.name}</td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{p.location}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-medium text-emerald-700">
                    <CheckCircle2 size={12} />
                    {p.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <button
                    onClick={() => openEdit(p)}
                    className="rounded-md p-1.5 text-graphite-400 transition hover:bg-graphite-100 hover:text-primary-600"
                    title="Edit plant"
                  >
                    <Pencil size={15} />
                  </button>
                </td>
              </tr>
            ))}
            {plants.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-10 text-center text-sm text-graphite-400">
                  No plants configured.
                </td>
              </tr>
            )}
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
                  {editId ? "Edit Plant" : "Add New Plant"}
                </h2>
                <p className="text-xs text-graphite-500 mt-0.5">
                  {editId ? "Update plant details below." : "Add a new plant to the master list."}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Plant Code</label>
                <input
                  value={form.code}
                  onChange={(e) => setForm({ ...form, code: e.target.value.toUpperCase() })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  placeholder="e.g. KSP"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Plant Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  placeholder="Kamanda Steel Plant"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Location</label>
                <input
                  value={form.location}
                  onChange={(e) => setForm({ ...form, location: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  placeholder="City name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Status</label>
                <select
                  value={form.status}
                  onChange={(e) => setForm({ ...form, status: e.target.value as Plant["status"] })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                >
                  <option value="Active">Active</option>
                  <option value="Inactive">Inactive</option>
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
                {editId ? "Update Plant" : "Save Plant"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
