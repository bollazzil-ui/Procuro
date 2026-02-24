import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Building2, MapPin, AlertCircle, ChevronDown, ChevronUp } from 'lucide-react';
import { supabase } from '../lib/supabase';

// Define interface for the Search Result (Product + Provider Profile)
interface SearchResult {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  profile: {
    company_name: string;
    city: string;
  } | null;
}

export default function SMESimpleSearch() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');

  // Filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [category, setCategory] = useState('');
  const [priceModel, setPriceModel] = useState('');

  // UI State
  const [isFiltersOpen, setIsFiltersOpen] = useState(false); // Collapsible state

  // Data & UI State
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---

  const fetchProducts = async (limit?: number) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      let query = supabase
        .from('products')
        .select(`
          id,
          name,
          description,
          price,
          category,
          profile:profiles!products_profile_fkey (
            company_name,
            city
          )
        `);

      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      if (category) {
        query = query.eq('category', category);
      }

      if (minPrice > 0) {
        query = query.gte('price', minPrice);
      }
      if (maxPrice < 10000) {
        query = query.lte('price', maxPrice);
      }

      if (limit) {
        query = query.limit(limit);
      }

      const { data, error } = await query;

      if (error) throw error;

      setResults(data as any[] || []);
    } catch (err: any) {
      console.error('Search error:', err);
      setError('Failed to fetch results. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchProducts();
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="pt-36 pb-20 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-blue-950">Simple Search</h1>
          <p className="text-slate-500 mt-2">Find and connect with the perfect partners using AI-driven filters.</p>
        </div>

        {/* --- Search Bar --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-6">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={20} />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Search for services (e.g. 'ERP', 'Payroll') or description keywords..."
              className="w-full pl-12 pr-4 py-3 bg-slate-50 rounded-xl border-transparent focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
            />
          </div>
          <button
            onClick={handleSearch}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-xl transition-colors flex items-center gap-2"
          >
            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Search'}
          </button>
        </div>

        {/* --- Collapsible Filters Area --- */}
        <div className="mb-8">
          <button
            onClick={() => setIsFiltersOpen(!isFiltersOpen)}
            className="flex items-center gap-2 text-blue-900 font-bold bg-white px-5 py-3 rounded-xl border border-slate-100 hover:bg-slate-50 hover:border-blue-200 transition-all shadow-sm"
          >
            <Filter size={18} />
            <span>Advanced Filters</span>
            {isFiltersOpen ? <ChevronUp size={16} className="text-slate-400" /> : <ChevronDown size={16} className="text-slate-400" />}
          </button>

          {/* Filter Content */}
          {isFiltersOpen && (
            <div className="mt-4 bg-white p-6 rounded-2xl border border-slate-100 shadow-sm animate-fade-in">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                {/* Category Filter */}
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

                {/* Price Model Filter */}
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

                {/* Price Range Filter */}
                <div>
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider block mb-2">Price Range (CHF)</label>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={minPrice}
                        onChange={(e) => setMinPrice(Number(e.target.value))}
                        className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700"
                        placeholder="From"
                      />
                    </div>
                    <span className="text-slate-300 font-bold">-</span>
                    <div className="relative flex-1">
                      <input
                        type="number"
                        min="0"
                        value={maxPrice}
                        onChange={(e) => setMaxPrice(Number(e.target.value))}
                        className="w-full pl-3 pr-2 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-100 outline-none font-medium text-slate-700"
                        placeholder="To"
                      />
                    </div>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="10000"
                    step="100"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(Number(e.target.value))}
                    className="w-full h-1.5 bg-slate-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                  />
                  <div className="flex justify-between text-[10px] text-slate-400 font-bold mt-2">
                    <span>0</span>
                    <span>10'000+</span>
                  </div>
                </div>

              </div>

              {/* Filter Actions (Optional clear button) */}
              <div className="mt-6 pt-4 border-t border-slate-50 flex justify-end">
                <button
                  onClick={() => {
                    setCategory('');
                    setPriceModel('');
                    setMinPrice(0);
                    setMaxPrice(5000);
                  }}
                  className="text-sm text-slate-500 font-bold hover:text-blue-600 transition-colors"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          )}
        </div>

        {/* --- Results Area --- */}
        <div className="w-full">
           {error && (
             <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
               <AlertCircle size={20} />
               <span>{error}</span>
             </div>
           )}

           {!hasSearched ? (
             <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Search size={32} />
                </div>
                <h3 className="text-xl font-bold text-blue-950">Start your search</h3>
                <p className="text-slate-500 mt-2 max-w-md mx-auto">
                  Enter keywords or adjust the filters above to find verified partners.
                </p>
             </div>
           ) : loading ? (
             <div className="flex justify-center py-20">
               <Loader2 className="animate-spin text-blue-600" size={32} />
             </div>
           ) : results.length === 0 ? (
             <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                <p className="text-slate-500 mt-2">Try adjusting your price range or search terms.</p>
             </div>
           ) : (
             <div className="grid gap-4">
               <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
                 Found {results.length} result{results.length !== 1 && 's'}
               </p>
               {results.map((product) => (
                 <div key={product.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group">
                    <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md">
                            {product.category || 'Software'}
                          </span>
                          {product.profile?.city && (
                            <span className="flex items-center gap-1 text-xs text-slate-400">
                              <MapPin size={12} /> {product.profile.city}
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-bold text-blue-950 mb-1">{product.name}</h3>
                        <div className="flex items-center gap-2 text-slate-500 text-sm mb-3">
                          <Building2 size={16} />
                          <span className="font-medium">
                            {product.profile?.company_name || 'Unknown Provider'}
                          </span>
                        </div>
                        <p className="text-slate-600 text-sm mb-4 line-clamp-2 max-w-3xl">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex md:flex-col items-center md:items-end justify-between w-full md:w-auto gap-4 md:gap-1 md:min-w-[140px]">
                         <div className="text-right">
                           <div className="text-2xl font-black text-blue-950">
                             {product.price ? `CHF ${product.price}` : 'On Request'}
                           </div>
                           <div className="text-xs text-slate-400 font-medium">Starting price</div>
                         </div>

                         <div className="flex gap-2 mt-2">
                           <button className="text-sm font-bold text-slate-500 hover:text-blue-600 px-3 py-2 transition-colors">
                             Details
                           </button>
                           <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-4 py-2 rounded-lg shadow-sm transition-all whitespace-nowrap">
                             Request
                           </button>
                         </div>
                      </div>
                    </div>
                 </div>
               ))}
             </div>
           )}
        </div>
      </div>
    </div>
  );
}