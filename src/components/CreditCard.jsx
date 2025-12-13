import { Link } from 'react-router-dom';

/**
 * Componente para mostrar una tarjeta de crédito
 * 
 * Props:
 * - credit: objeto con los detalles del crédito
 *   {
 *     id: string,
 *     name: string,
 *     description: string,
 *     interestRate: number,
 *     minAmount: number,
 *     maxAmount: number,
 *     maxTerm: number
 *   }
 */
export default function CreditCard({ credit }) {
    // Formatear números como moneda colombiana
    const formatCurrency = (value) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0
        }).format(value);
    };

    return (
        <div className="col-12 col-sm-6 col-md-5 col-lg-4 d-flex">
            <div
                className="card border-0 shadow-sm h-100"
                style={{
                    borderRadius: '12px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    backgroundColor: '#ffffff'
                }}
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2">{credit.name}</h5>
                    <p className="card-text text-muted small mb-3">{credit.description}</p>

                    <div className="mt-auto">
                        <p className="mb-1"><strong>Tasa:</strong> {credit.interestRate}% mensual</p>
                        <p className="mb-1"><strong>Monto:</strong> {formatCurrency(credit.minAmount)} – {formatCurrency(credit.maxAmount)}</p>
                        <p className="mb-3"><strong>Plazo:</strong> {credit.maxTerm} meses</p>

                        <Link
                            to={`/solicitud?credit=${encodeURIComponent(credit.name)}`}
                            className="btn btn-dark w-100 fw-semibold"
                        >
                            Solicitar
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}