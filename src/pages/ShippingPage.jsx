import { motion } from 'framer-motion';

const shippingPolicy = [
  {
    id: '4.1',
    title: 'Order Processing Time',
    text: 'All orders are processed within 1-2 business days after successful payment confirmation. Orders placed on weekends or public holidays will be processed on the next working business day.',
    subtext: 'You will receive an email confirmation once your order has been processed and dispatched.',
  },
  {
    id: '4.2',
    title: 'Delivery Timeframes',
    text: 'We deliver Pan-India. Estimated delivery times after dispatch are as follows:',
    bullets: [
      'Metro Cities (Hyderabad, Mumbai, Delhi, Bengaluru, Chennai, Kolkata, Pune, Ahmedabad): 3-5 business days',
      'Tier 2 & Tier 3 Cities: 5-7 business days',
      'Remote & Rural Areas: 7-10 business days',
    ],
    subtext: 'Please note these are estimates only. Actual delivery times may vary depending on your location, courier availability, and other factors such as public holidays or unforeseen circumstances.',
  },
  {
    id: '4.3',
    title: 'Shipping Charges',
    text: 'Shipping charges are calculated based on the delivery location and the weight of your order. The applicable shipping fee will be displayed at checkout before you complete your purchase.',
    subtext: 'We occasionally offer free shipping promotions — please check our website for current offers.',
  },
  {
    id: '4.4',
    title: 'Delivery Area',
    text: 'ARITKX ships to all states and union territories across India, including:',
    bullets: [
      'All major metro cities and Tier 2 & Tier 3 cities',
      'Remote and rural pin codes (subject to courier serviceability)',
    ],
    subtext: 'If your pin code is not serviceable by our courier partners at the time of ordering, we will notify you promptly and arrange an alternative or issue a full refund.',
  },
  {
    id: '4.5',
    title: 'Order Tracking',
    text: 'Once your order is dispatched, you will receive a shipping confirmation email with a tracking number and courier details. You can use this to track your order in real time on the courier partner\'s website or app.',
  },
  {
    id: '4.6',
    title: 'Failed Deliveries',
    text: 'If a delivery attempt is unsuccessful due to an incorrect address, unavailability of the recipient, or any other reason, the courier may attempt re-delivery or hold the package at a nearby facility. Please ensure your delivery address and contact number are accurate at the time of placing your order.',
    subtext: 'ARITKX is not responsible for delays or failed deliveries caused by incorrect address information provided by the customer.',
  },
  {
    id: '4.7',
    title: 'Lost or Delayed Shipments',
    text: 'If your order has not arrived within the estimated delivery timeframe, please contact us at gchethan2032@gmail.com with your order number. We will coordinate with our courier partner and keep you updated on the status of your shipment.',
  },
  {
    id: '4.8',
    title: 'Damaged in Transit',
    text: 'If your order arrives damaged due to transit, please contact us within 48 hours of delivery with photos of the damaged packaging and item. We will arrange a replacement or issue a full refund as applicable.',
  },
];

const returnPolicy = [
  {
    title: 'Return & Exchange Policy',
    items: [
      { q: 'Return Window', a: '15 days from the date of delivery. Items must be unused, unwashed, with original tags intact.' },
      { q: 'Non-Returnable Items', a: 'Limited edition items, Archive Series, and sale items are final sale and cannot be returned or exchanged.' },
      { q: 'How to Return', a: 'Email gchethan2032@gmail.com with your order number. Our team will provide a return label within 24 hours.' },
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
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Fulfillment & Operations</p>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Shipping & Delivery</h1>
          <p className="text-neutral-500 text-sm tracking-wider">Last Updated: May 2025</p>
        </motion.div>
      </div>

      <div className="section-padding py-16 max-w-3xl">
        {/* Intro */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mb-16 text-neutral-400 text-base leading-relaxed font-light"
        >
          At ARITKX, we strive to deliver your clothing orders as quickly and safely as possible across 
          India. Please read our Shipping & Delivery Policy below.
        </motion.div>

        {/* Shipping & Delivery Sections */}
        <div className="mb-20">
          <h2 className="text-2xl font-light text-white mb-10 pb-4 border-b border-white/10 uppercase tracking-wide">
            1. Shipping & Delivery Policy
          </h2>
          <div className="space-y-12">
            {shippingPolicy.map((sec, si) => (
              <motion.div
                key={sec.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: si * 0.05 }}
                className="pb-8 border-b border-white/5"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="text-brand-accent text-sm font-semibold tracking-wider pt-1">{sec.id}</span>
                  <h3 className="text-lg font-light text-white tracking-wide">{sec.title}</h3>
                </div>
                
                <div className="pl-8 space-y-4">
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">{sec.text}</p>
                  
                  {sec.bullets && (
                    <ul className="space-y-3">
                      {sec.bullets.map((bullet, idx) => (
                        <li key={idx} className="flex items-start gap-3">
                          <span className="text-brand-accent text-xs mt-1.5">•</span>
                          <span className="text-neutral-400 text-sm leading-relaxed font-light">{bullet}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  {sec.subtext && (
                    <p className="text-neutral-500 text-xs italic leading-relaxed font-light">{sec.subtext}</p>
                  )}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Returns & Exchanges Sections */}
        <div>
          <h2 className="text-2xl font-light text-white mb-10 pb-4 border-b border-white/10 uppercase tracking-wide">
            2. Returns, Exchanges & Damage Claims
          </h2>
          <div className="space-y-12">
            {returnPolicy.map((sec, si) => (
              <motion.div
                key={sec.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="pb-8 border-b border-white/5"
              >
                <h3 className="text-lg font-light text-white mb-6 tracking-wide pl-8">{sec.title}</h3>
                <div className="space-y-6 pl-8">
                  {sec.items.map((item) => (
                    <div key={item.q} className="group">
                      <h4 className="text-brand-accent text-xs font-semibold tracking-widest uppercase mb-2">
                        {item.q}
                      </h4>
                      <p className="text-neutral-400 text-sm leading-relaxed font-light">
                        {item.a}
                      </p>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Contact Assistant Card */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 border border-white/10"
        >
          <h3 className="text-brand-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Shipping & Return Assistance
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-light mb-4">
            For any shipping, delivery, or returns queries, please reach out to us during business hours:
          </p>
          <div className="space-y-2 text-sm font-light">
            <p className="text-neutral-400">
              Email:{' '}
              <a href="mailto:gchethan2032@gmail.com" className="text-white hover:text-brand-accent hover:underline transition-colors font-medium">
                gchethan2032@gmail.com
              </a>
            </p>
            <p className="text-neutral-400">
              WhatsApp:{' '}
              <a href="https://wa.me/918499000365" target="_blank" rel="noopener noreferrer" className="text-white hover:text-brand-accent hover:underline transition-colors font-medium">
                +91 84990 00365
              </a>
            </p>
          </div>
        </motion.div>
      </div>
    </main>
  );
}
