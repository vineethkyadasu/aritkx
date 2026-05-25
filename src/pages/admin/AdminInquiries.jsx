import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Search, X, MessageSquare, Mail, Clock, CheckCheck } from 'lucide-react';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const STATUS_OPTIONS = ['New', 'Read', 'Replied'];
const STATUS_STYLES = {
  New:     { bg: '#f59e0b18', text: '#f59e0b', border: '#f59e0b30', icon: MessageSquare },
  Read:    { bg: '#3b82f618', text: '#3b82f6', border: '#3b82f630', icon: Mail },
  Replied: { bg: '#22c55e18', text: '#22c55e', border: '#22c55e30', icon: CheckCheck },
};

export default function AdminInquiries() {
  const [inquiries, setInquiries] = useState([]);
  const [loading, setLoading]   = useState(true);
  const [search, setSearch]     = useState('');
  const [filterStatus, setFilterStatus] = useState('All');
  const [selected, setSelected] = useState(null);

  const fetchInquiries = () => {
    setLoading(true);
    api.get('/inquiries.php')
      .then(res => setInquiries(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchInquiries(); }, []);

  // Auto-mark as Read when opening
  const openInquiry = async (inq) => {
    setSelected(inq);
    if (inq.status === 'New') {
      try {
        await api.put('/inquiries.php', { id: inq.id, status: 'Read' });
        setInquiries(prev => prev.map(i => i.id === inq.id ? { ...i, status: 'Read' } : i));
        setSelected(prev => ({ ...prev, status: 'Read' }));
      } catch {}
    }
  };

  const updateStatus = async (id, status) => {
    await api.put('/inquiries.php', { id, status });
    setInquiries(prev => prev.map(i => i.id === id ? { ...i, status } : i));
    if (selected?.id === id) setSelected(prev => ({ ...prev, status }));
  };

  const deleteInquiry = async (id) => {
    await api.delete(`/inquiries.php?id=${id}`);
    setInquiries(prev => prev.filter(i => i.id !== id));
    if (selected?.id === id) setSelected(null);
  };

  const filtered = inquiries.filter(inq => {
    const matchSearch = inq.name.toLowerCase().includes(search.toLowerCase()) ||
      inq.email.toLowerCase().includes(search.toLowerCase()) ||
      inq.subject?.toLowerCase().includes(search.toLowerCase());
    const matchStatus = filterStatus === 'All' || inq.status === filterStatus;
    return matchSearch && matchStatus;
  });

  const newCount = inquiries.filter(i => i.status === 'New').length;

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white flex items-center gap-3">
              Inquiries
              {newCount > 0 && (
                <span className="bg-[#f59e0b] text-black text-xs font-bold px-2.5 py-0.5 rounded-full">
                  {newCount} New
                </span>
              )}
            </h1>
            <p className="text-neutral-500 text-sm mt-1">{inquiries.length} total messages</p>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search inquiries..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
            />
          </div>
          <div className="flex gap-2">
            {['All', ...STATUS_OPTIONS].map(s => {
              const style = STATUS_STYLES[s];
              return (
                <button
                  key={s}
                  onClick={() => setFilterStatus(s)}
                  className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wide transition-colors ${
                    filterStatus === s && style
                      ? ''
                      : filterStatus === s
                        ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30'
                        : 'text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                  }`}
                  style={filterStatus === s && style ? { backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` } : {}}
                >
                  {s}
                </button>
              );
            })}
          </div>
        </div>

        {/* Inquiry List */}
        {loading ? (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#d4ff00] rounded-full animate-spin" />
          </div>
        ) : (
          <div className="space-y-2">
            {filtered.length === 0 ? (
              <div className="text-center py-16 text-neutral-600 bg-[#0f0f0f] border border-white/8 rounded-xl">
                No inquiries found
              </div>
            ) : (
              filtered.map(inq => {
                const style = STATUS_STYLES[inq.status] || STATUS_STYLES.New;
                const Icon = style.icon;
                return (
                  <motion.div
                    key={inq.id}
                    layout
                    className={`bg-[#0f0f0f] border rounded-xl px-5 py-4 cursor-pointer hover:border-white/15 transition-all duration-200 ${
                      inq.status === 'New' ? 'border-[#f59e0b]/20' : 'border-white/8'
                    }`}
                    onClick={() => openInquiry(inq)}
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex items-start gap-3 min-w-0">
                        <div className="w-9 h-9 rounded-full flex-shrink-0 flex items-center justify-center" style={{ backgroundColor: style.bg, border: `1px solid ${style.border}` }}>
                          <Icon size={15} style={{ color: style.text }} />
                        </div>
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <p className={`font-semibold text-sm ${inq.status === 'New' ? 'text-white' : 'text-neutral-300'}`}>{inq.name}</p>
                            {inq.status === 'New' && (
                              <span className="w-1.5 h-1.5 rounded-full bg-[#f59e0b] flex-shrink-0" />
                            )}
                          </div>
                          <p className="text-neutral-500 text-xs mt-0.5">{inq.email}</p>
                          <p className="text-neutral-400 text-sm mt-1 truncate">{inq.subject || 'General Inquiry'}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className="text-[10px] font-bold tracking-wider uppercase px-2.5 py-1 rounded-full"
                          style={{ backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }}
                        >
                          {inq.status}
                        </span>
                        <div className="flex items-center gap-1 text-neutral-600 text-xs">
                          <Clock size={11} />
                          {new Date(inq.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short' })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                );
              })
            )}
          </div>
        )}
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-start justify-end"
            onClick={e => e.target === e.currentTarget && setSelected(null)}
          >
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
              className="w-full max-w-md h-screen bg-[#111] border-l border-white/10 overflow-y-auto flex flex-col"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/8 sticky top-0 bg-[#111] z-10">
                <h2 className="text-white font-bold">Message</h2>
                <div className="flex items-center gap-3">
                  <button
                    onClick={() => deleteInquiry(selected.id)}
                    className="text-xs text-red-400 hover:text-red-300 border border-red-500/20 hover:border-red-500/40 px-3 py-1.5 rounded-lg transition-colors"
                  >
                    Delete
                  </button>
                  <button onClick={() => setSelected(null)} className="text-neutral-500 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* From */}
                <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5 space-y-2">
                  <p className="text-white font-bold text-lg">{selected.name}</p>
                  <p className="text-neutral-400 text-sm">{selected.email}</p>
                  {selected.subject && (
                    <p className="text-neutral-300 text-sm font-medium pt-1">
                      Re: {selected.subject}
                    </p>
                  )}
                </div>

                {/* Message */}
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-3">Message</p>
                  <div className="bg-white/[0.03] border border-white/8 rounded-xl p-5">
                    <p className="text-neutral-200 text-sm leading-relaxed whitespace-pre-wrap">{selected.message}</p>
                  </div>
                </div>

                {/* Status Update */}
                <div>
                  <p className="text-xs text-neutral-500 uppercase tracking-widest mb-2">Update Status</p>
                  <div className="flex gap-2">
                    {STATUS_OPTIONS.map(s => {
                      const style = STATUS_STYLES[s];
                      return (
                        <button
                          key={s}
                          onClick={() => updateStatus(selected.id, s)}
                          className="flex-1 py-2 text-xs font-bold tracking-wider uppercase rounded-lg transition-colors"
                          style={selected.status === s
                            ? { backgroundColor: style.bg, color: style.text, border: `1px solid ${style.border}` }
                            : { border: '1px solid rgba(255,255,255,0.1)', color: '#666' }
                          }
                        >
                          {s}
                        </button>
                      );
                    })}
                  </div>
                </div>

                <p className="text-neutral-600 text-xs text-center">
                  Received: {new Date(selected.created_at).toLocaleString('en-IN')}
                </p>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </AdminLayout>
  );
}
