import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function ExperienceForm() {
  const { id } = useParams(); // "new" or numeric
  const nav = useNavigate();
  const [form, setForm] = useState({ company:'', role:'', start_date:'', end_date:'', description:'' });

  useEffect(() => {
    if (id === 'new') return;
    (async () => {
      const { data } = await api.get(`/experiences/${id}`);
      setForm({
        company: data.company || '',
        role: data.role || '',
        start_date: data.start_date || '',
        end_date: data.end_date || '',
        description: data.description || ''
      });
    })();
  }, [id]);

  const submit = async (e) => {
    e.preventDefault();
    if (id === 'new') await api.post('/experiences', form);
    else await api.patch(`/experiences/${id}`, form);
    nav('/experiences');
  };

  return (
    <Card className="m-4 p-4">
      <h4>{id==='new' ? 'Add' : 'Edit'} Experience</h4>
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Company</Form.Label>
          <Form.Control value={form.company} onChange={e=>setForm({...form, company:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Role</Form.Label>
          <Form.Control value={form.role} onChange={e=>setForm({...form, role:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Start Date</Form.Label>
          <Form.Control type="date" value={form.start_date||''} onChange={e=>setForm({...form, start_date:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} value={form.description||''} onChange={e=>setForm({...form, description:e.target.value})}/>
        </Form.Group>
        <Button type="submit">Save</Button>{' '}
        <Button variant="secondary" onClick={()=>nav('/experiences')}>Cancel</Button>
      </Form>
    </Card>
  );
}
