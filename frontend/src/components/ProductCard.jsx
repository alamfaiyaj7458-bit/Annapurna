import { useState } from 'react';
import { motion } from 'framer-motion';
import { staggerItem } from '../animations/animations';

const CATEGORY_COLORS = {
  Tiles: 'bg-blue-500/10 text-blue-300 border-blue-500/20',
  Marble: 'bg-stone-400/10 text-stone-300 border-stone-400/20',
  Sanitary: 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20',
  Fittings: 'bg-gold-500/10 text-gold-400 border-gold-500/20',
};

export default function ProductCard({ product }) {
  const [imgIndex, setImgIndex] = useState(0);
  const [imgLoaded, setImgLoaded] = useState(false);

  const handleImgChange = (i) => {
    setImgIndex(i);
    setImgLoaded(false);
  };

  const images = product.images || [];
  const currentImg = images[imgIndex];

  return (
    <motion.article
      variants={staggerItem}
      className="group bg-stone-900 border border-stone-800/60 overflow-hidden hover:border-gold-500/30 transition-all duration-500"
    >
      {/* Image area */}
      <div className="relative overflow-hidden aspect-[4/3] bg-stone-800">
        {currentImg ? (
          <>
            {!imgLoaded && (
              <div className="absolute inset-0 skeleton" />
            )}
            <img
              src={currentImg.url}
              alt={product.name}
              loading="lazy"
              onLoad={() => setImgLoaded(true)}
              className={`w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 ${
                imgLoaded ? 'opacity-100' : 'opacity-0'
              }`}
            />
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center">
            <svg className="w-12 h-12 text-stone-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}

        {/* Category badge */}
        <div className="absolute top-3 left-3">
          <span
            className={`font-accent text-[10px] tracking-widest uppercase px-2.5 py-1 border ${
              CATEGORY_COLORS[product.category] || 'bg-stone-700/50 text-stone-300 border-stone-600/30'
            }`}
          >
            {product.category}
          </span>
        </div>

        {/* Multiple image dots */}
        {images.length > 1 && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => handleImgChange(i)}
                className={`w-1.5 h-1.5 rounded-full transition-all duration-200 ${
                  i === imgIndex ? 'bg-gold-500 w-3' : 'bg-stone-400/50'
                }`}
                aria-label={`View image ${i + 1}`}
              />
            ))}
          </div>
        )}

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-stone-950/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>

      {/* Content */}
      <div className="p-5">
        <h3 className="font-display text-xl font-light text-stone-100 mb-2 leading-snug line-clamp-1">
          {product.name}
        </h3>
        <p className="font-body text-stone-500 text-sm leading-relaxed line-clamp-2">
          {product.description}
        </p>
      </div>
    </motion.article>
  );
}
