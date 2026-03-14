import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const lookbookItems = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85&fit=crop',
    title: 'Urban Dusk',
    description: 'Void Oversized Tee + Shadow Cargo',
    size: 'large',
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=600&q=85&fit=crop',
    title: 'Monochrome Study',
    description: 'Monolith Hoodie + Axis Pants',
    size: 'small',
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=600&q=85&fit=crop',
    title: 'Night Minimal',
    description: 'Archive Series Jacket',
    size: 'small',
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1558171813-8b75e2ebb7fb?w=800&q=85&fit=crop',
    title: 'Street Editorial',
    description: 'Full SS26 Look',
    size: 'large',
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=600&q=85&fit=crop',
    title: 'Minimal Form',
    description: 'Noir Essentials Set',
    size: 'small',
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=600&q=85&fit=crop',
    title: 'Clean Slate',
    description: 'Core Collection',
    size: 'small',
  },
];

export default function Lookbook() {
  const [selected, setSelected] = useState(null);

  return (
    <section className="bg-black section-padding py-24 md:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-4">
        <div>
          <p className="section-label">Editorial</p>
          <h2 className="section-title text-white">
            Look<span className="italic font-thin">book</span>
          </h2>
        </div>
        <p className="text-neutral-500 text-sm max-w-xs leading-relaxed">
          Visual stories of how ARITKX lives in the real world. Click to discover each piece.
        </p>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
        {lookbookItems.map((item, i) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-40px' }}
            transition={{ duration: 0.6, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
            className={item.size === 'large' ? 'row-span-2' : ''}
          >
            <div
              onClick={() => setSelected(item)}
              className="relative overflow-hidden cursor-pointer group h-full"
              style={{ minHeight: item.size === 'large' ? '500px' : '240px' }}
            >
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-cover transition-transform duration-700 ease-expo-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-500" />
              <div className="absolute inset-0 flex flex-col justify-end p-6 opacity-0 group-hover:opacity-100 transition-opacity duration-400">
                <p className="text-brand-accent text-xs tracking-widest uppercase mb-1">{item.title}</p>
                <p className="text-white text-sm">{item.description}</p>
                <span className="text-white/60 text-xs mt-2">Click to view →</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-50 modal-backdrop bg-black/80 flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-2xl w-full bg-neutral-950 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.image} alt={selected.title} className="w-full h-96 object-cover" />
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 flex items-center justify-center text-white hover:bg-black transition-colors duration-300"
              >
                <X size={18} />
              </button>
              <div className="p-8">
                <p className="section-label mb-2">{selected.title}</p>
                <h3 className="text-2xl font-light text-white mb-2">{selected.description}</h3>
                <button className="btn-primary mt-4">Shop This Look</button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
