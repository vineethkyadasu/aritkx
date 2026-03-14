import { useState } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Filter, Search } from 'lucide-react';

const allProducts = [
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
    name: 'Axis Track Jacket',
    price: '₹6,299',
    category: 'Outerwear',
    image: '/images/hoodie.png',
    hoverImage: '/images/hoodie.png',
    tag: null,
  },
  {
    id: 5,
    name: 'Core Long Sleeve',
    price: '₹2,999',
    category: 'Tops',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85&fit=crop',
    tag: null,
  },
  {
    id: 6,
    name: 'Minimal Joggers',
    price: '₹3,799',
    category: 'Bottoms',
    image: 'https://images.unsplash.com/photo-1539533018257-63783ebde57d?w=600&q=85&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1624378441864-6eda7ca60bd8?w=600&q=85&fit=crop',
    tag: 'New',
  },
  {
    id: 7,
    name: 'Archive Bomber',
    price: '₹8,499',
    category: 'Outerwear',
    image: 'https://images.unsplash.com/photo-1544022613-e87ca75a784a?w=600&q=85&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1491553895911-0055eca6402d?w=600&q=85&fit=crop',
    tag: 'Limited',
  },
  {
    id: 8,
    name: 'Noir Cap',
    price: '₹1,499',
    category: 'Accessories',
    image: 'https://images.unsplash.com/photo-1588850561407-ed78c282e89b?w=600&q=85&fit=crop',
    hoverImage: 'https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=600&q=85&fit=crop',
    tag: null,
  },
];

const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];

export default function Shop() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  return (
    <main className="bg-black min-h-screen pt-28">
      {/* Page header */}
      <div className="section-padding py-12 border-b border-white/5">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <p className="section-label">Browse</p>
          <h1 className="text-5xl md:text-6xl font-light text-white">The Shop</h1>
        </motion.div>
      </div>

      {/* Filters */}
      <div className="section-padding py-6 border-b border-white/5 flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between sticky top-[72px] z-30 bg-black/90 backdrop-blur-md">
        <div className="flex gap-2 flex-wrap">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-4 py-2 text-xs font-semibold tracking-widest uppercase transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-white text-black'
                  : 'border border-white/10 text-neutral-400 hover:text-white hover:border-white/30'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2 border border-white/10 px-4 py-2 focus-within:border-brand-accent transition-colors duration-300">
          <Search size={14} className="text-neutral-500" />
          <input
            type="text"
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="bg-transparent text-white text-sm placeholder-neutral-600 focus:outline-none w-40"
          />
        </div>
      </div>

      {/* Product Grid */}
      <div className="section-padding py-12">
        {filtered.length === 0 ? (
          <div className="text-center py-20 text-neutral-600">No products found.</div>
        ) : (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
            {filtered.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
              >
                <div className="product-card group cursor-pointer">
                  <div className="relative overflow-hidden aspect-[3/4] bg-neutral-900">
                    <img
                      src={product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover transition-all duration-700 group-hover:opacity-0 group-hover:scale-105"
                    />
                    <img
                      src={product.hoverImage}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                    />
                    {product.tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-brand-accent text-black z-10">
                        {product.tag}
                      </span>
                    )}
                    <div className="quick-add-btn absolute bottom-0 left-0 right-0 z-10 bg-white text-black text-center py-3 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-colors duration-300">
                      <ShoppingBag size={13} />
                      Quick Add
                    </div>
                  </div>
                  <div className="pt-4">
                    <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-sm font-medium">{product.name}</h3>
                      <p className="text-brand-accent text-sm font-semibold">{product.price}</p>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
