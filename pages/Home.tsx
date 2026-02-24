import React, { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight, ShieldCheck, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

// --- Micro-Interaction: Magnetic Button ---
const MagneticButton = ({ children, className, onClick, ...props }: any) => {
  const buttonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    let ctx = gsap.context(() => {
      button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        gsap.to(button, { x: x * 0.2, y: y * 0.2, scale: 1.03, duration: 0.6, ease: 'power3.out' });
      });
      button.addEventListener('mouseleave', () => {
        gsap.to(button, { x: 0, y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.3)' });
      });
    }, buttonRef);
    return () => ctx.revert();
  }, []);

  return (
    <button ref={buttonRef} onClick={onClick} className={`relative overflow-hidden group ${className}`} {...props}>
      <span className="relative z-10 flex items-center justify-center gap-2">{children}</span>
      <div className="absolute inset-0 bg-white/20 translate-y-[100%] group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.25,0.46,0.45,0.94)] rounded-full" />
    </button>
  );
};

// --- Artifact 1: Diagnostic Shuffler ---
const DiagnosticShuffler = () => {
  const [items, setItems] = useState(["Analyzing 50+ vectors", "Matching tech stack", "Aligning budget"]);

  useEffect(() => {
    const interval = setInterval(() => {
      setItems(prev => {
        const newArr = [...prev];
        const last = newArr.pop();
        if(last) newArr.unshift(last);
        return newArr;
      });
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="bg-white border border-slate-100 shadow-xl rounded-[2rem] p-8 h-full flex flex-col justify-between overflow-hidden relative">
      <div>
        <h3 className="text-xl font-bold text-blue-950 mb-2 font-['Inter']">AI-Driven Matchmaking</h3>
        <p className="text-slate-500 text-sm">Deterministic vendor alignment.</p>
      </div>
      <div className="relative h-32 mt-8">
        {items.map((item, i) => (
          <div
            key={item}
            className="absolute w-full bg-blue-50 border border-blue-100 p-4 rounded-xl shadow-sm transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] text-xs font-['JetBrains_Mono'] text-blue-700 font-semibold"
            style={{
              top: `${i * 12}px`,
              scale: 1 - (i * 0.05),
              opacity: 1 - (i * 0.2),
              zIndex: 10 - i
            }}
          >
            {item}
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Artifact 2: Telemetry Typewriter ---
const TelemetryTypewriter = () => {
  const lines = ["> Fetching provider data...", "> Comparing core features...", "> Normalizing pricing models...", "> Match confidence: 98%."];
  const [text, setText] = useState("");
  const [lineIdx, setLineIdx] = useState(0);

  useEffect(() => {
    if (lineIdx >= lines.length) return;
    let charIdx = 0;
    const interval = setInterval(() => {
      setText(lines.slice(0, lineIdx).join('\n') + (lineIdx > 0 ? '\n' : '') + lines[lineIdx].slice(0, charIdx));
      charIdx++;
      if (charIdx > lines[lineIdx].length) {
        clearInterval(interval);
        setTimeout(() => setLineIdx(p => p + 1), 800);
      }
    }, 40);
    return () => clearInterval(interval);
  }, [lineIdx]);

  return (
    <div className="bg-white border border-slate-100 shadow-xl rounded-[2rem] p-8 h-full flex flex-col relative">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h3 className="text-xl font-bold text-blue-950 mb-2 font-['Inter']">Transparent Comparisons</h3>
          <p className="text-slate-500 text-sm">Apples-to-apples evaluation.</p>
        </div>
        <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-slate-50 border border-slate-200">
          <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Live Feed</span>
        </div>
      </div>
      <div className="bg-slate-50 rounded-xl p-4 flex-1 border border-slate-200 font-['JetBrains_Mono'] text-[11px] text-slate-600 whitespace-pre-line leading-relaxed">
        {text}<span className="inline-block w-2 h-3 bg-blue-600 ml-1 animate-pulse" />
      </div>
    </div>
  );
};

// --- Main Page Component ---
export default function CinematicHome() {
  const heroRef = useRef(null);
  const manifestoRef = useRef(null);
  const protocolRef = useRef(null);

  useEffect(() => {
    let ctx = gsap.context(() => {
      // Hero Entrance
      gsap.fromTo('.hero-anim',
        { y: 50, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, stagger: 0.15, ease: 'power3.out', delay: 0.2 }
      );

      // Manifesto Reveal
      gsap.fromTo('.manifesto-text',
        { y: 40, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 1, stagger: 0.2, ease: 'power2.out',
          scrollTrigger: { trigger: manifestoRef.current, start: 'top 70%' }
        }
      );

      // New Protocol Cards Stagger
      gsap.fromTo('.protocol-card',
        { y: 50, opacity: 0 },
        {
          y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: 'power2.out',
          scrollTrigger: { trigger: protocolRef.current, start: 'top 75%' }
        }
      );

    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="bg-slate-50 min-h-screen text-slate-900 font-['Inter'] selection:bg-blue-100 selection:text-blue-900">
      <div className="noise-overlay" />

      {/* --- HERO: The Opening Shot --- */}
      <section ref={heroRef} className="relative h-[100dvh] flex items-end pb-24 px-8 md:px-16 overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
        {/* Background Decorative Blurs */}
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute bottom-1/4 -right-20 w-96 h-96 bg-[#FFD700]/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-4xl">
          <div className="hero-anim inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold mb-6">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
            </span>
            Swiss Quality AI Matching
          </div>
          <h1 className="hero-anim text-6xl md:text-[7rem] leading-[0.9] tracking-tighter mb-8 text-blue-950">
            <span className="block font-bold">Swiss precision meets</span>
            <span className="block font-['Playfair_Display'] italic text-blue-600 pr-4">Intelligence.</span>
          </h1>
          <p className="hero-anim text-lg md:text-xl text-slate-600 max-w-xl mb-12 font-light leading-relaxed">
            The intelligent B2B marketplace for Swiss SMEs. Stop searching directories. Start integrating verified solutions.
          </p>
          <div className="hero-anim flex flex-wrap gap-4">
             <Link to="/sme">
                <MagneticButton className="bg-[#FFD700] text-blue-950 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase shadow-lg shadow-[#FFD700]/20">
                  Start Free Search
                </MagneticButton>
             </Link>
             <Link to="/provider">
                <MagneticButton className="bg-white border border-slate-200 text-slate-700 px-8 py-4 rounded-full font-bold text-sm tracking-widest uppercase hover:bg-slate-50">
                  Become a Partner
                </MagneticButton>
             </Link>
          </div>
        </div>
      </section>

      {/* --- FEATURES: Interactive Functional Artifacts --- */}
      <section className="py-32 px-8 md:px-16 max-w-[1600px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6 relative z-10">
        <DiagnosticShuffler />
        <TelemetryTypewriter />

        {/* Artifact 3: Cursor Protocol Scheduler */}
        <div className="bg-white border border-slate-100 shadow-xl rounded-[2rem] p-8 h-full flex flex-col justify-between">
          <div>
            <h3 className="text-xl font-bold text-blue-950 mb-2 font-['Inter']">Swiss Quality Assurance</h3>
            <p className="text-slate-500 text-sm">Rigorous provider verification.</p>
          </div>
          <div className="mt-8 grid grid-cols-2 gap-4">
            <div className="border border-blue-200 bg-blue-50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center">
              <ShieldCheck className="text-blue-600" size={24} />
              <span className="text-xs font-bold text-blue-900">Commercial<br/>Registry</span>
            </div>
            <div className="border border-slate-100 bg-slate-50 rounded-xl p-4 flex flex-col items-center justify-center gap-3 text-center opacity-70">
               <CheckCircle2 className="text-slate-400" size={24} />
               <span className="text-xs font-bold text-slate-600">Financial<br/>Health</span>
            </div>
          </div>
        </div>
      </section>

      {/* --- PHILOSOPHY: The Manifesto (Dark Section) --- */}
      <section ref={manifestoRef} className="py-40 px-8 relative overflow-hidden bg-blue-950 rounded-[3rem] mx-4 md:mx-8 mb-24 shadow-2xl">
        <div className="absolute top-0 right-0 p-12 opacity-5">
           <ShieldCheck size={400} />
        </div>
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <p className="manifesto-text text-2xl md:text-3xl text-blue-200/60 font-light tracking-tight mb-8">
            Most B2B platforms focus on: endless, unverified directories.
          </p>
          <p className="manifesto-text text-5xl md:text-7xl font-['Playfair_Display'] italic text-white leading-tight">
            We focus on: <span className="text-[#FFD700]">curated exactitude.</span>
          </p>
        </div>
      </section>

      {/* --- PROTOCOL: Stylish Grid Layout --- */}
      <section ref={protocolRef} className="py-32 px-8 md:px-16 max-w-[1600px] mx-auto">
        <div className="text-center mb-20">
          <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">The Protocol</span>
          <h2 className="text-4xl md:text-5xl font-black text-blue-950 mt-4 mb-6">How Procuro Works</h2>
          <p className="text-slate-500 max-w-2xl mx-auto text-lg">
            A streamlined approach to discovering and implementing verified IT solutions for your business.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Subtle connecting line behind cards (visible on desktop) */}
          <div className="hidden md:block absolute top-12 left-[15%] right-[15%] h-0.5 bg-slate-200 z-0 border-t border-dashed border-slate-300"></div>

          {[
            { step: "01", title: "Profile Definition", desc: "Map your technical debt, budget constraints, and operational goals." },
            { step: "02", title: "Algorithmic Search", desc: "Our engine filters thousands of verified Swiss providers to find exact matches." },
            { step: "03", title: "Direct Introduction", desc: "Bypass the sales loop. Connect instantly with technical decision-makers." }
          ].map((card) => (
            <div
              key={card.step}
              className="protocol-card relative z-10 bg-white border border-slate-100 rounded-[2.5rem] p-10 shadow-lg hover:shadow-2xl hover:-translate-y-2 hover:border-blue-200 transition-all duration-500 group"
            >
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center text-2xl font-black mb-8 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500 shadow-sm border border-blue-100 group-hover:border-transparent">
                {card.step}
              </div>
              <h3 className="text-2xl font-bold text-blue-950 mb-4">{card.title}</h3>
              <p className="text-slate-500 leading-relaxed">{card.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* --- CTA / GET STARTED --- */}
      <section className="py-40 px-8 flex justify-center bg-slate-50">
        <div className="bg-blue-600 rounded-[3rem] p-16 md:p-24 text-center max-w-4xl w-full relative overflow-hidden group shadow-2xl shadow-blue-600/20">
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-8 relative z-10">
            Ready to upgrade your infrastructure?
          </h2>
          <Link to="/sme" className="relative z-10 inline-block">
             <button className="bg-[#FFD700] text-blue-950 px-10 py-5 rounded-full font-bold tracking-widest uppercase text-sm hover:scale-105 transition-transform duration-500 flex items-center gap-3 mx-auto shadow-lg">
               Start Free Search <ArrowRight size={18} />
             </button>
          </Link>
        </div>
      </section>
    </div>
  );
}