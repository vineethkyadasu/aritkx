import { motion } from 'framer-motion';
import BrandStory from '../components/home/BrandStory';
import CustomerTrust from '../components/home/CustomerTrust';
import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

export default function AboutPage() {
  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <p className="section-label">Who We Are</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">About ARITKX</h1>
        </motion.div>
      </div>

      {/* Mission banner */}
      <div className="relative overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1920&q=90&fit=crop"
          alt="Brand Mission"
          className="w-full h-[50vh] object-cover opacity-30"
        />
        <div className="absolute inset-0 flex items-center justify-center section-padding">
          <motion.blockquote
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-3xl md:text-5xl font-light text-white text-center italic leading-tight max-w-4xl"
          >
            &ldquo;Welcome to ARITKX — Elevated Culture.&rdquo;
          </motion.blockquote>
        </div>
      </div>

      {/* Elevated Culture Section */}
      <section className="section-padding py-24 bg-black border-b border-white/5">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex flex-col justify-start"
          >
            <p className="section-label mb-2">The Philosophy</p>
            <h2 className="text-3xl font-light text-white mb-6">Elevated Culture</h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              ARITKX is an online clothing brand built around the idea of Elevated Culture — where 
              fashion meets identity, attitude, and self-expression. We are passionate about delivering 
              quality clothing that speaks to those who dare to stand out.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.15 }}
            className="flex flex-col justify-start"
          >
            <p className="section-label mb-2">Our Experience</p>
            <h2 className="text-3xl font-light text-white mb-6">Online First</h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              We are a proudly online-first brand, bringing our collections directly to your doorstep across 
              India. Whether you are looking for everyday essentials or statement pieces, ARITKX is here 
              to elevate your wardrobe.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-start"
          >
            <p className="section-label mb-2">Our Origins</p>
            <h2 className="text-3xl font-light text-white mb-6">Bhainsa, Telangana</h2>
            <p className="text-neutral-400 text-sm leading-relaxed font-light">
              Based in Bhainsa, Telangana, we operate entirely online — making it easy for customers 
              across India to discover and shop our collections from the comfort of their homes.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Brand Story */}
      <BrandStory />

      {/* Values */}
      <section className="section-padding py-24 bg-neutral-950">
        <div className="text-center mb-16">
          <p className="section-label">What We Stand For</p>
          <h2 className="section-title text-white">Our Values</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { title: 'Craftsmanship', emoji: '✦', desc: 'Every stitch, cut, and material is chosen with purpose. We don\'t compromise.' },
            { title: 'Identity', emoji: '◈', desc: 'Fashion is self-expression. ARITKX gives you the canvas to define yourself.' },
            { title: 'Innovation', emoji: '⬡', desc: 'Born from tech culture, we push boundaries in both design and retail experience.' },
          ].map((val, i) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.15 }}
              className="border border-white/10 p-10 hover:border-brand-accent/40 transition-colors duration-500"
            >
              <span className="text-brand-accent text-2xl block mb-6">{val.emoji}</span>
              <h3 className="text-white text-xl font-light mb-4">{val.title}</h3>
              <p className="text-neutral-500 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <CustomerTrust />

      {/* CTA */}
      <div className="section-padding py-20 text-center bg-black border-t border-white/5">
        <p className="section-label mb-4">Ready?</p>
        <h2 className="text-4xl font-light text-white mb-8">Explore the Full Collection</h2>
        <Link to="/shop" className="btn-primary inline-flex items-center gap-2 group">
          Shop Now <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
        </Link>
      </div>
    </main>
  );
}
