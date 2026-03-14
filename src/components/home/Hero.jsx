import { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';

const slides = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=1920&q=90&fit=crop',
    headline: 'Modern Streetwear',
    sub: 'Crafted for Identity',
    label: 'SS26 Collection',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90&fit=crop',
    headline: 'Minimal Luxury',
    sub: 'Beyond the Ordinary',
    label: 'Limited Edition',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1501196354995-cbb51c65aaea?w=1920&q=90&fit=crop',
    headline: 'Define Your Era',
    sub: 'Wear Your Story',
    label: 'New Arrivals',
  },
];

const SLIDE_DURATION = 5000;

const textVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 0) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] },
  }),
  exit: { opacity: 0, y: -20, transition: { duration: 0.4 } },
};

export default function Hero() {
  const [current, setCurrent] = useState(0);
  const [paused, setPaused] = useState(false);

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % slides.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + slides.length) % slides.length);
  }, []);

  useEffect(() => {
    if (paused) return;
    const timer = setInterval(next, SLIDE_DURATION);
    return () => clearInterval(timer);
  }, [paused, next]);

  return (
    <section
      className="relative w-full h-screen overflow-hidden bg-black"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Slides */}
      <AnimatePresence mode="sync">
        <motion.div
          key={current}
          initial={{ scale: 1.08, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0.96, opacity: 0 }}
          transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="absolute inset-0"
        >
          <img
            src={slides[current].image}
            alt={slides[current].headline}
            className="w-full h-full object-cover"
          />
          {/* Multi-layer overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 via-black/20 to-black/70" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/40 to-transparent" />
        </motion.div>
      </AnimatePresence>

      {/* Content */}
      <div className="relative z-10 h-full flex flex-col justify-center section-padding">
        <AnimatePresence mode="wait">
          <motion.div key={current} className="max-w-3xl">
            {/* Label */}
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={0}
              className="section-label mb-6"
            >
              {slides[current].label}
            </motion.p>

            {/* Headline */}
            <motion.h1
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={1}
              className="text-6xl sm:text-7xl md:text-8xl lg:text-9xl font-black tracking-tighter leading-none text-white mb-4"
            >
              {slides[current].headline}
            </motion.h1>

            {/* Sub-headline */}
            <motion.p
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={2}
              className="text-xl md:text-2xl font-light text-neutral-300 tracking-wide mb-10"
            >
              {slides[current].sub}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              variants={textVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
              custom={3}
              className="flex flex-wrap gap-4"
            >
              <Link to="/shop" className="btn-primary group">
                Shop Now
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
              <Link to="/collections" className="btn-outline">
                Explore Collection
              </Link>
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Slide indicators */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 z-20 flex items-center gap-3">
        {slides.map((_, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            className={`transition-all duration-500 rounded-full ${
              i === current ? 'w-8 h-1.5 bg-brand-accent' : 'w-1.5 h-1.5 bg-white/40 hover:bg-white/70'
            }`}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>

      {/* Progress bar */}
      <div className="absolute bottom-0 left-0 right-0 z-20 h-0.5 bg-white/10">
        <motion.div
          key={current}
          initial={{ width: '0%' }}
          animate={{ width: '100%' }}
          transition={{ duration: SLIDE_DURATION / 1000, ease: 'linear' }}
          className="h-full bg-brand-accent"
        />
      </div>

      {/* Arrow controls */}
      <button
        onClick={prev}
        className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        aria-label="Previous slide"
      >
        <ChevronLeft size={20} />
      </button>
      <button
        onClick={next}
        className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-11 h-11 flex items-center justify-center border border-white/20 text-white hover:border-white hover:bg-white/10 transition-all duration-300 backdrop-blur-sm"
        aria-label="Next slide"
      >
        <ChevronRight size={20} />
      </button>

      {/* Scroll indicator */}
      <div className="absolute bottom-12 right-10 z-20 hidden md:flex flex-col items-center gap-2">
        <span className="text-white/40 text-[10px] tracking-widest uppercase writing-mode-vertical">Scroll</span>
        <div className="w-px h-12 bg-white/20 relative overflow-hidden">
          <motion.div
            className="absolute top-0 left-0 w-full bg-white/60"
            initial={{ height: 0, y: 0 }}
            animate={{ height: '100%', y: '100%' }}
            transition={{ repeat: Infinity, duration: 1.5, ease: 'linear' }}
          />
        </div>
      </div>

      {/* Slide counter */}
      <div className="absolute top-1/2 right-8 -translate-y-1/2 z-20 hidden lg:flex flex-col items-center gap-1">
        <span className="text-white text-sm font-light">0{current + 1}</span>
        <div className="w-px h-8 bg-white/20" />
        <span className="text-white/40 text-sm font-light">0{slides.length}</span>
      </div>
    </section>
  );
}
