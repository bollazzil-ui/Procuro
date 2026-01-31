import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext'; // Import useAuth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth(); // Get auth state

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  // Determine dashboard link based on role
  const dashboardLink = user?.user_metadata?.role === 'PROVIDER'
    ? '/provider-dashboard'
    : '/sme-dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">Procuro</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/" className={`font-medium transition-colors ${isActive('/') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Browse Categories</Link>

            {/* CONDITIONAL LINK: Only visible to logged-in SMEs */}
            {user?.user_metadata?.role === 'SME' && (
               <Link to="/sme-browse" className={`font-medium transition-colors ${isActive('/sme-browse') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Match Search</Link>
            )}

            <Link to="/sme" className={`font-medium transition-colors ${isActive('/sme') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>For SMEs</Link>
            <Link to="/provider" className={`font-medium transition-colors ${isActive('/provider') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>For Providers</Link>
            <Link to="/about" className={`font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>About Us</Link>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <div className="flex items-center gap-4">
                 <Link
                  to={dashboardLink}
                  className="flex items-center gap-2 text-slate-600 hover:text-blue-600 font-medium"
                >
                  <User size={18} />
                  Dashboard
                </Link>
                <button
                  onClick={handleSignOut}
                  className="flex items-center gap-2 text-slate-400 hover:text-red-500 font-medium transition-colors text-sm"
                >
                  <LogOut size={16} />
                  Sign Out
                </button>
              </div>
            ) : (
              <Link to="/login" className="text-slate-600 hover:text-blue-600 font-medium">Log In</Link>
            )}

            <button className="bg-[#FFD700] hover:bg-[#F0C800] text-blue-900 px-5 py-2.5 rounded-full font-bold transition-all shadow-sm flex items-center gap-2">
              <Sparkles size={18} />
              Get AI Matches
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-b border-slate-100 p-4 space-y-4">
           <Link to="/" className="block py-2 text-slate-600" onClick={() => setIsOpen(false)}>Browse Categories</Link>

           {/* CONDITIONAL MOBILE LINK */}
           {user?.user_metadata?.role === 'SME' && (
              <Link to="/sme-browse" className="block py-2 text-slate-600 font-medium text-blue-600" onClick={() => setIsOpen(false)}>Match Search</Link>
           )}

           <Link to="/sme" className="block py-2 text-slate-600" onClick={() => setIsOpen(false)}>For SMEs</Link>
           <Link to="/provider" className="block py-2 text-slate-600" onClick={() => setIsOpen(false)}>For Providers</Link>
           <Link to="/about" className="block py-2 text-slate-600" onClick={() => setIsOpen(false)}>About Us</Link>

           {user && (
             <button onClick={handleSignOut} className="w-full text-left text-red-500 font-bold py-2">Sign Out</button>
           )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;