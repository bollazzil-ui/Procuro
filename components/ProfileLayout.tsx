import React from 'react';
import Sidebar from './Sidebar';

interface ProfileLayoutProps {
  children: React.ReactNode;
}

const ProfileLayout = ({ children }: ProfileLayoutProps) => {
  return (
    <div className="flex min-h-screen bg-slate-50">
      {/* Sidebar Component */}
      <Sidebar />

      {/* Main Content Area - shifts content right to accommodate sidebar */}
      <div className="flex-1 md:ml-64 transition-all duration-300">
        {children}
      </div>
    </div>
  );
};

export default ProfileLayout;