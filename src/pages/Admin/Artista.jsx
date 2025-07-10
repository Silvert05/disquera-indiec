import { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiRefreshCcw,
  FiFilter,
  FiDownload,
  FiPlusCircle,
  FiSearch,
  FiArrowUp,
  FiArrowDown
} from "react-icons/fi";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import xss from "xss";
import AOS from 'aos';
import 'aos/dist/aos.css';

const Artistas = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const [artistas, setArtistas] = useState([
    {
      id: 'a1',
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQYRoSMJk9DH7ExNNmdJHkVx1No7TVknivCig&s",
      nombre: "Artista 1",
      genero: "Rock",
      pais: "México",
      biografia: "Biografía detallada del artista 1, con un enfoque en su trayectoria, influencias y principales éxitos musicales. Este artista ha marcado un hito en la escena rockera de su país.",
      estado: true,
    },
    {
      id: 'a2',
      foto: "https://www.rockandpop.cl/wp-content/uploads/2023/03/Taylor-Swift-GettyImages-1425749502-web-768x432.jpg",
      nombre: "Artista 2",
      genero: "Pop",
      pais: "Estados Unidos",
      biografia: "Conocido por sus melodías pegadizas y letras emotivas, este artista pop ha conquistado las listas de éxitos mundiales. Su música es sinónimo de innovación y conexión con el público joven.",
      estado: true,
    },
    {
      id: 'a3',
      foto: "https://i0.wp.com/www.periodismo.com/wp-content/subid/Quienes-son-los-musicos-mas-escuchados-del-mundo-scaled.jpg?fit=959%2C1200&ssl=1",
      nombre: "Cantante A",
      genero: "Indie",
      pais: "Canadá",
      biografia: "Una voz suave que explora los paisajes sonoros con letras introspectivas y arreglos minimalistas. Sus conciertos son experiencias íntimas y envolventes que transportan al oyente.",
      estado: true,
    },
    {
      id: 'a4',
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRlGw8IttRxLM5-MKJVpOt90pIdTV-0lHsfXQ&s",
      nombre: "Banda B",
      genero: "Metal",
      pais: "Alemania",
      biografia: "Conocidos por sus riffs poderosos, baterías demoledoras y letras profundas que abordan temas sociales y existenciales. Sus shows en vivo son una descarga de energía pura.",
      estado: false,
    },
    {
      id: 'a5',
      foto: "https://los40.com.ar/los40/imagenes/2017/12/29/musica/1514554255_620849_1514554626_gigante_normal.jpg",
      nombre: "Solista C",
      genero: "Electrónica",
      pais: "Francia",
      biografia: "Maestro de los beats sintéticos y ambientes hipnóticos, creando paisajes sonoros futuristas que invitan al baile y la introspección. Sus producciones son innovadoras y vanguardistas.",
      estado: true,
    },
    {
      id: 'a6',
      foto: "https://www.portafolio.co/files/article_multimedia/files/crop/uploads/2016/10/27/58123c90e56fa.r_1477592368304.173-0-592-315.jpeg",
      nombre: "Dúo D",
      genero: "Folk",
      pais: "Irlanda",
      biografia: "Armonías vocales exquisitas y melodías acústicas que evocan paisajes bucólicos y narran historias de la tradición. Su música es un viaje al corazón de la cultura celta.",
      estado: false,
    },
  ]);

  const generosMusicales = [
    "Rock", "Pop", "Jazz", "Electrónica", "Hip-Hop", "Reggae", "Metal",
    "Blues", "Country", "Folk", "R&B", "Soul", "Funk", "Latina", "Reggaeton",
    "Clásica", "Alternativo", "Indie", "Cumbia", "Salsa", "Merengue", "Bachata",
    "World Music", "Otros"
  ];

  const paises = [
    "Argentina", "Bolivia", "Brasil", "Canadá", "Chile", "Colombia", "Costa Rica",
    "Cuba", "Ecuador", "El Salvador", "Estados Unidos", "Guatemala", "Honduras",
    "México", "Nicaragua", "Panamá", "Paraguay", "Perú", "Puerto Rico", 
    "República Dominicana", "Uruguay", "Venezuela", "España", "Francia", 
    "Alemania", "Italia", "Reino Unido", "Portugal", "Otro"
  ];

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    foto: null,
    nombre: "",
    genero: "",
    pais: "",
    biografia: "",
  });
  const [currentArtista, setCurrentArtista] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterActive, setFilterActive] = useState("all");
  const [sortOrder, setSortOrder] = useState("asc");
  const [errors, setErrors] = useState({});

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

  const handleSearchChange = (e) => setSearchTerm(xss(e.target.value));

  const handleExportToExcel = () => {
    const dataToExport = filteredArtistas.map(({ foto, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Artistas");
    XLSX.writeFile(workbook, "artistas.xlsx");
  };

  const handleFilterChange = () => {
    setFilterActive(prev => {
      if (prev === "all") return "active";
      if (prev === "active") return "inactive";
      return "all";
    });
  };

  const handleSortByName = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const filteredArtistas = artistas
    .filter(artista =>
      artista.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artista.genero.toLowerCase().includes(searchTerm.toLowerCase()) ||
      artista.pais.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(artista => {
      if (filterActive === "all") return true;
      return filterActive === "active" ? artista.estado : !artista.estado;
    })
    .sort((a, b) => sortOrder === "asc" ?
      a.nombre.localeCompare(b.nombre) :
      b.nombre.localeCompare(a.nombre)
    );

  const openModalCrear = () => {
    setFormData({
      foto: null,
      nombre: "",
      genero: "",
      pais: "",
      biografia: "",
    });
    setErrors({});
    setModalCrear(true);
  };

  const openModalEditar = (artistaToEdit) => {
    setCurrentArtista(artistaToEdit);
    setFormData(artistaToEdit);
    setErrors({});
    setModalEditar(true);
  };

  const openModalVer = (artistaToView) => {
    setCurrentArtista(artistaToView);
    setModalVer(true);
  };

  const closeModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalVer(false);
    setCurrentArtista(null);
    setErrors({});
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "foto" ? files[0] : xss(value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.nombre) newErrors.nombre = "Nombre es obligatorio.";
    if (!formData.genero) newErrors.genero = "Género es obligatorio.";
    if (!formData.pais) newErrors.pais = "País es obligatorio.";
    if (!formData.biografia) newErrors.biografia = "Biografía es obligatoria.";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddArtista = () => {
    if (!validateForm()) return;
    setArtistas([...artistas, { ...formData, id: Date.now().toString(), estado: true }]);
    Swal.fire("Éxito", "Artista agregado exitosamente", "success");
    closeModal();
  };

  const handleUpdateArtista = () => {
    if (!validateForm()) return;
    setArtistas(prevArtistas => prevArtistas.map(artista =>
      artista.id === currentArtista.id ? { ...formData, id: currentArtista.id } : artista
    ));
    Swal.fire("Éxito", "Artista actualizado exitosamente", "success");
    closeModal();
  };

  const handleDeleteArtista = (artistaToDelete) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡Estás a punto de desactivar "${artistaToDelete.nombre}"! No podrás revertir esto directamente desde aquí.`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactívalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setArtistas(prevArtistas => prevArtistas.map(artista =>
          artista.id === artistaToDelete.id ? { ...artista, estado: false } : artista
        ));
        Swal.fire(
          'Desactivado!',
          `El artista "${artistaToDelete.nombre}" ha sido desactivado.`,
          'success'
        );
      }
    });
  };

  const handleRestoreArtista = (artistaToRestore) => {
    Swal.fire({
      title: '¿Quieres activar este artista?',
      text: `El artista "${artistaToRestore.nombre}" estará visible de nuevo.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actívalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setArtistas(prevArtistas => prevArtistas.map(artista =>
          artista.id === artistaToRestore.id ? { ...artista, estado: true } : artista
        ));
        Swal.fire(
          'Activado!',
          `El artista "${artistaToRestore.nombre}" ha sido activado.`,
          'success'
        );
      }
    });
  };

  return (
    <div className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen p-8 relative overflow-hidden font-inter">
      <div className="absolute inset-0 z-0 opacity-20" style={{
        background: `radial-gradient(circle at top left, #39FF14 0%, transparent 50%),
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
        backgroundSize: "200% 200%",
        animation: "bg-pan 20s ease infinite",
      }}></div>

      <style jsx>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap');
        body {
          font-family: 'Inter', sans-serif;
        }
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
          className="glass-card p-8 mb-8 flex flex-col md:flex-row justify-between items-center"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 120 }}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div>
            <h1 className="text-4xl font-bold mb-2 md:mb-0">Gestión de Artistas</h1>
            <p className="text-lg opacity-90">Administra los artistas del sistema</p>
          </div>

          <motion.div
            className="glass-card p-3 rounded-lg flex items-center mt-4 md:mt-0"
            variants={cardVariants}
            data-aos="fade-down"
            data-aos-easing="linear"
            data-aos-duration="1500"
          >
            <nav className="flex items-center space-x-2 text-sm">
              <Link to="/dashboard" className="text-[#00FF8C] hover:underline">
                Inicio
              </Link>
              <span className="text-gray-500">/</span>
              <span className="text-white">Artistas</span>
            </nav>
          </motion.div>
        </motion.div>

        <motion.div
          className="glass-card p-6 mb-8 flex flex-wrap gap-4 items-center justify-between"
          variants={cardVariants}
          data-aos="fade-down"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <div className="relative flex-grow max-w-full md:max-w-sm">
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Buscar artista por nombre, género o país..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="w-full pl-10 pr-4 py-2 bg-transparent border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
          </div>

          <div className="flex flex-wrap gap-2 justify-center md:justify-end">
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-500 to-lime-500 rounded-lg flex items-center gap-2 text-white font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleFilterChange}
            >
              <FiFilter />
              {filterActive === "all" ? "Todos" : filterActive === "active" ? "Activos" : "Inactivos"}
            </motion.button>
           
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-lime-600 rounded-lg flex items-center gap-2 text-white font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleExportToExcel}
            >
              <FiDownload /> Exportar
            </motion.button>
            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-teal-500 to-cyan-500 rounded-lg flex items-center gap-2 text-white font-semibold"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={openModalCrear}
            >
              <FiPlusCircle /> Agregar Artista
            </motion.button>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6"
          style={{ gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))" }}
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          data-aos="fade-up"
          data-aos-easing="linear"
          data-aos-duration="1500"
        >
          <AnimatePresence>
            {filteredArtistas.length > 0 ? (
              filteredArtistas.map((artista, index) => (
                <ArtistaCard
                  key={artista.id}
                  artista={artista}
                  index={index}
                  cardVariants={cardVariants}
                  openModalVer={openModalVer}
                  openModalEditar={openModalEditar}
                  handleDeleteArtista={handleDeleteArtista}
                  handleRestoreArtista={handleRestoreArtista}
                />
              ))
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="col-span-full text-center text-gray-400 text-xl py-10"
              >
                No se encontraron artistas que coincidan con tu búsqueda o filtros.
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>

        <AnimatePresence>
          {modalCrear && (
            <ModalFormulario
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleAddArtista}
              generosMusicales={generosMusicales}
              paises={paises}
              errors={errors}
              title="Agregar Artista"
            />
          )}

          {modalEditar && (
            <ModalFormulario
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleUpdateArtista}
              generosMusicales={generosMusicales}
              paises={paises}
              errors={errors}
              title="Editar Artista"
            />
          )}

          {modalVer && (
            <ModalVer
              data={currentArtista}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ArtistaCard = ({ artista, index, cardVariants, openModalVer, openModalEditar, handleDeleteArtista, handleRestoreArtista }) => {
  return (
    <motion.div
      key={artista.id}
      className="glass-card p-6 rounded-t-3xl rounded-br-3xl rounded-bl-xl shadow-md transition-all duration-300 hover:scale-[1.015] flex flex-col"
      variants={cardVariants}
      whileHover="hover"
      layout
      data-aos="fade-up"
      data-aos-delay={index * 50}
    >
      <div className="flex flex-col h-full">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-white">{artista.nombre}</h3>
            <span className={`px-2 py-1 rounded-full text-xs font-semibold ${artista.estado ? "bg-green-500" : "bg-red-500"}`}>
              {artista.estado ? "Activo" : "Inactivo"}
            </span>
          </div>
          <div className="flex gap-2">
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-blue-500 rounded-full hover:bg-blue-600 transition-colors"
              onClick={() => openModalVer(artista)}
              title="Ver detalles"
            >
              <FiEye className="text-white" />
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="p-2 bg-yellow-500 rounded-full hover:bg-yellow-600 transition-colors"
              onClick={() => openModalEditar(artista)}
              title="Editar artista"
            >
              <FiEdit className="text-white" />
            </motion.button>
            {artista.estado ? (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-red-500 rounded-full hover:bg-red-600 transition-colors"
                onClick={() => handleDeleteArtista(artista)}
                title="Desactivar artista"
              >
                <FiTrash2 className="text-white" />
              </motion.button>
            ) : (
              <motion.button
                whileTap={{ scale: 0.9 }}
                className="p-2 bg-green-500 rounded-full hover:bg-green-600 transition-colors"
                onClick={() => handleRestoreArtista(artista)}
                title="Activar artista"
              >
                <FiRefreshCcw className="text-white" />
              </motion.button>
            )}
          </div>
        </div>

        <div className="mb-4 rounded-lg overflow-hidden flex-shrink-0">
          {artista.foto ? (
            <img
              src={typeof artista.foto === 'string' ? artista.foto : URL.createObjectURL(artista.foto)}
              className="w-full h-48 object-cover rounded-lg"
              alt={artista.nombre}
              onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/333333/FFFFFF?text=Sin+Imagen"; }}
            />
          ) : (
            <div className="w-full h-48 bg-gray-700 rounded-lg flex items-center justify-center">
              <span className="text-gray-400">Sin imagen</span>
            </div>
          )}
        </div>

        <div className="flex-grow space-y-3">
          <div>
            <p className="text-sm text-gray-400">Género Musical</p>
            <p className="font-medium">{artista.genero}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">País</p>
            <p className="font-medium">{artista.pais}</p>
          </div>

          <div>
            <p className="text-sm text-gray-400">Biografía</p>
            <p className="font-medium line-clamp-3">{artista.biografia}</p>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ModalFormulario = ({ formData, onClose, onChange, onSave, generosMusicales, paises, errors, title }) => {
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
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md lg:max-w-lg mx-auto my-8 border border-white border-opacity-20 relative"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">{title}</h2>

        <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="mb-4 text-center">
            <label className="block text-sm font-semibold mb-2 text-gray-300">Imagen</label>
            {previewFotoUrl && (
              <img
                src={previewFotoUrl}
                alt="Vista previa"
                className="w-32 h-32 rounded-lg object-cover mx-auto mb-4 border border-gray-600"
              />
            )}
            <label
              htmlFor="foto"
              className="inline-block bg-[#00FF8C] text-gray-900 px-4 py-2 rounded-lg cursor-pointer hover:bg-[#39FF14] transition font-semibold"
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
            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">Nombre</label>
              <input
                type="text"
                name="nombre"
                value={formData.nombre}
                onChange={onChange}
                className={`w-full p-3 bg-gray-800 border ${
                  errors.nombre ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C]`}
              />
              {errors.nombre && (
                <p className="text-red-500 text-sm mt-1">{errors.nombre}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">Género Musical</label>
              <select
                name="genero"
                value={formData.genero}
                onChange={onChange}
                className={`w-full p-3 bg-gray-800 border ${
                  errors.genero ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C]`}
              >
                <option value="">Selecciona un género</option>
                {generosMusicales.map((genero, idx) => (
                  <option key={idx} value={genero}>
                    {genero}
                  </option>
                ))}
              </select>
              {errors.genero && (
                <p className="text-red-500 text-sm mt-1">{errors.genero}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">País</label>
              <select
                name="pais"
                value={formData.pais}
                onChange={onChange}
                className={`w-full p-3 bg-gray-800 border ${
                  errors.pais ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C]`}
              >
                <option value="">Selecciona un país</option>
                {paises.map((pais, idx) => (
                  <option key={idx} value={pais}>
                    {pais}
                  </option>
                ))}
              </select>
              {errors.pais && (
                <p className="text-red-500 text-sm mt-1">{errors.pais}</p>
              )}
            </div>

            <div>
              <label className="block text-sm font-semibold mb-1 text-gray-300">Biografía</label>
              <textarea
                name="biografia"
                value={formData.biografia}
                onChange={onChange}
                rows="4"
                className={`w-full p-3 bg-gray-800 border ${
                  errors.biografia ? "border-red-500" : "border-gray-700"
                } rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-[#00FF8C]`}
              ></textarea>
              {errors.biografia && (
                <p className="text-red-500 text-sm mt-1">{errors.biografia}</p>
              )}
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-3 mt-8">
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-gray-700 to-gray-800 text-white font-bold py-3 px-6 rounded-full shadow-lg hover:from-gray-600 hover:to-gray-700 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Cancelar
          </motion.button>
          <motion.button
            onClick={onSave}
            className="bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:from-[#39FF14] hover:to-[#00FF8C] transition-colors"
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

const ModalVer = ({ data, onClose }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center p-4 z-50 overflow-auto"
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-sm md:max-w-md mx-auto my-8 border border-white border-opacity-20 relative"
      >
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Detalles del Artista</h2>

        <div className="max-h-[70vh] overflow-y-auto pr-2 custom-scrollbar">
          <div className="space-y-4">
            <div className="text-center mb-6">
              {data.foto ? (
                <img
                  src={typeof data.foto === 'string' ? data.foto : URL.createObjectURL(data.foto)}
                  alt="Artista"
                  className="w-40 h-40 rounded-lg object-cover mx-auto border border-gray-600 shadow-md"
                  onError={(e) => { e.target.onerror = null; e.target.src = "https://placehold.co/400x300/333333/FFFFFF?text=Sin+Imagen"; }}
                />
              ) : (
                <div className="w-40 h-40 bg-gray-700 rounded-lg flex items-center justify-center mx-auto border border-gray-600 shadow-md">
                  <span className="text-gray-400 text-lg">Sin foto</span>
                </div>
              )}
            </div>

            {[
              { label: "Nombre", value: data.nombre },
              { label: "Género Musical", value: data.genero },
              { label: "País", value: data.pais },
              { label: "Biografía", value: data.biografia },
            ].map((item) => (
              <div key={item.label} className="flex flex-col">
                <label className="block text-sm font-semibold mb-1 text-gray-300">{item.label}</label>
                <p className="text-lg text-white bg-gray-800 p-3 rounded-lg border border-gray-700">{item.value}</p>
              </div>
            ))}

            <div className="flex flex-col">
              <label className="block text-sm font-semibold mb-1 text-gray-300">Estado</label>
              <span className={`px-4 py-2 rounded-full text-base font-bold w-fit ${
                data.estado ? "bg-green-600 text-white" : "bg-red-600 text-white"
              }`}>
                {data.estado ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        <div className="flex justify-end mt-8">
          <motion.button
            onClick={onClose}
            className="bg-gradient-to-r from-[#00FF8C] to-[#39FF14] text-gray-900 font-bold py-3 px-6 rounded-full shadow-lg hover:from-[#39FF14] hover:to-[#00FF8C] transition-colors"
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

ArtistaCard.propTypes = {
  artista: PropTypes.object.isRequired,
  index: PropTypes.number.isRequired,
  cardVariants: PropTypes.object.isRequired,
  openModalVer: PropTypes.func.isRequired,
  openModalEditar: PropTypes.func.isRequired,
  handleDeleteArtista: PropTypes.func.isRequired,
  handleRestoreArtista: PropTypes.func.isRequired,
};

ModalFormulario.propTypes = {
  formData: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  generosMusicales: PropTypes.array.isRequired,
  paises: PropTypes.array.isRequired,
  errors: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired,
};

ModalVer.propTypes = {
  data: PropTypes.object.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Artistas;