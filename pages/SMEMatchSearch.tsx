import React, { useState, useEffect } from 'react';
import { Search, Filter, Loader2, Building2, MapPin, AlertCircle } from 'lucide-react';
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

export default function SMEMatchSearch() {
  // --- State ---
  const [searchTerm, setSearchTerm] = useState('');

  // Filters
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(5000);
  const [category, setCategory] = useState('');
  const [priceModel, setPriceModel] = useState(''); // Note: Schema doesn't have this column yet, keeping UI for now

  // Data & UI State
  const [results, setResults] = useState<SearchResult[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false); // To toggle between "Start search" placeholder and results
  const [error, setError] = useState<string | null>(null);

  // --- Handlers ---

  // Refactored: Fetch logic separated to support initial load with limit
  const fetchProducts = async (limit?: number) => {
    setLoading(true);
    setError(null);
    setHasSearched(true);

    try {
      // 1. Start the query
      // We join 'profiles' using the foreign key constraint name logic or explicit relation
      // In your schema: products.profile_id -> profiles.id
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

      // 2. Apply Text Search (Name OR Description)
      if (searchTerm.trim()) {
        query = query.or(`name.ilike.%${searchTerm}%,description.ilike.%${searchTerm}%`);
      }

      // 3. Apply Category Filter
      if (category) {
        query = query.eq('category', category);
      }

      // 4. Apply Price Filters
      // Only apply if they differ from defaults or are specifically set
      if (minPrice > 0) {
        query = query.gte('price', minPrice);
      }
      if (maxPrice < 10000) { // Assuming 10k is the slider max
        query = query.lte('price', maxPrice);
      }

      // 5. Apply Limit if provided (used for initial default view)
      if (limit) {
        query = query.limit(limit);
      }

      // 6. Execute
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

  // Initial Load: Fetch first 10 products by default
  useEffect(() => {
    fetchProducts(10);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = () => {
    fetchProducts(); // Manual search fetches all matching results
  };

  // Allow triggering search with "Enter" key
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="pt-24 pb-20 px-8 animate-fade-in min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-blue-950">Match Search</h1>
          <p className="text-slate-500 mt-2">Find and connect with the perfect partners using AI-driven filters.</p>
        </div>

        {/* --- Search Bar --- */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-100 flex gap-4 mb-8">
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

        {/* --- Main Content Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {/* --- Sidebar Filters --- */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-slate-100 sticky top-24">
              <h3 className="font-bold text-blue-950 mb-6 flex items-center gap-2">
                <Filter size={16} /> Filters
              </h3>

              <div className="space-y-6">
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

                {/* Price Model Filter (UI Only for now as per schema) */}
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
                  {/* Slider controls Max Price */}
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
            </div>
          </div>

          {/* --- Results Area --- */}
          <div className="md:col-span-3">
             {error && (
               <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
                 <AlertCircle size={20} />
                 <span>{error}</span>
               </div>
             )}

             {!hasSearched ? (
               // State 1: Before Search (Placeholder) - Should rarely be seen now due to useEffect
               <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Search size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-blue-950">Start your search</h3>
                  <p className="text-slate-500 mt-2 max-w-md mx-auto">
                    Enter keywords or adjust the filters to find verified partners matching your criteria.
                  </p>
               </div>
             ) : loading ? (
               // State 2: Loading
               <div className="flex justify-center py-20">
                 <Loader2 className="animate-spin text-blue-600" size={32} />
               </div>
             ) : results.length === 0 ? (
               // State 3: No Results
               <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
                  <h3 className="text-xl font-bold text-slate-900">No matches found</h3>
                  <p className="text-slate-500 mt-2">Try adjusting your price range or search terms.</p>
               </div>
             ) : (
               // State 4: Display Results
               <div className="grid gap-4">
                 <p className="text-sm font-bold text-slate-400 mb-2 uppercase tracking-wider">
                   Found {results.length} result{results.length !== 1 && 's'}
                 </p>
                 {results.map((product) => (
                   <div key={product.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-md transition-all group">
                      <div className="flex justify-between items-start">
                        <div>
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
                          <p className="text-slate-600 text-sm mb-4 line-clamp-2 max-w-2xl">
                            {product.description}
                          </p>
                        </div>
                        <div className="text-right min-w-[120px]">
                           <div className="text-2xl font-black text-blue-950">
                             {product.price ? `CHF ${product.price}` : 'On Request'}
                           </div>
                           <div className="text-xs text-slate-400 font-medium">Starting price</div>
                        </div>
                      </div>

                      {/* Action Bar */}
                      <div className="pt-4 mt-2 border-t border-slate-50 flex justify-end gap-3">
                         <button className="text-sm font-bold text-slate-500 hover:text-blue-600 px-4 py-2 transition-colors">
                           View Details
                         </button>
                         <button className="bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold px-6 py-2 rounded-lg shadow-sm transition-all">
                           Request Match
                         </button>
                      </div>
                   </div>
                 ))}
               </div>
             )}
          </div>
        </div>
      </div>
    </div>
  );
}