import { motion } from 'framer-motion';
import {
  staggerContainer,
  heroTextVariant,
  fadeUp,
  lineGrow,
  fadeIn,
} from '../animations/animations';

const PHONE = '+97721XXXXXX';
const WHATSAPP =
  'https://wa.me/977XXXXXXXXXX?text=Hello%2C%20I%27m%20interested%20in%20your%20products';

const WA_ICON = (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
  </svg>
);

const CALL_ICON = (
  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
);

export default function Hero() {
  const scrollToProducts = () => {
    document.querySelector('#products')?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-stone-950"
    >
      {/* Background layers */}
      <div className="absolute inset-0">
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at 20% 50%, rgba(201,168,76,0.07) 0%, transparent 60%), radial-gradient(ellipse at 80% 20%, rgba(201,168,76,0.04) 0%, transparent 50%), linear-gradient(160deg, #0c0a09 0%, #1c1917 45%, #0c0a09 100%)',
          }}
        />
        {/* Subtle grid */}
        <svg
          className="absolute inset-0 w-full h-full opacity-[0.025]"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M 60 0 L 0 0 0 60" fill="none" stroke="#c9a84c" strokeWidth="0.5" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>
        {/* Large decorative letter */}
        <div className="absolute right-0 top-0 bottom-0 flex items-center overflow-hidden pointer-events-none select-none">
          <span
            className="font-display font-light leading-none pr-4 md:pr-12"
            style={{ fontSize: 'clamp(140px, 28vw, 400px)', color: 'rgba(44,40,36,0.35)' }}
          >
            A
          </span>
        </div>
      </div>

      {/* Main content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-28 pb-20">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="max-w-4xl"
        >
          {/* Label */}
          <motion.div variants={fadeUp} className="flex items-center gap-4 mb-8">
            <span className="section-label">Est. Biratnagar, Nepal</span>
            <motion.div
              variants={lineGrow}
              className="h-px bg-gold-500 flex-1 max-w-[4rem]"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>

          {/* Heading lines */}
          {['Crafting', 'Beautiful', 'Spaces'].map((word, i) => (
            <div key={word} className="overflow-hidden mb-1">
              <motion.h1
                variants={heroTextVariant}
                transition={{ delay: i * 0.1 }}
                className={`font-display font-light leading-[0.92] ${
                  word === 'Beautiful'
                    ? 'text-gradient-gold'
                    : 'text-stone-50'
                }`}
                style={{ fontSize: 'clamp(3rem, 9vw, 7rem)' }}
              >
                {word}
              </motion.h1>
            </div>
          ))}

          {/* Gold divider line */}
          <motion.div
            variants={lineGrow}
            className="my-8 h-px bg-gradient-to-r from-gold-500/80 via-gold-500/30 to-transparent max-w-xs"
            style={{ transformOrigin: 'left' }}
          />

          {/* Sub-text */}
          <motion.p
            variants={fadeUp}
            className="font-body text-stone-400 text-base sm:text-lg max-w-xl leading-relaxed mb-10"
          >
            Nepal's premier destination for premium tiles, marble, granite, sanitaryware
            and bathroom fittings — transforming homes and commercial spaces across the region.
          </motion.p>

          {/* CTA buttons */}
          <motion.div variants={fadeUp} className="flex flex-wrap gap-4 mb-16">
            <button onClick={scrollToProducts} className="btn-gold">
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h8m-8 6h16" />
              </svg>
              View Products
            </button>
            <a href={`tel:${PHONE}`} className="btn-gold">
              {CALL_ICON}
              Call Now
            </a>
            <a
              href={WHATSAPP}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-7 py-3 border border-[#25d366]/40 text-[#25d366] font-body font-medium text-sm tracking-widest uppercase transition-all duration-300 hover:bg-[#25d366] hover:text-stone-950 hover:border-[#25d366]"
            >
              {WA_ICON}
              WhatsApp
            </a>
          </motion.div>

          {/* Stats */}
          <motion.div
            variants={fadeIn}
            className="flex flex-wrap gap-8 pt-8 border-t border-stone-800/60"
          >
            {[
              { value: '500+', label: 'Products' },
              { value: '10+', label: 'Years Experience' },
              { value: '1000+', label: 'Projects Done' },
              { value: '4', label: 'Premium Brands' },
            ].map(({ value, label }) => (
              <div key={label}>
                <div className="font-display text-2xl sm:text-3xl font-light text-gradient-gold">
                  {value}
                </div>
                <div className="font-body text-[10px] text-stone-500 tracking-[0.3em] uppercase mt-1">
                  {label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
      >
        <span className="font-accent text-stone-600 text-[10px] tracking-[0.3em] uppercase">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
          className="w-px h-8 bg-gradient-to-b from-gold-500/60 to-transparent"
        />
      </motion.div>
    </section>
  );
}
