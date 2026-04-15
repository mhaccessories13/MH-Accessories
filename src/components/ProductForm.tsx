import { useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import { X, AlertCircle } from 'lucide-react';

interface ProductFormProps {
  product?: Product;
  onSuccess: () => void;
  onCancel: () => void;
}

export default function ProductForm({ product, onSuccess, onCancel }: ProductFormProps) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [formData, setFormData] = useState({
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    image_url: product?.image_url || '',
    category: product?.category || 'accessories',
    in_stock: product?.in_stock !== false,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setFormData(prev => ({ ...prev, [name]: checked }));
    } else if (type === 'number') {
      setFormData(prev => ({
        ...prev,
        [name]: name === 'price' ? parseFloat(value) : parseInt(value)
      }));
    } else {
      setFormData(prev => ({ ...prev, [name]: value }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) {
        setError('You must be logged in');
        return;
      }

      if (product?.id) {
        const { error: updateError } = await supabase
          .from('products')
          .update(formData)
          .eq('id', product.id);

        if (updateError) throw updateError;
      } else {
        const { error: insertError } = await supabase
          .from('products')
          .insert([{ ...formData, user_id: user.id }]);

        if (insertError) throw insertError;
      }

      onSuccess();
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fadeInScale">
      <div className="bg-gradient-to-br from-gray-900/80 to-black/80 rounded-2xl max-w-2xl w-full border border-yellow-600/30 shadow-2xl shadow-yellow-500/10 overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-8 border-b border-yellow-600/20 bg-gradient-to-r from-yellow-500/5 to-transparent">
          <h2 className="text-3xl font-black text-white">
            {product ? 'Edit Product' : 'Add New Product'}
          </h2>
          <button
            onClick={onCancel}
            className="w-10 h-10 rounded-lg bg-red-500/10 border border-red-500/30 text-red-400 hover:text-red-300 hover:border-red-500/50 transition-all duration-300 flex items-center justify-center hover:scale-110"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-8 space-y-6">
          {/* Error Alert */}
          {error && (
            <div className="flex items-start gap-4 p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-200 animate-slideDown">
              <AlertCircle className="w-5 h-5 flex-shrink-0 mt-0.5" />
              <span className="text-sm">{error}</span>
            </div>
          )}

          {/* Product Name */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
              Product Name *
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              placeholder="e.g., Premium Watch Band"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
              Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              rows={4}
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none"
              placeholder="Describe your product with detail and elegance"
            />
          </div>

          {/* Price and Category */}
          <div className="grid grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Price (DT) *
              </label>
              <input
                type="number"
                name="price"
                value={formData.price}
                onChange={handleChange}
                step="0.01"
                min="0"
                required
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                placeholder="0.00"
              />
            </div>

            <div>
              <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              >
                <option value="accessories">Accessories</option>
                <option value="premium">Premium</option>
                <option value="limited">Limited Edition</option>
                <option value="exclusive">Exclusive</option>
              </select>
            </div>
          </div>

          {/* Image URL */}
          <div>
            <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">
              Image URL *
            </label>
            <input
              type="url"
              name="image_url"
              value={formData.image_url}
              onChange={handleChange}
              required
              className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {/* In Stock */}
          <div className="flex items-center p-4 rounded-xl bg-yellow-500/10 border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300">
            <input
              type="checkbox"
              name="in_stock"
              checked={formData.in_stock}
              onChange={handleChange}
              id="in_stock"
              className="w-5 h-5 bg-gray-800 border border-yellow-500 rounded text-yellow-500 focus:outline-none cursor-pointer accent-yellow-500"
            />
            <label htmlFor="in_stock" className="ml-3 text-sm font-bold text-gray-300 cursor-pointer">
              Product is available in stock
            </label>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 pt-4">
            <button
              type="button"
              onClick={onCancel}
              className="flex-1 px-6 py-3 bg-gray-800/50 hover:bg-gray-700/50 text-gray-300 rounded-xl font-bold transition-all duration-300 border border-gray-700 hover:border-gray-600"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-black rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 disabled:opacity-50 disabled:cursor-not-allowed hover:scale-105 hover:-translate-y-0.5"
            >
              {loading ? 'Saving...' : product ? 'Update Product' : 'Create Product'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
