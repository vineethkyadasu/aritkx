import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, MessageCircle, MapPin, Phone } from 'lucide-react';

export default function ContactPage() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' });
  const [sent, setSent] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const handleSubmit = (e) => {
    e.preventDefault();
    setSent(true);
  };

  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Get in Touch</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">Contact Us</h1>
        </motion.div>
      </div>

      <div className="section-padding py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        {/* Left – Info */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          <p className="text-neutral-400 leading-relaxed mb-10 text-base font-light">
            We would love to hear from you! Reach out to us through any of the details below and our team will get back to you as soon as possible.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent mt-1 flex-shrink-0">
                <MapPin size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Business Address</p>
                <p className="text-neutral-400 text-sm mt-1 font-light leading-relaxed">
                  4-3-2/3, Shivaji Chowk,<br />
                  Bhainsa, Telangana — 504103, India
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Email Support</p>
                <a href="mailto:gchethan2032@gmail.com" className="text-neutral-400 hover:text-brand-accent text-sm font-light transition-colors">
                  gchethan2032@gmail.com
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">WhatsApp Support</p>
                <a href="https://wa.me/918499000365" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-accent text-sm font-light transition-colors">
                  +91 84990 00365
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                <Phone size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Phone Support (Calls)</p>
                <a href="tel:+917276559807" className="text-neutral-400 hover:text-brand-accent text-sm font-light transition-colors">
                  +91 72765 59807
                </a>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent flex-shrink-0">
                <Instagram size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Instagram</p>
                <a href="https://instagram.com/aritkx.official" target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-brand-accent text-sm font-light transition-colors">
                  @aritkx.official
                </a>
              </div>
            </div>
          </div>

          {/* Business Hours & Notice */}
          <div className="border-t border-white/10 pt-8 space-y-6">
            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-3">Business Hours</p>
              <div className="flex justify-between max-w-xs text-sm">
                <span className="text-neutral-400 font-light">Monday – Friday</span>
                <span className="text-white">9:00 AM – 10:00 PM IST</span>
              </div>
              <div className="flex justify-between max-w-xs text-sm mt-2">
                <span className="text-neutral-400 font-light">Saturday – Sunday</span>
                <span className="text-neutral-500 italic">Closed</span>
              </div>
            </div>

            <div className="p-5 border border-white/5 bg-neutral-950/50">
              <p className="text-xs font-semibold tracking-widest uppercase text-brand-accent mb-2">Online-Only Notice</p>
              <p className="text-neutral-500 text-xs leading-relaxed font-light">
                We are an online-only business and do not have a physical retail store. All orders are placed and managed through our website. For any queries, please reach out via email or WhatsApp during business hours.
              </p>
            </div>

            <div>
              <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-2">Customer Support</p>
              <p className="text-neutral-400 text-xs leading-relaxed font-light">
                Our team typically responds within 24 hours on business days. For the fastest response, we recommend reaching out via WhatsApp or email.
              </p>
            </div>
          </div>
        </motion.div>

        {/* Right – Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          {sent ? (
            <div className="h-full flex flex-col items-center justify-center text-center border border-brand-accent/20 p-16">
              <div className="text-brand-accent text-4xl mb-4">✓</div>
              <h3 className="text-2xl font-light text-white mb-3">Message Received</h3>
              <p className="text-neutral-500 text-sm">We&apos;ll get back to you within 24 hours.</p>
              <button onClick={() => setSent(false)} className="btn-outline mt-8">Send Another</button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                { name: 'name', label: 'Full Name', type: 'text', placeholder: 'Your name' },
                { name: 'email', label: 'Email', type: 'email', placeholder: 'your@email.com' },
                { name: 'subject', label: 'Subject', type: 'text', placeholder: 'Order issue, sizing, etc.' },
              ].map((field) => (
                <div key={field.name}>
                  <label className="text-xs text-neutral-500 tracking-widest uppercase mb-2 block">{field.label}</label>
                  <input
                    type={field.type}
                    name={field.name}
                    value={form[field.name]}
                    onChange={handleChange}
                    placeholder={field.placeholder}
                    required
                    className="w-full bg-neutral-900 border border-white/10 text-white placeholder-neutral-700 text-sm px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors duration-300"
                  />
                </div>
              ))}
              <div>
                <label className="text-xs text-neutral-500 tracking-widest uppercase mb-2 block">Message</label>
                <textarea
                  name="message"
                  value={form.message}
                  onChange={handleChange}
                  rows={5}
                  required
                  placeholder="Tell us how we can help..."
                  className="w-full bg-neutral-900 border border-white/10 text-white placeholder-neutral-700 text-sm px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors duration-300 resize-none"
                />
              </div>
              <button type="submit" className="btn-primary w-full justify-center">
                Send Message
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </main>
  );
}
