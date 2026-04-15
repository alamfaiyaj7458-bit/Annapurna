import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI } from '../services/api';
import ProductCard from './ProductCard';
import {
  fadeUp,
  staggerContainer,
  lineGrow,
  viewportSettings,
} from '../animations/animations';

const CATEGORIES = ['All', 'Tiles', 'Marble', 'Sanitary', 'Fittings'];

const BRAND_LOGOS = [
  { name: 'Jaguar', desc: 'Premium Bath Fittings' },
  { name: 'Hindware', desc: 'Sanitaryware' },
  { name: 'Orient', desc: 'Ceramics & Tiles' },
  { name: 'Somany', desc: 'Wall & Floor Tiles' },
];

function BrandsStrip() {
  return (
    <div className="border-t border-b border-stone-800/60 py-8 mb-16">
      <p className="text-center font-accent text-stone-600 text-[10px] tracking-[0.4em] uppercase mb-6">
        Authorised Dealers
      </p>
      <div className="flex flex-wrap justify-center gap-8 md:gap-16">
        {BRAND_LOGOS.map(({ name, desc }) => (
          <div key={name} className="flex flex-col items-center gap-1 group">
            <span className="font-display text-2xl font-light text-stone-500 group-hover:text-gold-500 transition-colors duration-300">
              {name}
            </span>
            <span className="font-body text-[10px] text-stone-700 tracking-widest uppercase">
              {desc}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WhyChooseUs() {
  const points = [
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
      ),
      title: 'Genuine Products',
      desc: 'Authorised dealer for top brands — every product is 100% authentic with manufacturer warranty.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
      ),
      title: 'Vast Collection',
      desc: 'Over 500+ SKUs across tiles, marble, granite, sanitaryware and bathroom accessories.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />
      ),
      title: 'Expert Guidance',
      desc: 'Our trained staff help you choose the right products matching your budget and design vision.',
    },
    {
      icon: (
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
      ),
      title: 'Competitive Pricing',
      desc: 'Best prices in the market with flexible payment options and bulk discounts for contractors.',
    },
  ];

  return (
    <motion.div
      variants={staggerContainer}
      initial="hidden"
      whileInView="visible"
      viewport={viewportSettings}
      className="mb-24"
      id="about"
    >
      <motion.div variants={fadeUp} className="text-center mb-12">
        <p className="section-label mb-3">Why Choose Us</p>
        <h2 className="section-title">Built on Trust &amp; Quality</h2>
        <motion.div
          variants={lineGrow}
          className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent max-w-[120px]"
          style={{ transformOrigin: 'center' }}
        />
      </motion.div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {points.map(({ title, desc, icon }) => (
          <motion.div
            key={title}
            variants={fadeUp}
            className="bg-stone-900/50 border border-stone-800/50 p-6 hover:border-gold-500/20 transition-all duration-300 group"
          >
            <div className="w-10 h-10 border border-gold-500/30 flex items-center justify-center mb-4 group-hover:border-gold-500/60 transition-colors">
              <svg className="w-5 h-5 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {icon}
              </svg>
            </div>
            <h3 className="font-display text-lg font-light text-stone-200 mb-2">{title}</h3>
            <p className="font-body text-stone-500 text-sm leading-relaxed">{desc}</p>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}

export default function ProductGrid() {
  const [products, setProducts] = useState([]);
  const [activeCategory, setActiveCategory] = useState('All');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const fetchProducts = useCallback(async (category, signal) => {
    setLoading(true);
    setError('');
    try {
      const params = category !== 'All' ? { category } : {};
      const res = await productsAPI.getAll(params, signal);
      setProducts(res.data);
    } catch (err) {
      if (err.name !== 'CanceledError' && err.code !== 'ERR_CANCELED') {
        setError('Unable to load products. Please try again later.');
      }
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const controller = new AbortController();
    fetchProducts(activeCategory, controller.signal);
    return () => controller.abort();
  }, [activeCategory, fetchProducts]);

  return (
    <section id="products" className="bg-stone-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <BrandsStrip />

        <WhyChooseUs />

        {/* Section header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-center mb-12"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Our Collection
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Premium Products
          </motion.h2>
          <motion.div
            variants={lineGrow}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent max-w-[120px]"
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        {/* Category filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={viewportSettings}
          transition={{ duration: 0.5 }}
          className="flex flex-wrap justify-center gap-3 mb-12"
        >
          {CATEGORIES.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`font-accent text-xs tracking-[0.2em] uppercase px-5 py-2.5 border transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-gold-500 text-stone-950 border-gold-500'
                  : 'border-stone-700 text-stone-400 hover:border-gold-500/50 hover:text-gold-500'
              }`}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Error state */}
        {error && (
          <div className="text-center py-16">
            <p className="font-body text-red-400 text-sm">{error}</p>
          </div>
        )}

        {/* Loading state */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[...Array(8)].map((_, i) => (
              <div key={i} className="bg-stone-900 border border-stone-800">
                <div className="aspect-[4/3] skeleton" />
                <div className="p-5 space-y-3">
                  <div className="skeleton h-5 w-3/4 rounded" />
                  <div className="skeleton h-3 w-full rounded" />
                  <div className="skeleton h-3 w-2/3 rounded" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Products grid */}
        {!loading && !error && (
          <AnimatePresence mode="wait">
            {products.length === 0 ? (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="text-center py-24"
              >
                <p className="font-display text-2xl font-light text-stone-600 mb-2">
                  No products found
                </p>
                <p className="font-body text-stone-600 text-sm">
                  {activeCategory !== 'All'
                    ? `No ${activeCategory} products have been added yet.`
                    : 'No products have been added yet.'}
                </p>
              </motion.div>
            ) : (
              <motion.div
                key={activeCategory}
                variants={staggerContainer}
                initial="hidden"
                animate="visible"
                className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"
              >
                {products.map((product) => (
                  <ProductCard key={product._id} product={product} />
                ))}
              </motion.div>
            )}
          </AnimatePresence>
        )}
      </div>
    </section>
  );
}
