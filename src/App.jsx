import { Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import DashboardLayout from './components/DashboardLayout';
import HomePage from './pages/HomePage';
import CEODashboard from './pages/ceo/CEODashboard';
import HRDashboard from './pages/hr/HRDashboard';
import PMDashboard from './pages/pm/PMDashboard';
import LeadDashboard from './pages/lead/LeadDashboard';
import DevDashboard from './pages/developer/DevDashboard';
import DevOpsDashboard from './pages/devops/DevOpsDashboard';
import ProfilePage from './pages/shared/ProfilePage';
import ReportsPage from './pages/shared/ReportsPage';
import TaskManagement from './pages/shared/TaskManagement';
import GenericPage from './pages/shared/GenericPage';

/* Route the /dashboard path to the correct role-specific dashboard */
function RoleDashboard() {
  const { user } = useAuth();
  const role = user?.role;
  switch (role) {
    case 'CEO': return <CEODashboard />;
    case 'HR': return <HRDashboard />;
    case 'PM': return <PMDashboard />;
    case 'LEAD': return <LeadDashboard />;
    case 'DEVELOPER': return <DevDashboard />;
    case 'DEVOPS': return <DevOpsDashboard />;
    default: return <CEODashboard />;
  }
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        {/* Public – Home page (with embedded login) */}
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Navigate to="/" replace />} />

        {/* Protected layout */}
        <Route element={<ProtectedRoute><DashboardLayout /></ProtectedRoute>}>
          <Route path="/dashboard" element={<RoleDashboard />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/reports" element={<ReportsPage />} />
          <Route path="/tasks" element={<TaskManagement />} />
          {/* All remaining paths → GenericPage */}
          <Route path="/projects" element={<GenericPage />} />
          <Route path="/execution-health" element={<GenericPage />} />
          <Route path="/escalations" element={<GenericPage />} />
          <Route path="/performance" element={<GenericPage />} />
          <Route path="/advisory-notes" element={<GenericPage />} />
          <Route path="/employees" element={<GenericPage />} />
          <Route path="/invitations" element={<GenericPage />} />
          <Route path="/performance-analytics" element={<GenericPage />} />
          <Route path="/promotions" element={<GenericPage />} />
          <Route path="/behavior-scores" element={<GenericPage />} />
          <Route path="/settings" element={<GenericPage />} />
          <Route path="/teams" element={<GenericPage />} />
          <Route path="/approvals" element={<GenericPage />} />
          <Route path="/execution-signals" element={<GenericPage />} />
          <Route path="/my-team" element={<GenericPage />} />
          <Route path="/review-queue" element={<GenericPage />} />
          <Route path="/ai-alignment" element={<GenericPage />} />
          <Route path="/workload" element={<GenericPage />} />
          <Route path="/team-performance" element={<GenericPage />} />
          <Route path="/my-tasks" element={<GenericPage />} />
          <Route path="/active-branches" element={<GenericPage />} />
          <Route path="/pull-requests" element={<GenericPage />} />
          <Route path="/submissions" element={<GenericPage />} />
          <Route path="/ai-feedback" element={<GenericPage />} />
          <Route path="/progress-history" element={<GenericPage />} />
          <Route path="/pipelines" element={<GenericPage />} />
          <Route path="/deployments" element={<GenericPage />} />
          <Route path="/infrastructure" element={<GenericPage />} />
          <Route path="/logs-alerts" element={<GenericPage />} />
          <Route path="/devops-tasks" element={<GenericPage />} />
          <Route path="/system-health" element={<GenericPage />} />
        </Route>

        {/* Catch-all */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </AuthProvider>
  );
}

export default App;
