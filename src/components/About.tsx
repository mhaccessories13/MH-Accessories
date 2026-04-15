import { Crown, Shield, Truck, Heart, Sparkles } from 'lucide-react';

export default function About() {
  const features = [
    {
      icon: Crown,
      title: 'Premium Selection',
      description: 'Every piece in our collection is meticulously curated to meet the highest standards of craftsmanship, elegance, and sophistication.',
      color: 'from-yellow-500 to-yellow-600'
    },
    {
      icon: Shield,
      title: 'Authenticity Guaranteed',
      description: 'We guarantee 100% authentic accessories with comprehensive quality assurance on every single purchase you make.',
      color: 'from-yellow-400 to-yellow-500'
    },
    {
      icon: Truck,
      title: 'Swift Delivery',
      description: 'Experience quick and secure delivery to your doorstep with full tracking available on all orders.',
      color: 'from-yellow-500 to-amber-600'
    },
    {
      icon: Heart,
      title: 'Dedicated Support',
      description: 'Our dedicated support team is always ready to assist you with any questions or concerns you may have.',
      color: 'from-yellow-400 to-yellow-600'
    }
  ];

  return (
    <section id="about" className="relative bg-black py-32 border-y border-yellow-600/10 overflow-hidden">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-5 pointer-events-none">
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-24 animate-slideDown">
          <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 rounded-full border border-yellow-500/30 bg-yellow-500/5 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 text-yellow-400" />
            <span className="text-yellow-400 font-semibold text-sm uppercase tracking-widest">Our Promise</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-6 leading-tight">
            Why Trust <span className="gradient-text">MH Accessories</span>
          </h2>
          <p className="text-lg text-gray-400 leading-relaxed">
            Committed to delivering premium accessories that seamlessly blend sophistication with exceptional value
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {features.map((feature, index) => {
            const IconComponent = feature.icon;
            return (
              <div
                key={index}
                className="group animate-fadeInScale"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative h-full bg-gradient-to-br from-gray-900/40 to-black/60 rounded-2xl border border-yellow-600/20 group-hover:border-yellow-500/50 p-8 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow-500/10 overflow-hidden">
                  {/* Background accent */}
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-yellow-500/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                  {/* Icon circle */}
                  <div className={`relative inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} mb-6 group-hover:scale-110 transition-transform duration-500 shadow-lg`}>
                    <IconComponent className="w-10 h-10 text-black" />
                  </div>

                  {/* Content */}
                  <div className="relative z-10">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:gradient-text transition-all duration-300">
                      {feature.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {feature.description}
                    </p>
                  </div>

                  {/* Border animation */}
                  <div className="absolute inset-0 rounded-2xl border border-yellow-500/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500 pointer-events-none" />
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom CTA */}
        <div className="max-w-3xl mx-auto text-center mt-24 animate-slideUp">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-full blur-lg opacity-30 group-hover:opacity-50" />
            <button className="relative px-10 py-4 rounded-full font-bold text-black bg-gradient-to-r from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 transition-all duration-300 shadow-2xl hover:shadow-yellow-500/50 hover:scale-110">
              <a href="#products" className="block">
                Start Shopping Now
              </a>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
