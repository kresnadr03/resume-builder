import { Navigate } from 'react-router-dom';
import { useAuth } from './AuthContext';

export default function PrivateRoute({ children }) {
  const { user, ready, error } = useAuth();

  if (!ready) {
    return <div style={{ padding: 20 }}>⏳ Loading...</div>;
  }

  if (error) {
    return (
      <div style={{ padding: 20, color: 'red' }}>
        ⚠ Error: {error.message || 'Gagal memuat user data'}
      </div>
    );
  }

  return user ? children : <Navigate to="/login" replace />;
}
