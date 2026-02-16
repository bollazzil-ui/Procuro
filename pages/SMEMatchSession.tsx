import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Bot, ArrowLeft, Save, Sparkles, AlertCircle, Trash2, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

export default function SMEMatchSession() {
  const navigate = useNavigate();
  const { id } = useParams(); // Get ID from URL (if present)
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(!!id); // Only block UI if editing
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
        // Optional: Redirect if session not found
        // navigate('/match-assistant');
      } finally {
        setInitialLoading(false);
      }
    };

    if (isEditing) fetchSession();
  }, [id, user, isEditing]);

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // 2. Handle Submit (Create or Update via Edge Functions)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    setLoading(true);
    setError(null);

    // Prepare payload common to both operations
    // Note: Mapping frontend names to DB columns (snake_case)
    const basePayload = {
      purpose: formData.purpose,
      user_count: parseInt(formData.users) || 0,
      existing_stack: formData.existingStack,
      budget: formData.priceRange,
    };

    try {
      if (isEditing) {
        // --- UPDATE MODE ---
        // Invoke 'update-session' Edge Function
        const { data, error } = await supabase.functions.invoke('update-session', {
          body: {
            session_id: id,      // Target the specific session
            profile_id: user.id, // Required for security check in the function
            ...basePayload
          }
        });

        if (error) throw error;
        // Edge functions might return { error: "..." } inside data even on 200 OK
        if (data && data.error) throw new Error(data.error);

      } else {
        // --- CREATE MODE ---
        // Invoke 'create-session' Edge Function
        const { data, error } = await supabase.functions.invoke('create-session', {
          body: {
            profile_id: user.id, // Required to link session to user
            ...basePayload
          }
        });

        if (error) throw error;
        if (data && data.error) throw new Error(data.error);
      }

      // Redirect back to list on success
      navigate('/match-assistant');

    } catch (err: any) {
      console.error('Error saving session:', err);
      // specific error message handling
      const msg = err.message || "Failed to save session. Please try again.";
      setError(msg);
    } finally {
      setLoading(false);
    }
  };

  // 3. Handle Delete
  const handleDelete = async () => {
    if(!window.confirm("Are you sure you want to delete this session?")) return;

    setLoading(true);
    try {
       // Since CASCADE is usually enabled in DB for embeddings,
       // we can delete the parent session directly
       const { error } = await supabase
        .from('match_sessions')
        .delete()
        .eq('id', id)
        .eq('profile_id', user?.id);

       if (error) throw error;
       navigate('/match-assistant');
    } catch(err) {
      console.error(err);
      setError("Failed to delete session.");
      setLoading(false);
    }
  };

  // Loading Spinner for initial fetch
  if (initialLoading) {
    return (
      <div className="flex justify-center items-center py-20 min-h-screen bg-slate-50">
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
          {/* Header Section */}
          <div className="bg-blue-950 p-8 text-white flex justify-between items-start">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Bot size={24} className="text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold">{isEditing ? 'Edit Session' : 'New Match Session'}</h1>
                <p className="text-blue-200 text-sm mt-1">
                  {isEditing ? 'Update your requirements to refine matches.' : 'Tell us about your requirements.'}
                </p>
              </div>
            </div>
            {isEditing && (
              <button
                onClick={handleDelete}
                className="text-blue-300 hover:text-white hover:bg-red-600/20 p-2 rounded-lg transition-all"
                title="Delete Session"
                type="button"
              >
                <Trash2 size={20} />
              </button>
            )}
          </div>

          <div className="p-8 md:p-10">
            {error && (
              <div className="mb-8 p-4 bg-red-50 text-red-700 rounded-xl border border-red-200 flex items-start gap-3">
                <AlertCircle size={20} className="mt-0.5 shrink-0" />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Question 1 */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  1. What is the main purpose or goal?
                </label>
                <p className="text-sm text-slate-500">Describe the problem you are trying to solve.</p>
                <textarea
                  name="purpose"
                  required
                  rows={4}
                  value={formData.purpose}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. We need a tool to manage our rental contracts and automate invoices..."
                />
              </div>

              {/* Question 2 */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  2. How many people will use this software?
                </label>
                <input
                  name="users"
                  type="number"
                  required
                  min="0"
                  value={formData.users}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. 15"
                />
              </div>

              {/* Question 3 */}
              <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  3. What software are you already using?
                </label>
                <textarea
                  name="existingStack"
                  rows={3}
                  value={formData.existingStack}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none resize-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. Microsoft 365, Bexio, Excel..."
                />
              </div>

               {/* Question 4 */}
               <div className="space-y-3">
                <label className="block text-lg font-bold text-blue-950">
                  4. What is your estimated budget?
                </label>
                <input
                  name="priceRange"
                  type="text"
                  value={formData.priceRange}
                  onChange={handleChange}
                  className="w-full p-4 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:bg-white outline-none transition-all placeholder:text-slate-400"
                  placeholder="e.g. 500 CHF/month"
                />
              </div>

              {/* Actions */}
              <div className="pt-8 border-t border-slate-100 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => navigate('/match-assistant')}
                  className="px-6 py-4 rounded-xl font-bold text-slate-500 hover:bg-slate-100 hover:text-slate-700 transition-all"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white px-8 py-4 rounded-xl font-bold shadow-lg shadow-blue-600/20 transition-all flex items-center gap-2 transform active:scale-95"
                >
                  {loading ? (
                    <>
                      <Loader2 className="animate-spin" size={20} />
                      Saving...
                    </>
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