import { useState } from "react";
import {
  Plus,
  Search,
  Pencil,
  Ban,
  CheckCircle2,
  X,
  UserCircle2,
} from "lucide-react";
import type { RoleKey } from "../../data/roles";
import type { User } from "../../data/users";
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

const emptyForm = { name: "", email: "", role: allRoles[0], plant: defaultPlants[0]?.name ?? "" };

export default function UserManagementPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [users, setUsers] = useState<User[]>(defaultUsers);
  const [search, setSearch] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);
  const [form, setForm] = useState(emptyForm);

  const filtered = users.filter(
    (u) =>
      u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase())
  );

  function openAdd() {
    setEditId(null);
    setForm(emptyForm);
    setShowModal(true);
  }

  function openEdit(u: User) {
    setEditId(u.id);
    setForm({ name: u.name, email: u.email, role: u.role, plant: u.plant });
    setShowModal(true);
  }

  function handleSave() {
    if (!form.name.trim() || !form.email.trim()) return;
    if (editId) {
      setUsers((prev) =>
        prev.map((u) =>
          u.id === editId ? { ...u, name: form.name, email: form.email, role: form.role, plant: form.plant } : u
        )
      );
    } else {
      const newUser: User = {
        id: `u${Date.now()}`,
        name: form.name,
        email: form.email,
        role: form.role,
        plant: form.plant,
        status: "Active",
      };
      setUsers((prev) => [...prev, newUser]);
    }
    setShowModal(false);
  }

  function toggleStatus(id: string) {
    setUsers((prev) =>
      prev.map((u) =>
        u.id === id ? { ...u, status: u.status === "Active" ? "Disabled" : "Active" } : u
      )
    );
  }

  return (
    <AppShell
      title="User Management"
      subtitle="Manage system users, their roles and plant assignments."
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
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-xs flex-1">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
          <input
            type="text"
            placeholder="Search users…"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-graphite-200 bg-white py-2.5 pl-9 pr-3 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
          />
        </div>
        <button
          onClick={openAdd}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-primary-700 active:translate-y-px"
        >
          <Plus size={15} />
          Add User
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">User</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Email</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Role</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Plant</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Status</th>
              <th className="px-5 py-3 font-semibold text-graphite-500 text-xs tracking-wide uppercase">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {filtered.map((u) => (
              <tr key={u.id} className="transition hover:bg-graphite-50/50">
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-2.5">
                    <div className="flex h-8 w-8 flex-none items-center justify-center rounded-full bg-primary-50 text-primary-600">
                      <UserCircle2 size={18} strokeWidth={1.5} />
                    </div>
                    <span className="font-medium text-graphite-800">{u.name}</span>
                  </div>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{u.email}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">{u.role}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600">{u.plant}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-xs font-medium ${
                      u.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : "bg-graphite-100 text-graphite-500"
                    }`}
                  >
                    {u.status === "Active" ? <CheckCircle2 size={12} /> : <Ban size={12} />}
                    {u.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <div className="flex items-center gap-1">
                    <button
                      onClick={() => openEdit(u)}
                      className="rounded-md p-1.5 text-graphite-400 transition hover:bg-graphite-100 hover:text-primary-600"
                      title="Edit user"
                    >
                      <Pencil size={15} />
                    </button>
                    <button
                      onClick={() => toggleStatus(u.id)}
                      className="rounded-md p-1.5 text-graphite-400 transition hover:bg-graphite-100 hover:text-amber-600"
                      title={u.status === "Active" ? "Disable user" : "Enable user"}
                    >
                      {u.status === "Active" ? <Ban size={15} /> : <CheckCircle2 size={15} />}
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={6} className="px-5 py-10 text-center text-sm text-graphite-400">
                  No users found.
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
                  {editId ? "Edit User" : "Add New User"}
                </h2>
                <p className="text-xs text-graphite-500 mt-0.5">
                  {editId
                    ? "Update user details below."
                    : "Create a user and assign a role and plant. Prototype only — changes are not saved."}
                </p>
              </div>
              <button onClick={() => setShowModal(false)} className="rounded-md p-1 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600">
                <X size={18} />
              </button>
            </div>

            <div className="flex flex-col gap-4">
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Full Name</label>
                <input
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  placeholder="Enter full name"
                />
              </div>
              <div>
                <label className="mb-1.5 block text-xs font-medium text-graphite-600">Email</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  className="w-full rounded-lg border border-graphite-200 bg-white px-3 py-2.5 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                  placeholder="you@rungtasteel.com"
                />
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
                {editId ? "Update User" : "Save User"}
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
