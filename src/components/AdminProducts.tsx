import { useEffect, useState } from 'react';
import { supabase, Product } from '../lib/supabase';
import ProductForm from './ProductForm';
import { Plus, CreditCard as Edit2, Trash2, LogOut } from 'lucide-react';

export default function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState<any>(null);
  const [showForm, setShowForm] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | undefined>();
  const [deleting, setDeleting] = useState<string | null>(null);

  useEffect(() => {
    checkAuth();
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
      if (session?.user) {
        fetchProducts();
      } else {
        setProducts([]);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuth = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user || null);
    if (user) {
      fetchProducts();
    } else {
      setLoading(false);
    }
  };

  const fetchProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;

    setDeleting(id);
    try {
      const { error } = await supabase
        .from('products')
        .delete()
        .eq('id', id);

      if (error) throw error;
      setProducts(products.filter(p => p.id !== id));
    } catch (error) {
      console.error('Error deleting product:', error);
      alert('Failed to delete product');
    } finally {
      setDeleting(null);
    }
  };

  const handleFormSuccess = async () => {
    setShowForm(false);
    setEditingProduct(undefined);
    await fetchProducts();
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setProducts([]);
  };

  const toggleStock = async (id: string, currentStatus: boolean) => {
    try {
      const { error } = await supabase
        .from('products')
        .update({ in_stock: !currentStatus })
        .eq('id', id);

      if (error) throw error;
      setProducts(products.map(p =>
        p.id === id ? { ...p, in_stock: !currentStatus } : p
      ));
    } catch (error) {
      console.error('Error updating stock status:', error);
      alert('Failed to update stock status');
    }
  };

  if (!user) {
    return (
      <section id="admin" className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-md mx-auto bg-gray-900 rounded-lg p-8 border border-yellow-600/30">
            <h2 className="text-2xl font-bold text-white mb-4 text-center">Admin Login Required</h2>
            <p className="text-gray-400 text-center">Please log in to manage products.</p>
          </div>
        </div>
      </section>
    );
  }

  if (loading) {
    return (
      <section id="admin" className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
        <div className="container mx-auto px-4">
          <div className="text-center text-yellow-500">Loading...</div>
        </div>
      </section>
    );
  }

  return (
    <section id="admin" className="bg-gradient-to-b from-black via-gray-900 to-black py-20">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-4xl font-bold text-white mb-2">Product Management</h2>
            <p className="text-gray-400">Logged in as {user?.email}</p>
          </div>
          <div className="flex gap-4">
            <button
              onClick={() => setShowForm(true)}
              className="flex items-center gap-2 bg-gradient-to-r from-yellow-500 to-yellow-600 text-black px-6 py-3 rounded-lg font-semibold hover:from-yellow-400 hover:to-yellow-500 transition shadow-lg"
            >
              <Plus className="w-5 h-5" />
              Add Product
            </button>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-semibold transition"
            >
              <LogOut className="w-5 h-5" />
              Logout
            </button>
          </div>
        </div>

        <div className="overflow-x-auto border border-yellow-600/20 rounded-lg">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-900/50 border-b border-yellow-600/20">
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Name</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Category</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Price</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Stock</th>
                <th className="px-6 py-4 text-left text-sm font-semibold text-gray-300">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-gray-800 hover:bg-gray-900/30 transition">
                  <td className="px-6 py-4 text-white">{product.name}</td>
                  <td className="px-6 py-4">
                    <span className="inline-block px-3 py-1 bg-yellow-500/20 text-yellow-400 text-sm rounded-full">
                      {product.category}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-yellow-500 font-semibold">{product.price.toFixed(2)} DT</td>
                  <td className="px-6 py-4">
                    <button
                      onClick={() => toggleStock(product.id, product.in_stock)}
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium cursor-pointer transition ${
                        product.in_stock
                          ? 'bg-green-500/20 text-green-400 hover:bg-green-500/30'
                          : 'bg-red-500/20 text-red-400 hover:bg-red-500/30'
                      }`}>
                      {product.in_stock ? 'In Stock' : 'Out of Stock'}
                    </button>
                  </td>
                  <td className="px-6 py-4 flex gap-2">
                    <button
                      onClick={() => {
                        setEditingProduct(product);
                        setShowForm(true);
                      }}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-blue-600 hover:bg-blue-700 text-white rounded text-sm transition"
                    >
                      <Edit2 className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      disabled={deleting === product.id}
                      className="inline-flex items-center gap-1 px-3 py-1 bg-red-600 hover:bg-red-700 text-white rounded text-sm transition disabled:opacity-50"
                    >
                      <Trash2 className="w-4 h-4" />
                      {deleting === product.id ? 'Deleting...' : 'Delete'}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {products.length === 0 && (
          <div className="text-center py-12 text-gray-400">
            No products yet. Create your first product!
          </div>
        )}

        {showForm && (
          <ProductForm
            product={editingProduct}
            onSuccess={handleFormSuccess}
            onCancel={() => {
              setShowForm(false);
              setEditingProduct(undefined);
            }}
          />
        )}
      </div>
    </section>
  );
}
