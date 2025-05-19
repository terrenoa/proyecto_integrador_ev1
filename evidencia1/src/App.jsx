import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);
  const [busqueda, setBusqueda] = useState("");

  useEffect(() => {
    axios.get("https://dummyjson.com/products?limit=100")
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  const filteredProducts = products.filter((p)=>p.title.toLowerCase().includes(busqueda.toLowerCase()));
  const totalProducts = filteredProducts.length;
  const maxProduct = Math.max(...filteredProducts.map(p => p.price));
  const minProduct = Math.min(...filteredProducts.map(p => p.price));
  const discProduct = Math.max(...filteredProducts.map(p => p.discountPercentage));
  const tituloVeinte = filteredProducts.filter(p => p.title.length > 20).length;
  const avgRating = filteredProducts.length > 0
  ? (filteredProducts.reduce((accumulador, p) => accumulador + p.rating, 0) / filteredProducts.length).toFixed(2): 0;



return (
  <div className="p-4 space-y-6">
    
    {/* Encabezado */}
    <div>
      <h1 className="text-2xl font-bold text-blue-700">Evidencias 1 y 2</h1>
    </div>

    {/* Busqueda */}
    <div>
      <input
        type="text"
        placeholder="Buscar producto..."
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
        className="border p-2 w-full max-w-md"
      />
    </div>

    {/* Estadisticas */}
    <div>
      <h2 className="text-lg font-semibold mb-1">Estadísticas</h2>
      <p>Se muestran {totalProducts} productos</p>
      <p>Precio mas alto: ${maxProduct}</p>
      <p>Mejor precio: ${minProduct}</p>
      <p>Precio descuento: ${discProduct}</p>
      <p>Productos con título mayor a 20 caracteres: {tituloVeinte}</p>
      <p>Promedio de puntaje: {avgRating}★</p>
      
    </div>

    {/* Productos */}
    <div>
      <h2 className="text-lg font-semibold mb-4">Productos</h2>
      
      {filteredProducts.length === 0 ? (
        <p className="font-medium">Sin coincidencias</p>
      ) : (
        <ul className="grid grid-cols-1 md:grid-cols-4 gap-2 list-none p-0">
          {filteredProducts.map((p) => (
            <li key={p.id} className="border p-2">
              <img src={p.thumbnail} alt={p.title} className="w-full h-auto mb-2" />
              <p className="font-medium">{p.title}</p>
              <p>${p.price}</p>
            </li>
          ))}
        </ul>
      )}
    </div>

  </div>
);
}
export default App;