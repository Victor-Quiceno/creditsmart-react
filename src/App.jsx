import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SimulatorPage from './pages/SimulatorPage';
import ApplicationPage from './pages/ApplicationPage';

// Crear el componente
function App() {
  return (
    <div className="App">
      {/* Navbar */}
      <nav style={{
        padding: '16px',
        backgroundColor: '#f8f9fa',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        gap: '20px'
      }}>
        <a href="/">Inicio</a>
        <a href="/simulador">Simular Crédito</a>
        <a href="/solicitud">Solicitar Crédito</a>
      </nav>

      {/* Contenido principal según la página */}
      <main style={{ padding: '24px' }}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/simulador" element={<SimulatorPage />} />
          <Route path="/solicitud" element={<ApplicationPage />} />
        </Routes>
      </main>

      {/* Footer  */}
      <footer style={{
        padding: '16px',
        textAlign: 'center',
        borderTop: '1px solid #e0e0e0',
        color: '#666',
        marginTop: '40px'
      }}>
        © 2025 CreditSmart. Todos los derechos reservados.
      </footer>
    </div>
  );
}

export default App;