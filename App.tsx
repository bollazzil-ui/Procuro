
import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronRight, 
  Users, 
  Zap, 
  ShieldCheck, 
  Store, 
  Utensils, 
  Stethoscope, 
  Pill, 
  CheckCircle2, 
  Globe, 
  Linkedin, 
  Mail,
  Menu,
  X,
  Sparkles,
  ArrowLeft,
  Target,
  BarChart3,
  Rocket,
  Lock,
  Building2,
  Cpu
} from 'lucide-react';

// --- Types ---
type View = 'home' | 'sme' | 'provider' | 'about' | 'login';

// --- Sub-components ---

const Navbar = ({ setView, currentView }: { setView: (v: View) => void, currentView: View }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-50 border-b border-slate-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <button onClick={() => setView('home')} className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">Procuro</span>
          </button>
          
          <div className="hidden md:flex items-center space-x-8">
            <button onClick={() => setView('home')} className={`font-medium transition-colors ${currentView === 'home' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>Browse Categories</button>
            <button onClick={() => setView('sme')} className={`font-medium transition-colors ${currentView === 'sme' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>For SMEs</button>
            <button onClick={() => setView('provider')} className={`font-medium transition-colors ${currentView === 'provider' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>For Providers</button>
            <button onClick={() => setView('about')} className={`font-medium transition-colors ${currentView === 'about' ? 'text-blue-600' : 'text-slate-600 hover:text-blue-600'}`}>About Us</button>
          </div>

          <div className="hidden md:flex items-center space-x-4">
            <button onClick={() => setView('login')} className="text-slate-600 hover:text-blue-600 font-medium">Log In</button>
            <button onClick={() => setView('home')} className="bg-[#FFD700] hover:bg-[#F0C800] text-blue-900 px-5 py-2.5 rounded-full font-bold transition-all shadow-sm flex items-center gap-2">
              <Sparkles size={18} />
              Get AI Matches
            </button>
          </div>

          <div className="md:hidden">
            <button onClick={() => setIsOpen(!isOpen)} className="text-slate-600">
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white border-t border-slate-100 p-4 space-y-4 shadow-xl">
          <button onClick={() => { setView('home'); setIsOpen(false); }} className="block w-full text-left text-slate-600 font-medium">Browse Categories</button>
          <button onClick={() => { setView('sme'); setIsOpen(false); }} className="block w-full text-left text-slate-600 font-medium">For SMEs</button>
          <button onClick={() => { setView('provider'); setIsOpen(false); }} className="block w-full text-left text-slate-600 font-medium">For Providers</button>
          <button onClick={() => { setView('about'); setIsOpen(false); }} className="block w-full text-left text-slate-600 font-medium">About Us</button>
          <hr />
          <button onClick={() => { setView('login'); setIsOpen(false); }} className="w-full text-center py-2 text-slate-600 font-medium">Log In</button>
          <button onClick={() => { setView('home'); setIsOpen(false); }} className="w-full bg-[#FFD700] text-blue-900 py-3 rounded-xl font-bold">Get AI Matches</button>
        </div>
      )}
    </nav>
  );
};

const AboutPage = () => {
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
};

const LoginPage = () => {
  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-24 pb-20 px-4 bg-slate-50">
      <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-2xl p-10 border border-slate-100">
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-4">
            <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-2xl">P</span>
            </div>
            <span className="text-3xl font-bold text-blue-900 tracking-tight">Procuro</span>
          </div>
          <h2 className="text-2xl font-bold text-slate-900">Welcome Back</h2>
          <p className="text-slate-500 text-sm mt-2">Access your Swiss B2B portal</p>
        </div>

        <form className="space-y-6">
          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Company Email</label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="email" 
                placeholder="name@company.ch"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="space-y-1">
            <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
              <input 
                type="password" 
                placeholder="••••••••"
                className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
              />
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <label className="flex items-center gap-2 text-slate-600 cursor-pointer">
              <input type="checkbox" className="rounded border-slate-300 text-blue-600 focus:ring-blue-500" />
              Remember me
            </label>
            <a href="#" className="text-blue-600 font-bold hover:underline">Forgot password?</a>
          </div>

          <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2">
            Sign In <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100">
          <p className="text-center text-sm text-slate-500">
            Not a member yet? <br />
            <button className="text-blue-600 font-bold hover:underline mt-1">Register your Business</button>
          </p>
        </div>
      </div>
    </div>
  );
};

const SMEPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Overview
        </button>
        
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
};

const ProviderPage = ({ onBack }: { onBack: () => void }) => {
  return (
    <div className="pt-24 pb-20 animate-fade-in">
      <div className="max-w-7xl mx-auto px-4">
        <button onClick={onBack} className="flex items-center gap-2 text-blue-600 font-semibold mb-8 hover:gap-3 transition-all">
          <ArrowLeft size={20} /> Back to Overview
        </button>
        
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
};

const Hero = ({ setView }: { setView: (v: View) => void }) => {
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

const SplitSection = ({ setView }: { setView: (v: View) => void }) => {
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
          <button onClick={() => setView('sme')} className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            Start Free Search <ChevronRight size={20} />
          </button>
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
          <button onClick={() => setView('provider')} className="w-full py-4 bg-[#FFD700] hover:bg-[#F0C800] text-blue-950 rounded-xl font-bold transition-all flex items-center justify-center gap-2">
            Become a Partner <ChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
};

const IndustryGrid = () => {
  const industries = [
    { icon: <Store size={32} />, name: "Retail", count: "140+ Vendors" },
    { icon: <Utensils size={32} />, name: "Gastronomy", count: "85+ Vendors" },
    { icon: <Stethoscope size={32} />, name: "Medical Practices", count: "60+ Vendors" },
    { icon: <Pill size={32} />, name: "Pharmacies", count: "45+ Vendors" },
  ];

  return (
    <section className="py-20 px-4 bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-blue-950 mb-4">Specialized Industries</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Procuro offers expert matching for standardized sectors across Switzerland.
          </p>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {industries.map((industry) => (
            <div key={industry.name} className="bg-white p-8 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all text-center group">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl mb-4 group-hover:scale-110 transition-transform">
                {industry.icon}
              </div>
              <h3 className="font-bold text-blue-950 text-lg mb-1">{industry.name}</h3>
              <p className="text-sm text-slate-500">{industry.count}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Pricing = () => {
  const tiers = [
    { 
      name: "Starter", 
      price: "1,200", 
      period: "/year", 
      desc: "Perfect for new providers validation.",
      features: ["Market Entry", "Basic Validation", "Standard Listing"],
      highlight: false
    },
    { 
      name: "Professional", 
      price: "3,000", 
      period: "/year", 
      desc: "Our most popular tier for growth.",
      features: ["Priority Matching", "Enhanced Visibility", "Advanced Analytics", "3 Leads / Month"],
      highlight: true
    },
    { 
      name: "Premium", 
      price: "6,000", 
      period: "/year", 
      desc: "Dominant market position and volume.",
      features: ["Top-Ranked Placement", "Unlimited Lead Potential", "Dedicated Support", "Full API Access"],
      highlight: false
    },
  ];

  return (
    <section id="pricing" className="py-20 px-4 max-w-7xl mx-auto">
      <div className="text-center mb-16">
        <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">For Providers</span>
        <h2 className="text-4xl font-bold text-blue-950 mt-4 mb-4">Subscription Tiers</h2>
        <p className="text-slate-600 max-w-2xl mx-auto">
          Scale your acquisition with a predictable investment. Join our high-intent marketplace.
        </p>
      </div>
      <div className="grid md:grid-cols-3 gap-8">
        {tiers.map((tier) => (
          <div key={tier.name} className={`relative p-8 rounded-3xl border ${tier.highlight ? 'border-blue-600 shadow-2xl scale-105 z-10' : 'border-slate-100'} bg-white transition-all`}>
            {tier.highlight && (
              <span className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-blue-600 text-white px-4 py-1 rounded-full text-xs font-bold uppercase">
                Recommended
              </span>
            )}
            <h3 className="text-xl font-bold text-blue-950 mb-2">{tier.name}</h3>
            <div className="flex items-baseline gap-1 mb-6">
              <span className="text-sm font-semibold text-slate-400">CHF</span>
              <span className="text-4xl font-extrabold text-blue-950">{tier.price}</span>
              <span className="text-slate-400">{tier.period}</span>
            </div>
            <p className="text-slate-500 text-sm mb-8">{tier.desc}</p>
            <ul className="space-y-4 mb-8">
              {tier.features.map(f => (
                <li key={f} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                  <CheckCircle2 size={16} className="text-blue-500" />
                  {f}
                </li>
              ))}
            </ul>
            <button className={`w-full py-4 rounded-xl font-bold transition-all ${tier.highlight ? 'bg-blue-600 text-white hover:bg-blue-700' : 'bg-slate-50 text-blue-950 hover:bg-slate-100 border border-slate-200'}`}>
              Select Plan
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

const Team = () => {
  const members = [
    { name: "Claudio Di Lisa", role: "CEO" },
    { name: "Leonardo Bollazzi", role: "CTO" },
    { name: "Julia Schönthal", role: "CFO" },
    { name: "Laura Roggo", role: "Sales" },
    { name: "Saijai Thainoi", role: "Marketing" },
  ];

  return (
    <section className="py-20 px-4 bg-blue-950 text-white rounded-[3rem]">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-6">
          <div className="max-w-xl">
            <h2 className="text-4xl font-bold mb-6">Built with Trust at FHNW</h2>
            <p className="text-blue-200 text-lg leading-relaxed">
              Founded by a dedicated team from the University of Applied Sciences and Arts Northwestern Switzerland (FHNW), Procuro is dedicated to digitizing the Swiss SME ecosystem.
            </p>
          </div>
          <div className="flex items-center gap-4 text-blue-300">
            <ShieldCheck size={48} />
            <div className="text-left uppercase tracking-tighter">
              <p className="text-xs font-bold">University of Applied Sciences</p>
              <p className="text-sm font-black">FHNW</p>
            </div>
          </div>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-5 gap-6 px-6">
          {members.map((member) => (
            <div key={member.name} className="bg-blue-900/50 p-6 rounded-2xl border border-blue-800 hover:border-blue-600 transition-colors text-center">
              <div className="w-16 h-16 bg-blue-800 rounded-full mb-4 flex items-center justify-center text-blue-400 font-bold text-xl border-2 border-blue-700 mx-auto">
                {member.name.split(' ').map(n => n[0]).join('')}
              </div>
              <h4 className="font-bold text-white mb-1">{member.name}</h4>
              <p className="text-blue-400 text-xs font-semibold uppercase">{member.role}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

const Footer = ({ setView }: { setView: (v: View) => void }) => {
  return (
    <footer className="bg-white py-20 px-4 border-t border-slate-100">
      <div className="max-w-7xl mx-auto grid md:grid-cols-4 gap-12">
        <div className="col-span-1 md:col-span-1">
          <button onClick={() => setView('home')} className="flex items-center gap-2 mb-6">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-xl">P</span>
            </div>
            <span className="text-2xl font-bold text-blue-900 tracking-tight">Procuro</span>
          </button>
          <p className="text-slate-500 text-sm leading-relaxed mb-6">
            Switzerland's leading intelligent B2B marketplace. Connecting SMEs with IT excellence.
          </p>
          <div className="flex gap-4">
            <a href="#" className="w-10 h-10 rounded-full bg-slate-50 flex items-center justify-center text-slate-400 hover:bg-blue-50 hover:text-blue-600 transition-all">
              <Linkedin size={20} />
            </a>
          </div>
        </div>
        
        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Platform</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><button onClick={() => setView('home')} className="hover:text-blue-600 transition-colors">Browse Categories</button></li>
            <li><button onClick={() => setView('sme')} className="hover:text-blue-600 transition-colors">Smart Match System</button></li>
            <li><button onClick={() => setView('about')} className="hover:text-blue-600 transition-colors">Success Stories</button></li>
            <li><button onClick={() => setView('provider')} className="hover:text-blue-600 transition-colors">Partner Program</button></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Support</h4>
          <ul className="space-y-4 text-slate-500 text-sm">
            <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
            <li><button onClick={() => setView('about')} className="hover:text-blue-600 transition-colors">Contact Support</button></li>
            <li><a href="#" className="hover:text-blue-600 transition-colors">FAQ</a></li>
          </ul>
        </div>

        <div>
          <h4 className="font-bold text-blue-950 mb-6 uppercase text-xs tracking-widest">Get in Touch</h4>
          <div className="space-y-4">
            <a href="mailto:info@procuro.ch" className="flex items-center gap-2 text-slate-500 text-sm hover:text-blue-600 transition-colors">
              <Mail size={16} /> info@procuro.ch
            </a>
            <a href="mailto:partners@procuro.ch" className="flex items-center gap-2 text-slate-500 text-sm hover:text-blue-600 transition-colors">
              <Users size={16} /> partners@procuro.ch
            </a>
            <div className="mt-6 p-4 rounded-xl bg-blue-50 border border-blue-100">
              <p className="text-xs text-blue-900 font-bold mb-1">Office Switzerland</p>
              <p className="text-xs text-blue-700">Bahnhofstrasse 102, 8001 Zürich</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="max-w-7xl mx-auto mt-20 pt-8 border-t border-slate-50 flex flex-col md:flex-row justify-between items-center gap-4 text-slate-400 text-xs font-medium">
        <p>© 2026 Procuro. All rights reserved.</p>
        <div className="flex items-center gap-2">
          <span>Made in Switzerland</span>
          <div className="w-4 h-3 bg-red-600 flex items-center justify-center relative rounded-sm">
             <div className="absolute w-2 h-[2px] bg-white"></div>
             <div className="absolute w-[2px] h-2 bg-white"></div>
          </div>
        </div>
      </div>
    </footer>
  );
};

// --- Main App ---

export default function App() {
  const [view, setView] = useState<View>('home');

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [view]);

  const renderContent = () => {
    switch (view) {
      case 'sme':
        return <SMEPage onBack={() => setView('home')} />;
      case 'provider':
        return <ProviderPage onBack={() => setView('home')} />;
      case 'about':
        return <AboutPage />;
      case 'login':
        return <LoginPage />;
      default:
        return (
          <>
            <Hero setView={setView} />
            
            {/* Mock Search Results Preview Section */}
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
                       <button onClick={() => setView('sme')} className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1 mx-auto">
                         View All AI-Ranked Providers <ChevronRight size={16} />
                       </button>
                    </div>
                 </div>
              </div>
            </section>

            <SplitSection setView={setView} />
            <IndustryGrid />
            <Pricing />
            <Team />
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 overflow-x-hidden selection:bg-blue-100 selection:text-blue-900">
      <Navbar setView={setView} currentView={view} />
      <main>
        {renderContent()}
      </main>
      <Footer setView={setView} />
    </div>
  );
}
