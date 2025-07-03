import { useState, useEffect } from "react"; // Importar useEffect
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
  FiMusic, // Importar FiMusic
} from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";

const Musica = () => {
  const [canciones, setCanciones] = useState([
    {
      // Para fotos, aquí podríamos almacenar una URL base64 o una referencia si se suben a un servidor
      // Por ahora, asumimos que son objetos File para demostración en el frontend
      foto: null,
      titulo: "Canción 1: El Viaje",
      album: "Descubrimiento",
      duracion: "3:45",
      año: 2020,
      genero: "Rock",
      estado: true, // true for Activo, false for Inactivo
    },
    {
      foto: null,
      titulo: "Canción 2: Sueños de Verano",
      album: "Momentos Pop",
      duracion: "4:20",
      año: 2021,
      genero: "Pop",
      estado: true,
    },
    {
      foto: null,
      titulo: "Jazz Nocturno",
      album: "Luces de la Ciudad",
      duracion: "5:10",
      año: 2019,
      genero: "Jazz",
      estado: true,
    },
    {
      foto: null,
      titulo: "Sinfonía del Bosque",
      album: "Naturaleza Sonora",
      duracion: "7:00",
      año: 2018,
      genero: "Clásica",
      estado: false,
    },
    {
      foto: null,
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

  // Estado inicial del formulario vacío
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

  // Nuevo estado para el ordenamiento del año
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

  const openModalCrear = () => {
    setFormData(initialFormData); // Reiniciar el formulario al abrir modal de creación
    setErrors({});
    setModalCrear(true);
  };
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentCancionIndex(index);
    // Clonar el objeto para evitar mutaciones directas y asegurar que `foto` sea una nueva referencia si es un objeto File
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
      // Si se selecciona un archivo, newValue será el objeto File
      newValue = files[0];
      console.log("Archivo seleccionado:", newValue); // Para depuración
    } else {
      newValue = sanitizeInput(value);
    }
    setFormData((prev) => ({ ...prev, [name]: newValue }));
    validateField(name, newValue);
  };

  const validateField = (name, value) => {
    const newErrors = { ...errors };

    // Validaciones para campos de texto/número
    if (name !== "foto") { // La foto no es obligatoria para la validación inicial del campo
      if (typeof value === 'string' && value.trim() === "") {
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
    if (!formData.duracion.trim()) newErrors.duracion = "La duración es obligatoria.";
    if (!formData.año) newErrors.año = "El año es obligatorio.";
    if (formData.año && (isNaN(formData.año) || parseInt(formData.año) <= 0 || String(formData.año).length !== 4)) {
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
    console.log("Intentando agregar canción con formData:", formData); // Depuración
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error de validación",
        text: "Por favor, completa todos los campos obligatorios correctamente.",
        confirmButtonColor: "#EF4444",
      });
      return;
    }

    // Asegurarse de que el objeto foto se almacene correctamente (será un File o null)
    setCanciones([...canciones, { ...formData, estado: true }]);
    console.log("Canciones después de agregar:", canciones); // Depuración
    Swal.fire({
      icon: "success",
      title: "Canción agregada",
      text: `La canción "${formData.titulo}" fue agregada exitosamente.`,
      confirmButtonColor: "#059669",
    });
    closeModalCrear();
    setFormData(initialFormData); // Resetear a valores iniciales después de agregar
  };

  const handleUpdateCancion = () => {
    console.log("Intentando actualizar canción con formData:", formData); // Depuración
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
    setFormData(initialFormData); // Resetear a valores iniciales después de editar
  };

  const handleDeleteCancion = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto! La canción será marcada como inactiva.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444", // Red-500
      cancelButtonColor: "#6B7280", // Gray-500
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedCanciones = [...canciones];
        updatedCanciones[index].estado = false; // Set estado to false (Inactivo)
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
    updatedCanciones[index].estado = true; // Set estado to true (Activo)
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

  // Se añade originalIndex al mapeo para que la key y la referencia al índice original funcionen correctamente después del filtrado/ordenamiento.
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
            background: "linear-gradient(135deg, #065F46, #047857, #10B981)",
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
                  id="pattern-hero-circles-music"
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
                fill="url(#pattern-hero-circles-music)"
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
              Gestión de Canciones
            </motion.h1>
            <motion.p
              className="text-lg sm:text-xl font-light opacity-90 drop-shadow-sm"
              initial={{ y: -30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              Organiza y administra tu biblioteca musical.
            </motion.p>
          </div>
          <motion.button
            onClick={openModalCrear}
            className="relative z-10 mt-6 sm:mt-0 bg-white text-emerald-700 px-8 py-3 rounded-full flex items-center gap-2 transition-all duration-300 hover:bg-emerald-100 hover:shadow-lg text-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-white focus:ring-opacity-50"
            whileHover={{ scale: 1.05, boxShadow: "0 10px 20px rgba(0, 0, 0, 0.2)" }}
            whileTap={{ scale: 0.95 }}
          >
            <FiPlusCircle size={22} />
            Agregar Nueva Canción
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
                <span className="text-gray-800 font-semibold">Canciones</span>
              </li>
            </ol>
          </nav>
        </motion.div>

        {/* Contenedor de búsqueda y exportar */}
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
              placeholder="Buscar Canción por título..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="border border-gray-300 p-3 pl-10 rounded-full w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 shadow-sm"
            />
          </div>
          <motion.button
            onClick={handleSortByYear}
            className="bg-purple-600 text-white px-6 py-3 rounded-full flex items-center gap-2 hover:bg-purple-700 transition-all duration-300 shadow-md hover:shadow-lg font-semibold transform-gpu focus:outline-none focus:ring-4 focus:ring-purple-400 focus:ring-opacity-50"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FiCalendar size={20} />
            Año {sortOrder === "asc" ? "Ascendente" : "Descendente"}
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

        {/* Tabla de canciones */}
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
                  <th className="px-4 py-3 text-left text-sm font-semibold">Álbum</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Duración</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Año</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Género</th>
                  <th className="px-4 py-3 text-left text-sm font-semibold">Estado</th>
                  <th className="px-4 py-3 text-center text-sm font-semibold rounded-tr-lg">Acciones</th>
                </tr>
              </thead>
              <AnimatePresence>
                <tbody>
                  {filteredAndSortedCanciones.length > 0 ? (
                    filteredAndSortedCanciones.map((cancion) => (
                      <motion.tr
                        key={cancion.originalIndex} // Usar originalIndex para la key
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, x: -50 }}
                        transition={{ duration: 0.3 }}
                        className={`border-b border-gray-200 ${
                          cancion.estado ? "bg-white" : "bg-gray-50 opacity-80"
                        } hover:bg-emerald-50 transition-all duration-200 ease-in-out cursor-pointer`}
                      >
                        <td className="px-4 py-3">
                          {cancion.foto instanceof File ? ( // Verificar si es una instancia de File
                            <img
                              src={URL.createObjectURL(cancion.foto)}
                              alt="Foto de canción"
                              className="w-16 h-16 object-cover rounded-md shadow-md border-2 border-emerald-300"
                            />
                          ) : (
                            <div className="w-16 h-16 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-xs font-semibold border-2 border-gray-300">
                              Sin Foto
                            </div>
                          )}
                        </td>
                        <td className="px-4 py-3 text-gray-800 font-medium">
                          {cancion.titulo}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {cancion.album}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {cancion.duracion}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {cancion.año}
                        </td>
                        <td className="px-4 py-3 text-gray-700">
                          {cancion.genero}
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`px-4 py-1 rounded-full text-xs font-semibold ${
                              cancion.estado
                                ? "bg-green-100 text-green-800"
                                : "bg-gray-100 text-gray-800"
                            }`}
                          >
                            {cancion.estado ? "Activo" : "Inactivo"}
                          </span>
                        </td>
                        <td className="px-4 py-3 flex items-center justify-center space-x-2">
                          <motion.button
                            className="p-2 bg-blue-500 rounded-full text-white shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400 transform-gpu"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModalVer(cancion.originalIndex)}
                            title="Ver detalles"
                          >
                            <FiEye size={18} />
                          </motion.button>
                          <motion.button
                            className="p-2 bg-yellow-500 rounded-full text-white shadow-md hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-400 transform-gpu"
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => openModalEditar(cancion.originalIndex)}
                            title="Editar canción"
                          >
                            <FiEdit size={18} />
                          </motion.button>
                          {cancion.estado ? (
                            <motion.button
                              className="p-2 bg-red-500 rounded-full text-white shadow-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400 transform-gpu"
                              whileHover={{ scale: 1.1, rotate: 5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleDeleteCancion(cancion.originalIndex)}
                              title="Desactivar canción"
                            >
                              <FiTrash2 size={18} />
                            </motion.button>
                          ) : (
                            <motion.button
                              className="p-2 bg-green-500 rounded-full text-white shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400 transform-gpu"
                              whileHover={{ scale: 1.1, rotate: -5 }}
                              whileTap={{ scale: 0.9 }}
                              onClick={() => handleRestoreCancion(cancion.originalIndex)}
                              title="Restaurar canción"
                            >
                              <FiRefreshCcw size={18} />
                            </motion.button>
                          )}
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
          </div>
        </motion.div>
      </div>
      {/* Fin del div relative z-10 */}

      {/* Modales */}
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
    </div>
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
  // Use a state for the image preview URL
  const [previewFotoUrl, setPreviewFotoUrl] = useState(null);

  // Effect to update preview URL when formData.foto changes
  useEffect(() => {
    if (formData.foto instanceof File) {
      const objectUrl = URL.createObjectURL(formData.foto);
      setPreviewFotoUrl(objectUrl);

      // Clean up the object URL when component unmounts or foto changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewFotoUrl(null); // Clear preview if no file or not a File object
    }
  }, [formData.foto]);


  const isFormValid =
    formData.titulo.trim() &&
    formData.album.trim() &&
    formData.duracion.trim() &&
    String(formData.año).trim() && // Convert to string to handle empty number input
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
        className="bg-white p-8 rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto transform scale-95 border border-gray-200"
        initial={{ y: -50, opacity: 0, scale: 0.9 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 50, opacity: 0, scale: 0.9 }}
        transition={{ type: "spring", stiffness: 120, damping: 20 }}
      >
        <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center text-emerald-700">
          Formulario de Canción
        </h2>

        <div className="mb-6 text-center">
          <label
            htmlFor="foto"
            className="inline-flex items-center justify-center bg-emerald-600 text-white text-base font-semibold px-6 py-3 rounded-full cursor-pointer hover:bg-emerald-700 focus:ring-2 focus:ring-emerald-500 focus:outline-none transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform-gpu"
          >
            Subir Imagen
          </label>
          <input
            id="foto"
            type="file"
            name="foto"
            onChange={onChange}
            className="hidden"
            accept="image/*" // Solo acepta imágenes
          />
          {previewFotoUrl && ( // Usar previewFotoUrl aquí
            <div className="mt-4">
              <img
                src={previewFotoUrl}
                alt="Vista previa"
                className="mx-auto w-28 h-28 object-cover rounded-md border-3 border-emerald-400 shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-gray-600 text-sm mt-2 font-medium">
                {formData.foto?.name || "Archivo seleccionado"}
              </p>
            </div>
          )}
        </div>

        {[
          { label: "Título", name: "titulo", type: "text", value: formData.titulo, icon: <FiMusic size={20} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> },
          { label: "Álbum", name: "album", type: "text", value: formData.album, icon: <FiDisc size={20} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> },
          { label: "Duración (ej. 03:45)", name: "duracion", type: "text", value: formData.duracion, icon: <FiClock size={20} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> },
          { label: "Año", name: "año", type: "number", value: formData.año, icon: <FiCalendar size={20} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2" /> },
        ].map((field) => (
          <div className="mb-4 relative" key={field.name}>
            <label className="block text-sm font-semibold text-gray-700 mb-1">
              {field.label}
            </label>
            {field.icon}
            <input
              type={field.type}
              name={field.name}
              value={field.value}
              onChange={onChange}
              className={`border border-gray-300 p-3 pl-10 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm ${
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
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Género
          </label>
          <FiTag size={20} className="text-gray-400 absolute left-3 top-1/2 -translate-y-1/2 mt-3" />
          <select
            name="genero"
            value={formData.genero}
            onChange={onChange}
            className={`border border-gray-300 p-3 pl-10 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all duration-200 shadow-sm appearance-none ${
              errors.genero ? "border-red-500" : ""
            }`}
            required
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

const ModalVer = ({ cancion, onClose }) => {
  // Use a state for the image preview URL
  const [previewFotoUrl, setPreviewFotoUrl] = useState(null);

  // Effect to update preview URL when cancion.foto changes
  useEffect(() => {
    if (cancion && cancion.foto instanceof File) {
      const objectUrl = URL.createObjectURL(cancion.foto);
      setPreviewFotoUrl(objectUrl);

      // Clean up the object URL when component unmounts or foto changes
      return () => URL.revokeObjectURL(objectUrl);
    } else {
      setPreviewFotoUrl(null); // Clear preview if no file or not a File object
    }
  }, [cancion]);

  if (!cancion) return null; // Prevenir errores si cancion es null temporalmente

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
          Detalles de la Canción
        </h2>

        <div className="mb-4 text-center">
          {previewFotoUrl ? ( // Usar previewFotoUrl aquí
            <img
              src={previewFotoUrl}
              alt="Foto de canción"
              className="mx-auto w-32 h-32 object-cover rounded-md border-4 border-emerald-500 shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-200 rounded-md flex items-center justify-center text-gray-500 text-sm font-semibold border-4 border-gray-300">
              Sin Foto
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-700">
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Título:
            </label>
            <p className="text-gray-900 text-lg font-medium">
              {cancion.titulo}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Álbum:
            </label>
            <p className="text-gray-800">{cancion.album}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Duración:
            </label>
            <p className="text-gray-800">{cancion.duracion}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Año:
            </label>
            <p className="text-gray-800">{cancion.año}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Género:
            </label>
            <p className="text-gray-800">{cancion.genero}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-0.5">
              Estado:
            </label>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                cancion.estado
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {cancion.estado ? "Activo" : "Inactivo"}
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
  generos: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
};

ModalVer.propTypes = {
  cancion: PropTypes.object, // 'object' instead of 'object.isRequired' as it can be null initially
  onClose: PropTypes.func.isRequired,
};

export default Musica;