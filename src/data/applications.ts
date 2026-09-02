export type AppStatus =
  | "Submitted"
  | "Under Review"
  | "Coordinator Review"
  | "Evaluation"
  | "Technical Review"
  | "Finance Review"
  | "Final Document"
  | "Closed";

export interface Application {
  id: string;
  title: string;
  plant: string;
  department: string;
  submittedBy: string;
  submittedOn: string;
  status: AppStatus;
  currentStage: number; // 1-based, maps to workflow steps
}

export const workflowStages = [
  "Purchase",
  "Coordinator",
  "Evaluator",
  "Technical",
  "Finance",
  "Final Document",
  "Closed",
] as const;

export interface AppDocument {
  id: string;
  applicationId: string;
  name: string;
  type: string;
  plant: string;
  department: string;
  uploadedBy: string;
  uploadedOn: string;
  status: "Active" | "Archived";
}

export interface ActivityEntry {
  id: string;
  user: string;
  role: string;
  action: string;
  timestamp: string;
  remark?: string;
}

export const defaultApplications: Application[] = [
  {
    id: "PLT-2026-000120",
    title: "Technical Equipment Procurement – Phase III",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    submittedBy: "R. Sharma",
    submittedOn: "30 Aug 2026, 10:15",
    status: "Under Review",
    currentStage: 2,
  },
  {
    id: "PLT-2026-000119",
    title: "Vendor Evaluation – Raw Material Supply",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Engineering",
    submittedBy: "R. Sharma",
    submittedOn: "28 Aug 2026, 14:00",
    status: "Technical Review",
    currentStage: 4,
  },
  {
    id: "PLT-2026-000118",
    title: "Annual Maintenance Contract Renewal",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    submittedBy: "R. Sharma",
    submittedOn: "26 Aug 2026, 09:30",
    status: "Closed",
    currentStage: 7,
  },
];

export const defaultDocuments: AppDocument[] = [
  // PLT-2026-000120
  {
    id: "d1",
    applicationId: "PLT-2026-000120",
    name: "KSP_Equipment_Spec_Sheet.pdf",
    type: "Technical Report",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    uploadedBy: "R. Sharma",
    uploadedOn: "30 Aug 2026, 10:15",
    status: "Active",
  },
  {
    id: "d2",
    applicationId: "PLT-2026-000120",
    name: "KSP_Cost_Estimate_PhaseIII.pdf",
    type: "Cost Statement",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    uploadedBy: "R. Sharma",
    uploadedOn: "30 Aug 2026, 10:16",
    status: "Active",
  },
  // PLT-2026-000119
  {
    id: "d3",
    applicationId: "PLT-2026-000119",
    name: "Vendor_Evaluation_Matrix.pdf",
    type: "Technical Report",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Engineering",
    uploadedBy: "R. Sharma",
    uploadedOn: "28 Aug 2026, 14:00",
    status: "Active",
  },
  {
    id: "d4",
    applicationId: "PLT-2026-000119",
    name: "Raw_Material_Cost_Analysis.pdf",
    type: "Cost Statement",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Engineering",
    uploadedBy: "R. Sharma",
    uploadedOn: "28 Aug 2026, 14:02",
    status: "Active",
  },
  {
    id: "d5",
    applicationId: "PLT-2026-000119",
    name: "Vendor_Compliance_Certificate.pdf",
    type: "Supporting Document",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Engineering",
    uploadedBy: "A. Iyer",
    uploadedOn: "29 Aug 2026, 09:45",
    status: "Active",
  },
  // PLT-2026-000118 (closed)
  {
    id: "d6",
    applicationId: "PLT-2026-000118",
    name: "KSP_Technical_Report.pdf",
    type: "Technical Report",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    uploadedBy: "R. Sharma",
    uploadedOn: "26 Aug 2026, 09:30",
    status: "Archived",
  },
  {
    id: "d7",
    applicationId: "PLT-2026-000118",
    name: "KSP_Cost_Statement.pdf",
    type: "Cost Statement",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    uploadedBy: "R. Sharma",
    uploadedOn: "26 Aug 2026, 09:32",
    status: "Archived",
  },
  {
    id: "d8",
    applicationId: "PLT-2026-000118",
    name: "KSP_Supporting_Document.pdf",
    type: "Supporting Document",
    plant: "Kamanda Steel Plant (KSP)",
    department: "Purchase",
    uploadedBy: "R. Sharma",
    uploadedOn: "26 Aug 2026, 09:35",
    status: "Archived",
  },
];

export const defaultActivity: Record<string, ActivityEntry[]> = {
  "PLT-2026-000120": [
    { id: "a1", user: "R. Sharma", role: "Purchase Representative", action: "Submitted application", timestamp: "30 Aug 2026, 10:15", remark: "Phase III procurement documents attached." },
    { id: "a2", user: "S. Verma", role: "Office Coordinator", action: "Verified & forwarded to evaluator", timestamp: "30 Aug 2026, 11:40", remark: "Documents are in order." },
  ],
  "PLT-2026-000119": [
    { id: "a3", user: "R. Sharma", role: "Purchase Representative", action: "Submitted application", timestamp: "28 Aug 2026, 14:00" },
    { id: "a4", user: "S. Verma", role: "Office Coordinator", action: "Verified & forwarded", timestamp: "28 Aug 2026, 16:30" },
    { id: "a5", user: "A. Iyer", role: "Evaluator", action: "Evaluated & assigned to Technical User", timestamp: "29 Aug 2026, 09:45", remark: "Assigned to Technical User 01 for review." },
    { id: "a6", user: "Technical User 01", role: "Technical User", action: "Technical review in progress", timestamp: "29 Aug 2026, 14:20" },
  ],
  "PLT-2026-000118": [
    { id: "a7", user: "R. Sharma", role: "Purchase Representative", action: "Submitted application", timestamp: "26 Aug 2026, 09:30" },
    { id: "a8", user: "S. Verma", role: "Office Coordinator", action: "Verified & forwarded", timestamp: "26 Aug 2026, 10:00" },
    { id: "a9", user: "A. Iyer", role: "Evaluator", action: "Evaluated & assigned", timestamp: "26 Aug 2026, 11:15" },
    { id: "a10", user: "Technical User 01", role: "Technical User", action: "Technical approval granted", timestamp: "26 Aug 2026, 12:30", remark: "Technically sound." },
    { id: "a11", user: "M. Kapoor", role: "Finance User", action: "Finance approval granted", timestamp: "26 Aug 2026, 13:45", remark: "Budget allocated." },
    { id: "a12", user: "S. Verma", role: "Office Coordinator", action: "Final document uploaded & closed", timestamp: "26 Aug 2026, 14:35" },
  ],
};
