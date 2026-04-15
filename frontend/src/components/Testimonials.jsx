import { motion } from 'framer-motion';
import {
  staggerContainer,
  staggerItem,
  fadeUp,
  lineGrow,
  viewportSettings,
} from '../animations/animations';

const TESTIMONIALS = [
  {
    name: 'Rajesh Kumar Sharma',
    role: 'Homeowner, Biratnagar',
    review:
      'We renovated our entire home with tiles and marble from Annapurna. The quality is outstanding and the staff helped us choose the perfect design. Our home looks like it came straight out of a magazine. Highly recommended!',
    rating: 5,
    initials: 'RS',
  },
  {
    name: 'Sanjay Contractors Pvt. Ltd.',
    role: 'Construction Company, Dharan',
    review:
      'We have been sourcing tiles, sanitaryware and fittings from Annapurna for over 3 years across multiple projects. Their pricing is competitive, delivery is reliable, and the product range is the best in the region.',
    rating: 5,
    initials: 'SC',
  },
  {
    name: 'Priya Rai',
    role: 'Interior Designer, Biratnagar',
    review:
      'As an interior designer, I need variety and quality. Annapurna Marbles consistently delivers on both. Their Italian marble collection is simply unmatched in Nepal at this price point. My clients are always impressed.',
    rating: 5,
    initials: 'PR',
  },
];

function StarRating({ rating }) {
  return (
    <div className="flex gap-0.5 mb-4">
      {[...Array(5)].map((_, i) => (
        <svg
          key={i}
          className={`w-3.5 h-3.5 ${i < rating ? 'text-gold-500' : 'text-stone-700'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="bg-stone-900/40 py-24 border-t border-stone-800/40">
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
            Testimonials
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            What Our Clients Say
          </motion.h2>
          <motion.div
            variants={lineGrow}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent max-w-[120px]"
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        {/* Cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          className="grid md:grid-cols-3 gap-6"
        >
          {TESTIMONIALS.map((t) => (
            <motion.div
              key={t.name}
              variants={staggerItem}
              className="bg-stone-900 border border-stone-800/60 p-7 flex flex-col hover:border-gold-500/20 transition-all duration-300"
            >
              <StarRating rating={t.rating} />

              {/* Quote mark */}
              <div className="font-display text-5xl text-gold-500/20 leading-none mb-3 select-none">
                &#8220;
              </div>

              <p className="font-body text-stone-400 text-sm leading-relaxed flex-1 mb-6">
                {t.review}
              </p>

              {/* Author */}
              <div className="flex items-center gap-3 pt-5 border-t border-stone-800">
                <div className="w-9 h-9 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center flex-shrink-0">
                  <span className="font-accent text-gold-500 text-xs">{t.initials}</span>
                </div>
                <div>
                  <p className="font-body text-stone-200 text-sm font-medium">{t.name}</p>
                  <p className="font-body text-stone-600 text-xs mt-0.5">{t.role}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
