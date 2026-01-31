import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute'; // Import this

import Layout from './components/Layout';
import LandingPage from './pages/LandingPage';
import BrowseCategories from './pages/BrowseCategories';
import SME from './pages/SME';
import Provider from './pages/Provider';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import SMEDashboard from './pages/SMEDashboard'; // Import this
import ProviderDashboard from './pages/ProviderDashboard'; // Import this

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
          <Route index element={<LandingPage />} />
          <Route
            path="browse"
            element={
              <ProtectedRoute allowedRole="SME">
                <BrowseCategories />
              </ProtectedRoute>
            }
          />
          <Route path="sme" element={<SME />} />
          <Route path="provider" element={<Provider />} />
          <Route path="about" element={<About />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />

          {/* Protected Routes */}
          <Route
            path="sme-dashboard"
            element={
              <ProtectedRoute allowedRole="SME">
                <SMEDashboard />
              </ProtectedRoute>
            }
          />
          <Route
            path="provider-dashboard"
            element={
              <ProtectedRoute allowedRole="PROVIDER">
                <ProviderDashboard />
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}