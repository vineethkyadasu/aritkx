import { createContext, useContext, useState, useEffect } from 'react';
import api from '../utils/api';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(() => {
    try {
      const stored = localStorage.getItem('aritkx_admin_user');
      return stored ? JSON.parse(stored) : null;
    } catch {
      return null;
    }
  });

  const login = async (email, password) => {
    const res = await api.post('/login.php', { email, password });
    const { token, admin: adminData } = res.data;
    localStorage.setItem('aritkx_admin_token', token);
    localStorage.setItem('aritkx_admin_user', JSON.stringify(adminData));
    setAdmin(adminData);
    return adminData;
  };

  const logout = () => {
    localStorage.removeItem('aritkx_admin_token');
    localStorage.removeItem('aritkx_admin_user');
    setAdmin(null);
  };

  const isAuthenticated = !!admin && !!localStorage.getItem('aritkx_admin_token');

  return (
    <AuthContext.Provider value={{ admin, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error('useAuth must be used inside AuthProvider');
  return ctx;
};
