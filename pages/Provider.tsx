import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, Rocket, BarChart3, Target, Globe, ChevronRight } from 'lucide-react';
import Pricing from '../components/Pricing'; // Import shared component

export default function ProviderPage() {
  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">

        <div className="bg-blue-950 rounded-[3rem] p-12 text-white relative overflow-hidden mb-24">
          <div className="absolute top-0 right-0 p-12 opacity-10">
            <Rocket size={200} />
          </div>
          <div className="relative z-10 max-w-3xl">
            <span className="bg-blue-600/30 text-blue-200 border border-blue-500/30 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Solution for Providers</span>
            <h1 className="text-5xl font-black mt-6 mb-6 leading-tight">
              Access High-Intent <br /> <span className="text-blue-400">Swiss Business Leads.</span>
            </h1>
            <p className="text-xl text-blue-100/80 mb-10 leading-relaxed">
              Stop wasting budget on broad marketing. Procuro puts your software or IT service directly in front of SMEs who are already searching for exactly what you offer.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mb-10">
              <div className="bg-blue-900/40 border border-blue-800 p-6 rounded-2xl">
                <div className="text-blue-400 mb-2"><BarChart3 size={32} /></div>
                <div className="text-2xl font-bold">3.5x</div>
                <div className="text-xs text-blue-300 font-medium">Higher Conversion</div>
              </div>
              <div className="bg-blue-900/40 border border-blue-800 p-6 rounded-2xl">
                <div className="text-blue-400 mb-2"><Target size={32} /></div>
                <div className="text-2xl font-bold">100%</div>
                <div className="text-xs text-blue-300 font-medium">Verified Intent</div>
              </div>
              <div className="bg-blue-900/40 border border-blue-800 p-6 rounded-2xl">
                <div className="text-blue-400 mb-2"><Globe size={32} /></div>
                <div className="text-2xl font-bold">Swiss</div>
                <div className="text-xs text-blue-300 font-medium">Exclusive Market</div>
              </div>
            </div>
            <button className="bg-[#FFD700] hover:bg-[#F0C800] text-blue-950 px-10 py-5 rounded-2xl font-black text-lg transition-all shadow-xl flex items-center justify-center gap-2">
              Apply to Become a Partner <ChevronRight size={24} />
            </button>
          </div>
        </div>

        <Pricing />
      </div>
    </div>
  );
}