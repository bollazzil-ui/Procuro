import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Bot, Plus, Clock, ChevronRight, Loader2, Calendar, FileText, Trash2, AlertCircle, Pencil } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../context/AuthContext';

// Define the interface based on the table we created
interface SMEMatchSession {
  id: string;
  created_at: string;
  purpose: string;
  status: string;
  user_count: number;
}

export default function SMEMatchEngine() {
  const { user } = useAuth();
  const [sessions, setSessions] = useState<SMEMatchSession[]>([]);
  const [loading, setLoading] = useState(true);

  // Deletion State
  const [sessionToDelete, setSessionToDelete] = useState<SMEMatchSession | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (user) {
      fetchSessions();
    }
  }, [user]);

  const fetchSessions = async () => {
    try {
      const { data, error } = await supabase
        .from('match_sessions')
        .select('*')
        .eq('profile_id', user?.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setSessions(data || []);
    } catch (err) {
      console.error('Error loading sessions:', err);
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = async () => {
    if (!sessionToDelete) return;
    setIsDeleting(true);
    setError(null);

    try {
      const { error } = await supabase
        .from('match_sessions')
        .delete()
        .eq('id', sessionToDelete.id);

      if (error) throw error;

      // Update UI locally by filtering out the deleted session
      setSessions((current) => current.filter((s) => s.id !== sessionToDelete.id));
      setSessionToDelete(null);
    } catch (err: any) {
      console.error('Error deleting session:', err);
      setError('Failed to delete session. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="pt-36 pb-20 px-8 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">AI Workspace</span>
            <h1 className="text-3xl font-black text-blue-950 mt-2">Match Engine</h1>
            <p className="text-slate-500 mt-2">Let our AI guide you to the perfect software solution.</p>
          </div>
          <Link
            to="/match-engine/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Session
          </Link>
        </div>

        {/* Intro Card */}
        <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot size={40} />
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Start a new search session</h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Not sure exactly what you need? Our Match Engine will ask you a few key questions about your goals, team size, and budget to recommend the best providers tailored to your situation.
          </p>
          <Link
            to="/match-engine/new"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            Start Questionnaire <ChevronRight size={16} />
          </Link>
        </div>

        {/* Recent Sessions */}
        <div className="mb-6">
          <h3 className="font-bold text-blue-950 mb-6 flex items-center gap-2">
            <Clock size={18} className="text-slate-400" /> Recent Sessions
          </h3>

          {/* Error Message for Deletion */}
          {error && (
            <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
              <AlertCircle size={20} />
              <span className="text-sm font-medium">{error}</span>
            </div>
          )}

          {loading ? (
             <div className="flex justify-center py-8">
               <Loader2 className="animate-spin text-blue-600" size={24} />
             </div>
          ) : sessions.length === 0 ? (
            <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
              No previous sessions found. Start your first search above!
            </div>
          ) : (
            <div className="grid gap-4">
              {sessions.map((session) => (
                <div key={session.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 transition-all flex flex-col md:flex-row justify-between md:items-center gap-4 group">
                   <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0">
                        <FileText size={20} />
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950 line-clamp-1">{session.purpose}</h4>
                        <div className="flex items-center gap-3 text-xs text-slate-500 mt-2">
                          <span className="flex items-center gap-1">
                            <Calendar size={12} /> {new Date(session.created_at).toLocaleDateString('de-CH')}
                          </span>
                          <span className="w-1 h-1 rounded-full bg-slate-300"></span>
                          <span>{session.user_count} User(s)</span>
                        </div>
                      </div>
                   </div>

                   <div className="flex items-center justify-between md:justify-end gap-4 min-w-[150px]">
                      <span className={`px-3 py-1 rounded-full text-xs font-bold border uppercase ${
                        session.status === 'completed'
                          ? 'bg-green-50 text-green-700 border-green-200'
                          : 'bg-amber-50 text-amber-600 border-amber-100'
                      }`}>
                        {session.status}
                      </span>

                      <div className="flex items-center gap-2">
                        {/* 1. Edit Button (Pencil) */}
                        <Link
                          to={`/match-engine/${session.id}`}
                          className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-all"
                          title="Edit Session"
                        >
                          <Pencil size={18} />
                        </Link>

                        {/* 2. Delete Button */}
                        <button
                          onClick={() => setSessionToDelete(session)}
                          className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                          title="Delete Session"
                        >
                          <Trash2 size={18} />
                        </button>

                        {/* 3. Placeholder Button (Kept as requested) */}
                        <Link
                          to={`/match-engine/${session.id}/results`}
                          className="p-2 text-white bg-blue-600 hover:bg-blue-700 rounded-lg transition-all shadow-sm flex items-center justify-center"
                          title="View AI Matches"
                        >
                          <ChevronRight size={20} />
                        </Link>
                      </div>
                   </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Delete Confirmation Modal */}
      {sessionToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Delete Session?</h3>
              <p className="text-slate-500 mt-2">
                Are you sure you want to delete this search session? This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setSessionToDelete(null)}
                className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={20} /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}