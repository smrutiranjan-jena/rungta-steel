import {
  FilePlus2,
  ClipboardList,
  SearchCheck,
  Wrench,
  Landmark,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export type RoleKey =
  | "purchase_rep"
  | "office_coordinator"
  | "evaluator"
  | "technical_user"
  | "finance_user"
  | "admin";

export interface Role {
  key: RoleKey;
  title: string;
  description: string;
  icon: LucideIcon;
}

// One entry per role card on the login screen.
// `key` is what you send to your auth API alongside email/password.
export const roles: Role[] = [
  {
    key: "purchase_rep",
    title: "Purchase Representative",
    description: "Create & submit purchase documents",
    icon: FilePlus2,
  },
  {
    key: "office_coordinator",
    title: "Office Coordinator",
    description: "Verify & route applications",
    icon: ClipboardList,
  },
  {
    key: "evaluator",
    title: "Evaluator",
    description: "Evaluate & assign technical user",
    icon: SearchCheck,
  },
  {
    key: "technical_user",
    title: "Technical User",
    description: "Technical review & approval",
    icon: Wrench,
  },
  {
    key: "finance_user",
    title: "Finance User",
    description: "Finance review & approval",
    icon: Landmark,
  },
  {
    key: "admin",
    title: "Admin",
    description: "Full access — users, roles & plant master",
    icon: ShieldCheck,
  },
];  