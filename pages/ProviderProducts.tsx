import React, { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { supabase } from '../lib/supabase';
import { Plus, Package, Loader2, X, Save, AlertCircle, Trash2, Pencil } from 'lucide-react';

// Interface matching the new public.products table structure
interface Product {
  id: string;
  created_at: string;
  profile_id: string;
  name: string;
  description: string | null;
  price: number | null;
  category: string | null;
}

const INITIAL_FORM_STATE = {
  name: '',
  description: '',
  price: '',
  category: ''
};

export default function ProviderProducts() {
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  // State for Add/Edit Mode
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  // State for Delete Mode
  const [productToDelete, setProductToDelete] = useState<Product | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  const [error, setError] = useState<string | null>(null);

  // Form State
  const [formData, setFormData] = useState(INITIAL_FORM_STATE);

  useEffect(() => {
    if (user) {
      fetchProducts();
    }
  }, [user]);

  const fetchProducts = async () => {
    if (!user) return;

    try {
      setLoading(true);
      setError(null);

      const { data, error: fetchError } = await supabase
        .from('products')
        .select('id, created_at, profile_id, name, description, price, category')
        .eq('profile_id', user.id)
        .order('created_at', { ascending: false });

      if (fetchError) throw fetchError;
      setProducts(data || []);

    } catch (err: any) {
      console.error('Error fetching products:', err);
      setError(err.message || 'Failed to load products.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError(null);
  };

  // --- Add / Edit Logic ---

  const handleEditClick = (product: Product) => {
    // Populate form with existing data
    setFormData({
      name: product.name,
      description: product.description || '',
      price: product.price ? product.price.toString() : '',
      category: product.category || ''
    });
    setEditingId(product.id);
    setIsFormOpen(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeForm = () => {
    setFormData(INITIAL_FORM_STATE);
    setEditingId(null);
    setIsFormOpen(false);
    setError(null);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // --- Validation Start ---
    // Ensure description is not empty or just whitespace
    if (!formData.description || formData.description.trim().length === 0) {
      setError('Product description is required.');
      return;
    }
    // --- Validation End ---

    setSubmitting(true);
    setError(null);

    try {
      if (editingId) {
        // --- UPDATE EXISTING PRODUCT (Invoke Edge Function) ---
        // We use the Edge Function to ensure embeddings are recalculated
        console.log(editingId);
        console.log(user.id);
        const { data, error } = await supabase.functions.invoke('update-product', {
          body: {
            id: editingId,
            profile_id: user.id,
            name: formData.name,
            description: formData.description.trim(), // Best practice: trim before sending
            price: parseFloat(formData.price),
            category: formData.category
          }
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);

      } else {
        // --- CREATE NEW PRODUCT (Invoke Edge Function) ---
        const { data, error } = await supabase.functions.invoke('create-product', {
          body: {
            profile_id: user.id,
            name: formData.name,
            description: formData.description.trim(), // Best practice: trim before sending
            price: parseFloat(formData.price),
            category: formData.category
          }
        });

        if (error) throw error;
        if (data?.error) throw new Error(data.error);
      }

      // Success for both cases
      closeForm();
      await fetchProducts();

    } catch (err: any) {
      console.error('Error:', err);
      setError(err.message || 'An error occurred while saving.');
    } finally {
      setSubmitting(false);
    }
  };

  // --- Delete Logic ---

  const handleDeleteClick = (product: Product) => {
    setProductToDelete(product);
  };

  const confirmDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);

    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', productToDelete.id);

      if (error) throw error;

      // Update UI locally
      setProducts(current => current.filter(p => p.id !== productToDelete.id));
      setProductToDelete(null);

    } catch (err: any) {
      console.error('Error deleting product:', err);
      setError('Failed to delete product. Please try again.');
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className="pt-36 pb-20 min-h-screen bg-slate-50 relative">
      <div className="max-w-7xl mx-auto px-4">

        {/* Header Section */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-8 gap-4">
          <div>
            <span className="text-blue-600 font-bold uppercase tracking-widest text-xs">Management</span>
            <h1 className="text-3xl md:text-4xl font-black text-blue-950 mt-2">
              My Products
            </h1>
            <p className="text-slate-500 mt-2">Manage the services and software your company offers to SMEs.</p>
          </div>
          {!isFormOpen && (
            <button
              onClick={() => setIsFormOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-bold shadow-md transition-all flex items-center gap-2"
            >
              <Plus size={18} /> Add Product
            </button>
          )}
        </div>

        {/* Add/Edit Product Form */}
        {isFormOpen && (
          <div className="bg-white p-8 rounded-3xl border border-blue-100 shadow-lg mb-8 animate-fade-in">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-bold text-blue-950 text-xl">
                {editingId ? 'Edit Product' : 'Add New Product'}
              </h3>
              <button onClick={closeForm} className="text-slate-400 hover:text-slate-600">
                <X size={24} />
              </button>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
                <AlertCircle size={20} />
                <span className="text-sm font-medium">{error}</span>
              </div>
            )}

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
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Price (CHF) *</label>
                  <input
                    name="price"
                    type="number"
                    step="0.01"
                    required
                    value={formData.price}
                    onChange={handleInputChange}
                    placeholder="e.g. 1200.00"
                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 outline-none"
                  />
                </div>
                <div className="md:col-span-2 space-y-1">
                  <label className="text-xs font-bold text-slate-400 uppercase tracking-wider ml-1">Description *</label>
                  <textarea
                    name="description"
                    required // HTML5 Validation
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
                  onClick={closeForm}
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
                  {editingId ? 'Update Product' : 'Save Product'}
                </button>
              </div>
            </form>
          </div>
        )}

        {/* Global Error (Delete or Fetch) */}
        {error && !isFormOpen && (
          <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-2 border border-red-100">
             <AlertCircle size={20} />
             <span className="text-sm font-medium">{error}</span>
          </div>
        )}

        {/* Products List */}
        {loading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="animate-spin text-blue-600" size={32} />
          </div>
        ) : products.length === 0 && !isFormOpen ? (
          <div className="bg-white p-12 rounded-3xl border border-slate-100 text-center shadow-sm">
            <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
              <Package size={32} />
            </div>
            <h3 className="text-xl font-bold text-blue-950">No products yet</h3>
            <p className="text-slate-500 mt-2 mb-6 max-w-md mx-auto">
              Start adding your software or services to get matched with potential SME clients.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
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
                  <span className="font-bold text-blue-900">CHF {product.price}</span>

                  {/* Action Buttons */}
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleEditClick(product)}
                      className="text-slate-400 hover:text-blue-600 text-sm font-medium px-2 py-1 rounded-lg hover:bg-blue-50 transition-colors flex items-center gap-1"
                    >
                      <Pencil size={16} /> Edit
                    </button>
                    <button
                      onClick={() => handleDeleteClick(product)}
                      className="text-slate-400 hover:text-red-500 p-2 rounded-lg hover:bg-red-50 transition-colors"
                      title="Delete Product"
                    >
                      <Trash2 size={18} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Delete Confirmation Modal Overlay */}
      {productToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4 animate-fade-in">
          <div className="bg-white rounded-3xl shadow-2xl max-w-md w-full p-8 border border-slate-100">
            <div className="text-center mb-6">
              <div className="w-16 h-16 bg-red-50 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <Trash2 size={32} />
              </div>
              <h3 className="text-2xl font-bold text-slate-900">Delete Product?</h3>
              <p className="text-slate-500 mt-2">
                Are you sure you want to delete <span className="font-bold text-slate-900">{productToDelete.name}</span>?
                This action cannot be undone.
              </p>
            </div>

            <div className="flex gap-3">
              <button
                onClick={() => setProductToDelete(null)}
                className="flex-1 py-3 text-slate-600 font-bold hover:bg-slate-50 rounded-xl transition-colors border border-slate-200"
              >
                Cancel
              </button>
              <button
                onClick={confirmDelete}
                disabled={isDeleting}
                className="flex-1 py-3 bg-red-600 hover:bg-red-700 text-white font-bold rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2"
              >
                {isDeleting ? <Loader2 className="animate-spin" size={20} /> : 'Delete'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}