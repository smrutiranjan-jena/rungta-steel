export interface PermissionModule {
  key: string;
  label: string;
}

export const permissionModules: PermissionModule[] = [
  { key: "new_submission",      label: "New Submission & Edit" },
  { key: "doc_verification",    label: "Document Verification" },
  { key: "eval_assignment",     label: "Evaluation & Assignment" },
  { key: "tech_approval",       label: "Technical Approval" },
  { key: "finance_approval",    label: "Finance Approval" },
  { key: "final_upload",        label: "Final Document Upload" },
  { key: "dms_access",          label: "DMS Access" },
  { key: "user_management",     label: "User Management" },
  { key: "roles_access",        label: "Roles & Access (RBAC)" },
  { key: "plant_master",        label: "Plant Master" },
];

export const roleColumns = [
  "Purchase Representative",
  "Office Coordinator",
  "Evaluator",
  "Technical User",
  "Finance User",
  "Admin",
] as const;

export type RoleColumn = (typeof roleColumns)[number];

// true = role has this permission
export const permissionMatrix: Record<string, Record<RoleColumn, boolean>> = {
  new_submission:   { "Purchase Representative": true,  "Office Coordinator": false, Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
  doc_verification: { "Purchase Representative": false, "Office Coordinator": true,  Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
  eval_assignment:  { "Purchase Representative": false, "Office Coordinator": false, Evaluator: true,  "Technical User": false, "Finance User": false, Admin: true },
  tech_approval:    { "Purchase Representative": false, "Office Coordinator": false, Evaluator: false, "Technical User": true,  "Finance User": false, Admin: true },
  finance_approval: { "Purchase Representative": false, "Office Coordinator": false, Evaluator: false, "Technical User": false, "Finance User": true,  Admin: true },
  final_upload:     { "Purchase Representative": false, "Office Coordinator": true,  Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
  dms_access:       { "Purchase Representative": true,  "Office Coordinator": true,  Evaluator: true,  "Technical User": true,  "Finance User": true,  Admin: true },
  user_management:  { "Purchase Representative": false, "Office Coordinator": false, Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
  roles_access:     { "Purchase Representative": false, "Office Coordinator": false, Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
  plant_master:     { "Purchase Representative": false, "Office Coordinator": false, Evaluator: false, "Technical User": false, "Finance User": false, Admin: true },
};
