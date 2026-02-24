import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Settings, LogOut, ChevronLeft, Menu, Package, Handshake, Bot } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

interface SidebarProps {
  isCollapsed: boolean;
  setIsCollapsed: (val: boolean) => void;
}

const Sidebar = ({ isCollapsed, setIsCollapsed }: SidebarProps) => {
  const { user, signOut } = useAuth();
  const role = user?.user_metadata?.role;

  const dashboardPath = role === 'PROVIDER' ? '/provider-dashboard' : '/sme-dashboard';

  const navItems = [
    { name: 'Dashboard', path: dashboardPath, icon: <LayoutDashboard size={20} /> },
  ];

  if (role === 'SME') {
    navItems.push({ name: 'Simple Search', path: '/match-search', icon: <Search size={20} /> });
    navItems.push({ name: 'Match Engine', path: '/match-engine', icon: <Bot size={20} /> });
  }

  navItems.push({ name: 'My Matches', path: '/matches', icon: <Handshake size={20} /> });

  if (role === 'PROVIDER') {
    navItems.push({ name: 'My Products', path: '/provider-products', icon: <Package size={20} /> });
  }

  navItems.push({ name: 'Settings', path: '/settings', icon: <Settings size={20} /> });

  return (
    <aside
      className={`fixed top-28 left-0 h-[calc(100vh-7rem)] z-40 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)]
        bg-white/70 backdrop-blur-xl shadow-[8px_8px_30px_rgb(0,0,0,0.04)] border border-white/50 border-l-0 rounded-r-3xl
        ${isCollapsed ? 'w-[72px]' : 'w-64'}`}
    >
      {/* Collapse Toggle Button - Floating on the right edge */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-4 top-8 w-8 h-8 bg-white border border-slate-200/50 shadow-sm rounded-full flex items-center justify-center text-slate-500 hover:text-blue-600 hover:scale-110 transition-all z-50"
      >
        {isCollapsed ? <Menu size={14} /> : <ChevronLeft size={14} />}
      </button>

      <div className="p-3 overflow-hidden flex-1 flex flex-col">
        {/* Menu Header */}
        <div
          className={`text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4 px-3 mt-4 transition-all duration-300
            ${isCollapsed ? 'opacity-0 h-0 overflow-hidden m-0' : 'opacity-100'}`}
        >
          Main Menu
        </div>

        {/* Navigation Links */}
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              title={isCollapsed ? item.name : undefined}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-3 rounded-full transition-all duration-300 font-semibold whitespace-nowrap border ${
                  isActive
                    ? 'bg-white text-blue-700 shadow-sm border-slate-200/50'
                    : 'border-transparent text-slate-500 hover:text-blue-600 hover:bg-white/50'
                } ${isCollapsed ? 'justify-center' : 'justify-start'}`
              }
            >
              <div className={`shrink-0 transition-transform duration-300 ${isCollapsed ? '' : 'ml-1'}`}>
                {item.icon}
              </div>
              <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>

        {/* Bottom Section (Sign Out) */}
        <div className="mt-auto pt-4 mb-2">
          {/* Subtle separator line */}
          <div className="h-px w-full bg-gradient-to-r from-transparent via-slate-200/50 to-transparent mb-4"></div>

          <button
            onClick={() => signOut()}
            title={isCollapsed ? 'Sign Out' : undefined}
            className={`flex items-center gap-3 px-3 py-3 w-full rounded-full transition-all duration-300 font-semibold whitespace-nowrap border border-transparent text-slate-500 hover:text-red-500 hover:bg-red-50/50 ${
              isCollapsed ? 'justify-center' : 'justify-start'
            }`}
          >
            <div className={`shrink-0 transition-transform duration-300 ${isCollapsed ? '' : 'ml-1'}`}>
              <LogOut size={20} />
            </div>
            <span className={`transition-all duration-300 ${isCollapsed ? 'w-0 opacity-0 overflow-hidden' : 'w-auto opacity-100'}`}>
              Sign Out
            </span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;