// Mock Backend for local preview & offline development
// This mimics the Hostinger PHP API endpoints by persisting data in localStorage.

const DEFAULT_PRODUCTS = [
  { id: 1, name: 'Void Oversized Tee', price: '2499', category: 'Tops', image: 'https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=600&q=85&fit=crop', hover_image: 'https://images.unsplash.com/photo-1583743814966-8936f5b7be1a?w=600&q=85&fit=crop', tag: 'Best Seller', description: 'Premium heavyweight cotton tee with relaxed silhouette.', size_stock: '{"S":12,"M":15,"L":8,"XL":5}', is_featured: 1 },
  { id: 2, name: 'Shadow Cargo Pants', price: '4999', category: 'Bottoms', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=600&q=85&fit=crop', hover_image: 'https://images.unsplash.com/photo-1624378441864-6eda7ca60bd8?w=600&q=85&fit=crop', tag: 'Essential', description: 'Multi-pocket tactical utility cargo pants in charcoal black.', size_stock: '{"S":5,"M":8,"L":10,"XL":3}', is_featured: 1 },
  { id: 3, name: 'Monolith Hoodie', price: '5499', category: 'Outerwear', image: 'https://images.unsplash.com/photo-1556821840-3a63f15732ce?w=600&q=85&fit=crop', hover_image: 'https://images.unsplash.com/photo-1590736969955-71cc94901144?w=600&q=85&fit=crop', tag: 'Limited', description: 'Thick fleece hoodie featuring signature high-density chest print.', size_stock: '{"S":7,"M":9,"L":6,"XL":4}', is_featured: 1 },
  { id: 4, name: 'Core Long Sleeve', price: '2999', category: 'Tops', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=600&q=85&fit=crop', hover_image: 'https://images.unsplash.com/photo-1618354691373-d851c5c3a990?w=600&q=85&fit=crop', tag: null, description: 'Standard fit long sleeve crewneck with rib knit cuffs.', size_stock: '{"S":10,"M":10,"L":10,"XL":10}', is_featured: 0 },
];

const DEFAULT_ORDERS = [
  {
    id: 1001,
    customer_name: 'Rohit Sharma',
    customer_email: 'rohit.sharma@example.com',
    customer_phone: '9876543210',
    shipping_address: 'Flat 402, Sea Breeze Apts, Bandra West, Mumbai, MH - 400050',
    total_amount: 7498,
    status: 'completed',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 3).toISOString(), // 3 days ago
    items: [
      { product_name: 'Void Oversized Tee', price: '2499', quantity: 1, size: 'L' },
      { product_name: 'Shadow Cargo Pants', price: '4999', quantity: 1, size: 'M' }
    ]
  },
  {
    id: 1002,
    customer_name: 'Ananya Roy',
    customer_email: 'ananya.roy@example.com',
    customer_phone: '9988776655',
    shipping_address: 'Sector 5, Salt Lake City, Block C-10, Kolkata, WB - 700091',
    total_amount: 5499,
    status: 'processing',
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(), // 1 day ago
    items: [
      { product_name: 'Monolith Hoodie', price: '5499', quantity: 1, size: 'M' }
    ]
  },
  {
    id: 1003,
    customer_name: 'Vikram Malhotra',
    customer_email: 'vikram.m@example.com',
    customer_phone: '9123456789',
    shipping_address: '12th Cross, Indiranagar, Double Road, Bangalore, KA - 560038',
    total_amount: 2499,
    status: 'pending',
    created_at: new Date().toISOString(), // Today
    items: [
      { product_name: 'Void Oversized Tee', price: '2499', quantity: 1, size: 'XL' }
    ]
  }
];

const DEFAULT_INQUIRIES = [
  { id: 1, name: 'Siddharth Sen', email: 'sid.sen@example.com', phone: '9876123450', subject: 'Custom Sizing Inquiry', message: 'Hey ARITKX team, love the cargo pants. Are there plans to release them in XXL anytime soon?', is_read: 0, created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 2).toISOString() },
  { id: 2, name: 'Karan Johar', email: 'karan@example.com', phone: '9911223344', subject: 'Collaboration Opportunity', message: 'Hello! We are looking to feature local premium streetwear brands in our upcoming music video production. Let us connect.', is_read: 1, created_at: new Date(Date.now() - 24 * 60 * 60 * 1000 * 5).toISOString() }
];

// Helper functions for Local Storage Data Persistence
function getStoredData(key, fallback) {
  const item = localStorage.getItem(key);
  if (!item) {
    localStorage.setItem(key, JSON.stringify(fallback));
    return fallback;
  }
  try {
    return JSON.parse(item);
  } catch (e) {
    return fallback;
  }
}

function setStoredData(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

// Check credentials helper
export function handleMockLogin(email, password) {
  if (
    (email === 'admin@aritkx.com' && password === 'Devima@0812') ||
    (email === 'admin@demo.com' && password === 'admin')
  ) {
    return {
      success: true,
      token: 'mock_aritkx_token_abc123xyz_secure',
      admin: {
        email: email,
        name: 'ARITKX Administrator'
      }
    };
  }
  throw { response: { status: 400, data: { error: 'Invalid admin credentials.' } } };
}

// Router for mocking requests
export function handleMockRequest(config) {
  const url = config.url;
  const method = config.method.toUpperCase();
  const data = config.data ? (typeof config.data === 'string' ? JSON.parse(config.data) : config.data) : null;

  // Determine endpoint
  if (url.includes('/login.php')) {
    if (method === 'POST') {
      return handleMockLogin(data.email, data.password);
    }
  }

  if (url.includes('/products.php')) {
    const products = getStoredData('mock_products', DEFAULT_PRODUCTS);
    
    if (method === 'GET') {
      const urlObj = new URL(url, 'http://localhost');
      const featured = urlObj.searchParams.get('featured');
      if (featured === '1') {
        return products.filter(p => p.is_featured === 1);
      }
      return products;
    }

    if (method === 'POST') {
      const newProduct = {
        ...data,
        id: products.length > 0 ? Math.max(...products.map(p => p.id)) + 1 : 1,
        price: String(data.price),
        is_featured: data.is_featured ? 1 : 0
      };
      products.push(newProduct);
      setStoredData('mock_products', products);
      return { success: true, product: newProduct };
    }

    if (method === 'PUT') {
      const updatedProducts = products.map(p => {
        if (p.id === Number(data.id)) {
          return { ...p, ...data, is_featured: data.is_featured ? 1 : 0 };
        }
        return p;
      });
      setStoredData('mock_products', updatedProducts);
      return { success: true };
    }

    if (method === 'DELETE') {
      // For DELETE, ID is typically in URL or query params
      const urlObj = new URL(url, 'http://localhost');
      const id = urlObj.searchParams.get('id') || data?.id;
      if (id) {
        const filtered = products.filter(p => p.id !== Number(id));
        setStoredData('mock_products', filtered);
        return { success: true };
      }
    }
  }

  if (url.includes('/orders.php')) {
    const orders = getStoredData('mock_orders', DEFAULT_ORDERS);

    if (method === 'GET') {
      return orders;
    }

    if (method === 'POST') {
      const newOrder = {
        ...data,
        id: orders.length > 0 ? Math.max(...orders.map(o => o.id)) + 1 : 1004,
        status: 'pending',
        created_at: new Date().toISOString()
      };
      orders.unshift(newOrder);
      setStoredData('mock_orders', orders);
      return { success: true, order_id: newOrder.id };
    }

    if (method === 'PUT') {
      const updatedOrders = orders.map(o => {
        if (o.id === Number(data.id)) {
          return { ...o, status: data.status };
        }
        return o;
      });
      setStoredData('mock_orders', updatedOrders);
      return { success: true };
    }
  }

  if (url.includes('/inquiries.php')) {
    const inquiries = getStoredData('mock_inquiries', DEFAULT_INQUIRIES);

    if (method === 'GET') {
      return inquiries;
    }

    if (method === 'POST') {
      const newInquiry = {
        ...data,
        id: inquiries.length > 0 ? Math.max(...inquiries.map(i => i.id)) + 1 : 1,
        is_read: 0,
        created_at: new Date().toISOString()
      };
      inquiries.unshift(newInquiry);
      setStoredData('mock_inquiries', inquiries);
      return { success: true };
    }

    if (method === 'PUT') {
      const updatedInquiries = inquiries.map(i => {
        if (i.id === Number(data.id)) {
          return { ...i, is_read: 1 };
        }
        return i;
      });
      setStoredData('mock_inquiries', updatedInquiries);
      return { success: true };
    }
  }

  if (url.includes('/dashboard.php')) {
    const products = getStoredData('mock_products', DEFAULT_PRODUCTS);
    const orders = getStoredData('mock_orders', DEFAULT_ORDERS);
    const inquiries = getStoredData('mock_inquiries', DEFAULT_INQUIRIES);

    // Calc stats
    const totalSales = orders.filter(o => o.status === 'completed').reduce((sum, o) => sum + Number(o.total_amount), 0);
    const totalOrders = orders.length;
    const totalProducts = products.length;
    const activeInquiries = inquiries.filter(i => i.is_read === 0).length;

    // Daily revenue mock chart data (last 7 days)
    const dailySales = [];
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const label = d.toLocaleDateString('en-US', { weekday: 'short' });
      // Calculate real total for this day if match
      const dateStr = d.toDateString();
      const dayTotal = orders
        .filter(o => new Date(o.created_at).toDateString() === dateStr && o.status === 'completed')
        .reduce((sum, o) => sum + Number(o.total_amount), 0);
      
      // Fallback base values to make charts look beautiful if empty
      const baseValues = [8400, 12000, 5000, 9500, 16000, 7498, 2499];
      dailySales.push({
        label,
        sales: dayTotal || baseValues[6 - i]
      });
    }

    return {
      success: true,
      stats: {
        total_sales: totalSales || 27998, // beautiful display fallbacks
        total_orders: totalOrders,
        total_products: totalProducts,
        active_inquiries: activeInquiries
      },
      recent_orders: orders.slice(0, 5),
      daily_sales: dailySales
    };
  }

  if (url.includes('/upload.php')) {
    if (method === 'POST') {
      // Returns a beautiful mock apparel image from unsplash depending on what's uploaded
      return {
        success: true,
        url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=600&q=85&fit=crop'
      };
    }
  }

  throw { response: { status: 404, data: { error: 'Mock endpoint not found.' } } };
}
