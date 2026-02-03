import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Handshake, Loader2, Building2, Package, Calendar, Mail, Phone, ExternalLink, AlertCircle } from 'lucide-react';

// Updated Interface with Aliases
interface MatchItem {
  id: string;
  status: string;
  created_at: string;

  // Aliased as 'product_details'
  product_details?: {
    name: string;
    category: string;
    price: number;
    description: string;
    // Aliased as 'provider_details'
    provider_details?: {
      company_name: string;
      city: string;
    } | null; // Expecting single object for N:1 relation
  } | null;

  // Aliased as 'requester_details'
  requester_details?: {
    company_name: string;
    city: string;
    employee_count: number;
    contacts?: {
      first_name: string;
      last_name: string;
      email: string;
      phone_number: string;
    }[] | null;
  } | null;
}

export default function Matches() {
  const { user } = useAuth();
  const [matches, setMatches] = useState<MatchItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const role = user?.user_metadata?.role;

  useEffect(() => {
    if (user) {
      fetchMatches();
    }
  }, [user]);

  const fetchMatches = async () => {
    try {
      setLoading(true);
      setError(null);

      const { data: companyData, error: companyError } = await supabase
        .from('companies')
        .select('id')
        .eq('profile_id', user?.id)
        .single();

      if (companyError) throw companyError;
      const companyId = companyData.id;

      if (role === 'SME') {
        // --- SME View ---
        const { data, error } = await supabase
          .from('matches')
          .select(`
            id,
            status,
            created_at,
            product_details:products!matches_product_fkey (
              name,
              category,
              price,
              description,
              provider_details:companies!products_company_id_fkey (
                company_name,
                city
              )
            )
          `)
          .eq('requester_company_id', companyId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        console.log("SME Matches payload:", data); // Check console to confirm data is now present
        setMatches(data || []);

      } else if (role === 'PROVIDER') {
        // --- Provider View ---
        const { data, error } = await supabase
          .from('matches')
          .select(`
            id,
            status,
            created_at,
            requester_details:companies!matches_requester_fkey (
              company_name,
              city,
              employee_count,
              contacts:contacts!contacts_company_id_fkey (
                first_name,
                last_name,
                email,
                phone_number
              )
            ),
            product_details:products!matches_product_fkey!inner (
              name,
              category
            )
          `)
          .eq('products.company_id', companyId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMatches(data || []);
      }
    } catch (err: any) {
      console.error('Error fetching matches:', err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'accepted': return 'bg-green-100 text-green-700 border-green-200';
      case 'rejected': return 'bg-red-50 text-red-600 border-red-100';
      case 'pending': return 'bg-amber-50 text-amber-600 border-amber-100';
      default: return 'bg-slate-50 text-slate-600 border-slate-100';
    }
  };

  // Safe accessor for provider details
  const getProviderInfo = (match: MatchItem) => {
    const details = match.product_details?.provider_details;
    // Check if details is an array (edge case) or object and return name
    if (Array.isArray(details)) {
        return details[0] || null;
    }
    return details || null;
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-200">
            <Handshake size={24} />
          </div>
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Connections</span>
            <h1 className="text-3xl md:text-4xl font-black text-blue-950">
              {role === 'SME' ? 'My Product Matches' : 'Interested SMEs'}
            </h1>
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-red-50 text-red-600 rounded-xl border border-red-100 flex items-center gap-3">
            <AlertCircle size={20} />
            <span className="font-medium">{error}</span>
          </div>
        )}

        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
             <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-full flex items-center justify-center mx-auto mb-4">
               <Handshake size={32} />
             </div>
             <h3 className="text-xl font-bold text-blue-950">No matches found yet</h3>
             <p className="text-slate-500 mt-2">
               {role === 'SME'
                 ? "Start searching to find products that match your needs."
                 : "Once your products match with an SME's requirements, they will appear here."}
             </p>
          </div>
        ) : (
          <div className="space-y-4">
            {matches.map((match) => {
              const provider = getProviderInfo(match);

              return (
                <div key={match.id} className="bg-white p-6 rounded-2xl border border-slate-100 hover:border-blue-200 hover:shadow-md transition-all group">
                  <div className="flex flex-col md:flex-row justify-between md:items-center gap-6">

                    {/* --- LEFT SIDE: Main Info --- */}
                    <div className="flex items-start gap-4">
                      <div className="mt-1 w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center shrink-0">
                        {role === 'SME' ? <Package size={20} /> : <Building2 size={20} />}
                      </div>

                      <div>
                        {role === 'SME' ? (
                          // SME View
                          <>
                            <h3 className="font-bold text-blue-950 text-lg">
                              {match.product_details?.name || 'Unknown Product'}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                              <Building2 size={14} />
                              <span className="font-medium text-blue-700">
                                {provider ? provider.company_name : 'Unknown Provider'}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span>{match.product_details?.category}</span>
                              {provider?.city && (
                                <>
                                  <span className="text-slate-300">•</span>
                                  <span>{provider.city}</span>
                                </>
                              )}
                            </div>
                          </>
                        ) : (
                          // Provider View
                          <>
                            <h3 className="font-bold text-blue-950 text-lg">
                              {match.requester_details?.company_name || 'Unknown Company'}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-600">
                                Interested in: {match.product_details?.name}
                              </span>
                              {match.requester_details?.city && (
                                <>
                                  <span className="text-slate-300">•</span>
                                  <span>{match.requester_details.city}</span>
                                </>
                              )}
                            </div>
                          </>
                        )}
                      </div>
                    </div>

                    {/* --- RIGHT SIDE: Meta & Actions --- */}
                    <div className="flex flex-col md:flex-row items-start md:items-center gap-4 md:gap-8 min-w-[300px] justify-end">

                      <div className="flex flex-col gap-1 text-sm text-right">
                         <span className={`px-3 py-1 rounded-full text-xs font-bold border w-fit md:ml-auto ${getStatusColor(match.status)} uppercase`}>
                           {match.status}
                         </span>
                         <div className="flex items-center gap-1 text-slate-400 text-xs mt-1 md:justify-end">
                           <Calendar size={12} />
                           {new Date(match.created_at).toLocaleDateString('de-CH')}
                         </div>
                      </div>

                      {role === 'PROVIDER' && match.requester_details?.contacts?.[0] && (
                         <div className="flex gap-2">
                           <a href={`mailto:${match.requester_details.contacts[0].email}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Send Email">
                             <Mail size={20} />
                           </a>
                         </div>
                      )}

                      {role === 'SME' && (
                         <button className="text-blue-600 font-bold text-sm hover:underline flex items-center gap-1">
                           View Details <ExternalLink size={14} />
                         </button>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}