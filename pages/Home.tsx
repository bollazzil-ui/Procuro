import React from 'react';
import { Link } from 'react-router-dom';
import { Search, Users, Zap, CheckCircle2, ChevronRight, Globe, ShieldCheck, Sparkles } from 'lucide-react';
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

      {/* Solution Showcase Section */}
      <section className="py-10 px-4 -mt-10 mb-20 animate-fade-in relative z-20">
        <div className="max-w-6xl mx-auto">
          <div className="bg-white border border-slate-200 rounded-[2.5rem] shadow-2xl overflow-hidden">
            <div className="grid lg:grid-cols-2 gap-0">

              {/* Left: Value Proposition List */}
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-blue-600 text-xs font-bold uppercase tracking-wider mb-6 w-fit">
                  <Sparkles size={14} />
                  The Procuro Advantage
                </div>
                <h2 className="text-3xl font-bold text-blue-950 mb-6">
                  Intelligent Matching. <br/>
                  <span className="text-blue-600">Zero Guesswork.</span>
                </h2>
                <p className="text-slate-600 mb-8 leading-relaxed">
                  We replace manual directories with an active AI engine that understands your business context.
                </p>

                <div className="space-y-6">
                  {[
                    {
                      icon: <Zap className="text-amber-500" size={24} />,
                      title: "Instant Precision",
                      desc: "Our AI analyzes 50+ data points to match you with providers who fit your budget, tech stack, and industry."
                    },
                    {
                      icon: <ShieldCheck className="text-green-500" size={24} />,
                      title: "Verified Trust",
                      desc: "Every provider is manually vetted for Swiss commercial registry status and financial stability."
                    },
                    {
                      icon: <Users className="text-blue-500" size={24} />,
                      title: "Direct Connection",
                      desc: "Skip the cold calls. Get introduced directly to decision-makers who are ready to work."
                    }
                  ].map((item, i) => (
                    <div key={i} className="flex gap-4 items-start group">
                      <div className="w-12 h-12 rounded-2xl bg-slate-50 flex items-center justify-center shrink-0 group-hover:bg-blue-50 transition-colors border border-slate-100">
                        {item.icon}
                      </div>
                      <div>
                        <h4 className="font-bold text-blue-950 text-lg">{item.title}</h4>
                        <p className="text-slate-500 text-sm leading-relaxed">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Right: "Picture Example" (UI Mockup) */}
              <div className="bg-slate-50 p-8 md:p-12 flex items-center justify-center relative overflow-hidden">
                  {/* Background Decor */}
                  <div className="absolute top-0 right-0 w-64 h-64 bg-blue-200/20 rounded-full blur-3xl translate-x-1/2 -translate-y-1/2"></div>
                  <div className="absolute bottom-0 left-0 w-64 h-64 bg-amber-200/20 rounded-full blur-3xl -translate-x-1/2 translate-y-1/2"></div>

                  {/* The Main UI Card (Simulating an App Screenshot) */}
                  <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl border border-slate-200/60 p-6 z-10 transform transition-transform hover:scale-[1.02] duration-500">
                    {/* Floating Badge */}
                    <div className="absolute -top-4 -right-4 bg-blue-600 text-white px-4 py-2 rounded-xl shadow-lg flex items-center gap-2 font-bold text-sm animate-bounce">
                      <CheckCircle2 size={16} /> Best Match
                    </div>

                    {/* Card Header */}
                    <div className="flex items-center gap-4 mb-6 border-b border-slate-100 pb-6">
                       <div className="w-16 h-16 bg-blue-950 rounded-xl flex items-center justify-center text-white font-bold text-xl">
                         SSI
                       </div>
                       <div>
                         <h3 className="font-bold text-blue-950 text-lg">SwissSolutions IT</h3>
                         <div className="flex items-center gap-2 text-sm text-slate-500">
                           <span>Zürich, CH</span>
                           <span className="w-1 h-1 bg-slate-300 rounded-full"></span>
                           <span>50-200 Employees</span>
                         </div>
                       </div>
                    </div>

                    {/* Match Criteria Visualization */}
                    <div className="space-y-4 mb-6">
                      <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                        <span>Tech Stack Fit</span>
                        <span className="text-blue-600">98%</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 w-[98%] h-full rounded-full"></div>
                      </div>

                      <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                        <span>Industry Experience</span>
                        <span className="text-blue-600">Perfect</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-blue-600 w-full h-full rounded-full"></div>
                      </div>

                      <div className="flex justify-between text-sm font-semibold text-slate-600 mb-1">
                        <span>Budget Alignment</span>
                        <span className="text-green-600">Within Range</span>
                      </div>
                      <div className="w-full bg-slate-100 h-2 rounded-full overflow-hidden">
                        <div className="bg-green-500 w-[85%] h-full rounded-full"></div>
                      </div>
                    </div>

                    {/* Action */}
                    <button className="w-full py-3 bg-blue-50 hover:bg-blue-100 text-blue-700 font-bold rounded-xl transition-colors flex items-center justify-center gap-2">
                      View Full Analysis <ChevronRight size={18} />
                    </button>
                  </div>

                  {/* Background Stacked Card Effect */}
                  <div className="absolute w-full max-w-md bg-white/50 rounded-2xl border border-slate-200 h-full top-4 left-4 -z-10 scale-95"></div>
              </div>

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