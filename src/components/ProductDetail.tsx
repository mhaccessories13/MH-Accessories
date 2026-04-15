import { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { ArrowLeft, ShoppingCart, Sparkles, Check } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function ProductDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<number | null>(null);
  const [quantity, setQuantity] = useState(1);
  const [addedToCart, setAddedToCart] = useState(false);

  useEffect(() => {
    fetchProduct();
  }, [id]);

  const fetchProduct = async () => {
    try {
      if (!id) return;
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .eq('id', id)
        .maybeSingle();

      if (error) throw error;
      setProduct(data);
      fetchRelatedProducts();
    } catch (error) {
      console.error('Error fetching product:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchRelatedProducts = async () => {
    try {
      const { data, error } = await supabase
        .from('products')
        .select('*')
        .neq('id', id)
        .limit(3);

      if (error) throw error;
      setRelatedProducts(data || []);
    } catch (error) {
      console.error('Error fetching related products:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black flex items-center justify-center">
        <div className="text-center">
          <Sparkles className="w-8 h-8 animate-spin text-yellow-400 mx-auto mb-4" />
          <p className="text-gray-300">Loading product details...</p>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black flex items-center justify-center">
        <div className="text-center">
          <p className="text-gray-300 mb-6">Product not found</p>
          <button
            onClick={() => navigate('/')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black pt-24 pb-20">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Back button */}
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 mb-12 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image section */}
          <div className="animate-fadeIn">
            <div className="relative rounded-2xl overflow-hidden border border-yellow-600/20 hover:border-yellow-500/50 transition-all duration-500 shadow-2xl shadow-yellow-500/10">
              <img
                src={product.image_url}
                alt={product.name}
                className="w-full h-auto object-cover"
              />
              <div className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm shadow-xl">
                <Sparkles className="w-4 h-4" />
                <span>Premium</span>
              </div>
            </div>
          </div>

          {/* Details section */}
          <div className="animate-fadeIn" style={{ animationDelay: '100ms' }}>
            {/* Category */}
            <div className="mb-4">
              <span className="inline-block px-4 py-1.5 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-sm font-semibold uppercase tracking-widest">
                {product.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight gradient-text">
              {product.name}
            </h1>

            {/* Price */}
            <div className="mb-8 pb-8 border-b border-yellow-500/20">
              <p className="text-gray-500 text-sm mb-2 uppercase tracking-widest font-semibold">Price</p>
              <p className="text-5xl font-black gradient-text">
                {product.price.toFixed(2)}
                <span className="text-2xl text-gray-400 ml-3">DT</span>
              </p>
            </div>

            {/* Description */}
            <div className="mb-8">
              <p className="text-gray-500 text-sm mb-3 uppercase tracking-widest font-semibold">Description</p>
              <p className="text-gray-200 text-lg leading-relaxed">
                {product.description}
              </p>
            </div>

            {/* Stock status */}
            <div className="mb-10 flex items-center gap-3">
              {product.in_stock ? (
                <>
                  <div className="w-3 h-3 rounded-full bg-green-400 animate-pulse" />
                  <span className="text-green-400 font-semibold">In Stock</span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 rounded-full bg-red-400" />
                  <span className="text-red-400 font-semibold">Out of Stock</span>
                </>
              )}
            </div>

            {/* Key features */}
            <div className="mb-10">
              <p className="text-gray-500 text-sm mb-4 uppercase tracking-widest font-semibold">Why Choose This</p>
              <div className="space-y-3">
                {[
                  'Premium quality materials',
                  'Expertly crafted design',
                  'Exceptional durability',
                  '100% satisfaction guaranteed'
                ].map((feature, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <Check className="w-5 h-5 text-yellow-400 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Quantity Controls */}
            <div className="mb-8">
              <label className="block text-gray-500 text-sm mb-4 uppercase tracking-widest font-semibold">Quantity</label>
              <div className="flex items-center gap-4">
                <button
                  type="button"
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 font-bold text-lg"
                >
                  −
                </button>
                <span className="text-white font-bold text-2xl w-12 text-center">{quantity}</span>
                <button
                  type="button"
                  onClick={() => setQuantity(quantity + 1)}
                  className="w-12 h-12 bg-gray-800/50 border border-gray-700 rounded-lg text-white hover:border-yellow-500 hover:bg-yellow-500/10 transition-all duration-300 font-bold text-lg"
                >
                  +
                </button>
              </div>
            </div>

            {/* Buy buttons */}
            <div className="space-y-4">
              <button
                onClick={() => {
                  if (product) {
                    addItem(product, quantity);
                    setAddedToCart(true);
                    setTimeout(() => {
                      navigate('/cart');
                    }, 300);
                  }
                }}
                disabled={!product.in_stock}
                className="w-full relative group/btn inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <ShoppingCart className="w-5 h-5" />
                <span className="text-lg">{addedToCart ? 'Going to Cart...' : 'Add to Cart'}</span>
              </button>

              <button
                onClick={() => {
                  if (product) {
                    addItem(product, quantity);
                    navigate('/checkout');
                  }
                }}
                disabled={!product.in_stock}
                className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              >
                <span className="text-lg">Buy Now</span>
              </button>
            </div>
          </div>
        </div>

        {/* Similar products section */}
        <div className="mt-24 pt-16 border-t border-yellow-500/10">
          <h2 className="text-3xl font-bold text-white mb-12">You Might Also Like</h2>

          {relatedProducts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {relatedProducts.map((relProduct, index) => (
                <div
                  key={relProduct.id}
                  className="group animate-fadeInScale cursor-pointer"
                  style={{ animationDelay: `${index * 100}ms` }}
                  onMouseEnter={() => setHoveredId(relProduct.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={() => navigate(`/product/${relProduct.id}`)}
                >
                  <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl overflow-hidden border border-yellow-600/20 group-hover:border-yellow-500/50 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow-500/20">
                    {/* Image */}
                    <div className="relative h-64 overflow-hidden bg-black">
                      <img
                        src={relProduct.image_url}
                        alt={relProduct.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
                      {relProduct.in_stock && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/90 text-white text-xs font-bold">
                          <div className="w-2 h-2 rounded-full bg-green-200" />
                          In Stock
                        </div>
                      )}
                    </div>

                    {/* Content */}
                    <div className="p-6">
                      {/* Category */}
                      <span className="inline-block text-xs font-bold text-yellow-400 uppercase tracking-wider mb-3">
                        {relProduct.category}
                      </span>

                      {/* Name */}
                      <h3 className="text-xl font-bold text-white mb-3 line-clamp-2 group-hover:text-yellow-300 transition-colors">
                        {relProduct.name}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                        {relProduct.description}
                      </p>

                      {/* Price */}
                      <div className="mb-5 pb-5 border-t border-yellow-600/20">
                        <p className="text-2xl font-black gradient-text">
                          {relProduct.price.toFixed(2)}
                          <span className="text-sm text-gray-400 ml-2">DT</span>
                        </p>
                      </div>

                      {/* Buttons */}
                      <div className="flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            addItem(relProduct, 1);
                            navigate('/cart');
                          }}
                          className="flex-1 relative group/btn inline-flex items-center justify-center gap-2 px-4 py-2.5 rounded-full font-bold text-black text-sm bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                        >
                          <ShoppingCart className="w-4 h-4" />
                          Add
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          <button
            onClick={() => navigate('/#products')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-yellow-300 border border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300"
          >
            <span>View All Products</span>
            <ArrowLeft className="w-4 h-4 rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
}
