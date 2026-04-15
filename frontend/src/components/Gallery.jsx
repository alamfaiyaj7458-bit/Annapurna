import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { productsAPI } from '../services/api';
import {
  fadeUp,
  staggerContainer,
  lineGrow,
  modalBackdrop,
  modalContent,
  viewportSettings,
} from '../animations/animations';

export default function Gallery() {
  const [images, setImages] = useState([]);
  const [lightbox, setLightbox] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    productsAPI
      .getAll()
      .then((res) => {
        const all = [];
        res.data.forEach((product) => {
          (product.images || []).forEach((img) => {
            all.push({ url: img.url, name: product.name, category: product.category });
          });
        });
        setImages(all.slice(0, 20));
      })
      .catch(() => {})
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    const onKey = (e) => {
      if (!lightbox) return;
      if (e.key === 'Escape') setLightbox(null);
      if (e.key === 'ArrowRight') setLightbox((i) => (i + 1) % images.length);
      if (e.key === 'ArrowLeft') setLightbox((i) => (i - 1 + images.length) % images.length);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightbox, images.length]);

  const placeholders = [
    'https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&q=80',
    'https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=600&q=80',
    'https://images.unsplash.com/photo-1507089947368-19c1da9775ae?w=600&q=80',
    'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=600&q=80',
    'https://images.unsplash.com/photo-1615873968403-89e068629265?w=600&q=80',
    'https://images.unsplash.com/photo-1604014137657-d5d0a4eebc8b?w=600&q=80',
    'https://images.unsplash.com/photo-1630699144339-420f59b4747a?w=600&q=80',
    'https://images.unsplash.com/photo-1556911220-bff31c812dba?w=600&q=80',
  ];

  const displayImages =
    images.length > 0
      ? images
      : placeholders.map((url, i) => ({
          url,
          name: 'Interior Inspiration',
          category: ['Tiles', 'Marble', 'Sanitary', 'Fittings'][i % 4],
        }));

  return (
    <section id="gallery" className="bg-stone-950 py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="text-center mb-14"
        >
          <motion.p variants={fadeUp} className="section-label mb-3">
            Inspiration
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Project Gallery
          </motion.h2>
          <motion.p
            variants={fadeUp}
            className="font-body text-stone-500 text-base mt-4 max-w-lg mx-auto"
          >
            Real installations using our premium tiles, marble and sanitaryware products.
          </motion.p>
          <motion.div
            variants={lineGrow}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent max-w-[120px]"
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        {/* Masonry Grid */}
        {loading ? (
          <div className="masonry-grid">
            {[...Array(8)].map((_, i) => (
              <div
                key={i}
                className="masonry-item skeleton"
                style={{ height: `${180 + (i % 3) * 80}px` }}
              />
            ))}
          </div>
        ) : (
          <div className="masonry-grid">
            {displayImages.map((img, index) => (
              <motion.div
                key={index}
                className="masonry-item relative overflow-hidden cursor-pointer group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: (index % 4) * 0.08 }}
                onClick={() => setLightbox(index)}
              >
                <img
                  src={img.url}
                  alt={img.name}
                  loading="lazy"
                  className="w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-stone-950/0 group-hover:bg-stone-950/40 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-1">
                    <svg
                      className="w-8 h-8 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                    </svg>
                    <span className="font-accent text-white text-[10px] tracking-widest uppercase">
                      {img.category}
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            variants={modalBackdrop}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="lightbox-overlay"
            onClick={() => setLightbox(null)}
          >
            <motion.div
              variants={modalContent}
              initial="hidden"
              animate="visible"
              exit="exit"
              className="relative max-w-5xl w-full max-h-[90vh] flex flex-col items-center"
              onClick={(e) => e.stopPropagation()}
            >
              <img
                src={displayImages[lightbox]?.url}
                alt={displayImages[lightbox]?.name}
                className="max-h-[80vh] max-w-full object-contain"
              />
              <div className="mt-4 flex items-center gap-4">
                <span className="font-accent text-gold-500 text-xs tracking-widest uppercase">
                  {displayImages[lightbox]?.category}
                </span>
                <span className="text-stone-600 text-xs">—</span>
                <span className="font-body text-stone-400 text-sm">
                  {displayImages[lightbox]?.name}
                </span>
              </div>

              {/* Nav arrows */}
              <button
                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 text-stone-400 hover:text-white transition-colors p-2"
                onClick={() => setLightbox((i) => (i - 1 + displayImages.length) % displayImages.length)}
                aria-label="Previous image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 19l-7-7 7-7" />
                </svg>
              </button>
              <button
                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 text-stone-400 hover:text-white transition-colors p-2"
                onClick={() => setLightbox((i) => (i + 1) % displayImages.length)}
                aria-label="Next image"
              >
                <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 5l7 7-7 7" />
                </svg>
              </button>

              {/* Close */}
              <button
                className="absolute top-0 right-0 translate-x-12 -translate-y-2 text-stone-500 hover:text-white transition-colors p-2"
                onClick={() => setLightbox(null)}
                aria-label="Close lightbox"
              >
                <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
