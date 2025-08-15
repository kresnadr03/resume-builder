// App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AuthProvider from './auth/AuthContext';
import PrivateRoute from './auth/PrivateRoute';
import Login from './pages/Login';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import ExperienceList from './pages/ExperienceList';
import ExperienceForm from './pages/ExperienceForm';
import EducationList from './pages/EducationList';
import EducationForm from './pages/EducationForm';
import SkillList from './pages/SkillList';
import SkillForm from './pages/SkillForm';
import ProjectList from './pages/ProjectList';
import ProjectForm from './pages/ProjectForm';
import CertificateList from './pages/CertificateList';
import CertificateForm from './pages/CertificateForm';

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          {/* Dashboard */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <Dashboard />
              </PrivateRoute>
            }
          />

          {/* Experience */}
          <Route
            path="/experiences"
            element={
              <PrivateRoute>
                <ExperienceList />
              </PrivateRoute>
            }
          />
          <Route
            path="/experiences/:id"
            element={
              <PrivateRoute>
                <ExperienceForm />
              </PrivateRoute>
            }
          />

          {/* Education */}
          <Route
            path="/educations"
            element={
              <PrivateRoute>
                <EducationList />
              </PrivateRoute>
            }
          />
          <Route
            path="/educations/:id"
            element={
              <PrivateRoute>
                <EducationForm />
              </PrivateRoute>
            }
          />

          {/* Skills */}
          <Route
            path="/skills"
            element={
              <PrivateRoute>
                <SkillList />
              </PrivateRoute>
            }
          />
          <Route
            path="/skills/:id"
            element={
              <PrivateRoute>
                <SkillForm />
              </PrivateRoute>
            }
          />
        </Routes>
        <Route path="/projects" element={<PrivateRoute><ProjectList /></PrivateRoute>} />
        <Route path="/projects/:id" element={<PrivateRoute><ProjectForm /></PrivateRoute>} />
        <Route path="/certificates" element={<PrivateRoute><CertificateList /></PrivateRoute>} />
        <Route path="/certificates/:id" element={<PrivateRoute><CertificateForm /></PrivateRoute>} />
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
