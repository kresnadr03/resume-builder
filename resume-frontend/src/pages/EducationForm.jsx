import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function EducationForm() {
  const { id } = useParams(); // 'new' atau angka
  const nav = useNavigate();
  const [form, setForm] = useState({ school:'', degree:'', start_year:'', end_year:'' });
  const isNew = id === 'new';

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await api.get(`/educations/${id}`);
      setForm({
        school: data.school ?? '',
        degree: data.degree ?? '',
        start_year: data.start_year ?? '',
        end_year: data.end_year ?? '',
      });
    })();
  }, [id, isNew]);

  const submit = async (e) => {
    e.preventDefault();
    if (isNew) await api.post('/educations', { ...form, start_year: +form.start_year || null, end_year: +form.end_year || null });
    else await api.patch(`/educations/${id}`, { ...form, start_year: +form.start_year || null, end_year: +form.end_year || null });
    nav('/educations');
  };

  return (
    <Card className="m-4 p-4">
      <h4>{isNew ? 'Add' : 'Edit'} Education</h4>
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>School</Form.Label>
          <Form.Control value={form.school} onChange={e=>setForm({...form, school:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Degree</Form.Label>
          <Form.Control value={form.degree} onChange={e=>setForm({...form, degree:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Start Year</Form.Label>
          <Form.Control type="number" value={form.start_year} onChange={e=>setForm({...form, start_year:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>End Year</Form.Label>
          <Form.Control type="number" value={form.end_year} onChange={e=>setForm({...form, end_year:e.target.value})}/>
        </Form.Group>
        <Button type="submit">Save</Button>{' '}
        <Button variant="secondary" onClick={()=>nav('/educations')}>Cancel</Button>
      </Form>
    </Card>
  );
}
