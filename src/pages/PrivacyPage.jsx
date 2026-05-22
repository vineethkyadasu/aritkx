import { motion } from 'framer-motion';

const sections = [
  {
    number: '2.1',
    title: 'Information We Collect',
    content: 'We may collect the following types of personal information:',
    items: [
      'Name, email address, phone number, and billing/shipping address',
      'Payment information (processed securely via our payment gateway — we do not store card details)',
      'Order history and preferences',
      'Device information, IP address, and browsing behaviour on our website',
    ],
  },
  {
    number: '2.2',
    title: 'How We Use Your Information',
    content: 'We use the information we collect to:',
    items: [
      'Process and fulfil your orders',
      'Send order confirmations and updates',
      'Respond to your enquiries and provide customer support',
      'Improve our website and services',
      'Send promotional emails (only if you have opted in)',
    ],
  },
  {
    number: '2.3',
    title: 'Sharing Your Information',
    content: 'We do not sell or rent your personal information to third parties. We may share your data with:',
    items: [
      'Delivery and logistics partners (for order fulfilment only)',
      'Payment processors (for secure transaction handling)',
      'Analytics providers (in anonymised form)',
      'Legal authorities if required by law',
    ],
  },
  {
    number: '2.4',
    title: 'Data Security',
    text: 'We implement appropriate technical and organisational measures to protect your personal data against unauthorised access, alteration, disclosure, or destruction. However, no internet transmission is 100% secure, and we cannot guarantee absolute security.',
  },
  {
    number: '2.5',
    title: 'Cookies',
    text: 'Our website uses cookies to enhance your browsing experience. You can choose to disable cookies through your browser settings, but this may affect certain features of our website.',
  },
  {
    number: '2.6',
    title: 'Your Rights',
    text: 'You have the right to access, correct, or delete your personal data held by us. To exercise these rights, please contact us at gchethan2032@gmail.com.',
  },
  {
    number: '2.7',
    title: 'Compliance with Indian Law',
    text: 'This Privacy Policy is in accordance with the Information Technology Act, 2000 and the Information Technology (Reasonable Security Practices and Procedures and Sensitive Personal Data or Information) Rules, 2011, as applicable in India.',
  },
  {
    number: '2.8',
    title: 'Changes to This Policy',
    text: 'We may update this Privacy Policy from time to time. We will notify you of any significant changes by posting the updated policy on our website with a revised date.',
  },
];

export default function PrivacyPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div 
          initial={{ opacity: 0, y: 30 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Privacy & Security</p>
          <h1 className="text-5xl md:text-6xl font-light text-white mb-4">Privacy Policy</h1>
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
          At ARITKX, we are committed to protecting your personal information and your right to 
          privacy. This Privacy Policy explains how we collect, use, and safeguard your information 
          when you visit our website.
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
              
              <div className="pl-8">
                {sec.text && (
                  <p className="text-neutral-400 text-sm leading-relaxed font-light">{sec.text}</p>
                )}
                {sec.content && (
                  <p className="text-neutral-400 text-sm leading-relaxed mb-4 font-light">{sec.content}</p>
                )}
                {sec.items && (
                  <ul className="space-y-3">
                    {sec.items.map((item, idx) => (
                      <li key={idx} className="flex items-start gap-3">
                        <span className="text-brand-accent text-xs mt-1.5">•</span>
                        <span className="text-neutral-400 text-sm leading-relaxed font-light">{item}</span>
                      </li>
                    ))}
                  </ul>
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
            Privacy Support
          </h3>
          <p className="text-neutral-400 text-sm leading-relaxed font-light">
            For any privacy-related concerns, please contact ARITKX at{' '}
            <a href="mailto:gchethan2032@gmail.com" className="text-white hover:text-brand-accent hover:underline transition-colors font-medium">
              gchethan2032@gmail.com
            </a>.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
