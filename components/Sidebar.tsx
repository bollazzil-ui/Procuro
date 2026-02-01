import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Settings, LogOut, ChevronLeft, Menu } from 'lucide-react';
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
    navItems.push({ name: 'Match Search', path: '/match-search', icon: <Search size={20} /> });
  }

  navItems.push({ name: 'Settings', path: '/settings', icon: <Settings size={20} /> });

  return (
    <aside
      className={`fixed top-16 left-0 h-[calc(100vh-4rem)] bg-white border-r border-slate-100 transition-all duration-300 z-40 flex flex-col ${
        isCollapsed ? 'w-20' : 'w-64'
      }`}
    >
      {/* Collapse Toggle Button */}
      <button
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="absolute -right-3 top-4 bg-white border border-slate-200 rounded-full p-1 hover:bg-slate-50 text-slate-500 shadow-sm"
      >
        {isCollapsed ? <Menu size={16} /> : <ChevronLeft size={16} />}
      </button>

      <div className="p-4 overflow-hidden">
        <div className={`text-xs font-bold text-slate-400 uppercase tracking-wider mb-4 px-4 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
          Menu
        </div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium whitespace-nowrap ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`
              }
            >
              <div className="shrink-0">{item.icon}</div>
              <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
                {item.name}
              </span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-4 border-t border-slate-50">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium w-full text-left overflow-hidden"
        >
          <div className="shrink-0"><LogOut size={20} /></div>
          <span className={`transition-opacity duration-300 ${isCollapsed ? 'opacity-0' : 'opacity-100'}`}>
            Sign Out
          </span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;