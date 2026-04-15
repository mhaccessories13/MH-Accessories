import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Product } from '../lib/supabase';
import { ShoppingCart, Sparkles } from 'lucide-react';
import { useCart } from '../context/CartContext';

const PRODUCT_CATEGORIES = [
  { id: 'all', label: 'All Products', icon: '✨' },
  { id: 'Rings', label: 'Rings', icon: '💍' },
  { id: 'Earrings', label: 'Earrings', icon: '💎' },
  { id: 'Bracelets', label: 'Bracelets', icon: '🔗' },
  { id: 'Necklaces', label: 'Necklaces', icon: '⛓️' },
];

export default function Products() {
  const navigate = useNavigate();
  const { addItem } = useCart();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    fetchProducts();
  }, []);

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

  const filteredProducts = selectedCategory === 'all'
    ? products
    : products.filter(product => product.category === selectedCategory);

  if (loading) {
    return (
      <section id="products" className="bg-gradient-to-b from-black via-black to-black py-32">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 text-yellow-400">
              <Sparkles className="w-5 h-5 animate-spin" style={{animationDuration: '2s'}} />
              <span className="font-semibold">Loading premium collection...</span>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="relative bg-gradient-to-b from-black via-black to-black py-32 overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-20 right-0 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 left-1/3 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16 animate-slideDown">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-sm hover:border-yellow-500/50 hover:bg-yellow-500/10 transition-all duration-300">
            <Sparkles className="w-4 h-4 text-yellow-300 animate-spin" style={{animationDuration: '2.5s'}} />
            <span className="text-yellow-300 font-semibold text-sm uppercase tracking-widest">Curated Collection</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Premium <span className="gradient-text">Selections</span>
          </h2>
          <p className="text-lg text-gray-300 leading-relaxed">
            Each piece in our collection represents the pinnacle of craftsmanship, selected exclusively for discerning individuals who value quality and sophistication
          </p>
        </div>

        {/* Category Filter */}
        <div className="mb-20 animate-slideUp">
          <div className="flex flex-wrap justify-center gap-3 lg:gap-4">
            {PRODUCT_CATEGORIES.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={`group relative px-6 py-3 rounded-full font-bold text-sm uppercase tracking-widest transition-all duration-300 ${
                  selectedCategory === category.id
                    ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black shadow-2xl shadow-yellow-500/50 scale-105'
                    : 'bg-gradient-to-br from-gray-800/50 to-black/50 text-yellow-300 border border-yellow-500/30 hover:border-yellow-500/60 hover:bg-gradient-to-br hover:from-gray-700/50 hover:to-black/50 hover:shadow-lg hover:shadow-yellow-500/20'
                }`}
              >
                <span className="mr-2">{category.icon}</span>
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Products Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {filteredProducts.map((product, index) => (
            <div
              key={product.id}
              className="group animate-fadeInScale cursor-pointer"
              style={{ animationDelay: `${index * 100}ms` }}
              onMouseEnter={() => setHoveredId(product.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => navigate(`/product/${product.id}`)}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl overflow-hidden border border-yellow-600/20 group-hover:border-yellow-500/50 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow-500/20">
                {/* Image Container */}
                <div className="relative overflow-hidden aspect-square bg-gray-900">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-115"
                  />
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Premium badge */}
                  <div className="absolute top-5 right-5 flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-yellow-500 to-yellow-600 text-black font-bold text-sm shadow-xl transform transition-transform duration-300 group-hover:scale-110">
                    <Sparkles className="w-4 h-4" />
                    <span>Premium</span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-8">
                  <div className="mb-4 flex items-start justify-between">
                    <div>
                      <span className="inline-block px-3 py-1 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 text-xs font-semibold uppercase tracking-widest">
                        {product.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 leading-tight group-hover:gradient-text transition-all duration-300">
                    {product.name}
                  </h3>

                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 leading-relaxed">
                    {product.description}
                  </p>

                  {/* Price section */}
                  <div className="mb-6">
                    <p className="text-gray-500 text-xs mb-1 uppercase tracking-widest">Price</p>
                    <p className="text-3xl font-black gradient-text">
                      {product.price.toFixed(2)}
                      <span className="text-lg text-gray-400 ml-2">DT</span>
                    </p>
                  </div>

                  {/* Action buttons */}
                  <div className="space-y-3">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product, 1);
                        navigate('/cart');
                      }}
                      className="w-full relative group/btn inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                    >
                      <ShoppingCart className="w-4 h-4 group-hover/btn:scale-125 transition-transform" />
                      <span>Add to Cart</span>
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        addItem(product, 1);
                        navigate('/checkout');
                      }}
                      className="w-full inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full font-bold text-black bg-gradient-to-r from-yellow-500 to-yellow-700 hover:from-yellow-400 hover:to-yellow-600 transition-all duration-300 shadow-lg hover:shadow-yellow-500/50"
                    >
                      <span>Buy Now</span>
                    </button>
                  </div>
                </div>

                {/* Hover effect border animation */}
                {hoveredId === product.id && (
                  <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute inset-0 rounded-2xl border-2 border-yellow-500/50 animate-pulse" />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        {/* Empty state */}
        {filteredProducts.length === 0 && (
          <div className="text-center py-20">
            <Sparkles className="w-12 h-12 text-yellow-500 mx-auto mb-4 opacity-50" />
            <p className="text-gray-400 text-lg">No products in this category</p>
            <p className="text-gray-500 text-sm mt-2">Try selecting a different category or browse all products</p>
          </div>
        )}
      </div>
    </section>
  );
}
