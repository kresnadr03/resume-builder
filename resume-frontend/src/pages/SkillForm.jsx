import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Form, Card } from 'react-bootstrap';
import { useNavigate, useParams } from 'react-router-dom';

export default function SkillForm() {
  const { id } = useParams(); // 'new' atau angka
  const nav = useNavigate();
  const [form, setForm] = useState({ skill_name:'', level:'beginner' });
  const isNew = id === 'new';

  useEffect(() => {
    if (isNew) return;
    (async () => {
      const { data } = await api.get(`/skills/${id}`);
      setForm({ skill_name: data.skill_name ?? '', level: data.level ?? 'beginner' });
    })();
  }, [id, isNew]);

  const submit = async (e) => {
    e.preventDefault();
    if (isNew) await api.post('/skills', form);
    else await api.patch(`/skills/${id}`, form);
    nav('/skills');
  };

  return (
    <Card className="m-4 p-4">
      <h4>{isNew ? 'Add' : 'Edit'} Skill</h4>
      <Form onSubmit={submit}>
        <Form.Group className="mb-2">
          <Form.Label>Skill Name</Form.Label>
          <Form.Control value={form.skill_name} onChange={e=>setForm({...form, skill_name:e.target.value})}/>
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Level</Form.Label>
          <Form.Select value={form.level} onChange={e=>setForm({...form, level:e.target.value})}>
            <option value="beginner">Beginner</option>
            <option value="intermediate">Intermediate</option>
            <option value="advanced">Advanced</option>
          </Form.Select>
        </Form.Group>
        <Button type="submit">Save</Button>{' '}
        <Button variant="secondary" onClick={()=>nav('/skills')}>Cancel</Button>
      </Form>
    </Card>
  );
}
