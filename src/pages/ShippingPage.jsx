import { motion } from 'framer-motion';

const sections = [
  {
    title: 'Shipping Policy',
    items: [
      { q: 'Standard Delivery', a: '5–7 business days across India. Free shipping on orders above ₹2,999.' },
      { q: 'Express Delivery', a: '2–3 business days. Additional ₹199 charge at checkout.' },
      { q: 'Order Processing', a: 'Orders are processed within 1–2 business days (excluding weekends and holidays).' },
      { q: 'Tracking', a: 'A tracking link will be sent to your email and registered WhatsApp number once your order ships.' },
    ],
  },
  {
    title: 'Return & Exchange Policy',
    items: [
      { q: 'Return Window', a: '15 days from the date of delivery. Items must be unused, unwashed, with original tags intact.' },
      { q: 'Non-Returnable Items', a: 'Limited edition items, Archive Series, and sale items are final sale and cannot be returned or exchanged.' },
      { q: 'How to Return', a: 'Email hello@aritkx.com with your order number. Our team will provide a return label within 24 hours.' },
      { q: 'Refund Timeline', a: 'Refunds are processed within 5–7 business days after we receive and inspect your return.' },
      { q: 'Exchanges', a: 'We offer size exchanges for the same item. Subject to availability. Processed within 5–7 business days.' },
    ],
  },
  {
    title: 'Damaged / Wrong Items',
    items: [
      { q: 'Damaged on Arrival', a: 'Please contact us within 48 hours of delivery with photos. We\'ll arrange a replacement or full refund immediately.' },
      { q: 'Wrong Item Received', a: 'We sincerely apologize. Contact us right away and we\'ll get the correct item shipped to you at no extra charge.' },
    ],
  },
];

export default function ShippingPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Policies</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">Shipping & Returns</h1>
        </motion.div>
      </div>

      <div className="section-padding py-16 max-w-3xl">
        {sections.map((sec, si) => (
          <motion.div
            key={sec.title}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: si * 0.1 }}
            className="mb-14"
          >
            <h2 className="text-2xl font-light text-white mb-8 pb-4 border-b border-white/10">{sec.title}</h2>
            <div className="space-y-6">
              {sec.items.map((item) => (
                <div key={item.q}>
                  <h3 className="text-brand-accent text-xs font-semibold tracking-widest uppercase mb-2">{item.q}</h3>
                  <p className="text-neutral-400 text-sm leading-relaxed">{item.a}</p>
                </div>
              ))}
            </div>
          </motion.div>
        ))}

        <div className="mt-8 p-8 border border-white/10">
          <p className="text-neutral-500 text-sm leading-relaxed">
            For any further assistance, please contact us at{' '}
            <a href="mailto:hello@aritkx.com" className="text-brand-accent hover:underline">hello@aritkx.com</a>{' '}
            or WhatsApp us at +91 9000000000. We typically respond within 24 hours.
          </p>
        </div>
      </div>
    </main>
  );
}
