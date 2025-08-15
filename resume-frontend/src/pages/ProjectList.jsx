import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Table, Alert, Spinner, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { assetUrl } from '../api/assets';

export default function ProjectList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const load = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/projects');
            setRows(data);
        } catch (e) {
            setErr(e.response?.data?.message || 'Failed to load projects');
        } finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const delRow = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Delete this project?')) return;
        await api.delete(`/projects/${id}`);
        load();
    };

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" onClick={() => nav('/')}>← Back</Button>
                    <h4 className="mb-0">Projects</h4>
                </div>
                <Button onClick={() => nav('/projects/new')}>Add</Button>
            </div>

            {loading && <div className="mt-3"><Spinner animation="border" size="sm" /> Loading...</div>}
            {err && <Alert className="mt-3" variant="danger">{err}</Alert>}

            {!loading && rows.length === 0 && (
                <Alert className="mt-3" variant="secondary">Belum ada project. Klik <b>Add</b> untuk menambahkan.</Alert>
            )}

            {!loading && rows.length > 0 && (
                <Table striped hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Link</th>
                            <th>Description</th>
                            <th className="text-end"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {rows.map(r => (
                            <tr key={r.id}>
                                <td style={{ width: 90 }}>
                                    {r.image ? <Image src={assetUrl(r.image)} thumbnail style={{ height: 60 }} /> : '-'}
                                </td>
                                <td>{r.title}</td>
                                <td>{r.link ? <a href={r.link} target="_blank" rel="noreferrer">{r.link}</a> : '-'}</td>
                                <td style={{ maxWidth: 320 }}>{r.description || '-'}</td>
                                <td className="text-end">
                                    <Button size="sm" variant="secondary" onClick={() => nav(`/projects/${r.id}`)}>Edit</Button>{' '}
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
