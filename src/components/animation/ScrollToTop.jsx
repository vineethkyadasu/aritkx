import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const seoData = {
  '/': {
    title: 'ARITKX — Modern Streetwear Crafted for Identity',
    description: 'Welcome to ARITKX — Elevated Culture. Premium minimal luxury streetwear from Bhainsa, Telangana, India. Everyday essentials and statement pieces.'
  },
  '/shop': {
    title: 'Shop Premium Minimal Streetwear — ARITKX',
    description: 'Explore our collection of everyday essentials and statement streetwear pieces. Premium cotton hoodies, oversized t-shirts, and luxury minimalism.'
  },
  '/collections': {
    title: 'Collections — ARITKX',
    description: 'Discover our curated collections and seasonal drops. Modern streetwear designed for identity and self-expression.'
  },
  '/lookbook': {
    title: 'Lookbook — ARITKX',
    description: 'Browse the ARITKX visual lookbook. Minimal aesthetics, bold streetwear, and elevated self-expression.'
  },
  '/about': {
    title: 'About Us — ARITKX',
    description: 'Learn about ARITKX — Elevated Culture. An online-first clothing brand based in Bhainsa, Telangana, delivering premium minimal streetwear.'
  },
  '/faq': {
    title: 'Frequently Asked Questions — ARITKX',
    description: 'Got questions? Find answers about standard and express shipping, size guides, returns, exchanges, and product care guidelines.'
  },
  '/contact': {
    title: 'Contact Us — ARITKX',
    description: 'We would love to hear from you. Contact ARITKX for inquiries via email, call, or WhatsApp. Real human responses within 24 hours.'
  },
  '/shipping': {
    title: 'Shipping & Delivery Policy — ARITKX',
    description: 'Read the ARITKX shipping and delivery guidelines. Order processing times, Pan-India delivery timeframes, and tracking details.'
  },
  '/privacy': {
    title: 'Privacy Policy — ARITKX',
    description: 'Your privacy is our priority. Read our privacy policy to understand how we collect, safeguard, and secure your personal data under Indian Law.'
  },
  '/refunds': {
    title: 'Refund & Cancellation Policy — ARITKX',
    description: 'Learn about our cancellation timelines, return conditions, refund processes, return shipping guidelines, and exchange policy.'
  }
};

const ScrollToTop = () => {
  const location = useLocation();

  useEffect(() => {
    // Scroll to top
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' });

    // Dynamic SEO
    const path = location.pathname;
    const meta = seoData[path] || seoData['/'];
    
    // Set title
    document.title = meta.title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', meta.description);
    } else {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      metaDescription.setAttribute('content', meta.description);
      document.head.appendChild(metaDescription);
    }
  }, [location.pathname]);

  return null;
};

export default ScrollToTop;
