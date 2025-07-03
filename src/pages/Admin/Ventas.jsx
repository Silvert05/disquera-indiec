import { useState } from "react";
import { motion } from "framer-motion";
import { FiEye, FiFilter, FiDownload } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify"; // Librería para sanitizar entradas y prevenir XSS

const Ventas = () => {
  const [ventas] = useState([
    {
      fecha: "2023-10-01",
      albumCancion: "Noche Estrellada",
      cantidad: 2,
      precio: 20,
      total: 40,
      activo: true,
    },
    {
      fecha: "2023-10-02",
      albumCancion: "Viento del Mar",
      cantidad: 3,
      precio: 10,
      total: 30,
      activo: true,
    },
    {
      fecha: "2023-10-03",
      albumCancion: "Sueños de Otoño",
      cantidad: 1,
      precio: 15,
      total: 15,
      activo: true,
    },
    {
      fecha: "2023-10-04",
      albumCancion: "Luces de la Ciudad",
      cantidad: 4,
      precio: 25,
      total: 100,
      activo: false,
    },
    {
      fecha: "2023-10-05",
      albumCancion: "Ritmo Infinito",
      cantidad: 2,
      precio: 30,
      total: 60,
      activo: true,
    },
  ]);

  // Función para sanitizar entradas usando DOMPurify
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input); // Sanitiza el input para prevenir XSS
  };

  const [modalVer, setModalVer] = useState(false);
  const [currentVenta, setCurrentVenta] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc");

  const openModalVer = (index) => {
    setCurrentVenta(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  const handleSearchChange = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const handleSortByDate = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const filteredVentas = ventas
    .filter((venta) =>
      venta.albumCancion.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      const dateA = new Date(a.fecha);
      const dateB = new Date(b.fecha);
      return sortOrder === "asc" ? dateA - dateB : dateB - dateA;
    });

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredVentas);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Ventas");
    XLSX.writeFile(workbook, "ventas.xlsx");
  };

  // Framer Motion Variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 10,
      },
    },
    hover: {
      scale: 1.02,
      boxShadow: "0 8px 20px rgba(0, 255, 140, 0.2)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.98 },
  };

  const buttonVariants = {
    hover: {
      scale: 1.05,
      boxShadow: "0 0 15px rgba(0, 255, 140, 0.5)",
      transition: { duration: 0.2 },
    },
    tap: { scale: 0.95 },
  };

  return (
    <div className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen p-8 relative overflow-hidden">
      {/* Background Animated Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at top left, #39FF14 0%, transparent 30%), 
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
          backgroundSize: "200% 200%",
          animation: "bg-pan 20s ease infinite",
        }}
      ></div>

      <style jsx>{`
        @keyframes bg-pan {
          0% {
            background-position: 0% 0%;
          }
          50% {
            background-position: 100% 100%;
          }
          100% {
            background-position: 0% 0%;
          }
        }
        .glass-card {
          background-color: rgba(
            255,
            255,
            255,
            0.05
          ); /* Semi-transparent blanco */
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%); /* Safari support */
          border: 1px solid rgba(255, 255, 255, 0.1); /* Borde más sutil */
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem; /* rounded-3xl */
        }
        .custom-scrollbar::-webkit-scrollbar {
          height: 8px;
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff8c; /* Verde Eléctrico */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39ff14; /* Verde Neón */
        }
        /* Table specific styling for dark glassmorphism */
        .glass-table-header {
          background-color: rgba(0, 255, 140, 0.2); /* Verde esmeralda sutil */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 140, 0.3);
        }
        .glass-table-row {
          background-color: rgba(
            255,
            255,
            255,
            0.03
          ); /* Fondo de fila más sutil */
        }
        .glass-table-row:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>

      <div className="relative z-10">
        {/* Encabezado */}
        <motion.div
          className="glass-card p-8 mb-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            type: "spring",
            stiffness: 120,
            damping: 14,
          }}
        >
          <div
            className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: `url(/img/dashboard-img/abstract-pattern-dark.png)`,
              backgroundSize: "cover",
            }}
          ></div>
          <div className="relative z-10">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
              Registro de Ventas
            </h1>
           
          </div>
        </motion.div>

        {/* Migajas de pan */}
        <motion.div
          className="glass-card p-4 mb-8 flex items-center justify-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.2 }}
        >
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap gap-2 list-none p-0 m-0 justify-center items-center">
              <li>
                <Link
                  to="/dashboard"
                  className="text-[#00FF8C] px-4 py-2 rounded-lg transition duration-300 hover:bg-[rgba(0,255,140,0.15)] hover:text-white no-underline font-semibold"
                >
                  Inicio
                </Link>
              </li>
              <li>
                <span className="text-gray-500 px-2">/</span>
              </li>
              <li>
                <span className="text-white px-4 py-2 rounded-lg font-semibold">
                  Ventas
                </span>
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* Contenedor de búsqueda, filtro y exportar */}
        <motion.div
          className="glass-card p-6 mb-8 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.3 }}
        >
          <div className="relative w-full sm:w-auto flex-grow">
            <input
              type="text"
              placeholder="Buscar por Álbum/Canción..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiEye className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              onClick={handleSortByDate}
              className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiFilter className="group-hover:rotate-6 transition-transform" />
              {sortOrder === "asc" ? "Fecha Ascendente" : "Fecha Descendente"}
            </motion.button>
            <motion.button
              onClick={handleExportToExcel}
              className="bg-gradient-to-r from-green-600 to-lime-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
              Exportar a Excel
            </motion.button>
          </div>
        </motion.div>

        {/* Tabla de ventas */}
        <motion.div
          className="glass-card p-6 overflow-x-auto custom-scrollbar"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          transition={{ delay: 0.4 }}
        >
          <table className="min-w-full table-auto rounded-lg overflow-hidden">
            <thead>
              <tr className="text-white uppercase text-sm leading-normal glass-table-header">
                <th className="py-3 px-6 text-left">Fecha</th>
                <th className="py-3 px-6 text-left">Álbum/Canción</th>
                <th className="py-3 px-6 text-left">Cantidad</th>
                <th className="py-3 px-6 text-left">Precio</th>
                <th className="py-3 px-6 text-left">Total</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {filteredVentas.map((venta, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-700 glass-table-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <td className="py-4 px-6 whitespace-nowrap">{venta.fecha}</td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {venta.albumCancion}
                  </td>
                  <td className="py-4 px-6">{venta.cantidad}</td>
                  <td className="py-4 px-6">${venta.precio.toFixed(2)}</td>
                  <td className="py-4 px-6 font-bold text-[#00FF8C]">
                    ${venta.total.toFixed(2)}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        venta.activo
                          ? "bg-gradient-to-r from-green-500 to-lime-500"
                          : "bg-red-600"
                      }`}
                    >
                      {venta.activo ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModalVer(index)}
                      className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                      style={{
                        backgroundColor: "#8B5CF6", // Morado
                        boxShadow: "0 4px 10px rgba(139, 92, 246, 0.6)", // Sombra morada
                      }}
                    >
                      <FiEye size={20} />
                    </motion.button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Modal de Ver */}
        {modalVer && (
          <ModalVer data={ventas[currentVenta]} onClose={closeModalVer} />
        )}
      </div>
    </div>
  );
};

const ModalVer = ({ data, onClose }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Detalle de Venta
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Fecha
            </label>
            <p className="text-lg text-white">{data.fecha}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Álbum/Canción
            </label>
            <p className="text-lg text-white">{data.albumCancion}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Cantidad
            </label>
            <p className="text-lg text-white">{data.cantidad}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Precio Unitario
            </label>
            <p className="text-lg text-white">${data.precio.toFixed(2)}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Total
            </label>
            <p className="text-2xl font-bold text-[#00FF8C]">
              ${data.total.toFixed(2)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Estado
            </label>
            <span
              className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                data.activo
                  ? "bg-gradient-to-r from-green-500 to-lime-500"
                  : "bg-red-600"
              }`}
            >
              {data.activo ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>
        <div className="flex justify-end mt-8">
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Cerrar
          </motion.button>
        </div>
      </motion.div>
    </div>
  );
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Ventas;
