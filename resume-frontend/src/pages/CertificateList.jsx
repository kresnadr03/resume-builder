import { useEffect, useState } from 'react';
import api from '../api/axios';
import { Button, Table, Alert, Spinner, Image } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import { assetUrl } from '../api/assets';

export default function CertificateList() {
    const [rows, setRows] = useState([]);
    const [loading, setLoading] = useState(true);
    const [err, setErr] = useState('');
    const nav = useNavigate();

    const load = async () => {
        try {
            setLoading(true);
            const { data } = await api.get('/certificates');
            setRows(data);
        } catch (e) {
            setErr(e.response?.data?.message || 'Failed to load certificates');
        } finally { setLoading(false); }
    };
    useEffect(() => { load(); }, []);

    const delRow = async (id) => {
        // eslint-disable-next-line no-restricted-globals
        if (!confirm('Delete this certificate?')) return;
        await api.delete(`/certificates/${id}`);
        load();
    };

    return (
        <div className="m-4">
            <div className="d-flex justify-content-between align-items-center">
                <div className="d-flex align-items-center gap-2">
                    <Button variant="outline-secondary" onClick={() => nav('/')}>← Back</Button>
                    <h4 className="mb-0">Certificates</h4>
                </div>
                <Button onClick={() => nav('/certificates/new')}>Add</Button>
            </div>

            {loading && <div className="mt-3"><Spinner animation="border" size="sm" /> Loading...</div>}
            {err && <Alert className="mt-3" variant="danger">{err}</Alert>}

            {!loading && rows.length === 0 && (
                <Alert className="mt-3" variant="secondary">Belum ada certificate. Klik <b>Add</b> untuk menambahkan.</Alert>
            )}

            {!loading && rows.length > 0 && (
                <Table striped hover className="mt-3">
                    <thead>
                        <tr>
                            <th>Image</th>
                            <th>Title</th>
                            <th>Issuer</th>
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
                                <td>{r.issuer || '-'}</td>
                                <td className="text-end">
                                    <Button size="sm" variant="secondary" onClick={() => nav(`/certificates/${r.id}`)}>Edit</Button>{' '}
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
