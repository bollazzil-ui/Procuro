import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ChevronRight, Building2, Briefcase } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState<'SME' | 'PROVIDER'>('SME');
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user & pass metadata
      const { data: authData, error: authError } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            role: role, // Pass the selected role here
          }
        }
      });

      if (authError) throw authError;

      // 2. The Database Trigger handles the profile creation now.
      // We don't need the manual 'insert' code anymore.

      if (authData.user) {
        navigate('/');
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-20 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-2xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 text-sm mt-2">Join the Swiss B2B portal</p>
        </div>

        {error && (
          <div className="mb-4 p-3 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-6">
          {/* Role Selection */}
          <div className="grid grid-cols-2 gap-4 mb-2">
            <button
              type="button"
              onClick={() => setRole('SME')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'SME' ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <Building2 size={24} />
              <span className="text-xs font-bold">I am an SME</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('PROVIDER')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'PROVIDER' ? 'bg-blue-50 border-blue-600 text-blue-900' : 'bg-white border-slate-200 text-slate-500'
              }`}
            >
              <Briefcase size={24} />
              <span className="text-xs font-bold">I am a Provider</span>
            </button>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="name@company.ch"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50">
            {loading ? 'Creating...' : 'Register'} <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}