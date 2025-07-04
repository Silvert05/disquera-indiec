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
      foto: "data:image/jpeg;base64,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", // Simulated URL
      titulo: "Álbum 1",
      artista: "Artista 1",
      año: 2020,
      genero: "Rock",
      estado: true,
    },
    {
      id: 2,
      foto: "https://cdn.venngage.com/template/thumbnail/full/bf008bfe-9bf6-4511-b795-e86f070bfff5.webp", // Simulated URL
      titulo: "Álbum 2",
      artista: "Artista 2",
      año: 2021,
      genero: "Pop",
      estado: true,
    },
    {
      id: 3,
      foto: "https://cdn.venngage.com/template/thumbnail/full/679bf7bb-2170-4d54-9485-240baa4ae33c.webp", // Simulated URL
      titulo: "Álbum 3",
      artista: "Artista 3",
      año: 2019,
      genero: "Electrónica",
      estado: true,
    },
    {
      id: 4,
      foto: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/modern-album-cover-design-template-a8927597817931fa1842a07c8a7dc343_screen.jpg?ts=1566580267", // Simulated URL
      titulo: "Gran Éxitos",
      artista: "Cantante A",
      año: 2022,
      genero: "Indie",
      estado: true,
    },
    {
      id: 5,
      foto: "https://storage.ko-fi.com/cdn/useruploads/display/c16851d0-a922-4938-805d-f39060a02870_20220714_173829_%D9%A0%D9%A0%D9%A0%D9%A0.jpg", // Simulated URL
      titulo: "Sonidos Profundos",
      artista: "Banda B",
      año: 2018,
      genero: "Metal",
      estado: false,
    },
    {
      id: 6,
      foto: "https://coverartworks.com/wp-content/uploads/2024/03/fountion-220x220.jpg", // Simulated URL
      titulo: "Ritmos Nocturnos",
      artista: "Solista C",
      año: 2023,
      genero: "Electrónica",
      estado: true,
    },
    {
      id: 7,
      foto: "https://coverartworks.com/wp-content/uploads/2023/07/Celestial-Arrival-750-jpg-webp.webp", // Simulated URL
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