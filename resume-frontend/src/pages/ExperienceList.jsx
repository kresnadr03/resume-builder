import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ExperienceList() {
    const [rows, setRows] = useState([]);
    const nav = useNavigate();

    const load = async () => {
        const { data } = await api.get('/experiences');
        setRows(data);
    };
    useEffect(() => { load(); }, []);

    const delRow = async (id) => {
        await api.delete(`/experiences/${id}`);
        load();
    };

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" onClick={() => nav('/')}>← Back</Button>
                    <h4 className="mb-0">Experiences</h4>
                </div>
                <Button onClick={() => nav('/experiences/new')}>Add</Button>
            </div>
            <Table striped hover className="mt-3">
                <thead><tr><th>Company</th><th>Role</th><th>Start</th><th></th></tr></thead>
                <tbody>
                    {rows.map(r => (
                        <tr key={r.id}>
                            <td>{r.company}</td>
                            <td>{r.role}</td>
                            <td>{r.start_date || '-'}</td>
                            <td className="text-end">
                                <Button size="sm" variant="secondary" onClick={() => nav(`/experiences/${r.id}`)}>Edit</Button>{' '}
                                <Button size="sm" variant="danger" onClick={() => delRow(r.id)}>Delete</Button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}
