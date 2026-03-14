import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Search, Menu, X } from 'lucide-react';

const navLinks = [
  { label: 'Shop', to: '/shop' },
  { label: 'Collections', to: '/collections' },
  { label: 'Lookbook', to: '/lookbook' },
  { label: 'About', to: '/about' },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location]);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled ? 'bg-black/90 backdrop-blur-md border-b border-white/5 py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="section-padding flex items-center justify-between">
          {/* Mobile menu button */}
          <button
            className="lg:hidden text-white z-10"
            onClick={() => setMobileOpen(!mobileOpen)}
            aria-label="Toggle menu"
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>

          {/* Logo */}
          <Link
            to="/"
            className="flex items-center mx-auto lg:mx-0"
          >
            <img 
              src="/logo.png" 
              alt="ARITKX Logo" 
              className="h-12 md:h-16 w-auto object-contain hover:opacity-80 transition-opacity duration-300"
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-10">
            {navLinks.map((link) => (
              <Link key={link.to} to={link.to} className="nav-link">
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Right icons */}
          <div className="flex items-center gap-5">
            <button
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-neutral-300 hover:text-white transition-colors duration-300"
              aria-label="Search"
            >
              <Search size={18} />
            </button>
            <Link
              to="/shop"
              className="relative text-neutral-300 hover:text-white transition-colors duration-300"
              aria-label="Cart"
            >
              <ShoppingBag size={18} />
              <span className="absolute -top-2 -right-2 w-4 h-4 bg-brand-accent text-black text-[9px] font-bold rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
          </div>
        </div>

        {/* Search bar */}
        <AnimatePresence>
          {searchOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden border-t border-white/10"
            >
              <div className="section-padding py-4">
                <input
                  type="text"
                  placeholder="Search for pieces..."
                  autoFocus
                  className="w-full bg-transparent text-white placeholder-neutral-500 text-sm tracking-wide border-b border-white/20 pb-2 focus:outline-none focus:border-brand-accent transition-colors duration-300"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, x: '-100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '-100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-black flex flex-col"
          >
            <div className="flex flex-col justify-center items-center h-full gap-8">
              {navLinks.map((link, i) => (
                <motion.div
                  key={link.to}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 + i * 0.08 }}
                >
                  <Link
                    to={link.to}
                    className="text-3xl font-light tracking-widest uppercase text-white hover:text-brand-accent transition-colors duration-300"
                  >
                    {link.label}
                  </Link>
                </motion.div>
              ))}
              <div className="flex gap-8 mt-8">
                <Link to="/faq" className="text-neutral-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300">FAQ</Link>
                <Link to="/contact" className="text-neutral-400 hover:text-white text-sm tracking-widest uppercase transition-colors duration-300">Contact</Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
