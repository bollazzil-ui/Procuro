import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/Layout';
import ProfileLayout from './components/ProfileLayout';

import Home from './pages/Home';
import SME from './pages/SME';
import Provider from './pages/Provider';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register';
import SMEProfile from './pages/SMEProfile';
import SMESimpleSearch from './pages/SMESimpleSearch';
import SMEMatchEngine from './pages/SMEMatchEngine'; // Import
import SMEMatchSession from './pages/SMEMatchSession';     // Import
import ProviderProfile from './pages/ProviderProfile';
import ProviderProducts from './pages/ProviderProducts';
import Matches from './pages/Matches';
import SMEMatchResults from './pages/SMEMatchResults';

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
            path="match-engine/:id/results"
            element={
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMEMatchResults />
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
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMESimpleSearch />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          {/* New Match Engine Routes */}
          <Route
            path="match-engine"
            element={
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMEMatchEngine />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="match-engine/new"
            element={
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMEMatchSession />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          {/* New Dynamic Route for Editing */}
          <Route
            path="match-engine/:id"
            element={
              <ProtectedRoute allowedRole="SME">
                <ProfileLayout>
                  <SMEMatchSession />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="provider-products"
            element={
              <ProtectedRoute allowedRole="PROVIDER">
                <ProfileLayout>
                  <ProviderProducts />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
          <Route
            path="matches"
            element={
              <ProtectedRoute>
                <ProfileLayout>
                  <Matches />
                </ProfileLayout>
              </ProtectedRoute>
            }
          />
        </Route>
      </Routes>
    </AuthProvider>
  );
}