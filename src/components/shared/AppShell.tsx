import { useState, type ReactNode } from "react";
import { useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import Topbar from "./Topbar";
import type { RoleKey } from "../../data/roles";
import { getDefaultRouteForRole } from "../../data/navigation";

interface AppShellProps {
  title: string;
  subtitle?: string;
  activeRole: RoleKey;
  onRoleChange?: (role: RoleKey) => void;
  children: ReactNode;
}

export default function AppShell({
  title,
  subtitle,
  activeRole,
  onRoleChange,
  children,
}: AppShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleRoleSwitch = (newRole: RoleKey) => {
    if (onRoleChange) {
      onRoleChange(newRole);
    }
    const defaultRoute = getDefaultRouteForRole(newRole);
    navigate(defaultRoute);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-graphite-50 p-2 gap-2">
      <Sidebar
        open={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        activeRole={activeRole}
        onLogout={() => navigate("/login")}
      />
      <div className="flex min-w-0 flex-1 flex-col overflow-hidden gap-2 rounded-3xl">
        <Topbar
          title={title}
          subtitle={subtitle}
          activeRole={activeRole}
          onRoleChange={handleRoleSwitch}
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto bg-white rounded-3xl shadow-sm border border-graphite-100 px-5 py-6 lg:px-8 lg:py-8">
          {children}
        </main>
      </div>
    </div>
  );
}