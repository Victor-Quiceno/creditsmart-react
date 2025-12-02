import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';
import { Link } from 'react-router-dom';
import Carousel from '../components/Carousel'; // importamos el carrusel

export default function HomePage() {
    const destacados = credits.slice(0, 4);

    return (
        <div>
            {/* Hero: mensaje de bienvenida */}
            <div style={{
                backgroundColor: 'white',
                padding: '40px 20px',
                textAlign: 'center',
                borderBottom: '1px solid #e2e8f0'
            }}>
                <h1 style={{
                    fontSize: '2.2rem',
                    margin: '0 0 16px 0',
                    color: '#1e293b',
                    fontWeight: '700'
                }}>
                    Encuentra el crédito ideal para ti
                </h1>
                <p style={{
                    fontSize: '1.1rem',
                    color: '#475569',
                    maxWidth: '700px',
                    margin: '0 auto',
                    lineHeight: 1.6
                }}>
                    Comparación transparente, tasas competitivas y trámites 100% en línea con CreditSmart.
                </p>
            </div>

            {/* Carrusel */}
            <div style={{ padding: '20px', backgroundColor: 'white' }}>
                <Carousel />
            </div>

            {/* Sección de créditos destacados */}
            <div className="container mt-4">
                <h2 className="text-center mb-4 fw-bold text-dark">Productos Destacados</h2>

                <div className="row g-4 justify-content-center">
                    {destacados.map(credit => (
                        <CreditCard key={credit.id} credit={credit} />
                    ))}
                </div>

                <div className="text-center mt-5">
                    <Link
                        to="/simulador"
                        className="btn btn-outline-dark px-4 py-2 fw-semibold"
                    >
                        Ver todos los créditos
                    </Link>
                </div>
            </div>
        </div>
    );
}