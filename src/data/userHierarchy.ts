export interface HierarchyNode {
  id: string;
  name: string;
  role: string;
  children: HierarchyNode[];
}

export const hierarchyTree: HierarchyNode = {
  id: "u1",
  name: "Administrator",
  role: "Admin",
  children: [
    {
      id: "u2",
      name: "S. Verma",
      role: "Office Coordinator",
      children: [
        { id: "u3", name: "R. Sharma", role: "Purchase Representative", children: [] },
      ],
    },
    {
      id: "u4",
      name: "A. Iyer",
      role: "Evaluator",
      children: [
        { id: "u5", name: "Technical User 01", role: "Technical User", children: [] },
      ],
    },
    {
      id: "u6",
      name: "M. Kapoor",
      role: "Finance User",
      children: [],
    },
  ],
};

export interface HierarchyRow {
  userId: string;
  userName: string;
  role: string;
  reportsTo: string;
}

export const hierarchyRows: HierarchyRow[] = [
  { userId: "u1", userName: "Administrator",     role: "Admin",                   reportsTo: "—" },
  { userId: "u2", userName: "S. Verma",          role: "Office Coordinator",      reportsTo: "Administrator" },
  { userId: "u3", userName: "R. Sharma",         role: "Purchase Representative", reportsTo: "S. Verma" },
  { userId: "u4", userName: "A. Iyer",           role: "Evaluator",              reportsTo: "Administrator" },
  { userId: "u5", userName: "Technical User 01", role: "Technical User",          reportsTo: "A. Iyer" },
  { userId: "u6", userName: "M. Kapoor",         role: "Finance User",            reportsTo: "Administrator" },
];
