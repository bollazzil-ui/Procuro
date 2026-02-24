import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Handshake, Loader2, Building2, Package, Calendar, Mail, Phone, ExternalLink, AlertCircle } from 'lucide-react';

// Updated Interface based on the new schema
interface MatchItem {
  id: string;
  status: string;
  created_at: string;

  // For SME View: The product they matched with
  product?: {
    name: string;
    category: string;
    price: number;
    description: string;
    // The provider of that product
    provider?: {
      company_name: string;
      city: string;
    } | null;
  } | null;

  // For Provider View: The SME who requested the match
  requester?: {
    company_name: string;
    city: string;
    // SME specific details from profile_smes table
    sme_info?: {
      employee_count: number;
    } | null;
    // Contact details from contacts table
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

      // We no longer need to fetch a separate 'company_id'.
      // The user.id IS the profile_id in the new schema.
      const userProfileId = user?.id;
      if (!userProfileId) return;

      if (role === 'SME') {
        // --- SME View ---
        // "Show me matches where I am the requester"
        const { data, error } = await supabase
          .from('matches')
          .select(`
            id,
            status,
            created_at,
            product:products!matches_product_fkey (
              name,
              category,
              price,
              description,
              provider:profiles!products_profile_fkey (
                company_name,
                city
              )
            )
          `)
          .eq('requester_profile_id', userProfileId)
          .order('created_at', { ascending: false });

        if (error) throw error;
        setMatches(data || []);

      } else if (role === 'PROVIDER') {
        // --- Provider View ---
        // FIXED: The Foreign Key hint must match the DB constraint "matches_requester_fkey"
        const { data, error } = await supabase
          .from('matches')
          .select(`
            id,
            status,
            created_at,
            product:products!matches_product_fkey!inner (
              name,
              category,
              profile_id
            ),
            requester:profiles!matches_requester_fkey (
              company_name,
              city,
              sme_info:profile_smes (
                employee_count
              ),
              contacts (
                first_name,
                last_name,
                email,
                phone_number
              )
            )
          `)
          .eq('product.profile_id', userProfileId)
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

  // Helper to safely get employee count (handles array or object return from Supabase)
  const getEmployeeCount = (requester: MatchItem['requester']) => {
    if (!requester?.sme_info) return 0;
    // If Supabase returns an array for 1:1 relation
    if (Array.isArray(requester.sme_info)) {
        return requester.sme_info[0]?.employee_count || 0;
    }
    // If Supabase returns a single object
    return requester.sme_info.employee_count || 0;
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-slate-50">
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
              const provider = match.product?.provider;
              const requester = match.requester;
              const contact = requester?.contacts?.[0]; // Get primary contact

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
                              {match.product?.name || 'Unknown Product'}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                              <Building2 size={14} />
                              <span className="font-medium text-blue-700">
                                {provider ? provider.company_name : 'Unknown Provider'}
                              </span>
                              <span className="text-slate-300">•</span>
                              <span>{match.product?.category}</span>
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
                              {requester?.company_name || 'Unknown Company'}
                            </h3>
                            <div className="flex items-center gap-2 text-sm text-slate-500 mt-1">
                              <span className="bg-slate-100 px-2 py-0.5 rounded text-xs font-semibold text-slate-600">
                                Interested in: {match.product?.name}
                              </span>
                              {requester?.city && (
                                <>
                                  <span className="text-slate-300">•</span>
                                  <span>{requester.city}</span>
                                </>
                              )}
                              {getEmployeeCount(requester) > 0 && (
                                <>
                                   <span className="text-slate-300">•</span>
                                   <span>{getEmployeeCount(requester)} Employees</span>
                                </>
                              )}
                            </div>
                            {contact && (
                              <div className="text-xs text-slate-400 mt-1">
                                Contact: {contact.first_name} {contact.last_name}
                              </div>
                            )}
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

                      {role === 'PROVIDER' && contact && (
                         <div className="flex gap-2">
                           <a href={`mailto:${contact.email}`} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors" title="Send Email">
                             <Mail size={20} />
                           </a>
                           {contact.phone_number && (
                              <a href={`tel:${contact.phone_number}`} className="p-2 text-slate-400 hover:text-green-600 hover:bg-green-50 rounded-lg transition-colors" title="Call">
                                <Phone size={20} />
                              </a>
                           )}
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