import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase, Order } from '../lib/supabase';
import { ArrowLeft, Check, Truck, Lock } from 'lucide-react';
import { useCart } from '../context/CartContext';

export default function Checkout() {
  const navigate = useNavigate();
  const { items, getTotalPrice, clearCart } = useCart();

  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [paymentMethod] = useState<'cache_livraison'>('cache_livraison');

  const [formData, setFormData] = useState({
    customer_name: '',
    customer_email: '',
    customer_phone: '',
    customer_address: '',
  });

  if (items.length === 0 && !success) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-black via-black to-black pt-24 pb-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <button
            onClick={() => navigate('/cart')}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:text-yellow-300 hover:border-yellow-500/50 transition-all duration-300 mb-12 group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
            <span className="font-semibold">Back to Cart</span>
          </button>
          <div className="text-center">
            <p className="text-gray-300 text-lg">Your cart is empty</p>
            <button
              onClick={() => navigate('/cart')}
              className="mt-4 px-6 py-2 rounded-full bg-yellow-500 text-black font-bold hover:bg-yellow-400 transition-all"
            >
              Go to Cart
            </button>
          </div>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (items.length === 0) return;

    setSubmitting(true);

    try {
      for (const item of items) {
        const order: Order = {
          product_id: item.product.id,
          customer_name: formData.customer_name,
          customer_email: formData.customer_email,
          customer_phone: formData.customer_phone,
          customer_address: formData.customer_address,
          quantity: item.quantity,
          payment_method: paymentMethod,
          total_price: getTotalPrice(),
        };

        const { error } = await supabase
          .from('orders')
          .insert([order]);

        if (error) throw error;
      }

      setSuccess(true);
      clearCart();
      setTimeout(() => {
        navigate('/');
      }, 3000);
    } catch (error) {
      console.error('Error creating order:', error);
      alert('An error occurred while placing your order. Please try again.');
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="relative min-h-screen bg-black flex items-center justify-center overflow-hidden py-20">
        <div className="absolute inset-0 opacity-10 pointer-events-none">
          <div className="absolute top-0 right-0 w-80 h-80 bg-yellow-500 rounded-full blur-3xl" />
        </div>

        <div className="relative z-10 text-center max-w-md mx-auto px-4 animate-fadeInScale">
          <div className="flex justify-center mb-8">
            <div className="relative w-24 h-24 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center shadow-2xl shadow-green-500/50">
              <Check className="w-12 h-12 text-white" />
            </div>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4 gradient-text">Order Confirmed!</h2>
          <p className="text-lg text-gray-400 mb-2">Thank you for your purchase</p>
          <p className="text-sm text-gray-500 mb-8">We'll send you a confirmation email shortly. Redirecting to home page...</p>
          <div className="w-full h-1 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full animate-pulse" />
        </div>
      </div>
    );
  }

  const subtotal = items.reduce((total, item) => total + (item.product.price * item.quantity), 0);
  const handlingFee = 7;
  const total = getTotalPrice();

  return (
    <div className="relative min-h-screen bg-black py-20 overflow-hidden">
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 max-w-6xl relative z-10">
        <button
          onClick={() => navigate('/cart')}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-yellow-500/10 border border-yellow-500/30 text-yellow-400 hover:text-yellow-300 hover:border-yellow-500/50 transition-all duration-300 mb-12 group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="font-semibold">Back to Cart</span>
        </button>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-12">
          {/* Order Summary */}
          <div className="animate-slideDown">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-yellow-600/20 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-500 h-fit">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Truck className="w-6 h-6 text-yellow-500" />
                Order Summary
              </h3>

              <div className="space-y-4 mb-8">
                {items.map((item) => (
                  <div key={item.product.id} className="flex gap-4 pb-4 border-b border-yellow-600/20">
                    <img
                      src={item.product.image_url}
                      alt={item.product.name}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div className="flex-1">
                      <h4 className="text-white font-bold text-sm">{item.product.name}</h4>
                      <p className="text-gray-400 text-xs mb-1">Qty: {item.quantity}</p>
                      <p className="text-yellow-400 font-bold">{(item.product.price * item.quantity).toFixed(2)} DT</p>
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-gradient-to-br from-yellow-500/10 to-transparent rounded-2xl p-6 border border-yellow-600/20">
                <div className="flex justify-between mb-4 pb-4 border-b border-yellow-600/20">
                  <span className="text-gray-400">Subtotal</span>
                  <span className="text-white font-bold">{subtotal.toFixed(2)} DT</span>
                </div>

                <div className="flex justify-between mb-6 pb-6 border-b border-yellow-600/20">
                  <span className="text-gray-400">Handling Fee</span>
                  <span className="text-white font-bold">{handlingFee.toFixed(2)} DT</span>
                </div>

                <div className="flex justify-between items-center">
                  <span className="text-lg font-bold text-yellow-400">Total</span>
                  <span className="text-3xl font-black gradient-text">{total.toFixed(2)} DT</span>
                </div>
              </div>
            </div>
          </div>

          {/* Order Form */}
          <div className="animate-slideUp">
            <div className="bg-gradient-to-br from-gray-900/50 to-black/50 rounded-3xl p-8 border border-yellow-600/20 backdrop-blur-sm hover:border-yellow-500/50 transition-all duration-500">
              <h3 className="text-2xl font-bold text-white mb-8 flex items-center gap-2">
                <Lock className="w-6 h-6 text-yellow-500" />
                Delivery Details
              </h3>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Full Name *</label>
                  <input
                    type="text"
                    name="customer_name"
                    value={formData.customer_name}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Email *</label>
                  <input
                    type="email"
                    name="customer_email"
                    value={formData.customer_email}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Phone *</label>
                  <input
                    type="tel"
                    name="customer_phone"
                    value={formData.customer_phone}
                    onChange={handleInputChange}
                    required
                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300"
                    placeholder="+216 XX XXX XXX"
                  />
                </div>

                {/* Address */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-3 uppercase tracking-wide">Delivery Address *</label>
                  <textarea
                    name="customer_address"
                    value={formData.customer_address}
                    onChange={handleInputChange}
                    required
                    rows={4}
                    className="w-full px-5 py-3 bg-gray-800/50 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-yellow-500 focus:ring-2 focus:ring-yellow-500/20 transition-all duration-300 resize-none"
                    placeholder="Enter your complete delivery address"
                  />
                </div>

                {/* Payment Method (Cash on Delivery only) */}
                <div>
                  <label className="block text-sm font-bold text-gray-300 mb-4 uppercase tracking-wide">Payment Method</label>
                  <div className="relative bg-gradient-to-br from-yellow-500/20 to-transparent rounded-xl p-6 border-2 border-yellow-500/50">
                    <div className="flex items-start gap-4">
                      <div className="w-6 h-6 rounded-full border-2 border-yellow-500 flex items-center justify-center flex-shrink-0 mt-1">
                        <div className="w-3 h-3 rounded-full bg-yellow-500" />
                      </div>
                      <div className="flex-1">
                        <p className="text-white font-bold mb-1">Cash on Delivery</p>
                        <p className="text-sm text-gray-400">Pay when you receive your order at your doorstep</p>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full mt-8 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black px-8 py-4 rounded-xl font-bold text-lg hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 hover:-translate-y-1 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 disabled:hover:shadow-none"
                >
                  {submitting ? 'Processing Order...' : 'Confirm & Place Order'}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
