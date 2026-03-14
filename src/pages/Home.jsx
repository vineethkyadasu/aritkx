import Hero from '../components/home/Hero';
import FeaturedProducts from '../components/home/FeaturedProducts';
import Collections from '../components/home/Collections';
import Lookbook from '../components/home/Lookbook';
import BrandStory from '../components/home/BrandStory';
import CustomerTrust from '../components/home/CustomerTrust';
import CTA from '../components/home/CTA';

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturedProducts />
      <Collections />
      <Lookbook />
      <BrandStory />
      <CustomerTrust />
      <CTA />
    </main>
  );
}
