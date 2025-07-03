import { useState } from "react";
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

const Album = () => {
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
      albums.map((album) => (album.id === currentAlbum.id ? { ...formData, id: currentAlbum.id } : album))
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

  return (
    <div className="p-4 sm:p-6 md:p-8 min-h-screen font-sans pt-16 md:ml-[20rem] relative overflow-hidden">
      {/* Fondo animado de ondas sutiles */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="wave-bg"></div>
      </div>

      {/* Contenido principal sobre el fondo */}
      <div className="relative z-10">
        {/* Encabezado - Hero Section */}
        <div
          className="flex flex-col sm:flex-row items-center justify-between p-6 sm:p-8 md:p-10 mb-8 text-white rounded-3xl shadow-xl overflow-hidden relative"
          style={{
            background: "linear-gradient(135deg, #065F46, #047857, #10B981)", // Degradado de verde
          }}
        >
          {/* Capa de patrón/textura sutil para dinamismo */}
          <div className="absolute inset-0 opacity-20 bg-gradient-to-br from-black to-transparent animate-gradient-shift">
            <svg
              className="w-full h-full"
              viewBox="0 0 100 100"
              preserveAspectRatio="none"
            >
              <defs>
                <pattern
                  id="pattern-hero-circles-album"
                  x="0"
                  y="0"
                  width="10"
                  height="10"
                  patternUnits="userSpaceOnUse"
                >
                  <circle cx="2" cy="2" r="1" fill="rgba(255,255,255,0.1)" />
                </pattern>
              </defs>
              <rect
                x="0"
                y="0"
                width="100%"
                height="100%"
                fill="url(#pattern-hero-circles-album)"
              />
            </svg>
          </div>
          <div className="relative z-10 text-center sm:text-left">
            <motion.h1
              className="text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight tracking-tight mb-2 drop-shadow-md"
              initial={{ y: -50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.1 }}
            >
              Gestión de Álbumes
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light opacity-90 drop-shadow-sm"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Administra tu colección musical de forma eficiente.
            </motion.p>
          </div>
          <motion.button
            onClick={openModalCrear}
            className="relative z-10 mt-6 sm:mt-0 bg-white text-emerald-700 px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-emerald-100 hover:shadow-lg text-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlusCircle size={22} />
            Agregar Nuevo Álbum
          </motion.button>
        </div>

        {/* Migas de pan */}
        <motion.div
          className="p-4 mb-6 bg-white rounded-2xl shadow-md border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <nav aria-label="breadcrumb">
            <ol className="flex flex-wrap gap-2 list-none p-0 m-0 items-center text-gray-600">
              <li className="text-sm sm:text-base">
                <Link
                  to="/dashboard"
                  className="text-emerald-600 hover:text-emerald-800 transition-colors duration-300 font-medium no-underline"
                >
                  Inicio
                </Link>
              </li>
              <li className="text-sm sm:text-base">
                <span className="text-gray-400">/</span>
              </li>
              <li className="text-sm sm:text-base">
                <span className="text-gray-800 font-semibold">Álbumes</span>
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* Contenedor de búsqueda, filtro y exportar */}
        <motion.div
          className="p-4 mb-6 bg-white rounded-2xl shadow-md flex flex-col sm:flex-row justify-between items-center gap-4 border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          <div className="relative w-full sm:w-auto flex-grow">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
            <input
              type="text"
              placeholder="Buscar Álbum por título, artista o género..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 p-3 pl-10 rounded-full w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          <motion.button
            onClick={handleSortByYear}
            className="bg-emerald-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-emerald-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiFilter size={20} />
            Año ({sortOrder === "asc" ? "Asc" : "Desc"})
          </motion.button>
          <motion.button
            onClick={handleExportExcel}
            className="bg-green-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-green-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-green-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiDownload size={20} />
            Exportar a Excel
          </motion.button>
        </motion.div>

        {/* Tabla de álbumes */}
        <motion.div
          className="p-4 bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-200"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.6 }}
        >
          <div className="overflow-x-auto">
            <table className="min-w-full table-auto">
              <thead className="bg-gradient-to-r from-emerald-600 to-emerald-700 text-white">
                <tr>
                  <th className="px-4 py-3 text-left text-sm font-semibold rounded-tl-lg">Foto</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Título</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Artista</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Año</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Género</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold rounded-tr-lg">Acciones</th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {filteredAlbums.length > 0 ? (
                    filteredAlbums.map((album, index) => (
                      <motion.tr
                        key={album.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3, delay: index * 0.05 }}
                        className={`border-b border-gray-200 ${
                          album.estado ? "bg-white" : "bg-gray-50 opacity-80"
                        } hover:bg-emerald-50 transition-all duration-200 ease-in-out cursor-pointer`}
                      >
                        <td className="px-4 py-3">
                          {album.foto ? (
                            <img
                              src={
                                typeof album.foto === "string"
                                  ? album.foto
                                  : URL.createObjectURL(album.foto)
                              }
                              alt="Foto del álbum"
                              className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-emerald-300"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-xs font-semibold border-2 border-gray-300">
                              Sin Foto
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {DOMPurify.sanitize(album.titulo)}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {DOMPurify.sanitize(album.artista)}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {album.año}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {DOMPurify.sanitize(album.genero)}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-4 py-1 rounded-full text-xs font-semibold ${
                              album.estado
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {album.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex items-center justify-center space-x-2">
                          <motion.button
                            className="p-2 bg-blue-500 rounded-full text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform-gpu"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModalVer(album)}
                            title="Ver detalles"
                          >
                            <FiEye size={18} />
                          </motion.button>
                          <motion.button
                            className="p-2 bg-yellow-500 rounded-full text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transform-gpu"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModalEditar(album)}
                            title="Editar álbum"
                          >
                            <FiEdit size={18} />
                          </motion.button>
                          {album.estado ? (
                            <motion.button
                              className="p-2 bg-red-500 rounded-full text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transform-gpu"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteAlbum(album.id)}
                              title="Desactivar álbum"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          ) : (
                            <motion.button
                              className="p-2 bg-green-500 rounded-full text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transform-gpu"
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
          </div>
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
    </div>
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
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 border border-gray-200"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-emerald-700">
          {title}
        </h2>

        <div className="mb-6 text-center">
          <label
            htmlFor="foto"
            className="inline-flex items-center justify-center bg-emerald-600 text-white text-base font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform-gpu"
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
                className="mx-auto w-28 h-28 object-cover rounded-full border-3 border-emerald-400 shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-gray-600 text-sm mt-2 font-medium">
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
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className="border border-gray-300 p-3 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm"
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-700 mb-1">Género</label>
          <select
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className="border border-gray-300 p-3 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm"
            required
          >
            <option value="">Selecciona un género</option>
            {generos.map((genero, index) => (
              <option key={index} value={genero}>
                {genero}
              </option>
            ))}
          </select>
        </div>

        <div className="flex justify-end space-x-3">
          <motion.button
            onClick={onSave}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
              isFormValid
                ? "bg-emerald-600 hover:bg-emerald-700 shadow-md hover:shadow-lg focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50"
                : "bg-gray-400 cursor-not-allowed"
            } transform-gpu`}
            disabled={!isFormValid}
            whileHover={{ scale: isFormValid ? 1.05 : 1 }}
            whileTap={{ scale: isFormValid ? 0.95 : 1 }}
          >
            Guardar
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-red-500 text-white font-semibold hover:bg-red-600 shadow-md hover:shadow-lg transition-all duration-200 transform-gpu focus:outline-none focus:ring-4 focus:ring-red-400 focus:ring-opacity-50"
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
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 border border-gray-200"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-emerald-700">
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
              className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-emerald-500 shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-full flex items-center justify-center text-gray-500 text-sm font-semibold border-4 border-gray-300">
              Sin Foto
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">Título:</label>
            <p className="text-gray-900 text-lg font-medium">
              {DOMPurify.sanitize(data.titulo)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">Artista:</label>
            <p className="text-gray-900 text-lg font-medium">
              {DOMPurify.sanitize(data.artista)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">Año:</label>
            <p className="text-gray-900 text-lg font-medium">{data.año}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">Género:</label>
            <p className="text-gray-900 text-lg font-medium">
              {DOMPurify.sanitize(data.genero)}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">Estado:</label>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                data.estado ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
              }`}
            >
              {data.estado ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-emerald-600 text-white font-semibold hover:bg-emerald-700 shadow-md hover:shadow-lg transition-all duration-200 transform-gpu focus:outline-none focus:ring-4 focus:ring-emerald-400 focus:ring-opacity-50"
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