import React, { useState, useEffect } from "react";
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
  FiXCircle, // Import the close icon
  FiFilter, // Added for the filter button
  FiExternalLink // Added for the external link in ModalVer
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
      url: "https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ", // Added URL field
      estado: true,
    },
    {
      foto: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/album-cover-song-templates-design-66c8a597c5f8ed4370568005e7344297_screen.jpg?ts=1663427910",
      titulo: "Canción 2: Sueños de Verano",
      album: "Momentos Pop",
      duracion: "4:20",
      año: 2021,
      genero: "Pop",
      url: "https://open.spotify.com/album/7eyQXxuf2nGj9d2367Gi5f", // Added URL field
      estado: true,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d0000b273c9ab5153619d20949acbd75b",
      titulo: "Jazz Nocturno",
      album: "Luces de la Ciudad",
      duracion: "5:10",
      año: 2019,
      genero: "Jazz",
      url: "https://open.spotify.com/album/2Kh43m04B1UkVcpcRa1Zug", // Added URL field
      estado: true,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d00001e02d903cd3ee0741459aba964bc",
      titulo: "Sinfonía del Bosque",
      album: "Naturaleza Sonora",
      duracion: "7:00",
      año: 2018,
      genero: "Clásica",
      url: "https://open.spotify.com/album/2cWBwpqMsDJC1ZUwz813lo", // Added URL field
      estado: false,
    },
    {
      foto: "https://i.scdn.co/image/ab67616d00001e021473df4204f0dbc75c7c79fc",
      titulo: "Ritmo Electrónico",
      album: "Pulso Urbano",
      duracion: "3:15",
      año: 2022,
      genero: "Electrónica",
      url: "http://googleusercontent.com/spotify.com/4", // Added URL field
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
    url: "", // Added URL field
    estado: true,
  };
  const [formData, setFormData] = useState(initialFormData);
  const [currentCancionIndex, setCurrentCancionIndex] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [errors, setErrors] = useState({});
  const [sortOrder, setSortOrder] = useState("asc");
  const [filterActive, setFilterActive] = useState("all"); // Added for filter

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
    "Blues", "Country", "Folk", "R&B", "Soul", "Funk", "Latina", "Reggaeton",
    "Cumbia", "Salsa", "Merengue", "Bachata", "World Music", "Otros"
  ];

  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const cardVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: { type: "spring", stiffness: 100 }
    },
    hover: {
      y: -5,
      boxShadow: "0 10px 25px rgba(0, 255, 140, 0.3)"
    }
  };

  const buttonVariants = {
    hover: { scale: 1.05, boxShadow: "0 0 15px rgba(0, 255, 140, 0.5)" },
    tap: { scale: 0.95 }
  };

  const openModalCrear = () => {
    setFormData(initialFormData);
    setErrors({});
    setModalCrear(true);
  };
  const closeModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalVer(false);
  };
  const openModalEditar = (index) => {
    setCurrentCancionIndex(index);
    setFormData({ ...canciones[index] });
    setErrors({});
    setModalEditar(true);
  };

  const openModalVer = (index) => {
    setCurrentCancionIndex(index);
    setModalVer(true);
  };

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
    closeModal();
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
    closeModal();
    setFormData(initialFormData);
  };

  const handleDeleteCancion = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡Estás a punto de desactivar esta canción! La canción será marcada como inactiva.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactívala',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCanciones = [...canciones];
        updatedCanciones[index].estado = false;
        setCanciones(updatedCanciones);

        Swal.fire('Desactivado!', `La canción "${canciones[index].titulo}" ha sido desactivada.`, 'success');
      }
    });
  };

  const handleRestoreCancion = (index) => {
    Swal.fire({
      title: '¿Quieres activar esta canción?',
      text: `La canción "${canciones[index].titulo}" estará visible de nuevo.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actívala',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCanciones = [...canciones];
        updatedCanciones[index].estado = true;
        setCanciones(updatedCanciones);
        Swal.fire('Activado!', `La canción "${canciones[index].titulo}" ha sido activada.`, 'success');
      }
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };
  const handleSortByYear = () => {
    setSortOrder((prevOrder) => (prevOrder === "asc" ? "desc" : "asc"));
  };
  const handleExportExcel = () => {
    const dataToExport = filteredAndSortedCanciones.map(({ foto, originalIndex, ...rest }) => rest); // Exclude foto and originalIndex
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
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

  const handleFilterChange = () => {
    setFilterActive(prev => {
      if (prev === "all") return "active";
      if (prev === "active") return "inactive";
      return "all";
    });
  };


  const filteredAndSortedCanciones = canciones
    .map((cancion, index) => ({ ...cancion, originalIndex: index }))
    .filter((cancion) =>
      cancion.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cancion.album.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cancion.genero.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(cancion => {
      if (filterActive === "all") return true;
      return filterActive === "active" ? cancion.estado : !cancion.estado;
    })
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.año - b.año;
      } else {
        return b.año - a.año;
      }
    });


  return (
    <div className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen p-8 relative overflow-hidden">
      <div className="absolute inset-0 z-0 opacity-20" style={{
        background: `radial-gradient(circle at top left, #39FF14 0%, transparent 50%),
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
        backgroundSize: "200% 200%",
        animation: "bg-pan 20s ease infinite",
      }}></div>

      <style>{`
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.3);
          border-radius: 1.5rem;
        }
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background-color: #00FF8C;
          border-radius: 10px;
          border: 2px solid rgba(255, 255, 255, 0.1);
        }
      `}</style>

      <div className="relative z-10">
        <motion.div
          className="glass-card p-8 mb-8 flex justify-between items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          data-aos="fade-down"
        >
          <div>
            <h1 className="text-4xl font-bold">Gestión de Canciones</h1>
            <p className="text-lg opacity-90">Organiza y administra tu biblioteca musical</p>
          </div>

          <motion.div
            className="glass-card p-3 rounded-lg flex items-center"
            variants={cardVariants}
            data-aos="fade-down"
          >
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/dashboard" className="text-[#00FF8C] hover:underline">
                Inicio
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-white">Canciones</span>
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          className="glass-card p-6 mb-8 flex flex-wrap gap-4"
          variants={cardVariants}
          data-aos="fade-down"
        >
          <div className="relative flex-grow">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar canción..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          <div className="flex gap-2">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleFilterChange}
            >
              <FiFilter />
              {filterActive === "all" ? "Todas" : filterActive === "active" ? "Activas" : "Inactivas"}
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-lime-600 rounded-lg flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleExportExcel}
            >
              <FiDownload /> Exportar
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={openModalCrear}
            >
              <FiPlusCircle /> Agregar Canción
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          data-aos="fade-up"
        >
          <AnimatePresence>
            {filteredAndSortedCanciones.map((cancion, index) => (
              <motion.div
                key={cancion.originalIndex}
                className="glass-card p-6 rounded-t-3xl rounded-br-3xl rounded-bl-xl shadow-md transition-all duration-300 hover:scale-[1.015]"
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{cancion.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${cancion.estado ? "bg-green-500" : "bg-red-500"}`}>
                        {cancion.estado ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-500 rounded-full"
                        onClick={() => openModalVer(cancion.originalIndex)}
                      >
                        <FiEye className="text-white" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-yellow-500 rounded-full"
                        onClick={() => openModalEditar(cancion.originalIndex)}
                      >
                        <FiEdit className="text-white" />
                      </motion.button>
                      {cancion.estado ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-500 rounded-full"
                          onClick={() => handleDeleteCancion(cancion.originalIndex)}
                        >
                          <FiTrash2 className="text-white" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-green-500 rounded-full"
                          onClick={() => handleRestoreCancion(cancion.originalIndex)}
                        >
                          <FiRefreshCcw className="text-white" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg overflow-hidden">
                    {cancion.foto ? (
                      <img
                        src={cancion.foto instanceof File ? URL.createObjectURL(cancion.foto) : cancion.foto}
                        className="w-full h-48 object-cover rounded-lg"
                        alt={cancion.titulo}
                        onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x300?text=No+Image" }}
                      />
                    ) : (
                      <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Sin imagen</span>
                      </div>
                    )}
                  </div>

                  <div className="flex-grow space-y-3">
                    <div>
                      <p className="text-sm text-gray-400">Álbum</p>
                      <p className="font-medium">{cancion.album}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Duración</p>
                      <p className="font-medium">{cancion.duracion}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Año</p>
                      <p className="font-medium">{cancion.año}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Género</p>
                      <p className="font-medium">{cancion.genero}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Enlace</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={cancion.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-[#00FF8C] hover:underline flex items-center"
                        >
                          <FiExternalLink className="mr-1" />
                          Escuchar
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Modales */}
        <AnimatePresence>
          {modalCrear && (
            <ModalFormularioCancion
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleAddCancion}
              generos={generos}
              errors={errors}
              title="Agregar Canción"
            />
          )}

          {modalEditar && (
            <ModalFormularioCancion
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleUpdateCancion}
              generos={generos}
              errors={errors}
              title="Editar Canción"
            />
          )}

          {modalVer && (
            <ModalVerCancion
              data={canciones[currentCancionIndex]}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ModalFormularioCancion = ({ formData, onClose, onChange, onSave, generos, errors, title }) => {
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

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">{title}</h2>

        <div className="mb-4 text-center">
          <label className="block text-sm font-semibold mb-2 text-gray-300">Portada de la Canción</label>
          {previewFotoUrl && (
            <img
              src={previewFotoUrl}
              alt="Vista previa"
              className="w-32 h-32 rounded-lg object-cover mx-auto mb-4"
            />
          )}
          <label
            htmlFor="foto"
            className="inline-block bg-[#00FF8C] text-gray-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#39FF14] transition"
          >
            {previewFotoUrl ? "Cambiar Imagen" : "Subir Imagen"}
            <input
              id="foto"
              type="file"
              name="foto"
              onChange={onChange}
              className="hidden"
              accept="image/*"
            />
          </label>
        </div>

        <div className="space-y-4">
          {[
            { label: "Título de la Canción", name: "titulo", type: "text" },
            { label: "Álbum", name: "album", type: "text" },
            { label: "Duración", name: "duracion", type: "text", placeholder: "Ej. 03:45" },
            { label: "Año de Lanzamiento", name: "año", type: "number" },
            { label: "Enlace", name: "url", type: "text" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-semibold mb-1 text-gray-300">{field.label}</label>
              <input
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={onChange}
                placeholder={field.placeholder || ""}
                className={`w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                  errors[field.name] ? "border-red-500" : ""
                }`}
              />
              {errors[field.name] && (
                <p className="text-red-500 text-sm mt-1">{errors[field.name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">Género</label>
            <select
              name="genero"
              value={formData.genero}
              onChange={onChange}
              className={`w-full p-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C] ${
                errors.genero ? "border-red-500" : ""
              }`}
            >
              <option value="">Selecciona un género</option>
              {generos.map((genero, index) => (
                <option key={index} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
            {errors.genero && (
              <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
            )}
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={onSave}
            className="bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Guardar
          </motion.button>
        </div>
      </motion.div>
    </motion.div>
  );
};

ModalFormularioCancion.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  generos: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

const ModalVerCancion = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50"
    >
      <motion.div
        initial={{ scale: 0.9 }}
        animate={{ scale: 1 }}
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Detalles de la Canción</h2>

        <div className="space-y-4">
          <div className="text-center">
            {data.foto ? (
              <img
                src={data.foto instanceof File ? URL.createObjectURL(data.foto) : data.foto}
                alt="Canción"
                className="w-32 h-32 rounded-lg object-cover mx-auto"
                onError={(e) => { e.target.onerror = null; e.target.src = "https://via.placeholder.com/300x300?text=No+Image" }}
              />
            ) : (
              <div className="w-32 h-32 bg-gray-700 rounded-lg flex items-center justify-center mx-auto">
                <span className="text-gray-400">Sin portada</span>
              </div>
            )}
          </div>

          {[
            { label: "Título", value: data.titulo },
            { label: "Álbum", value: data.album },
            { label: "Duración", value: data.duracion },
            { label: "Año", value: data.año },
            { label: "Género", value: data.genero },
            { label: "Enlace", value: data.url },
          ].map((item) => (
            <div key={item.label}>
              <label className="block text-sm font-semibold mb-1 text-gray-300">{item.label}</label>
              {item.label === "Enlace" ? (
                <a href={item.value} target="_blank" rel="noopener noreferrer" className="text-[#00FF8C] hover:underline">
                  {item.value}
                </a>
              ) : (
                <p className="text-lg text-white">{item.value}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-sm font-semibold mb-1 text-gray-300">Estado</label>
            <span className={`px-4 py-2 rounded-full text-sm font-bold ${
              data.estado ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}>
              {data.estado ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg"
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

ModalVerCancion.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Musica;