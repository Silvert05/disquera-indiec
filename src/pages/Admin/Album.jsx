import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FiEye,
  FiEdit,
  FiTrash2,
  FiRefreshCcw,
  FiDownload,
  FiSearch,
  FiPlusCircle,
  FiFilter,
  FiExternalLink
} from "react-icons/fi";
import { Link } from "react-router-dom";
import * as XLSX from "xlsx";
import DOMPurify from "dompurify";
import AOS from 'aos';
import 'aos/dist/aos.css';
import Swal from 'sweetalert2';

const Album = () => {
  useEffect(() => {
    AOS.init({
      once: true,
      mirror: false,
    });
    AOS.refresh();
  }, []);

  const [albums, setAlbums] = useState([
    {
      id: 1,
      foto: "https://i.etsystatic.com/9330688/r/il/dfd838/1700622434/il_1080xN.1700622434_1r5l.jpg",
      titulo: "Thriller",
      artista: "Michael Jackson",
      año: 1982,
      genero: "Pop",
      url: "https://open.spotify.com/album/2ANVost0y2y52ema1E9xAZ",
      estado: true,
    },
    {
      id: 2,
      foto: "https://cdn1.eldia.com/072021/1627255515074.jpg",
      titulo: "Back in Black",
      artista: "AC/DC",
      año: 1980,
      genero: "Rock",
      url: "https://open.spotify.com/album/7eyQXxuf2nGj9d2367Gi5f",
      estado: true,
    },
    {
      id: 3,
      foto: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRv3Xi_it_gxC07Nf2XcVbpzpD_BdqPYIIzLb9x_Og5MRWhw7VxafciBiDVus7LoTR59kQ&usqp=CAU",
      titulo: "Master of Puppets",
      artista: "Metallica",
      año: 1986,
      genero: "Metal",
      url: "https://open.spotify.com/album/2Kh43m04B1UkVcpcRa1Zug",
      estado: true,
    },
    {
      id: 4,
      foto: "https://upload.wikimedia.org/wikipedia/en/2/2e/The_Eminem_Show.jpg",
      titulo: "The Eminem Show",
      artista: "Eminem",
      año: 2002,
      genero: "Hip-Hop",
      url: "https://open.spotify.com/album/2cWBwpqMsDJC1ZUwz813lo",
      estado: false,
    }
  ]);

  const generos = [
    "Rock", "Pop", "Jazz", "Electrónica", "Hip-Hop", "Reggae", "Metal",
    "Blues", "Country", "Folk", "R&B", "Soul", "Funk", "Latina", "Reggaeton",
    "Clásica", "Alternativo", "Indie", "Cumbia", "Salsa", "Merengue", "Bachata",
    "World Music", "Otros"
  ];

  const [modalCrear, setModalCrear] = useState(false);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalVer, setModalVer] = useState(false);
  const [formData, setFormData] = useState({
    foto: null,
    titulo: "",
    artista: "",
    año: "",
    genero: "",
    url: ""
  });
  const [currentAlbum, setCurrentAlbum] = useState(null);
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

  const handleSearchChange = (e) => setSearchTerm(DOMPurify.sanitize(e.target.value));
  
  const handleExportToExcel = () => {
    const dataToExport = filteredAlbums.map(({ foto, ...rest }) => rest);
    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Álbumes");
    XLSX.writeFile(workbook, "albumes.xlsx");
  };

  const handleFilterChange = () => {
    setFilterActive(prev => {
      if (prev === "all") return "active";
      if (prev === "active") return "inactive";
      return "all";
    });
  };

  const handleSortByYear = () => {
    setSortOrder(prev => prev === "asc" ? "desc" : "asc");
  };

  const filteredAlbums = albums
    .filter(album => 
      album.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.artista.toLowerCase().includes(searchTerm.toLowerCase()) ||
      album.genero.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .filter(album => {
      if (filterActive === "all") return true;
      return filterActive === "active" ? album.estado : !album.estado;
    })
    .sort((a, b) => sortOrder === "asc" ? a.año - b.año : b.año - a.año);

  const openModalCrear = () => {
    setFormData({
      foto: null,
      titulo: "",
      artista: "",
      año: "",
      genero: "",
      url: ""
    });
    setModalCrear(true);
  };

  const openModalEditar = (album) => {
    setCurrentAlbum(album);
    setFormData(album);
    setModalEditar(true);
  };

  const openModalVer = (album) => {
    setCurrentAlbum(album);
    setModalVer(true);
  };

  const closeModal = () => {
    setModalCrear(false);
    setModalEditar(false);
    setModalVer(false);
  };

  const handleInputChange = (e) => {
    const { name, value, files } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === "foto" ? files[0] : DOMPurify.sanitize(value)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.titulo) newErrors.titulo = "Título obligatorio";
    if (!formData.artista) newErrors.artista = "Artista obligatorio";
    if (!formData.año) newErrors.año = "Año obligatorio";
    if (!formData.genero) newErrors.genero = "Género obligatorio";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleAddAlbum = () => {
    if (!validateForm()) return;
    setAlbums([...albums, { ...formData, id: Date.now(), estado: true }]);
    Swal.fire("Éxito", "Álbum agregado", "success");
    closeModal();
  };

  const handleUpdateAlbum = () => {
    if (!validateForm()) return;
    setAlbums(albums.map(album => 
      album.id === currentAlbum.id ? { ...formData, id: currentAlbum.id } : album
    ));
    Swal.fire("Éxito", "Álbum actualizado", "success");
    closeModal();
  };

  const handleDeleteAlbum = (album) => {
    Swal.fire({
      title: '¿Estás seguro?',
      text: `¡Estás a punto de desactivar "${album.titulo}"!`,
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, desactívalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setAlbums(albums.map(a => 
          a.id === album.id ? { ...a, estado: false } : a
        ));
        Swal.fire('Desactivado!', `El álbum "${album.titulo}" ha sido desactivado.`, 'success');
      }
    });
  };

  const handleRestoreAlbum = (album) => {
    Swal.fire({
      title: '¿Quieres activar este álbum?',
      text: `El álbum "${album.titulo}" estará visible de nuevo.`,
      icon: 'info',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, actívalo',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        setAlbums(albums.map(a => 
          a.id === album.id ? { ...a, estado: true } : a
        ));
        Swal.fire('Activado!', `El álbum "${album.titulo}" ha sido activado.`, 'success');
      }
    });
  };

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
            <h1 className="text-4xl font-bold">Álbumes Musicales</h1>
            <p className="text-lg opacity-90">Administra tu colección de álbumes</p>
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
              <span className="text-white">Álbumes</span>
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
              placeholder="Buscar álbum..."
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
              {filterActive === "all" ? "Todos" : filterActive === "active" ? "Activos" : "Inactivos"}
            </motion.button>

            <motion.button
              className="px-4 py-2 bg-gradient-to-r from-green-600 to-lime-600 rounded-lg flex items-center gap-2"
              variants={buttonVariants}
              whileHover="hover"
              whileTap="tap"
              onClick={handleExportToExcel}
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
              <FiPlusCircle /> Agregar Álbum
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
            {filteredAlbums.map((album) => (
              <motion.div
                key={album.id}
                className="glass-card p-6 rounded-t-3xl rounded-br-3xl rounded-bl-xl shadow-md transition-all duration-300 hover:scale-[1.015]"
                variants={cardVariants}
                whileHover="hover"
                layout
              >
                <div className="flex flex-col h-full">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-white">{album.titulo}</h3>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${album.estado ? "bg-green-500" : "bg-red-500"}`}>
                        {album.estado ? "Activo" : "Inactivo"}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-blue-500 rounded-full"
                        onClick={() => openModalVer(album)}
                      >
                        <FiEye className="text-white" />
                      </motion.button>
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        className="p-2 bg-yellow-500 rounded-full"
                        onClick={() => openModalEditar(album)}
                      >
                        <FiEdit className="text-white" />
                      </motion.button>
                      {album.estado ? (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-red-500 rounded-full"
                          onClick={() => handleDeleteAlbum(album)}
                        >
                          <FiTrash2 className="text-white" />
                        </motion.button>
                      ) : (
                        <motion.button
                          whileTap={{ scale: 0.9 }}
                          className="p-2 bg-green-500 rounded-full"
                          onClick={() => handleRestoreAlbum(album)}
                        >
                          <FiRefreshCcw className="text-white" />
                        </motion.button>
                      )}
                    </div>
                  </div>

                  <div className="mb-4 rounded-lg overflow-hidden">
                    {album.foto ? (
                      <img
                        src={album.foto}
                        className="w-full h-48 object-cover rounded-lg"
                        alt={album.titulo}
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
                      <p className="text-sm text-gray-400">Artista</p>
                      <p className="font-medium">{album.artista}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Año</p>
                      <p className="font-medium">{album.año}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Género</p>
                      <p className="font-medium">{album.genero}</p>
                    </div>

                    <div>
                      <p className="text-sm text-gray-400">Enlace</p>
                      <div className="flex items-center gap-2">
                        <a
                          href={album.url}
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
            <ModalFormulario
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleAddAlbum}
              generos={generos}
              errors={errors}
              title="Agregar Álbum"
            />
          )}

          {modalEditar && (
            <ModalFormulario
              formData={formData}
              onClose={closeModal}
              onChange={handleInputChange}
              onSave={handleUpdateAlbum}
              generos={generos}
              errors={errors}
              title="Editar Álbum"
            />
          )}

          {modalVer && (
            <ModalVer
              data={currentAlbum}
              onClose={closeModal}
            />
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const ModalFormulario = ({ formData, onClose, onChange, onSave, generos, errors, title }) => {
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
          <label className="block text-sm font-semibold mb-2 text-gray-300">Portada del Álbum</label>
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
            { label: "Título del Álbum", name: "titulo", type: "text" },
            { label: "Artista", name: "artista", type: "text" },
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

const ModalVer = ({ data, onClose }) => {
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
        <h2 className="text-3xl font-bold mb-6 text-white text-center">Detalles del Álbum</h2>
        
        <div className="space-y-4">
          <div className="text-center">
            {data.foto ? (
              <img
                src={data.foto}
                alt="Álbum"
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
            { label: "Artista", value: data.artista },
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

export default Album;