import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { fetchSolicitudes, updateSolicitud } from '../firebase/services';
import { fetchCredits } from '../firebase/services';

export default function EditSolicitudPage() {

    const [credits, setCredits] = useState([]);
    const [loadingCredits, setLoadingCredits] = useState(true);

    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCredits();
                setCredits(Array.isArray(data) ? data : []);
            } catch (err) {
                console.error("Error al cargar créditos:", err);
            } finally {
                setLoadingCredits(false);
            }
        };
        load();
    }, []);

    const { id } = useParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        fullName: '',
        documentType: 'CC',
        idNumber: '',
        email: '',
        phone: '',
        company: '',
        jobTitle: '',
        monthlyIncome: '',
        creditType: '',
        amount: '',
        term: ''
    });
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);

    // Cargar solicitud existente
    useEffect(() => {
        const loadSolicitud = async () => {
            try {
                const solicitudes = await fetchSolicitudes();
                const solicitud = solicitudes.find(s => s.id === id);
                if (solicitud) {
                    setFormData({
                        fullName: solicitud.fullName || '',
                        documentType: solicitud.documentType || 'CC',
                        idNumber: solicitud.idNumber || '',
                        email: solicitud.email || '',
                        phone: solicitud.phone || '',
                        company: solicitud.company || '',
                        jobTitle: solicitud.jobTitle || '',
                        monthlyIncome: solicitud.monthlyIncome || '',
                        creditType: solicitud.creditType || '',
                        amount: solicitud.amount || '',
                        term: solicitud.term || ''
                    });
                } else {
                    setError("Solicitud no encontrada");
                }
            } catch (err) {
                setError("Error al cargar la solicitud");
            } finally {
                setLoading(false);
            }
        };
        loadSolicitud();
    }, [id]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await updateSolicitud(id, formData);
            setSuccess(true);
            setTimeout(() => navigate('/solicitudes'), 2000);
        } catch (err) {
            alert(err.message);
        }
    };

    if (loading) return <div className="container mt-4 text-center">Cargando solicitud...</div>;
    if (error) return <div className="container mt-4 alert alert-danger">{error}</div>;
    if (success) return <div className="container mt-4 alert alert-success">Solicitud actualizada correctamente</div>;

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4">Editar Solicitud</h1>

            <form onSubmit={handleSubmit}>
                {/* Datos personales */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-dark text-white">
                        <h2 className="fs-5 mb-0">Datos personales</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <input
                                type="text"
                                name="fullName"
                                placeholder="Nombre completo"
                                value={formData.fullName}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="row g-3">
                            <div className="col-md-4">
                                <select
                                    name="documentType"
                                    value={formData.documentType}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="CC">Cédula de Ciudadanía (CC)</option>
                                    <option value="CE">Cédula de Extranjería (CE)</option>
                                    <option value="NIT">NIT</option>
                                </select>
                            </div>
                            <div className="col-md-8">
                                <input
                                    type="text"
                                    name="idNumber"
                                    placeholder="Número de documento"
                                    value={formData.idNumber}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="mb-3 mt-3">
                            <input
                                type="email"
                                name="email"
                                placeholder="Correo electrónico"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                        <div className="mb-3">
                            <input
                                type="tel"
                                name="phone"
                                placeholder="Teléfono"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                {/* Datos laborales */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-dark text-white">
                        <h2 className="fs-5 mb-0">Datos laborales</h2>
                    </div>
                    <div className="card-body">
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="company"
                                    placeholder="Empresa"
                                    value={formData.company}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="text"
                                    name="jobTitle"
                                    placeholder="Cargo"
                                    value={formData.jobTitle}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>
                        <div className="mb-3">
                            <input
                                type="number"
                                name="monthlyIncome"
                                placeholder="Ingresos mensuales"
                                value={formData.monthlyIncome}
                                onChange={handleChange}
                                required
                                className="form-control"
                            />
                        </div>
                    </div>
                </div>

                {/* Detalles del crédito */}
                <div className="card shadow-sm mb-4">
                    <div className="card-header bg-dark text-white">
                        <h2 className="fs-5 mb-0">Detalles del crédito</h2>
                    </div>
                    <div className="card-body">
                        <div className="mb-3">
                            <label className="form-label">Tipo de crédito</label>
                            {loadingCredits ? (
                                <div className="form-text">Cargando opciones...</div>
                            ) : (
                                <select
                                    name="creditType"
                                    value={formData.creditType}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    <option value="">-- Selecciona un tipo de crédito --</option>
                                    {credits.map(credit => (
                                        <option key={credit.id} value={credit.name}>
                                            {credit.name}
                                        </option>
                                    ))}
                                </select>
                            )}
                        </div>
                        <div className="row g-3">
                            <div className="col-md-6">
                                <input
                                    type="number"
                                    name="amount"
                                    placeholder="Monto solicitado"
                                    value={formData.amount}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                            <div className="col-md-6">
                                <input
                                    type="number"
                                    name="term"
                                    placeholder="Plazo en meses"
                                    value={formData.term}
                                    onChange={handleChange}
                                    required
                                    className="form-control"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="d-grid gap-2 d-md-flex justify-content-md-center">
                    <button type="submit" className="btn btn-dark px-4">
                        Actualizar Solicitud
                    </button>
                    <button
                        type="button"
                        className="btn btn-outline-secondary px-4"
                        onClick={() => navigate('/solicitudes')}
                    >
                        Cancelar
                    </button>
                </div>
            </form>
        </div>
    );
}