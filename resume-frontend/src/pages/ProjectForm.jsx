import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Form, Card, Image, Alert } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function ProjectForm() {
  const { id } = useParams(); // 'new' atau angka
  const isNew = id === 'new';
  const nav = useNavigate();

  const [form, setForm] = useState({ title:'', description:'', link:'', image:'' });
  const [preview, setPreview] = useState('');
  const [err, setErr] = useState('');

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await api.get(`/projects/${id}`);
      setForm({
        title: data.title || '',
        description: data.description || '',
        link: data.link || '',
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
      const { data } = await api.post('/upload/project', fd, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setForm(f => ({ ...f, image: data.url })); // API mengembalikan URL gambar
      setPreview(data.url);
    } catch (e) {
      setErr(e.response?.data?.message || 'Upload gagal');
    }
  };

  const submit = async (e) => {
    e.preventDefault();
    try {
      if (isNew) await api.post('/projects', form);
      else await api.patch(`/projects/${id}`, form);
      nav('/projects');
    } catch (e) {
      setErr(e.response?.data?.message || 'Simpan gagal');
    }
  };

  return (
    <Card className="m-4 p-4">
      <h4>{isNew ? 'Add' : 'Edit'} Project</h4>
      {err && <Alert variant="danger">{err}</Alert>}
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Title</Form.Label>
          <Form.Control value={form.title} onChange={e=>setForm({...form, title:e.target.value})} required/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Link (GitHub/Demo)</Form.Label>
          <Form.Control value={form.link} onChange={e=>setForm({...form, link:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={form.description} onChange={e=>setForm({...form, description:e.target.value})}/>
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
        <Button variant="secondary" onClick={()=>nav('/projects')}>Cancel</Button>
      </Form>
    </Card>
  );
}
