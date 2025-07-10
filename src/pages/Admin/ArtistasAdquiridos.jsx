// ===================== IMPORTACIONES =====================
import { useState, useRef } from "react";
import PropTypes from "prop-types";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { Bar } from "react-chartjs-2";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";
import { FiUpload, FiEye, FiEdit, FiDownload, FiFileText, FiPlus, FiShoppingBag, FiShoppingCart, FiRefreshCcw, FiMusic, FiImage } from "react-icons/fi";
import { Chart as ChartJS, BarElement, CategoryScale, LinearScale, Tooltip, Legend } from "chart.js";
ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);

// ===================== COMPONENTE PRINCIPAL =====================
const ArtistAcquisition = () => {
  // Estados
  const [activeView, setActiveView] = useState("main");
  const [transacciones, setTransacciones] = useState([
    {
      nombre: "Ozzy Osbourne",
      tipo: "compra",
      fechaInicio: "1995-01-01",
      fechaFin: "2024-01-01",
      monto: 100000,
      exclusividad: "exclusivo",
      contrato: null,
      estado: "adquirido",
      terminos: "Términos del contrato...",
      foto: "https://cdn.mos.cms.futurecdn.net/v9tv7ToPZtBHsgfbqLfnXe.jpg",
      articulos: [
        {
          id: 1,
          nombre: "Camiseta",
          precio: 25,
          stock: 100,
          vendidos: 45,
          foto: null,
        },
      ],
    },
    {
      nombre: "Ronnie James Dio",
      tipo: "compra",
      fechaInicio: "2000-02-01",
      fechaFin: "2015-02-01",
      monto: 120000,
      exclusividad: "exclusivo",
      contrato: null,
      estado: "adquirido",
      terminos: "Términos del contrato...",
      foto: "https://www.syracuse.com/resizer/YjzCF-oF8rNoPxjTPjJc1PIgODA=/arc-anglerfish-arc2-prod-advancelocal/public/4QCYVT2BB5HEPL4U2ADPIG5M7U.jpg",
      articulos: [
        {
          id: 2,
          nombre: "Gorra",
          precio: 20,
          stock: 80,
          vendidos: 35,
          foto: null,
        },
      ],
    },
    {
      nombre: "Robert Plant",
      tipo: "compra",
      fechaInicio: "1980-03-01",
      fechaFin: "2002-03-01",
      monto: 150000,
      exclusividad: "exclusivo",
      contrato: null,
      estado: "adquirido",
      terminos: "Términos del contrato...",
      foto: "https://www.coastaljazz.ca/wp-content/uploads/2018/06/robert_blog.png",
      articulos: [
        {
          id: 3,
          nombre: "Poster",
          precio: 15,
          stock: 120,
          vendidos: 60,
          foto: null,
        },
      ],
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalVenta, setModalVenta] = useState(false);
  const [isCompra, setIsCompra] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentIndex, setCurrentIndex] = useState(null);
  const [selectedArtist, setSelectedArtist] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [nuevoArticulo, setNuevoArticulo] = useState({
    nombre: "",
    precio: 0,
    stock: 0,
    foto: null,
  });
  const [formData, setFormData] = useState({
    nombre: "",
    tipo: "compra",
    fechaInicio: "",
    fechaFin: "",
    monto: 0,
    contrato: null,
    estado: "adquirido",
    terminos: "",
    foto: null,
    articulos: [],
  });

  // Funciones auxiliares
  const sanitizeInput = (input) => DOMPurify.sanitize(input);

  // Funciones de modales
  const openModalCrear = () => setModalCrear(true);
  const closeModalCrear = () => setModalCrear(false);
  const openModalEditar = (index) => {
    setCurrentIndex(index);
    setFormData(transacciones[index]);
    setIsCompra(transacciones[index].tipo === "compra");
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);
  const openModalVer = (index) => {
    setCurrentIndex(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);
  const openModalVenta = (index) => {
    setCurrentIndex(index);
    setFormData(transacciones[index]);
    setFormData((prev) => ({
      ...prev,
      montoVenta: prev.monto,
      fechaVenta: "",
      acuerdoVenta: null,
    }));
    setModalVenta(true);
  };
  const closeModalVenta = () => setModalVenta(false);

  // Manejo de inputs
  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: files ? files[0] : sanitizeInput(value),
    }));
  };

  // Validación
  const validateForm = () => (
    formData.nombre &&
    formData.fechaInicio &&
    (isCompra ? formData.fechaFin : true) &&
    formData.monto > 0
  );

  // Acciones CRUD
  const handleAddTransaccion = () => {
    if (!validateForm()) {
      Swal.fire("Error", "Todos los campos requeridos deben estar completos", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const newTransaction = {
        ...formData,
        tipo: isCompra ? "compra" : "venta",
        estado: isCompra ? "adquirido" : "vendido",
        fechaFin: isCompra ? formData.fechaFin : "finalizo",
      };

      setTransacciones([...transacciones, newTransaction]);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      closeModalCrear();
      
      setFormData({
        nombre: "",
        tipo: isCompra ? "compra" : "venta",
        fechaInicio: "",
        fechaFin: "",
        monto: 0,
        exclusividad: "exclusivo",
        contrato: null,
        estado: isCompra ? "adquirido" : "vendido",
        terminos: "",
        foto: null,
        articulos: [],
      });
    }, 1000);
  };

  const handleUpdateTransaccion = () => {
    if (!validateForm()) {
      Swal.fire("Error", "Todos los campos requeridos deben estar completos", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const updatedTransaction = {
        ...formData,
        tipo: isCompra ? "compra" : "venta",
        estado: isCompra ? "adquirido" : "vendido",
        fechaFin: isCompra ? formData.fechaFin : "finalizo",
      };

      const updated = [...transacciones];
      updated[currentIndex] = updatedTransaction;
      setTransacciones(updated);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      closeModalEditar();
    }, 1000);
  };

  const handleVentaTransaccion = () => {
    setLoading(true);
    setTimeout(() => {
      const updatedTransaction = {
        ...formData,
        monto: formData.montoVenta || formData.monto,
        fechaVenta: formData.fechaVenta || formData.fechaInicio,
        acuerdoVenta: formData.acuerdoVenta || null,
        tipo: "venta",
        estado: "vendido",
        fechaFin: "finalizo",
      };

      const updated = [...transacciones];
      updated[currentIndex] = updatedTransaction;
      setTransacciones(updated);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
      closeModalVenta();
    }, 1000);
  };

  const handleRestore = (index) => {
    setLoading(true);
    setTimeout(() => {
      const updated = [...transacciones];
      updated[index].estado = "adquirido";
      setTransacciones(updated);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    }, 1000);
  };

  // Búsqueda y exportación
  const handleSearchChange = (e) => setSearchTerm(sanitizeInput(e.target.value));

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(transacciones);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Transacciones");
    XLSX.writeFile(workbook, "transacciones_artistas.xlsx");
  };

  const filteredData = transacciones.filter((item) =>
    item.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Estadísticas y artículos
  const calcularEstadisticas = (articulos) => ({
    totalVendido: articulos.reduce((sum, art) => sum + art.vendidos, 0),
    ingresosTotales: articulos.reduce((sum, art) => sum + art.vendidos * art.precio, 0),
    articuloMasVendido: articulos.reduce(
      (max, art) => (art.vendidos > max.vendidos ? art : max),
      { vendidos: -1 }
    ),
  });

  const agregarArticulo = () => {
    if (!nuevoArticulo.nombre || nuevoArticulo.precio <= 0 || nuevoArticulo.stock <= 0) {
      Swal.fire("Error", "Todos los campos del artículo son requeridos", "error");
      return;
    }

    setLoading(true);
    setTimeout(() => {
      const updated = [...transacciones];
      const artista = updated.find((a) => a.nombre === selectedArtist);

      if (artista) {
        artista.articulos.push({
          ...nuevoArticulo,
          id: Date.now(),
          vendidos: 0,
        });
        setTransacciones(updated);
        setNuevoArticulo({ nombre: "", precio: 0, stock: 0, foto: null });
        setLoading(false);
        setShowSuccess(true);
        setTimeout(() => setShowSuccess(false), 1000);
      }
    }, 1000);
  };

  // Variantes de animación
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

  // Vista de Merchandising
  if (activeView === "merchandising") {
    const currentArtist = transacciones.find((a) => a.nombre === selectedArtist);
    if (!currentArtist) {
      return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100">
          <p className="mb-4 text-xl">No se ha seleccionado un artista para Merchandising.</p>
          <motion.button
            onClick={() => setActiveView("main")}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white px-6 py-3 rounded-full shadow-lg"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            Volver
          </motion.button>
        </div>
      );
    }
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 p-8">
        <PanelMerchandising
          artista={currentArtist}
          onClose={() => {
            setActiveView("main");
            setSelectedArtist(null);
          }}
          nuevoArticulo={nuevoArticulo}
          setNuevoArticulo={setNuevoArticulo}
          agregarArticulo={agregarArticulo}
          calcularEstadisticas={calcularEstadisticas}
        />
      </div>
    );
  }

  // Vista Principal con Tarjetas
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
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem;
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
          background: #00ff8c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39ff14;
        }
        .glass-table-header {
          background-color: rgba(0, 255, 140, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 140, 0.3);
        }
        .glass-table-row {
          background-color: rgba(255, 255, 255, 0.03);
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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-center sm:text-left">
              Artistas Adquiridos
            </h1>
            <div className="flex gap-2 mt-4 sm:mt-0">
              <motion.button
                onClick={() => {
                  setIsCompra(true);
                  openModalCrear();
                }}
                className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiPlus /> Agregar Grupo
              </motion.button>
              <motion.button
                onClick={handleExportExcel}
                className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                <FiDownload /> Exportar
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Controles: Búsqueda */}
        <motion.div
          className="glass-card p-6 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
          transition={{ delay: 0.3 }}
        >
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Buscar grupo..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiEye className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
        </motion.div>

        {/* Tarjetas de Artistas */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {filteredData.map((item, index) => (
            <motion.div
              key={index}
              className="glass-card p-6 rounded-xl"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <div className="flex flex-col items-center mb-4">
                {item.foto ? (
                  <img
                    src={item.foto}
                    alt={item.nombre}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                ) : (
                  <div className="w-full h-48 bg-gray-800 rounded-lg mb-4 flex items-center justify-center">
                    <FiImage className="text-gray-500 text-4xl" />
                  </div>
                )}
                <div className="w-full flex justify-between items-start">
                  <h3 className="text-2xl font-bold text-white">{item.nombre}</h3>
                  <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    item.estado === "adquirido" ? "bg-green-500" : "bg-red-500"
                  }`}>
                    {item.estado}
                  </span>
                </div>
              </div>

              <div className="space-y-4">
                <div>
                  <h4 className="text-sm font-semibold text-gray-400">Género musical</h4>
                  <p className="text-lg font-medium text-white">Rock</p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400">Descripción</h4>
                  <p className="text-lg font-medium text-white">
                    {item.nombre === "AC/DC" ? "Banda de rock clásico" : "Banda de rock"}
                  </p>
                </div>

                <div>
                  <h4 className="text-sm font-semibold text-gray-400">Plataforma</h4>
                  <div className="flex items-center gap-2">
                    <span className="text-lg font-medium text-white">Spotify</span>
                    <span className="text-green-400">💷 Visitar</span>
                  </div>
                </div>
              </div>

              <div className="flex justify-end gap-2 mt-6">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center"
                  onClick={() => openModalVer(index)}
                >
                  <FiEye className="text-white" size={16} />
                </motion.button>

                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-8 h-8 rounded-full bg-yellow-500 flex items-center justify-center"
                  onClick={() => openModalEditar(index)}
                >
                  <FiEdit className="text-white" size={16} />
                </motion.button>

                {item.estado === "adquirido" && (
                  <>
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full bg-red-500 flex items-center justify-center"
                      onClick={() => openModalVenta(index)}
                    >
                      <FiShoppingCart className="text-white" size={16} />
                    </motion.button>

                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      className="w-8 h-8 rounded-full bg-purple-500 flex items-center justify-center"
                      onClick={() => {
                        setSelectedArtist(item.nombre);
                        setActiveView("merchandising");
                      }}
                    >
                      <FiShoppingBag className="text-white" size={16} />
                    </motion.button>
                  </>
                )}

                {item.estado === "vendido" && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-8 h-8 rounded-full bg-indigo-500 flex items-center justify-center"
                    onClick={() => handleRestore(index)}
                  >
                    <FiRefreshCcw className="text-white" size={16} />
                  </motion.button>
                )}
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Animación de carga */}
        <AnimatePresence>
          {loading && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <div className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white border-opacity-20">
                <div className="border-t-4 border-[#00FF8C] border-solid w-16 h-16 rounded-full animate-spin mx-auto"></div>
                <p className="mt-4 text-lg text-gray-300">Cargando...</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Mensaje de éxito */}
        <AnimatePresence>
          {showSuccess && (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.3 }}
              className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50"
            >
              <div className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white border-opacity-20">
                <FiMusic className="text-6xl text-[#00FF8C] mx-auto mb-4" />
                <p className="text-xl text-white">Operación exitosa</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* ===================== MODALES ===================== */}
        {/* Modal de Compra/Edición */}
        {(modalCrear || modalEditar) && (
          <ModalTransaccion
            isOpen={modalCrear || modalEditar}
            onClose={modalCrear ? closeModalCrear : closeModalEditar}
            formData={formData}
            onChange={handleInputChange}
            onSave={modalCrear ? handleAddTransaccion : handleUpdateTransaccion}
            isCompra={isCompra}
            setIsCompra={setIsCompra}
          />
        )}

        {/* Modal de Visualización */}
        {modalVer && currentIndex !== null && (
          <ModalVer data={transacciones[currentIndex]} onClose={closeModalVer} />
        )}

        {/* Modal de Venta */}
        {modalVenta && currentIndex !== null && (
          <ModalVenta
            isOpen={modalVenta}
            onClose={closeModalVenta}
            formData={formData}
            onChange={handleInputChange}
            onConfirm={handleVentaTransaccion}
          />
        )}
      </div>
    </div>
  );
};

// ===================== COMPONENTES SECUNDARIOS =====================

// ModalTransaccion (Compra/Edición)
const ModalTransaccion = ({ isOpen, onClose, formData, onChange, onSave, isCompra, setIsCompra }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-3xl border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <div className="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold text-white text-center sm:text-left">
            {isCompra ? "Compra de Artista" : "Venta de Artista"}
          </h2>
          <div className="flex items-center gap-2">
            <span className="text-gray-300">Operación:</span>
            <div className="flex bg-gray-800 rounded-full p-1">
              <button
                onClick={() => setIsCompra(true)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  isCompra
                    ? "bg-gradient-to-r from-green-500 to-lime-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Compra
              </button>
              <button
                onClick={() => setIsCompra(false)}
                className={`px-4 py-1 rounded-full text-sm font-medium transition-colors ${
                  !isCompra
                    ? "bg-gradient-to-r from-red-500 to-pink-500 text-white"
                    : "text-gray-300 hover:text-white"
                }`}
              >
                Venta
              </button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {/* Campo: Nombre del Artista */}
          <div>
            <label className="block mb-2 text-gray-300">Nombre del Artista</label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          {/* Campo: Monto */}
          <div>
            <label className="block mb-2 text-gray-300">Monto ({isCompra ? "Costo" : "Precio"})</label>
            <input
              type="number"
              name="monto"
              value={formData.monto}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          {/* Campo: Fecha de Inicio */}
          <div>
            <label className="block mb-2 text-gray-300">Fecha Inicio Contrato</label>
            <input
              type="date"
              name="fechaInicio"
              value={formData.fechaInicio}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          {/* Campo: Fecha Fin */}
          <div>
            <label className="block mb-2 text-gray-300">Fecha Fin Contrato</label>
            <input
              type="date"
              name="fechaFin"
              value={formData.fechaFin}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          {/* Campo: Foto del Artista */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-gray-300">Foto del Artista</label>
            <label className="w-full p-3 rounded-lg cursor-pointer flex items-center justify-center font-semibold bg-gradient-to-r from-green-600 to-lime-600 text-white hover:from-green-700 hover:to-lime-700 transition-all duration-300">
              <FiImage className="mr-2" />
              {formData.foto ? (typeof formData.foto === 'string' ? 'Imagen actual' : formData.foto.name) : "Subir Foto"}
              <input
                type="file"
                name="foto"
                onChange={onChange}
                className="hidden"
                accept="image/*"
              />
            </label>
            {formData.foto && (
              <div className="mt-4 flex justify-center">
                <img
                  src={typeof formData.foto === 'string' ? formData.foto : URL.createObjectURL(formData.foto)}
                  alt="Preview"
                  className="max-h-40 rounded-lg shadow"
                />
              </div>
            )}
          </div>

          {/* Campo: Subir archivo PDF */}
          <div className="sm:col-span-2">
            <label className="block mb-2 text-gray-300">
              {isCompra ? "Contrato PDF" : "Acuerdo de Compra-Venta"}
            </label>
            <label className="w-full p-3 rounded-lg cursor-pointer flex items-center justify-center font-semibold bg-gradient-to-r from-green-600 to-lime-600 text-white hover:from-green-700 hover:to-lime-700 transition-all duration-300">
              <FiFileText className="mr-2" />
              {isCompra
                ? formData.contrato
                  ? formData.contrato.name
                  : "Subir Contrato"
                : formData.acuerdo
                ? formData.acuerdo.name
                : "Subir Acuerdo"}
              <input
                type="file"
                name={isCompra ? "contrato" : "acuerdo"}
                onChange={onChange}
                className="hidden"
                accept=".pdf"
              />
            </label>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row justify-end gap-4 mt-8">
          <motion.button
            onClick={onSave}
            className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 140, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
            disabled={!formData.nombre || !formData.monto || !formData.fechaInicio || (isCompra && !formData.fechaFin)}
          >
            Guardar
          </motion.button>
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalTransaccion.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  isCompra: PropTypes.bool.isRequired,
  setIsCompra: PropTypes.func.isRequired,
};

// ModalVer (Visualización de detalles)
const ModalVer = ({ data, onClose }) => {
  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-2xl border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <h2 className="text-2xl font-bold mb-6 text-white">Detalles de Transacción</h2>
        
        {/* Foto del artista */}
        {data.foto && (
          <div className="flex justify-center mb-6">
            <img
              src={typeof data.foto === 'string' ? data.foto : URL.createObjectURL(data.foto)}
              alt={data.nombre}
              className="max-h-60 rounded-lg shadow-lg"
            />
          </div>
        )}

        <div className="space-y-4">
          <div>
            <label className="font-semibold text-gray-300">Artista:</label>
            <p className="text-white">{data.nombre}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-300">Tipo:</label>
            <p className="text-white capitalize">{data.tipo}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-300">Periodo de Contrato:</label>
            <p className="text-white">
              {data.fechaInicio} - {data.fechaFin}
            </p>
          </div>
          <div>
            <label className="font-semibold text-gray-300">Monto:</label>
            <p className="text-white">${data.monto.toLocaleString()}</p>
          </div>
          <div>
            <label className="font-semibold text-gray-300">Documentación:</label>
            {data.contrato && (
              <a
                href={URL.createObjectURL(data.contrato)}
                download
                className="text-[#00FF8C] hover:underline flex items-center"
              >
                <FiFileText className="mr-2" /> Descargar Contrato
              </a>
            )}
          </div>
          <div>
            <label className="font-semibold text-gray-300">Términos:</label>
            <p className="text-white whitespace-pre-wrap">{data.terminos}</p>
          </div>
        </div>
        <motion.button
          onClick={onClose}
          className="mt-6 bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg float-right"
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 15px rgba(255,255,255,0.2)",
          }}
          whileTap={{ scale: 0.95 }}
        >
          Cerrar
        </motion.button>
      </motion.div>
    </motion.div>
  );
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

// ModalVenta (Venta de Artista)
const ModalVenta = ({ isOpen, onClose, formData, onChange, onConfirm }) => {
  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-lg md:max-w-2xl border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ type: "spring", stiffness: 150, damping: 12 }}
      >
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white">Venta de Artista</h2>
          <button 
            onClick={onClose} 
            className="text-gray-400 hover:text-white text-2xl"
          >
            &times;
          </button>
        </div>

        <div className="space-y-4">
          {/* Campo: Nombre del Artista (solo lectura) */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Artista</label>
            <input
              type="text"
              value={formData.nombre}
              readOnly
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100"
            />
          </div>

          {/* Foto del artista */}
          {formData.foto && (
            <div className="flex justify-center">
              <img
                src={typeof formData.foto === 'string' ? formData.foto : URL.createObjectURL(formData.foto)}
                alt={formData.nombre}
                className="max-h-40 rounded-lg shadow"
              />
            </div>
          )}

          {/* Campo: Precio de Venta */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Precio de Venta</label>
            <input
              type="number"
              name="montoVenta"
              value={formData.montoVenta || ""}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              placeholder="Ingrese el precio de venta"
            />
          </div>

          {/* Campo: Fecha de Venta */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Fecha de Venta</label>
            <input
              type="date"
              name="fechaVenta"
              value={formData.fechaVenta || ""}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          {/* Campo: Subir Acuerdo de Venta */}
          <div>
            <label className="block mb-2 font-semibold text-gray-300">Acuerdo de Venta (PDF)</label>
            <label className="w-full p-3 rounded-lg cursor-pointer flex items-center justify-center font-semibold bg-gradient-to-r from-green-600 to-lime-600 text-white hover:from-green-700 hover:to-lime-700 transition-all duration-300">
              <FiFileText className="mr-2" />
              {formData.acuerdoVenta ? formData.acuerdoVenta.name : "Subir Acuerdo"}
              <input
                type="file"
                name="acuerdoVenta"
                onChange={onChange}
                className="hidden"
                accept=".pdf"
              />
            </label>
          </div>
        </div>

        <div className="flex justify-end gap-4 mt-8">
          <motion.button
            onClick={onConfirm}
            className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 140, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Confirmar Venta
          </motion.button>
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(255,255,255,0.2)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalVenta.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  formData: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

const PanelMerchandising = ({
  artista,
  onClose,
  nuevoArticulo,
  setNuevoArticulo,
  agregarArticulo,
  calcularEstadisticas,
}) => {
  const stats = calcularEstadisticas(artista.articulos);
  const totalArticulos = artista.articulos.length;
  const ventasPromedio =
    totalArticulos > 0 ? (stats.ingresosTotales / totalArticulos).toFixed(2) : 0;

  const fileInputRef = useRef(null);
  const [articles, setArticles] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [selectedArticle, setSelectedArticle] = useState(null);
  const [totalArticulosState, setTotalArticulos] = useState(0);
  const [estadisticas, setEstadisticas] = useState({
    totalVendido: 0,
    ingresosTotales: 0,
    articuloMasVendido: null,
  });

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const sheetName = workbook.SheetNames[0];
        const sheet = workbook.Sheets[sheetName];
        const jsonData = XLSX.utils.sheet_to_json(sheet);

        const formattedData = jsonData.map((row) => ({
          nombre: row["Nombre Articulo"],
          precio: parseFloat(row["Precio"]) || 0,
          vendidos: parseInt(row["Vendidos"], 10) || 0,
          stock: parseInt(row["Stock"], 10) || 0,
          imagen: row["Imagen"] || "",
        }));

        setArticles((prevArticles) => {
          const updatedArticles = [...prevArticles, ...formattedData];
          actualizarEstadisticas(updatedArticles);
          return updatedArticles;
        });

        setTotalArticulos((prev) => prev + formattedData.length);

        setChartData({
          labels: formattedData.map((item) => item.nombre),
          datasets: [
            {
              label: "Ventas",
              data: formattedData.map((item) => item.vendidos),
              backgroundColor: "rgba(0, 255, 140, 0.6)",
            },
            {
              label: "Stock",
              data: formattedData.map((item) => item.stock),
              backgroundColor: "rgba(57, 255, 20, 0.6)",
            },
          ],
        });
      } catch (error) {
        console.error("Error al leer el archivo Excel:", error);
      }
    };
    reader.readAsArrayBuffer(file);
  };

  const actualizarEstadisticas = (nuevosArticulos) => {
    const totalVendido = nuevosArticulos.reduce(
      (acc, item) => acc + item.vendidos,
      0
    );
    const ingresosTotales = nuevosArticulos.reduce(
      (acc, item) => acc + item.vendidos * item.precio,
      0
    );
    const articuloMasVendido = nuevosArticulos.reduce(
      (max, item) => (item.vendidos > (max?.vendidos || 0) ? item : max),
      null
    );

    setEstadisticas({
      totalVendido,
      ingresosTotales,
      articuloMasVendido,
    });
  };

  // Animation variants
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
    <div className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 py-8 relative overflow-hidden">
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
          background-color: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px) saturate(180%);
          -webkit-backdrop-filter: blur(15px) saturate(180%);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem;
        }
        .glass-table-header {
          background-color: rgba(0, 255, 140, 0.2);
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
          border-bottom: 1px solid rgba(0, 255, 140, 0.3);
        }
        .glass-table-row {
          background-color: rgba(255, 255, 255, 0.03);
        }
        .glass-table-row:hover {
          background-color: rgba(255, 255, 255, 0.08);
        }
      `}</style>

      
        {/* Encabezado */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-8 shadow-2xl relative overflow-hidden"
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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <div className="flex items-center gap-4">
              {artista.foto && (
                <img
                  src={typeof artista.foto === 'string' ? artista.foto : URL.createObjectURL(artista.foto)}
                  alt={artista.nombre}
                  className="w-16 h-16 sm:w-20 sm:h-20 rounded-full object-cover border-2 border-[#00FF8C]"
                />
              )}
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-center sm:text-left mb-4 sm:mb-0">
                Merchandising de {artista.nombre}
              </h1>
            </div>
            <motion.button
              onClick={onClose}
              className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group text-xl sm:text-2xl"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              &times;
            </motion.button>
          </div>
        </motion.div>

        {/* Formulario para agregar nuevo artículo */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
            Agregar Nuevo Artículo
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6">
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Nombre artículo
              </label>
              <input
                type="text"
                placeholder="Nombre artículo"
                value={nuevoArticulo.nombre}
                onChange={(e) =>
                  setNuevoArticulo({ ...nuevoArticulo, nombre: e.target.value })
                }
                className="glass-card bg-transparent border border-gray-700 p-2 sm:p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Precio
              </label>
              <input
                type="number"
                placeholder="Precio"
                value={nuevoArticulo.precio}
                onChange={(e) =>
                  setNuevoArticulo({
                    ...nuevoArticulo,
                    precio: parseFloat(e.target.value),
                  })
                }
                className="glass-card bg-transparent border border-gray-700 p-2 sm:p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Stock
              </label>
              <input
                type="number"
                placeholder="Stock"
                value={nuevoArticulo.stock}
                onChange={(e) =>
                  setNuevoArticulo({
                    ...nuevoArticulo,
                    stock: parseInt(e.target.value, 10),
                  })
                }
                className="glass-card bg-transparent border border-gray-700 p-2 sm:p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-300">
                Foto del Producto
              </label>
              <label className="glass-card bg-transparent border border-gray-700 p-2 sm:p-3 rounded-lg w-full text-gray-100 flex items-center justify-center cursor-pointer hover:bg-gray-800 transition-colors text-sm sm:text-base">
                <FiUpload className="mr-2" />
                Seleccionar Imagen
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    setNuevoArticulo({ ...nuevoArticulo, foto: e.target.files[0] })
                  }
                  className="hidden"
                />
              </label>
              {nuevoArticulo.foto && (
                <img
                  src={URL.createObjectURL(nuevoArticulo.foto)}
                  alt="Preview"
                  className="mt-2 w-20 h-20 sm:w-24 sm:h-24 object-cover rounded shadow"
                />
              )}
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-4 mt-6">
            <motion.label
              className="bg-gradient-to-r from-orange-500 to-amber-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 cursor-pointer text-sm sm:text-base"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiUpload />
              Subir Excel
              <input
                type="file"
                accept=".xlsx, .xls"
                onChange={handleFileUpload}
                className="hidden"
              />
            </motion.label>

            <motion.button
              onClick={agregarArticulo}
              className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 text-sm sm:text-base"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiPlus />
              Agregar Artículo
            </motion.button>
          </div>
        </motion.div>

        {/* Estadísticas */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <motion.div
            className="glass-card p-5 sm:p-6 text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[#00FF8C]">
              Total Vendido
            </h4>
            <p className="text-2xl sm:text-3xl font-bold">
              {estadisticas.totalVendido}
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-5 sm:p-6 text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[#00FF8C]">
              Ingresos Totales
            </h4>
            <p className="text-2xl sm:text-3xl font-bold">
              ${estadisticas.ingresosTotales.toLocaleString()}
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-5 sm:p-6 text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[#00FF8C]">
              Art. Más Popular
            </h4>
            <p className="text-xl sm:text-2xl">
              {estadisticas.articuloMasVendido?.nombre || "N/A"}
            </p>
          </motion.div>

          <motion.div
            className="glass-card p-5 sm:p-6 text-center"
            variants={itemVariants}
            whileHover="hover"
          >
            <h4 className="text-lg sm:text-xl font-bold mb-2 text-[#00FF8C]">
              Total Artículos
            </h4>
            <p className="text-2xl sm:text-3xl font-bold">
              {totalArticulosState}
            </p>
          </motion.div>
        </motion.div>

        {/* Ventas Promedio */}
        <motion.div
          className="glass-card p-5 sm:p-6 mb-8 text-center"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <h4 className="text-lg sm:text-xl font-bold mb-2 text-[#00FF8C]">
            Ventas Promedio
          </h4>
          <p className="text-2xl sm:text-3xl font-bold">${ventasPromedio}</p>
        </motion.div>

        {/* Gráfico de Ventas */}
        {chartData && (
          <motion.div
            className="glass-card p-6 sm:p-8 mb-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <h4 className="text-xl sm:text-2xl font-bold mb-4 text-[#00FF8C]">
              Gráfico de Ventas
            </h4>
            <div className="h-64 sm:h-80 md:h-96">
              {" "}
              {/* Responsive height */}
              <Bar
                data={chartData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      labels: {
                        color: "#ffffff",
                      },
                    },
                  },
                  scales: {
                    y: {
                      ticks: {
                        color: "#ffffff",
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                    x: {
                      ticks: {
                        color: "#ffffff",
                      },
                      grid: {
                        color: "rgba(255, 255, 255, 0.1)",
                      },
                    },
                  },
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Listado de Artículos del artista */}
        <motion.div
          className="glass-card p-6 sm:p-8 mb-8"
          variants={itemVariants}
          initial="hidden"
          animate="visible"
          whileHover="hover"
        >
          <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
            Artículos de {artista.nombre}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
            {artista.articulos.map((articulo, index) => (
              <motion.div
                key={index}
                className="glass-card p-4 rounded-lg flex flex-col items-center text-center"
                variants={itemVariants}
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 8px 20px rgba(0, 255, 140, 0.2)",
                }}
              >
                <img
                  src={
                    articulo.foto
                      ? typeof articulo.foto === "string" &&
                        articulo.foto.startsWith("http")
                        ? articulo.foto
                        : articulo.foto instanceof File
                        ? URL.createObjectURL(articulo.foto)
                        : "https://http2.mlstatic.com/D_NQ_NP_662041-MEC80424904482_112024-O.webp"
                      : "https://http2.mlstatic.com/D_NQ_NP_662041-MEC80424904482_112024-O.webp"
                  }
                  alt={articulo.nombre}
                  className="w-full h-32 sm:h-40 object-cover rounded-md mb-3"
                />
                <h3 className="text-base sm:text-lg font-bold mb-1">
                  {articulo.nombre}
                </h3>
                <p className="text-gray-300 text-sm">Stock: {articulo.stock}</p>
                <p className="text-gray-300 text-sm">
                  Vendidos: {articulo.vendidos}
                </p>
                <p className="text-green-400 font-bold text-lg sm:text-xl mt-2">
                  ${articulo.precio}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Artículos importados */}
        {articles.length > 0 && (
          <motion.div
            className="glass-card p-6 sm:p-8 mt-8"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
          >
            <h2 className="text-xl sm:text-2xl font-bold mb-6 text-white">
              Artículos Importados
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4 sm:gap-6">
              {articles.map((article, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 rounded-lg flex flex-col items-center text-center cursor-pointer"
                  variants={itemVariants}
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 8px 20px rgba(0, 255, 140, 0.2)",
                  }}
                  onClick={() => setSelectedArticle(article)}
                >
                  {article.imagen && (
                    <img
                      src={article.imagen}
                      alt={article.nombre}
                      className="w-full h-32 sm:h-40 object-cover rounded-md mb-3"
                    />
                  )}
                  <h3 className="text-base sm:text-lg font-bold mb-1">
                    {article.nombre}
                  </h3>
                  <p className="text-gray-300 text-sm">
                    Precio: ${article.precio}
                  </p>
                  <p className="text-gray-300 text-sm">Stock: {article.stock}</p>
                  <p className="text-gray-300 text-sm">
                    Vendidos: {article.vendidos}
                  </p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}

        {/* Modal de detalle de artículo */}
        {selectedArticle && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4">
            <motion.div
              className="glass-card p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm lg:max-w-md border border-white border-opacity-20 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 150, damping: 12 }}
            >
              <button
                onClick={() => setSelectedArticle(null)}
                className="absolute top-3 right-3 text-gray-400 hover:text-white text-3xl font-bold leading-none"
                aria-label="Cerrar"
              >
                &times;
              </button>
              <h2 className="text-xl sm:text-2xl font-bold mb-4 text-center">
                {selectedArticle.nombre}
              </h2>
              {selectedArticle.imagen && (
                <img
                  src={selectedArticle.imagen}
                  alt={selectedArticle.nombre}
                  className="w-full h-48 sm:h-64 object-contain rounded-lg mb-4"
                />
              )}
              <div className="space-y-2 text-center">
                <p className="text-gray-300 text-base">
                  <span className="font-semibold">Precio:</span> $
                  {selectedArticle.precio}
                </p>
                <p className="text-gray-300 text-base">
                  <span className="font-semibold">Stock:</span>{" "}
                  {selectedArticle.stock}
                </p>
                <p className="text-gray-300 text-base">
                  <span className="font-semibold">Vendidos:</span>{" "}
                  {selectedArticle.vendidos}
                </p>
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={() => setSelectedArticle(null)}
                  className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-2 px-6 rounded-full shadow-lg text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  Cerrar
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </div>
   
  );
};

PanelMerchandising.propTypes = {
  artista: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    foto: PropTypes.any,
    articulos: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        nombre: PropTypes.string.isRequired,
        precio: PropTypes.number.isRequired,
        stock: PropTypes.number.isRequired,
        vendidos: PropTypes.number.isRequired,
        foto: PropTypes.any,
      })
    ).isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
  nuevoArticulo: PropTypes.shape({
    nombre: PropTypes.string.isRequired,
    precio: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    stock: PropTypes.oneOfType([PropTypes.number, PropTypes.string]).isRequired,
    foto: PropTypes.any,
  }).isRequired,
  setNuevoArticulo: PropTypes.func.isRequired,
  agregarArticulo: PropTypes.func.isRequired,
  calcularEstadisticas: PropTypes.func.isRequired,
};

export default ArtistAcquisition;