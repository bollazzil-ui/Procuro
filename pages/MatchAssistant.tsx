import React from 'react';
import { Link } from 'react-router-dom';
import { Bot, Plus, Clock, ChevronRight } from 'lucide-react';

export default function MatchAssistant() {
  return (
    <div className="pt-24 pb-20 px-8 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-5xl mx-auto">
        <div className="flex justify-between items-end mb-12">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">AI Workspace</span>
            <h1 className="text-3xl font-black text-blue-950 mt-2">Match Assistant</h1>
            <p className="text-slate-500 mt-2">Let our AI guide you to the perfect software solution.</p>
          </div>
          <Link
            to="/match-assistant/new"
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-lg transition-all flex items-center gap-2"
          >
            <Plus size={18} /> New Session
          </Link>
        </div>

        {/* Empty State / Intro Card */}
        <div className="bg-white rounded-[2rem] p-10 border border-slate-100 shadow-sm text-center mb-12">
          <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Bot size={40} />
          </div>
          <h2 className="text-2xl font-bold text-blue-950 mb-4">Start a new search session</h2>
          <p className="text-slate-500 max-w-xl mx-auto mb-8 leading-relaxed">
            Not sure exactly what you need? Our Match Assistant will ask you a few key questions about your goals, team size, and budget to recommend the best providers tailored to your situation.
          </p>
          <Link
            to="/match-assistant/new"
            className="inline-flex items-center gap-2 text-blue-600 font-bold hover:underline"
          >
            Start Questionnaire <ChevronRight size={16} />
          </Link>
        </div>

        {/* Previous Sessions (Placeholder) */}
        <div className="mb-6">
          <h3 className="font-bold text-blue-950 mb-4 flex items-center gap-2">
            <Clock size={18} className="text-slate-400" /> Recent Sessions
          </h3>
          <div className="bg-white rounded-2xl border border-slate-100 p-8 text-center text-slate-400 text-sm">
            No previous sessions found. Start your first search above!
          </div>
        </div>
      </div>
    </div>
  );
}