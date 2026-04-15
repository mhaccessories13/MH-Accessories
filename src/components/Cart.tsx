import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { ArrowLeft, Trash2, Plus, Minus, ShoppingCart } from 'lucide-react';

export default function Cart() {
  const navigate = useNavigate();
  const { items, removeItem, updateQuantity, getTotalPrice } = useCart();

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black pt-24 pb-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-5" />
        </div>

        <div className="container mx-auto px-4 relative z-10 flex flex-col items-center justify-center min-h-[70vh]">
          <ShoppingCart className="w-16 h-16 text-gray-600 mb-6" />
          <h2 className="text-3xl font-bold text-white mb-4">Your Cart is Empty</h2>
          <p className="text-gray-400 mb-8">Add some products to get started</p>
          <button
            onClick={() => navigate('/#products')}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300"
          >
            Continue Shopping
          </button>
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const handlingFee = 7;
  const total = subtotal + handlingFee;

  return (
    <div className="min-h-screen bg-gradient-to-b from-black via-black to-black pt-24 pb-20">
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-600 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <button
          onClick={() => navigate('/')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-500/50 bg-yellow-500/10 text-yellow-300 hover:bg-yellow-500/20 hover:border-yellow-400 transition-all duration-300 mb-12 font-semibold"
        >
          <ArrowLeft className="w-4 h-4" />
          Back
        </button>

        <h1 className="text-5xl md:text-6xl font-black text-white mb-12 gradient-text">Shopping Cart</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="space-y-4">
              {items.map((item) => (
                <div
                  key={item.product.id}
                  className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-2xl p-6 border border-yellow-600/20 hover:border-yellow-500/50 transition-all duration-500 flex gap-6"
                >
                  {/* Product Image */}
                  <div className="w-32 h-32 flex-shrink-0">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-full h-full object-cover rounded-xl"
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-2">{item.product.name}</h3>
                      <p className="text-gray-400 text-sm mb-3">{item.product.description}</p>
                      <p className="text-2xl font-black gradient-text">
                        {item.product.price.toFixed(2)}
                        <span className="text-sm text-gray-400 ml-2">DT</span>
                      </p>
                    </div>

                    {/* Quantity Controls */}
                    <div className="flex items-center gap-4 mt-4">
                      <div className="flex items-center gap-3 bg-gray-800/50 rounded-lg p-2">
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                          className="w-8 h-8 rounded-md bg-gray-700 hover:bg-yellow-500 text-white transition-colors flex items-center justify-center"
                        >
                          <Minus className="w-4 h-4" />
                        </button>
                        <span className="w-8 text-center font-bold text-white">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                          className="w-8 h-8 rounded-md bg-gray-700 hover:bg-yellow-500 text-white transition-colors flex items-center justify-center"
                        >
                          <Plus className="w-4 h-4" />
                        </button>
                      </div>

                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="ml-auto p-2 text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="animate-slideDown">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-yellow-600/20 backdrop-blur-sm h-fit sticky top-32">
              <h3 className="text-2xl font-bold text-white mb-8">Order Summary</h3>

              <div className="space-y-4 mb-8 pb-8 border-b border-yellow-600/20">
                <div className="flex justify-between">
                  <span className="text-gray-400">Subtotal ({items.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                  <span className="text-white font-bold">{subtotal.toFixed(2)} DT</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Handling Fee</span>
                  <span className="text-white font-bold">{handlingFee.toFixed(2)} DT</span>
                </div>
              </div>

              <div className="flex justify-between items-center mb-8">
                <span className="text-lg font-bold text-yellow-400">Total</span>
                <span className="text-3xl font-black gradient-text">{total.toFixed(2)} DT</span>
              </div>

              <button
                onClick={() => navigate('/checkout')}
                className="w-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 hover:-translate-y-1"
              >
                Proceed to Checkout
              </button>

              <button
                onClick={() => navigate('/#products')}
                className="w-full mt-4 border border-yellow-500/50 text-yellow-300 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-500/10 transition-all duration-300"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
