import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';

import Layout from './components/Layout';
import ProfileLayout from './components/ProfileLayout'; // Import ProfileLayout

import Home from './pages/Home';
import SME from './pages/SME';
import Provider from './pages/Provider';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import SMEProfile from './pages/SMEProfile';
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
                <ProfileLayout>
                  <SMEProfile/>
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="provider-dashboard"
            element={
              <ProtectedRoute allowedRole="PROVIDER">
                <ProfileLayout>
                  <ProviderProfile />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="match-search"
            element={
              // Added allowedRole="SME" here
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMEMatchSearch />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}