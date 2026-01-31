import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Search, Settings,SJ, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Sidebar = () => {
  const { user, signOut } = useAuth();
  const role = user?.user_metadata?.role;

  // Determine dashboard path based on role
  const dashboardPath = role === 'PROVIDER' ? '/provider-dashboard' : '/sme-dashboard';

  // Base items available to everyone (or just Dashboard + Settings)
  const navItems = [
    { name: 'Dashboard', path: dashboardPath, icon: <LayoutDashboard size={20} /> },
  ];

  // Conditionally add Match Search for SMEs
  if (role === 'SME') {
    navItems.push({ name: 'Match Search', path: '/match-search', icon: <Search size={20} /> });
  }

  // Add settings at the end
  navItems.push({ name: 'Settings', path: '/settings', icon: <Settings size={20} /> });

  return (
    <aside className="fixed top-16 left-0 w-64 h-[calc(100vh-4rem)] bg-white border-r border-slate-100 overflow-y-auto z-40 hidden md:flex flex-col">
      <div className="p-6">
        <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-4">Menu</div>
        <nav className="space-y-2">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              className={({ isActive }) =>
                `flex items-center gap-3 px-4 py-3 rounded-xl transition-all font-medium ${
                  isActive
                    ? 'bg-blue-50 text-blue-600'
                    : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'
                }`
              }
            >
              {item.icon}
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>
      </div>

      <div className="mt-auto p-6 border-t border-slate-50">
        <button
          onClick={() => signOut()}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-slate-500 hover:text-red-600 hover:bg-red-50 transition-all font-medium w-full text-left"
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;