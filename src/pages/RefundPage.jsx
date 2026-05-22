import { motion } from 'framer-motion';

const sections = [
  {
    number: '3.1',
    title: 'Cancellations',
    text: 'You may cancel your order within 24 hours of placing it, provided it has not yet been dispatched. To request a cancellation, please contact us immediately at gchethan2032@gmail.com with your order number.',
    subtext: 'Once an order has been dispatched, it cannot be cancelled. In such cases, you may initiate a return after receiving the item as per our Return Policy below.',
  },
  {
    number: '3.2',
    title: 'Returns',
    text: 'We accept returns within 14 days of delivery. To be eligible for a return, the following conditions must be met:',
    bullets: [
      'The clothing item must be unworn, unwashed, and in its original condition with all tags attached',
      'The item must be in its original packaging',
      'A valid proof of purchase (order number or receipt) must be provided',
      'The return request must be raised within 14 days of the delivery date',
    ],
  },
  {
    number: '3.3',
    title: 'How to Initiate a Return',
    text: 'To start a return, please follow these steps:',
    bullets: [
      'Contact us at gchethan2032@gmail.com within 14 days of receiving your order',
      'Provide your order number and reason for return',
      'Our team will review your request and respond within 2-3 business days',
      'If approved, we will share the return address and instructions',
    ],
  },
  {
    number: '3.4',
    title: 'Refund Process',
    text: 'Once we receive and inspect the returned item, we will notify you of the approval or rejection of your refund. If approved, your refund will be processed within 5-7 business days and credited back to your original payment method.',
    subtext: 'Please note that the time taken for the refund to reflect in your account may vary depending on your bank or payment provider.',
  },
  {
    number: '3.5',
    title: 'Return Shipping',
    text: 'Customers are responsible for return shipping costs unless the item arrives damaged or incorrect. In cases where ARITKX is at fault (wrong item sent or item arrived damaged), we will cover the return shipping cost in full.',
    subtext: 'We recommend using a trackable shipping method for returns. ARITKX is not responsible for returns that are lost or damaged in transit.',
  },
  {
    number: '3.6',
    title: 'Damaged or Incorrect Items',
    text: 'If you receive a damaged or incorrect item, please contact us within 48 hours of delivery with the following:',
    bullets: [
      'Your order number',
      'Clear photos of the damaged or incorrect item',
      'A brief description of the issue',
    ],
    subtext: 'We will arrange a replacement or issue a full refund at no additional cost to you.',
  },
  {
    number: '3.7',
    title: 'Exchange Policy',
    text: 'At this time, we do not offer direct exchanges. If you would like a different size or colour, please return your item for a refund and place a new order.',
  },
];

export default function RefundPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Refunds & Returns</p>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Refund & Cancellation Policy</h1>
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
          At ARITKX, we want you to love what you ordered. If something is not right, we are here to 
          help. Please read our Refund and Cancellation Policy carefully.
        </motion.div>

        {/* Sections */}
        <div className="space-y-14">
          {sections.map((sec, si) => (
            <motion.div
              key={sec.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: si * 0.05 }}
              className="border-b border-white/5 pb-10"
            >
              <div className="flex items-start gap-4 mb-4">
                <span className="text-brand-accent text-sm font-semibold tracking-wider pt-1">{sec.number}</span>
                <h2 className="text-xl font-light text-white tracking-wide">{sec.title}</h2>
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

        {/* Contact Block */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mt-16 p-8 border border-white/10"
        >
          <h3 className="text-brand-accent text-xs font-semibold tracking-widest uppercase mb-3">
            Returns Assistance
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-light mb-4">
            For any returns, cancellations, or refund queries, please contact ARITKX support at:
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
