import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const { login } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Login failed');
    }
  };

  return (
    <Card className="m-4 p-4" style={{maxWidth: 480}}>
      <h3 className="mb-3">Login</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Email</Form.Label>
          <Form.Control
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            type="email"
            autoComplete="email"
            required
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            autoComplete="current-password"
            required
          />
        </Form.Group>
        <div className="d-flex align-items-center gap-3">
          <Button type="submit">Login</Button>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate('/register')}
          >
            Belum memiliki akun? Daftar
          </Button>
        </div>
      </Form>
    </Card>
  );
}
