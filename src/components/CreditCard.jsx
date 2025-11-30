import { Link } from 'react-router-dom';

export default function CreditCard({ credit }) {
    // Formatear números con separadores de miles
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '10px',
            padding: '20px',
            margin: '12px',
            width: '320px',
            boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
            backgroundColor: '#ffffff'
        }}>
            <h3 style={{ margin: '0 0 12px 0', fontSize: '1.25rem', color: '#333' }}>
                {credit.name}
            </h3>
            <p style={{ color: '#555', fontSize: '0.95rem', margin: '0 0 16px 0' }}>
                {credit.description}
            </p>

            <div style={{ fontSize: '0.95rem', color: '#444', marginBottom: '16px' }}>
                <div><strong>Tasa de interés:</strong> {credit.interestRate}% mensual</div>
                <div><strong>Monto:</strong> {formatCurrency(credit.minAmount)} – {formatCurrency(credit.maxAmount)}</div>
                <div><strong>Plazo máximo:</strong> {credit.maxTerm} meses</div>
            </div>

            {/* Botón "Solicitar" */}
            <Link
                to={`/solicitud?credit=${encodeURIComponent(credit.name)}`}
                style={{
                    display: 'inline-block',
                    width: '100%',
                    padding: '10px',
                    textAlign: 'center',
                    backgroundColor: '#1e293b',
                    color: 'white',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontSize: '0.95rem',
                    fontWeight: '600',
                    transition: 'background-color 0.2s'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#0f172a'}
                onMouseLeave={(e) => e.target.style.backgroundColor = '#1e293b'}
            >
                Solicitar
            </Link>
        </div>
    );
}