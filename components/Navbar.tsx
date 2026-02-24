import React, { useState, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, Sparkles, LogOut, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, signOut } = useAuth();

  // Detect scrolling to add a subtle shadow/shrink effect
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close mobile menu on route change
  useEffect(() => {
    setIsOpen(false);
  }, [location.pathname]);

  const isActive = (path: string) => location.pathname === path;

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  const dashboardLink = user?.user_metadata?.role === 'PROVIDER'
    ? '/provider-dashboard'
    : '/sme-dashboard';

  return (
    <div className="fixed top-0 left-0 right-0 z-50 flex justify-center px-4 pt-4 md:pt-6 pointer-events-none">
      {/* FLOATING PILL NAVBAR
        Pointer-events-auto restores clicking inside the nav, while allowing clicks to pass through the wrapper
      */}
      <nav
        className={`pointer-events-auto relative flex items-center justify-between w-full max-w-6xl transition-all duration-300 ${
          scrolled
            ? 'bg-white/70 backdrop-blur-xl shadow-[0_8px_30px_rgb(0,0,0,0.06)] border border-white/50 py-3 px-6 rounded-full'
            : 'bg-white/50 backdrop-blur-md shadow-sm border border-white/30 py-4 px-6 rounded-full'
        }`}
      >
        {/* LOGO */}
        <Link to="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity group">
          <div className="w-10 h-10 bg-gradient-to-tr from-blue-600 to-blue-500 rounded-full flex items-center justify-center shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <span className="text-white font-black text-xl tracking-tighter">P</span>
          </div>
          <span className="text-2xl font-black text-blue-950 tracking-tight hidden sm:block">Procuro</span>
        </Link>

        {/* DESKTOP NAV LINKS */}
        <div className="hidden md:flex items-center p-1 bg-slate-100/50 rounded-full border border-slate-200/50 backdrop-blur-sm">
          {[
            { name: 'Our Solution', path: '/' },
            { name: 'For SMEs', path: '/sme' },
            { name: 'For Providers', path: '/provider' },
            { name: 'About Us', path: '/about' },
          ].map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                isActive(item.path)
                  ? 'bg-white text-blue-700 shadow-sm border border-slate-200/50'
                  : 'text-slate-500 hover:text-blue-600 hover:bg-slate-50'
              }`}
            >
              {item.name}
            </Link>
          ))}
        </div>

        {/* RIGHT ACTION BUTTONS */}
        <div className="hidden md:flex items-center gap-3">
          {user ? (
            <div className="flex items-center gap-2 bg-slate-50 p-1.5 rounded-full border border-slate-100">
               <Link
                to={dashboardLink}
                className="flex items-center gap-2 bg-white text-slate-700 hover:text-blue-600 font-semibold text-sm px-4 py-2 rounded-full shadow-sm border border-slate-200/50 transition-all hover:shadow-md"
              >
                <User size={16} className="text-blue-500" />
                Profile
              </Link>
              <button
                onClick={handleSignOut}
                className="flex items-center justify-center w-9 h-9 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-full transition-all"
                title="Sign Out"
              >
                <LogOut size={16} />
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-4">
              <Link
                to="/login"
                className="text-slate-500 hover:text-blue-600 font-semibold text-sm px-2 transition-colors"
              >
                Log In
              </Link>
              <button className="bg-[#FFD700] hover:bg-[#F0C800] text-blue-950 px-6 py-2.5 rounded-full font-bold text-sm transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 flex items-center gap-2">
                <Sparkles size={16} />
                Get Matches
              </button>
            </div>
          )}
        </div>

        {/* MOBILE MENU TOGGLE */}
        <div className="md:hidden flex items-center">
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="w-10 h-10 bg-slate-50 hover:bg-slate-100 rounded-full flex items-center justify-center text-slate-600 transition-colors border border-slate-200/50"
          >
            {isOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>

        {/* MOBILE DROPDOWN (Floating Card) */}
        {isOpen && (
          <div className="absolute top-[calc(100%+1rem)] left-0 right-0 md:hidden bg-white/95 backdrop-blur-2xl border border-white rounded-3xl p-5 shadow-[0_20px_40px_rgb(0,0,0,0.1)] flex flex-col gap-2 origin-top animate-fade-in">
             {[
              { name: 'Our Solution', path: '/' },
              { name: 'For SMEs', path: '/sme' },
              { name: 'For Providers', path: '/provider' },
              { name: 'About Us', path: '/about' },
            ].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`p-4 rounded-2xl font-semibold text-center transition-colors ${
                  isActive(item.path) ? 'bg-blue-50 text-blue-600' : 'text-slate-600 hover:bg-slate-50'
                }`}
              >
                {item.name}
              </Link>
            ))}

             <div className="h-[1px] bg-slate-100 my-2"></div>

             {user ? (
                <>
                  <Link
                    to={dashboardLink}
                    className="p-4 bg-blue-600 text-white rounded-2xl font-semibold flex items-center justify-center gap-2"
                  >
                    <User size={18} /> Profile
                  </Link>
                  <button
                    onClick={handleSignOut}
                    className="p-4 text-red-500 font-bold rounded-2xl hover:bg-red-50"
                  >
                    Sign Out
                  </button>
                </>
             ) : (
                <>
                  <Link
                    to="/login"
                    className="p-4 text-slate-600 font-bold text-center rounded-2xl hover:bg-slate-50"
                  >
                    Log In
                  </Link>
                  <button className="p-4 bg-[#FFD700] text-blue-950 font-bold rounded-2xl shadow-sm flex items-center justify-center gap-2">
                    <Sparkles size={18} /> Get Matches
                  </button>
                </>
             )}
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;