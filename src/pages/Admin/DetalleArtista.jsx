import { useState } from "react";
import { motion } from "framer-motion";
import { FiDownload, FiEdit, FiPlus, FiTrash2 } from "react-icons/fi";
import { Link } from "react-router-dom";

const ArtistDetail = () => {
  // Estados
  const [products, setProducts] = useState([
    { id: 1, name: "Álbum 1", type: "Música", price: 15.99, stock: 100 },
    { id: 2, name: "Camiseta", type: "Merch", price: 25.99, stock: 50 },
  ]);

  const [transactions] = useState([
    { id: 1, date: "2023-08-01", product: "Álbum 1", amount: 150, region: "EU" },
    { id: 2, date: "2023-08-02", product: "Camiseta", amount: 75, region: "US" },
  ]);

  const [modalProducto, setModalProducto] = useState(false);
  const [formData, setFormData] = useState({ 
    name: "", 
    type: "Música", 
    price: "", 
    stock: "" 
  });
  const [isAdmin] = useState(true);

  // Lógica del formulario de productos
  const handleProductSubmit = () => {
    // Validación básica
    if (!formData.name || !formData.price || !formData.stock) return;

    const newProduct = {
      id: Date.now(),
      ...formData,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock)
    };

    setProducts(prev => [...prev, newProduct]);
    setModalProducto(false);
    setFormData({ name: "", type: "Música", price: "", stock: "" });
  };

  // Eliminar producto
  const handleDeleteProduct = (productId) => {
    setProducts(prev => prev.filter(product => product.id !== productId));
  };

  return (
    <div className="p-8 min-h-screen bg-cover bg-center bg-[url('/fondo.gif')]">
      {/* Encabezado */}
      <div className="flex flex-col md:flex-row justify-between items-center p-4 md:ml-72 text-white rounded-lg bg-cover bg-center"
        style={{ backgroundImage: "url('/img/dc.jpg')", borderRadius: "20px" }}>
        <h1 className="text-4xl font-bold mb-4 md:mb-0">Detalle del Artista</h1>
        <button className="bg-[#0aa5a9] text-white px-6 py-3 rounded-lg hover:bg-[#067b80] transition">
          <FiDownload className="inline mr-2" />
          Descargar Contrato
        </button>
      </div>

      {/* Migas de pan */}
      <div className="md:ml-72 p-4 mx-auto bg-blue-100 rounded-lg shadow-lg mt-4"
        style={{ backgroundColor: "#f1f8f9", borderRadius: "20px" }}>
        <nav aria-label="breadcrumb">
          <ol className="flex gap-2 justify-center">
            <li><Link to="/" className="text-[#0aa5a9]">Inicio</Link></li>
            <li className="text-[#0aa5a9]">/</li>
            <li className="text-[#0aa5a9]">Artista</li>
          </ol>
        </nav>
      </div>

      {/* Sección de Información del Contrato */}
      <div className="md:ml-72 p-6 mt-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#0aa5a9]">Información del Contrato</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <p><strong>Duración:</strong> 2 años</p>
            <p><strong>Términos:</strong> Exclusividad mundial</p>
          </div>
          <div>
            <p><strong>Cláusulas principales:</strong></p>
            <ul className="list-disc pl-5">
              <li>Royalty del 15%</li>
              <li>Avance de $50,000</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Sección de Productos */}
      <div className="md:ml-72 p-6 mt-4 bg-white rounded-lg shadow-lg">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-[#0aa5a9]">Productos</h2>
          {isAdmin && (
            <motion.button
              whileHover={{ scale: 1.05 }}
              className="bg-[#0aa5a9] text-white px-4 py-2 rounded-lg"
              onClick={() => setModalProducto(true)}
            >
              <FiPlus className="inline mr-2" /> Nuevo Producto
            </motion.button>
          )}
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Producto</th>
                <th className="p-3">Tipo</th>
                <th className="p-3">Precio</th>
                <th className="p-3">Stock</th>
                {isAdmin && <th className="p-3">Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {products.map(product => (
                <tr key={product.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{product.name}</td>
                  <td className="p-3">{product.type}</td>
                  <td className="p-3">${product.price}</td>
                  <td className="p-3">{product.stock}</td>
                  {isAdmin && (
                    <td className="p-3 flex gap-2">
                      <motion.button whileHover={{ scale: 1.1 }}>
                        <FiEdit className="text-blue-500" />
                      </motion.button>
                      <motion.button 
                        whileHover={{ scale: 1.1 }}
                        onClick={() => handleDeleteProduct(product.id)}
                      >
                        <FiTrash2 className="text-red-500" />
                      </motion.button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Sección de Estadísticas */}
      <div className="md:ml-72 grid grid-cols-1 md:grid-cols-3 gap-4 mt-4">
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#0aa5a9]">Ventas Totales</h3>
          <p className="text-3xl mt-2">$125,000</p>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#0aa5a9]">Top Productos</h3>
          <ul className="mt-2">
            <li>Álbum 1 - 1,200 unidades</li>
            <li>Camiseta - 800 unidades</li>
          </ul>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-lg">
          <h3 className="text-xl font-bold text-[#0aa5a9]">Distribución Regional</h3>
          <div className="mt-2 h-32 bg-gray-200 rounded">
            {/* Aquí iría un gráfico */}
          </div>
        </div>
      </div>

      {/* Historial de Transacciones */}
      <div className="md:ml-72 p-6 mt-4 bg-white rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold mb-4 text-[#0aa5a9]">Historial de Transacciones</h2>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-200">
              <tr>
                <th className="p-3">Fecha</th>
                <th className="p-3">Producto</th>
                <th className="p-3">Monto</th>
                <th className="p-3">Región</th>
              </tr>
            </thead>
            <tbody>
              {transactions.map(transaction => (
                <tr key={transaction.id} className="border-t hover:bg-gray-50">
                  <td className="p-3">{transaction.date}</td>
                  <td className="p-3">{transaction.product}</td>
                  <td className="p-3">${transaction.amount}</td>
                  <td className="p-3">{transaction.region}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal para Productos */}
      {modalProducto && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg w-96">
            <h3 className="text-xl font-bold mb-4">Nuevo Producto</h3>
            <input
              type="text"
              placeholder="Nombre del producto"
              className="w-full mb-4 p-2 border rounded"
              value={formData.name}
              onChange={(e) => setFormData({...formData, name: e.target.value})}
            />
            <select
              className="w-full mb-4 p-2 border rounded"
              value={formData.type}
              onChange={(e) => setFormData({...formData, type: e.target.value})}
            >
              <option value="Música">Música</option>
              <option value="Merch">Merchandising</option>
            </select>
            <input
              type="number"
              placeholder="Precio"
              className="w-full mb-4 p-2 border rounded"
              value={formData.price}
              onChange={(e) => setFormData({...formData, price: e.target.value})}
            />
            <input
              type="number"
              placeholder="Stock"
              className="w-full mb-4 p-2 border rounded"
              value={formData.stock}
              onChange={(e) => setFormData({...formData, stock: e.target.value})}
            />
            <div className="flex gap-4 justify-end">
              <button
                className="bg-gray-300 px-4 py-2 rounded"
                onClick={() => setModalProducto(false)}
              >
                Cancelar
              </button>
              <button
                className="bg-[#0aa5a9] text-white px-4 py-2 rounded"
                onClick={handleProductSubmit}
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ArtistDetail;