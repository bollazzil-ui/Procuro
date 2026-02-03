import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Package, Search, Loader2, X, Save } from 'lucide-react';

interface Product {
  id: string;
  name: string;
  description: string;
  price: string;
  category: string;
}

export default function ProviderProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Form State
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    category: ''
  });

  useEffect(() => {
    fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      if (!user) return;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      if (!user) return;

      const { error } = await supabase.from('products').insert({
        profile_id: user.id,
        name: formData.name,
        description: formData.description,
        price: formData.price,
        category: formData.category
      });

      if (error) throw error;

      // Reset and refresh
      setFormData({ name: '', description: '',SW: '', category: '', price: '' });
      setIsAdding(false);
      fetchProducts();
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Failed to add product');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-24 pb-20 min-h-screen bg-slate-50">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Management</span>
            <h1 className="text-3xl md:text-4xl font-black text-blue-950 mt-2">
              My Products
            </h1>
            <p className="text-slate-500 mt-2">Manage the services and software you offer to SMEs.</p>
          </div>
          {!isAdding && (
            <button
              onClick={() => setIsAdding(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        {/* Add Product Form */}
        {isAdding && (
          <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-lg mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-bold text-blue-950 text-xl">Add New Product</h3>
              <button onClick={() => setIsAdding(false)} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Product Name *</label>
                  <input
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="e.g. Cloud ERP Basic"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Category *</label>
                  <select
                    name="category"
                    required
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  >
                    <option value="">Select Category</option>
                    <option value="ERP">ERP Systems</option>
                    <option value="CRM">CRM & Sales</option>
                    <option value="Cybersecurity">Cybersecurity</option>
                    <option value="Finance">Accounting & Finance</option>
                    <option value="HR">HR & Payroll</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Pricing (CHF) *</label>
                  <input
                    name="price"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 150 / month"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description</label>
                  <textarea
                    name="description"
                    rows={3}
                    value={formData.description}
                    onChange={handleInputChange}
                    placeholder="Briefly describe the key features..."
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none resize-none"
                  />
                </div>
              </div>
              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setIsAdding(false)}
                  className="px-6 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2 disabled:opacity-50"
                >
                  {submitting ? <Loader2 className="animate-spin" /> : <Save size={18} />}
                  Save Product
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : products.length === 0 && !isAdding ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-blue-950">No products yet</h3>
            <p className="text-slate-500 mt-2 mb-6 max-w-md mx-auto">
              Start adding your software or services to get matched with potential SME clients.
            </p>
            <button
              onClick={() => setIsAdding(true)}
              className="text-blue-600 font-bold hover:underline"
            >
              Add your first product
            </button>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {products.map((product) => (
              <div key={product.id} className="bg-white p-6 rounded-2xl border border-slate-100 shadow-sm hover:border-blue-200 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-lg flex items-center justify-center">
                    <Package size={20} />
                  </div>
                  <span className="text-xs font-bold text-slate-400 uppercase bg-slate-50 px-2 py-1 rounded-md">
                    {product.category}
                  </span>
                </div>
                <h3 className="font-bold text-blue-950 text-lg mb-2">{product.name}</h3>
                <p className="text-slate-500 text-sm mb-4 line-clamp-2 min-h-[40px]">
                  {product.description || 'No description provided.'}
                </p>
                <div className="pt-4 border-t border-slate-50 flex items-center justify-between">
                  <span className="font-bold text-blue-900">{product.price}</span>
                  <button className="text-slate-400 hover:text-blue-600 text-sm font-medium">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}