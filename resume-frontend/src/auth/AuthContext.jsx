import { createContext, useContext, useState, useEffect } from 'react';
import api from '../api/axios';

const AuthCtx = createContext();
export const useAuth = () => useContext(AuthCtx);

export default function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [ready, setReady] = useState(false);

  const login = async (email, password) => {
    const { data } = await api.post('/login', { email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const register = async (name, email, password) => {
    const { data } = await api.post('/register', { name, email, password });
    localStorage.setItem('token', data.token);
    setUser(data.user);
  };

  const logout = async () => {
    try { await api.post('/logout'); } catch {}
    localStorage.removeItem('token');
    setUser(null);
  };

  useEffect(() => {
    // auto fetch user kalau punya token
    (async () => {
      const token = localStorage.getItem('token');
      if (!token) { setReady(true); return; }
      try {
        const { data } = await api.get('/me');
        setUser(data);
      } catch {
        localStorage.removeItem('token');
      } finally { setReady(true); }
    })();
  }, []);

  return (
    <AuthCtx.Provider value={{ user, login, register, logout, ready }}>
      {children}
    </AuthCtx.Provider>
  );
}
