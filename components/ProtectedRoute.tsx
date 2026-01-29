import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRole?: 'SME' | 'PROVIDER';
}

const ProtectedRoute = ({ children, allowedRole }: ProtectedRouteProps) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="animate-pulse flex flex-col items-center">
          <div className="w-12 h-12 bg-blue-200 rounded-full mb-4"></div>
          <div className="h-4 w-32 bg-slate-200 rounded"></div>
        </div>
      </div>
    );
  }

  // 1. Check if user is logged in
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // 2. Check if user has the correct role (if a specific role is required)
  if (allowedRole && user.user_metadata?.role !== allowedRole) {
    // If they are logged in but wrong role, redirect to their correct dashboard or home
    const correctPath = user.user_metadata?.role === 'SME' ? '/sme-dashboard' : '/provider-dashboard';
    // If the role is missing or unknown, go home
    return <Navigate to={user.user_metadata?.role ? correctPath : '/'} replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;