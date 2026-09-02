export interface User {
  id: string;
  name: string;
  email: string;
  role: string;
  plant: string;
  status: "Active" | "Disabled";
}

export const defaultUsers: User[] = [
  { id: "u1", name: "Administrator",     email: "admin@rungtasteel.com",      role: "Admin",                  plant: "Kamanda Steel Plant (KSP)", status: "Active" },
  { id: "u2", name: "S. Verma",          email: "s.verma@rungtasteel.com",    role: "Office Coordinator",     plant: "Kamanda Steel Plant (KSP)", status: "Active" },
  { id: "u3", name: "R. Sharma",         email: "r.sharma@rungtasteel.com",   role: "Purchase Representative",plant: "Kamanda Steel Plant (KSP)", status: "Active" },
  { id: "u4", name: "A. Iyer",           email: "a.iyer@rungtasteel.com",     role: "Evaluator",              plant: "Kamanda Steel Plant (KSP)", status: "Active" },
  { id: "u5", name: "Technical User 01", email: "tech01@rungtasteel.com",     role: "Technical User",         plant: "Kamanda Steel Plant (KSP)", status: "Active" },
  { id: "u6", name: "M. Kapoor",         email: "m.kapoor@rungtasteel.com",   role: "Finance User",           plant: "Kamanda Steel Plant (KSP)", status: "Active" },
];
