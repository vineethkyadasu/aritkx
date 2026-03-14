import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Plus, Minus } from 'lucide-react';

const faqs = [
  {
    category: 'Orders & Shipping',
    items: [
      { q: 'How long does shipping take?', a: 'Standard shipping takes 5–7 business days across India. Express shipping (2–3 days) is available at checkout for an additional charge.' },
      { q: 'Do you ship internationally?', a: 'Currently, we ship within India only. International shipping will be available soon — sign up for our newsletter to be the first to know.' },
      { q: 'How do I track my order?', a: 'Once your order ships, you\'ll receive a tracking link via email and WhatsApp. You can also visit our contact page for support.' },
    ],
  },
  {
    category: 'Returns & Exchanges',
    items: [
      { q: 'What is your return policy?', a: 'We accept returns within 15 days of delivery for unused, unwashed items with original tags attached. Limited edition items are final sale.' },
      { q: 'How do I start a return?', a: 'Email us at hello@aritkx.com with your order number and reason. Our team will respond within 24 hours with return instructions.' },
      { q: 'Can I exchange for a different size?', a: 'Yes! Exchanges are processed within 5–7 business days. We recommend referring to our size guide before ordering to get the perfect fit.' },
    ],
  },
  {
    category: 'Products',
    items: [
      { q: 'What materials do you use?', a: 'We use 100% premium cotton, fleece, and blended fabrics. All materials are ethically sourced and tested for quality and durability.' },
      { q: 'Do you restock sold-out items?', a: 'Core collection items are regularly restocked. Limited edition and Archive Series pieces are typically final. Subscribe to stay informed.' },
      { q: 'How should I care for my ARITKX pieces?', a: 'Cold wash inside-out, no tumble dry. Iron on low heat. Avoid bleach. Detailed care instructions are printed on the inner label of each piece.' },
    ],
  },
];

function AccordionItem({ q, a }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button
        className="w-full flex items-center justify-between py-5 text-left group"
        onClick={() => setOpen(!open)}
      >
        <span className="text-white font-light text-base group-hover:text-brand-accent transition-colors duration-300">{q}</span>
        <span className="text-brand-accent ml-4 flex-shrink-0">
          {open ? <Minus size={16} /> : <Plus size={16} />}
        </span>
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden"
          >
            <p className="text-neutral-400 text-sm leading-relaxed pb-5">{a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Help Center</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">FAQ</h1>
        </motion.div>
      </div>

      <div className="section-padding py-16 max-w-3xl">
        {faqs.map((section, si) => (
          <motion.div
            key={section.category}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: si * 0.1 }}
            className="mb-12"
          >
            <h2 className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-6">
              {section.category}
            </h2>
            <div>
              {section.items.map((item) => (
                <AccordionItem key={item.q} q={item.q} a={item.a} />
              ))}
            </div>
          </motion.div>
        ))}

        {/* Still need help */}
        <div className="mt-16 p-10 border border-white/10 text-center">
          <p className="text-brand-accent text-xs tracking-widest uppercase mb-3">Still Have Questions?</p>
          <h3 className="text-2xl font-light text-white mb-4">We&apos;re Here to Help</h3>
          <p className="text-neutral-500 text-sm mb-6">Reach out and a human from our team will respond within 24 hours.</p>
          <a href="/contact" className="btn-outline inline-flex">Contact Us</a>
        </div>
      </div>
    </main>
  );
}
