import React from 'react';
import { Store, Utensils, Stethoscope, Pill } from 'lucide-react';

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

export default IndustryGrid;