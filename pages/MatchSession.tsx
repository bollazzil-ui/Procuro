import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bot, ArrowLeft, Save, Sparkles, AlertCircle } from 'lucide-react'; // Added AlertCircle
import { supabase } from '../lib/supabase'; // Import supabase
import { useAuth } from '../context/AuthContext'; // Import auth

export default function MatchSession() {
  const navigate = useNavigate();
  const { user } = useAuth(); // Get current user
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null); // Error state

  const [formData, setFormData] = useState({
    purpose: '',
    users: '',
    priceRange: '',
    existingStack: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return; // Guard clause

    setLoading(true);
    setError(null);

    try {
      // Insert into Supabase
      const { error: insertError } = await supabase
        .from('match_sessions')
        .insert({
          profile_id: user.id,
          purpose: formData.purpose,
          user_count: parseInt(formData.users) || 0,
          existing_stack: formData.existingStack,
          budget: formData.priceRange,
          status: 'analyzing' // Initial status
        });

      if (insertError) throw insertError;

      // Redirect back to the Assistant page to see the new list
      navigate('/match-assistant');

    } catch (err: any) {
      console.error('Error saving session:', err);
      setError(err.message || "Failed to save session");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-24 pb-20 px-4 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/match-assistant')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back
        </button>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          {/* Header */}
          <div className="bg-blue-950 p-8 text-white">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">New Match Session</h1>
                <p className="text-blue-200 text-sm">Tell us about your requirements.</p>
              </div>
            </div>
          </div>

          {/* Form */}
          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">

              {/* Question 1: Purpose */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  1. What is the main purpose or goal of the new solution?
                </label>
                <p className="text-sm text-slate-500">Describe the problem you are trying to solve (e.g., "Automate invoicing," "Manage customer leads").</p>
                <textarea
                  name="purpose"
                  required
                  rows={4}
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                  placeholder="We need a tool to..."
                />
              </div>

              {/* Question 2: Users */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  2. How many people will use this software?
                </label>
                <input
                  name="users"
                  type="number"
                  required
                  value={formData.users}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 15"
                />
              </div>

              {/* Question 3: Existing Software */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  3. What software are you already using?
                </label>
                <p className="text-sm text-slate-500">List any tools that the new solution needs to integrate with or replace.</p>
                <textarea
                  name="existingStack"
                  rows={3}
                  value={formData.existingStack}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                  placeholder="e.g. Microsoft 365, Bexio, Excel..."
                />
              </div>

               {/* Question 4: Price Range */}
               <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  4. What is your estimated budget?
                </label>
                <input
                  name="priceRange"
                  type="text"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 500 CHF/month or 10,000 CHF setup"
                />
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end">
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      <Sparkles size={20} /> Generate Matches
                    </>
                  )}
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}