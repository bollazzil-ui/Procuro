import React, { useState } from 'react';
import Sidebar from './Sidebar';
import Footer from './Footer';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  // Shared state to sync Sidebar, Main Content, and Footer
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar - Width handled via isCollapsed prop */}
      <Sidebar
        isCollapsed={!isSidebarOpen}
        setIsCollapsed={(val) => setIsSidebarOpen(!val)}
      />

      {/* Main Column: This div handles the responsive margin to clear the sidebar */}
      <div className={`flex-1 flex flex-col transition-all duration-300 min-w-0 ${
        isSidebarOpen ? 'md:ml-64' : 'md:ml-20 ml-0'
      }`}>

        {/* Page Content */}
        <main className="flex-1 w-full overflow-x-hidden">
          {children}
        </main>

        {/* Fixed Footer:
            By placing it here, it inherits the parent's margin (ml-64 or ml-20).
            We pass the state so the Footer internally removes its own 'md:ml-64'
            to avoid double-offsetting.
        */}
        <Footer isSidebarOpen={isSidebarOpen} />
      </div>
    </div>
  );
};

export default ProfileLayout;