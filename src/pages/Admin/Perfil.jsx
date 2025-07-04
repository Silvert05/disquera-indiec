import { useState } from "react";
import { motion } from "framer-motion";

const PerfilDisquera = () => {
  // Estado para almacenar los datos de la disquera
  const [disqueraData, setDisqueraData] = useState({
    nombre: "Sonic Wave Records",
    email: "contacto@sonicwave.com",
    telefono: "+1 555 123 4567",
    ubicacion: "Los Ángeles, California",
    fundacion: "2010",
    descripcion: "Disquera independiente especializada en artistas emergentes de música electrónica y alternativa.",
    logo: "/img/disquera-logo.jpg",
    portafolio: [
      { id: 1, imagen: "/img/album1.jpg", artista: "The Neon Lights", album: "City Lights" },
      { id: 2, imagen: "/img/album2.jpg", artista: "Midnight Echo", album: "Silent Screams" },
      { id: 3, imagen: "/img/album3.jpg", artista: "Electric Pulse", album: "Voltage" },
      { id: 4, imagen: "/img/album4.jpg", artista: "The Neon Lights", album: "Neon Dreams" },
      { id: 5, imagen: "/img/album5.jpg", artista: "Various Artists", album: "Sonic Wave Vol. 1" },
    ]
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para controlar el modal de éxito
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setDisqueraData({ ...disqueraData, [name]: value });
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setDisqueraData({ ...disqueraData, logo: reader.result });
      };
      reader.readAsDataURL(file);
    }
  };

  // Función para alternar el modo de edición
  const toggleEdit = () => {
    setIsEditing(!isEditing);
  };

  // Función para guardar los cambios y mostrar el modal
  const saveChanges = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  return (
    <div className="flex-1 min-h-screen ml-0 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 p-8 relative overflow-hidden">
      {/* Gradiente animado de fondo con colores originales */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
        background: `radial-gradient(circle at top left, #39FF14 0%, transparent 30%), 
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
        backgroundSize: '200% 200%',
        animation: 'bg-pan 20s ease infinite'
      }}></div>

      {/* Estilos CSS */}
      <style jsx>{`
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
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
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00FF8C;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39FF14;
        }
      `}</style>

      {/* Contenido del perfil */}
      <div className="relative z-10 p-4 sm:p-6 md:p-8">
        {/* Título de bienvenida */}
        <div className="flex justify-center items-center py-8">
          <motion.p
            className="text-4xl font-bold text-white text-shadow-lg"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{
              duration: 0.8,
              ease: "easeOut",
              delay: 0.2,
            }}
          >
            Perfil de la Disquera
          </motion.p>
        </div>

        {/* Información de la disquera */}
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="bg-white w-full max-w-6xl p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-start space-y-6 md:space-y-0 md:space-x-10 glass-card"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 10 }}
          >
            {/* Sección del logo */}
            <div className="flex flex-col items-center w-full md:w-1/3">
              <div className="relative w-48 h-48 rounded-xl overflow-hidden border-4 border-gray-200 shadow-lg">
                <img
                  src={disqueraData.logo}
                  alt="Logo Disquera"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label
                    htmlFor="logo"
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-xl cursor-pointer text-white transition-opacity duration-300 opacity-0 hover:opacity-100"
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      className="w-10 h-10 mb-2"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth="2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 4v16m8-8H4"
                      />
                    </svg>
                    <span className="text-sm font-medium">Cambiar logo</span>
                  </label>
                )}
                <input
                  id="logo"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Sección de datos de la disquera */}
            <form className="w-full md:w-2/3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Columna izquierda: Información básica */}
                <div>
                  <div className="mb-4">
                    <motion.label
                      htmlFor="nombre"
                      className="block text-sm font-semibold text-gray-300 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      Nombre de la Disquera
                    </motion.label>
                    <motion.input
                      type="text"
                      id="nombre"
                      name="nombre"
                      value={disqueraData.nombre}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="mb-4">
                    <motion.label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-300 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.2 }}
                    >
                      Correo Electrónico
                    </motion.label>
                    <motion.input
                      type="email"
                      id="email"
                      name="email"
                      value={disqueraData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                {/* Columna derecha: Contacto */}
                <div>
                  <div className="mb-4">
                    <motion.label
                      htmlFor="telefono"
                      className="block text-sm font-semibold text-gray-300 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      Teléfono de Contacto
                    </motion.label>
                    <motion.input
                      type="text"
                      id="telefono"
                      name="telefono"
                      value={disqueraData.telefono}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="mb-4">
                    <motion.label
                      htmlFor="ubicacion"
                      className="block text-sm font-semibold text-gray-300 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      Ubicación
                    </motion.label>
                    <motion.input
                      type="text"
                      id="ubicacion"
                      name="ubicacion"
                      value={disqueraData.ubicacion}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-white"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>
              </div>

              {/* Descripción */}
              <div className="mt-4">
                <motion.label
                  htmlFor="descripcion"
                  className="block text-sm font-semibold text-gray-300 mb-1"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: 0.5 }}
                >
                  Descripción
                </motion.label>
                <motion.textarea
                  id="descripcion"
                  name="descripcion"
                  value={disqueraData.descripcion}
                  onChange={handleChange}
                  disabled={!isEditing}
                  rows="4"
                  className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition duration-200 text-white"
                  whileFocus={{ scale: 1.02 }}
                />
              </div>

              {/* Botones */}
              <div className="flex justify-between mt-8">
                <motion.button
                  type="button"
                  onClick={isEditing ? toggleEdit : null}
                  className={`py-2 px-6 rounded-full font-medium transition duration-300 ${isEditing ? 'bg-gray-600 text-white hover:bg-gray-700' : 'invisible'}`}
                  whileTap={{ scale: 0.95 }}
                  whileHover={isEditing ? { scale: 1.05 } : {}}
                >
                  Cancelar
                </motion.button>
                
                <motion.button
                  type="button"
                  onClick={isEditing ? saveChanges : toggleEdit}
                  className="bg-green-600 text-white py-3 px-8 rounded-full font-bold hover:bg-green-700 transition duration-300 shadow-md"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                >
                  {isEditing ? "Guardar cambios" : "Editar perfil"}
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>

        {/* Modal de éxito */}
        {showModal && (
          <div className="fixed inset-0 flex justify-center items-center bg-black bg-opacity-60 z-50 p-4">
            <motion.div
              className="bg-gray-800 p-8 rounded-xl shadow-2xl max-w-sm w-full text-center border-t-8 border-green-500"
              initial={{ opacity: 0, y: -50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 120 }}
            >
              <motion.div
                className="mb-6 flex justify-center"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, type: "spring" }}
              >
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-green-400 border-4 border-green-300 rounded-full p-3"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="2"
                  animate={{ rotate: [0, 360] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                >
                  <motion.path
                    initial={{ pathLength: 0 }}
                    animate={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
                    d="M5 13l4 4L19 7"
                  />
                </motion.svg>
              </motion.div>
              <motion.p
                className="text-xl font-bold text-white mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                ¡Cambios guardados!
              </motion.p>
              <motion.p
                className="mt-2 text-gray-300"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                La información de la disquera ha sido actualizada.
              </motion.p>
              <motion.button
                onClick={closeModal}
                className="mt-6 bg-green-600 text-white py-2.5 px-7 rounded-md hover:bg-green-700 transition duration-300 font-semibold shadow-sm"
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.9 }}
              >
                Aceptar
              </motion.button>
            </motion.div>
          </div>
        )}

        {/* Catálogo de álbumes */}
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="bg-green-700 p-7 rounded-2xl shadow-xl text-center w-full max-w-6xl"
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
          >
            <motion.p
              className="text-4xl font-bold text-white tracking-wide"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5 }}
            >
              Catálogo de Álbumes
            </motion.p>
          </motion.div>
        </div>

        {/* Álbumes */}
        <div className="flex justify-center items-center pb-20">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl w-full">
            {disqueraData.portafolio.map((album, index) => (
              <motion.div
                key={album.id}
                className="w-full bg-gray-800 rounded-xl overflow-hidden cursor-pointer shadow-lg glass-card"
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.3)" }}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="relative pt-[100%]">
                  <img
                    src={album.imagen}
                    alt={`Álbum ${album.album}`}
                    className="absolute top-0 left-0 w-full h-full object-cover"
                  />
                </div>
                <div className="p-4">
                  <h3 className="text-lg font-bold text-white truncate">{album.album}</h3>
                  <p className="text-sm text-gray-400">{album.artista}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerfilDisquera;