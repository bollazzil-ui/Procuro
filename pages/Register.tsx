import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Mail, Lock, ChevronRight, Building2, Briefcase, CheckCircle, User, MapPin, Phone } from 'lucide-react';
import { supabase } from '../lib/supabase';

export default function RegisterPage() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<'SME' | 'PROVIDER'>('SME');
  const [error, setError] = useState<string | null>(null);
  const [successMode, setSuccessMode] = useState(false);

  // Consolidated form state
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    salutation: 'Mr.',
    firstName: '',
    lastName: '',
    jobFunction: '',
    phone: '',
    companyName: '',
    legalForm: '',
    address: '',
    postalCode: '',
    city: '',
    country: 'Switzerland',
    employeeCount: '',
    workstationCount: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // 1. Sign up user & pass the 'role' as metadata
      const { data, error: authError } = await supabase.auth.signUp({
        email: formData.email,
        password: formData.password,
        options: {
          data: {
            role: role,
            first_name: formData.firstName,
            last_name: formData.lastName,
            company_name: formData.companyName
          }
        }
      });

      if (authError) throw authError;

      // 2. If we have a session (user is logged in), insert the extended data
      if (data.session && data.user) {
        const userId = data.user.id;

        // A. Insert Base Profile (Replaces 'companies')
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: userId, // CRITICAL: This links the profile 1:1 with auth.users
            role: role,
            company_name: formData.companyName,
            legal_form: formData.legalForm,
            address: formData.address,
            postal_code: formData.postalCode,
            city: formData.city,
            country: formData.country
          });

        if (profileError) throw profileError;

        // B. Insert SME Specific Data (Only if role is SME)
        if (role === 'SME') {
           const { error: smeError } = await supabase
            .from('profile_smes')
            .insert({
              profile_id: userId,
              employee_count: parseInt(formData.employeeCount) || 0,
              workstation_count: parseInt(formData.workstationCount) || 0
            });

            if (smeError) throw smeError;
        }

        // C. Insert Contact (Now links via profile_id)
        const { error: contactError } = await supabase
          .from('contacts')
          .insert({
            profile_id: userId, // Updated from company_id
            email: formData.email,
            salutation: formData.salutation,
            first_name: formData.firstName,
            last_name: formData.lastName,
            job_function: formData.jobFunction,
            phone_number: formData.phone,
            is_primary_contact: true
          });

        if (contactError) throw contactError;

        navigate(role === 'SME' ? '/sme-dashboard' : '/provider-dashboard');

      } else if (data.user) {
        setSuccessMode(true);
      }

    } catch (err: any) {
      console.error(err);
      setError(err.message || 'An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  if (successMode) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center pt-36 pb-20 px-4 bg-slate-50">
        <div className="max-w-md w-full bg-white rounded-[2.5rem] shadow-xl p-10 border border-slate-100 text-center">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle size={32} />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Check your inbox</h2>
          <p className="text-slate-500 mb-6">
            We've sent a confirmation link to <strong>{formData.email}</strong>. <br/>
            Please click the link to activate your {role} account.
          </p>
          <Link to="/login" className="text-blue-600 font-bold hover:underline">
            Back to Login
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center pt-36 pb-20 px-4 bg-slate-50">
      <div className="max-w-2xl w-full bg-white rounded-[2.5rem] shadow-2xl p-8 md:p-10 border border-slate-100">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-slate-900">Create Account</h2>
          <p className="text-slate-500 text-sm mt-2">Join the Swiss B2B portal</p>
        </div>

        {error && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 text-sm rounded-xl border border-red-100">
            {error}
          </div>
        )}

        <form onSubmit={handleRegister} className="space-y-8">
          {/* Section 0: Role Selection */}
          <div className="grid grid-cols-2 gap-4">
            <button
              type="button"
              onClick={() => setRole('SME')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'SME' ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600 ring-offset-2' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Building2 size={24} />
              <span className="text-xs font-bold">I am an SME</span>
            </button>
            <button
              type="button"
              onClick={() => setRole('PROVIDER')}
              className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                role === 'PROVIDER' ? 'bg-blue-50 border-blue-600 text-blue-900 ring-2 ring-blue-600 ring-offset-2' : 'bg-white border-slate-200 text-slate-500 hover:bg-slate-50'
              }`}
            >
              <Briefcase size={24} />
              <span className="text-xs font-bold">I am a Provider</span>
            </button>
          </div>

          <div className="grid md:grid-cols-2 gap-6">

            {/* Section 1: Login Credentials */}
            <div className="md:col-span-2 space-y-4">
              <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-2">Login Credentials</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Email *</label>
                  <div className="relative">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="name@company.ch"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Password *</label>
                  <div className="relative">
                    <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                    <input
                      name="password"
                      type="password"
                      required
                      minLength={6}
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="••••••••"
                      className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Section 2: Contact Person */}
            <div className="md:col-span-2 space-y-4">
               <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-2">Contact Person</h3>
               <div className="grid grid-cols-6 gap-4">
                  <div className="col-span-2 md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1 whitespace-nowrap">Salutation *</label>
                    <select
                      name="salutation"
                      value={formData.salutation}
                      onChange={handleChange}
                      required
                      className="w-full px-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    >
                      <option value="Mr.">Mr.</option>
                      <option value="Ms.">Ms.</option>
                      <option value="Mrs.">Mrs.</option>
                      <option value="Dr.">Dr.</option>
                    </select>
                  </div>
                  <div className="col-span-4 md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">First Name *</label>
                    <input
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Last Name *</label>
                    <input
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-6 md:col-span-3 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Job Function *</label>
                    <div className="relative">
                      <User className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="jobFunction"
                        required
                        value={formData.jobFunction}
                        onChange={handleChange}
                        placeholder="e.g. CTO"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-6 md:col-span-3 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Phone *</label>
                    <div className="relative">
                      <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="phone"
                        required
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="+41 79 123 45 67"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
               </div>
            </div>

            {/* Section 3: Company Details */}
            <div className="md:col-span-2 space-y-4">
               <h3 className="text-sm font-bold text-blue-950 uppercase tracking-wider border-b border-slate-100 pb-2">Company Details</h3>
               <div className="grid grid-cols-2 gap-4">
                  <div className="col-span-2 md:col-span-1 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Company Name *</label>
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="companyName"
                        required
                        value={formData.companyName}
                        onChange={handleChange}
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>
                  <div className="col-span-2 md:col-span-1 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Legal Form *</label>
                    <input
                      name="legalForm"
                      required
                      value={formData.legalForm}
                      onChange={handleChange}
                      placeholder="AG, GmbH..."
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  <div className="col-span-2 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                      <input
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        placeholder="Street & Number"
                        className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                      />
                    </div>
                  </div>

                  <div className="col-span-1 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Postal Code *</label>
                    <input
                      name="postalCode"
                      required
                      value={formData.postalCode}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>
                  <div className="col-span-1 space-y-1">
                    <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">City *</label>
                    <input
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                    />
                  </div>

                  {/* Only show these for SMEs as per schema logic */}
                  {role === 'SME' && (
                    <>
                      <div className="col-span-1 space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Employees *</label>
                        <input
                          name="employeeCount"
                          type="number"
                          required
                          min="1"
                          value={formData.employeeCount}
                          onChange={handleChange}
                          placeholder="Count"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                      <div className="col-span-1 space-y-1">
                        <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Workstations *</label>
                        <input
                          name="workstationCount"
                          type="number"
                          required
                          min="1"
                          value={formData.workstationCount}
                          onChange={handleChange}
                          placeholder="Count"
                          className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                        />
                      </div>
                    </>
                  )}
               </div>
            </div>

          </div>

          <button disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-bold shadow-lg transition-all flex items-center justify-center gap-2 disabled:opacity-50 mt-8">
            {loading ? 'Creating Account...' : 'Register Business'} <ChevronRight size={18} />
          </button>
        </form>

        <div className="mt-8 pt-8 border-t border-slate-100 text-center">
          <p className="text-sm text-slate-500">
            Already have an account? <Link to="/login" className="text-blue-600 font-bold hover:underline">Sign In</Link>
          </p>
        </div>
      </div>
    </div>
  );
}