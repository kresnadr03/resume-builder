import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Table, Alert, Spinner } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function EducationList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    const navigate = useNavigate();

    const load = async () => {
        setLoading(true);
        setErr('');
        try {
            const { data } = await api.get('/educations');
            setRows(Array.isArray(data) ? data : []);
        } catch (e) {
            console.error('Load educations error:', e.response || e);
            setErr(e.response?.data?.message || e.message || 'Failed to load educations');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => { load(); }, []);

    const delRow = async (id) => {
        if (!window.confirm('Delete this education?')) return;
        try {
            await api.delete(`/educations/${id}`);
            load();
        } catch (e) {
            console.error('Delete education error:', e.response || e);
            alert(e.response?.data?.message || 'Failed to delete');
        }
    };

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" onClick={() => navigate('/')}>← Back</Button>
                    <h4 className="mb-0">Education</h4>
                </div>
                <Button onClick={() => navigate('/educations/new')}>Add</Button>
            </div>

            {loading && <div className="mt-3"><Spinner animation="border" size="sm" /> Loading…</div>}
            {err && <Alert className="mt-3" variant="danger">{err}</Alert>}

            {!loading && rows.length === 0 && !err && (
                <Alert className="mt-3" variant="secondary">
                    Belum ada data. Klik <b>Add</b> untuk menambahkan.
                </Alert>
            )}

            {!loading && !err && rows.length > 0 && (
                <Table striped hover className="mt-3">
                    <thead>
                        <tr>
                            <th>School</th>
                            <th>Degree</th>
                            <th>Start</th>
                            <th>End</th>
                            <th></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id}>
                                <td>{r.school}</td>
                                <td>{r.degree || '-'}</td>
                                <td>{r.start_year || '-'}</td>
                                <td>{r.end_year || '-'}</td>
                                <td className="text-end">
                                    <Button size="sm" variant="secondary" onClick={() => navigate(`/educations/${r.id}`)}>Edit</Button>{' '}
                                    <Button size="sm" variant="danger" onClick={() => delRow(r.id)}>Delete</Button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </Table>
            )}
        </div>
    );
}
