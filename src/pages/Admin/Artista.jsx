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
} from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";

// Importaciones de AOS (Animate On Scroll)
import AOS from "aos";
import "aos/dist/aos.css"; // Importa los estilos CSS de AOS

const Artistas = () => {
  // *********** Inicialización de AOS ***********
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: "ease-out-cubic",
      once: true,
    });
  }, []);

  const [artistas, setArtistas] = useState([
    {
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRoSMJk9DH7ExNNmdJHkVx1No7TVknivCig&s", // Simulated URL
      nombre: "Artista 1",
      genero: "Rock",
      pais: "México",
      biografia:
        "Biografía detallada del artista 1, con un enfoque en su trayectoria, influencias y principales éxitos musicales. Este artista ha marcado un hito en la escena rockera de su país.",
      estado: true,
    },
    {
      foto: "https://www.rockandpop.cl/wp-content/uploads/2023/03/Taylor-Swift-GettyImages-1425749502-web-768x432.jpg", // Simulated URL
      nombre: "Artista 2",
      genero: "Pop",
      pais: "Estados Unidos",
      biografia:
        "Conocido por sus melodías pegadizas y letras emotivas, este artista pop ha conquistado las listas de éxitos mundiales. Su música es sinónimo de innovación y conexión con el público joven.",
      estado: true,
    },
    {
      foto: "https://i0.wp.com/www.periodismo.com/wp-content/subid/Quienes-son-los-musicos-mas-escuchados-del-mundo-scaled.jpg?fit=959%2C1200&ssl=1", // Simulated URL
      nombre: "Cantante A",
      genero: "Indie",
      pais: "Canadá",
      biografia:
        "Una voz suave que explora los paisajes sonoros con letras introspectivas y arreglos minimalistas. Sus conciertos son experiencias íntimas y envolventes que transportan al oyente.",
      estado: true,
    },
    {
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGw8IttRxLM5-MKJVpOt90pIdTV-0lHsfXQ&s", // Simulated URL
      nombre: "Banda B",
      genero: "Metal",
      pais: "Alemania",
      biografia:
        "Conocidos por sus riffs poderosos, baterías demoledoras y letras profundas que abordan temas sociales y existenciales. Sus shows en vivo son una descarga de energía pura.",
      estado: false,
    },
    {
      foto: "https://los40.com.ar/los40/imagenes/2017/12/29/musica/1514554255_620849_1514554626_gigante_normal.jpg", // Simulated URL
      nombre: "Solista C",
      genero: "Electrónica",
      pais: "Francia",
      biografia:
        "Maestro de los beats sintéticos y ambientes hipnóticos, creando paisajes sonoros futuristas que invitan al baile y la introspección. Sus producciones son innovadoras y vanguardistas.",
      estado: true,
    },
    {
      foto: "https://www.portafolio.co/files/article_multimedia/files/crop/uploads/2016/10/27/58123c90e56fa.r_1477592368304.173-0-592-315.jpeg", // Simulated URL
      nombre: "Dúo D",
      genero: "Folk",
      pais: "Irlanda",
      biografia:
        "Armonías vocales exquisitas y melodías acústicas que evocan paisajes bucólicos y narran historias de la tradición. Su música es un viaje al corazón de la cultura celta.",
      estado: false,
    },
  ]);

  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input);
  };

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);

  // Form data now includes temporary file and preview URL for new uploads
  const [formData, setFormData] = useState({
    foto: "", // This will store the URL once "uploaded"
    fotoFile: null, // Temporary storage for the actual File object before upload
    fotoPreviewUrl: "", // Temporary URL for immediate display in the form
    nombre: "",
    genero: "",
    pais: "",
    biografia: "",
  });

  const [currentArtista, setCurrentArtista] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");

  const openModalCrear = () => {
    setFormData({
      foto: "",
      fotoFile: null,
      fotoPreviewUrl: "",
      nombre: "",
      genero: "",
      pais: "",
      biografia: "",
    });
    setModalCrear(true);
  };
  const closeModalCrear = () => setModalCrear(false);

  const openModalEditar = (index) => {
    setCurrentArtista(index);
    // When editing, set foto to the existing URL, clear fotoFile/fotoPreviewUrl unless a new file is chosen
    setFormData({
      ...artistas[index],
      fotoFile: null,
      fotoPreviewUrl: artistas[index].foto, // Use existing URL for preview
    });
    setModalEditar(true);
  };
  const closeModalEditar = () => setModalEditar(false);

  const openModalVer = (index) => {
    setCurrentArtista(index);
    setModalVer(true);
  };
  const closeModalVer = () => setModalVer(false);

  // Simulate file upload to a server
  const handleFileUpload = async (file) => {
    if (!file) return ""; // No file to upload

    // In a real application, you would send this file to your backend
    // and receive a URL in response.
    // For this example, we'll just simulate a delay and create a blob URL.
    console.log("Simulating file upload for:", file.name);
    await new Promise((resolve) => setTimeout(resolve, 1000)); // Simulate network delay

    // For demonstration, we'll use a placeholder URL.
    // In a real app, this would be the actual URL returned from your server after upload.
    const simulatedUrl = `https://via.placeholder.com/150/${Math.floor(
      Math.random() * 16777215
    ).toString(16)}/ffffff?text=${file.name.substring(0, 5)}`;
    console.log("Simulated upload complete. URL:", simulatedUrl);
    return simulatedUrl;
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "foto") {
      const file = files[0];
      setFormData({
        ...formData,
        fotoFile: file,
        fotoPreviewUrl: file ? URL.createObjectURL(file) : "", // Create object URL for instant preview
      });
    } else {
      setFormData({ ...formData, [name]: sanitizeInput(value) });
    }
  };

  const validateForm = () => {
    return (
      formData.nombre &&
      formData.genero &&
      formData.pais &&
      formData.biografia
    );
  };

  const handleAddArtista = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    Swal.fire({
      title: "Agregando Artista...",
      text: "Por favor, espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let uploadedPhotoUrl = formData.foto;
    if (formData.fotoFile) {
      // If a new file was selected
      uploadedPhotoUrl = await handleFileUpload(formData.fotoFile);
    }

    setArtistas([
      ...artistas,
      { ...formData, foto: uploadedPhotoUrl, estado: true },
    ]);

    Swal.fire({
      icon: "success",
      title: "Artista agregado",
      text: `El artista "${formData.nombre}" fue agregado exitosamente.`,
      confirmButtonColor: "#00FF8C", // Neon Green
    });

    closeModalCrear();
    setFormData({
      foto: "",
      fotoFile: null,
      fotoPreviewUrl: "",
      nombre: "",
      genero: "",
      pais: "",
      biografia: "",
    });
  };

  const handleUpdateArtista = async () => {
    if (!validateForm()) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Todos los campos son obligatorios.",
      });
      return;
    }

    Swal.fire({
      title: "Actualizando Artista...",
      text: "Por favor, espera.",
      allowOutsideClick: false,
      didOpen: () => {
        Swal.showLoading();
      },
    });

    let updatedPhotoUrl = formData.foto; // Start with the existing URL
    if (formData.fotoFile) {
      // If a new file was selected for upload
      updatedPhotoUrl = await handleFileUpload(formData.fotoFile);
    }

    const updatedArtistas = [...artistas];
    updatedArtistas[currentArtista] = { ...formData, foto: updatedPhotoUrl }; // Update with the new or existing URL

    setArtistas(updatedArtistas);

    Swal.fire({
      icon: "success",
      title: "Artista actualizado",
      text: `El artista "${formData.nombre}" fue actualizado exitosamente.`,
      confirmButtonColor: "#00FF8C", // Neon Green
    });

    closeModalEditar();
    setFormData({
      foto: "",
      fotoFile: null,
      fotoPreviewUrl: "",
      nombre: "",
      genero: "",
      pais: "",
      biografia: "",
    });
  };

  const handleDeleteArtista = (index) => {
    Swal.fire({
      title: "¿Estás seguro?",
      text: "¡No podrás revertir esto! El artista será marcado como inactivo.",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#EF4444",
      cancelButtonColor: "#6B7280",
      confirmButtonText: "Sí, desactivar",
      cancelButtonText: "Cancelar",
    }).then((result) => {
      if (result.isConfirmed) {
        const updatedArtistas = [...artistas];
        updatedArtistas[index].estado = false;
        setArtistas(updatedArtistas);

        Swal.fire({
          icon: "info",
          title: "Artista desactivado",
          text: "El artista fue marcado como inactivo.",
          confirmButtonColor: "#00FF8C", // Neon Green
        });
      }
    });
  };

  const handleRestoreArtista = (index) => {
    const updatedArtistas = [...artistas];
    updatedArtistas[index].estado = true;
    setArtistas(updatedArtistas);

    Swal.fire({
      icon: "success",
      title: "Artista restaurado",
      text: "El artista fue restaurado y está activo nuevamente.",
      confirmButtonColor: "#00FF8C", // Neon Green
    });
  };

  const handleSearchChange = (e) => {
    setSearchTerm(sanitizeInput(e.target.value));
  };

  const handleExportExcel = () => {
    const worksheet = XLSX.utils.json_to_sheet(
      artistas.map((artista) => ({
        Nombre: artista.nombre,
        Genero: artista.genero,
        Pais: artista.pais,
        Biografia: artista.biografia,
        Estado: artista.estado ? "Activo" : "Inactivo",
      }))
    );
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Artistas");
    XLSX.writeFile(workbook, "artistas.xlsx");

    Swal.fire({
      icon: "success",
      title: "Exportado",
      text: "La lista de artistas ha sido exportada a Excel.",
      confirmButtonColor: "#00FF8C", // Neon Green
    });
  };

  const filteredArtistas = artistas.filter((artista) =>
    artista.nombre.toLowerCase().includes(searchTerm.toLowerCase())
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
        .input-glass {
          background-color: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          color: #e2e8f0; /* text-gray-200 */
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }
        .input-glass::placeholder {
          color: #94a3b8; /* text-gray-400 */
        }
        .input-glass:focus {
          border-color: #00ff8c; /* focus:ring-[#00FF8C] */
          box-shadow: 0 0 0 2px rgba(0, 255, 140, 0.5);
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
          <div className="relative z-10 flex flex-col sm:flex-row items-center justify-between">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg text-center sm:text-left mb-4 sm:mb-0">
              Gestión de Artistas
            </h1>
            <motion.button
              onClick={openModalCrear}
              className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
            >
              <FiPlusCircle className="group-hover:rotate-6 transition-transform" />
              Agregar Nuevo Artista
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
                  Artistas
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
              placeholder="Buscar artista por nombre..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="input-glass p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>
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
        </motion.div>

        {/* Tabla de artistas */}
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
                <th className="py-3 px-6 text-left">Nombre</th>
                <th className="py-3 px-6 text-left">Género</th>
                <th className="py-3 px-6 text-left">País</th>
                <th className="py-3 px-6 text-left">Biografía</th>
                <th className="py-3 px-6 text-center">Estado</th>
                <th className="py-3 px-6 text-center">Acciones</th>
              </tr>
            </thead>
            <AnimatePresence>
              <tbody className="text-gray-200 text-sm font-light">
                {filteredArtistas.length > 0 ? (
                  filteredArtistas.map((artista, index) => (
                    <motion.tr
                      key={index}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: -50 }}
                      transition={{
                        duration: 0.6,
                        ease: "easeOut",
                        delay: 0.08 * index,
                      }}
                      className="border-b border-gray-700 glass-table-row"
                    >
                      <td className="py-4 px-6">
                        {artista.foto ? (
                          <img
                            src={artista.foto} // Now directly use the URL
                            alt={`Foto de ${artista.nombre}`}
                            className="w-16 h-16 object-cover rounded-full shadow-md border-2 border-[#00FF8C]"
                          />
                        ) : (
                          <div className="w-16 h-16 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-xs font-semibold border-2 border-gray-600">
                            Sin Foto
                          </div>
                        )}
                      </td>
                      <td className="py-4 px-6 text-white font-medium">
                        {artista.nombre}
                      </td>
                      <td className="py-4 px-6">{artista.genero}</td>
                      <td className="py-4 px-6">{artista.pais}</td>
                      <td className="py-4 px-6 max-w-xs truncate">
                        {artista.biografia}
                      </td>
                      <td className="py-4 px-6 text-center">
                        <span
                          className={`px-3 py-1 rounded-full text-white text-xs font-semibold ${
                            artista.estado
                              ? "bg-gradient-to-r from-green-500 to-lime-500"
                              : "bg-red-600"
                          }`}
                        >
                          {artista.estado ? "Activo" : "Inactivo"}
                        </span>
                      </td>
                      <td className="py-4 px-6 flex items-center justify-center space-x-2">
                        <motion.button
                          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                          style={{
                            backgroundColor: "#8B5CF6",
                            boxShadow: "0 4px 10px rgba(139, 92, 246, 0.6)",
                          }}
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModalVer(index)}
                          title="Ver detalles"
                        >
                          <FiEye size={20} />
                        </motion.button>
                        <motion.button
                          className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                          style={{
                            backgroundColor: "#FACC15",
                            boxShadow: "0 4px 10px rgba(250, 204, 21, 0.6)",
                          }}
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                          onClick={() => openModalEditar(index)}
                          title="Editar artista"
                        >
                          <FiEdit size={20} />
                        </motion.button>
                        {artista.estado ? (
                          <motion.button
                            className="w-10 h-10 rounded-full flex items-center justify-center cursor-pointer text-white"
                            style={{
                              backgroundColor: "#EF4444",
                              boxShadow: "0 4px 10px rgba(239, 68, 68, 0.6)",
                            }}
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleDeleteArtista(index)}
                            title="Desactivar artista"
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
                            whileHover={{ scale: 1.1, rotate: -5 }}
                            whileTap={{ scale: 0.9 }}
                            onClick={() => handleRestoreArtista(index)}
                            title="Restaurar artista"
                          >
                            <FiRefreshCcw size={20} />
                          </motion.button>
                        )}
                      </td>
                    </motion.tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="7" className="text-center py-4 text-gray-400">
                      No se encontraron artistas.
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
            onSave={handleAddArtista}
            title="Crear Nuevo Artista"
          />
        )}

        {modalEditar && (
          <ModalFormulario
            formData={formData}
            onClose={closeModalEditar}
            onChange={handleInputChange}
            onSave={handleUpdateArtista}
            title="Editar Artista"
          />
        )}

        {modalVer && (
          <ModalVer data={artistas[currentArtista]} onClose={closeModalVer} />
        )}
      </AnimatePresence>
    </motion.div>
  );
};

const ModalFormulario = ({ formData, onClose, onChange, onSave, title }) => {
  const isFormValid =
    formData.nombre && formData.genero && formData.pais && formData.biografia;

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
            className="inline-flex items-center justify-center bg-gradient-to-r from-lime-500 to-green-500 text-white text-base font-semibold px-6 py-3 rounded-full cursor-pointer hover:from-lime-600 hover:to-green-600 focus:ring-2 focus:ring-[#00FF8C] focus:outline-none transition-all duration-200 ease-in-out shadow-lg hover:shadow-xl transform-gpu"
          >
            Subir Imagen
          </label>
          <input
            id="foto"
            type="file"
            name="foto"
            accept="image/*" // Restrict to image files
            onChange={onChange}
            className="hidden"
          />
          {formData.fotoPreviewUrl && ( // Use fotoPreviewUrl for display
            <motion.div
              className="mt-4"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <img
                src={formData.fotoPreviewUrl} // Use fotoPreviewUrl for display
                alt="Vista previa"
                className="mx-auto w-28 h-28 object-cover rounded-full border-3 border-[#00FF8C] shadow-md transition-all duration-300 transform hover:scale-105"
              />
              <p className="text-gray-300 text-sm mt-2 font-medium">
                {formData.fotoFile ? formData.fotoFile.name : "Imagen actual"}
              </p>
            </motion.div>
          )}
        </div>

        {[
          { label: "Nombre", name: "nombre", type: "text", value: formData.nombre },
          { label: "Género", name: "genero", type: "text", value: formData.genero },
          { label: "País", name: "pais", type: "text", value: formData.pais },
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
              className="input-glass p-3 rounded-lg w-full text-base focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              required
            />
          </div>
        ))}

        <div className="mb-6">
          <label className="block text-sm font-semibold text-gray-300 mb-1">
            Biografía
          </label>
          <textarea
            name="biografia"
            value={formData.biografia}
            onChange={onChange}
            rows="4"
            className="input-glass p-3 rounded-lg w-full text-base resize-y focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            required
          />
        </div>

        <div className="flex justify-end space-x-3">
          <motion.button
            onClick={onSave}
            className={`px-6 py-3 rounded-full text-white font-semibold transition-all duration-200 ${
              isFormValid
                ? "bg-gradient-to-r from-lime-500 to-green-500 hover:from-lime-600 hover:to-green-600 shadow-md hover:shadow-lg focus:ring-4 focus:ring-[#00FF8C] focus:ring-opacity-50"
                : "bg-gray-700 cursor-not-allowed opacity-70"
            } transform-gpu`}
            disabled={!isFormValid}
            whileHover={{ scale: isFormValid ? 1.05 : 1 }}
            whileTap={{ scale: isFormValid ? 0.95 : 1 }}
          >
            Guardar
          </motion.button>
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold hover:from-gray-600 hover:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 transform-gpu focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50"
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
          Detalles del Artista
        </h2>

        <div className="mb-4 text-center">
          {data.foto ? (
            <img
              src={data.foto} // Now directly use the URL
              alt={`Foto de ${data.nombre}`}
              className="mx-auto w-32 h-32 object-cover rounded-full border-4 border-[#00FF8C] shadow-lg transition-all duration-300 transform hover:scale-105"
            />
          ) : (
            <div className="mx-auto w-32 h-32 bg-gray-700 rounded-full flex items-center justify-center text-gray-400 text-sm font-semibold border-4 border-gray-600">
              Sin Foto
            </div>
          )}
        </div>

        <div className="space-y-4 text-gray-200">
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-0.5">
              Nombre:
            </label>
            <p className="text-white text-lg font-medium">{data.nombre}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-0.5">
              Género:
            </label>
            <p className="text-gray-200">{data.genero}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-0.5">
              País:
            </label>
            <p className="text-gray-200">{data.pais}</p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-0.5">
              Biografía:
            </label>
            <p className="text-gray-200 leading-relaxed text-justify">
              {data.biografia}
            </p>
          </div>
          <div>
            <label className="block text-sm font-semibold text-gray-300 mb-0.5">
              Estado:
            </label>
            <span
              className={`px-4 py-1 rounded-full text-sm font-semibold ${
                data.estado
                  ? "bg-gradient-to-r from-green-500 to-lime-500 text-white"
                  : "bg-red-600 text-white"
              }`}
            >
              {data.estado ? "Activo" : "Inactivo"}
            </span>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            onClick={onClose}
            className="px-6 py-3 rounded-full bg-gradient-to-r from-gray-700 to-gray-800 text-white font-semibold hover:from-gray-600 hover:to-gray-700 shadow-md hover:shadow-lg transition-all duration-200 transform-gpu focus:outline-none focus:ring-4 focus:ring-gray-600 focus:ring-opacity-50"
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
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Artistas;