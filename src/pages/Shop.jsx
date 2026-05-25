import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ShoppingBag, Search } from 'lucide-react';
import api from '../utils/api';

const categories = ['All', 'Tops', 'Bottoms', 'Outerwear', 'Accessories'];

export default function Shop() {
  const [allProducts, setAllProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');
  const [search, setSearch] = useState('');

  useEffect(() => {
    api.get('/products.php')
      .then(res => setAllProducts(res.data))
      .catch(() => {
        // Fallback to static products if API unavailable (dev)
        setAllProducts([]);
      })
      .finally(() => setLoading(false));
  }, []);

  const filtered = allProducts.filter((p) => {
    const matchCat = activeCategory === 'All' || p.category === activeCategory;
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const handleAddToCart = (product, size = 'M') => {
    if (typeof window.__aritkx_addToCart === 'function') {
      window.__aritkx_addToCart(product, size);
      // Trigger the cart to open
      window.dispatchEvent(new CustomEvent('aritkx:open-cart'));
    }
  };

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
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-white/10 border-t-white rounded-full animate-spin" />
          </div>
        ) : filtered.length === 0 ? (
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
                      src={product.hover_image || product.image}
                      alt={product.name}
                      className="absolute inset-0 w-full h-full object-cover opacity-0 scale-105 transition-all duration-700 group-hover:opacity-100 group-hover:scale-100"
                    />
                    {product.tag && (
                      <span className="absolute top-3 left-3 text-[10px] font-bold tracking-widest uppercase px-3 py-1.5 bg-brand-accent text-black z-10">
                        {product.tag}
                      </span>
                    )}
                    <button
                      onClick={() => handleAddToCart(product)}
                      className="quick-add-btn absolute bottom-0 left-0 right-0 z-10 bg-white text-black text-center py-3 flex items-center justify-center gap-2 text-xs font-semibold tracking-widest uppercase hover:bg-brand-accent hover:text-white transition-colors duration-300"
                    >
                      <ShoppingBag size={13} />
                      Quick Add
                    </button>
                  </div>
                  <div className="pt-4">
                    <p className="text-neutral-500 text-xs tracking-widest uppercase mb-1">{product.category}</p>
                    <div className="flex justify-between items-center">
                      <h3 className="text-white text-sm font-medium">{product.name}</h3>
                      <p className="text-brand-accent text-sm font-semibold">₹{Number(product.price).toLocaleString('en-IN')}</p>
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
