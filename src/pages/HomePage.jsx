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
            <div style={{ padding: '40px 20px' }}>
                <h2 style={{
                    textAlign: 'center',
                    marginBottom: '32px',
                    color: '#1e293b',
                    fontSize: '1.5rem'
                }}>
                    Productos Destacados
                </h2>

                <div style={{
                    display: 'flex',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                    gap: '20px',
                    marginBottom: '32px'
                }}>
                    {destacados.map(credit => (
                        <CreditCard key={credit.id} credit={credit} />
                    ))}
                </div>

                <div style={{ textAlign: 'center' }}>
                    <Link
                        to="/simulador"
                        style={{
                            display: 'inline-block',
                            padding: '12px 32px',
                            backgroundColor: '#1e293b',
                            color: 'white',
                            textDecoration: 'none',
                            borderRadius: '8px',
                            fontSize: '1rem',
                            fontWeight: '600',
                            transition: 'background-color 0.2s'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#0f172a'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
                    >
                        Ver todos los créditos
                    </Link>
                </div>
            </div>
        </div>
    );
}