import { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Plus, Pencil, Trash2, Search, Star, ToggleLeft, ToggleRight, Upload, X, Image as ImageIcon, Save,
} from 'lucide-react';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

const CATEGORIES = ['Tops', 'Bottoms', 'Outerwear', 'Accessories'];
const TAGS = ['Best Seller', 'Limited', 'Essential', 'New', ''];

const defaultForm = {
  name: '', description: '', price: '', category: 'Tops',
  image: '', hover_image: '', tag: '', stock: '100', featured: false, active: true,
};

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState('');
  const [filterCat, setFilterCat] = useState('All');
  const [modal, setModal] = useState(false);
  const [editing, setEditing] = useState(null);
  const [form, setForm] = useState(defaultForm);
  const [saving, setSaving] = useState(false);
  const [deleteId, setDeleteId] = useState(null);
  const [uploadLoading, setUploadLoading] = useState(false);
  const fileRef = useRef(null);

  const fetchProducts = () => {
    setLoading(true);
    api.get('/products.php')
      .then(res => setProducts(res.data))
      .finally(() => setLoading(false));
  };

  useEffect(() => { fetchProducts(); }, []);

  const filtered = products.filter(p => {
    const matchSearch = p.name.toLowerCase().includes(search.toLowerCase());
    const matchCat = filterCat === 'All' || p.category === filterCat;
    return matchSearch && matchCat;
  });

  const openAdd = () => {
    setEditing(null);
    setForm(defaultForm);
    setModal(true);
  };

  const openEdit = (p) => {
    setEditing(p.id);
    setForm({
      name: p.name, description: p.description || '', price: p.price,
      category: p.category, image: p.image || '', hover_image: p.hover_image || '',
      tag: p.tag || '', stock: p.stock, featured: !!p.featured, active: !!p.active,
    });
    setModal(true);
  };

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploadLoading(true);
    const fd = new FormData();
    fd.append('image', file);
    try {
      const res = await api.post('/upload.php', fd, { headers: { 'Content-Type': 'multipart/form-data' } });
      setForm(f => ({ ...f, image: res.data.url, hover_image: res.data.url }));
    } catch {
      alert('Image upload failed');
    } finally {
      setUploadLoading(false);
    }
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const payload = { ...form, price: parseFloat(form.price), stock: parseInt(form.stock) };
      if (editing) {
        await api.put('/products.php', { ...payload, id: editing });
      } else {
        await api.post('/products.php', payload);
      }
      setModal(false);
      fetchProducts();
    } catch (err) {
      alert(err.response?.data?.error || 'Save failed');
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/products.php?id=${id}`);
      setDeleteId(null);
      fetchProducts();
    } catch {
      alert('Delete failed');
    }
  };

  const toggleFeatured = async (p) => {
    await api.put('/products.php', { id: p.id, featured: p.featured ? 0 : 1 });
    fetchProducts();
  };

  const toggleActive = async (p) => {
    await api.put('/products.php', { id: p.id, active: p.active ? 0 : 1 });
    fetchProducts();
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-white">Products</h1>
            <p className="text-neutral-500 text-sm mt-1">{products.length} items in inventory</p>
          </div>
          <button
            onClick={openAdd}
            className="flex items-center gap-2 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-bold px-5 py-2.5 rounded-lg text-sm tracking-wide transition-colors"
          >
            <Plus size={16} />
            Add Product
          </button>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-3 mb-6">
          <div className="relative flex-1 max-w-xs">
            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500" />
            <input
              type="text"
              placeholder="Search products..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              className="w-full bg-white/5 border border-white/10 rounded-lg pl-9 pr-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
            />
          </div>
          <div className="flex gap-2 flex-wrap">
            {['All', ...CATEGORIES].map(cat => (
              <button
                key={cat}
                onClick={() => setFilterCat(cat)}
                className={`px-4 py-2 text-xs font-semibold rounded-lg tracking-wide transition-colors ${
                  filterCat === cat
                    ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/30'
                    : 'text-neutral-400 border border-white/10 hover:text-white hover:border-white/20'
                }`}
              >
                {cat}
              </button>
            ))}
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
                    {['Product', 'Category', 'Price', 'Stock', 'Tag', 'Featured', 'Active', 'Actions'].map(h => (
                      <th key={h} className="text-left px-5 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium whitespace-nowrap">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {filtered.length === 0 ? (
                    <tr>
                      <td colSpan={8} className="text-center py-16 text-neutral-600">No products found</td>
                    </tr>
                  ) : (
                    filtered.map((p) => (
                      <tr key={p.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-12 bg-neutral-900 rounded overflow-hidden flex-shrink-0">
                              {p.image ? (
                                <img src={p.image} alt={p.name} className="w-full h-full object-cover" />
                              ) : (
                                <div className="w-full h-full flex items-center justify-center">
                                  <ImageIcon size={14} className="text-neutral-700" />
                                </div>
                              )}
                            </div>
                            <div className="min-w-0">
                              <p className="text-white text-sm font-medium truncate max-w-[160px]">{p.name}</p>
                              <p className="text-neutral-600 text-xs">#{p.id}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-5 py-3 text-neutral-400 text-xs">{p.category}</td>
                        <td className="px-5 py-3 text-[#d4ff00] font-semibold">₹{Number(p.price).toLocaleString('en-IN')}</td>
                        <td className="px-5 py-3 text-neutral-300">{p.stock}</td>
                        <td className="px-5 py-3">
                          {p.tag ? (
                            <span className="px-2 py-0.5 bg-white/5 border border-white/10 rounded text-[10px] text-neutral-300">{p.tag}</span>
                          ) : (
                            <span className="text-neutral-700">—</span>
                          )}
                        </td>
                        <td className="px-5 py-3">
                          <button onClick={() => toggleFeatured(p)} className="text-neutral-500 hover:text-[#d4ff00] transition-colors">
                            {p.featured ? <Star size={16} className="text-[#d4ff00] fill-[#d4ff00]" /> : <Star size={16} />}
                          </button>
                        </td>
                        <td className="px-5 py-3">
                          <button onClick={() => toggleActive(p)} className="text-neutral-500 hover:text-white transition-colors">
                            {p.active ? <ToggleRight size={22} className="text-[#d4ff00]" /> : <ToggleLeft size={22} />}
                          </button>
                        </td>
                        <td className="px-5 py-3">
                          <div className="flex items-center gap-2">
                            <button onClick={() => openEdit(p)} className="p-1.5 text-neutral-500 hover:text-white hover:bg-white/10 rounded-lg transition-colors">
                              <Pencil size={14} />
                            </button>
                            <button onClick={() => setDeleteId(p.id)} className="p-1.5 text-neutral-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors">
                              <Trash2 size={14} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Add/Edit Modal */}
        <AnimatePresence>
          {modal && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="bg-[#111] border border-white/10 rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
              >
                <div className="flex items-center justify-between px-6 py-4 border-b border-white/8">
                  <h2 className="text-white font-bold">{editing ? 'Edit Product' : 'Add New Product'}</h2>
                  <button onClick={() => setModal(false)} className="text-neutral-500 hover:text-white transition-colors">
                    <X size={20} />
                  </button>
                </div>

                <form onSubmit={handleSave} className="p-6 space-y-5">
                  {/* Image Upload */}
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Product Image</label>
                    <div className="flex gap-3 items-start">
                      <div className="w-24 h-28 bg-neutral-900 border border-white/10 rounded-lg overflow-hidden flex-shrink-0">
                        {form.image ? (
                          <img src={form.image} alt="preview" className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center">
                            <ImageIcon size={20} className="text-neutral-700" />
                          </div>
                        )}
                      </div>
                      <div className="flex-1 space-y-2">
                        <input
                          type="text"
                          placeholder="Image URL..."
                          value={form.image}
                          onChange={e => setForm(f => ({ ...f, image: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                        />
                        <input
                          type="text"
                          placeholder="Hover image URL (optional)..."
                          value={form.hover_image}
                          onChange={e => setForm(f => ({ ...f, hover_image: e.target.value }))}
                          className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                        />
                        <input type="file" ref={fileRef} accept="image/*" className="hidden" onChange={handleImageUpload} />
                        <button
                          type="button"
                          onClick={() => fileRef.current?.click()}
                          disabled={uploadLoading}
                          className="flex items-center gap-2 text-xs text-neutral-400 hover:text-white border border-white/10 hover:border-white/20 px-3 py-2 rounded-lg transition-colors"
                        >
                          <Upload size={13} />
                          {uploadLoading ? 'Uploading...' : 'Upload from Computer'}
                        </button>
                      </div>
                    </div>
                  </div>

                  {/* Name & Category */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Name *</label>
                      <input
                        required
                        type="text"
                        value={form.name}
                        onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                        placeholder="Product name"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Category</label>
                      <select
                        value={form.category}
                        onChange={e => setForm(f => ({ ...f, category: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                      >
                        {CATEGORIES.map(c => <option key={c} value={c} className="bg-neutral-900">{c}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Price, Stock, Tag */}
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Price (₹) *</label>
                      <input
                        required
                        type="number"
                        min="0"
                        step="0.01"
                        value={form.price}
                        onChange={e => setForm(f => ({ ...f, price: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                        placeholder="2499"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Stock</label>
                      <input
                        type="number"
                        min="0"
                        value={form.stock}
                        onChange={e => setForm(f => ({ ...f, stock: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                        placeholder="100"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Tag</label>
                      <select
                        value={form.tag}
                        onChange={e => setForm(f => ({ ...f, tag: e.target.value }))}
                        className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors"
                      >
                        {TAGS.map(t => <option key={t} value={t} className="bg-neutral-900">{t || 'None'}</option>)}
                      </select>
                    </div>
                  </div>

                  {/* Description */}
                  <div>
                    <label className="text-xs text-neutral-400 tracking-widest uppercase block mb-2">Description</label>
                    <textarea
                      rows={3}
                      value={form.description}
                      onChange={e => setForm(f => ({ ...f, description: e.target.value }))}
                      className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-2.5 text-white placeholder-neutral-600 text-sm focus:outline-none focus:border-[#d4ff00]/40 transition-colors resize-none"
                      placeholder="Product description..."
                    />
                  </div>

                  {/* Toggles */}
                  <div className="flex items-center gap-6">
                    {[['featured', 'Featured on Home'], ['active', 'Active (Visible)']].map(([key, label]) => (
                      <label key={key} className="flex items-center gap-3 cursor-pointer">
                        <div
                          onClick={() => setForm(f => ({ ...f, [key]: !f[key] }))}
                          className={`w-10 h-6 rounded-full transition-colors relative ${form[key] ? 'bg-[#d4ff00]' : 'bg-white/10'}`}
                        >
                          <div className={`absolute top-1 w-4 h-4 bg-black rounded-full transition-transform ${form[key] ? 'left-5' : 'left-1'}`} />
                        </div>
                        <span className="text-sm text-neutral-300">{label}</span>
                      </label>
                    ))}
                  </div>

                  {/* Actions */}
                  <div className="flex justify-end gap-3 pt-2">
                    <button type="button" onClick={() => setModal(false)} className="px-5 py-2.5 border border-white/10 text-neutral-400 hover:text-white rounded-lg text-sm transition-colors">
                      Cancel
                    </button>
                    <button
                      type="submit"
                      disabled={saving}
                      className="flex items-center gap-2 bg-[#d4ff00] hover:bg-[#bfe600] text-black font-bold px-6 py-2.5 rounded-lg text-sm transition-colors disabled:opacity-60"
                    >
                      <Save size={15} />
                      {saving ? 'Saving...' : editing ? 'Update Product' : 'Create Product'}
                    </button>
                  </div>
                </form>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Delete Confirm Modal */}
        <AnimatePresence>
          {deleteId && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#111] border border-white/10 rounded-2xl p-8 max-w-sm w-full text-center"
              >
                <div className="w-14 h-14 bg-red-500/10 border border-red-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Trash2 size={22} className="text-red-400" />
                </div>
                <h3 className="text-white font-bold text-lg mb-2">Delete Product?</h3>
                <p className="text-neutral-500 text-sm mb-6">This action cannot be undone.</p>
                <div className="flex gap-3">
                  <button onClick={() => setDeleteId(null)} className="flex-1 border border-white/10 text-neutral-400 py-2.5 rounded-lg hover:text-white transition-colors text-sm">Cancel</button>
                  <button onClick={() => handleDelete(deleteId)} className="flex-1 bg-red-500 hover:bg-red-600 text-white font-bold py-2.5 rounded-lg text-sm transition-colors">Delete</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </AdminLayout>
  );
}
