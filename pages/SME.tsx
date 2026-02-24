import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft, ChevronRight, Target, CheckCircle2 } from 'lucide-react';
import IndustryGrid from '../components/IndustryGrid'; // Import shared component

export default function SMEPage() {
  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">

        <div className="grid lg:grid-cols-2 gap-16 items-center mb-24">
          <div>
            <span className="bg-blue-100 text-blue-700 px-4 py-1 rounded-full text-sm font-bold uppercase tracking-wider">Solution for SMEs</span>
            <h1 className="text-5xl font-black text-blue-950 mt-6 mb-6 leading-tight">
              Digitize Your Swiss Business with <span className="text-blue-600">Confidence.</span>
            </h1>
            <p className="text-xl text-slate-600 mb-8 leading-relaxed">
              We understand that Swiss SMEs need reliable, local, and efficient digital tools. Procuro uses AI to match your specific business requirements with the best-vetted providers in the market.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
                Start Free Matching <ChevronRight size={20} />
              </button>
              <button className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-xl font-bold hover:bg-slate-50 transition-all">
                How it works
              </button>
            </div>
          </div>
          <div className="relative">
            <div className="absolute inset-0 bg-blue-600/5 rounded-[3rem] -rotate-3 transform"></div>
            <div className="relative bg-white border border-slate-100 p-8 rounded-[3rem] shadow-2xl">
              <h3 className="font-bold text-blue-950 mb-6 flex items-center gap-2"><Target className="text-blue-600" /> Why Procuro for SMEs?</h3>
              <div className="space-y-6">
                {[
                  { title: "100% Free for SMEs", desc: "No hidden costs. Our platform is free for businesses looking for tools." },
                  { title: "Neutral & Unbiased", desc: "We provide recommendations based on data and fit, not advertising budgets." },
                  { title: "Swiss Quality Assurance", desc: "All providers are vetted for their quality and reliability in the Swiss market." }
                ].map((item, i) => (
                  <div key={i} className="flex gap-4">
                    <div className="w-10 h-10 bg-green-50 rounded-full flex items-center justify-center shrink-0 text-green-600">
                      <CheckCircle2 size={24} />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-900">{item.title}</h4>
                      <p className="text-slate-500 text-sm">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      <IndustryGrid />
    </div>
  );
}