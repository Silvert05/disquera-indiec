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
  FiFilter, // Added for sorting by year
} from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const Album = () => {
  useEffect(() => {
    AOS.init({
      duration: 3000, // global duration for animations
      once: true, // whether animation should happen only once - while scrolling down
    });
  }, []);

  const [albums, setAlbums] = useState([
    {
      id: 1,
      foto: null,
      titulo: "Álbum 1",
      artista: "Artista 1",
      año: 2020,
      genero: "Rock",
      estado: true,
    },
    {
      id: 2,
      foto: null,
      titulo: "Álbum 2",
      artista: "Artista 2",
      año: 2021,
      genero: "Pop",
      estado: true,
    },
    {
      id: 3,
      foto: null,
      titulo: "Álbum 3",
      artista: "Artista 3",
      año: 2019,
      genero: "Electrónica",
      estado: true,
    },
    {
      id: 4,
      foto: null,
      titulo: "Gran Éxitos",
      artista: "Cantante A",
      año: 2022,
      genero: "Indie",
      estado: true,
    },
    {
      id: 5,
      foto: null,
      titulo: "Sonidos Profundos",
      artista: "Banda B",
      año: 2018,
      genero: "Metal",
      estado: false,
    },
    {
      id: 6,
      foto: null,
      titulo: "Ritmos Nocturnos",
      artista: "Solista C",
      año: 2023,
      genero: "Electrónica",
      estado: true,
    },
    {
      id: 7,
      foto: null,
      titulo: "Ecos de la Montaña",
      artista: "Dúo D",
      año: 2017,
      genero: "Folk",
      estado: false,
    },
  ]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  const [formData, setFormData] = useState({
    foto: null,
    titulo: "",
    artista: "",
    año: "",
    genero: "",
  });

  const [currentAlbum, setCurrentAlbum] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState("asc"); // 'asc' or 'desc' for year

  const generos = [
    "Rock",
    "Pop",
    "Jazz",
    "Clásica",
    "Electrónica",
    "Hip-Hop",
    "Reggae",
    "Metal",
    "Blues",
    "Country",
    "Folk",
    "R&B",
    "Soul",
    "Funk",
    "Disco",
    "Techno",
    "House",
    "Dubstep",
    "Indie",
    "Alternativa",
    "Punk",
    "Gospel",
    "Flamenco",
    "Salsa",
    "Merengue",
    "Cumbia",
    "Bachata",
    "Tango",
    "Mariachi",
  ];

  const openModalCrear = () => {
    setFormData({
      foto: null,
      titulo: "",
      artista: "",
      año: "",
      genero: "",
    });
    setModalCrear(true);
  };
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (album) => {
    setCurrentAlbum(album);
    setFormData({ ...album }); // Deep copy to avoid direct state mutation
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (album) => {
    setCurrentAlbum(album);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      setFormData({ ...formData, foto: files[0] });
    } else {
      setFormData({ ...formData, [name]: sanitizeInput(value) });
    }
  };

  const validateForm = () => {
    return (
      formData.titulo && formData.artista && formData.año && formData.genero
    );
  };

  const handleAddAlbum = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Todos los campos obligatorios deben ser completados.",
        confirmButtonColor: "#EF4444", // Red-500
      });
      return;
    }

    setAlbums([...albums, { ...formData, id: Date.now(), estado: true }]);

    Swal.fire({
      icon: "success",
      title: "Álbum agregado",
      text: `El álbum "${formData.titulo}" fue agregado exitosamente.`,
      confirmButtonColor: "#059669",
    });

    closeModalCrear();
    setFormData({ foto: null, titulo: "", artista: "", año: "", genero: "" });
  };

  const handleUpdateAlbum = () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Todos los campos obligatorios deben ser completados.",
        confirmButtonColor: "#EF4444", // Red-500
      });
      return;
    }

    setAlbums(
      albums.map((album) =>
        album.id === currentAlbum.id ? { ...formData, id: currentAlbum.id } : album
      )
    );

    Swal.fire({
      icon: "success",
      title: "Álbum actualizado",
      text: `El álbum "${formData.titulo}" fue actualizado exitosamente.`,
      confirmButtonColor: "#059669",
    });

    closeModalEditar();
    setFormData({ foto: null, titulo: "", artista: "", año: "", genero: "" });
  };

  const handleDeleteAlbum = (id) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto! El álbum será marcado como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Red-500
      cancelButtonColor: "#6B7280", // Gray-500
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        setAlbums(albums.map((album) => (album.id === id ? { ...album, estado: false } : album)));

        Swal.fire({
          icon: "info",
          title: "Álbum desactivado",
          text: "El álbum fue marcado como inactivo.",
          confirmButtonColor: "#059669",
        });
      }
    });
  };

  const handleRestoreAlbum = (id) => {
    setAlbums(albums.map((album) => (album.id === id ? { ...album, estado: true } : album)));

    Swal.fire({
      icon: "success",
      title: "Álbum restaurado",
      text: "El álbum fue restaurado y está activo nuevamente.",
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
      filteredAlbums.map((album) => ({
        Título: album.titulo,
        Artista: album.artista,
        Año: album.año,
        Género: album.genero,
        Estado: album.estado ? "Activo" : "Inactivo",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Álbumes");
    XLSX.writeFile(workbook, "albumes.xlsx");

    Swal.fire({
      icon: "success",
      title: "Exportado",
      text: "La lista de álbumes ha sido exportada a Excel.",
      confirmButtonColor: "#059669",
    });
  };

  const filteredAlbums = albums
    .filter(
      (album) =>
        album.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.artista.toLowerCase().includes(searchTerm.toLowerCase()) ||
        album.genero.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortOrder === "asc") {
        return a.año - b.año;
      } else {
        return b.año - a.año;
      }
    });

  // Framer Motion Variants (reused from Ventas for consistency)
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
        {/* Encabezado - Hero Section */}
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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <div className="text-center sm:text-left mb-6 sm:mb-0">
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md text-white">
                Gestión de Álbumes
              </h1>
              <p className="text-lg sm:text-xl font-light opacity-90 drop-shadow-sm text-gray-200">
                Administra tu colección musical de forma eficiente.
              </p>
            </div>
            <motion.button
              onClick={openModalCrear}
              className="relative z-10 bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 font-bold transform-gpu focus:outline-none focus:ring-4 focus:ring-[#00FF8C] focus:ring-opacity-50 shadow-lg hover:shadow-xl"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiPlusCircle size={22} />
              Agregar Nuevo Álbum
            </motion.button>
          </div>
        </motion.div>

        {/* Migas de pan */}
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
                  Álbumes
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
              placeholder="Buscar por Título, Artista o Género..."
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
              <FiFilter className="group-hover:rotate-6 transition-transform" />
              Año ({sortOrder === "asc" ? "Asc" : "Desc"})
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

        {/* Tabla de álbumes */}
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
                <th className="py-3 px-6 text-left">Artista</th>
                <th className="py-3 px-6 text-left">Año</th>
                <th className="py-3 px-6 text-left">Género</th>
                <th className="py-3 px-6 text-left">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="text-gray-200 text-sm font-light">
                {filteredAlbums.length > 0 ? (
                  filteredAlbums.map((album, index) => (
                    <motion.tr
                      key={album.id}
                      className="border-b border-gray-700 glass-table-row"
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        duration: 0.6, // Added duration for each row
                        ease: "easeOut",
                        delay: 0.08 * index, // Increased delay between rows
                      }}
                    >
                      <td className="py-4 px-6">
                        {album.foto ? (
                          <img
                            src={
                              typeof album.foto === "string"
                                ? album.foto
                                : URL.createObjectURL(album.foto)
                            }
                            alt="Foto del álbum"
                            className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-[#00FF8C]"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-gray-600">
                            Sin Foto
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-white font-medium">
                        {DOMPurify.sanitize(album.titulo)}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {DOMPurify.sanitize(album.artista)}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {album.año}
                      </td>
                      <td className="py-4 px-6 text-gray-300">
                        {DOMPurify.sanitize(album.genero)}
                      </td>
                      <td className="py-4 px-6">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            album.estado
                              ? "bg-gradient-to-r from-green-500 to-lime-500"
                              : "bg-red-600"
                          }`}
                        >
                          {album.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex items-center justify-center space-x-2">
                        <motion.button
                          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                          style={{
                            backgroundColor: "#8B5CF6", // Purple-500
                            boxShadow: "0 4px 10px rgba(139, 92, 246, 0.6)",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModalVer(album)}
                          title="Ver detalles"
                        >
                          <FiEye size={18} />
                        </motion.button>
                        <motion.button
                          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                          style={{
                            backgroundColor: "#EAB308", // Yellow-500
                            boxShadow: "0 4px 10px rgba(234, 179, 8, 0.6)",
                          }}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModalEditar(album)}
                          title="Editar álbum"
                        >
                          <FiEdit size={18} />
                        </motion.button>
                        {album.estado ? (
                          <motion.button
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                            style={{
                              backgroundColor: "#DC2626", // Red-600
                              boxShadow: "0 4px 10px rgba(220, 38, 38, 0.6)",
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteAlbum(album.id)}
                            title="Desactivar álbum"
                          >
                            <FiTrash2 size={18} />
                          </motion.button>
                        ) : (
                          <motion.button
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                            style={{
                              backgroundColor: "#22C55E", // Green-500
                              boxShadow: "0 4px 10px rgba(34, 197, 94, 0.6)",
                            }}
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRestoreAlbum(album.id)}
                            title="Restaurar álbum"
                          >
                            <FiRefreshCcw size={18} />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-500">
                      No se encontraron álbumes.
                    </td>
                  </tr>
                )}
              </tbody>
            </AnimatePresence>
          </table>
        </motion.div>
      </div>{" "}
      {/* Fin del div relative z-10 */}
      {/* Modales */}
      <AnimatePresence>
        {modalCrear && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalCrear}
            onChange={handleInputChange}
            onSave={handleAddAlbum}
            title="Crear Nuevo Álbum"
            generos={generos}
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateAlbum}
            title="Editar Álbum"
            generos={generos}
          />
        )}

        {modalVer && (
          <ModalVer data={currentAlbum} onClose={closeModalVer} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ModalFormulario = ({ formData, onClose, onChange, onSave, title, generos }) => {
  const isFormValid =
    formData.titulo && formData.artista && formData.año && formData.genero;

  return (
    <motion.div
      className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4 backdrop-blur-sm"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      <motion.div
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto border border-white border-opacity-20"
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
          {title}
        </h2>

        <div className="mb-6 text-center">
          <label
            htmlFor="foto"
            className="inline-flex items-center justify-center bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 text-base font-bold px-6 py-3 rounded-full cursor-pointer hover:from-[#39FF14] hover:to-[#00FF8C] focus:ring-2 focus:ring-[#00FF8C] focus:outline-none transition-all duration-300 ease-in-out shadow-lg hover:shadow-xl transform-gpu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Subir Imagen
          </label>
          <input
            id="foto"
            type="file"
            name="foto"
            onChange={onChange}
            className="hidden"
          />
          {formData.foto && (
            <div className="mt-4">
              <img
                src={
                  typeof formData.foto === "string"
                    ? formData.foto
                    : URL.createObjectURL(formData.foto)
                }
                alt="Vista previa"
                className="mx-auto w-28 h-28 object-cover rounded-full border-3 border-[#00FF8C] shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-gray-300 text-sm mt-2 font-medium">
                {typeof formData.foto === "string" ? "Imagen cargada" : formData.foto.name}
              </p>
            </div>
          )}
        </div>

        {[
          { label: "Título", name: "titulo", type: "text", value: formData.titulo },
          { label: "Artista", name: "artista", type: "text", value: formData.artista },
          { label: "Año", name: "año", type: "number", value: formData.año },
        ].map((field) => (
          <div className="mb-4" key={field.name}>
            <label className="block text-sm font-semibold text-gray-300 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-1">Género</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className="glass-card bg-transparent border border-gray-700 p-3 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            required
          >
            <option value="" className="bg-gray-800 text-gray-300">Selecciona un género</option>
            {generos.map((genero, index) => (
              <option key={index} value={genero} className="bg-gray-800 text-gray-300">
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <motion.button
            onClick={onSave}
            className={`px-6 py-3 rounded-full text-white font-bold transition-all duration-200 ${
              isFormValid
                ? "bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 shadow-lg hover:shadow-xl focus:ring-4 focus:ring-[#00FF8C] focus:ring-opacity-50"
                : "bg-gray-700 text-gray-400 cursor-not-allowed"
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

const ModalVer = ({ data, onClose }) => {
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
          Detalles del Álbum
        </h2>

        <div className="mb-4 text-center">
          {data.foto ? (
            <img
              src={
                typeof data.foto === "string"
                  ? data.foto
                  : URL.createObjectURL(data.foto)
              }
              alt="Foto del álbum"
              className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-[#00FF8C] shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm font-semibold border-4 border-gray-600">
              Sin Foto
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-300">
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-0.5">Título:</label>
            <p className="text-white text-lg font-medium">
              {DOMPurify.sanitize(data.titulo)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-0.5">Artista:</label>
            <p className="text-white text-lg font-medium">
              {DOMPurify.sanitize(data.artista)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-0.5">Año:</label>
            <p className="text-white text-lg font-medium">{data.año}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-0.5">Género:</label>
            <p className="text-white text-lg font-medium">
              {DOMPurify.sanitize(data.genero)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-400 mb-0.5">Estado:</label>
            <span
              className={`px-4 py-1 rounded-full text-sm font-bold ${
                data.estado ? "bg-gradient-to-r from-green-500 to-lime-500 text-white" : "bg-red-600 text-white"
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
    </motion.div>
  );
};

ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  generos: PropTypes.array.isRequired,
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Album;