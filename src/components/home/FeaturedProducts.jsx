import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ShoppingBag } from 'lucide-react';

const products = [
  {
    id: 1,
    name: 'Void Oversized Tee',
    price: '₹2,499',
    category: 'Tops',
    image: '/images/void-tee.png',
    hoverImage: '/images/void-tee.png',
    tag: 'Best Seller',
  },
  {
    id: 2,
    name: 'Shadow Cargo Pants',
    price: '₹4,999',
    category: 'Bottoms',
    image: '/images/cargo-pants.png',
    hoverImage: '/images/cargo-pants.png',
    tag: 'Essential',
  },
  {
    id: 3,
    name: 'Monolith Hoodie',
    price: '₹5,499',
    category: 'Outerwear',
    image: '/images/hoodie.png',
    hoverImage: '/images/hoodie.png',
    tag: 'Limited',
  },
  {
    id: 4,
    name: 'Minimal Joggers',
    price: '₹3,799',
    category: 'Bottoms',
    image: '/images/cargo-pants.png',
    hoverImage: '/images/cargo-pants.png',
    tag: 'New',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.1, ease: [0.16, 1, 0.3, 1] },
  }),
};

export default function FeaturedProducts() {
  return (
    <section className="bg-black section-padding py-24 md:py-32">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
        <div>
          <p className="section-label">Curated Pieces</p>
          <h2 className="section-title text-white">
            Featured <span className="italic font-thin">Collection</span>
          </h2>
        </div>
        <Link to="/shop" className="group flex items-center gap-2 text-sm text-neutral-400 hover:text-white border-b border-white/20 hover:border-white pb-1 transition-all duration-300 self-start md:self-auto">
          View All Products
          <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
        </Link>
      </div>

      {/* Product Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
        {products.map((product, i) => (
          <motion.div
            key={product.id}
            variants={cardVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-50px' }}
            custom={i}
          >
            <ProductCard product={product} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

function ProductCard({ product }) {
  return (
    <div className="product-card group">
      {/* Image wrapper */}
      <div className="relative overflow-hidden aspect-[3/4] bg-neutral-900">
        {/* Main image */}
        <img
          src={product.image}
          alt={product.name}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-expo-out group-hover:opacity-0 group-hover:scale-105"
        />
        {/* Hover image */}
        <img
          src={product.hoverImage}
          alt={product.name + ' hover'}
          className="absolute inset-0 w-full h-full object-cover transition-all duration-700 ease-expo-out opacity-0 scale-105 group-hover:opacity-100 group-hover:scale-100"
        />

        {/* Tag */}
        {product.tag && (
          <span className="absolute top-4 left-4 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-brand-accent text-black z-10">
            {product.tag}
          </span>
        )}

        {/* Quick add */}
        <div className="quick-add-btn absolute bottom-0 left-0 right-0 z-10 bg-white text-black text-center py-3.5 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-colors duration-300 cursor-pointer">
          <ShoppingBag size={14} />
          Quick Add
        </div>
      </div>

      {/* Info */}
      <div className="pt-4 pb-2">
        <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">{product.category}</p>
        <div className="flex justify-between items-center">
          <h3 className="text-white text-sm font-medium">{product.name}</h3>
          <p className="text-brand-accent text-sm font-semibold">{product.price}</p>
        </div>
      </div>
    </div>
  );
}
