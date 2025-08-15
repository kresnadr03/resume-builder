// src/App.js
import { Routes, Route } from 'react-router-dom';
import AuthProvider from './auth/AuthContext';

import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';

import ExperienceList from './pages/ExperienceList';
import ExperienceForm from './pages/ExperienceForm';

import EducationList from './pages/EducationList';
import EducationForm from './pages/EducationForm';

import SkillList from './pages/SkillList';
import SkillForm from './pages/SkillForm';

// ⬇️ Tambahkan ini
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import CertificateList from './pages/CertificateList';
import CertificateForm from './pages/CertificateForm';

export default function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route path="/" element={<Dashboard />} />

        <Route path="/experiences" element={<ExperienceList />} />
        <Route path="/experiences/:id" element={<ExperienceForm />} />

        <Route path="/educations" element={<EducationList />} />
        <Route path="/educations/:id" element={<EducationForm />} />

        <Route path="/skills" element={<SkillList />} />
        <Route path="/skills/:id" element={<SkillForm />} />

        {/* ⬇️ Tambahkan ini */}
        <Route path="/projects" element={<ProjectList />} />
        <Route path="/projects/:id" element={<ProjectForm />} />

        <Route path="/certificates" element={<CertificateList />} />
        <Route path="/certificates/:id" element={<CertificateForm />} />

        <Route path="*" element={<div style={{ padding: 24 }}>No route matched</div>} />
      </Routes>
    </AuthProvider>
  );
}
