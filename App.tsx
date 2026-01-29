import React, { useEffect } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext'; // Import this
import Layout from './components/Layout';
import Home from './pages/Home';
import SME from './pages/SME';
import Provider from './pages/Provider';
import About from './pages/About';
import Login from './pages/Login';
import Register from './pages/Register'; // Import this

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
        </Route>
      </Routes>
    </AuthProvider>
  );
}