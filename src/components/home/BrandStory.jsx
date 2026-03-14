import { motion, useInView } from 'framer-motion';
import { useRef } from 'react';

export default function BrandStory() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-100px' });

  return (
    <section className="bg-neutral-950 overflow-hidden" ref={ref}>
      <div className="grid grid-cols-1 lg:grid-cols-[40%_60%] min-h-screen">
        {/* Image Side */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="relative overflow-hidden lg:h-auto h-[60vh] border-r border-white/5"
        >
          <img
            src="/images/founder.png"
            alt="G Chethan - Founder of ARITKX"
            className="w-full h-full object-cover object-center"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-transparent to-neutral-950/40" />

          {/* Floating label */}
          <div className="absolute bottom-10 left-10 bg-black/80 backdrop-blur-sm p-6 border border-white/10">
            <p className="text-brand-accent text-xs tracking-widest uppercase mb-1">Founder</p>
            <p className="text-white text-lg font-light">G Chethan</p>
            <p className="text-neutral-500 text-xs">Entrepreneur · India</p>
          </div>
        </motion.div>

        {/* Text Side */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col justify-center section-padding py-20 lg:py-32"
        >
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="section-label mb-6"
          >
            Our Story
          </motion.p>

          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="text-4xl md:text-5xl font-light leading-tight text-white mb-8"
          >
            Where Technology
            <br />
            Meets <span className="italic">Style</span>
          </motion.h2>

          <motion.div
            initial={{ width: 0 }}
            animate={isInView ? { width: '60px' } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="h-px bg-brand-accent mb-8"
          />

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-neutral-400 leading-relaxed text-base mb-6"
          >
            I am G Chethan, an entrepreneur from India and the founder of ARITKX. I am a Computer Science student with a passion for technology, entrepreneurship, and creative innovation.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.85 }}
            className="text-neutral-400 leading-relaxed text-base mb-10"
          >
            My goal is to build strong digital brands that combine technology, creativity, and modern thinking. ARITKX is the intersection of street culture and minimal luxury — a brand that speaks to those who dare to live differently.
          </motion.p>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid grid-cols-3 gap-6 pt-8 border-t border-white/10"
          >
            {[
              { value: '2024', label: 'Founded' },
              { value: '50+', label: 'Pieces' },
              { value: '100%', label: 'Premium' },
            ].map(({ value, label }) => (
              <div key={label}>
                <p className="text-3xl font-light text-white mb-1">{value}</p>
                <p className="text-neutral-600 text-xs tracking-widest uppercase">{label}</p>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
