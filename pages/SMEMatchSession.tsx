import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bot, ArrowLeft, Save, Sparkles, AlertCircle, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function SMEMatchSession() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id); // Only load if editing
  const [error, setError] = useState<string | null>(null);

  const [formData, setFormData] = useState({
    purpose: '',
    users: '',
    priceRange: '',
    existingStack: ''
  });

  const isEditing = !!id;

  // 1. Fetch Data if Editing
  useEffect(() => {
    const fetchSession = async () => {
      if (!id || !user) return;
      try {
        const { data, error } = await supabase
          .from('match_sessions')
          .select('*')
          .eq('id', id)
          .eq('profile_id', user.id) // Ensure ownership
          .single();

        if (error) throw error;
        if (data) {
          setFormData({
            purpose: data.purpose || '',
            users: data.user_count ? String(data.user_count) : '',
            priceRange: data.budget || '',
            existingStack: data.existing_stack || ''
          });
        }
      } catch (err) {
        console.error(err);
        setError("Failed to load session details.");
      } finally {
        setInitialLoading(false);
      }
    };

    if (isEditing) fetchSession();
  }, [id, user, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Handle Submit (Create or Update)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    const payload = {
      profile_id: user.id,
      purpose: formData.purpose,
      user_count: parseInt(formData.users) || 0,
      existing_stack: formData.existingStack,
      budget: formData.priceRange,
      // Only reset status if it's a new session, or keep as is if editing
      ...(isEditing ? {} : { status: 'analyzing' })
    };

    try {
      if (isEditing) {
        const { error } = await supabase
          .from('match_sessions')
          .update(payload)
          .eq('id', id)
          .eq('profile_id', user.id);
        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('match_sessions')
          .insert(payload);
        if (error) throw error;
      }
      navigate('/match-assistant');
    } catch (err: any) {
      console.error('Error saving session:', err);
      setError(err.message || "Failed to save session");
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Delete (Optional extra feature inside the edit page)
  const handleDelete = async () => {
    if(!confirm("Are you sure you want to delete this session?")) return;
    try {
       await supabase.from('match_sessions').delete().eq('id', id);
       navigate('/match-assistant');
    } catch(err) { console.error(err); }
  };

  if (initialLoading) {
    return (
      <div className="flex justify-center py-20 min-h-screen bg-slate-50">
        <Loader2 className="animate-spin text-blue-600" size={32} />
      </div>
    );
  }

  return (
    <div className="pt-24 pb-20 px-4 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-3xl mx-auto">
        <button
          onClick={() => navigate('/match-assistant')}
          className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors"
        >
          <ArrowLeft size={18} /> Back to List
        </button>

        <div className="bg-white rounded-[2rem] shadow-xl border border-slate-100 overflow-hidden">
          <div className="bg-blue-950 p-8 text-white flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center">
                <Bot size={24} />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{isEditing ? 'Edit Session' : 'New Match Session'}</h1>
                <p className="text-blue-200 text-sm">
                  {isEditing ? 'Update your requirements.' : 'Tell us about your requirements.'}
                </p>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={handleDelete}
                className="text-blue-300 hover:text-white hover:bg-red-600/50 p-2 rounded-lg transition-all"
                title="Delete Session"
                type="button"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
                <AlertCircle size={20} />
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">1. What is the main purpose or goal?</label>
                <p className="text-sm text-slate-500">Describe the problem you are trying to solve.</p>
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

              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">2. How many people will use this software?</label>
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

              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">3. What software are you already using?</label>
                <textarea
                  name="existingStack"
                  rows={3}
                  value={formData.existingStack}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none transition-all"
                  placeholder="e.g. Microsoft 365, Bexio, Excel..."
                />
              </div>

               <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">4. What is your estimated budget?</label>
                <input
                  name="priceRange"
                  type="text"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                  placeholder="e.g. 500 CHF/month"
                />
              </div>

              <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/match-assistant')}
                  className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-50 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2 disabled:opacity-70"
                >
                  {loading ? (
                    <>Saving...</>
                  ) : (
                    <>
                      {isEditing ? <Save size={20} /> : <Sparkles size={20} />}
                      {isEditing ? 'Save Changes' : 'Generate Matches'}
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