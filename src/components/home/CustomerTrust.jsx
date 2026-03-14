import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Aditya K.',
    location: 'Mumbai',
    rating: 5,
    text: 'ARITKX changed how I think about streetwear. The quality is insane for the price point. Every piece feels considered and intentional.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80&fit=crop&facepad=2',
    product: 'Void Oversized Tee',
  },
  {
    id: 2,
    name: 'Priya S.',
    location: 'Bangalore',
    rating: 5,
    text: 'The Monolith Hoodie is genuinely one of the best pieces I\'ve ever owned. The fabric is so premium and the fit is perfect.',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&q=80&fit=crop&facepad=2',
    product: 'Monolith Hoodie',
  },
  {
    id: 3,
    name: 'Rohit M.',
    location: 'Delhi',
    rating: 5,
    text: 'Finally a brand that understands minimal aesthetics from India. ARITKX is the real deal. Packaging, quality, everything is top tier.',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&q=80&fit=crop&facepad=2',
    product: 'Shadow Cargo Pants',
  },
];

const stats = [
  { value: '10K+', label: 'Happy Customers' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '50+', label: 'Unique Pieces' },
  { value: '100%', label: 'Premium Quality' },
];

export default function CustomerTrust() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((i) => (i + 1) % reviews.length);
  const prev = () => setCurrent((i) => (i - 1 + reviews.length) % reviews.length);

  return (
    <section className="bg-neutral-950 section-padding py-24 md:py-32">
      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-24 pb-16 border-b border-white/10">
        {stats.map(({ value, label }, i) => (
          <motion.div
            key={label}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 }}
            className="text-center"
          >
            <p className="text-4xl md:text-5xl font-light text-white mb-2">{value}</p>
            <p className="text-neutral-500 text-xs tracking-widest uppercase">{label}</p>
          </motion.div>
        ))}
      </div>

      {/* Reviews */}
      <div className="max-w-3xl mx-auto">
        <div className="text-center mb-12">
          <p className="section-label">Social Proof</p>
          <h2 className="section-title text-white">
            What They're <span className="italic font-thin">Saying</span>
          </h2>
        </div>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -40 }}
              transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className="text-center px-8"
            >
              {/* Stars */}
              <div className="flex justify-center gap-1 mb-8">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <Star key={i} size={16} className="text-brand-accent fill-brand-accent" />
                ))}
              </div>

              {/* Quote */}
              <p className="text-xl md:text-2xl font-light leading-relaxed text-neutral-200 italic mb-10">
                &ldquo;{reviews[current].text}&rdquo;
              </p>

              {/* Customer */}
              <div className="flex flex-col items-center gap-3">
                <img
                  src={reviews[current].avatar}
                  alt={reviews[current].name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-brand-accent/30"
                />
                <div>
                  <p className="text-white font-medium text-sm">{reviews[current].name}</p>
                  <p className="text-neutral-500 text-xs">{reviews[current].location} · {reviews[current].product}</p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Controls */}
          <div className="flex justify-center items-center gap-6 mt-12">
            <button
              onClick={prev}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-white hover:border-white/40 transition-colors duration-300"
            >
              <ChevronLeft size={18} />
            </button>
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${
                    i === current ? 'w-6 h-1.5 bg-brand-accent' : 'w-1.5 h-1.5 bg-white/20 hover:bg-white/40'
                  }`}
                />
              ))}
            </div>
            <button
              onClick={next}
              className="w-10 h-10 flex items-center justify-center border border-white/10 text-white hover:border-white/40 transition-colors duration-300"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
