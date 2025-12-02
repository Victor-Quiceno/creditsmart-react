// src/pages/SimulatorPage.jsx
import { useState, useMemo } from 'react';
import { credits } from '../data/credits';
import CreditCard from '../components/CreditCard';

// Valores globales para definir el rango total posible de montos
// Estos límites vienen del conjunto completo de créditos disponibles
const GLOBAL_MIN = 500000;      // Monto más bajo entre todos los créditos
const GLOBAL_MAX = 300000000;   // Monto más alto entre todos los créditos

/**
 * Página del Simulador de Créditos
 * Funcionalidades:
 * - Búsqueda en tiempo real por nombre del crédito
 * - Filtro por rango de monto (mínimo y máximo)
 * - Filtro por categoría de tasa de interés (baja, media, alta)
 * - Lista dinámica de resultados
 * - Mensaje amable cuando no hay coincidencias
 * 
 * Notas de diseño:
 * - Fondo blanco (requisito del profesor)
 * - Estilo sobrio y profesional, tipo plataforma bancaria
 * - Inputs numéricos en lugar de sliders (por simplicidad y accesibilidad)
 * - Evita mostrar "0" cuando el usuario borra un campo
 * - Filtro de tasa con <select> para facilidad de uso
 */
export default function SimulatorPage() {
    // Estado para el término de búsqueda (texto libre)
    const [searchTerm, setSearchTerm] = useState('');

    // Estados para los inputs de monto (guardamos como CADENA para permitir campos vacíos)
    const [minInput, setMinInput] = useState(''); // cadena vacía = sin filtro
    const [maxInput, setMaxInput] = useState(''); // cadena vacía = sin filtro

    // Estado para el filtro de tasa: valor inicial = "all" (todas)
    const [interestFilter, setInterestFilter] = useState('all');

    // Convertimos a número solo en el momento del filtrado
    // Si el input está vacío, usamos los límites globales (es decir: "no filtrar por ese extremo")
    const minFilter = minInput === '' ? GLOBAL_MIN : Number(minInput);
    const maxFilter = maxInput === '' ? GLOBAL_MAX : Number(maxInput);

    /**
     * useMemo: evita recalcular la lista filtrada en cada render innecesario.
     * Solo se recalcula si cambia searchTerm, minFilter, maxFilter o interestFilter.
     */
    const filteredCredits = useMemo(() => {
        return credits.filter(credit => {
            // 1. Coincidencia con búsqueda (insensible a mayúsculas)
            const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase());

            // 2. Coincidencia con rango de monto:
            // Un crédito es válido si:
            // - Su monto máximo es >= al mínimo seleccionado
            // - Su monto mínimo es <= al máximo seleccionado
            const matchesAmount = credit.maxAmount >= minFilter && credit.minAmount <= maxFilter;

            // 3. Coincidencia con categoría de tasa
            let matchesInterest = true; // por defecto, no filtra
            if (interestFilter === 'low') {
                matchesInterest = credit.interestRate <= 1.0;
            } else if (interestFilter === 'medium') {
                matchesInterest = credit.interestRate > 1.0 && credit.interestRate <= 1.3;
            } else if (interestFilter === 'high') {
                matchesInterest = credit.interestRate > 1.3;
            }
            // Si interestFilter === 'all', matchesInterest sigue siendo true

            // Solo se incluye si cumple LAS TRES condiciones
            return matchesSearch && matchesAmount && matchesInterest;
        });
    }, [searchTerm, minFilter, maxFilter, interestFilter]);

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e293b' }}>
                Simulador de Créditos
            </h1>

            {/* Panel de controles de filtrado */}
            <div style={{
                backgroundColor: '#e4e4e4ff', // Fondo gris muy claro (profesional)
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0', // Borde sutil
                marginBottom: '32px'
            }}>
                {/* Búsqueda por nombre */}
                <div style={{ marginBottom: '16px' }}>
                    <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>
                        Buscar por nombre
                    </label>
                    <input
                        type="text"
                        placeholder="Ej: Crédito Personal"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                        style={{
                            width: '100%',
                            padding: '10px 12px',
                            fontSize: '1rem',
                            border: '1px solid #cbd5e1',
                            borderRadius: '6px'
                        }}
                    />
                </div>

                {/* Filtros de monto y tasa en una fila */}
                <div style={{ display: 'flex', gap: '16px', flexWrap: 'wrap', alignItems: 'end' }}>
                    {/* Monto mínimo */}
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>
                            Monto mínimo
                        </label>
                        <input
                            type="number"
                            value={minInput}
                            onChange={(e) => setMinInput(e.target.value)}
                            min={GLOBAL_MIN}
                            max={GLOBAL_MAX}
                            placeholder={GLOBAL_MIN.toLocaleString('es-CO')}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '6px'
                            }}
                        />
                    </div>

                    {/* Monto máximo */}
                    <div style={{ flex: 1, minWidth: '150px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>
                            Monto máximo
                        </label>
                        <input
                            type="number"
                            value={maxInput}
                            onChange={(e) => setMaxInput(e.target.value)}
                            min={GLOBAL_MIN}
                            max={GLOBAL_MAX}
                            placeholder={GLOBAL_MAX.toLocaleString('es-CO')}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '6px'
                            }}
                        />
                    </div>

                    {/* Filtro por tasa de interés */}
                    <div style={{ flex: 1, minWidth: '180px' }}>
                        <label style={{ display: 'block', marginBottom: '6px', fontWeight: '600', color: '#334155' }}>
                            Tasa de interés
                        </label>
                        <select
                            value={interestFilter}
                            onChange={(e) => setInterestFilter(e.target.value)}
                            style={{
                                width: '100%',
                                padding: '10px',
                                fontSize: '1rem',
                                border: '1px solid #cbd5e1',
                                borderRadius: '6px',
                                backgroundColor: 'white',
                                color: '#334155'
                            }}
                        >
                            <option value="all">Todas las tasas</option>
                            <option value="low">Bajas (≤ 1.0% mensual)</option>
                            <option value="medium">Medias (1.0% – 1.3%)</option>
                            <option value="high">Altas ({'>'} 1.3%)</option>
                        </select>
                    </div>
                </div>
            </div>
            {/* Resultados */}
            {filteredCredits.length === 0 ? (
                <p className="text-center text-muted mt-4">No hay créditos disponibles con esos criterios.</p>
            ) : (
                <div className="row g-4 mt-2">
                    {filteredCredits.map(credit => (
                        <CreditCard key={credit.id} credit={credit} />
                    ))}
                </div>
            )}
        </div>
    );
}