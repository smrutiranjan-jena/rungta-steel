import { useState } from "react";
import {
  Search,
  ChevronDown,
  Eye,
  ArrowLeft,
  FileText,
  Download,
  CheckCircle2,
  Circle,
  Clock,
  UserCircle2,
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

/* ── status badge colours ── */
function statusColor(s: string) {
  const map: Record<string, string> = {
    Submitted:          "bg-sky-50 text-sky-700",
    "Under Review":     "bg-amber-50 text-amber-700",
    "Coordinator Review":"bg-sky-50 text-sky-700",
    Evaluation:         "bg-violet-50 text-violet-700",
    "Technical Review":  "bg-teal-50 text-teal-700",
    "Finance Review":    "bg-emerald-50 text-emerald-700",
    "Final Document":    "bg-primary-50 text-primary-700",
    Closed:             "bg-graphite-100 text-graphite-600",
  };
  return map[s] ?? "bg-graphite-100 text-graphite-600";
}

/* ===================== LIST VIEW ===================== */
function ApplicationList({ onView }: { onView: (app: Application) => void }) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const statuses = ["All", ...new Set(defaultApplications.map((a) => a.status))];

  const filtered = defaultApplications.filter((a) => {
    const matchText =
      a.id.toLowerCase().includes(search.toLowerCase()) ||
      a.title.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "All" || a.status === statusFilter;
    return matchText && matchStatus;
  });

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Filters */}
      <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 gap-3">
          <div className="relative max-w-xs flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-graphite-400" />
            <input
              type="text"
              placeholder="Search by ID or title…"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full rounded-lg border border-graphite-200 bg-white py-2.5 pl-9 pr-3 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            />
          </div>
          <div className="relative">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="appearance-none rounded-lg border border-graphite-200 bg-white py-2.5 pl-3 pr-8 text-sm text-graphite-700 outline-none transition focus:border-primary-400 focus:ring-2 focus:ring-primary-100"
            >
              {statuses.map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
            <ChevronDown size={14} className="pointer-events-none absolute right-2.5 top-1/2 -translate-y-1/2 text-graphite-400" />
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-graphite-200 bg-white shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <table className="min-w-full text-left text-sm">
          <thead>
            <tr className="border-b border-graphite-100 bg-graphite-50/60">
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Application ID</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Title</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Plant</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Department</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Submitted On</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Status</th>
              <th className="px-5 py-3 text-xs font-semibold uppercase tracking-wide text-graphite-500">Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-graphite-100">
            {filtered.map((app) => (
              <tr key={app.id} className="transition hover:bg-graphite-50/50">
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs font-medium text-primary-600">{app.id}</td>
                <td className="px-5 py-3 text-graphite-800 max-w-xs truncate">{app.title}</td>
                <td className="whitespace-nowrap px-5 py-3 text-graphite-600 text-xs">{app.plant}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span className="rounded-full bg-primary-50 px-2.5 py-0.5 text-xs font-medium text-primary-700">{app.department}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3 font-mono text-xs text-graphite-500">{app.submittedOn}</td>
                <td className="whitespace-nowrap px-5 py-3">
                  <span className={`rounded-full px-2.5 py-0.5 text-xs font-medium ${statusColor(app.status)}`}>{app.status}</span>
                </td>
                <td className="whitespace-nowrap px-5 py-3">
                  <button
                    onClick={() => onView(app)}
                    className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-3 py-1.5 text-xs font-semibold text-graphite-700 transition hover:border-primary-300 hover:text-primary-700"
                  >
                    <Eye size={13} />
                    View
                  </button>
                </td>
              </tr>
            ))}
            {filtered.length === 0 && (
              <tr>
                <td colSpan={7} className="px-5 py-10 text-center text-sm text-graphite-400">
                  No applications found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </>
  );
}

/* ===================== DETAIL VIEW ===================== */
function ApplicationDetail({ app, onBack }: { app: Application; onBack: () => void }) {
  const docs = defaultDocuments.filter((d) => d.applicationId === app.id);
  const activity = defaultActivity[app.id] ?? [];

  return (
    <>
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(6px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      {/* Back */}
      <button
        onClick={onBack}
        className="mb-4 inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 transition hover:text-primary-800"
      >
        <ArrowLeft size={15} />
        Back to Applications
      </button>

      {/* App Meta */}
      <div className="mb-6 rounded-xl border border-graphite-200 bg-white p-5 shadow-card animate-[fadeInUp_.4s_ease_forwards]">
        <div className="mb-4 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-lg font-semibold text-graphite-800">{app.title}</h2>
            <p className="mt-0.5 font-mono text-xs text-graphite-500">{app.id}</p>
          </div>
          <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusColor(app.status)}`}>{app.status}</span>
        </div>
        <div className="grid grid-cols-2 gap-y-3 gap-x-8 text-sm sm:grid-cols-4">
          <div>
            <p className="text-xs text-graphite-400">Plant</p>
            <p className="font-medium text-graphite-700">{app.plant}</p>
          </div>
          <div>
            <p className="text-xs text-graphite-400">Department</p>
            <p className="font-medium text-graphite-700">{app.department}</p>
          </div>
          <div>
            <p className="text-xs text-graphite-400">Submitted By</p>
            <p className="font-medium text-graphite-700">{app.submittedBy}</p>
          </div>
          <div>
            <p className="text-xs text-graphite-400">Submitted On</p>
            <p className="font-medium text-graphite-700">{app.submittedOn}</p>
          </div>
        </div>
      </div>

      {/* Workflow Stepper */}
      <div className="mb-6 rounded-xl border border-graphite-200 bg-white p-5 shadow-card animate-[fadeInUp_.4s_ease_forwards]" style={{ animationDelay: "80ms" }}>
        <h3 className="mb-4 font-display text-sm font-semibold text-graphite-700">Workflow Status</h3>
        <div className="flex items-center gap-0 overflow-x-auto">
          {workflowStages.map((stage, i) => {
            const stepNum = i + 1;
            const done = stepNum < app.currentStage;
            const active = stepNum === app.currentStage;
            return (
              <div key={stage} className="flex items-center">
                <div className="flex flex-col items-center gap-1.5">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full text-xs font-semibold transition ${
                      done
                        ? "bg-emerald-500 text-white"
                        : active
                        ? "bg-primary-600 text-white ring-4 ring-primary-100"
                        : "bg-graphite-100 text-graphite-400"
                    }`}
                  >
                    {done ? <CheckCircle2 size={16} /> : active ? <Clock size={14} /> : <Circle size={14} />}
                  </div>
                  <span
                    className={`whitespace-nowrap text-[11px] font-medium ${
                      done ? "text-emerald-600" : active ? "text-primary-700" : "text-graphite-400"
                    }`}
                  >
                    {stepNum}. {stage}
                  </span>
                </div>
                {i < workflowStages.length - 1 && (
                  <div
                    className={`mx-1 h-0.5 w-8 flex-none sm:w-12 ${
                      done ? "bg-emerald-300" : "bg-graphite-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Attached Documents */}
      <div className="mb-6 rounded-xl border border-graphite-200 bg-white p-5 shadow-card animate-[fadeInUp_.4s_ease_forwards]" style={{ animationDelay: "160ms" }}>
        <h3 className="mb-3 font-display text-sm font-semibold text-graphite-700">Attached Documents</h3>
        {docs.length === 0 ? (
          <p className="text-sm text-graphite-400">No documents attached.</p>
        ) : (
          <div className="divide-y divide-graphite-100">
            {docs.map((d) => (
              <div key={d.id} className="flex items-center justify-between py-3">
                <div className="flex items-center gap-2.5">
                  <FileText size={16} className="text-graphite-400" />
                  <div>
                    <p className="text-sm font-medium text-graphite-700">{d.name}</p>
                    <p className="text-xs text-graphite-400">{d.type} · {d.uploadedOn}</p>
                  </div>
                </div>
                <div className="flex gap-1.5">
                  <button className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-medium text-graphite-600 transition hover:border-primary-300 hover:text-primary-700">
                    <Eye size={12} /> View
                  </button>
                  <button className="inline-flex items-center gap-1 rounded-md border border-graphite-200 px-2.5 py-1 text-xs font-medium text-graphite-600 transition hover:border-primary-300 hover:text-primary-700">
                    <Download size={12} /> Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Activity Log */}
      <div className="rounded-xl border border-graphite-200 bg-white p-5 shadow-card animate-[fadeInUp_.4s_ease_forwards]" style={{ animationDelay: "240ms" }}>
        <h3 className="mb-4 font-display text-sm font-semibold text-graphite-700">Remarks & Activity Log</h3>
        {activity.length === 0 ? (
          <p className="text-sm text-graphite-400">No activity recorded.</p>
        ) : (
          <div className="relative ml-4 border-l-2 border-graphite-100 pl-6">
            {activity.map((a, i) => (
              <div key={a.id} className={`relative pb-6 ${i === activity.length - 1 ? "pb-0" : ""}`}>
                {/* dot */}
                <div className="absolute -left-[31px] top-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-white ring-2 ring-graphite-200">
                  <UserCircle2 size={14} className="text-primary-500" />
                </div>
                <div>
                  <p className="text-sm font-medium text-graphite-800">{a.action}</p>
                  <p className="mt-0.5 text-xs text-graphite-500">
                    {a.user} · <span className="text-graphite-400">{a.role}</span> · {a.timestamp}
                  </p>
                  {a.remark && (
                    <p className="mt-1 rounded-md bg-graphite-50 px-3 py-2 text-xs text-graphite-600 italic">
                      "{a.remark}"
                    </p>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
}

/* ===================== PAGE ===================== */
export default function ApplicationsPage() {
  const [role, setRole] = useState<RoleKey>("admin");
  const [viewing, setViewing] = useState<Application | null>(null);

  return (
    <AppShell
      title={viewing ? viewing.id : "Applications"}
      subtitle={
        viewing
          ? viewing.title
          : "All document approval applications across the system."
      }
      activeRole={role}
      onRoleChange={setRole}
    >
      {viewing ? (
        <ApplicationDetail app={viewing} onBack={() => setViewing(null)} />
      ) : (
        <ApplicationList onView={setViewing} />
      )}
    </AppShell>
  );
}
