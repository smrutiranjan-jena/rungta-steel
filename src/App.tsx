import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/login/Login";
import Profile from "./pages/Profile";

// Purchase Rep Pages
import PurchaseApplicationsPage from "./pages/purchase/Applications";
import PurchaseDocumentsPage from "./pages/purchase/Documents";
import PurchaseApprovalsPage from "./pages/purchase/Approvals";
import PurchaseArchivePage from "./pages/purchase/Archive";

// Office Coordinator Pages
import CoordinatorApplicationsPage from "./pages/coordinator/Applications";
import CoordinatorDocumentsPage from "./pages/coordinator/Documents";
import CoordinatorApprovalsPage from "./pages/coordinator/Approvals";
import CoordinatorDMSPage from "./pages/coordinator/DMS";
import CoordinatorArchivePage from "./pages/coordinator/Archive";

// Evaluator Pages
import EvaluatorApplicationsPage from "./pages/evaluator/Applications";
import EvaluatorDocumentsPage from "./pages/evaluator/Documents";
import EvaluatorApprovalsPage from "./pages/evaluator/Approvals";
import EvaluatorArchivePage from "./pages/evaluator/Archive";

// Technical User Pages
import TechnicalApplicationsPage from "./pages/technical/Applications";
import TechnicalDocumentsPage from "./pages/technical/Documents";
import TechnicalApprovalsPage from "./pages/technical/Approvals";
import TechnicalArchivePage from "./pages/technical/Archive";

// Finance User Pages
import FinanceApplicationsPage from "./pages/finance/Applications";
import FinanceDocumentsPage from "./pages/finance/Documents";
import FinanceApprovalsPage from "./pages/finance/Approvals";
import FinanceArchivePage from "./pages/finance/Archive";

// Admin Pages
import AdminDashboard from "./pages/admin/AdminDashboard";
import UserManagement from "./pages/admin/UserManagement";
import UserMapping from "./pages/admin/UserMapping";
import UserHierarchy from "./pages/admin/UserHierarchy";
import RolesAccess from "./pages/admin/RolesAccess";
import PlantMaster from "./pages/admin/PlantMaster";
import AdminApplicationsPage from "./pages/admin/Applications";
import AdminDocumentsPage from "./pages/admin/Documents";
import AdminApprovalsPage from "./pages/admin/Approvals";
import AdminDMSPage from "./pages/admin/DMS";
import AdminArchivePage from "./pages/admin/Archive";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />
      <Route path="/login" element={<Login />} />
      <Route path="/profile" element={<Profile />} />

      {/* Purchase Representative Routes */}
      <Route path="/purchase/applications" element={<PurchaseApplicationsPage />} />
      <Route path="/purchase/documents" element={<PurchaseDocumentsPage />} />
      <Route path="/purchase/approvals" element={<PurchaseApprovalsPage />} />
      <Route path="/purchase/archive" element={<PurchaseArchivePage />} />

      {/* Office Coordinator Routes */}
      <Route path="/coordinator/applications" element={<CoordinatorApplicationsPage />} />
      <Route path="/coordinator/documents" element={<CoordinatorDocumentsPage />} />
      <Route path="/coordinator/approvals" element={<CoordinatorApprovalsPage />} />
      <Route path="/coordinator/dms" element={<CoordinatorDMSPage />} />
      <Route path="/coordinator/archive" element={<CoordinatorArchivePage />} />

      {/* Evaluator Routes */}
      <Route path="/evaluator/applications" element={<EvaluatorApplicationsPage />} />
      <Route path="/evaluator/documents" element={<EvaluatorDocumentsPage />} />
      <Route path="/evaluator/approvals" element={<EvaluatorApprovalsPage />} />
      <Route path="/evaluator/archive" element={<EvaluatorArchivePage />} />

      {/* Technical User Routes */}
      <Route path="/technical/applications" element={<TechnicalApplicationsPage />} />
      <Route path="/technical/documents" element={<TechnicalDocumentsPage />} />
      <Route path="/technical/approvals" element={<TechnicalApprovalsPage />} />
      <Route path="/technical/archive" element={<TechnicalArchivePage />} />

      {/* Finance User Routes */}
      <Route path="/finance/applications" element={<FinanceApplicationsPage />} />
      <Route path="/finance/documents" element={<FinanceDocumentsPage />} />
      <Route path="/finance/approvals" element={<FinanceApprovalsPage />} />
      <Route path="/finance/archive" element={<FinanceArchivePage />} />

      {/* Admin Routes */}
      <Route path="/admin/dashboard" element={<AdminDashboard />} />
      <Route path="/admin/applications" element={<AdminApplicationsPage />} />
      <Route path="/admin/documents" element={<AdminDocumentsPage />} />
      <Route path="/admin/approvals" element={<AdminApprovalsPage />} />
      <Route path="/admin/dms" element={<AdminDMSPage />} />
      <Route path="/admin/users" element={<UserManagement />} />
      <Route path="/admin/user-mapping" element={<UserMapping />} />
      <Route path="/admin/user-hierarchy" element={<UserHierarchy />} />
      <Route path="/admin/roles" element={<RolesAccess />} />
      <Route path="/admin/plants" element={<PlantMaster />} />
      <Route path="/admin/archive" element={<AdminArchivePage />} />
    </Routes>
  );
}