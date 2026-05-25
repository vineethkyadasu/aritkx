import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, ChevronDown, X, Package } from 'lucide-react';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const STATUS_OPTIONS = ['Pending', 'Paid', 'Shipped', 'Delivered', 'Cancelled'];
const STATUS_COLORS = {
  Pending: { bg: '#f59e0b18', text: '#f59e0b', border: '#f59e0b30' },
  Paid:    { bg: '#3b82f618', text: '#3b82f6', border: '#3b82f630' },
  Shipped: { bg: '#8b5cf618', text: '#8b5cf6', border: '#8b5cf630' },
  Delivered:{ bg: '#22c55e18', text: '#22c55e', border: '#22c55e30' },
  Cancelled:{ bg: '#ef444418', text: '#ef4444', border: '#ef444430' },
};

export default function AdminOrders() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [updatingId, setUpdatingId] = useState(null);

  const fetchOrders = () => {
    setLoading(true);
    api.get('/orders.php')
      .then(res => setOrders(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchOrders(); }, []);

  const filtered = orders.filter(o => {
    const matchSearch = o.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      o.customer_email.toLowerCase().includes(search.toLowerCase()) ||
      String(o.id).includes(search);
    const matchStatus = filterStatus === 'All' || o.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const updateStatus = async (id, status) => {
    setUpdatingId(id);
    try {
      await api.put('/orders.php', { id, status });
      setOrders(prev => prev.map(o => o.id === id ? { ...o, status } : o));
      if (selectedOrder?.id === id) setSelectedOrder(prev => ({ ...prev, status }));
    } catch { alert('Update failed'); }
    finally { setUpdatingId(null); }
  };

  const viewOrder = async (order) => {
    try {
      const res = await api.get(`/orders.php?id=${order.id}`);
      setSelectedOrder(res.data);
    } catch {
      setSelectedOrder(order);
    }
  };

  const formatCurrency = v => `₹${Number(v || 0).toLocaleString('en-IN')}`;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Orders</h1>
          <p className="text-neutral-500 text-sm mt-1">{orders.length} total orders</p>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search by name, email, or ID..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', ...STATUS_OPTIONS].map(s => {
              const col = STATUS_COLORS[s];
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wide transition-colors ${
                    filterStatus === s && col
                      ? ''
                      : filterStatus === s
                        ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30'
                        : 'text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  style={filterStatus === s && col ? { backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` } : {}}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Table */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#d4ff00] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-white/5">
                    {['Order ID', 'Customer', 'Items', 'Total', 'Status', 'Date', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={7} className="text-center py-16 text-neutral-600">No orders found</td>
                    </tr>
                  ) : (
                    filtered.map(order => {
                      const col = STATUS_COLORS[order.status] || {};
                      return (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-5 py-4 text-white font-mono text-xs font-bold">#{String(order.id).padStart(4, '0')}</td>
                          <td className="px-5 py-4">
                            <p className="text-white text-sm">{order.customer_name}</p>
                            <p className="text-neutral-500 text-xs">{order.customer_email}</p>
                          </td>
                          <td className="px-5 py-4 text-neutral-400 text-center">{order.item_count || '—'}</td>
                          <td className="px-5 py-4 text-[#d4ff00] font-semibold">{formatCurrency(order.total_amount)}</td>
                          <td className="px-5 py-4">
                            <select
                              value={order.status}
                              onChange={e => updateStatus(order.id, e.target.value)}
                              disabled={updatingId === order.id}
                              className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full focus:outline-none cursor-pointer transition-colors disabled:opacity-60"
                              style={{ backgroundColor: col.bg, color: col.text, border: `1px solid ${col.border}` }}
                            >
                              {STATUS_OPTIONS.map(s => (
                                <option key={s} value={s} className="bg-neutral-900 text-white">{s}</option>
                              ))}
                            </select>
                          </td>
                          <td className="px-5 py-4 text-neutral-500 text-xs whitespace-nowrap">
                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                          <td className="px-5 py-4">
                            <button
                              onClick={() => viewOrder(order)}
                              className="text-xs text-neutral-400 hover:text-white border border-white/10 hover:border-white/25 px-3 py-1.5 rounded-lg transition-colors"
                            >
                              View
                            </button>
                          </td>
                        </tr>
                      );
                    })
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>

      {/* Order Detail Drawer */}
      <AnimatePresence>
        {selectedOrder && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-end"
            onClick={e => e.target === e.currentTarget && setSelectedOrder(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md h-screen bg-[#111] border-l border-white/10 overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-[#111] z-10">
                <h2 className="text-white font-bold">Order #{String(selectedOrder.id).padStart(4, '0')}</h2>
                <button onClick={() => setSelectedOrder(null)} className="text-neutral-500 hover:text-white transition-colors">
                  <X size={20} />
                </button>
              </div>

              <div className="p-6 space-y-6">
                {/* Status */}
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Status</p>
                  <select
                    value={selectedOrder.status}
                    onChange={e => { updateStatus(selectedOrder.id, e.target.value); }}
                    className="bg-white/5 border border-white/10 text-white rounded-lg px-4 py-2.5 text-sm focus:outline-none"
                  >
                    {STATUS_OPTIONS.map(s => <option key={s} value={s} className="bg-neutral-900">{s}</option>)}
                  </select>
                </div>

                {/* Customer */}
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Customer</p>
                  <div className="bg-white/[0.03] border border-white/8 rounded-xl p-4 space-y-2">
                    <p className="text-white font-semibold">{selectedOrder.customer_name}</p>
                    <p className="text-neutral-400 text-sm">{selectedOrder.customer_email}</p>
                    {selectedOrder.customer_phone && <p className="text-neutral-400 text-sm">{selectedOrder.customer_phone}</p>}
                    <div className="pt-2 border-t border-white/5">
                      <p className="text-xs text-neutral-500 mb-1">Shipping Address</p>
                      <p className="text-neutral-300 text-sm">{selectedOrder.shipping_address}</p>
                    </div>
                  </div>
                </div>

                {/* Items */}
                {selectedOrder.items && selectedOrder.items.length > 0 && (
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Items</p>
                    <div className="space-y-3">
                      {selectedOrder.items.map((item, i) => (
                        <div key={i} className="flex items-center justify-between bg-white/[0.03] border border-white/8 rounded-xl px-4 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-8 h-8 bg-neutral-800 rounded flex items-center justify-center">
                              <Package size={14} className="text-neutral-600" />
                            </div>
                            <div>
                              <p className="text-white text-sm">{item.name}</p>
                              {item.size && <p className="text-neutral-500 text-xs">Size: {item.size}</p>}
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="text-[#d4ff00] font-semibold text-sm">₹{Number(item.price).toLocaleString('en-IN')}</p>
                            <p className="text-neutral-500 text-xs">×{item.quantity}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Total */}
                <div className="flex items-center justify-between bg-[#d4ff00]/5 border border-[#d4ff00]/20 rounded-xl px-5 py-4">
                  <p className="text-white font-bold">Total Amount</p>
                  <p className="text-[#d4ff00] text-xl font-bold">₹{Number(selectedOrder.total_amount).toLocaleString('en-IN')}</p>
                </div>

                {/* Notes */}
                {selectedOrder.notes && (
                  <div>
                    <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Customer Notes</p>
                    <p className="text-neutral-300 text-sm bg-white/[0.03] border border-white/8 rounded-xl p-4">{selectedOrder.notes}</p>
                  </div>
                )}

                <p className="text-neutral-600 text-xs text-center">
                  Order placed on {new Date(selectedOrder.created_at).toLocaleString('en-IN')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
