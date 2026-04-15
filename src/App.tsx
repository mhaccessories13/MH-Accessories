import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import Hero from './components/Hero';
import Products from './components/Products';
import Featured from './components/Featured';
import About from './components/About';
import Footer from './components/Footer';
import Checkout from './components/Checkout';
import ProductDetail from './components/ProductDetail';
import Cart from './components/Cart';
import Auth from './components/Auth';
import AdminProducts from './components/AdminProducts';
import { CartProvider } from './context/CartContext';

function App() {
  return (
    <CartProvider>
      <div className="min-h-screen bg-black">
        <Header />
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <Products />
                <Featured />
                <About />
                <Footer />
              </>
            }
          />
          <Route path="/product/:id" element={<ProductDetail />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/auth" element={<Auth />} />
          <Route path="/admin" element={<AdminProducts />} />
        </Routes>
      </div>
    </CartProvider>
  );
}

export default App;
