import { Star, Quote, TrendingUp } from 'lucide-react';

export default function Featured() {
  const testimonials = [
    {
      text: "The quality and craftsmanship of these accessories is unparalleled. Every detail speaks to the premium nature of the collection.",
      author: "Ines Ben Ali",
      role: "Fashion Enthusiast",
      rating: 5
    },
    {
      text: "I've purchased multiple items from MH Accessories and each one has exceeded my expectations. Highly recommended for anyone seeking true luxury.",
      author: "Mohammed Jbeli",
      role: "Lifestyle Curator",
      rating: 5
    },
    {
      text: "The attention to detail and customer service is exceptional. This is where I go when I need something truly special.",
      author: "Sarra Ben Ahmed",
      role: "Design Professional",
      rating: 5
    }
  ];

  return (
    <section className="relative bg-black py-32 overflow-hidden border-y border-yellow-600/10">
      {/* Decorative background */}
      <div className="absolute inset-0 opacity-8 pointer-events-none">
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-1/4 w-80 h-80 bg-yellow-600 rounded-full blur-3xl opacity-5" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-24">
          <div className="inline-flex items-center gap-2 mb-6 px-5 py-2.5 rounded-full border border-yellow-500/50 bg-yellow-500/10 backdrop-blur-md hover:border-yellow-400 hover:bg-yellow-500/15 transition-all duration-300">
            <div className="relative">
              <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-40" />
              <Star className="w-4 h-4 text-yellow-300 relative" />
            </div>
            <span className="text-yellow-200 font-bold text-sm uppercase tracking-widest">Trusted by Thousands</span>
          </div>
          <h2 className="text-5xl md:text-6xl font-black text-white mb-8 leading-tight">
            Loved by <span className="gradient-text">Discerning Customers</span>
          </h2>
          <p className="text-lg text-gray-300">Real reviews from real customers who value quality</p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="group animate-fadeInScale"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="relative h-full bg-gradient-to-br from-gray-900/60 to-black/80 rounded-2xl border border-yellow-600/40 group-hover:border-yellow-500/80 p-8 transition-all duration-500 backdrop-blur-sm hover:shadow-2xl hover:shadow-yellow-500/30 overflow-hidden hover:-translate-y-2">
                {/* Background accent */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-gradient-to-br from-yellow-400/20 to-transparent rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

                {/* Quote icon with glow */}
                <div className="relative inline-flex items-center justify-center w-14 h-14 rounded-full bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 mb-6 group-hover:from-yellow-500/50 group-hover:to-yellow-600/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/40">
                  <div className="absolute inset-0 bg-yellow-400 rounded-full blur opacity-0 group-hover:opacity-30 transition-opacity" />
                  <Quote className="w-7 h-7 text-yellow-200 relative group-hover:text-yellow-100 transition-colors" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-6 group-hover:scale-110 transition-transform origin-left duration-300">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
                  ))}
                </div>

                {/* Testimonial text */}
                <p className="text-gray-200 text-sm leading-relaxed mb-8 relative z-10 font-light">
                  "{testimonial.text}"
                </p>

                {/* Author info */}
                <div className="relative z-10 pt-6 border-t border-yellow-500/20 group-hover:border-yellow-500/40 transition-colors duration-300">
                  <p className="font-bold text-white text-sm mb-1 group-hover:gradient-text transition-all duration-300">
                    {testimonial.author}
                  </p>
                  <p className="text-yellow-300/70 text-xs font-semibold uppercase tracking-wider">
                    {testimonial.role}
                  </p>
                </div>

                {/* Border animation */}
                <div className="absolute inset-0 rounded-2xl border border-yellow-500/20 opacity-0 group-hover:opacity-100 animate-pulse transition-opacity duration-500 pointer-events-none" />
              </div>
            </div>
          ))}
        </div>

        {/* Trust indicators */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-24 max-w-3xl mx-auto">
          {[
            { icon: TrendingUp, label: 'Trusted', value: '15K+' },
            { icon: Star, label: 'Rated', value: '4.9/5' },
            { icon: Quote, label: 'Reviews', value: '2.3K+' }
          ].map((item, i) => {
            const Icon = item.icon;
            return (
              <div key={i} className="group text-center hover:scale-110 transition-transform duration-300">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-yellow-500/30 to-yellow-600/20 mb-4 group-hover:from-yellow-500/50 group-hover:to-yellow-600/40 transition-all duration-300 group-hover:shadow-lg group-hover:shadow-yellow-500/40">
                  <Icon className="w-8 h-8 text-yellow-200 group-hover:text-yellow-100 transition-colors" />
                </div>
                <p className="text-2xl font-black bg-gradient-to-r from-yellow-300 via-yellow-400 to-yellow-600 bg-clip-text text-transparent mb-1 group-hover:scale-110 transition-transform origin-center duration-300">{item.value}</p>
                <p className="text-sm text-gray-400 uppercase tracking-widest group-hover:text-yellow-300 transition-colors">{item.label}</p>
              </div>
            );
          })}
        </div>

        {/* Bottom accent */}
        <div className="max-w-3xl mx-auto text-center mt-20 animate-slideUp">
          <div className="group inline-flex items-center gap-4 px-8 py-4 rounded-full border border-yellow-500/50 bg-yellow-500/12 backdrop-blur-md hover:border-yellow-400 hover:bg-yellow-500/20 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/30 hover:scale-105 cursor-pointer">
            <div className="flex gap-1 group-hover:scale-125 transition-transform origin-left duration-300">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-4 h-4 fill-yellow-300 text-yellow-300" />
              ))}
            </div>
            <span className="text-gray-100 text-sm font-bold group-hover:text-yellow-200 transition-colors">Perfect Rating from Our Community</span>
          </div>
        </div>
      </div>
    </section>
  );
}
