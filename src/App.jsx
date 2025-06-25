import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "./components/layout/MainLayout";
import Dashboard from "./pages/Dashboard";
import UserManagement from "./pages/UserManagement/UserManagement";
import Sections from "./pages/SectionsManagement/SectionsManagement";
import Reporting from "./pages/ReportingPage";
import Settings from "./pages/Settings";
import WhatsNew from "./pages/WhatsNew";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="user-management" element={<UserManagement />} />
          <Route path="whats-new" element={<WhatsNew />} />
          <Route path="sections" element={<Sections />} />
          <Route path="reporting" element={<Reporting />} />
          <Route path="settings" element={<Settings />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
