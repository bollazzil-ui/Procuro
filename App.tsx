import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Layout from './components/Layout';
import DashboardLayout from './components/DashboardLayout'; // Import DashboardLayout

import Home from './pages/Home';
import SME from './pages/SME';
import Provider from './pages/Provider';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import SMEDashboard from './pages/SMEDashboard';
import SMEMatchSearch from './pages/SMEMatchSearch';
import ProviderProfile from './pages/ProviderProfile';

const ScrollToTop = () => {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
};

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          {/* ... (keep existing routes) ... */}
          <Route index element={<Home />} />
          <Route path="sme" element={<SME />} />
          <Route path="provider" element={<Provider />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          <Route
            path="sme-dashboard"
            element={
              <ProtectedRoute allowedRole="SME">
                <DashboardLayout>
                  <SMEDashboard />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="provider-dashboard"
            element={
              <ProtectedRoute allowedRole="PROVIDER">
                <DashboardLayout>
                  <ProviderProfile />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="match-search"
            element={
              // Added allowedRole="SME" here
              <ProtectedRoute allowedRole="SME">
                <DashboardLayout>
                  <SMEMatchSearch />
                </DashboardLayout>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}