import React from 'react';
import { CheckCircle2 } from 'lucide-react';

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

export default Pricing;