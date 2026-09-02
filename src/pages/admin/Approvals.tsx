import { useState } from "react";
import { Eye, Download, Check, MessageSquare, Clock, ArrowLeft, FileText } from "lucide-react";
import type { RoleKey } from "../../data/roles";
import { defaultApplications, defaultDocuments, defaultActivity, workflowStages } from "../../data/applications";
import AppShell from "../../components/shared/AppShell";

export default function AdminApprovalsPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [selectedAppId, setSelectedAppId] = useState<string | null>(null);

  const selectedApp = selectedAppId ? defaultApplications.find(a => a.id === selectedAppId) : null;
  const selectedDocs = selectedAppId ? defaultDocuments.filter(d => d.applicationId === selectedAppId) : [];
  const selectedLogs = selectedAppId ? (defaultActivity[selectedAppId] || []) : [];

  return (
    <AppShell
      title="Approval"
      subtitle="Supervisory overview of active approval pipelines."
      activeRole={role}
      onRoleChange={setRole}
    >
      {selectedApp ? (
        // REVIEW VIEW
        <div className=" mx-auto animate-[fadeInUp_.3s_ease_forwards]">
          <button
            onClick={() => setSelectedAppId(null)}
            className="flex items-center gap-1.5 text-sm font-medium text-graphite-500 hover:text-graphite-800 transition mb-5"
          >
            <ArrowLeft size={16} />
            Back to Dashboard
          </button>

          {/* Card 1: Header */}
          <div className="bg-white border border-graphite-100 rounded-[14px] p-5 shadow-sm mb-5">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h2 className="font-display text-[17px] font-bold text-graphite-900 border-b border-transparent">
                  Application ID: <span className="font-mono">{selectedApp.id}</span>
                </h2>
                <p className="text-sm text-graphite-500 mt-1">{selectedApp.title || "Purchase Document Submission"}</p>
              </div>
              <span className="bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[11px] font-bold tracking-wide uppercase">
                {selectedApp.status.toUpperCase()}
              </span>
            </div>

            <div className="h-px bg-graphite-100 w-full mb-5" />

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div>
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">Plant</p>
                <p className="text-sm font-medium text-graphite-800">{selectedApp.plant}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">Department</p>
                <p className="text-sm font-medium text-graphite-800">{selectedApp.department}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">Submitted By</p>
                <p className="text-sm font-medium text-graphite-800">{selectedApp.submittedBy}</p>
              </div>
              <div>
                <p className="text-[10px] font-bold text-graphite-400 uppercase tracking-widest mb-1.5">Submitted On</p>
                <p className="text-sm font-medium text-graphite-800">{selectedApp.submittedOn}</p>
              </div>
            </div>
          </div>

          {/* Card 2: Workflow Status */}
          <div className="bg-white border border-graphite-100 rounded-[14px] p-6 shadow-sm mb-5">
            <h3 className="font-display font-bold text-[15px] text-graphite-900 mb-6">Workflow Status</h3>

            <div className="flex items-center justify-between relative mt-2 mb-2">
              <div className="absolute top-1/2 left-0 w-full h-0.5 bg-graphite-100 -translate-y-1/2 -z-0" />

              {workflowStages.map((stage, index) => {
                const stageNumber = index + 1;
                const isPassed = selectedApp.currentStage > stageNumber;
                const isCurrent = selectedApp.currentStage === stageNumber;

                return (
                  <div key={stage} className="relative z-10 flex flex-col items-center bg-white px-2">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-xs shadow-sm transition-all ${isPassed ? 'bg-[#00c950] text-white border-2 border-white' :
                      isCurrent ? 'bg-blue-600 text-white border-4 border-blue-100' :
                        'bg-white border-2 border-graphite-200 text-graphite-400'
                      }`}>
                      {isPassed ? <Check size={16} strokeWidth={3} /> : stageNumber}
                    </div>
                    <span className={`text-[11px] font-bold mt-2 pb-0.5 ${isPassed ? 'text-[#00c950]' :
                      isCurrent ? 'text-blue-600' : 'text-graphite-400'
                      }`}>
                      {stage}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Card 3: Documents */}
          <div className="bg-white border border-graphite-100 rounded-[14px] p-6 shadow-sm mb-5">
            <h3 className="font-display font-bold text-[15px] text-graphite-900 mb-4">Documents ({selectedDocs.length})</h3>
            <div className="space-y-3">
              {selectedDocs.map((doc) => (
                <div key={doc.id} className="flex items-center justify-between border border-graphite-100 rounded-[10px] p-3.5 hover:border-graphite-200 transition bg-white/50">
                  <div className="flex items-center gap-3.5 min-w-0">
                    <FileText className="text-accent-500 shrink-0" size={20} strokeWidth={1.5} />
                    <div className="min-w-0">
                      <p className="text-[13px] font-semibold text-accent-600 truncate">{doc.name}</p>
                      <p className="text-[11px] font-medium text-graphite-400 mt-0.5">{doc.type} · PDF · 1.2 MB</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 shrink-0 ml-4">
                    <button className="flex items-center justify-center gap-2 rounded-md border border-graphite-200 px-3 py-1.5 text-xs font-semibold text-graphite-600 hover:bg-graphite-50 transition">
                      <Eye size={14} /> View
                    </button>
                    <button className="flex items-center justify-center gap-2 rounded-md border border-graphite-200 px-3 py-1.5 text-xs font-semibold text-graphite-600 hover:bg-graphite-50 transition">
                      <Download size={14} /> Download
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Grid Layout Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {/* Remarks */}
            <div className="bg-white border border-graphite-100 rounded-[14px] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-4">
                <MessageSquare size={16} className="text-graphite-400" />
                <h3 className="font-display font-bold text-[14px] text-graphite-900">Remarks</h3>
              </div>
              <p className="text-[13px] text-graphite-400 font-medium">No remarks yet.</p>
            </div>

            {/* Activity */}
            <div className="bg-white border border-graphite-100 rounded-[14px] p-6 shadow-sm">
              <div className="flex items-center gap-2 mb-5">
                <Clock size={16} className="text-graphite-400" />
                <h3 className="font-display font-bold text-[14px] text-graphite-900">Activity</h3>
              </div>

              <div className="space-y-4">
                {selectedLogs.map((log, i) => (
                  <div key={log.id} className="relative pl-5">
                    <span className="absolute left-0 top-1.5 w-[5px] h-[5px] bg-blue-500 rounded-full" />
                    <p className="text-[13px] font-semibold text-graphite-800 leading-snug">{log.action}</p>
                    <p className="text-[11px] text-graphite-400 mt-1">{log.user}{log.role ? ` - ${log.role}` : ""} · {log.timestamp}</p>
                    {log.remark && (
                      <p className="mt-1.5 text-xs text-graphite-500 italic">"{log.remark}"</p>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

        </div>
      ) : (
        // LIST VIEW
        <div className="animate-[fadeInUp_.3s_ease_forwards]">
          <p className="text-sm font-semibold text-graphite-500 mb-4">
            Applications pending action for <span className="text-graphite-800">Admin</span>.
          </p>

          <div className="bg-white border border-graphite-100 rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse min-w-[800px]">
                <thead>
                  <tr className="border-b border-graphite-100 bg-white">
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Application ID</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Plant</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Department</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Stage</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest whitespace-nowrap">Status</th>
                    <th className="py-4 px-6 text-[10px] font-bold text-graphite-400 uppercase tracking-widest text-right whitespace-nowrap">Action</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-graphite-100">
                  {defaultApplications.map((app) => (
                    <tr key={app.id} className="hover:bg-graphite-50/50 transition">
                      <td className="py-4 px-6 font-mono text-[13px] font-semibold text-blue-700 whitespace-nowrap">
                        {app.id}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-graphite-600 whitespace-nowrap">
                        {app.plant}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-graphite-600 whitespace-nowrap">
                        {app.department.toUpperCase()}
                      </td>
                      <td className="py-4 px-6 text-sm font-medium text-graphite-600 whitespace-nowrap">
                        {workflowStages[app.currentStage - 1] || "Unknown Stage"}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        <span className="inline-block bg-blue-50 text-blue-600 border border-blue-100 px-3 py-1 rounded-full text-[10px] font-bold tracking-wide uppercase">
                          {app.status}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-right whitespace-nowrap">
                        <button
                          onClick={() => setSelectedAppId(app.id)}
                          className="inline-flex items-center justify-center gap-2 rounded-[8px] border border-graphite-200 bg-white px-3 py-1.5 text-xs font-semibold text-graphite-700 shadow-sm hover:border-graphite-300 hover:bg-graphite-50 transition"
                        >
                          <Eye size={14} className="text-graphite-500" />
                          Review
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
