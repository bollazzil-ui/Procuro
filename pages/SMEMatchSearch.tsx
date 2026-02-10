import React, { useState } from 'react';
import { Search, Filter } from 'lucide-react';

export default function SMEMatchSearch() {
  // State for Filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [category, setCategory] = useState('');
  const [priceModel, setPriceModel] = useState('');

  // Handlers
  const handleMinChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMinPrice(val);
  };

  const handleMaxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setMaxPrice(val);
  };

  return (
    <div className="pt-24 pb-20 px-8 animate-fade-in">
      <div className="max-w-5xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-blue-950">Match Search</h1>
          <p className="text-slate-500 mt-2">Find and connect with the perfect partners using AI-driven filters.</p>
        </div>

        {/* Search Bar */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-8">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              placeholder="Search for services, skills, or company names..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2">
            Search
          </button>
        </div>

        {/* Filters & Results Placeholder */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* Filters Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100">
              <h3 className="font-bold text-blue-950 mb-6 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h3>

              <div className="space-y-6">

                {/* 1. Category Filter */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Category</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full mt-2 p-3 bg-slate-50 rounded-xl text-sm border border-slate-100 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 font-medium"
                  >
                    <option value="">All Categories</option>
                    <option value="ERP">ERP Systems</option>
                    <option value="CRM">CRM & Sales</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Finance">Accounting & Finance</option>
                    <option value="HR">HR & Payroll</option>
                  </select>
                </div>

                {/* 2. Price Model Filter */}
                <div>
                   <label className="text-xs font-bold text-slate-400 uppercase tracking-wider">Price Model</label>
                   <select
                      value={priceModel}
                      onChange={(e) => setPriceModel(e.target.value)}
                      className="w-full mt-2 p-3 bg-slate-50 rounded-xl text-sm border border-slate-100 focus:ring-2 focus:ring-blue-100 outline-none text-slate-700 font-medium"
                   >
                      <option value="">Any Model</option>
                      <option value="per_user">Per User</option>
                      <option value="per_month">Per Month</option>
                      <option value="per_year">Per Year</option>
                   </select>
                </div>

                {/* 3. Price Range Filter (Inputs + Slider) */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Price Range (CHF)</label>

                  {/* Manual Inputs */}
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={handleMinChange}
                        className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700"
                        placeholder="From"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">Fr.</span>
                    </div>
                    <span className="text-slate-300 font-bold">-</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={handleMaxChange}
                        className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700"
                        placeholder="To"
                      />
                      <span className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 text-xs">Fr.</span>
                    </div>
                  </div>

                  {/* Slider (Controls 'To' Price only) */}
                  <div className="relative pt-1">
                    <input
                      type="range"
                      min="0"
                      max="10000"
                      step="100"
                      value={maxPrice}
                      onChange={handleMaxChange}
                      className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                     <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                        <span>0</span>
                        <span>10'000+</span>
                     </div>
                  </div>
                </div>

              </div>
            </div>
          </div>

          {/* Results Area */}
          <div className="md:col-span-3">
             <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-950">Start your search</h3>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  Enter keywords or adjust the filters to find verified partners matching your criteria.
                </p>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}