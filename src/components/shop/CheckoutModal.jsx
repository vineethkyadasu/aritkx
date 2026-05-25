import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Plus, Minus, Trash2, ChevronRight, CheckCircle, Package } from 'lucide-react';
import api from '../../utils/api';

const SIZES = ['XS', 'S', 'M', 'L', 'XL', 'XXL'];

export default function CheckoutModal({ isOpen, onClose }) {
  const [cart, setCart] = useState([]);
  const [step, setStep] = useState('cart'); // cart | checkout | success
  const [form, setForm] = useState({
    customer_name: '', customer_email: '', customer_phone: '',
    shipping_address: '', notes: '',
  });
  const [placing, setPlacing] = useState(false);
  const [orderId, setOrderId] = useState(null);

  // Expose addToCart globally so Shop can call it
  if (typeof window !== 'undefined') {
    window.__aritkx_addToCart = (product, size = 'M') => {
      setCart(prev => {
        const existing = prev.find(i => i.product_id === product.id && i.size === size);
        if (existing) {
          return prev.map(i =>
            i.product_id === product.id && i.size === size
              ? { ...i, quantity: i.quantity + 1 }
              : i
          );
        }
        return [...prev, {
          product_id: product.id,
          name: product.name,
          price: parseFloat(product.price),
          quantity: 1,
          size,
          image: product.image,
        }];
      });
    };
  }

  const updateQty = (product_id, size, delta) => {
    setCart(prev =>
      prev
        .map(i => i.product_id === product_id && i.size === size ? { ...i, quantity: i.quantity + delta } : i)
        .filter(i => i.quantity > 0)
    );
  };

  const removeItem = (product_id, size) => {
    setCart(prev => prev.filter(i => !(i.product_id === product_id && i.size === size)));
  };

  const total = cart.reduce((s, i) => s + i.price * i.quantity, 0);

  const handlePlaceOrder = async (e) => {
    e.preventDefault();
    if (cart.length === 0) return;
    setPlacing(true);
    try {
      const res = await api.post('/orders.php', {
        ...form,
        items: cart.map(i => ({
          product_id: i.product_id,
          name: i.name,
          price: i.price,
          quantity: i.quantity,
          size: i.size,
        })),
      });
      setOrderId(res.data.order_id);
      setStep('success');
      setCart([]);
    } catch (err) {
      alert(err.response?.data?.error || 'Failed to place order. Please try again.');
    } finally {
      setPlacing(false);
    }
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setStep('cart');
      setOrderId(null);
      setForm({ customer_name: '', customer_email: '', customer_phone: '', shipping_address: '', notes: '' });
    }, 400);
  };

  const cartCount = cart.reduce((s, i) => s + i.quantity, 0);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-50 bg-black/85 backdrop-blur-sm flex items-start justify-end"
          onClick={e => e.target === e.currentTarget && handleClose()}
        >
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
            className="w-full max-w-md h-screen bg-[#0a0a0a] border-l border-white/8 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-5 border-b border-white/8">
              <div className="flex items-center gap-3">
                <ShoppingBag size={20} className="text-white" />
                <h2 className="text-white font-bold tracking-wide">
                  {step === 'cart' && `Cart ${cartCount > 0 ? `(${cartCount})` : ''}`}
                  {step === 'checkout' && 'Checkout'}
                  {step === 'success' && 'Order Placed!'}
                </h2>
              </div>
              <button onClick={handleClose} className="text-neutral-500 hover:text-white transition-colors p-1">
                <X size={20} />
              </button>
            </div>

            {/* ─── CART STEP ────────────────────────────────────────────── */}
            {step === 'cart' && (
              <>
                <div className="flex-1 overflow-y-auto px-6 py-4">
                  {cart.length === 0 ? (
                    <div className="flex flex-col items-center justify-center h-full text-center">
                      <ShoppingBag size={48} className="text-neutral-800 mb-4" />
                      <p className="text-neutral-500 text-sm">Your cart is empty</p>
                      <p className="text-neutral-700 text-xs mt-1">Browse the shop and add items</p>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      {cart.map(item => (
                        <div key={`${item.product_id}-${item.size}`} className="flex gap-4 bg-white/[0.03] border border-white/8 rounded-xl p-4">
                          <div className="w-16 h-20 bg-neutral-900 rounded-lg overflow-hidden flex-shrink-0">
                            {item.image ? (
                              <img src={item.image} alt={item.name} className="w-full h-full object-cover" />
                            ) : (
                              <div className="w-full h-full flex items-center justify-center">
                                <Package size={16} className="text-neutral-700" />
                              </div>
                            )}
                          </div>
                          <div className="flex-1 min-w-0">
                            <p className="text-white text-sm font-medium truncate">{item.name}</p>
                            <p className="text-neutral-500 text-xs mt-0.5">Size: {item.size}</p>
                            <p className="text-[#d4ff00] font-bold text-sm mt-1">₹{item.price.toLocaleString('en-IN')}</p>
                            <div className="flex items-center gap-3 mt-2">
                              <div className="flex items-center gap-2 border border-white/10 rounded-lg">
                                <button onClick={() => updateQty(item.product_id, item.size, -1)} className="p-1.5 text-neutral-400 hover:text-white transition-colors">
                                  <Minus size={12} />
                                </button>
                                <span className="text-white text-sm w-5 text-center">{item.quantity}</span>
                                <button onClick={() => updateQty(item.product_id, item.size, 1)} className="p-1.5 text-neutral-400 hover:text-white transition-colors">
                                  <Plus size={12} />
                                </button>
                              </div>
                              <button onClick={() => removeItem(item.product_id, item.size)} className="text-neutral-600 hover:text-red-400 transition-colors">
                                <Trash2 size={14} />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {cart.length > 0 && (
                  <div className="px-6 pb-6 border-t border-white/8 pt-4">
                    <div className="flex items-center justify-between mb-4">
                      <span className="text-neutral-400 text-sm">Subtotal</span>
                      <span className="text-white font-bold text-lg">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                    <button
                      onClick={() => setStep('checkout')}
                      className="w-full bg-[#d4ff00] hover:bg-[#bfe600] text-black font-bold py-4 rounded-xl text-sm tracking-widest uppercase transition-colors flex items-center justify-center gap-2"
                    >
                      Proceed to Checkout <ChevronRight size={16} />
                    </button>
                  </div>
                )}
              </>
            )}

            {/* ─── CHECKOUT STEP ─────────────────────────────────────────── */}
            {step === 'checkout' && (
              <form onSubmit={handlePlaceOrder} className="flex-1 flex flex-col overflow-hidden">
                <div className="flex-1 overflow-y-auto px-6 py-5 space-y-4">
                  <div>
                    <label className="text-xs text-neutral-400 uppercase tracking-widest block mb-1.5">Full Name *</label>
                    <input
                      required
                      value={form.customer_name}
                      onChange={e => setForm(f => ({ ...f, customer_name: e.target.value }))}
                      placeholder="Your full name"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase tracking-widest block mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      value={form.customer_email}
                      onChange={e => setForm(f => ({ ...f, customer_email: e.target.value }))}
                      placeholder="your@email.com"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase tracking-widest block mb-1.5">Phone</label>
                    <input
                      type="tel"
                      value={form.customer_phone}
                      onChange={e => setForm(f => ({ ...f, customer_phone: e.target.value }))}
                      placeholder="+91 9876543210"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase tracking-widest block mb-1.5">Shipping Address *</label>
                    <textarea
                      required
                      rows={3}
                      value={form.shipping_address}
                      onChange={e => setForm(f => ({ ...f, shipping_address: e.target.value }))}
                      placeholder="Flat / House No., Street, City, State - PIN Code"
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors resize-none"
                    />
                  </div>
                  <div>
                    <label className="text-xs text-neutral-400 uppercase tracking-widest block mb-1.5">Notes (optional)</label>
                    <textarea
                      rows={2}
                      value={form.notes}
                      onChange={e => setForm(f => ({ ...f, notes: e.target.value }))}
                      placeholder="Special instructions..."
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors resize-none"
                    />
                  </div>

                  {/* Order Summary */}
                  <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 space-y-2">
                    <p className="text-neutral-500 text-xs uppercase tracking-widest mb-3">Order Summary</p>
                    {cart.map(item => (
                      <div key={`${item.product_id}-${item.size}`} className="flex justify-between text-sm">
                        <span className="text-neutral-400">{item.name} ({item.size}) ×{item.quantity}</span>
                        <span className="text-white">₹{(item.price * item.quantity).toLocaleString('en-IN')}</span>
                      </div>
                    ))}
                    <div className="border-t border-white/8 pt-2 flex justify-between font-bold">
                      <span className="text-white">Total</span>
                      <span className="text-[#d4ff00] text-lg">₹{total.toLocaleString('en-IN')}</span>
                    </div>
                  </div>
                </div>

                <div className="px-6 pb-6 border-t border-white/8 pt-4 flex gap-3">
                  <button
                    type="button"
                    onClick={() => setStep('cart')}
                    className="px-4 py-3 border border-white/10 text-neutral-400 hover:text-white rounded-xl text-sm transition-colors"
                  >
                    Back
                  </button>
                  <button
                    type="submit"
                    disabled={placing}
                    className="flex-1 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-bold py-3 rounded-xl text-sm tracking-widest uppercase transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
                  >
                    {placing ? (
                      <><span className="w-4 h-4 border-2 border-black/30 border-t-black rounded-full animate-spin" /> Placing Order...</>
                    ) : (
                      'Place Order'
                    )}
                  </button>
                </div>
              </form>
            )}

            {/* ─── SUCCESS STEP ─────────────────────────────────────────── */}
            {step === 'success' && (
              <div className="flex-1 flex flex-col items-center justify-center px-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                >
                  <div className="w-20 h-20 bg-[#d4ff00]/10 border border-[#d4ff00]/30 rounded-full flex items-center justify-center mb-6">
                    <CheckCircle size={36} className="text-[#d4ff00]" />
                  </div>
                </motion.div>
                <h3 className="text-white text-2xl font-bold mb-2">Order Confirmed!</h3>
                <p className="text-neutral-500 text-sm mb-2">
                  Order #{String(orderId).padStart(4, '0')} has been placed successfully.
                </p>
                <p className="text-neutral-600 text-xs mb-8">We'll be in touch with you shortly.</p>
                <button
                  onClick={handleClose}
                  className="bg-[#d4ff00] hover:bg-[#bfe600] text-black font-bold px-8 py-3 rounded-xl text-sm tracking-widest uppercase transition-colors"
                >
                  Continue Shopping
                </button>
              </div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
