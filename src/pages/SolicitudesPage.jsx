import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { fetchSolicitudes, deleteSolicitud } from '../firebase/services';

export default function SolicitudesPage() {

    const [expandedId, setExpandedId] = useState(null);
    const [solicitudes, setSolicitudes] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchSolicitudes();
                setSolicitudes(data);
            } catch (err) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    const handleDelete = async (id) => {
        if (window.confirm("¿Estás seguro de eliminar esta solicitud?")) {
            try {
                await deleteSolicitud(id);
                // Recargar la lista
                const data = await fetchSolicitudes();
                setSolicitudes(data);
            } catch (err) {
                alert(err.message);
            }
        }
    };

    if (loading) return <div className="container mt-4 text-center">Cargando solicitudes...</div>;
    if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;

    return (
        <div className="container mt-4">
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h1>Solicitudes Recibidas</h1>
                <Link to="/" className="btn btn-outline-dark">
                    ← Volver al inicio
                </Link>
            </div>

            {solicitudes.length === 0 ? (
                <div className="text-center py-5">
                    <p className="text-muted">No hay solicitudes aún.</p>
                    <Link to="/solicitud" className="btn btn-primary">
                        Crear primera solicitud
                    </Link>
                </div>
            ) : (
                <div className="row g-3">
                    {solicitudes.map(solicitud => (
                        <div key={solicitud.id} className="col-12">
                            <div className="card">
                                <div className="card-body">
                                    <div>
                                        {/* Resumen */}
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <h5 className="card-title">{solicitud.fullName}</h5>
                                                <p className="card-text">
                                                    <strong>Crédito:</strong> {solicitud.creditType}<br />
                                                    <strong>Monto:</strong> ${parseFloat(solicitud.amount).toLocaleString('es-CO')}<br />
                                                    <small className="text-muted">
                                                        {solicitud.createdAt?.toDate?.().toLocaleString() || 'Sin fecha'}
                                                    </small>
                                                </p>
                                            </div>
                                            <div className="d-flex gap-2 align-items-center">
                                                <button
                                                    onClick={() => setExpandedId(expandedId === solicitud.id ? null : solicitud.id)}
                                                    className="btn btn-sm btn-outline-secondary"
                                                >
                                                    {expandedId === solicitud.id ? 'Ocultar' : 'Ver detalles'}
                                                </button>
                                                <Link
                                                    to={`/solicitudes/editar/${solicitud.id}`}
                                                    className="btn btn-sm btn-outline-primary"
                                                >
                                                    Editar
                                                </Link>
                                                <button
                                                    onClick={() => handleDelete(solicitud.id)}
                                                    className="btn btn-sm btn-outline-danger"
                                                >
                                                    Eliminar
                                                </button>
                                            </div>
                                        </div>

                                        {/* Detalles expandidos */}
                                        {expandedId === solicitud.id && (
                                            <div className="mt-3 p-3 bg-light rounded">
                                                <h6>Detalles completos:</h6>
                                                <p><strong>Documento:</strong> {solicitud.documentType} - {solicitud.idNumber}</p>
                                                <p><strong>Email:</strong> {solicitud.email}</p>
                                                <p><strong>Teléfono:</strong> {solicitud.phone}</p>
                                                <p><strong>Empresa:</strong> {solicitud.company}</p>
                                                <p><strong>Cargo:</strong> {solicitud.jobTitle}</p>
                                                <p><strong>Ingresos mensuales:</strong> ${parseFloat(solicitud.monthlyIncome).toLocaleString('es-CO')}</p>
                                                <p><strong>Plazo:</strong> {solicitud.term} meses</p>
                                                <p><strong>Cuota estimada:</strong> ${parseFloat(solicitud.monthlyPayment).toLocaleString('es-CO')}</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}