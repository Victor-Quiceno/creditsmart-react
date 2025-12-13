import { useState, useEffect } from 'react';
import CreditCard from '../components/CreditCard';
import { fetchCredits } from '../firebase/services';

// Límites globales para filtros de monto
const GLOBAL_MIN = 500000;
const GLOBAL_MAX = 300000000;

/**
 * Página de búsqueda y filtrado de créditos
 * 
 * Funcionalidades:
 * - Búsqueda por nombre en tiempo real
 * - Filtro por rango de monto (mínimo y máximo)
 * - Filtro por tasa de interés (baja, media, alta)
 * - Carga de datos desde Firestore
 * - Diseño bancario y responsive
 */
export default function SimuladorPage() {
    // Estado para créditos y carga
    const [credits, setCredits] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Filtros
    const [searchTerm, setSearchTerm] = useState('');
    const [minInput, setMinInput] = useState('');
    const [maxInput, setMaxInput] = useState('');
    const [interestFilter, setInterestFilter] = useState('all');

    // Convertir inputs a números para filtros
    const minFilter = minInput === '' ? GLOBAL_MIN : Number(minInput);
    const maxFilter = maxInput === '' ? GLOBAL_MAX : Number(maxInput);

    // Cargar créditos al montar
    useEffect(() => {
        const load = async () => {
            try {
                const data = await fetchCredits();
                setCredits(Array.isArray(data) ? data : []);
            } catch (err) {
                setError("Error al cargar créditos. Verifica tu conexión.");
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        load();
    }, []);

    // Filtrar créditos
    const filteredCredits = credits.filter(credit => {
        // Búsqueda por nombre
        const matchesSearch = credit.name.toLowerCase().includes(searchTerm.toLowerCase());

        // Filtro por rango de monto
        const matchesAmount = credit.maxAmount >= minFilter && credit.minAmount <= maxFilter;

        // Filtro por tasa
        let matchesInterest = true;
        if (interestFilter === 'low') {
            matchesInterest = credit.interestRate <= 1.0;
        } else if (interestFilter === 'medium') {
            matchesInterest = credit.interestRate > 1.0 && credit.interestRate <= 1.3;
        } else if (interestFilter === 'high') {
            matchesInterest = credit.interestRate > 1.3;
        }

        return matchesSearch && matchesAmount && matchesInterest;
    });

    if (loading) return <div className="text-center mt-4">Cargando créditos...</div>;
    if (error) return <div className="alert alert-danger text-center">{error}</div>;

    return (
        <div style={{ padding: '24px', maxWidth: '1000px', margin: '0 auto' }}>
            <h1 style={{ textAlign: 'center', marginBottom: '24px', color: '#1e293b' }}>
                Buscador de Créditos
            </h1>

            {/* Panel de filtros */}
            <div style={{
                backgroundColor: '#f8fafc',
                padding: '24px',
                borderRadius: '12px',
                border: '1px solid #e2e8f0',
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

                {/* Filtros de monto y tasa */}
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

                    {/* Filtro por tasa */}
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
                            <option value="low">Bajas (≤ 1.0%)</option>
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