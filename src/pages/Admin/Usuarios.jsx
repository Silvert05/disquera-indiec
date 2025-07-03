import { useState } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import { FiEye, FiEdit, FiTrash2, FiRefreshCcw, FiMusic, FiDownload } from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx"; // Importar la librería xlsx
import DOMPurify from "dompurify"; // Librería para sanitizar entradas y prevenir XSS

const Usuarios = () => {
  const [usuarios, setUsuarios] = useState([
    {
      nombre: "Usuario 1",
      correo: "usuario1@example.com",
      rol: "Administrador",
      estado: true,
      contraseña: "password1", // Contraseña por defecto
    },
    {
      nombre: "Usuario 2",
      correo: "usuario2@example.com",
      rol: "Cliente",
      estado: true,
      contraseña: "password2", // Contraseña por defecto
    },
    {
      nombre: "Usuario 3",
      correo: "usuario3@example.com",
      rol: "Administrador",
      estado: false,
      contraseña: "password3", // Contraseña por defecto
    },
  ]);

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [modalEliminar, setModalEliminar] = useState(false);
  const [modalConfirmarEditar, setModalConfirmarEditar] = useState(false);
  const [formData, setFormData] = useState({
    nombre: "",
    correo: "",
    rol: "",
    contraseña: "",
  });
  const [currentUsuario, setCurrentUsuario] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [confirmarContraseña, setConfirmarContraseña] = useState("");
  const [loading, setLoading] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const CONTRASEÑA_ESPECIFICA = "042005"; // Contraseña específica para eliminar y editar

  // Función para sanitizar entradas usando DOMPurify
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const openModalCrear = () => {
    setFormData({
      nombre: "",
      correo: "",
      rol: "",
      contraseña: "",
    });
    setErrors({});
    setModalCrear(true);
  };
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentUsuario(index);
    setFormData(usuarios[index]);
    setErrors({});
    setModalConfirmarEditar(true);
    setConfirmarContraseña("");
  };
  const closeModalEditar = () => {
    setModalEditar(false);
    setConfirmarContraseña("");
  };

  const openModalVer = (index) => {
    setCurrentUsuario(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  const openModalEliminar = (index) => {
    setCurrentUsuario(index);
    setModalEliminar(true);
    setConfirmarContraseña("");
  };
  const closeModalEliminar = () => {
    setModalEliminar(false);
    setConfirmarContraseña("");
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: sanitizeInput(value) });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "El nombre es obligatorio.";
    if (!formData.correo) newErrors.correo = "El correo es obligatorio.";
    if (!formData.rol) newErrors.rol = "El rol es obligatorio.";
    if (!formData.contraseña) newErrors.contraseña = "La contraseña es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddUsuario = () => {
    if (!validateForm()) return;
    closeModalCrear();
    setLoading(true);
    setTimeout(() => {
      setUsuarios([...usuarios, { ...formData, estado: true }]);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    }, 1000);
  };

  const handleUpdateUsuario = () => {
    if (!validateForm()) return;
    closeModalEditar();
    setLoading(true);
    setTimeout(() => {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[currentUsuario] = { ...formData };
      setUsuarios(updatedUsuarios);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    }, 1000);
  };

  const handleDeleteUsuario = () => {
    if (confirmarContraseña !== CONTRASEÑA_ESPECIFICA) {
      Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
        text: "La contraseña ingresada no es correcta.",
      });
      return;
    }
    setLoading(true);
    setTimeout(() => {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[currentUsuario].estado = false;
      setUsuarios(updatedUsuarios);
      setLoading(false);
      setShowSuccess(true);
      closeModalEliminar();
      setTimeout(() => setShowSuccess(false), 1000);
    }, 1000);
  };

  const handleRestoreUsuario = (index) => {
    setLoading(true);
    setTimeout(() => {
      const updatedUsuarios = [...usuarios];
      updatedUsuarios[index].estado = true;
      setUsuarios(updatedUsuarios);
      setLoading(false);
      setShowSuccess(true);
      setTimeout(() => setShowSuccess(false), 1000);
    }, 1000);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const handleExportToExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredUsuarios);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Usuarios");
    XLSX.writeFile(workbook, "usuarios.xlsx");
  };

  const handleConfirmarEditar = () => {
    if (confirmarContraseña !== CONTRASEÑA_ESPECIFICA) {
      Swal.fire({
        icon: "error",
        title: "Contraseña incorrecta",
        text: "La contraseña ingresada no es correcta.",
      });
      return;
    }
    setModalConfirmarEditar(false);
    setModalEditar(true);
    setConfirmarContraseña("");
  };

  const filteredUsuarios = usuarios.filter((usuario) =>
    usuario.nombre.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-center sm:text-left">
              Gestión de Usuarios
            </h1>
            <motion.button
              onClick={openModalCrear}
              className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group mt-4 sm:mt-0"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              Agregar Usuario
            </motion.button>
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
                  Usuarios
                </span>
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* Contenedor de búsqueda y exportar */}
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
              placeholder="Buscar por Nombre de Usuario..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiEye className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <motion.button
            onClick={handleExportToExcel}
            className="bg-gradient-to-r from-green-600 to-lime-600 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group w-full sm:w-auto"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
            Exportar a Excel
          </motion.button>
        </motion.div>

        {/* Tabla de usuarios */}
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
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Correo</th>
                <th className="py-3 px-6 text-left">Rol</th>
                <th className="py-3 px-6 text-left">Contraseña</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <tbody className="text-gray-200 text-sm font-light">
              {filteredUsuarios.map((usuario, index) => (
                <motion.tr
                  key={index}
                  className="border-b border-gray-700 glass-table-row"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * index }}
                >
                  <td className="py-4 px-6 whitespace-nowrap">
                    {usuario.nombre}
                  </td>
                  <td className="py-4 px-6 whitespace-nowrap">
                    {usuario.correo}
                  </td>
                  <td className="py-4 px-6">{usuario.rol}</td>
                  <td className="py-4 px-6">{usuario.contraseña}</td>
                  <td className="py-4 px-6 text-center">
                    <span
                      className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                        usuario.estado
                          ? "bg-gradient-to-r from-green-500 to-lime-500"
                          : "bg-red-600"
                      }`}
                    >
                      {usuario.estado ? "Activo" : "Inactivo"}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center flex space-x-2 justify-center items-center">
                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 4px 15px rgba(139, 92, 246, 0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: "#8B5CF6", // Morado
                        boxShadow: "0 4px 10px rgba(139, 92, 246, 0.6)",
                      }}
                      onClick={() => openModalVer(index)}
                      title="Ver Detalles"
                      transition={{ duration: 0.2 }}
                    >
                      <FiEye className="text-white" size={20} />
                    </motion.button>

                    <motion.button
                      whileHover={{
                        scale: 1.1,
                        boxShadow: "0 4px 15px rgba(234, 179, 8, 0.7)",
                      }}
                      whileTap={{ scale: 0.9 }}
                      className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                      style={{
                        backgroundColor: "#D97706", // Amarillo-600 (más oscuro que bg-yellow-600)
                        boxShadow: "0 4px 10px rgba(234, 179, 8, 0.6)",
                      }}
                      onClick={() => openModalEditar(index)}
                      title="Editar Usuario"
                      transition={{ duration: 0.2 }}
                    >
                      <FiEdit className="text-white" size={20} />
                    </motion.button>

                    {usuario.estado ? (
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 4px 15px rgba(220, 38, 38, 0.7)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: "#DC2626", // Rojo-600
                          boxShadow: "0 4px 10px rgba(220, 38, 38, 0.6)",
                        }}
                        onClick={() => openModalEliminar(index)}
                        title="Desactivar Usuario"
                        transition={{ duration: 0.2 }}
                      >
                        <FiTrash2 className="text-white" size={20} />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{
                          scale: 1.1,
                          boxShadow: "0 4px 15px rgba(22, 163, 74, 0.7)",
                        }}
                        whileTap={{ scale: 0.9 }}
                        className="w-9 h-9 rounded-full flex items-center justify-center cursor-pointer"
                        style={{
                          backgroundColor: "#16A34A", // Verde-600 (más oscuro que bg-green-600)
                          boxShadow: "0 4px 10px rgba(22, 163, 74, 0.6)",
                        }}
                        onClick={() => handleRestoreUsuario(index)}
                        title="Restaurar Usuario"
                        transition={{ duration: 0.2 }}
                      >
                        <FiRefreshCcw className="text-white" size={20} />
                      </motion.button>
                    )}
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
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
                <p className="text-xl text-white">Guardado con éxito</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Modales */}
        {modalCrear && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalCrear}
            onChange={handleInputChange}
            onSave={handleAddUsuario}
            errors={errors}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateUsuario}
            errors={errors}
          />
        )}

        {modalVer && (
          <ModalVer data={usuarios[currentUsuario]} onClose={closeModalVer} />
        )}

        {modalEliminar && (
          <ModalEliminar
            onClose={closeModalEliminar}
            onConfirm={handleDeleteUsuario}
            confirmarContraseña={confirmarContraseña}
            setConfirmarContraseña={setConfirmarContraseña}
          />
        )}

        {modalConfirmarEditar && (
          <ModalConfirmarEditar
            onClose={() => setModalConfirmarEditar(false)}
            onConfirm={handleConfirmarEditar}
            confirmarContraseña={confirmarContraseña}
            setConfirmarContraseña={setConfirmarContraseña}
          />
        )}
      </div>
    </div>
  );
};

// ModalFormulario
const ModalFormulario = ({ formData, onClose, onChange, onSave, errors }) => {
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
          Formulario de Usuario
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Nombre
            </label>
            <input
              type="text"
              name="nombre"
              value={formData.nombre}
              onChange={onChange}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors.nombre ? "border-red-500" : ""
              }`}
            />
            {errors.nombre && (
              <p className="text-red-400 text-sm mt-1">{errors.nombre}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Correo
            </label>
            <input
              type="email"
              name="correo"
              value={formData.correo}
              onChange={onChange}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors.correo ? "border-red-500" : ""
              }`}
            />
            {errors.correo && (
              <p className="text-red-400 text-sm mt-1">{errors.correo}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Rol
            </label>
            <select
              name="rol"
              value={formData.rol}
              onChange={onChange}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors.rol ? "border-red-500" : ""
              }`}
            >
              <option value="" className="bg-gray-800 text-white">
                Selecciona un rol
              </option>
              <option value="Administrador" className="bg-gray-800 text-white">
                Administrador
              </option>
              <option value="Cliente" className="bg-gray-800 text-white">
                Cliente
              </option>
            </select>
            {errors.rol && (
              <p className="text-red-400 text-sm mt-1">{errors.rol}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              name="contraseña"
              value={formData.contraseña}
              onChange={onChange}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors.contraseña ? "border-red-500" : ""
              }`}
            />
            {errors.contraseña && (
              <p className="text-red-400 text-sm mt-1">{errors.contraseña}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <motion.button
            onClick={onSave}
            className="bg-gradient-to-r from-green-500 to-lime-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-green-600 hover:to-lime-600 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(0, 255, 140, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Guardar
          </motion.button>
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

// ModalVer
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
          Detalle de Usuario
        </h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Nombre
            </label>
            <p className="text-lg text-white">{data.nombre}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Correo
            </label>
            <p className="text-lg text-white">{data.correo}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Rol
            </label>
            <p className="text-lg text-white">{data.rol}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Contraseña
            </label>
            <p className="text-lg text-white">{data.contraseña}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Estado
            </label>
            <span
              className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                data.estado
                  ? "bg-gradient-to-r from-green-500 to-lime-500"
                  : "bg-red-600"
              }`}
            >
              {data.estado ? "Activo" : "Inactivo"}
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

// ModalEliminar
const ModalEliminar = ({
  onClose,
  onConfirm,
  confirmarContraseña,
  setConfirmarContraseña,
}) => {
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!confirmarContraseña) {
      setError("No se ha ingresado una contraseña.");
      return;
    }
    setError("");
    onConfirm();
  };

  const handleClose = () => {
    setError(""); // Limpia el error al cerrar el modal
    onClose(); // Cierra el modal
  };

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
          Confirmar Eliminación
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 text-center">
            Para desactivar este usuario, ingresa la contraseña de confirmación:
          </p>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm mt-1">{error}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <motion.button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-red-600 to-red-700 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-red-700 hover:to-red-800 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(220, 38, 38, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Confirmar
          </motion.button>
          <motion.button
            onClick={handleClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
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
    </div>
  );
};

// ModalConfirmarEditar
const ModalConfirmarEditar = ({
  onClose,
  onConfirm,
  confirmarContraseña,
  setConfirmarContraseña,
}) => {
  const [error, setError] = useState("");

  const handleConfirm = () => {
    if (!confirmarContraseña) {
      setError("No se ha ingresado una contraseña.");
      return;
    }
    setError("");
    onConfirm();
  };

  const handleClose = () => {
    setError(""); // Limpia el error al cerrar el modal
    onClose(); // Cierra el modal
  };

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
          Confirmar Edición
        </h2>
        <div className="space-y-4">
          <p className="text-gray-300 text-center">
            Para editar este usuario, ingresa la contraseña de confirmación:
          </p>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Contraseña
            </label>
            <input
              type="password"
              value={confirmarContraseña}
              onChange={(e) => setConfirmarContraseña(e.target.value)}
              className={`glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                error ? "border-red-500" : ""
              }`}
            />
            {error && (
              <p className="text-red-400 text-sm mt-1">{error}</p>
            )}
          </div>
        </div>
        <div className="flex justify-end mt-8 gap-4">
          <motion.button
            onClick={handleConfirm}
            className="bg-gradient-to-r from-blue-500 to-indigo-500 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-blue-600 hover:to-indigo-600 transition-all duration-300"
            whileHover={{
              scale: 1.05,
              boxShadow: "0 0 15px rgba(59, 130, 246, 0.5)",
            }}
            whileTap={{ scale: 0.95 }}
          >
            Confirmar
          </motion.button>
          <motion.button
            onClick={handleClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-all duration-300"
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
    </div>
  );
};

ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  errors: PropTypes.object.isRequired,
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

ModalEliminar.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmarContraseña: PropTypes.string.isRequired,
  setConfirmarContraseña: PropTypes.func.isRequired,
};

ModalConfirmarEditar.propTypes = {
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
  confirmarContraseña: PropTypes.string.isRequired,
  setConfirmarContraseña: PropTypes.func.isRequired,
};

export default Usuarios;