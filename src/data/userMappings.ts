export interface UserMapping {
  id: string;
  userId: string;
  userName: string;
  role: string;
  plant: string;
  department: string;
  reportsToId: string;
  reportsToName: string;
}

export const defaultMappings: UserMapping[] = [
  { id: "m1", userId: "u1", userName: "Administrator",     role: "Admin",                   plant: "Kamanda Steel Plant (KSP)", department: "Administration", reportsToId: "",   reportsToName: "—" },
  { id: "m2", userId: "u2", userName: "S. Verma",          role: "Office Coordinator",      plant: "Kamanda Steel Plant (KSP)", department: "Office",         reportsToId: "u1", reportsToName: "Administrator" },
  { id: "m3", userId: "u3", userName: "R. Sharma",         role: "Purchase Representative", plant: "Kamanda Steel Plant (KSP)", department: "Purchase",       reportsToId: "u2", reportsToName: "S. Verma" },
  { id: "m4", userId: "u4", userName: "A. Iyer",           role: "Evaluator",               plant: "Kamanda Steel Plant (KSP)", department: "Engineering",    reportsToId: "u1", reportsToName: "Administrator" },
  { id: "m5", userId: "u5", userName: "Technical User 01", role: "Technical User",          plant: "Kamanda Steel Plant (KSP)", department: "Engineering",    reportsToId: "u4", reportsToName: "A. Iyer" },
  { id: "m6", userId: "u6", userName: "M. Kapoor",         role: "Finance User",            plant: "Kamanda Steel Plant (KSP)", department: "Finance",        reportsToId: "u1", reportsToName: "Administrator" },
];
