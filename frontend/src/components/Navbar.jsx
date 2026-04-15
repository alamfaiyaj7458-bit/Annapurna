import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { navVariant } from '../animations/animations';

const NAV_LINKS = [
  { label: 'Products', href: '#products' },
  { label: 'Gallery', href: '#gallery' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === '/';

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const handleNavClick = (href) => {
    setMenuOpen(false);
    if (!isHome) return;
    setTimeout(() => {
      const el = document.querySelector(href);
      if (el) el.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  };

  return (
    <motion.header
      variants={navVariant}
      initial="hidden"
      animate="visible"
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled
          ? 'bg-stone-950/95 backdrop-blur-md border-b border-stone-800/60 py-3'
          : 'bg-transparent py-5'
      }`}
    >
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex flex-col leading-none group">
          <span className="font-accent text-gold-500 text-lg tracking-widest group-hover:text-gold-400 transition-colors">
            ANNAPURNA
          </span>
          <span className="font-body text-stone-400 text-[10px] tracking-[0.4em] uppercase">
            Marbles &amp; Sanitary
          </span>
        </Link>

        {/* Desktop nav */}
        <ul className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map(({ label, href }) => (
            <li key={label}>
              {isHome ? (
                <button
                  onClick={() => handleNavClick(href)}
                  className="font-body text-stone-400 text-sm tracking-wider hover:text-gold-500 transition-colors duration-200 uppercase"
                >
                  {label}
                </button>
              ) : (
                <Link
                  to={`/${href}`}
                  className="font-body text-stone-400 text-sm tracking-wider hover:text-gold-500 transition-colors duration-200 uppercase"
                >
                  {label}
                </Link>
              )}
            </li>
          ))}
        </ul>

        {/* Desktop CTA */}
        <div className="hidden md:flex items-center gap-4">
          <a
            href="tel:+97721XXXXXX"
            className="font-body text-xs text-stone-400 tracking-widest hover:text-gold-500 transition-colors uppercase"
          >
            +977-21-XXXXXX
          </a>
          <Link
            to="/admin"
            className="font-accent text-[11px] tracking-[0.25em] uppercase text-stone-600 hover:text-gold-500 transition-colors border border-stone-700 hover:border-gold-500/40 px-3 py-1.5"
          >
            Admin
          </Link>
        </div>

        {/* Mobile hamburger */}
        <button
          onClick={() => setMenuOpen((v) => !v)}
          className="md:hidden flex flex-col gap-[5px] p-2 group"
          aria-label="Toggle menu"
        >
          <span
            className={`block h-px w-6 bg-stone-300 transition-all duration-300 ${
              menuOpen ? 'rotate-45 translate-y-[7px]' : ''
            }`}
          />
          <span
            className={`block h-px bg-stone-300 transition-all duration-300 ${
              menuOpen ? 'opacity-0 w-0' : 'w-4'
            }`}
          />
          <span
            className={`block h-px w-6 bg-stone-300 transition-all duration-300 ${
              menuOpen ? '-rotate-45 -translate-y-[7px]' : ''
            }`}
          />
        </button>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
            className="md:hidden overflow-hidden bg-stone-950/98 border-t border-stone-800/60"
          >
            <div className="px-6 py-6 flex flex-col gap-5">
              {NAV_LINKS.map(({ label, href }) => (
                <button
                  key={label}
                  onClick={() => handleNavClick(href)}
                  className="text-left font-body text-stone-300 text-sm tracking-widest uppercase hover:text-gold-500 transition-colors"
                >
                  {label}
                </button>
              ))}
              <div className="pt-4 border-t border-stone-800 flex flex-col gap-3">
                <a
                  href="tel:+97721XXXXXX"
                  className="font-body text-xs text-stone-500 tracking-widest"
                >
                  +977-21-XXXXXX
                </a>
                <Link
                  to="/admin"
                  onClick={() => setMenuOpen(false)}
                  className="font-accent text-xs tracking-widest uppercase text-stone-500 hover:text-gold-500 transition-colors"
                >
                  Admin Panel
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
