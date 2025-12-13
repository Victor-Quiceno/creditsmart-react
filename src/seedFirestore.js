// import { db } from './firebase/config';
// import { collection, addDoc } from 'firebase/firestore';

// // METER AQUÍ TODOS LOS DATOS DE LOS CRÉDITOS SIN CONTAR EL ID PORQUE FIRESTORE LO GENERA SOLO
// // AGREGAR TAMBIÉN UN CAMPO PARA EL ICONO DE LOS CRÉDITOS
// const creditsData = [
//     {
//         name: "Crédito Personal",
//         description: "Ideal para gastos imprevistos o consolidación de deudas.",
//         interestRate: 1.25,
//         minAmount: 500000,
//         maxAmount: 15000000,
//         maxTerm: 60,
//         icon: ''
//     },
//     {
//         name: "Crédito Hipotecario",
//         description: "Financia la compra de tu vivienda con plazos extensos.",
//         interestRate: 0.85,
//         minAmount: 30000000,
//         maxAmount: 300000000,
//         maxTerm: 300,
//         icon: ''
//     },
//     {
//         name: "Crédito Automotriz",
//         description: "Compra tu auto nuevo o usado con condiciones preferenciales.",
//         interestRate: 1.1,
//         minAmount: 15000000,
//         maxAmount: 120000000,
//         maxTerm: 84,
//         icon: ''
//     },
//     {
//         name: "Crédito PyME",
//         description: "Capital de trabajo para pequeñas y medianas empresas.",
//         interestRate: 1.4,
//         minAmount: 5000000,
//         maxAmount: 100000000,
//         maxTerm: 48,
//         icon: ''
//     },
//     {
//         name: "Crédito Educativo",
//         description: "Financia estudios universitarios o posgrados en Colombia y el exterior.",
//         interestRate: 0.95,
//         minAmount: 2000000,
//         maxAmount: 50000000,
//         maxTerm: 120,
//         icon: ''
//     },
//     {
//         name: "Crédito Verde",
//         description: "Para inversiones en energía solar, eficiencia energética o sostenibilidad.",
//         interestRate: 0.9,
//         minAmount: 3000000,
//         maxAmount: 40000000,
//         maxTerm: 72,
//         icon: ''
//     },
//     {
//         name: "Crédito de Libre Inversión",
//         description: "Sin destinación específica. Usa el dinero como lo necesites.",
//         interestRate: 1.3,
//         minAmount: 1000000,
//         maxAmount: 25000000,
//         maxTerm: 60,
//         icon: ''
//     },
//     {
//         name: "Crédito para Construcción",
//         description: "Financia la construcción de vivienda nueva.",
//         interestRate: 0.8,
//         minAmount: 25000000,
//         maxAmount: 250000000,
//         maxTerm: 240,
//         icon: ''
//     },
//     {
//         name: "Crédito Agropecuario",
//         description: "Para productores agrícolas y ganaderos en zonas rurales.",
//         interestRate: 0.75,
//         minAmount: 2000000,
//         maxAmount: 80000000,
//         maxTerm: 120,
//         icon: ''
//     },
//     {
//         name: "Crédito de Consumo",
//         description: "Compra electrodomésticos, muebles o tecnología con cuotas fijas.",
//         interestRate: 1.2,
//         minAmount: 500000,
//         maxAmount: 20000000,
//         maxTerm: 48,
//         icon: ''
//     },
//     {
//         name: "Crédito para Remodelación",
//         description: "Renueva tu hogar o negocio con financiación especializada.",
//         interestRate: 1.0,
//         minAmount: 1000000,
//         maxAmount: 50000000,
//         maxTerm: 72,
//         icon: ''
//     },
//     {
//         name: "Crédito con Aval",
//         description: "Con un fiador, obtén montos más altos y mejores tasas.",
//         interestRate: 0.85,
//         minAmount: 2000000,
//         maxAmount: 70000000,
//         maxTerm: 84,
//         icon: ''
//     }
// ];

// const seedFirestore = async () => {
//     try {
//         console.log('Cargando datos a Firestore');

//         for (const credit of creditsData) {
//             const docRef = await addDoc(collection(db, 'credits'), credit);
//             console.log(`${credit.name} agregado con ID: ${docRef.id}`,);
//         }

//         console.log('Datos cargados correctamente');
//         console.log('En cuanto se persistan los registros, borrar este arvhivo')

//     } catch (error) {
//         console.error('Error al cargar los datos: ', error);
//     }
// }

// seedFirestore();