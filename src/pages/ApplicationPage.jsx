/**
 * Página de solicitud de crédito.
 * 
 * Contiene un formulario dividido en 3 secciones:
 * 1. Datos personales (nombre, tipo y número de documento, email, teléfono)
 * 2. Datos laborales (empresa, cargo, ingresos)
 * 3. Detalles del crédito (tipo, monto, plazo)
 * 
 * Características:
 * - Validación en tiempo real
 * - Cálculo automático de cuota mensual
 * - Resumen antes de enviar
 * - Mensaje de éxito con limpieza automática
 * - Totalmente responsive usa cards de Bootstrap
 */


// Al importar useState y useMemo de React para manejar estados y memorizar cálculos
// useSearchParams de react-router-dom para leer parámetros de la URL
// credits desde data/credits para listar los tipos de crédito disponibles
import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { credits } from '../data/credits';

export default function ApplicationPage() {
    const [searchParams] = useSearchParams();
    const creditFromUrl = searchParams.get('credit');

    // Estado del formulario para manejar los datos ingresados por el usuario
    // setFormData se usa para actualizar el estado del formulario
    // formData contiene todos los campos del formulario
    const [formData, setFormData] = useState({
        fullName: '',
        documentType: 'CC',
        idNumber: '',
        email: '',
        phone: '',

        company: '',
        jobTitle: '',
        monthlyIncome: '',

        creditType: creditFromUrl || '',
        amount: '',
        term: ''
    });

    // Estado para almacenar las solicitudes enviadas
    const [solicitudes, setSolicitudes] = useState([]);

    // Estado para mostrar el resumen antes de enviar, controlado por handleSubmit, más abajo
    const [showSummary, setShowSummary] = useState(false);

    // Estado para mostrar el mensaje de éxito, controlado por handleConfirm, más abajo
    const [success, setSuccess] = useState(false);

    // Maneja los cambios en los campos del formulario
    // Esto sirve para actualizar el estado del formulario en tiempo real
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Estima la cuota mensual basada en el monto, plazo e interés fijo del 1.2%
    const calculateMonthlyPayment = () => {
        const amount = parseFloat(formData.amount);
        const term = parseInt(formData.term);
        const interestRate = 1.2;

        // Si no hay monto o plazo válido, retorna 0
        if (!amount || !term || term <= 0) return 0;

        // convierte el interés de porcentaje a decimal
        const i = interestRate / 100;

        // Fórmula de cuota mensual
        const numerator = amount * i * Math.pow(1 + i, term);
        const denominator = Math.pow(1 + i, term) - 1;
        const payment = numerator / denominator;

        //isNan(payment) sirve para evitar que se muestre "NaN" (Not a Number) en caso de error
        return isNaN(payment) ? 0 : payment;
    };

    // Calcula la cuota mensual cada vez que cambian monto o plazo
    const monthlyPayment = calculateMonthlyPayment();

    // Maneja el envío del formulario, muestra el resumen previniendo el envío real en caso de tener que modificar datos
    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSummary(true);
    };

    // Maneja la confirmación del resumen, guarda la solicitud y muestra el mensaje de éxito
    const handleConfirm = () => {

        const nuevaSolicitud = {
            id: Date.now(),
            ...formData,
            monthlyPayment,
            fecha: new Date().toLocaleString()
        };

        // Agrega la nueva solicitud al estado de solicitudes
        setSolicitudes(prev => [...prev, nuevaSolicitud]);

        // Se muestra en consola las solicitudes
        console.log('Solicitudes', [...solicitudes, nuevaSolicitud]);

        // Cambia el estado para mostrar el mensaje de éxito
        setSuccess(true);

        console.log('Solicitud enviada:', { ...formData, monthlyPayment });
        setTimeout(() => {

            // Limpia el formulario después de 2 segundos
            setFormData({
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
             // Oculta el resumen y el mensaje de éxito
            setShowSummary(false);
            setSuccess(false);
        }, 2000);
    };

    // Esto muestra el mensaje de éxito si la solicitud fue enviada
    if (success) {
        return (
            <div className="container mt-5">
                <div className="alert alert-success text-center">
                    <h2>✅ ¡Solicitud enviada con éxito!</h2>
                    <p>Tu solicitud está siendo procesada. Te contactaremos pronto.</p>
                </div>
            </div>
        );
    }

    // Renderiza el formulario o el resumen basado en el estado showSummary
    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 fw-bold">Solicitud de Crédito</h1>

            {/* Esto es lo que se muestra si showSummary es true (el resumen) */}
            {showSummary ? (
                <div className="card shadow-sm p-4">
                    <h2 className="fw-bold mb-4">Resumen de tu solicitud</h2>
                    <p><strong>Nombre:</strong> {formData.fullName}</p>
                    <p><strong>Tipo de documento:</strong> {formData.documentType}</p>
                    <p><strong>Número de documento:</strong> {formData.idNumber}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                    <p><strong>Empresa:</strong> {formData.company}</p>
                    <p><strong>Cargo:</strong> {formData.jobTitle}</p>
                    <p><strong>Ingresos mensuales:</strong> ${parseFloat(formData.monthlyIncome).toLocaleString('es-CO')}</p>
                    <p><strong>Tipo de crédito:</strong> {formData.creditType}</p>
                    <p><strong>Monto solicitado:</strong> ${parseFloat(formData.amount).toLocaleString('es-CO')}</p>
                    <p><strong>Plazo:</strong> {formData.term} meses</p>
                    <p><strong>Cuota estimada:</strong> ${monthlyPayment.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>

                    {/* Estos son los botones para confirmar o editar la solicitud */}
                    <div className="d-flex justify-content-center gap-3 mt-4">

                        {/* En caso de darle a confirmar y enviar, se ejecuta handleConfirm */}
                        <button
                            onClick={handleConfirm}
                            className="btn btn-dark px-4"
                        >
                            Confirmar y enviar
                        </button>

                        {/* En caso de darle a editar, se vuelve al formulario cambiando el estado de ShowSummary (El resumen) a falso */}
                        <button
                            onClick={() => setShowSummary(false)}
                            className="btn btn-outline-secondary px-4"
                        >
                            Editar
                        </button>
                    </div>
                </div>
            ) : (

                // Esto es lo que se muestra si showSummary es false (el formulario)
                <form onSubmit={handleSubmit}>
                    {/* Datos personales */}
                    <div className="card shadow-sm mb-4 card-soft">

                        <div
                            className="card-header"
                            style={{
                                backgroundColor: '#111827',
                                color: 'white',
                                padding: '12px 16px',
                                marginBottom: '0'
                            }}
                        >
                            <h2 className="fs-5 fw-bold mb-0" style={{ color: 'white' }}>
                                Datos personales
                            </h2>
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
                    <div className="card shadow-sm mb-4 card-soft">
                        <div
                            className="card-header"
                            style={{
                                backgroundColor: '#111827',
                                color: 'white',
                                padding: '12px 16px',
                                marginBottom: '0'
                            }}
                        >
                            <h2 className="fs-5 fw-bold mb-0" style={{ color: 'white' }}>
                                Datos laborales
                            </h2>
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
                            <div className="mb-3 mt-3">
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
                    <div className="card shadow-sm mb-4 card-soft">
                        <div
                            className="card-header"
                            style={{
                                backgroundColor: '#111827',
                                color: 'white',
                                padding: '12px 16px',
                                marginBottom: '0'
                            }}
                        >
                            <h2 className="fs-5 fw-bold mb-0" style={{ color: 'white' }}>
                                Detalles del crédito
                            </h2>
                        </div>
                        <div className="card-body">
                            <div className="mb-3">
                                <select
                                    name="creditType"
                                    value={formData.creditType}
                                    onChange={handleChange}
                                    required
                                    className="form-select"
                                >
                                    {/* Se usa .map en credits para mapear todos los nombres de los créditos y mostrarlos como option */}
                                    <option value="">-- Selecciona un tipo de crédito --</option>
                                    {credits.map(credit => (
                                        <option key={credit.id} value={credit.name}>
                                            {credit.name}
                                        </option>
                                    ))}
                                </select>
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

                            {/* Muestra la cuota mensual estimada si monto y plazo están completos y se le pone formato de moneda Colombiana */}
                            {formData.amount && formData.term && (
                                <div className="mt-3 p-3 bg-light rounded">
                                    <strong>Cuota mensual estimada:</strong> ${monthlyPayment.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="d-grid">
                        <button
                            type="submit"
                            className="btn btn-dark fw-semibold"
                        >
                            Enviar solicitud
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}