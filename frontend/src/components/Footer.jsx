import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { fadeUp, staggerContainer, viewportSettings } from '../animations/animations';

const PHONE = '+97721XXXXXX';
const WHATSAPP =
  'https://wa.me/977XXXXXXXXXX?text=Hello%2C%20I%27m%20interested%20in%20your%20products';

export default function Footer() {
  const year = new Date().getFullYear();

  const scrollTo = (id) => {
    document.querySelector(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <footer className="bg-stone-950 border-t border-stone-800/60">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="py-16 grid sm:grid-cols-2 lg:grid-cols-4 gap-10"
        >
          {/* Brand */}
          <motion.div variants={fadeUp} className="lg:col-span-1">
            <div className="mb-4">
              <span className="font-accent text-gold-500 text-xl tracking-widest block">
                ANNAPURNA
              </span>
              <span className="font-body text-stone-500 text-xs tracking-[0.35em] uppercase">
                Marbles &amp; Sanitary
              </span>
            </div>
            <p className="font-body text-stone-600 text-sm leading-relaxed mb-5">
              Biratnagar's trusted showroom for premium tiles, marble, granite,
              sanitaryware and bathroom fittings.
            </p>
            <div className="flex gap-3">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="w-8 h-8 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-[#25d366] hover:border-[#25d366]/40 transition-all duration-200"
                aria-label="WhatsApp"
              >
                <svg className="w-3.5 h-3.5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
              </a>
              <a
                href={`tel:${PHONE}`}
                className="w-8 h-8 border border-stone-700 flex items-center justify-center text-stone-500 hover:text-gold-500 hover:border-gold-500/40 transition-all duration-200"
                aria-label="Call us"
              >
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </a>
            </div>
          </motion.div>

          {/* Products */}
          <motion.div variants={fadeUp}>
            <h4 className="font-accent text-stone-300 text-xs tracking-[0.25em] uppercase mb-5">
              Products
            </h4>
            <ul className="space-y-3">
              {['Tiles', 'Marble', 'Sanitary', 'Fittings'].map((cat) => (
                <li key={cat}>
                  <button
                    onClick={() => scrollTo('#products')}
                    className="font-body text-stone-600 text-sm hover:text-gold-500 transition-colors duration-200"
                  >
                    {cat}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Quick links */}
          <motion.div variants={fadeUp}>
            <h4 className="font-accent text-stone-300 text-xs tracking-[0.25em] uppercase mb-5">
              Quick Links
            </h4>
            <ul className="space-y-3">
              {[
                { label: 'Home', action: () => window.scrollTo({ top: 0, behavior: 'smooth' }) },
                { label: 'Gallery', action: () => scrollTo('#gallery') },
                { label: 'About', action: () => scrollTo('#about') },
                { label: 'Contact', action: () => scrollTo('#contact') },
              ].map(({ label, action }) => (
                <li key={label}>
                  <button
                    onClick={action}
                    className="font-body text-stone-600 text-sm hover:text-gold-500 transition-colors duration-200"
                  >
                    {label}
                  </button>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Contact */}
          <motion.div variants={fadeUp}>
            <h4 className="font-accent text-stone-300 text-xs tracking-[0.25em] uppercase mb-5">
              Contact
            </h4>
            <ul className="space-y-4">
              <li className="flex gap-2.5">
                <svg className="w-4 h-4 text-gold-500/60 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="font-body text-stone-600 text-xs leading-relaxed">
                  Opp. Nepal Electricity Authority,<br />
                  Near Bhrikuti Chowk, Dharan Rd,<br />
                  Biratnagar 56613, Nepal
                </span>
              </li>
              <li>
                <a
                  href={`tel:${PHONE}`}
                  className="font-body text-stone-600 text-sm hover:text-gold-500 transition-colors"
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <span className="font-body text-stone-600 text-xs">
                  Sun–Fri: 9:00 AM – 7:00 PM
                </span>
              </li>
            </ul>
          </motion.div>
        </motion.div>

        {/* Bottom bar */}
        <div className="py-5 border-t border-stone-800/60 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="font-body text-stone-700 text-xs">
            © {year} Annapurna Marbles and Sanitary. All rights reserved.
          </p>
          <p className="font-body text-stone-800 text-xs">
            Biratnagar's Premium Tiles &amp; Marble Showroom
          </p>
        </div>
      </div>
    </footer>
  );
}
