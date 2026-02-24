import React, { useState, useEffect } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  // 1. Default to closed on mobile screens
  const [isSidebarOpen, setIsSidebarOpen] = useState(window.innerWidth >= 768);

  // Auto-adjust on window resize
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 768) setIsSidebarOpen(false);
      else setIsSidebarOpen(true);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="flex min-h-screen bg-slate-50 relative">

      {/* 2. Mobile Backdrop Overlay */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 md:hidden animate-fade-in"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      <Sidebar
        isCollapsed={!isSidebarOpen}
        setIsCollapsed={(val) => setIsSidebarOpen(!val)}
      />

      {/* 3. Adjust Margins (Mobile always gets ml-0 because Sidebar floats over) */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
        isSidebarOpen ? 'md:ml-64 ml-0' : 'md:ml-[72px] ml-0'
      }`}>
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>
        <Footer isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ProfileLayout;