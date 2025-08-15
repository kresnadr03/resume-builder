import { useState } from 'react';
import { useAuth } from '../auth/AuthContext';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: '', email: '', password: '' });
  const [err, setErr] = useState('');

  const submit = async (e) => {
    e.preventDefault();
    try {
      await register(form.name, form.email, form.password);
      navigate('/');
    } catch (e) {
      setErr(e.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <Card className="m-4 p-4" style={{maxWidth: 480}}>
      <h3 className="mb-3">Register</h3>
      {err && <div className="alert alert-danger">{err}</div>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Name</Form.Label>
          <Form.Control
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            autoComplete="name"
            required
          />
        </Form.Group>
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
            autoComplete="new-password"
            required
          />
        </Form.Group>
        <div className="d-flex align-items-center gap-3">
          <Button type="submit">Create Account</Button>
          <Button
            variant="link"
            type="button"
            onClick={() => navigate('/login')}
          >
            Sudah punya akun? Login
          </Button>
        </div>
      </Form>
    </Card>
  );
}
