import { credits } from './data/credits'; // Importar los datos

import CreditCard from './components/CreditCard'; // Importar el componente

// Crear el componente
function App() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>CreditSmart</h1>
      <h2>Productos disponibles</h2>

      {/* Usar .map() para mostrar cada credito */}
      {credits.map(credit => (
        <CreditCard
          key={credit.id}        // React necesita un "key" único
          credit={credit}        // Pasar el objeto como prop
        />
      ))}
    </div>
  );
}

export default App;