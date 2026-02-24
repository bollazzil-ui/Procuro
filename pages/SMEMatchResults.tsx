import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { ArrowLeft, Loader2, Building2, MapPin, CheckCircle2, Sparkles, AlertCircle } from 'lucide-react';

interface RecommendedProduct {
  product_id: string;
  product_name: string;
  product_description: string;
  product_category: string;
  product_price: number;
  provider_name: string;
  provider_city: string;
  similarity: number;
}

export default function SMEMatchResults() {
  const { id } = useParams(); // Session ID
  const [results, setResults] = useState<RecommendedProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (id) fetchRecommendations();
  }, [id]);

  const fetchRecommendations = async () => {
    try {
      setLoading(true);

      // Call the Database Function (RPC)
      const { data, error } = await supabase.rpc('match_products_for_session', {
        query_session_id: id,
        match_threshold: 0.5, // Adjust similarity threshold (0.0 to 1.0)
        match_count: 5
      });

      if (error) throw error;
      setResults(data || []);

    } catch (err: any) {
      console.error('Error fetching recommendations:', err);
      setError('Could not load AI recommendations. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-36 pb-20 px-4 min-h-screen bg-slate-50 animate-fade-in">
      <div className="max-w-7xl mx-auto">
        <Link to="/match-engine" className="flex items-center gap-2 text-slate-500 hover:text-blue-600 mb-8 font-medium transition-colors">
          <ArrowLeft size={18} /> Back to Sessions
        </Link>

        <div className="flex items-end gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg shadow-blue-200">
            <Sparkles className="text-white" size={24} />
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">AI Analysis</span>
            <h1 className="text-3xl font-black text-blue-950">Top Recommendations</h1>
          </div>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-2">
            <AlertCircle size={20} /> {error}
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : results.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center">
            <h3 className="text-xl font-bold text-slate-900">No high-confidence matches found</h3>
            <p className="text-slate-500 mt-2">Try updating your session description with more specific details.</p>
          </div>
        ) : (
          <div className="grid gap-6">
            {results.map((product) => (
              <div key={product.product_id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-300 hover:shadow-lg transition-all group relative overflow-hidden">

                {/* Match Score Badge */}
                <div className="absolute top-6 right-6 flex flex-col items-end">
                   <div className="flex items-center gap-1 text-green-600 font-black text-lg bg-green-50 px-3 py-1 rounded-lg">
                     <CheckCircle2 size={18} />
                     {(product.similarity * 100).toFixed(0)}% Match
                   </div>
                </div>

                <div className="flex flex-col md:flex-row gap-6 pr-32">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                       <span className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-md uppercase tracking-wider">
                         {product.product_category || 'Software'}
                       </span>
                    </div>

                    <h3 className="text-2xl font-bold text-blue-950 mb-2">{product.product_name}</h3>

                    <div className="flex items-center gap-2 text-slate-500 text-sm mb-4">
                      <Building2 size={16} />
                      <span className="font-semibold text-blue-900">{product.provider_name}</span>
                      {product.provider_city && (
                        <>
                          <span className="text-slate-300">•</span>
                          <MapPin size={14} />
                          <span>{product.provider_city}</span>
                        </>
                      )}
                    </div>

                    <p className="text-slate-600 leading-relaxed mb-6 max-w-3xl">
                      {product.product_description}
                    </p>

                    <div className="flex items-center gap-4 border-t border-slate-50 pt-4">
                       <div className="font-bold text-blue-950 text-lg">
                         CHF {product.product_price}
                       </div>
                       <button className="ml-auto bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-xl font-bold transition-all shadow-md">
                         View Details
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
  );
}