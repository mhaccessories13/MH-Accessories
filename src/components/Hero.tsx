import { Sparkles, ArrowRight, ChevronDown } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth) * 20 - 10,
        y: (e.clientY / window.innerHeight) * 20 - 10
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <section id="home" className="relative bg-black text-white min-h-screen flex items-center justify-center overflow-hidden pt-20 pb-20">
      {/* Enhanced animated gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-black via-yellow-950/5 to-black" />

      {/* Animated gradient orbs with parallax */}
      <div className="absolute inset-0 opacity-60 pointer-events-none">
        <div
          className="absolute top-10 left-0 w-96 h-96 bg-yellow-400 rounded-full blur-3xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite',
            transform: `translate(${mousePosition.x * 1.2}px, ${mousePosition.y * 1.2}px)`
          }}
        />
        <div
          className="absolute -bottom-20 right-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl"
          style={{
            animation: 'pulse 8s ease-in-out infinite 1s',
            transform: `translate(${mousePosition.x * 0.6}px, ${mousePosition.y * 0.6}px)`
          }}
        />
        <div className="absolute top-1/2 left-1/3 w-80 h-80 bg-yellow-300 rounded-full blur-3xl opacity-25 animate-pulse" style={{animation: 'pulse 10s ease-in-out infinite'}} />
      </div>

      {/* Grid background pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(234,179,8,.1) 1px, transparent 1px), linear-gradient(90deg, rgba(234,179,8,.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Animated line accents */}
      <div className="absolute top-0 left-1/4 w-px h-40 bg-gradient-to-b from-yellow-500/60 to-transparent opacity-0" style={{animation: 'fadeIn 1.5s ease-out 0.5s forwards'}} />
      <div className="absolute bottom-0 right-1/4 w-px h-40 bg-gradient-to-t from-yellow-500/60 to-transparent opacity-0" style={{animation: 'fadeIn 1.5s ease-out 0.8s forwards'}} />

      {/* Decorative corner elements */}
      <div className="absolute top-20 left-10 w-20 h-20 border-2 border-yellow-500/20 rounded-lg opacity-0" style={{animation: 'fadeIn 2s ease-out 1s forwards'}} />
      <div className="absolute bottom-20 right-10 w-20 h-20 border-2 border-yellow-500/20 rounded-lg opacity-0" style={{animation: 'fadeIn 2s ease-out 1.2s forwards'}} />

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-5xl mx-auto text-center">
          {/* Premium badge with enhanced animation */}
          <div className={`inline-flex items-center gap-2 mb-8 px-6 py-3 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-md transition-all duration-700 hover:border-yellow-400 hover:bg-yellow-500/15 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-40 animate-pulse" style={{animationDuration: '2s'}} />
              <Sparkles className="w-4 h-4 text-yellow-300 relative" />
            </div>
            <span className="text-yellow-200 font-bold tracking-widest uppercase text-xs">Luxury Essentials</span>
          </div>

          {/* Main headline with staggered animation */}
          <h1 className={`text-6xl sm:text-7xl md:text-8xl font-black mb-8 leading-tight transition-all duration-1000 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <span className="block text-white mb-6 relative">
              Redefine Your
              <span className="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-48 h-1 bg-gradient-to-r from-transparent via-yellow-500 via-yellow-400 to-transparent rounded-full animate-pulse-glow" />
            </span>
            <span className="block bg-gradient-to-r from-yellow-200 via-yellow-400 to-yellow-600 bg-clip-text text-transparent text-5xl sm:text-7xl md:text-8xl animate-pulse-text">
              Elegance
            </span>
          </h1>

          {/* Subheading with refined styling */}
          <p className={`text-lg sm:text-xl text-gray-200 mb-16 max-w-3xl mx-auto leading-relaxed transition-all duration-1000 delay-200 font-light tracking-wide ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            Discover our meticulously curated collection of premium accessories that seamlessly blend timeless elegance with cutting-edge contemporary design
          </p>

          {/* CTA Buttons with enhanced styling */}
          <div className={`flex flex-col sm:flex-row items-center justify-center gap-6 transition-all duration-1000 delay-300 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            <a
              href="#products"
              className="group relative inline-flex items-center gap-3 px-10 py-5 text-black font-bold text-lg rounded-full bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 hover:from-yellow-200 hover:via-yellow-300 hover:to-yellow-500 transition-all duration-500 shadow-2xl hover:shadow-yellow-400/80 hover:scale-110 hover:-translate-y-2 overflow-hidden border border-yellow-200/30"
            >
              <span className="relative z-10 flex items-center gap-2">
                <span>Explore Collection</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-2 transition-transform" />
              </span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-400 to-yellow-500 opacity-0 group-hover:opacity-20 transition-opacity" />
            </a>
            <a
              href="#about"
              className="group relative px-10 py-5 text-lg font-bold text-yellow-100 rounded-full border-2 border-yellow-500/70 hover:border-yellow-300 bg-gradient-to-r from-yellow-500/20 to-transparent hover:from-yellow-500/40 transition-all duration-500 backdrop-blur-md hover:shadow-2xl hover:shadow-yellow-500/50 hover:scale-105 overflow-hidden"
            >
              <span className="relative z-10">Our Story</span>
              <span className="absolute inset-0 bg-gradient-to-r from-yellow-500/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>

          {/* Stats section */}
          <div className={`mt-24 grid grid-cols-3 gap-8 max-w-2xl mx-auto transition-all duration-1000 delay-500 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
            {[
              { number: '50+', label: 'Premium Items' },
              { number: '98%', label: 'Customer Happy' },
              { number: '48h', label: 'Fast Delivery' }
            ].map((stat, i) => (
              <div key={i} className="group text-center hover:scale-105 transition-transform duration-300">
                <div className="text-2xl sm:text-3xl font-black gradient-text mb-2">{stat.number}</div>
                <div className="text-xs sm:text-sm text-gray-400 uppercase tracking-widest group-hover:text-yellow-300 transition-colors">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-700 ${isLoaded ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        <div className="flex flex-col items-center gap-3 animate-bounce">
          <span className="text-xs text-gray-500 uppercase tracking-widest font-semibold">Scroll to explore</span>
          <div className="relative">
            <ChevronDown className="w-5 h-5 text-yellow-500 animate-pulse" />
          </div>
        </div>
      </div>
    </section>
  );
}
