import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';

const items = [
  { id: 1, image: 'https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&q=85&fit=crop', title: 'Urban Dusk', look: 'Void Tee + Shadow Cargo', size: 'tall' },
  { id: 2, image: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=800&q=85&fit=crop', title: 'Monochrome Study', look: 'Monolith Hoodie', size: 'square' },
  { id: 3, image: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=800&q=85&fit=crop', title: 'Night Minimal', look: 'Archive Jacket', size: 'square' },
  { id: 4, image: 'https://images.unsplash.com/photo-1558171813-8b75e2ebb7fb?w=800&q=85&fit=crop', title: 'Street Editorial', look: 'Full SS26 Look', size: 'tall' },
  { id: 5, image: 'https://images.unsplash.com/photo-1600861194942-f883de0dfe96?w=800&q=85&fit=crop', title: 'Minimal Form', look: 'Noir Set', size: 'square' },
  { id: 6, image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=800&q=85&fit=crop', title: 'Clean Slate', look: 'Core Collection', size: 'square' },
  { id: 7, image: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&q=85&fit=crop', title: 'Evening Standard', look: 'Urban Minimal', size: 'square' },
  { id: 8, image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=800&q=85&fit=crop', title: 'The Everyday', look: 'Core Long Sleeve', size: 'square' },
];

export default function LookbookPage() {
  const [selected, setSelected] = useState(null);

  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Editorial</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">Lookbook</h1>
          <p className="text-neutral-500 mt-4 text-sm max-w-md">Click any image to discover the look and pieces featured.</p>
        </motion.div>
      </div>

      {/* Grid */}
      <div className="section-padding py-12">
        <div className="columns-2 md:columns-3 lg:columns-4 gap-4 space-y-4">
          {items.map((item, i) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="break-inside-avoid mb-4"
            >
              <div
                onClick={() => setSelected(item)}
                className="relative overflow-hidden cursor-pointer group"
              >
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-400 flex flex-col justify-end p-5 opacity-0 group-hover:opacity-100">
                  <p className="text-brand-accent text-xs tracking-widest uppercase">{item.title}</p>
                  <p className="text-white text-sm">{item.look}</p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/85 modal-backdrop flex items-center justify-center p-6"
            onClick={() => setSelected(null)}
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="relative max-w-3xl w-full grid grid-cols-1 md:grid-cols-2 bg-neutral-950 overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <img src={selected.image} alt={selected.title} className="w-full h-80 md:h-full object-cover" />
              <div className="p-10 flex flex-col justify-center">
                <p className="section-label mb-2">{selected.title}</p>
                <h3 className="text-3xl font-light text-white mb-4">{selected.look}</h3>
                <p className="text-neutral-500 text-sm mb-8">Part of the SS26 Editorial — each piece in this look is available in our shop.</p>
                <button className="btn-primary w-full justify-center">Shop This Look</button>
              </div>
              <button
                onClick={() => setSelected(null)}
                className="absolute top-4 right-4 w-10 h-10 bg-black/60 flex items-center justify-center text-white hover:bg-black transition-colors duration-300"
              >
                <X size={18} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
