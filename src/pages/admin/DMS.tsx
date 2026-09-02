import { useState } from "react";
import { Search, Eye, X, Download, FileText, Calendar, ChevronDown, FileIcon } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultDocuments, defaultApplications, defaultActivity } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function AdminDMSPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [selectedDocId, setSelectedDocId] = useState<string | null>(null);

  // Derive document list and statuses dynamically from app status for the UI prototype look
  const dmsDocs = defaultDocuments.map((doc) => {
    const parentApp = defaultApplications.find(a => a.id === doc.applicationId);
    let derivedStatus = { label: "Unknown", color: "text-graphite-600 border-graphite-200" };

    if (parentApp) {
      if (parentApp.status === "Closed") {
        derivedStatus = doc.name.includes("Final") ?
          { label: "Final", color: "bg-blue-50 text-blue-600 border-blue-100" } :
          { label: "Approved", color: "text-[#00c950] border-[#00c950]/30" };
      } else {
        derivedStatus = { label: "Pending Verification", color: "text-amber-600 border-amber-200" };
      }
    }

    return { ...doc, derivedStatus };
  });

  const selectedDoc = selectedDocId ? dmsDocs.find(d => d.id === selectedDocId) : null;
  const relatedLog = selectedDoc ? (defaultActivity[selectedDoc.applicationId]?.[0]) : null;

  return (
    <AppShell
      title="DMS"
      subtitle="Complete document management system hierarchy."
      activeRole={role}
      onRoleChange={setRole}
    >
      <div className="animate-[fadeInUp_.3s_ease_forwards] space-y-5">

        {/* Filters Top Bar */}
        <div className="bg-white border border-graphite-100 rounded-xl p-4 shadow-sm flex flex-wrap items-center gap-4">
          {/* Search */}
          <div className="relative flex-1 min-w-[250px]">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" size={16} />
            <input
              type="text"
              placeholder="Search Application / Document"
              className="w-full pl-9 pr-4 py-2 text-sm border border-graphite-200 outline-none focus:border-primary-400 focus:ring-1 focus:ring-primary-400 rounded-lg placeholder-graphite-400 transition"
            />
          </div>

          {/* Selects */}
          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-graphite-600">Plant</span>
            <div className="relative">
              <select className="appearance-none border border-graphite-200 rounded-lg py-2 pl-3 pr-8 text-sm outline-none bg-white min-w-[120px] focus:border-primary-400 text-graphite-800">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-graphite-600">Department</span>
            <div className="relative">
              <select className="appearance-none border border-graphite-200 rounded-lg py-2 pl-3 pr-8 text-sm outline-none bg-white min-w-[120px] focus:border-primary-400 text-graphite-800">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400 pointer-events-none" />
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-[13px] font-semibold text-graphite-600">Status</span>
            <div className="relative">
              <select className="appearance-none border border-graphite-200 rounded-lg py-2 pl-3 pr-8 text-sm outline-none bg-white min-w-[120px] focus:border-primary-400 text-graphite-800">
                <option>All</option>
              </select>
              <ChevronDown size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400 pointer-events-none" />
            </div>
          </div>

          {/* Date Range */}
          <div className="flex items-center gap-3 bg-white w-full border-t border-graphite-100 pt-4 mt-1 lg:w-auto lg:border-t-0 lg:pt-0 lg:mt-0">
            <span className="text-[13px] font-semibold text-graphite-600">From</span>
            <div className="relative">
              <input type="text" placeholder="dd-mm-yyyy" className="w-[130px] border border-graphite-200 rounded-lg py-2 pl-3 pr-8 text-sm outline-none focus:border-primary-400 text-graphite-800" />
              <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400 pointer-events-none" />
            </div>
            <span className="text-[13px] font-semibold text-graphite-600 ml-1">To</span>
            <div className="relative">
              <input type="text" placeholder="dd-mm-yyyy" className="w-[130px] border border-graphite-200 rounded-lg py-2 pl-3 pr-8 text-sm outline-none focus:border-primary-400 text-graphite-800" />
              <Calendar size={14} className="absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400 pointer-events-none" />
            </div>
          </div>
        </div>

        {/* List Table */}
        <div className="bg-white border border-graphite-100 rounded-xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse min-w-[900px]">
              <thead>
                <tr className="border-b border-graphite-100 bg-white">
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Application ID</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Plant</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Department</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Document</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                  <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-graphite-100">
                {dmsDocs.map((doc) => (
                  <tr key={doc.id} className="hover:bg-graphite-50/50 transition">
                    <td className="py-5 px-6 font-mono text-[13px] font-semibold text-blue-700 whitespace-nowrap">
                      {doc.applicationId}
                    </td>
                    <td className="py-5 px-6 text-[13px] font-medium text-graphite-600 whitespace-nowrap">
                      {doc.plant}
                    </td>
                    <td className="py-5 px-6 text-[13px] font-medium text-graphite-600 whitespace-nowrap">
                      {doc.department.toUpperCase()}
                    </td>
                    <td className="py-5 px-6 text-[13px] font-medium text-graphite-700 whitespace-nowrap">
                      {doc.name}
                    </td>
                    <td className="py-5 px-6 whitespace-nowrap">
                      <span className={`inline-block px-3 py-1 rounded-[20px] text-[10px] font-bold tracking-wide border ${doc.derivedStatus.color}`}>
                        {doc.derivedStatus.label}
                      </span>
                    </td>
                    <td className="py-5 px-6 text-right whitespace-nowrap">
                      <button
                        onClick={() => setSelectedDocId(doc.id)}
                        className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-graphite-200 bg-white px-3 py-1.5 text-xs font-semibold text-graphite-700 shadow-sm hover:border-graphite-300 hover:bg-graphite-50 transition"
                      >
                        <Eye size={14} className="text-graphite-800" strokeWidth={2} />
                        View
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* VIEW DIALOG MODAL */}
      {selectedDoc && (
        <div className="fixed inset-0 z-50 flex items-center justify-center px-4 animate-[fadeIn_.2s_ease_forwards]">
          {/* Backdrop */}
          <div className="absolute inset-0 bg-graphite-900/40 backdrop-blur-sm" onClick={() => setSelectedDocId(null)} />

          {/* Dialog Container */}
          <div className="relative bg-white rounded-2xl w-full max-w-2xl shadow-2xl flex flex-col overflow-hidden animate-[scaleIn_.2s_ease_out_forwards]">

            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-graphite-100">
              <div className="flex items-center gap-3">
                <FileText className="text-accent-500" size={24} strokeWidth={1.5} />
                <h2 className="font-display text-[17px] font-bold text-graphite-900">{selectedDoc.name}</h2>
              </div>
              <button onClick={() => setSelectedDocId(null)} className="text-graphite-400 hover:text-graphite-600 transition p-1">
                <X size={20} />
              </button>
            </div>

            {/* Content Body */}
            <div className="p-6 overflow-y-auto">

              {/* Dummy Prototype Document Preview */}
              <div className="border border-graphite-200 rounded-xl p-6 bg-white shadow-sm relative overflow-hidden mb-6 group">
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-3">Prototype Preview — Sample Document</p>
                <h3 className="font-display font-bold text-[18px] text-graphite-900 mb-6">{selectedDoc.type}</h3>

                {/* Dummy Text Bars */}
                <div className="space-y-3 relative z-10 w-full max-w-sm">
                  <div className="h-3 bg-graphite-100 rounded-full w-full" />
                  <div className="h-3 bg-graphite-100 rounded-full w-11/12" />
                  <div className="h-3 bg-graphite-100 rounded-full w-[85%]" />
                  <div className="h-3 bg-graphite-100 rounded-full w-[95%]" />
                  <div className="h-3 bg-graphite-100 rounded-full w-4/5" />
                  <div className="h-3 bg-graphite-100 rounded-full w-[60%]" />
                </div>

                {/* Background decorative watermark */}
                <FileIcon size={120} className="absolute -bottom-6 -right-6 text-graphite-50 group-hover:text-graphite-100 transition duration-500" strokeWidth={1} />
              </div>

              {/* Approval Log Segment */}
              <div>
                <p className="text-[11px] font-bold text-graphite-400 uppercase tracking-widest mb-3">Approval Log</p>
                <div className="border border-graphite-200 rounded-xl bg-white p-4">
                  {relatedLog ? (
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 mt-1.5 rounded-full bg-[#00c950] shrink-0" />
                      <div>
                        <p className="text-[13px] font-semibold text-graphite-800 leading-snug">{relatedLog.action}</p>
                        <p className="text-[13px] text-graphite-500 mt-0.5">{relatedLog.role} · {relatedLog.timestamp}</p>
                      </div>
                    </div>
                  ) : (
                    <p className="text-sm text-graphite-500">No logs found.</p>
                  )}
                </div>
              </div>

            </div>

            {/* Footer */}
            <div className="px-6 py-4 border-t border-graphite-100 bg-graphite-50 flex items-center justify-end gap-3 rounded-b-2xl">
              <button
                onClick={() => setSelectedDocId(null)}
                className="px-4 py-2 border border-graphite-200 bg-white rounded-lg text-[13px] font-semibold text-graphite-700 hover:bg-graphite-50 transition"
              >
                Close
              </button>
              <button className="flex items-center gap-2 px-5 py-2 bg-blue-600 text-white rounded-lg text-[13px] font-semibold hover:bg-blue-700 transition">
                <Download size={16} /> Download
              </button>
            </div>

          </div>
        </div>
      )}

      {/* Required for dialog animations */}
      <style>{`
        @keyframes scaleIn {
          from { opacity: 0; transform: scale(0.95); }
          to { opacity: 1; transform: scale(1); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
      `}</style>
    </AppShell>
  );
}
