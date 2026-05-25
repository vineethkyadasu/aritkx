import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { TrendingUp, ShoppingBag, Package, MessageSquare, IndianRupee, ArrowUpRight } from 'lucide-react';
import { Line, Doughnut } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js';
import api from '../../utils/api';
import AdminLayout from '../../components/admin/AdminLayout';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler, ArcElement, Tooltip, Legend);

const STATUS_COLORS = {
  Pending: '#f59e0b',
  Paid: '#3b82f6',
  Shipped: '#8b5cf6',
  Delivered: '#22c55e',
  Cancelled: '#ef4444',
};

const StatCard = ({ label, value, icon: Icon, color, index }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
    className="bg-[#0f0f0f] border border-white/8 rounded-xl p-6 flex items-start justify-between group hover:border-white/15 transition-colors duration-300"
  >
    <div>
      <p className="text-neutral-500 text-xs tracking-widest uppercase mb-2">{label}</p>
      <p className="text-3xl font-bold text-white">{value}</p>
    </div>
    <div className={`w-11 h-11 rounded-xl flex items-center justify-center`} style={{ backgroundColor: `${color}18`, border: `1px solid ${color}30` }}>
      <Icon size={20} style={{ color }} />
    </div>
  </motion.div>
);

export default function AdminDashboard() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    api.get('/dashboard.php')
      .then(res => setData(res.data))
      .catch(() => setError('Failed to load dashboard data'))
      .finally(() => setLoading(false));
  }, []);

  const formatCurrency = (v) =>
    `₹${Number(v || 0).toLocaleString('en-IN', { minimumFractionDigits: 0 })}`;

  const lineData = data ? {
    labels: data.sales_trend.map(d => {
      const dt = new Date(d.date);
      return dt.toLocaleDateString('en-IN', { month: 'short', day: 'numeric' });
    }),
    datasets: [{
      label: 'Revenue (₹)',
      data: data.sales_trend.map(d => d.total),
      borderColor: '#d4ff00',
      backgroundColor: 'rgba(212,255,0,0.08)',
      pointBackgroundColor: '#d4ff00',
      pointRadius: 4,
      pointHoverRadius: 7,
      tension: 0.4,
      fill: true,
    }],
  } : null;

  const donutData = data ? {
    labels: data.category_breakdown.map(c => c.category),
    datasets: [{
      data: data.category_breakdown.map(c => c.count),
      backgroundColor: ['#d4ff00', '#3b82f6', '#8b5cf6', '#f59e0b', '#22c55e', '#ec4899'],
      borderWidth: 0,
      hoverOffset: 6,
    }],
  } : null;

  const chartOptions = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: '#1a1a1a',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#d4ff00',
      },
    },
    scales: {
      x: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', font: { size: 11 } } },
      y: { grid: { color: 'rgba(255,255,255,0.05)' }, ticks: { color: '#666', font: { size: 11 }, callback: v => `₹${v}` } },
    },
  };

  const donutOptions = {
    responsive: true,
    cutout: '72%',
    plugins: {
      legend: {
        position: 'bottom',
        labels: { color: '#999', padding: 16, font: { size: 12 } },
      },
      tooltip: {
        backgroundColor: '#1a1a1a',
        borderColor: 'rgba(255,255,255,0.1)',
        borderWidth: 1,
        titleColor: '#fff',
        bodyColor: '#d4ff00',
      },
    },
  };

  return (
    <AdminLayout>
      <div className="max-w-7xl mx-auto">
        {/* Page Title */}
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-white">Dashboard</h1>
          <p className="text-neutral-500 text-sm mt-1">Welcome back, here's what's happening.</p>
        </div>

        {loading && (
          <div className="flex items-center justify-center py-32">
            <div className="w-8 h-8 border-2 border-white/10 border-t-[#d4ff00] rounded-full animate-spin" />
          </div>
        )}

        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 rounded-lg px-6 py-4 text-sm">
            {error}
          </div>
        )}

        {data && (
          <>
            {/* Stat Cards */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
              <StatCard label="Total Revenue" value={formatCurrency(data.stats.total_revenue)} icon={IndianRupee} color="#d4ff00" index={0} />
              <StatCard label="Total Orders" value={data.stats.total_orders} icon={ShoppingBag} color="#3b82f6" index={1} />
              <StatCard label="Products" value={data.stats.total_products} icon={Package} color="#8b5cf6" index={2} />
              <StatCard label="New Inquiries" value={data.stats.new_inquiries} icon={MessageSquare} color="#f59e0b" index={3} />
            </div>

            {/* Charts Row */}
            <div className="grid lg:grid-cols-3 gap-6 mb-8">
              {/* Sales Trend */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="lg:col-span-2 bg-[#0f0f0f] border border-white/8 rounded-xl p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div>
                    <h2 className="text-white font-semibold">Sales Trend</h2>
                    <p className="text-neutral-500 text-xs mt-0.5">Last 7 days</p>
                  </div>
                  <div className="flex items-center gap-1 text-[#d4ff00] text-xs font-semibold">
                    <TrendingUp size={14} />
                    Live
                  </div>
                </div>
                {lineData && lineData.labels.length > 0 ? (
                  <Line data={lineData} options={chartOptions} />
                ) : (
                  <div className="flex items-center justify-center h-48 text-neutral-600 text-sm">
                    No sales data yet
                  </div>
                )}
              </motion.div>

              {/* Category Breakdown */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="bg-[#0f0f0f] border border-white/8 rounded-xl p-6"
              >
                <h2 className="text-white font-semibold mb-1">By Category</h2>
                <p className="text-neutral-500 text-xs mb-6">Product distribution</p>
                {donutData && donutData.labels.length > 0 ? (
                  <Doughnut data={donutData} options={donutOptions} />
                ) : (
                  <div className="flex items-center justify-center h-48 text-neutral-600 text-sm">
                    No products yet
                  </div>
                )}
              </motion.div>
            </div>

            {/* Recent Orders */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="bg-[#0f0f0f] border border-white/8 rounded-xl overflow-hidden"
            >
              <div className="flex items-center justify-between px-6 py-4 border-b border-white/5">
                <h2 className="text-white font-semibold">Recent Orders</h2>
                <a href="/admin/orders" className="text-[#d4ff00] text-xs hover:underline flex items-center gap-1">
                  View All <ArrowUpRight size={12} />
                </a>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/5">
                      <th className="text-left px-6 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium">Order</th>
                      <th className="text-left px-6 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium">Customer</th>
                      <th className="text-left px-6 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium">Amount</th>
                      <th className="text-left px-6 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium">Status</th>
                      <th className="text-left px-6 py-3 text-neutral-500 text-xs tracking-widest uppercase font-medium">Date</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.recent_orders.length === 0 ? (
                      <tr>
                        <td colSpan={5} className="text-center py-12 text-neutral-600">No orders yet</td>
                      </tr>
                    ) : (
                      data.recent_orders.map((order) => (
                        <tr key={order.id} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                          <td className="px-6 py-4 text-white font-mono text-xs">#{String(order.id).padStart(4, '0')}</td>
                          <td className="px-6 py-4">
                            <p className="text-white text-sm">{order.customer_name}</p>
                            <p className="text-neutral-500 text-xs">{order.customer_email}</p>
                          </td>
                          <td className="px-6 py-4 text-[#d4ff00] font-semibold">{formatCurrency(order.total_amount)}</td>
                          <td className="px-6 py-4">
                            <span
                              className="px-3 py-1 rounded-full text-[10px] font-bold tracking-wider uppercase"
                              style={{
                                backgroundColor: `${STATUS_COLORS[order.status] || '#666'}18`,
                                color: STATUS_COLORS[order.status] || '#999',
                                border: `1px solid ${STATUS_COLORS[order.status] || '#666'}30`,
                              }}
                            >
                              {order.status}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-neutral-500 text-xs">
                            {new Date(order.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </motion.div>
          </>
        )}
      </div>
    </AdminLayout>
  );
}
