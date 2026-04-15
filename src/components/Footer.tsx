import { ShoppingBag, Facebook, Instagram, Phone, Mail, MapPin, ArrowUp, Sparkles } from 'lucide-react';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const socialLinks = [
    {
      icon: Facebook,
      url: 'https://www.facebook.com/profile.php?id=61585893683205&locale=ar_AR',
      label: 'Facebook'
    },
    {
      icon: Instagram,
      url: 'https://instagram.com/mh_accessories.tn',
      label: 'Instagram'
    }
  ];

  const quickLinks = [
    { href: '#home', label: 'Home' },
    { href: '#products', label: 'Products' },
    { href: '#about', label: 'About Us' },
    { href: '#contact', label: 'Contact' }
  ];

  const contactInfo = [
    { icon: Phone, label: '+216 54 679 480', href: 'tel:+21654679480' },
    { icon: Mail, label: 'mhaccessories13@gmail.com', href: 'mailto:mhaccessories13@gmail.com' },
    { icon: MapPin, label: 'Tunisia', href: '#' }
  ];

  return (
    <footer id="contact" className="relative bg-black border-t border-yellow-600/10 overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute inset-0 opacity-10 pointer-events-none">
        <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-500 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        {/* Main footer content */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 py-20">
          {/* Brand section */}
          <div className="animate-slideUp">
            <div className="flex items-center gap-3 mb-6 group">
              <div className="relative">
                <div className="absolute inset-0 bg-gradient-to-r from-yellow-500 to-yellow-600 rounded-lg blur opacity-0 group-hover:opacity-75 transition duration-500" />
                <div className="relative bg-black px-3 py-2 rounded-lg">
                  <ShoppingBag className="w-6 h-6 text-yellow-500 group-hover:scale-110 transition-transform duration-300" />
                </div>
              </div>
              <span className="text-2xl font-bold gradient-text">
                MH Accessories
              </span>
            </div>
            <p className="text-gray-400 mb-8 leading-relaxed">
              Redefining luxury through curated accessories that transcend ordinary expectations.
            </p>
            {/* Social links */}
            <div className="flex gap-4">
              {socialLinks.map((social) => {
                const Icon = social.icon;
                return (
                  <a
                    key={social.label}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group/social w-12 h-12 bg-gradient-to-br from-gray-900/50 to-black/50 border border-yellow-600/20 group-hover/social:border-yellow-500/50 rounded-full flex items-center justify-center text-yellow-500 hover:text-yellow-400 transition-all duration-300 hover:scale-110 hover:shadow-lg hover:shadow-yellow-500/20"
                  >
                    <Icon className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Quick links */}
          <div className="animate-slideUp" style={{ animationDelay: '100ms' }}>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full" />
              Quick Links
            </h3>
            <ul className="space-y-4">
              {quickLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    className="relative text-gray-400 hover:text-yellow-400 transition-colors duration-300 group/link inline-block"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-yellow-500 to-yellow-400 group-hover/link:w-full transition-all duration-300" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact info */}
          <div className="animate-slideUp" style={{ animationDelay: '200ms' }}>
            <h3 className="text-white font-bold text-lg mb-8 flex items-center gap-2">
              <div className="w-1 h-6 bg-gradient-to-b from-yellow-500 to-yellow-600 rounded-full" />
              Contact
            </h3>
            <ul className="space-y-5">
              {contactInfo.map((item, index) => {
                const Icon = item.icon;
                return (
                  <li key={index}>
                    <a
                      href={item.href}
                      className="flex items-center gap-4 group/contact"
                    >
                      <div className="w-12 h-12 bg-gradient-to-br from-yellow-500/20 to-yellow-600/10 border border-yellow-600/20 group-hover/contact:border-yellow-500/50 rounded-full flex items-center justify-center text-yellow-500 group-hover/contact:text-yellow-400 transition-all duration-300 group-hover/contact:scale-110">
                        <Icon className="w-5 h-5" />
                      </div>
                      <span className="text-gray-400 group-hover/contact:text-yellow-400 transition-colors duration-300">
                        {item.label}
                      </span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="h-px bg-gradient-to-r from-transparent via-yellow-600/20 to-transparent" />

        {/* Bottom section */}
        <div className="py-12 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="text-center sm:text-left">
            <p className="text-gray-500 text-sm flex items-center gap-2 justify-center sm:justify-start">
              <Sparkles className="w-4 h-4 text-yellow-500" />
              © {new Date().getFullYear()} MH Accessories. Crafted with elegance.
            </p>
          </div>

          {/* Scroll to top button */}
          <button
            onClick={scrollToTop}
            className="group relative inline-flex items-center gap-2 px-6 py-3 rounded-full bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 border border-yellow-600/20 hover:border-yellow-500/50 text-yellow-400 hover:text-yellow-300 transition-all duration-300 hover:shadow-lg hover:shadow-yellow-500/10 hover:scale-110"
          >
            <span className="text-sm font-semibold">Back to Top</span>
            <ArrowUp className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
