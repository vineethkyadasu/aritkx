import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

// A "marquee" ticker of brand values
const marqueeText = [
  'SS26 Dropping Soon',
  '✦',
  'Free Shipping Above ₹2999',
  '✦',
  'Minimal. Intentional. Premium.',
  '✦',
  'Limited Editions Available',
  '✦',
  'Authentic Indian Streetwear',
  '✦',
];

export default function CTA() {
  return (
    <section className="bg-black">
      {/* Marquee ticker */}
      <div className="bg-brand-accent py-3 overflow-hidden">
        <div className="marquee-wrapper">
          <div className="animate-marquee flex gap-8 pr-8 text-black text-xs font-bold tracking-widest uppercase whitespace-nowrap">
            {[...marqueeText, ...marqueeText].map((item, i) => (
              <span key={i}>{item}</span>
            ))}
          </div>
        </div>
      </div>

      {/* Main CTA */}
      <div className="relative overflow-hidden">
        {/* Background image */}
        <div className="relative h-[70vh] md:h-[80vh]">
          <img
            src="/images/banner.png"
            alt="ARITKX CTA"
            className="w-full h-full object-cover opacity-60"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/20" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col items-center justify-center text-center section-padding">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="section-label mb-6"
            >
              New Season
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-white mb-4 leading-none"
            >
              Minimal Luxury
              <br />
              <span className="italic font-light text-brand-accent text-3xl md:text-5xl lg:text-6xl">Beyond the Ordinary</span>
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="text-neutral-400 text-lg mb-10 max-w-md"
            >
              SS26 is here. Limited pieces. Unlimited identity.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
            >
              <Link
                to="/shop"
                className="group inline-flex items-center gap-3 bg-brand-accent text-black px-10 py-5 text-sm font-bold tracking-widest uppercase hover:bg-white transition-all duration-400 hover:scale-105 active:scale-95"
              >
                Shop Now
                <ArrowRight size={18} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
