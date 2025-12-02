import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SimulatorPage from './pages/SimulatorPage';
import ApplicationPage from './pages/ApplicationPage';

function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-dark bg-dark">
        <div className="container-fluid d-flex justify-content-between align-items-center">
          <Link className="navbar-brand fs-4 fw-bold text-white" to="/">
            CreditSmart
          </Link>
          <div className="d-none d-md-flex gap-3">
            <Link className="nav-link text-light" to="/">Inicio</Link>
            <Link className="nav-link text-light" to="/simulador">Simular Crédito</Link>
            <Link className="nav-link text-light" to="/solicitud">Solicitar Crédito</Link>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow-1 py-4 bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulador" element={<SimulatorPage />} />
          <Route path="/solicitud" element={<ApplicationPage />} />
        </Routes>
      </main>

      {/* Footer  */}
      <footer className="bg-dark text-light py-4 mt-auto">
        <div className="container text-center">
          <p className="mb-0">© 2025 CreditSmart. Todos los derechos reservados.</p>
          <p className="mb-0" style={{ fontSize: '0.875rem', color: '#9ca3af' }}>
            Plataforma de gestión crediticia
          </p>
        </div>
      </footer>
    </div>
  );
}

export default App;