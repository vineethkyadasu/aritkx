import { useState } from 'react';
import { motion } from 'framer-motion';
import { Mail, Instagram, Twitter, MessageCircle } from 'lucide-react';

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
          <p className="text-neutral-400 leading-relaxed mb-10 text-base">
            Whether you have a question about sizing, an order, or just want to talk about the brand — we&apos;re here. Real human responses within 24 hours.
          </p>
          <div className="space-y-6 mb-12">
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent">
                <Mail size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Email</p>
                <p className="text-neutral-500 text-xs">hello@aritkx.com</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent">
                <MessageCircle size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">WhatsApp</p>
                <p className="text-neutral-500 text-xs">+91 9000000000</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="w-10 h-10 border border-white/10 flex items-center justify-center text-brand-accent">
                <Instagram size={16} />
              </div>
              <div>
                <p className="text-white text-sm font-medium">Instagram</p>
                <p className="text-neutral-500 text-xs">@aritkx.official</p>
              </div>
            </div>
          </div>

          {/* Hours */}
          <div className="border-t border-white/10 pt-8">
            <p className="text-xs font-semibold tracking-widest uppercase text-neutral-500 mb-4">Support Hours</p>
            <p className="text-white text-sm font-light">Monday – Saturday</p>
            <p className="text-neutral-500 text-sm">10:00 AM – 7:00 PM IST</p>
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
