import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const collections = [
  {
    id: 1,
    title: 'Noir Essentials',
    subtitle: 'SS26 · 24 Pieces',
    description: 'The darkest expression of modern luxury. Clean lines, rich textures, and editorial silhouettes.',
    image: 'https://images.unsplash.com/photo-1539109136881-3be0616acf4b?w=1200&q=90&fit=crop',
    accent: 'New Season',
  },
  {
    id: 2,
    title: 'Urban Minimal',
    subtitle: 'Core · 18 Pieces',
    description: 'Stripped-back essentials for every day. Timeless shapes built for the city.',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=1200&q=90&fit=crop',
    accent: 'Always Available',
  },
  {
    id: 3,
    title: 'Archive Series',
    subtitle: 'Limited · 12 Pieces',
    description: 'Exclusive drops with finite editions. Own a piece of the ARITKX story.',
    image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=1200&q=90&fit=crop',
    accent: 'Limited Edition',
  },
];

export default function CollectionsPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Curated Worlds</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">Collections</h1>
        </motion.div>
      </div>

      {/* Collections */}
      <div className="section-padding py-16 space-y-24">
        {collections.map((col, i) => (
          <motion.div
            key={col.id}
            initial={{ opacity: 0, y: 60 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${i % 2 === 1 ? 'lg:grid-flow-dense' : ''}`}
          >
            {/* Image */}
            <div className={`relative overflow-hidden ${i % 2 === 1 ? 'lg:col-start-2' : ''}`}>
              <div className="img-zoom aspect-[4/3]">
                <img src={col.image} alt={col.title} className="w-full h-full object-cover" />
              </div>
              <div className="absolute top-6 left-6 bg-brand-accent text-black text-xs font-bold tracking-widest uppercase px-4 py-2">
                {col.accent}
              </div>
            </div>

            {/* Text */}
            <div className={i % 2 === 1 ? 'lg:col-start-1' : ''}>
              <p className="text-neutral-500 text-xs tracking-widest uppercase mb-4">{col.subtitle}</p>
              <h2 className="text-4xl md:text-5xl font-light text-white mb-6">{col.title}</h2>
              <div className="w-12 h-px bg-brand-accent mb-6" />
              <p className="text-neutral-400 leading-relaxed mb-8 text-base">{col.description}</p>
              <Link to="/shop" className="btn-outline group">
                Shop Collection
                <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </main>
  );
}
