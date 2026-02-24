import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = () => {
  const location = useLocation();

  // Define routes where the global footer should be hidden
  // (because ProfileLayout handles the footer in these layouts)
  const isDashboardRoute =
    location.pathname.includes('dashboard') ||
    location.pathname === '/match-search' ||
    location.pathname === '/settings';

  // Check if we are on the cinematic home page
  const isHomeRoute = location.pathname === '/';

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-blue-100 selection:text-blue-900">

      {/* Show the global Navbar on all pages */}
      <Navbar />

      <main>
        {/* 'Outlet' is where the child route (Home, About, etc.) will render */}
        <Outlet />
      </main>

      {/* Hide Footer on dashboard routes AND the home route */}
      {!isDashboardRoute && !isHomeRoute && <Footer />}

    </div>
  );
};

export default Layout;