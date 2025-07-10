// Adapted and modernized based on provided Navbar
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiFilter, FiDownload, FiEye, FiX } from "react-icons/fi";
import PropTypes from "prop-types";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";

const Ventas = () => {
  const [ventas] = useState([
    { fecha: "2023-10-01", albumCancion: "Noche Estrellada", cantidad: 2, precio: 20, total: 40, activo: true },
    { fecha: "2023-10-02", albumCancion: "Viento del Mar", cantidad: 3, precio: 10, total: 30, activo: true },
    { fecha: "2023-10-03", albumCancion: "Sueños de Otoño", cantidad: 1, precio: 15, total: 15, activo: true },
    { fecha: "2023-10-04", albumCancion: "Luces de la Ciudad", cantidad: 4, precio: 25, total: 100, activo: false },
    { fecha: "2023-10-05", albumCancion: "Ritmo Infinito", cantidad: 2, precio: 30, total: 60, activo: true },
  ]);

  const sanitizeInput = (input) => DOMPurify.sanitize(input);

  const [modalVer, setModalVer] = useState(false);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const openModalVer = (index) => {
    setCurrentVenta(index);
    setModalVer(true);
  };

  const closeModalVer = () => setModalVer(false);

  const handleSearchChange = (e) => setSearchTerm(sanitizeInput(e.target.value));

  const handleSortByDate = () => {
    setSortOrder((prev) => (prev === "asc" ? "desc" : "asc"));
  };

  const filteredVentas = ventas
    .filter((v) => v.albumCancion.toLowerCase().includes(searchTerm.toLowerCase()))
    .sort((a, b) => (sortOrder === "asc" ? new Date(a.fecha) - new Date(b.fecha) : new Date(b.fecha) - new Date(a.fecha)));

  const handleExportToExcel = () => {
    const ws = XLSX.utils.json_to_sheet(filteredVentas);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Ventas");
    XLSX.writeFile(wb, "ventas.xlsx");
  };

  return (
    <div className="p-6 md:ml-72 bg-gradient-to-b from-gray-950 to-black text-gray-200 min-h-screen">
      <div className="mb-10">
        <h1 className="text-4xl font-bold text-green-400 mb-2 tracking-wide">Resumen de Ventas</h1>
        <p className="text-sm text-gray-400">Consulta tus registros recientes y exporta la información.</p>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between gap-4 bg-gray-900 rounded-xl p-4 shadow-xl mb-6">
        <div className="relative w-full md:w-auto flex-grow">
          <input
            type="text"
            placeholder="Buscar álbum/canción..."
            value={searchTerm}
            onChange={handleSearchChange}
            className="w-full bg-black border border-gray-700 rounded-full pl-10 pr-4 py-2 text-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-green-400" />
        </div>
        <div className="flex items-center gap-3">
          <button onClick={handleSortByDate} className="bg-green-600 hover:bg-green-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <FiFilter /> {sortOrder === "asc" ? "Ascendente" : "Descendente"}
          </button>
          <button onClick={handleExportToExcel} className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-full flex items-center gap-2 shadow-md">
            <FiDownload /> Exportar
          </button>
        </div>
      </div>

      <div className="overflow-x-auto bg-gray-900 rounded-xl shadow-xl">
        <table className="min-w-full divide-y divide-gray-800">
          <thead className="bg-green-800 text-white text-sm uppercase">
            <tr>
              <th className="px-6 py-3 text-left">Fecha</th>
              <th className="px-6 py-3 text-left">Álbum/Canción</th>
              <th className="px-6 py-3 text-left">Cantidad</th>
              <th className="px-6 py-3 text-left">Precio</th>
              <th className="px-6 py-3 text-left">Total</th>
              <th className="px-6 py-3 text-center">Estado</th>
              <th className="px-6 py-3 text-right">Acciones</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-700">
            {filteredVentas.map((venta, index) => (
              <tr key={index} className="hover:bg-gray-800 transition duration-200">
                <td className="px-6 py-4">{venta.fecha}</td>
                <td className="px-6 py-4">{venta.albumCancion}</td>
                <td className="px-6 py-4">{venta.cantidad}</td>
                <td className="px-6 py-4">${venta.precio.toFixed(2)}</td>
                <td className="px-6 py-4 font-semibold text-green-400">${venta.total.toFixed(2)}</td>
                <td className="px-6 py-4 text-center">
                  <span className={`px-3 py-1 text-xs font-semibold rounded-full ${venta.activo ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
                    {venta.activo ? "Activo" : "Inactivo"}
                  </span>
                </td>
                <td className="px-6 py-4 text-right">
                  <button onClick={() => openModalVer(index)} className="text-green-400 hover:text-green-200">
                    <FiEye />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <AnimatePresence>
        {modalVer && <ModalVer data={ventas?.[currentVenta]} onClose={closeModalVer} />}
      </AnimatePresence>
    </div>
  );
};

const ModalVer = ({ data, onClose }) => {
  if (!data) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
    >
      <div className="bg-gray-900 rounded-lg p-8 w-full max-w-md text-white relative shadow-2xl">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-400 hover:text-white">
          <FiX size={24} />
        </button>
        <h2 className="text-2xl font-bold text-green-400 mb-6">Detalle de Venta</h2>
        <div className="space-y-3">
          <p><strong>Fecha:</strong> {data.fecha}</p>
          <p><strong>Álbum/Canción:</strong> {data.albumCancion}</p>
          <p><strong>Cantidad:</strong> {data.cantidad}</p>
          <p><strong>Precio:</strong> ${data.precio.toFixed(2)}</p>
          <p><strong>Total:</strong> ${data.total.toFixed(2)}</p>
          <p>
            <strong>Estado:</strong>{" "}
            <span className={`px-3 py-1 text-xs font-semibold rounded-full ${data.activo ? "bg-green-700 text-green-200" : "bg-red-700 text-red-200"}`}>
              {data.activo ? "Activo" : "Inactivo"}
            </span>
          </p>
        </div>
      </div>
    </motion.div>
  );
};

ModalVer.propTypes = {
  data: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Ventas;