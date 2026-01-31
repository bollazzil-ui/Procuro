import React from 'react';
import { Search, Filter, ArrowRight } from 'lucide-react';

export default function MatchSearch() {
  return (
    <div className="pt-24 pb-20 px-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-blue-950">Match Search</h1>
          <p className="text-slate-500 mt-2">Find and connect with the perfect partners using AI-driven filters.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search for services, skills, or company names..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
            Search
          </button>
        </div>

        {/* Filters & Results Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-blue-950 mb-4 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Industry</label>
                  <select className="w-full mt-1 p-2 bg-slate-50 rounded-lg text-sm border-none">
                    <option>All Industries</option>
                    <option>Retail</option>
                    <option>Healthcare</option>
                    <option>Gastronomy</option>
                  </select>
                </div>
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase">Location</label>
                  <select className="w-full mt-1 p-2 bg-slate-50 rounded-lg text-sm border-none">
                    <option>Switzerland (All)</option>
                    <option>Zürich</option>
                    <option>Bern</option>
                    <option>Geneva</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="md:col-span-3">
             <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-950">Start your search</h3>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  Enter keywords above to find verified partners matching your criteria.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}