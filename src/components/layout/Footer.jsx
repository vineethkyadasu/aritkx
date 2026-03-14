import { Link } from 'react-router-dom';
import { Instagram, Twitter, Facebook, Youtube } from 'lucide-react';
import { useState } from 'react';

const footerLinks = {
  Shop: [
    { label: 'All Products', to: '/shop' },
    { label: 'Collections', to: '/collections' },
    { label: 'Lookbook', to: '/lookbook' },
    { label: 'New Arrivals', to: '/shop' },
  ],
  Company: [
    { label: 'About Us', to: '/about' },
    { label: 'FAQ', to: '/faq' },
    { label: 'Contact', to: '/contact' },
    { label: 'Careers', to: '/about' },
  ],
  Support: [
    { label: 'Shipping & Returns', to: '/shipping' },
    { label: 'Size Guide', to: '/shop' },
    { label: 'Track Order', to: '/contact' },
    { label: 'Privacy Policy', to: '/shipping' },
  ],
};

const socials = [
  { icon: Instagram, href: '#', label: 'Instagram' },
  { icon: Twitter, href: '#', label: 'Twitter' },
  { icon: Facebook, href: '#', label: 'Facebook' },
  { icon: Youtube, href: '#', label: 'YouTube' },
];

export default function Footer() {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail('');
    }
  };

  return (
    <footer className="bg-neutral-950 border-t border-white/5">
      {/* Newsletter */}
      <div className="section-padding py-20 border-b border-white/5">
        <div className="max-w-xl mx-auto text-center">
          <p className="section-label">Join the Inner Circle</p>
          <h2 className="text-3xl md:text-4xl font-light tracking-tight mb-4">
            Stay Ahead of the Season
          </h2>
          <p className="text-neutral-400 text-sm mb-8">
            Exclusive drops, early access, and brand stories — straight to your inbox.
          </p>
          {subscribed ? (
            <p className="text-brand-accent text-sm tracking-widest uppercase">
              ✓ You&apos;re on the list
            </p>
          ) : (
            <form onSubmit={handleSubscribe} className="flex gap-0">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Your email address"
                required
                className="flex-1 bg-neutral-900 border border-white/10 text-white placeholder-neutral-600 text-sm px-5 py-4 focus:outline-none focus:border-brand-accent transition-colors duration-300"
              />
              <button
                type="submit"
                className="bg-brand-accent text-black text-xs font-bold tracking-widest uppercase px-6 py-4 hover:bg-white transition-colors duration-300 whitespace-nowrap"
              >
                Subscribe
              </button>
            </form>
          )}
        </div>
      </div>

      {/* Links */}
      <div className="section-padding py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-block mb-4">
              <img 
                src="/logo.png" 
                alt="ARITKX Logo" 
                className="h-10 md:h-14 w-auto object-contain"
              />
            </Link>
            <p className="text-neutral-500 text-xs leading-relaxed mb-6">
              Modern streetwear crafted for identity. Premium minimalism for those who live differently.
            </p>
            <div className="flex gap-4">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  aria-label={label}
                  className="w-9 h-9 flex items-center justify-center border border-white/10 text-neutral-400 hover:text-white hover:border-white transition-all duration-300 hover:scale-110"
                >
                  <Icon size={15} />
                </a>
              ))}
            </div>
          </div>

          {/* Link groups */}
          {Object.entries(footerLinks).map(([group, links]) => (
            <div key={group}>
              <h4 className="text-xs font-semibold tracking-widest uppercase text-white mb-5">
                {group}
              </h4>
              <ul className="space-y-3">
                {links.map(({ label, to }) => (
                  <li key={label}>
                    <Link
                      to={to}
                      className="text-neutral-500 hover:text-white text-sm transition-colors duration-300"
                    >
                      {label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom bar */}
      <div className="section-padding py-6 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
        <div className="flex flex-col gap-1">
          <p className="text-neutral-600 text-[10px] md:text-xs">
            © {new Date().getFullYear()} ARITKX. All rights reserved. Founded by G Chethan.
          </p>
          <p className="text-neutral-500 text-[10px] md:text-xs tracking-widest uppercase">
            Designed and Developed by <a href="https://www.vikrin.com/" target="_blank" rel="noopener noreferrer" className="text-brand-accent hover:text-white transition-colors">Vikrin</a>
          </p>
        </div>
        <div className="flex gap-6">
          <Link to="/shipping" className="text-neutral-600 hover:text-white text-xs transition-colors duration-300">
            Privacy Policy
          </Link>
          <Link to="/shipping" className="text-neutral-600 hover:text-white text-xs transition-colors duration-300">
            Terms of Service
          </Link>
        </div>
      </div>
    </footer>
  );
}
