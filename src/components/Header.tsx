import { Package, Menu, X, ShoppingCart, LogOut, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { supabase } from '../lib/supabase';

export default function Header() {
  const navigate = useNavigate();
  const { items } = useCart();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [user, setUser] = useState<any>(null);
  const [showUserMenu, setShowUserMenu] = useState(false);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About' },
    { href: '#contact', label: 'Contact' },
  ];

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setUser(null);
    setShowUserMenu(false);
  };

  const handleAuthClick = () => {
    navigate('/auth');
    setShowUserMenu(false);
  };

  return (
    <header className="bg-gradient-to-b from-black via-black/95 to-black/80 text-white sticky top-0 z-50 border-b border-yellow-600/10 backdrop-blur-md shadow-2xl shadow-yellow-500/10 transition-all duration-300 hover:shadow-yellow-500/20">
      <nav className="container mx-auto px-4 py-5">
        <div className="flex items-center justify-between">
          <a href="/" className="flex items-center gap-3 group cursor-pointer transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />
              <div className="relative bg-black px-3 py-2 rounded-lg group-hover:bg-gradient-to-br group-hover:from-yellow-500/10 group-hover:to-transparent transition-all duration-300">
                <Package className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
              </div>
            </div>
            <span className="text-2xl font-bold text-white group-hover:text-yellow-400 transition-colors duration-300">
              MH Accessories
            </span>
          </a>

          <div className="hidden md:flex items-center gap-12">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="relative text-gray-300 font-medium text-sm tracking-wide hover:text-yellow-300 transition-colors duration-300 group py-2"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-300 group-hover:w-full transition-all duration-300" />
                <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-yellow-500 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </a>
            ))}

            <button
              onClick={() => navigate('/cart')}
              className="relative group ml-4"
            >
              <div className="relative p-2.5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:bg-yellow-500/20">
                <ShoppingCart className="w-5 h-5 text-yellow-400 group-hover:text-yellow-300 transition-colors duration-300" />
                {items.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-gradient-to-r from-yellow-400 to-yellow-600 text-black text-xs font-bold rounded-full w-6 h-6 flex items-center justify-center shadow-lg shadow-yellow-500/50">
                    {items.length}
                  </span>
                )}
              </div>
              <span className="absolute top-full mt-2 left-1/2 -translate-x-1/2 px-3 py-1 bg-yellow-500 text-black text-xs font-bold rounded-lg whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none">
                Cart
              </span>
            </button>

            <div className="relative ml-4">
              <button
                onClick={() => setShowUserMenu(!showUserMenu)}
                className="relative p-2.5 rounded-lg bg-gradient-to-br from-yellow-500/10 to-transparent border border-yellow-500/30 hover:border-yellow-500/50 transition-all duration-300 hover:bg-yellow-500/20"
              >
                <User className="w-5 h-5 text-yellow-400" />
              </button>
              {showUserMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-900 border border-yellow-600/30 rounded-lg shadow-xl z-50">
                  {user ? (
                    <>
                      <div className="px-4 py-3 border-b border-gray-700">
                        <p className="text-sm text-gray-400">Signed in as</p>
                        <p className="text-sm font-medium text-white truncate">{user.email}</p>
                      </div>
                      <button
                        onClick={handleLogout}
                        className="w-full px-4 py-2 text-left text-sm text-gray-300 hover:bg-yellow-500/20 hover:text-yellow-300 transition-colors flex items-center gap-2"
                      >
                        <LogOut className="w-4 h-4" />
                        Sign Out
                      </button>
                    </>
                  ) : (
                    <button
                      onClick={handleAuthClick}
                      className="w-full px-4 py-3 text-sm font-medium text-black bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 transition-all"
                    >
                      Sign In / Sign Up
                    </button>
                  )}
                </div>
              )}
            </div>
          </div>

          <button
            className="md:hidden text-yellow-500 hover:text-yellow-400 transition-colors p-2 hover:bg-yellow-500/10 rounded-lg"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-6 pb-4 flex flex-col gap-3 animate-slideDown">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="px-4 py-3 text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-300 rounded-lg transition-all duration-300 border border-transparent hover:border-yellow-500/30"
                onClick={() => setIsMenuOpen(false)}
              >
                {link.label}
              </a>
            ))}
            <button
              onClick={() => {
                navigate('/cart');
                setIsMenuOpen(false);
              }}
              className="px-4 py-3 text-gray-300 font-medium hover:bg-yellow-500/10 hover:text-yellow-300 rounded-lg transition-all duration-300 border border-transparent hover:border-yellow-500/30 flex items-center gap-2"
            >
              <ShoppingCart className="w-5 h-5" />
              <span>Cart {items.length > 0 && `(${items.length})`}</span>
            </button>
            {user ? (
              <>
                <div className="px-4 py-3 border-b border-gray-700">
                  <p className="text-sm text-gray-400">Signed in as</p>
                  <p className="text-sm font-medium text-white truncate">{user.email}</p>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-3 text-left text-gray-300 font-medium hover:bg-yellow-500/20 hover:text-yellow-300 transition-all rounded-lg flex items-center gap-2 mx-4 my-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              </>
            ) : (
              <button
                onClick={() => {
                  handleAuthClick();
                  setIsMenuOpen(false);
                }}
                className="px-4 py-3 text-black font-medium bg-gradient-to-r from-yellow-500 to-yellow-600 hover:from-yellow-400 hover:to-yellow-500 rounded-lg transition-all duration-300"
              >
                Sign In / Sign Up
              </button>
            )}
          </div>
        )}
      </nav>
    </header>
  );
}
