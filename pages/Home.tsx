import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Zap, CheckCircle2, ChevronRight, Globe } from 'lucide-react';
import IndustryGrid from '../components/IndustryGrid'; // Import shared component
import Pricing from '../components/Pricing';         // Import shared component
import Team from '../components/Team';               // Import shared component

// --- Local Sub-components for Home Page ---

const Hero = () => {
  return (
    <section className="pt-32 pb-20 px-4 bg-gradient-to-b from-blue-50/50 to-white overflow-hidden relative">
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6 animate-fade-in">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          Swiss Quality AI Matching
        </div>
        <h1 className="text-5xl md:text-7xl font-extrabold text-blue-950 mb-6 leading-tight">
          Stop Searching. <br />
          <span className="text-blue-600">Start Solving.</span>
        </h1>
        <p className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto leading-relaxed">
          The intelligent B2B marketplace for Swiss SMEs. Find the right digital tools with AI-driven matching.
        </p>

        <div className="relative max-w-2xl mx-auto group">
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-400 to-indigo-400 rounded-2xl blur opacity-25 group-focus-within:opacity-50 transition duration-1000"></div>
          <div className="relative bg-white border border-slate-200 rounded-2xl p-2 flex items-center shadow-xl">
            <div className="pl-4 pr-2 text-blue-600">
              <Search size={24} />
            </div>
            <input
              type="text"
              placeholder="Hi! I am your Procuro Assistant. What are you looking for today?"
              className="w-full py-4 px-2 outline-none text-slate-700 placeholder:text-slate-400 text-lg font-medium"
            />
            <button className="hidden sm:block bg-[#FFD700] hover:bg-[#F0C800] text-blue-900 px-8 py-4 rounded-xl font-bold transition-all shadow-md">
              Get AI Matches
            </button>
          </div>
        </div>

        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <span className="text-sm font-semibold text-slate-400 uppercase tracking-wider self-center mr-2">Quick Search:</span>
          {['CRM & Sales', 'Accounting & Finance', 'ERP Systems', 'IT Security'].map((tag) => (
            <button key={tag} className="px-4 py-2 bg-white border border-slate-100 rounded-full text-sm font-medium text-slate-600 hover:border-blue-400 hover:text-blue-600 shadow-sm transition-all">
              {tag}
            </button>
          ))}
        </div>
      </div>

      {/* Background decoration elements */}
      <div className="absolute top-1/4 -left-20 w-64 h-64 bg-blue-400/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-1/4 -right-20 w-64 h-64 bg-indigo-400/10 rounded-full blur-3xl"></div>
    </section>
  );
};

const SplitSection = () => {
  return (
    <section className="py-20 px-4 max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Left - SMEs */}
        <div className="bg-slate-50 rounded-3xl p-8 md:p-12 border border-slate-100 hover:shadow-lg transition-shadow">
          <div className="w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center mb-6 text-blue-600">
            <Zap size={28} />
          </div>
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Find the Right Digital Tools</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Stop wading through endless lists. Get pre-vetted recommendations that fit your specific Swiss SME profile.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "AI-Driven Matchmaking",
              "Transparent Comparisons",
              "Free Access for SMEs"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-slate-700 font-medium">
                <CheckCircle2 className="text-green-500" size={20} />
                {feature}
              </li>
            ))}
          </ul>
          <Link to="/sme" className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            Start Free Search <ChevronRight size={20} />
          </Link>
        </div>

        {/* Right - Providers */}
        <div className="bg-blue-900 rounded-3xl p-8 md:p-12 text-white hover:shadow-2xl transition-shadow relative overflow-hidden group">
          <div className="absolute top-0 right-0 p-8 opacity-10 transform translate-x-4 -translate-y-4 group-hover:scale-110 transition-transform">
            <Users size={120} />
          </div>
          <div className="w-12 h-12 bg-blue-800 rounded-2xl flex items-center justify-center mb-6 text-blue-300">
            <Globe size={28} />
          </div>
          <h2 className="text-3xl font-bold mb-4">Connect with Qualified Leads</h2>
          <p className="text-blue-100 mb-8 leading-relaxed">
            Join Switzerland's premier ecosystem. Reach SMEs actively looking for your specific IT solutions.
          </p>
          <ul className="space-y-4 mb-8">
            {[
              "Intent-Driven Leads",
              "Targeted Acquisition",
              "Lower Customer Acquisition Costs"
            ].map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-blue-50 font-medium">
                <CheckCircle2 className="text-blue-400" size={20} />
                {feature}
              </li>
            ))}
          </ul>
          <Link to="/provider" className="w-full py-4 bg-[#FFD700] hover:bg-[#F0C800] text-blue-950 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            Become a Partner <ChevronRight size={20} />
          </Link>
        </div>
      </div>
    </section>
  );
};

// --- Main Home Component ---

export default function Home() {
  return (
    <>
      <Hero />

      {/* Search Results Preview Section */}
      <section className="py-10 px-4 -mt-10 mb-20 animate-fade-in">
        <div className="max-w-4xl mx-auto">
            <div className="bg-white border border-slate-200 rounded-2xl shadow-2xl p-6 md:p-8">
              <div className="flex items-center justify-between mb-6">
                  <h3 className="font-bold text-blue-950 flex items-center gap-2">
                    <Users size={18} /> Top Recommendations
                  </h3>
                  <span className="text-xs font-bold text-blue-600 px-3 py-1 bg-blue-50 rounded-full border border-blue-100">
                    Results found: 4
                  </span>
              </div>

              <div className="space-y-4">
                  {[
                    { name: "SwissSolutions IT", score: "98%", category: "ERP Specialists", gold: true },
                    { name: "Alpine CRM Experts", score: "94%", category: "Cloud Sales Tools", gold: false }
                  ].map((item, i) => (
                    <div key={i} className="group p-4 rounded-xl border border-slate-100 hover:border-blue-200 hover:bg-blue-50/30 transition-all flex items-center justify-between">
                      <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-slate-100 rounded-lg flex items-center justify-center font-bold text-slate-400">
                            LOGO
                          </div>
                          <div>
                            <h4 className="font-bold text-blue-950 group-hover:text-blue-600 transition-colors">{item.name}</h4>
                            <p className="text-sm text-slate-500">{item.category}</p>
                          </div>
                      </div>
                      <div className="flex items-center gap-3">
                          <div className="flex flex-col items-end">
                            <span className="text-[10px] font-bold uppercase text-slate-400">Match Score</span>
                            <span className="text-lg font-black text-blue-600 leading-none">{item.score}</span>
                          </div>
                          {item.gold && (
                            <div className="px-2 py-1 bg-[#FFD700] text-blue-900 text-[10px] font-black rounded uppercase shadow-sm">
                              AI Match
                            </div>
                          )}
                          <ChevronRight className="text-slate-300 group-hover:text-blue-400 transition-colors" size={20} />
                      </div>
                    </div>
                  ))}
              </div>

              <div className="mt-6 pt-6 border-t border-slate-50 text-center">
                  <Link to="/sme" className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1 mx-auto justify-center">
                    View All AI-Ranked Providers <ChevronRight size={16} />
                  </Link>
              </div>
            </div>
        </div>
      </section>

      <SplitSection />
      <IndustryGrid />
      <Pricing />
      <Team />
    </>
  );
}