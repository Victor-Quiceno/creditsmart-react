/**
 * Componente principal de la aplicación CreditSmart.
 * 
 * Responsabilidades:
 * - Define la estructura global: navbar, contenido principal y footer.
 * - Gestiona el enrutamiento entre páginas.
 * - Aplica estilos globales
 * - Incluye menú hamburguesa solo en dispositivos móviles (con Bootstrap).
 * - Totalmente responsive
 */
import { Link, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import ApplicationPage from './pages/ApplicationPage';
import SolicitudesPage from './pages/solicitudesPage';
import EditSolicitudPage from './pages/EditSolicitudPage';
import SimuladorPage from './pages/SimuladorPage';


function App() {
  return (
    <div className="d-flex flex-column min-vh-100">
      {/* Navbar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
        <div className="container-fluid">

          {/* Logo */}
          {/* navbar-brand sirve para identificar el logo de la aplicación y proporcionar un enlace a la página de inicio. */}
          <Link className="navbar-brand d-flex align-items-center" to="/">
            <img
              src="/images/logo.png"
              alt="Logo CreditSmart"
              style={{ height: '32px', marginRight: '12px' }}
            />
            <span className="fs-4 fw-bold text-white">CreditSmart</span>
          </Link>

          {/* Botón hamburguesa solo visible en móviles */}
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNav"
            aria-controls="navbarNav"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          {/* Contenedor de enlaces - colapsable en móviles */}
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <Link className="nav-link text-light" to="/">Inicio</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/simulador">Simular Crédito</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/solicitud">Solicitar Crédito</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-light" to="/solicitudes">Lista de Solicitudes</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Contenido principal */}
      <main className="flex-grow-1 py-4 bg-white">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulador" element={<SimuladorPage />} />
          <Route path="/solicitud" element={<ApplicationPage />} />
          <Route path="/solicitudes" element={<SolicitudesPage />} />
          <Route path="/solicitudes/editar/:id" element={<EditSolicitudPage />} />

        </Routes>
      </main>

      {/* Footer */}
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