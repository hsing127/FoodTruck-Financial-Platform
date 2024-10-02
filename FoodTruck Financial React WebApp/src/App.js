import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import LandingPage from './components/LandingPage';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import ForgotPasswordPage from './components/ForgotPasswordPage';
import ForgotPasswordCodePage from './components/ForgotPasswordCodePage';
import ForgotPasswordNewPage from './components/ForgotPasswordNewPage';
import DashboardFinancePage from './components/dashboard/DashboardFinancePage';
import DashboardMenuPage from './components/dashboard/DashboardMenuPage';
import DashboardInventoryPage from './components/dashboard/DashboardInventoryPage';
import DashboardSettingsPage from './components/dashboard/DashboardSettingsPage';
import DashboardProfilePage from './components/dashboard/DashboardProfilePage';

function App() {
  return (
    <Router>
      <div>
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route path="/forgot-password" element={<ForgotPasswordPage />} />
          <Route path="/forgot-password/code" element={<ForgotPasswordCodePage />} />
          <Route path="/forgot-password/new" element={<ForgotPasswordNewPage />} />
          
          {/* Dashboard routes */}
          <Route path="/dashboard/finance" element={<DashboardFinancePage />} />
          <Route path="/dashboard/menu" element={<DashboardMenuPage />} />
          <Route path="/dashboard/inventory" element={<DashboardInventoryPage />} />
          <Route path="/dashboard/settings" element={<DashboardSettingsPage />} />
          <Route path="/dashboard/profile" element={<DashboardProfilePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
