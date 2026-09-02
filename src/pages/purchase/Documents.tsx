import { useState } from "react";
import { Search, FileText, Eye, Download, X } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultDocuments, type AppDocument } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

const docTypes = ["All", ...Array.from(new Set(defaultDocuments.map((d) => d.type)))];

function typeBadge(type: string) {
  const map: Record<string, string> = {
    "Technical Report": "bg-sky-50 text-sky-700 border border-sky-200",
    "Cost Statement": "bg-amber-50 text-amber-700 border border-amber-200",
    "Supporting Document": "bg-violet-50 text-violet-700 border border-violet-200",
  };
  return map[type] ?? "bg-graphite-100 text-graphite-600 border border-graphite-200";
}

export default function PurchaseDocumentsPage() {
  const [role, setRole] = useState<RoleKey>("purchase_rep");
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");
  const [viewingDoc, setViewingDoc] = useState<AppDocument | null>(null);

  // Purchase rep only sees their own department docs
  const docs = defaultDocuments.filter((d) => {
    const matchSearch =
      d.name.toLowerCase().includes(search.toLowerCase()) ||
      d.applicationId.toLowerCase().includes(search.toLowerCase()) ||
      d.uploadedBy.toLowerCase().includes(search.toLowerCase());
    const matchType = typeFilter === "All" || d.type === typeFilter;
    return matchSearch && matchType;
  });

  return (
    <AppShell
      title="Documents"
      subtitle="Document repository for your submitted applications."
      activeRole={role}
      onRoleChange={setRole}
    >
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Filters */}
      <div className="mb-5 flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
          <input
            type="text"
            placeholder="Search document name, App ID, uploader..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-lg border border-graphite-200 bg-white py-2 pl-9 pr-3 text-sm text-graphite-700 outline-none focus:border-primary-400"
          />
        </div>
        <div className="flex items-center gap-2">
          <label className="text-xs font-medium text-graphite-500">Doc Type:</label>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-graphite-200 bg-white px-3 py-2 text-xs text-graphite-700 outline-none focus:border-primary-400"
          >
            {docTypes.map((t) => <option key={t}>{t}</option>)}
          </select>
        </div>
        <span className="ml-auto text-xs font-semibold text-graphite-500 uppercase tracking-wide">
          {docs.length} Documents
        </span>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60 text-xs font-semibold uppercase tracking-wide text-graphite-500">
              <th className="px-5 py-3">Document Name</th>
              <th className="px-5 py-3">App ID</th>
              <th className="px-5 py-3">Category</th>
              <th className="px-5 py-3">Department</th>
              <th className="px-5 py-3">Uploaded By</th>
              <th className="px-5 py-3">Uploaded On</th>
              <th className="px-5 py-3 text-right">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {docs.map((doc) => (
              <tr key={doc.id} className="hover:bg-graphite-50/50 transition">
                <td className="px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <FileText size={16} className="text-primary-600 flex-shrink-0" />
                    <span className="font-medium text-graphite-800">{doc.name}</span>
                  </div>
                </td>
                <td className="px-5 py-3.5 font-mono text-xs font-medium text-primary-600">{doc.applicationId}</td>
                <td className="px-5 py-3.5">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${typeBadge(doc.type)}`}>
                    {doc.type}
                  </span>
                </td>
                <td className="px-5 py-3.5">
                  <span className="rounded-full bg-graphite-100 px-2.5 py-0.5 text-xs font-semibold text-graphite-700">
                    {doc.department}
                  </span>
                </td>
                <td className="px-5 py-3.5 text-xs text-graphite-600">{doc.uploadedBy}</td>
                <td className="px-5 py-3.5 font-mono text-xs text-graphite-500">{doc.uploadedOn}</td>
                <td className="px-5 py-3.5 text-right">
                  <div className="flex items-center justify-end gap-1.5">
                    <button
                      onClick={() => setViewingDoc(doc)}
                      className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-semibold text-graphite-700 hover:border-primary-300 hover:text-primary-700 transition"
                    >
                      <Eye size={13} /> View
                    </button>
                    <button className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-semibold text-graphite-700 hover:border-primary-300 hover:text-primary-700 transition">
                      <Download size={13} /> Download
                    </button>
                  </div>
                </td>
              </tr>
            ))}
            {docs.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-graphite-400">
                  No documents match your filters.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* VIEW DOCUMENT DIALOG */}
      {viewingDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-graphite-900/60 p-4 backdrop-blur-sm animate-[fadeInUp_.2s_ease_forwards]">
          <div className="w-full max-w-lg rounded-2xl bg-white shadow-2xl overflow-hidden">
            <div className="flex items-start justify-between border-b border-graphite-100 p-5">
              <div>
                <h3 className="font-display text-base font-semibold text-graphite-800">{viewingDoc.name}</h3>
                <p className="text-xs text-graphite-500 mt-0.5">{viewingDoc.applicationId} · {viewingDoc.department}</p>
              </div>
              <button
                onClick={() => setViewingDoc(null)}
                className="rounded-lg p-1.5 text-graphite-400 hover:bg-graphite-100 hover:text-graphite-600"
              >
                <X size={18} />
              </button>
            </div>

            <div className="mx-5 mt-5 rounded-xl border-2 border-dashed border-graphite-200 bg-graphite-50 p-8 text-center">
              <FileText size={40} className="mx-auto text-graphite-300 mb-3" />
              <p className="text-sm font-semibold text-graphite-600">{viewingDoc.name}</p>
              <p className="text-xs text-graphite-400 mt-1">PDF Document · 1.2 MB</p>
              <p className="text-xs text-graphite-400 mt-3">Document preview not available in prototype mode.</p>
            </div>

            <div className="mx-5 mt-4 grid grid-cols-2 gap-3">
              <div className="rounded-lg bg-graphite-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-graphite-400 mb-0.5">Category</p>
                <span className={`rounded-full px-2 py-0.5 text-xs font-medium ${typeBadge(viewingDoc.type)}`}>
                  {viewingDoc.type}
                </span>
              </div>
              <div className="rounded-lg bg-graphite-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-graphite-400 mb-0.5">Department</p>
                <p className="text-xs font-semibold text-graphite-700">{viewingDoc.department}</p>
              </div>
              <div className="rounded-lg bg-graphite-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-graphite-400 mb-0.5">Uploaded By</p>
                <p className="text-xs font-semibold text-graphite-700">{viewingDoc.uploadedBy}</p>
              </div>
              <div className="rounded-lg bg-graphite-50 p-3">
                <p className="text-[10px] font-semibold uppercase tracking-wider text-graphite-400 mb-0.5">Uploaded On</p>
                <p className="text-xs font-mono text-graphite-700">{viewingDoc.uploadedOn}</p>
              </div>
            </div>

            <div className="flex items-center justify-end gap-2 p-5">
              <button
                onClick={() => setViewingDoc(null)}
                className="rounded-lg border border-graphite-200 px-4 py-2 text-xs font-semibold text-graphite-700 hover:bg-graphite-50"
              >
                Close
              </button>
              <button className="inline-flex items-center gap-1.5 rounded-lg bg-primary-600 px-4 py-2 text-xs font-semibold text-white hover:bg-primary-700">
                <Download size={14} /> Download
              </button>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
