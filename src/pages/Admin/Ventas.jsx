import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiFilter, FiDownload } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";

const Ventas = () => {
  const [ventas] = useState([
    {
      fecha: "2023-10-02",
      albumCancion: "Viento del Mar",
      cantidad: 3,
      precio: 10,
      total: 30,
      activo: true,
      imagenUrl: "https://www.udiscovermusica.com/wp-content/uploads/sites/7/2022/09/Pink-Floyd-Dark-Side-Of-The-Moon-1536x1536-1-1024x1024.jpeg",
    },
    {
      fecha: "2023-10-03",
      albumCancion: "Sueños de Otoño",
      cantidad: 1,
      precio: 15,
      total: 15,
      activo: true,
      imagenUrl: "https://marketplace.canva.com/EAGL6BH8Rhg/1/0/1600w/canva-portada-%C3%A1lbum-m%C3%BAsica-moderno-qMT-zlb07JY.jpg",
    },
    {
      fecha: "2023-10-04",
      albumCancion: "Luces de la Ciudad",
      cantidad: 4,
      precio: 25,
      total: 100,
      activo: false,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyFeApeX_sK4A4lanPtnSFnEL6T1biZTRqDw&s",
    },
    {
      fecha: "2023-10-05",
      albumCancion: "Ritmo Infinito",
      cantidad: 2,
      precio: 30,
      total: 60,
      activo: true,
      imagenUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRyFdfk0jmPeGFdGpP5XAIyIOZhwvO6meMDaw&s",
    },
  ]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
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
        stiffness: 50,
        damping: 15,
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
    <motion.div
      className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen p-8 relative overflow-hidden"
      initial={{ y: -50 }}
      animate={{ y: 0 }}
      transition={{ duration: 1.5, ease: "easeOut" }}
    >
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
        .drop-shadow-glow {
          /* Ajusta estos valores si quieres que el brillo sea más o menos intenso */
          text-shadow: 0 0 8px rgba(0, 255, 140, 0.8), 0 0 20px rgba(0, 255, 140, 0.5);
        }
        /* New glow effect for modal border */
        .modal-glow-border {
          box-shadow: 0 0 25px rgba(0, 255, 140, 0.4), 0 0 60px rgba(0, 255, 140, 0.2);
          border: 2px solid rgba(0, 255, 140, 0.5); /* Slightly stronger neon border */
        }
      `}</style>

      <div className="relative z-10">
        {/* Encabezado */}
        <motion.div
          className="glass-card p-8 mb-8 shadow-2xl relative overflow-hidden"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            type: "spring",
            stiffness: 50,
            damping: 20,
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
            <ol className="flex flex-wrap gap-2 list-none p-0 m-0 justify-center items-center text-gray-100">
              {" "}
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

        {/* Contenedor principal de datos con animación de presencia - Solo tarjetas */}
        <AnimatePresence mode="wait">
          {filteredVentas.length > 0 ? (
            <motion.div
              key="cards-view-only"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 custom-scrollbar"
            >
              {filteredVentas.map((venta, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-6 rounded-t-3xl rounded-br-3xl rounded-bl-xl shadow-md flex flex-col justify-between"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  exit={{ opacity: 0, scale: 0.8, transition: { duration: 0.3 } }}
                >
                  {/* Espacio para la imagen en la tarjeta */}
                  <div className="w-full h-32 mb-4 rounded-xl overflow-hidden bg-gray-800 flex items-center justify-center">
                    {venta.imagenUrl ? (
                      <img
                        src={venta.imagenUrl}
                        alt={venta.albumCancion}
                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                      />
                    ) : (
                      <span className="text-gray-500 text-sm">No Image</span>
                    )}
                  </div>

                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-xl font-bold text-white leading-snug">
                      {venta.albumCancion}
                    </h3>
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        venta.activo
                          ? "bg-gradient-to-r from-green-500 to-lime-500"
                          : "bg-red-600"
                      }`}
                    >
                      {venta.activo ? "Activo" : "Inactivo"}
                    </span>
                  </div>

                  <div className="space-y-3 text-sm text-gray-200 flex-grow">
                    <div>
                      <p className="text-gray-400">Fecha:</p>
                      <p>{venta.fecha}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Cantidad:</p>
                      <p>{venta.cantidad}</p>
                    </div>
                    <div>
                      <p className="text-gray-400">Precio Unitario:</p>
                      <p>${venta.precio.toFixed(2)}</p>
                    </div>
                  </div>

                  <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-700">
                    <p className="text-2xl font-extrabold text-[#00FF8C]">
                      ${venta.total.toFixed(2)}
                    </p>
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => openModalVer(index)}
                      className="w-12 h-12 rounded-full flex items-center justify-center cursor-pointer text-white transition-all duration-200"
                      style={{
                        backgroundColor: "#8B5CF6",
                        boxShadow: "0 4px 15px rgba(139, 92, 246, 0.7)",
                      }}
                      title="Ver Detalles"
                    >
                      <FiEye size={24} />
                    </motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="glass-card p-6 text-center text-lg text-gray-400 mt-8"
            >
              No se encontraron ventas que coincidan con los criterios de búsqueda o filtro.
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modal de Ver */}
        <AnimatePresence>
          {modalVer && (
            <ModalVer data={ventas[currentVenta]} onClose={closeModalVer} />
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

const ModalVer = ({ data, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-4 rounded-2xl shadow-2xl w-full max-w-sm border border-white border-opacity-20 relative overflow-hidden modal-glow-border"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      >
        {/* Fondo sutil dentro del modal para mejorar la presentación */}
        <div
          className="absolute inset-0 opacity-5"
          style={{
            backgroundImage: `url(/img/dashboard-img/abstract-pattern-dark.png)`,
            backgroundSize: "cover",
            transform: "scale(1.5)",
          }}
        ></div>
        <div className="relative z-10 flex flex-col h-full">
          <h2 className="text-xl font-extrabold mb-4 text-white text-center tracking-wide drop-shadow-md border-b border-gray-700 pb-2">
            Detalle de Venta
          </h2>

          {/* Espacio para la imagen destacada en el modal */}
          <div className="w-32 h-32 mx-auto mb-3 rounded-full overflow-hidden border-2 border-[#00FF8C] shadow-lg flex items-center justify-center bg-gray-900">
            {data.imagenUrl ? (
              <img
                src={data.imagenUrl}
                alt={data.albumCancion}
                className="w-full h-full object-cover"
              />
            ) : (
              <span className="text-gray-500 text-xs">No Image</span>
            )}
          </div>

          {/* Sección principal de detalles */}
          <div className="flex-grow grid grid-cols-1 gap-y-3 gap-x-3 mb-5">
            <div className="flex flex-col items-center text-center">
              <label className="block text-xs font-semibold mb-0.5 text-gray-400 uppercase tracking-wider">
                Álbum / Canción
              </label>
              <p className="text-xl font-extrabold text-white leading-snug drop-shadow-sm">
                {data.albumCancion}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="flex flex-col">
                <label className="block text-xs font-semibold mb-0.5 text-gray-400 uppercase tracking-wider">
                  Fecha
                </label>
                <p className="text-md font-bold text-white">{data.fecha}</p>
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold mb-0.5 text-gray-400 uppercase tracking-wider">
                  Cantidad
                </label>
                <p className="text-md font-bold text-white">{data.cantidad}</p>
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold mb-0.5 text-gray-400 uppercase tracking-wider">
                  Precio Unitario
                </label>
                <p className="text-md font-bold text-white">
                  ${data.precio.toFixed(2)}
                </p>
              </div>
              <div className="flex flex-col">
                <label className="block text-xs font-semibold mb-0.5 text-gray-400 uppercase tracking-wider">
                  Estado
                </label>
                <span
                  className={`px-2 py-0.5 rounded-full text-white text-xs font-bold w-fit mx-auto ${
                    data.activo
                      ? "bg-gradient-to-r from-green-500 to-lime-500"
                      : "bg-red-600"
                  }`}
                >
                  {data.activo ? "Activo" : "Inactivo"}
                </span>
              </div>
            </div>
          </div>

          {/* Sección de Total destacada */}
          <div className="border-t border-gray-700 pt-4 mt-auto flex flex-col items-center">
            <label className="block text-base font-extrabold mb-0.5 text-gray-300 uppercase tracking-widest">
              TOTAL
            </label>
            <p className="text-4xl font-extrabold text-[#00FF8C] drop-shadow-glow">
              ${data.total.toFixed(2)}
            </p>
          </div>

          <div className="flex justify-end mt-4">
            <motion.button
              onClick={onClose}
              className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-1.5 px-4 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
              whileHover={{
                scale: 1.05,
                boxShadow: "0 0 15px rgba(255,255,255,0.2)",
              }}
              whileTap={{ scale: 0.95 }}
            >
              Cerrar
            </motion.button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Ventas;