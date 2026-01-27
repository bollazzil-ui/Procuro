import React from 'react';
import { Target, Cpu, ShieldCheck } from 'lucide-react';
import Team from '../components/Team'; // Import shared component

export default function AboutPage() {
  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-16">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Our Story</span>
          <h1 className="text-5xl font-black text-blue-950 mt-4 mb-6 leading-tight">Empowering Swiss Businesses through <span className="text-blue-600">Intelligence.</span></h1>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Born out of the FHNW ecosystem, Procuro was founded to solve the fragmentation in the Swiss B2B marketplace. We replace manual searching with AI-driven precision.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-24">
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Target /></div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">The Mission</h3>
            <p className="text-slate-600 text-sm">To become the central infrastructure for Swiss SMEs to discover, compare, and implement digital solutions seamlessly.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"><Cpu /></div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">The Technology</h3>
            <p className="text-slate-600 text-sm">Our "Smart Match" algorithm analyzes thousands of data points to ensure every recommendation is tailored to the SME's unique sector.</p>
          </div>
          <div className="p-8 bg-slate-50 rounded-3xl border border-slate-100">
            <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6"><ShieldCheck /></div>
            <h3 className="text-xl font-bold text-blue-950 mb-3">The Trust</h3>
            <p className="text-slate-600 text-sm">Swiss values are at our core. Privacy, reliability, and academic rigor from our FHNW roots guide every decision.</p>
          </div>
        </div>

        <Team />
      </div>
    </div>
  );
}