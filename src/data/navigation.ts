import type { LucideIcon } from "lucide-react";
import {
  LayoutGrid,
  Layers,
  FolderOpen,
  ClipboardCheck,
  Database,
  Users,
  Share2,
  Network,
  ShieldCheck,
  Factory,
  Archive,
  FilePlus2,
} from "lucide-react";
import type { RoleKey } from "./roles";

export interface NavItem {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: number;
}

export const roleNavigation: Record<RoleKey, NavItem[]> = {
  purchase_rep: [
    { label: "My Applications", href: "/purchase/applications", icon: Layers },
    { label: "Documents", href: "/purchase/documents", icon: FolderOpen },
    { label: "Pending Actions", href: "/purchase/approvals", icon: ClipboardCheck, badge: 1 },
    { label: "Archive", href: "/purchase/archive", icon: Archive },
  ],
  office_coordinator: [
    { label: "Applications Pool", href: "/coordinator/applications", icon: Layers },
    { label: "Verification Queue", href: "/coordinator/approvals", icon: ClipboardCheck, badge: 2 },
    { label: "Documents", href: "/coordinator/documents", icon: FolderOpen },
    { label: "DMS Folders", href: "/coordinator/dms", icon: Database },
    { label: "Archive", href: "/coordinator/archive", icon: Archive },
  ],
  evaluator: [
    { label: "Applications", href: "/evaluator/applications", icon: Layers },
    { label: "Evaluation Queue", href: "/evaluator/approvals", icon: ClipboardCheck, badge: 1 },
    { label: "Documents", href: "/evaluator/documents", icon: FolderOpen },
    { label: "Archive", href: "/evaluator/archive", icon: Archive },
  ],
  technical_user: [
    { label: "Applications", href: "/technical/applications", icon: Layers },
    { label: "Technical Reviews", href: "/technical/approvals", icon: ClipboardCheck, badge: 1 },
    { label: "Technical Docs", href: "/technical/documents", icon: FolderOpen },
    { label: "Archive", href: "/technical/archive", icon: Archive },
  ],
  finance_user: [
    { label: "Applications", href: "/finance/applications", icon: Layers },
    { label: "Finance Approvals", href: "/finance/approvals", icon: ClipboardCheck, badge: 1 },
    { label: "Cost Documents", href: "/finance/documents", icon: FolderOpen },
    { label: "Archive", href: "/finance/archive", icon: Archive },
  ],
  admin: [
    { label: "Dashboard", href: "/admin/dashboard", icon: LayoutGrid },
    { label: "All Applications", href: "/admin/applications", icon: Layers },
    { label: "Documents", href: "/admin/documents", icon: FolderOpen },
    { label: "Approvals", href: "/admin/approvals", icon: ClipboardCheck, badge: 3 },
    { label: "DMS", href: "/admin/dms", icon: Database },
    { label: "User Management", href: "/admin/users", icon: Users },
    { label: "User Mapping", href: "/admin/user-mapping", icon: Share2 },
    { label: "User Hierarchy", href: "/admin/user-hierarchy", icon: Network },
    { label: "Roles & Access", href: "/admin/roles", icon: ShieldCheck },
    { label: "Plant Master", href: "/admin/plants", icon: Factory },
    { label: "Archive", href: "/admin/archive", icon: Archive },
  ],
};

export function getDefaultRouteForRole(role: RoleKey): string {
  switch (role) {
    case "purchase_rep":
      return "/purchase/applications";
    case "office_coordinator":
      return "/coordinator/applications";
    case "evaluator":
      return "/evaluator/applications";
    case "technical_user":
      return "/technical/applications";
    case "finance_user":
      return "/finance/applications";
    case "admin":
    default:
      return "/admin/dashboard";
  }
}