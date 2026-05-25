import { BrowserRouter as Router, Routes, Route, useLocation, Navigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState, useEffect } from 'react';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import SmoothScroll from './components/animation/SmoothScroll';
import CheckoutModal from './components/shop/CheckoutModal';
import { AuthProvider, useAuth } from './context/AuthContext';

import Home from './pages/Home';
import Shop from './pages/Shop';
import CollectionsPage from './pages/CollectionsPage';
import LookbookPage from './pages/LookbookPage';
import AboutPage from './pages/AboutPage';
import FAQPage from './pages/FAQPage';
import ContactPage from './pages/ContactPage';
import ShippingPage from './pages/ShippingPage';
import PrivacyPage from './pages/PrivacyPage';
import RefundPage from './pages/RefundPage';
import ScrollToTop from './components/animation/ScrollToTop';

// Admin pages
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import AdminProducts from './pages/admin/AdminProducts';
import AdminOrders from './pages/admin/AdminOrders';
import AdminInquiries from './pages/admin/AdminInquiries';

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
  exit: { opacity: 0, y: -10, transition: { duration: 0.3 } },
};

// Guard for admin routes
function RequireAdmin({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/admin/login" replace />;
}

function StoreLayout({ children }) {
  const [cartOpen, setCartOpen] = useState(false);

  useEffect(() => {
    const handler = () => setCartOpen(true);
    window.addEventListener('aritkx:open-cart', handler);
    return () => window.removeEventListener('aritkx:open-cart', handler);
  }, []);

  return (
    <>
      <Header onCartClick={() => setCartOpen(true)} />
      {children}
      <CheckoutModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </>
  );
}

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
      >
        <Routes location={location}>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/lookbook" element={<LookbookPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/faq" element={<FAQPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/shipping" element={<ShippingPage />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/refunds" element={<RefundPage />} />
        </Routes>
        <Footer />
      </motion.div>
    </AnimatePresence>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <Router>
        <ScrollToTop />
        <Routes>
          {/* ─── Admin Routes (no smooth scroll / store header) ──────────── */}
          <Route path="/admin" element={<Navigate to="/admin/login" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<RequireAdmin><AdminDashboard /></RequireAdmin>} />
          <Route path="/admin/products" element={<RequireAdmin><AdminProducts /></RequireAdmin>} />
          <Route path="/admin/orders" element={<RequireAdmin><AdminOrders /></RequireAdmin>} />
          <Route path="/admin/inquiries" element={<RequireAdmin><AdminInquiries /></RequireAdmin>} />

          {/* ─── Store Routes (with SmoothScroll + Header + Cart) ────────── */}
          <Route
            path="/*"
            element={
              <SmoothScroll>
                <StoreLayout>
                  <AnimatedRoutes />
                </StoreLayout>
              </SmoothScroll>
            }
          />
        </Routes>
      </Router>
    </AuthProvider>
  );
}
