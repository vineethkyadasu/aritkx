import { NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  ShoppingBag,
  Package,
  MessageSquare,
  LogOut,
  ExternalLink,
  Menu,
  X,
  Zap,
} from 'lucide-react';
import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard },
  { label: 'Products', to: '/admin/products', icon: Package },
  { label: 'Orders', to: '/admin/orders', icon: ShoppingBag },
  { label: 'Inquiries', to: '/admin/inquiries', icon: MessageSquare },
];

export default function AdminLayout({ children }) {
  const { admin, logout } = useAuth();
  const navigate = useNavigate();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/admin/login');
  };

  const Sidebar = ({ mobile = false }) => (
    <aside
      className={`${
        mobile
          ? 'fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex flex-col'
          : 'hidden lg:flex flex-col w-64 min-h-screen bg-[#0a0a0a] border-r border-white/5'
      }`}
    >
      {/* Logo */}
      <div className="flex items-center justify-between px-6 py-6 border-b border-white/5">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 bg-[#d4ff00] rounded-sm flex items-center justify-center">
            <Zap size={16} className="text-black" />
          </div>
          <span className="font-bold text-white tracking-widest text-sm uppercase">ARITKX</span>
        </Link>
        {mobile && (
          <button onClick={() => setSidebarOpen(false)} className="text-neutral-400 hover:text-white">
            <X size={22} />
          </button>
        )}
      </div>

      {/* Admin info */}
      <div className="px-6 py-5 border-b border-white/5">
        <div className="w-10 h-10 rounded-full bg-[#d4ff00]/10 border border-[#d4ff00]/30 flex items-center justify-center mb-3">
          <span className="text-[#d4ff00] text-sm font-bold">
            {admin?.name?.[0]?.toUpperCase() || 'A'}
          </span>
        </div>
        <p className="text-white text-sm font-semibold">{admin?.name || 'Admin'}</p>
        <p className="text-neutral-500 text-xs mt-0.5 truncate">{admin?.email}</p>
      </div>

      {/* Nav Items */}
      <nav className="flex-1 px-3 py-4 space-y-1">
        {navItems.map(({ label, to, icon: Icon }) => (
          <NavLink
            key={to}
            to={to}
            onClick={() => mobile && setSidebarOpen(false)}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium tracking-wide transition-all duration-200 ${
                isActive
                  ? 'bg-[#d4ff00]/10 text-[#d4ff00] border border-[#d4ff00]/20'
                  : 'text-neutral-400 hover:text-white hover:bg-white/5'
              }`
            }
          >
            <Icon size={17} />
            {label}
          </NavLink>
        ))}
      </nav>

      {/* Bottom Actions */}
      <div className="px-3 pb-6 space-y-1 border-t border-white/5 pt-4">
        <Link
          to="/"
          target="_blank"
          className="flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-neutral-400 hover:text-white hover:bg-white/5 transition-all duration-200"
        >
          <ExternalLink size={17} />
          View Store
        </Link>
        <button
          onClick={handleLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-all duration-200"
        >
          <LogOut size={17} />
          Logout
        </button>
      </div>
    </aside>
  );

  return (
    <div className="flex min-h-screen bg-[#080808]">
      {/* Desktop Sidebar */}
      <Sidebar />

      {/* Mobile Sidebar Overlay */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.div
            initial={{ opacity: 0, x: -300 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -300 }}
            transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="lg:hidden"
          >
            <Sidebar mobile />
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Top Bar */}
        <header className="sticky top-0 z-30 bg-[#080808]/80 backdrop-blur-md border-b border-white/5 px-6 py-4 flex items-center justify-between">
          <button
            className="lg:hidden text-neutral-400 hover:text-white transition-colors"
            onClick={() => setSidebarOpen(true)}
          >
            <Menu size={22} />
          </button>
          <div className="hidden lg:block" />
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-[#d4ff00] animate-pulse" />
            <span className="text-neutral-400 text-xs tracking-widest uppercase">Admin Panel</span>
          </div>
        </header>

        {/* Page Content */}
        <main className="flex-1 p-6 overflow-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
