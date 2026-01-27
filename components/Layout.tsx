import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <main>
        {/* 'Outlet' is where the child route (Home, About, etc.) will render */}
        <Outlet />
      </main>
      <Footer />
    </div>
  );
};

export default Layout;