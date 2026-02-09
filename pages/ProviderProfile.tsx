import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { BarChart3, Users, Zap, Settings } from 'lucide-react';

export default function ProviderProfile() {
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
        <div className="bg-blue-900 rounded-[2rem] p-8 md:p-12 text-white mb-12 shadow-xl">
           <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
              <div>
                <span className="bg-blue-800 text-blue-200 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider">Partner Portal</span>
                <h1 className="text-3xl md:text-4xl font-black mt-4">
                  Hello, <span className="text-blue-300">
                    {/* Display company name if loaded, otherwise fallback to email or skeleton */}
                    {loading ? '...' : (companyName || user?.email?.split('@')[0])}
                  </span>
                </h1>
                <p className="text-blue-200 mt-2">Your visibility score is trending up this week.</p>
              </div>
              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-xl border border-white/10">
                <div className="text-xs text-blue-200 uppercase font-bold">Current Plan</div>
                <div className="text-xl font-black">Professional Tier</div>
              </div>
           </div>
        </div>

        {/* Stats Row */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {[
            { label: "Profile Views", val: "1,240", icon: <Users size={20} /> },
            { label: "Direct Leads", val: "18", icon: <Zap size={20} /> },
            { label: "Match Rate", val: "94%", icon: <BarChart3 size={20} /> },
            { label: "Response Time", val: "2h", icon: <Settings size={20} /> },
          ].map((stat, i) => (
            <div key={i} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:shadow-md transition-shadow">
              <div className="text-slate-400 mb-2">{stat.icon}</div>
              <div className="text-2xl font-black text-blue-950">{stat.val}</div>
              <div className="text-xs font-bold text-slate-500 uppercase">{stat.label}</div>
            </div>
          ))}
        </div>

        {/* Content Area */}
        <div className="grid md:grid-cols-3 gap-8">
           <div className="col-span-1 md:col-span-2 bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-blue-950 text-xl mb-6">Active Leads</h3>
             <div className="p-8 text-center bg-slate-50 rounded-2xl border border-slate-100 border-dashed">
                <p className="text-slate-500 mb-4">No new leads in the last 24 hours.</p>
                <button className="text-blue-600 font-bold text-sm hover:underline">View Lead History</button>
             </div>
           </div>

           <div className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm">
             <h3 className="font-bold text-blue-950 text-xl mb-6">Listing Status</h3>
             <div className="space-y-4">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-slate-600">Profile Completeness</span>
                  <span className="font-bold text-blue-600">85%</span>
                </div>
                <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                  <div className="bg-blue-600 w-[85%] h-full"></div>
                </div>
                <button className="w-full mt-4 py-3 bg-blue-50 text-blue-700 font-bold rounded-xl hover:bg-blue-100 transition-colors">
                  Edit Profile
                </button>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
}