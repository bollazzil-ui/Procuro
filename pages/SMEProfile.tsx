import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Search, Heart, Settings, Bell } from 'lucide-react';

export default function SMEProfile() {
  const { user } = useAuth();
  const [companyName, setCompanyName] = useState<string>('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileData = async () => {
      if (!user) return;

      try {
        // Fetch company_name from the 'profiles' table using the user's ID
        const { data, error } = await supabase
          .from('profiles')
          .select('company_name')
          .eq('id', user.id)
          .single();

        if (error) {
          console.error('Error fetching profile:', error);
          return;
        }

        if (data) {
          setCompanyName(data.company_name);
        }
      } catch (err) {
        console.error('Unexpected error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchProfileData();
  }, [user]);

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-12 gap-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">SME Workspace</span>
            <h1 className="text-3xl md:text-4xl font-black text-blue-950 mt-2">
              Welcome back,{' '}
              <span className="text-blue-600">
                {/* Display company name if loaded, otherwise fallback to email or skeleton */}
                {loading ? '...' : (companyName || user?.email?.split('@')[0])}
              </span>
            </h1>
            <p className="text-slate-500 mt-2">Manage your tool searches and matched providers.</p>
          </div>
          <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2">
            <Search size={18} /> New Search
          </button>
        </div>

        {/* Dashboard Grid */}
        <div className="grid md:grid-cols-3 gap-8">

          {/* Recent Matches Card */}
          <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
            <h3 className="font-bold text-blue-950 text-xl mb-6 flex items-center gap-2">
              <Bell className="text-blue-500" size={20} /> Recent Matches
            </h3>
            <div className="space-y-4">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex items-center justify-between p-4 rounded-xl bg-slate-50 border border-slate-100 hover:border-blue-200 transition-colors">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center font-bold text-slate-300 border border-slate-100">
                      IT
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-950 text-sm">ERP Provider #{i}</h4>
                      <p className="text-xs text-slate-500">Matched on 29.01.2026</p>
                    </div>
                  </div>
                  <span className="text-xs font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">9{8-i}% Match</span>
                </div>
              ))}
            </div>
          </div>

          {/* Quick Stats / Sidebar */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
              <h3 className="font-bold text-blue-950 text-lg mb-4 flex items-center gap-2">
                <Heart className="text-red-400" size={20} /> Saved
              </h3>
              <p className="text-slate-400 text-sm mb-4">You have 0 saved providers.</p>
              <button className="w-full py-3 border border-slate-200 rounded-xl text-sm font-bold text-slate-600 hover:bg-slate-50 transition-colors">
                View Favorites
              </button>
            </div>

            <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
               <h3 className="font-bold text-blue-950 text-lg mb-4 flex items-center gap-2">
                <Settings className="text-slate-400" size={20} /> Settings
              </h3>
              <div className="space-y-2">
                <button className="w-full text-left text-sm text-slate-600 hover:text-blue-600 py-2">Company Profile</button>
                <button className="w-full text-left text-sm text-slate-600 hover:text-blue-600 py-2">Notification Preferences</button>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}