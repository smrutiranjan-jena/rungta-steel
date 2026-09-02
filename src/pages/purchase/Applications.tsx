import { useState } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  Edit,
  FileText,
  Download,
  CheckCircle2,
  Circle,
  Clock,
  UserCircle2,
  Plus,
  X,
  Upload,
  Save,
} from "lucide-react";
import type { RoleKey } from "../../data/roles";
import {
  defaultApplications,
  defaultDocuments,
  defaultActivity,
  workflowStages,
  type Application,
} from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

function statusColor(s: string) {
  const map: Record<string, string> = {
    Submitted: "bg-sky-50 text-sky-700 border-sky-200",
    "Under Review": "bg-amber-50 text-amber-700 border-amber-200",
    "Coordinator Review": "bg-sky-50 text-sky-700 border-sky-200",
    Evaluation: "bg-violet-50 text-violet-700 border-violet-200",
    "Technical Review": "bg-teal-50 text-teal-700 border-teal-200",
    "Finance Review": "bg-emerald-50 text-emerald-700 border-emerald-200",
    "Final Document": "bg-primary-50 text-primary-700 border-primary-200",
    Closed: "bg-graphite-100 text-graphite-600 border-graphite-200",
  };
  return map[s] ?? "bg-graphite-100 text-graphite-600 border-graphite-200";
}

export default function PurchaseApplicationsPage() {
  const [role, setRole] = useState<RoleKey>("purchase_rep");
  const [appList, setAppList] = useState<Application[]>(defaultApplications);

  // Modals state
  const [viewingApp, setViewingApp] = useState<Application | null>(null);
  const [editingApp, setEditingApp] = useState<Application | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);

  // Create Form state
  const [title, setTitle] = useState("");
  const [plant, setPlant] = useState("Kamanda Steel Plant (KSP)");
  const [department, setDepartment] = useState("Purchase");
  const [fileName, setFileName] = useState("");

  // Edit Form state
  const [editTitle, setEditTitle] = useState("");
  const [editPlant, setEditPlant] = useState("");
  const [editDepartment, setEditDepartment] = useState("");
  const [editNotes, setEditNotes] = useState("");

  const [toast, setToast] = useState<string | null>(null);

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `PLT-2026-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApp: Application = {
      id: newId,
      title: title || "New Purchase Order",
      plant: plant,
      department: department,
      submittedBy: "R. Sharma",
      submittedOn: new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" }) + ", 10:00",
      status: "Submitted",
      currentStage: 1,
    };

    setAppList([newApp, ...appList]);
    setToast(`Application "${newApp.title}" created successfully! ID: ${newId}`);
    setShowCreateModal(false);
    setTitle("");
    setFileName("");
    setTimeout(() => setToast(null), 4000);
  };

  const openEditModal = (app: Application) => {
    setEditingApp(app);
    setEditTitle(app.title);
    setEditPlant(app.plant);
    setEditDepartment(app.department);
    setEditNotes("Updated details for resubmission.");
  };

  const handleSaveEdit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingApp) return;

    setAppList((prev) =>
      prev.map((item) =>
        item.id === editingApp.id
          ? { ...item, title: editTitle, plant: editPlant, department: editDepartment }
          : item
      )
    );

    setToast(`Application ${editingApp.id} updated successfully!`);
    setEditingApp(null);
    setTimeout(() => setToast(null), 4000);
  };

  return (
    <AppShell
      title="My Applications (Purchase)"
      subtitle="Create, submit, track, view, and edit purchase document applications."
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {toast && (
        <div className="mb-4 flex items-center justify-between rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-emerald-800 animate-[fadeInUp_.3s_ease_forwards]">
          <div className="flex items-center gap-2.5 text-sm font-medium">
            <CheckCircle2 size={18} className="text-emerald-600" />
            {toast}
          </div>
          <button onClick={() => setToast(null)} className="text-emerald-600">
            <X size={16} />
          </button>
        </div>
      )}

      {/* Header Action Bar */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h2 className="text-sm font-semibold text-graphite-800">Purchase Representative Dashboard</h2>
          <p className="text-xs text-graphite-500">Manage all your submitted purchase documents</p>
        </div>
        <button
          onClick={() => setShowCreateModal(true)}
          className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white shadow-sm transition hover:bg-primary-700"
        >
          <Plus size={15} /> Create New Application
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Application ID</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Title</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Plant</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Submitted On</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Status</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {appList.map((app) => (
              <tr key={app.id} className="transition hover:bg-graphite-50/50">
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs font-medium text-primary-600">{app.id}</td>
                <td className="px-5 py-3.5 text-graphite-800 font-medium">{app.title}</td>
                <td className="whitespace-nowrap px-5 py-3.5 text-graphite-600 text-xs">{app.plant}</td>
                <td className="whitespace-nowrap px-5 py-3.5 font-mono text-xs text-graphite-500">{app.submittedOn}</td>
                <td className="whitespace-nowrap px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium border ${statusColor(app.status)}`}>
                    {app.status}
                  </span>
                </td>
                <td className="whitespace-nowrap px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setViewingApp(app)}
                      className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1.5 text-xs font-semibold text-graphite-700 hover:border-primary-300 hover:text-primary-700"
                    >
                      <Eye size={13} /> View
                    </button>
                    <button
                      onClick={() => openEditModal(app)}
                      className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1.5 text-xs font-semibold text-graphite-700 hover:border-amber-300 hover:text-amber-700"
                    >
                      <Edit size={13} /> Edit
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* VIEW DIALOG MODAL */}
      {viewingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/60 p-4 backdrop-blur-sm animate-[fadeInUp_.2s_ease_forwards]">
          <div className="w-full max-w-3xl rounded-2xl bg-white p-6 shadow-2xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-start justify-between border-b border-graphite-100 pb-4">
              <div>
                <span className="font-mono text-xs font-semibold text-primary-600">{viewingApp.id}</span>
                <h3 className="font-display text-lg font-semibold text-graphite-800">{viewingApp.title}</h3>
                <p className="text-xs text-graphite-500 mt-0.5">{viewingApp.plant} · {viewingApp.department}</p>
              </div>
              <button
                onClick={() => setViewingApp(null)}
                className="rounded-lg p-1.5 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600"
              >
                <X size={18} />
              </button>
            </div>

            {/* Workflow Progress Stepper */}
            <div className="my-5 rounded-xl border border-graphite-200 bg-graphite-50/50 p-4">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-graphite-500 mb-3">Workflow Status Stepper</h4>
              <div className="flex items-center gap-0 overflow-x-auto py-1">
                {workflowStages.map((stage, i) => {
                  const stepNum = i + 1;
                  const done = stepNum < viewingApp.currentStage;
                  const active = stepNum === viewingApp.currentStage;
                  return (
                    <div key={stage} className="flex items-center">
                      <div className="flex flex-col items-center gap-1">
                        <div
                          className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-semibold ${done
                            ? "bg-emerald-500 text-white"
                            : active
                              ? "bg-primary-600 text-white ring-4 ring-primary-100"
                              : "bg-graphite-200 text-graphite-500"
                            }`}
                        >
                          {done ? <CheckCircle2 size={15} /> : active ? <Clock size={13} /> : <Circle size={13} />}
                        </div>
                        <span className={`text-[10px] font-medium whitespace-nowrap ${active ? "text-primary-700 font-bold" : "text-graphite-500"}`}>
                          {stage}
                        </span>
                      </div>
                      {i < workflowStages.length - 1 && (
                        <div className={`mx-1 h-0.5 w-6 flex-none ${done ? "bg-emerald-400" : "bg-graphite-200"}`} />
                      )}
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Attached Docs */}
            <div className="mb-5">
              <h4 className="text-xs font-semibold uppercase tracking-wider text-graphite-500 mb-2">Attached Documents</h4>
              <div className="space-y-2">
                {defaultDocuments
                  .filter((d) => d.applicationId === viewingApp.id)
                  .map((doc) => (
                    <div key={doc.id} className="flex items-center justify-between rounded-lg border border-graphite-200 bg-white p-3">
                      <div className="flex items-center gap-2.5">
                        <FileText size={16} className="text-primary-600" />
                        <div>
                          <p className="text-xs font-medium text-graphite-800">{doc.name}</p>
                          <p className="text-[10px] text-graphite-400">{doc.type} · {doc.uploadedOn}</p>
                        </div>
                      </div>
                      <button className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-medium text-graphite-600 hover:border-primary-300 hover:text-primary-700">
                        <Download size={12} /> Download
                      </button>
                    </div>
                  ))}
              </div>
            </div>

            {/* Activity History */}
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-graphite-500 mb-2">Activity & Remarks</h4>
              <div className="space-y-2">
                {(defaultActivity[viewingApp.id] || []).map((act) => (
                  <div key={act.id} className="rounded-lg border border-graphite-100 bg-graphite-50 p-3 text-xs">
                    <p className="font-semibold text-graphite-800">{act.action}</p>
                    <p className="text-[11px] text-graphite-500 mt-0.5">{act.user} ({act.role}) · {act.timestamp}</p>
                    {act.remark && <p className="mt-1 font-mono text-[11px] text-graphite-600 bg-white p-2 rounded border border-graphite-200">"{act.remark}"</p>}
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setViewingApp(null)}
                className="rounded-lg border border-graphite-200 px-4 py-2 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
              >
                Close View
              </button>
            </div>
          </div>
        </div>
      )}

      {/* EDIT SUBMISSION DIALOG MODAL */}
      {editingApp && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/60 p-4 backdrop-blur-sm animate-[fadeInUp_.2s_ease_forwards]">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-graphite-100 pb-3">
              <div>
                <h3 className="font-display text-base font-semibold text-graphite-800">
                  Edit Submission ({editingApp.id})
                </h3>
                <p className="text-xs text-graphite-500">Update application details and re-submit for review.</p>
              </div>
              <button onClick={() => setEditingApp(null)} className="rounded-lg p-1 text-graphite-400 hover:bg-graphite-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleSaveEdit} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">Application Title</label>
                <input
                  type="text"
                  required
                  value={editTitle}
                  onChange={(e) => setEditTitle(e.target.value)}
                  className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">Plant Location</label>
                  <select
                    value={editPlant}
                    onChange={(e) => setEditPlant(e.target.value)}
                    className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400"
                  >
                    <option value="Kamanda Steel Plant (KSP)">Kamanda Steel Plant (KSP)</option>
                    <option value="Rourkela Plant (RSP)">Rourkela Plant (RSP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">Department</label>
                  <input
                    type="text"
                    value={editDepartment}
                    onChange={(e) => setEditDepartment(e.target.value)}
                    className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">Revision / Update Notes</label>
                <textarea
                  rows={3}
                  value={editNotes}
                  onChange={(e) => setEditNotes(e.target.value)}
                  placeholder="Notes regarding changes made..."
                  className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">Update Document Attachment</label>
                <div className="rounded-xl border-2 border-dashed border-graphite-200 bg-graphite-50 p-4 text-center">
                  <Upload size={20} className="mx-auto text-graphite-400 mb-1" />
                  <p className="text-xs text-graphite-600">Click or drag updated file here</p>
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEditingApp(null)}
                  className="rounded-lg border border-graphite-200 px-4 py-2 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700"
                >
                  <Save size={14} /> Save & Resubmit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* CREATE APPLICATION MODAL */}
      {showCreateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/60 p-4 backdrop-blur-sm animate-[fadeInUp_.2s_ease_forwards]">
          <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-2xl">
            <div className="flex items-center justify-between border-b border-graphite-100 pb-3">
              <h3 className="font-display text-base font-semibold text-graphite-800">
                Create & Submit Purchase Application
              </h3>
              <button onClick={() => setShowCreateModal(false)} className="rounded-lg p-1 text-graphite-400 hover:bg-graphite-100">
                <X size={18} />
              </button>
            </div>

            <form onSubmit={handleCreate} className="mt-4 space-y-3">
              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">Application Title</label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="e.g. Purchase Order Renewal for Plant Equipment"
                  className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">Plant</label>
                  <select
                    value={plant}
                    onChange={(e) => setPlant(e.target.value)}
                    className="w-full rounded-lg border border-graphite-200 p-2.5 text-xs text-graphite-800 outline-none focus:border-primary-400"
                  >
                    <option value="Kamanda Steel Plant (KSP)">Kamanda Steel Plant (KSP)</option>
                    <option value="Rourkela Plant (RSP)">Rourkela Plant (RSP)</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-graphite-700 mb-1">Department</label>
                  <input
                    type="text"
                    disabled
                    value={department}
                    className="w-full rounded-lg border border-graphite-200 bg-graphite-50 p-2.5 text-xs text-graphite-600"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-graphite-700 mb-1">Attach Primary Document</label>
                <div className="rounded-xl border-2 border-dashed border-graphite-200 bg-graphite-50 p-5 text-center">
                  <Upload size={24} className="mx-auto text-graphite-400 mb-1.5" />
                  <p className="text-xs text-graphite-700">Click or drag document to attach</p>
                  <input
                    type="text"
                    placeholder="Enter file name (e.g. KSP_Purchase_Specs.pdf)"
                    value={fileName}
                    onChange={(e) => setFileName(e.target.value)}
                    className="mt-2 w-full rounded-md border border-graphite-200 bg-white p-2 text-xs outline-none"
                  />
                </div>
              </div>

              <div className="mt-6 flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowCreateModal(false)}
                  className="rounded-lg border border-graphite-200 px-4 py-2 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white transition hover:bg-primary-700"
                >
                  Submit Application
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </AppShell>
  );
}
