import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Form, Card, Image, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function CertificateForm() {
  const { id } = useParams(); // 'new' atau angka
  const isNew = id === 'new';
  const nav = useNavigate();

  const [form, setForm] = useState({ title:'', issuer:'', image:'' });
  const [preview, setPreview] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await api.get(`/certificates/${id}`);
      setForm({
        title: data.title || '',
        issuer: data.issuer || '',
        image: data.image || ''
      });
      setPreview(data.image || '');
    })();
  }, [id, isNew]);

  const uploadImage = async (file) => {
    setErr('');
    if (!file) return;
    const fd = new FormData();
    fd.append('image', file);
    try {
      const { data } = await api.post('/upload/certificate', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(f => ({ ...f, image: data.url }));
      setPreview(data.url);
    } catch (e) {
      setErr(e.response?.data?.message || 'Upload gagal');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) await api.post('/certificates', form);
      else await api.patch(`/certificates/${id}`, form);
      nav('/certificates');
    } catch (e) {
      setErr(e.response?.data?.message || 'Simpan gagal');
    }
  };

  return (
    <Card className="m-4 p-4">
      <h4>{isNew ? 'Add' : 'Edit'} Certificate</h4>
      {err && <Alert variant="danger">{err}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Issuer</Form.Label>
          <Form.Control value={form.issuer} onChange={e=>setForm({...form, issuer:e.target.value})}/>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Image</Form.Label>
          <div className="d-flex align-items-center gap-3">
            <Form.Control type="file" accept="image/*"
              onChange={e=>uploadImage(e.target.files?.[0])}/>
            {preview && <Image src={preview} thumbnail style={{height:80}}/>}
          </div>
          {form.image && <div className="mt-1"><small>URL: {form.image}</small></div>}
        </Form.Group>

        <Button type="submit">Save</Button>{' '}
        <Button variant="secondary" onClick={()=>nav('/certificates')}>Cancel</Button>
      </Form>
    </Card>
  );
}
