import './App.css'
import axios from 'axios';
import { useEffect, useState } from 'react';

function App() {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    axios.get("https://dummyjson.com/products")
      .then((res) => {
        setProducts(res.data.products);
      });
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold text-blue-700 mb-2">Evidencia 1</h1>
      <h2 className="text-lg font-semibold mb-4">Productos</h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-2">
        {products.map((p) => (
          <div key={p.id} className="border p-2">
            <img src={p.thumbnail} alt={p.title} className="w-full h-auto mb-2" />
            <p className="font-medium">{p.title}</p>
            <p>${p.price}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;