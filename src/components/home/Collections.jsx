import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Noir Essentials',
    subtitle: 'SS26',
    description: 'The darkest expression of modern luxury.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=900&q=85&fit=crop',
    count: '24 Pieces',
    to: '/collections',
  },
  {
    id: 2,
    title: 'Urban Minimal',
    subtitle: 'Core',
    description: 'Stripped back. Built for the city.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85&fit=crop',
    count: '18 Pieces',
    to: '/collections',
  },
  {
    id: 3,
    title: 'Archive Series',
    subtitle: 'Limited',
    description: 'Exclusive drops. Finite editions.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85&fit=crop',
    count: '12 Pieces',
    to: '/collections',
  },
];

export default function Collections() {
  return (
    <section className="bg-neutral-950 section-padding py-24 md:py-32">
      <div className="mb-14">
        <p className="section-label">Explore</p>
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <h2 className="section-title text-white">
            Our <span className="italic font-thin">Collections</span>
          </h2>
          <Link to="/collections" className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white transition-colors duration-300 self-start">
            All Collections <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Link>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{ duration: 0.7, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
          >
            <Link to={col.to} className="block group relative overflow-hidden">
              {/* Image */}
              <div className="relative aspect-[3/4] overflow-hidden">
                <img
                  src={col.image}
                  alt={col.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              </div>

              {/* Content overlay */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <p className="text-brand-accent text-xs tracking-widest uppercase mb-2">{col.subtitle}</p>
                <h3 className="text-white text-2xl md:text-3xl font-light mb-1">{col.title}</h3>
                <p className="text-neutral-400 text-sm mb-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
                  {col.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-neutral-500 text-xs">{col.count}</span>
                  <span className="text-white text-xs tracking-widest uppercase flex items-center gap-2 opacity-0 translate-x-4 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-500">
                    Explore <ArrowRight size={12} />
                  </span>
                </div>
              </div>

              {/* Border hover */}
              <div className="absolute inset-0 border border-white/0 group-hover:border-white/20 transition-colors duration-500" />
            </Link>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
