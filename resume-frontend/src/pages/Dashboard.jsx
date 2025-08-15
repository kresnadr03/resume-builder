import { useEffect, useState } from 'react';
import { Button, Card } from 'react-bootstrap';
import { useAuth } from '../auth/AuthContext';
import { useNavigate } from 'react-router-dom';
import api from '../api/axios';
import { assetUrl } from '../api/assets';

export default function Dashboard() {
  const { user, logout, refreshUser, setUser } = useAuth();
  const nav = useNavigate();

  const [photo, setPhoto] = useState(null);
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState('');
  const [err, setErr] = useState('');

  // Set preview dari data user (agar setelah refresh tetap muncul)
  useEffect(() => {
    const p = user?.profile_photo_url
      ? user.profile_photo_url
      : user?.profile_photo
        ? assetUrl(user.profile_photo)
        : '';
    setPreview(p);
  }, [user]);

  // Pilih file + preview cepat lokal (sebelum upload)
  const onPickFile = (e) => {
    const f = e.target.files?.[0] || null;
    setPhoto(f);
    if (f) {
      const localURL = URL.createObjectURL(f);
      setPreview(localURL);
    }
  };

  // Upload foto profil
  const upload = async (e) => {
    e.preventDefault();
    if (!photo) return;
    setErr('');
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append('photo', photo);
      await api.post('/upload/profile', fd, { headers: { 'Content-Type': 'multipart/form-data' } });

      // Ambil ulang user biar preview permanen (URL dari backend)
      if (typeof refreshUser === 'function') {
        await refreshUser();
      } else {
        const { data } = await api.get('/me');
        if (typeof setUser === 'function') setUser(data);
      }
    } catch (e) {
      setErr(e?.response?.data?.message || 'Upload gagal');
    } finally {
      setUploading(false);
    }
  };

  // Logout + redirect ke /login
  const doLogout = async () => {
    await logout();
    nav('/login', { replace: true });
  };

  return (
    <Card className="m-4 p-4">
      <div className="d-flex justify-content-between align-items-center">
        <h4>Hi, {user?.name}</h4>
        <Button variant="outline-danger" onClick={doLogout}>Logout</Button>
      </div>

      {/* tombol navigasi TETAP ADA */}
      <div className="mt-3 d-flex gap-2 flex-wrap">
        <Button onClick={()=>nav('/experiences')}>Manage Experiences</Button>
        <Button onClick={()=>nav('/educations')}>Manage Education</Button>
        <Button onClick={()=>nav('/skills')}>Manage Skills</Button>
        <Button onClick={()=>nav('/projects')}>Manage Projects</Button>
        <Button onClick={()=>nav('/certificates')}>Manage Certificates</Button>
      </div>

      <hr />

      <form onSubmit={upload} className="d-flex gap-2 align-items-center">
        <input type="file" onChange={onPickFile} />
        <Button type="submit" disabled={uploading}>
          {uploading ? 'Uploading...' : 'Upload Foto Profil'}
        </Button>
      </form>

      {err && <div className="alert alert-danger mt-2">{err}</div>}

      {preview && (
        <div className="mt-3">
          <img src={preview} alt="profile" style={{ height: 120 }} />
        </div>
      )}
    </Card>
  );
}
