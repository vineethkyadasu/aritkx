import axios from 'axios';

// ─── Base URL ─────────────────────────────────────────────────────────────────
// On Hostinger the backend lives at /backend/<endpoint>.php
// In local dev, you can set VITE_API_URL=http://localhost/backend in .env.local
const BASE_URL = import.meta.env.VITE_API_URL || '/backend';

const api = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  },
});

// ─── Request Interceptor: Attach admin token ──────────────────────────────────
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('aritkx_admin_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ─── Response Interceptor: Handle auth errors ─────────────────────────────────
api.interceptors.response.use(
  (res) => res,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('aritkx_admin_token');
      localStorage.removeItem('aritkx_admin_user');
      // Redirect to login only if already in admin panel
      if (window.location.pathname.startsWith('/admin') && !window.location.pathname.includes('/login')) {
        window.location.href = '/admin/login';
      }
    }
    return Promise.reject(error);
  }
);

export default api;
