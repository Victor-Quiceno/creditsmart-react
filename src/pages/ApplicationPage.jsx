import React, { useState, useMemo } from 'react';
import { credits } from '../data/credits';
import { useSearchParams } from 'react-router-dom';

// Hook para leer parámetros de la URL de las CreditCard
function useQuery() {
    const { search } = window.location;
    return React.useMemo(() => new URLSearchParams(search), [search]);
}

export default function ApplicationPage() {
    // Leer el parámetro ?credit=... de la URL
    const [searchParams] = useSearchParams();
    const creditFromUrl = searchParams.get('credit');

    // Estado del formulario, con el crédito prellenado si viene de la URL
    const [formData, setFormData] = useState({
        // Datos personales
        fullName: '',
        documentType: 'CC',
        idNumber: '',
        email: '',
        phone: '',

        // Datos laborales
        company: '',
        jobTitle: '',
        monthlyIncome: '',

        // Detalles del crédito
        creditType: creditFromUrl || '', // ← Si hay crédito en la URL, lo usamos; si no, cadena vacía
        amount: '',
        term: ''
    });

    // Estado para mostrar el resumen
    const [showSummary, setShowSummary] = useState(false);

    // Estado para mensaje de éxito
    const [success, setSuccess] = useState(false);

    // Manejar cambios en los inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    // Calcular cuota mensual
    const calculateMonthlyPayment = () => {
        const amount = parseFloat(formData.amount);
        const term = parseInt(formData.term);
        const interestRate = 1.2; // Tasa fija por ahora (1.2% mensual)

        if (!amount || !term || term <= 0) return 0;

        const i = interestRate / 100; // Convertir % a decimal
        const numerator = amount * i * Math.pow(1 + i, term);
        const denominator = Math.pow(1 + i, term) - 1;
        const payment = numerator / denominator;

        return isNaN(payment) ? 0 : payment;
    };

    const monthlyPayment = calculateMonthlyPayment();

    // Manejar envío del formulario
    const handleSubmit = (e) => {
        e.preventDefault();
        // Por ahora, solo mostramos el resumen
        setShowSummary(true);
    };

    // Confirmar y enviar
    const handleConfirm = () => {
        // Aquí se "guardaría" la solicitud (solo en memoria)
        console.log('Solicitud enviada:', { ...formData, monthlyPayment });

        // Mostrar mensaje de éxito
        setSuccess(true);

        // Limpiar formulario después de 2 segundos
        setTimeout(() => {
            setFormData({
                fullName: '',
                email: '',
                phone: '',
                idNumber: '',
                company: '',
                jobTitle: '',
                monthlyIncome: '',
                amount: '',
                term: ''
            });
            setShowSummary(false);
            setSuccess(false);
        }, 2000);
    };

    // Si hay éxito, mostramos mensaje y nada más
    if (success) {
        return (
            <div style={{ padding: '40px', textAlign: 'center' }}>
                <h2 style={{ color: '#0d9488' }}>¡Solicitud enviada con éxito!</h2>
                <p>Tu solicitud está siendo procesada. Te contactaremos pronto.</p>
            </div>
        );
    }

    return (
        <div style={{ padding: '24px', maxWidth: '800px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e293b' }}>
                Solicitud de Crédito
            </h1>

            {showSummary ? (
                /* --- RESUMEN --- */
                <div style={{
                    backgroundColor: '#f0fdf4',
                    border: '1px solid #bbf7d0',
                    borderRadius: '10px',
                    padding: '24px',
                    textAlign: 'left'
                }}>
                    <h2 style={{ color: '#065f46', marginBottom: '16px' }}>Resumen de tu solicitud</h2>
                    <p><strong>Tipo de crédito:</strong> {formData.creditType}</p>
                    <p><strong>Nombre:</strong> {formData.fullName}</p>
                    <p><strong>Tipo de documento:</strong> {formData.documentType}</p>
                    <p><strong>Número de documento:</strong> {formData.idNumber}</p>
                    <p><strong>Email:</strong> {formData.email}</p>
                    <p><strong>Teléfono:</strong> {formData.phone}</p>
                    <p><strong>Monto solicitado:</strong> ${parseFloat(formData.amount).toLocaleString('es-CO')}</p>
                    <p><strong>Plazo:</strong> {formData.term} meses</p>
                    <p><strong>Cuota estimada:</strong> ${monthlyPayment.toLocaleString('es-CO', { maximumFractionDigits: 0 })}</p>

                    <div style={{ marginTop: '20px', textAlign: 'center' }}>
                        <button
                            onClick={handleConfirm}
                            style={{
                                padding: '10px 24px',
                                backgroundColor: '#0d9488',
                                color: 'white',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Confirmar y enviar
                        </button>
                        <button
                            onClick={() => setShowSummary(false)}
                            style={{
                                marginLeft: '12px',
                                padding: '10px 24px',
                                backgroundColor: '#e2e8f0',
                                color: '#1e293b',
                                border: 'none',
                                borderRadius: '6px',
                                fontSize: '1rem',
                                cursor: 'pointer'
                            }}
                        >
                            Editar
                        </button>
                    </div>
                </div>
            ) : (
                /* --- FORMULARIO --- */
                <form onSubmit={handleSubmit}>
                    <h2 style={{ color: '#334155', marginBottom: '16px' }}>Datos personales</h2>

                    {/* Nombre completo */}
                    <div style={{ marginBottom: '16px' }}>
                        <input
                            name="fullName"
                            placeholder="Nombre completo"
                            value={formData.fullName}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    {/* Tipo y número de documento (en la misma fila) */}
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '16px' }}>
                        <div style={{ flex: 1, minWidth: '150px' }}>
                            <select
                                name="documentType"
                                value={formData.documentType}
                                onChange={handleChange}
                                style={{
                                    width: '100%',
                                    padding: '10px',
                                    border: '1px solid #cbd5e1',
                                    borderRadius: '6px',
                                    color: '#334155',
                                    backgroundColor: 'white'
                                }}
                            >
                                <option value="CC">Cédula de Ciudadanía (CC)</option>
                                <option value="CE">Cédula de Extranjería (CE)</option>
                                <option value="NIT">NIT</option>
                            </select>
                        </div>
                        <input
                            name="idNumber"
                            placeholder="Número de documento"
                            value={formData.idNumber}
                            onChange={handleChange}
                            style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    {/* Correo electrónico */}
                    <div style={{ marginBottom: '16px' }}>
                        <input
                            name="email"
                            type="email"
                            placeholder="Correo electrónico"
                            value={formData.email}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    {/* Teléfono */}
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            name="phone"
                            placeholder="Teléfono"
                            value={formData.phone}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    <h2 style={{ color: '#334155', marginBottom: '16px' }}>Datos laborales</h2>
                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '20px' }}>
                        <input
                            name="company"
                            placeholder="Empresa"
                            value={formData.company}
                            onChange={handleChange}
                            style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                        <input
                            name="jobTitle"
                            placeholder="Cargo"
                            value={formData.jobTitle}
                            onChange={handleChange}
                            style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>
                    <div style={{ marginBottom: '20px' }}>
                        <input
                            name="monthlyIncome"
                            type="number"
                            placeholder="Ingresos mensuales"
                            value={formData.monthlyIncome}
                            onChange={handleChange}
                            style={{ width: '100%', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    <h2 style={{ color: '#334155', marginBottom: '16px' }}>Detalles del crédito</h2>

                    <div style={{ marginBottom: '16px' }}>
                        <select
                            name="creditType"
                            value={formData.creditType}
                            onChange={handleChange}
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #cbd5e1',
                                borderRadius: '6px',
                                color: '#334155',
                                backgroundColor: 'white'
                            }}
                            required
                        >
                            <option value="">-- Selecciona un tipo de crédito --</option>
                            {credits.map(credit => (
                                <option key={credit.id} value={credit.name}>
                                    {credit.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', marginBottom: '12px' }}>
                        <input
                            name="amount"
                            type="number"
                            placeholder="Monto solicitado"
                            value={formData.amount}
                            onChange={handleChange}
                            style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                        <input
                            name="term"
                            type="number"
                            placeholder="Plazo en meses"
                            value={formData.term}
                            onChange={handleChange}
                            style={{ flex: 1, minWidth: '200px', padding: '10px', border: '1px solid #cbd5e1', borderRadius: '6px' }}
                            required
                        />
                    </div>

                    {/* Mostrar cuota estimada */}
                    {formData.amount && formData.term && (
                        <div style={{
                            marginBottom: '20px',
                            padding: '12px',
                            backgroundColor: '#f8fafc',
                            border: '1px dashed #cbd5e1',
                            borderRadius: '6px',
                            textAlign: 'center'
                        }}>
                            <strong>Cuota mensual estimada:</strong> ${monthlyPayment.toLocaleString('es-CO', { maximumFractionDigits: 0 })}
                        </div>
                    )}

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            backgroundColor: '#1e293b',
                            color: 'white',
                            border: 'none',
                            borderRadius: '6px',
                            fontSize: '1rem',
                            cursor: 'pointer'
                        }}
                    >
                        Revisar solicitud
                    </button>
                </form>
            )}
        </div>
    );
}