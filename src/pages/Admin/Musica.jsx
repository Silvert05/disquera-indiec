import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiRefreshCcw,
  FiDownload,
  FiSearch,
  FiPlusCircle,
  FiDisc,
  FiCalendar,
  FiClock,
  FiTag,
  FiMusic,
} from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";
import AOS from "aos";
import "aos/dist/aos.css";

const Musica = () => {
  const [canciones, setCanciones] = useState([
    {
      foto: "https://marketplace.canva.com/EAF2uOSjdVU/1/0/1600w/canva-negro-p%C3%BArpura-brillante-%C3%A1cido-brutalista-general-hip-hop-portada-de-%C3%A1lbum-TuLZGoZHXtA.jpg",
      titulo: "Canción 1: El Viaje",
      album: "Descubrimiento",
      duracion: "3:45",
      año: 2020,
      genero: "Rock",
      estado: true,
    },
    {
      foto: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover-song-templates-design-66c8a597c5f8ed4370568005e7344297_screen.jpg?ts=1663427910",
      titulo: "Canción 2: Sueños de Verano",
      album: "Momentos Pop",
      duracion: "4:20",
      año: 2021,
      genero: "Pop",
      estado: true,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d0000b273c9ab5153619d20949acbd75b",
      titulo: "Jazz Nocturno",
      album: "Luces de la Ciudad",
      duracion: "5:10",
      año: 2019,
      genero: "Jazz",
      estado: true,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d00001e02d903cd3ee0741459aba964bc",
      titulo: "Sinfonía del Bosque",
      album: "Naturaleza Sonora",
      duracion: "7:00",
      año: 2018,
      genero: "Clásica",
      estado: false,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d00001e021473df4204f0dbc75c7c79fc",
      titulo: "Ritmo Electrónico",
      album: "Pulso Urbano",
      duracion: "3:15",
      año: 2022,
      genero: "Electrónica",
      estado: true,
    },
  ]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const initialFormData = {
    foto: null,
    titulo: "",
    album: "",
    duracion: "",
    año: "",
    genero: "",
    estado: true,
  };

  const [formData, setFormData] = useState(initialFormData);
  const [currentCancionIndex, setCurrentCancionIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");

  const generos = [
    "Rock",
    "Pop",
    "Jazz",
    "Clásica",
    "Electrónica",
    "Hip-Hop",
    "Reggae",
    "Metal",
    "Indie",
    "Folk",
  ];

  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: false,
    });
  }, []);

  const openModalCrear = () => {
    setFormData(initialFormData);
    setErrors({});
    setModalCrear(true);
  };
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentCancionIndex(index);
    setFormData({ ...canciones[index] });
    setErrors({});
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (index) => {
    setCurrentCancionIndex(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    let newValue;

    if (name === "foto") {
      newValue = files[0];
    } else {
      newValue = sanitizeInput(value);
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    if (name !== "foto") {
      if (typeof value === "string" && value.trim() === "") {
        newErrors[name] = `El campo ${name} es obligatorio.`;
      } else {
        delete newErrors[name];
      }
    }

    if (name === "año" && value) {
      const year = parseInt(value);
      if (isNaN(year) || year <= 0 || String(value).length !== 4) {
        newErrors.año = "El año debe ser un número válido de 4 dígitos.";
      } else {
        delete newErrors.año;
      }
    }

    if (name === "duracion" && value) {
      if (!/^\d{1,2}:\d{2}$/.test(value)) {
        newErrors.duracion = "Formato de duración inválido (ej. 03:45).";
      } else {
        delete newErrors.duracion;
      }
    }

    setErrors(newErrors);
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo.trim()) newErrors.titulo = "El título es obligatorio.";
    if (!formData.album.trim()) newErrors.album = "El álbum es obligatorio.";
    if (!formData.duracion.trim())
      newErrors.duracion = "La duración es obligatoria.";
    if (!formData.año) newErrors.año = "El año es obligatorio.";
    if (
      formData.año &&
      (isNaN(formData.año) ||
        parseInt(formData.año) <= 0 ||
        String(formData.año).length !== 4)
    ) {
      newErrors.año = "El año debe ser un número válido de 4 dígitos.";
    }
    if (formData.duracion && !/^\d{1,2}:\d{2}$/.test(formData.duracion)) {
      newErrors.duracion = "Formato de duración inválido (ej. 03:45).";
    }
    if (!formData.genero.trim()) newErrors.genero = "El género es obligatorio.";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddCancion = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, completa todos los campos obligatorios correctamente.",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    setCanciones([...canciones, { ...formData, estado: true }]);
    Swal.fire({
      icon: "success",
      title: "Canción agregada",
      text: `La canción "${formData.titulo}" fue agregada exitosamente.`,
      confirmButtonColor: "#059669",
    });
    closeModalCrear();
    setFormData(initialFormData);
  };

  const handleUpdateCancion = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, completa todos los campos obligatorios correctamente.",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    const updatedCanciones = [...canciones];
    updatedCanciones[currentCancionIndex] = { ...formData };
    setCanciones(updatedCanciones);

    Swal.fire({
      icon: "success",
      title: "Canción actualizada",
      text: `La canción "${formData.titulo}" fue actualizada exitosamente.`,
      confirmButtonColor: "#059669",
    });
    closeModalEditar();
    setFormData(initialFormData);
  };

  const handleDeleteCancion = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto! La canción será marcada como inactiva.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCanciones = [...canciones];
        updatedCanciones[index].estado = false;
        setCanciones(updatedCanciones);

        Swal.fire({
          icon: "info",
          title: "Canción desactivada",
          text: "La canción fue marcada como inactiva.",
          confirmButtonColor: "#059669",
        });
      }
    });
  };

  const handleRestoreCancion = (index) => {
    const updatedCanciones = [...canciones];
    updatedCanciones[index].estado = true;
    setCanciones(updatedCanciones);

    Swal.fire({
      icon: "success",
      title: "Canción restaurada",
      text: "La canción fue restaurada y está activa nuevamente.",
      confirmButtonColor: "#059669",
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const handleSortByYear = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      canciones.map((cancion) => ({
        Título: cancion.titulo,
        Álbum: cancion.album,
        Duración: cancion.duracion,
        Año: cancion.año,
        Género: cancion.genero,
        Estado: cancion.estado ? "Activo" : "Inactivo",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Canciones");
    XLSX.writeFile(workbook, "canciones.xlsx");

    Swal.fire({
      icon: "success",
      title: "Exportado",
      text: "La lista de canciones ha sido exportada a Excel.",
      confirmButtonColor: "#059669",
    });
  };

  const filteredAndSortedCanciones = canciones
    .map((cancion, index) => ({ ...cancion, originalIndex: index }))
    .filter((cancion) =>
      cancion.titulo.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.año - b.año;
      } else {
        return b.año - a.año;
      }
    });

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
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="2000"
    >
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
        <motion.div
          className="glass-card p-8 mb-8 shadow-2xl relative overflow-hidden flex flex-col sm:flex-row items-center justify-between"
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
          <div className="relative z-10 text-center sm:text-left">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg mb-2">
              Gestión de Canciones
            </h1>
            <p className="text-lg sm:text-xl font-light opacity-90 drop-shadow-sm">
              Organiza y administra tu biblioteca musical.
            </p>
          </div>
          <motion.button
            onClick={openModalCrear}
            className="relative z-10 mt-6 sm:mt-0 bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:from-[#39FF14] hover:to-[#00FF8C] hover:shadow-lg text-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-[#00FF8C] focus:ring-opacity-50"
            variants={buttonVariants}
            whileHover="hover"
            whileTap="tap"
          >
            <FiPlusCircle size={22} />
            Agregar Nueva Canción
          </motion.button>
        </motion.div>

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
                  Canciones
                </span>
              </li>
            </ol>
          </nav>
        </motion.div>

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
              placeholder="Buscar Canción por título..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
          <div className="flex flex-col sm:flex-row gap-4 w-full sm:w-auto">
            <motion.button
              onClick={handleSortByYear}
              className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiCalendar className="group-hover:rotate-6 transition-transform" />
              Año {sortOrder === "asc" ? "Ascendente" : "Descendente"}
            </motion.button>
            <motion.button
              onClick={handleExportExcel}
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
                <th className="py-3 px-6 text-left">Foto</th>
                <th className="py-3 px-6 text-left">Título</th>
                <th className="py-3 px-6 text-left">Álbum</th>
                <th className="py-3 px-6 text-left">Duración</th>
                <th className="py-3 px-6 text-left">Año</th>
                <th className="py-3 px-6 text-left">Género</th>
                <th className="py-3 px-6 text-left">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="text-gray-200 text-sm font-light">
                {filteredAndSortedCanciones.length > 0 ? (
                  filteredAndSortedCanciones.map((cancion) => (
                    <motion.tr
                      key={cancion.originalIndex}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.08 * cancion.originalIndex,
                      }}
                      className="border-b border-gray-700 glass-table-row"
                    >
                      <td className="py-4 px-6">
                        {cancion.foto ? (
                          <img
                            src={typeof cancion.foto === 'string' ? cancion.foto : URL.createObjectURL(cancion.foto)}
                            alt="Foto de canción"
                            className="w-16 h-16 object-cover rounded-md shadow-md border-2 border-[#00FF8C]"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-700 rounded-md flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-gray-600">
                            Sin Foto
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {cancion.titulo}
                      </td>
                      <td className="py-4 px-6 whitespace-nowrap">
                        {cancion.album}
                      </td>
                      <td className="py-4 px-6">{cancion.duracion}</td>
                      <td className="py-4 px-6">{cancion.año}</td>
                      <td className="py-4 px-6">{cancion.genero}</td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            cancion.estado
                              ? "bg-gradient-to-r from-green-500 to-lime-500"
                              : "bg-red-600"
                          }`}
                        >
                          {cancion.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="py-4 px-6 text-center">
                        <div className="flex items-center justify-center space-x-2">
                          <motion.button
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                            style={{
                              backgroundColor: "#8B5CF6",
                              boxShadow: "0 4px 10px rgba(139, 92, 246, 0.6)",
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModalVer(cancion.originalIndex)}
                            title="Ver detalles"
                          >
                            <FiEye size={20} />
                          </motion.button>
                          <motion.button
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                            style={{
                              backgroundColor: "#EAB308",
                              boxShadow: "0 4px 10px rgba(234, 179, 8, 0.6)",
                            }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() =>
                              openModalEditar(cancion.originalIndex)
                            }
                            title="Editar canción"
                          >
                            <FiEdit size={20} />
                          </motion.button>
                          {cancion.estado ? (
                            <motion.button
                              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                              style={{
                                backgroundColor: "#EF4444",
                                boxShadow: "0 4px 10px rgba(239, 68, 68, 0.6)",
                              }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleDeleteCancion(cancion.originalIndex)
                              }
                              title="Desactivar canción"
                            >
                              <FiTrash2 size={20} />
                            </motion.button>
                          ) : (
                            <motion.button
                              className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                              style={{
                                backgroundColor: "#22C55E",
                                boxShadow: "0 4px 10px rgba(34, 197, 94, 0.6)",
                              }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() =>
                                handleRestoreCancion(cancion.originalIndex)
                              }
                              title="Restaurar canción"
                            >
                              <FiRefreshCcw size={20} />
                            </motion.button>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="8" className="text-center py-4 text-gray-500">
                      No se encontraron canciones.
                    </td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </motion.div>
      </div>

      <AnimatePresence>
        {modalCrear && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalCrear}
            onChange={handleInputChange}
            onSave={handleAddCancion}
            generos={generos}
            errors={errors}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateCancion}
            generos={generos}
            errors={errors}
          />
        )}

        {modalVer && (
          <ModalVer
            cancion={canciones[currentCancionIndex]}
            onClose={closeModalVer}
          />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ModalFormulario = ({
  formData,
  onClose,
  onChange,
  onSave,
  generos,
  errors,
}) => {
  const [previewFotoUrl, setPreviewFotoUrl] = useState(null);

  useEffect(() => {
    if (formData.foto instanceof File) {
      const objectUrl = URL.createObjectURL(formData.foto);
      setPreviewFotoUrl(objectUrl);

      return () => URL.revokeObjectURL(objectUrl);
    } else if (typeof formData.foto === 'string') {
      setPreviewFotoUrl(formData.foto);
    } else {
      setPreviewFotoUrl(null);
    }
  }, [formData.foto]);

  const isFormValid =
    formData.titulo.trim() &&
    formData.album.trim() &&
    formData.duracion.trim() &&
    String(formData.año).trim() &&
    formData.genero.trim() &&
    Object.keys(errors).length === 0;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Formulario de Canción
        </h2>

        <div className="mb-6 text-center">
          <label
            htmlFor="foto"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 text-base font-semibold px-6 py-3 rounded-full cursor-pointer hover:from-[#39FF14] hover:to-[#00FF8C] focus:ring-2 focus:ring-[#00FF8C] focus:outline-none transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform-gpu"
          >
            Subir Imagen
          </label>
          <input
            id="foto"
            type="file"
            name="foto"
            onChange={onChange}
            className="hidden"
            accept="image/*"
          />
          {previewFotoUrl && (
            <div className="mt-4">
              <img
                src={previewFotoUrl}
                alt="Vista previa"
                className="mx-auto w-28 h-28 object-cover rounded-md border-3 border-[#00FF8C] shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-gray-300 text-sm mt-2 font-medium">
                {formData.foto?.name || "Imagen seleccionada"}
              </p>
            </div>
          )}
        </div>

        {[
          {
            label: "Título",
            name: "titulo",
            type: "text",
            value: formData.titulo,
            icon: (
              <FiMusic className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            ),
          },
          {
            label: "Álbum",
            name: "album",
            type: "text",
            value: formData.album,
            icon: (
              <FiDisc className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            ),
          },
          {
            label: "Duración (ej. 03:45)",
            name: "duracion",
            type: "text",
            value: formData.duracion,
            icon: (
              <FiClock className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            ),
          },
          {
            label: "Año",
            name: "año",
            type: "number",
            value: formData.año,
            icon: (
              <FiCalendar className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" />
            ),
          },
        ].map((field) => (
          <div className="mb-4 relative" key={field.name}>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              {field.label}
            </label>
            {field.icon}
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className={`glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors[field.name] ? "border-red-500" : ""
              }`}
              required
            />
            {errors[field.name] && (
              <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
            )}
          </div>
        ))}

        <div className="mb-6 relative">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Género
          </label>
          <FiTag
            size={20}
            className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 mt-3"
          />
          <select
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className={`glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C] appearance-none ${
              errors.genero ? "border-red-500" : ""
            }`}
            required
          >
            <option className="bg-gray-800 text-gray-100" value="">
              Selecciona un género
            </option>
            {generos.map((genero, index) => (
              <option className="bg-gray-800 text-gray-100" key={index} value={genero}>
                {genero}
              </option>
            ))}
          </select>
          {errors.genero && (
            <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
          )}
        </div>

        <div className="flex justify-end space-x-3">
          <motion.button
            onClick={onSave}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
              isFormValid
                ? "bg-gradient-to-r from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#00FF8C] focus:ring-opacity-50"
                : "bg-gray-600 cursor-not-allowed"
            } transform-gpu`}
            disabled={!isFormValid}
            whileHover={{ scale: isFormValid ? 1.05 : 1 }}
            whileTap={{ scale: isFormValid ? 0.95 : 1 }}
          >
            Guardar
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold hover:from-gray-600 hover:to-gray-700 shadow-lg hover:shadow-xl transition-all duration-300 transform-gpu focus:outline-none focus:ring-4 focus:ring-gray-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cerrar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

const ModalVer = ({ cancion, onClose }) => {
  if (!cancion) return null;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{
          type: "spring",
          stiffness: 80,
          damping: 20,
        }}
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">
          Detalle de Canción
        </h2>
        <div className="space-y-4">
          <div className="flex justify-center mb-4">
            {cancion.foto ? (
              <img
                src={typeof cancion.foto === 'string' ? cancion.foto : URL.createObjectURL(cancion.foto)}
                alt="Foto de canción"
                className="w-32 h-32 object-cover rounded-md shadow-lg border-2 border-[#00FF8C]"
              />
            ) : (
              <div className="w-32 h-32 bg-gray-700 rounded-md flex items-center justify-center text-gray-400 text-sm font-semibold border-2 border-gray-600">
                Sin Foto
              </div>
            )}
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Título
            </label>
            <p className="text-lg text-white">{cancion.titulo}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Álbum
            </label>
            <p className="text-lg text-white">{cancion.album}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Duración
            </label>
            <p className="text-lg text-white">{cancion.duracion}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Año
            </label>
            <p className="text-lg text-white">{cancion.año}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Género
            </label>
            <p className="text-lg text-white">{cancion.genero}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">
              Estado
            </label>
            <span
              className={`px-4 py-2 rounded-full text-white text-sm font-bold ${
                cancion.estado
                  ? "bg-gradient-to-r from-green-500 to-lime-500"
                  : "bg-red-600"
              }`}
            >
              {cancion.estado ? "Activo" : "Inactivo"}
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
    </motion.div>
  );
};

ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  generos: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};

ModalVer.propTypes = {
  cancion: PropTypes.object,
  onClose: PropTypes.func.isRequired,
};

export default Musica;