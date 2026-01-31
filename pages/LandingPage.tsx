import React from 'react';
import { Link } from 'react-router-dom';
import { Zap, CheckCircle2, ChevronRight, Globe, Users } from 'lucide-react';
import Team from '../components/Team';

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

        <div className="flex justify-center gap-4">
             <Link to="/register" className="bg-[#FFD700] hover:bg-[#F0C800] text-blue-900 px-8 py-4 rounded-xl font-bold transition-all shadow-md">
              Get Started
            </Link>
             <Link to="/about" className="bg-white hover:bg-slate-50 text-blue-900 border border-slate-200 px-8 py-4 rounded-xl font-bold transition-all shadow-sm">
              Learn More
            </Link>
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

export default function LandingPage() {
  return (
    <>
      <Hero />
      <SplitSection />
      <Team />
    </>
  );
}
