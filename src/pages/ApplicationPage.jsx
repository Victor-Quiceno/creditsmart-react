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
 * - Totalmente responsive (usa cards de Bootstrap)
 */

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'react-router-dom';
import { credits } from '../data/credits';

export default function ApplicationPage() {
    const [searchParams] = useSearchParams();
    const creditFromUrl = searchParams.get('credit');

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

    const [showSummary, setShowSummary] = useState(false);
    const [success, setSuccess] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const calculateMonthlyPayment = () => {
        const amount = parseFloat(formData.amount);
        const term = parseInt(formData.term);
        const interestRate = 1.2;

        if (!amount || !term || term <= 0) return 0;

        const i = interestRate / 100;
        const numerator = amount * i * Math.pow(1 + i, term);
        const denominator = Math.pow(1 + i, term) - 1;
        const payment = numerator / denominator;

        return isNaN(payment) ? 0 : payment;
    };

    const monthlyPayment = calculateMonthlyPayment();

    const handleSubmit = (e) => {
        e.preventDefault();
        setShowSummary(true);
    };

    const handleConfirm = () => {
        console.log('Solicitud enviada:', { ...formData, monthlyPayment });
        setSuccess(true);
        setTimeout(() => {
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
            setShowSummary(false);
            setSuccess(false);
        }, 2000);
    };

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

    return (
        <div className="container mt-4">
            <h1 className="text-center mb-4 fw-bold">Solicitud de Crédito</h1>

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

                    <div className="d-flex justify-content-center gap-3 mt-4">
                        <button
                            onClick={handleConfirm}
                            className="btn btn-dark px-4"
                        >
                            Confirmar y enviar
                        </button>
                        <button
                            onClick={() => setShowSummary(false)}
                            className="btn btn-outline-secondary px-4"
                        >
                            Editar
                        </button>
                    </div>
                </div>
            ) : (
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
                            Revisar solicitud
                        </button>
                    </div>
                </form>
            )}
        </div>
    );
}