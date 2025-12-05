import { Link } from 'react-router-dom';

// Componente para mostrar la tarjeta de un tipo de crédito
// Recibe un objeto 'credit' con los detalles del crédito, este es el prop.
export default function CreditCard({ credit }) {
    const formatCurrency = (value) => {

        // Formatea un número como moneda colombiana (COP)
        // currency significa divisa
        // minimumFractionDigits y maximumFractionDigits se usan para no mostrar decimales
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0,
            maximumFractionDigits: 0

            // .format(value) se usa para formatear el valor pasado como argumento.
        }).format(value);
    };

    return (

        // Diseño responsive usando clases de Bootstrap
        // col-n es para definir el ancho en diferentes tamaños de pantalla dependiendo de n
        // d-flex se usa para hacer que el contenedor sea un flexbox
        <div className="col-12 col-sm-6 col-md-5 col-lg-4 d-flex">
            <div
                className="card border-0 shadow-sm h-100"
                style={{
                    borderRadius: '12px',
                    transition: 'transform 0.2s, box-shadow 0.2s',
                    backgroundColor: '#e1e1e1ff',
                }}

                // Eventos del mouse para animación al pasar sobre la tarjeta y volver a su estado original
                onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-4px)'}
                onMouseLeave={(e) => e.currentTarget.style.transform = 'none'}
            >
                {/* Este es el contenedor (cuerpo) de la tarjeta */}
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-dark mb-2">{credit.name}</h5>
                    <p className="card-text text-muted small mb-3">{credit.description}</p>

                    {/* Esto sirve para empujar el bloque hacia abajo dentro de a tarjeta */}
                    <div className="mt-auto">

                        {/* estos son los detalles del crédito */}
                        <p className="mb-1"><strong>Tasa:</strong> {credit.interestRate}% mensual</p>
                        <p className="mb-1"><strong>Monto:</strong> {formatCurrency(credit.minAmount)} – {formatCurrency(credit.maxAmount)}</p>
                        <p className="mb-3"><strong>Plazo:</strong> {credit.maxTerm} meses</p>

                        {/* Esto es un enlace estilizado como botón que lleva a la página de solicitud de crédito */}
                        <Link
                            // Esto es un enlace estilizado como botón que lleva a la página de solicitud de crédito
                            // Usa encodeURIComponent para asegurar que el nombre del crédito se pase correctamente en la URL
                            // encode es útil porque a parte de codificar sirve también para llevar información del objeto
                            // Con esto, la página de solicitud puede leer el parámetro 'credit' de la URL para saber qué tipo de crédito se está solicitando
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