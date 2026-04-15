import { motion } from 'framer-motion';
import {
  staggerContainer,
  fadeUp,
  fadeLeft,
  fadeRight,
  lineGrow,
  viewportSettings,
} from '../animations/animations';

const PHONE = '+97721XXXXXX';
const WHATSAPP =
  'https://wa.me/977XXXXXXXXXX?text=Hello%2C%20I%27m%20interested%20in%20your%20products';
const ADDRESS =
  'Opposite Nepal Electricity Authority, Near Bhrikuti Chowk, Dharan Rd, Biratnagar 56613, Nepal';
const MAP_SRC =
  'https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3572.1!2d87.28!3d26.45!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjbCsDI3JzAwLjAiTiA4N8KwMTYnNDguMCJF!5e0!3m2!1sen!2snp!4v1680000000000!5m2!1sen!2snp';

const INFO_ITEMS = [
  {
    label: 'Address',
    value: ADDRESS,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
    ),
  },
  {
    label: 'Phone',
    value: PHONE,
    href: `tel:${PHONE}`,
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
    ),
  },
  {
    label: 'Business Hours',
    value: 'Sun–Fri: 9:00 AM – 7:00 PM\nSat: 10:00 AM – 5:00 PM',
    icon: (
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
    ),
  },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-stone-950 py-24 border-t border-stone-800/40">
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
            Visit Us
          </motion.p>
          <motion.h2 variants={fadeUp} className="section-title">
            Find Our Showroom
          </motion.h2>
          <motion.div
            variants={lineGrow}
            className="mx-auto mt-6 h-px bg-gradient-to-r from-transparent via-gold-500 to-transparent max-w-[120px]"
            style={{ transformOrigin: 'center' }}
          />
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-10 items-start">
          {/* Left: info */}
          <motion.div
            variants={fadeLeft}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="space-y-6"
          >
            {INFO_ITEMS.map(({ label, value, href, icon }) => (
              <div
                key={label}
                className="flex gap-4 p-5 bg-stone-900/50 border border-stone-800/50 hover:border-gold-500/20 transition-all duration-300"
              >
                <div className="flex-shrink-0 w-9 h-9 border border-stone-700 flex items-center justify-center">
                  <svg className="w-4 h-4 text-gold-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    {icon}
                  </svg>
                </div>
                <div>
                  <p className="font-accent text-gold-500/70 text-[10px] tracking-widest uppercase mb-1">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      className="font-body text-stone-300 text-sm hover:text-gold-400 transition-colors"
                    >
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-stone-300 text-sm whitespace-pre-line leading-relaxed">
                      {value}
                    </p>
                  )}
                </div>
              </div>
            ))}

            {/* CTA buttons */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <a
                href={WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 flex items-center justify-center gap-2 py-3.5 border border-[#25d366]/40 text-[#25d366] font-body font-medium text-sm tracking-wider uppercase transition-all duration-300 hover:bg-[#25d366] hover:text-stone-950 hover:border-[#25d366]"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                </svg>
                Chat on WhatsApp
              </a>
              <a
                href={`tel:${PHONE}`}
                className="flex-1 flex items-center justify-center gap-2 py-3.5 btn-gold"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call Now
              </a>
            </div>
          </motion.div>

          {/* Right: map */}
          <motion.div
            variants={fadeRight}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
            className="relative h-80 lg:h-[480px] overflow-hidden border border-stone-800/60"
          >
            <iframe
              src={MAP_SRC}
              width="100%"
              height="100%"
              style={{ border: 0, filter: 'grayscale(80%) invert(5%) contrast(110%)' }}
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Annapurna Marbles Showroom Location"
            />
            {/* Overlay with address pin */}
            <div className="absolute bottom-4 left-4 right-4 bg-stone-950/90 backdrop-blur-sm border border-stone-700/60 p-4">
              <p className="font-accent text-gold-500 text-xs tracking-widest uppercase mb-1">
                Annapurna Marbles &amp; Sanitary
              </p>
              <p className="font-body text-stone-400 text-xs leading-relaxed">
                {ADDRESS}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
