import { useState } from "react";
import { motion } from "framer-motion";

const Perfil = () => {
  // Estado para almacenar los datos del usuario
  const [userData, setUserData] = useState({
    name: "Juan Pérez",
    email: "juanperez@mail.com",
    phone: "0025455445",
    location: "Ciudad,Pais",
    profilePicture: "/img/default-profile.jpg", // Imagen de perfil por defecto
  });

  // Estado para controlar el modo de edición
  const [isEditing, setIsEditing] = useState(false);

  // Estado para controlar el modal de éxito
  const [showModal, setShowModal] = useState(false);

  // Función para manejar el cambio de los campos
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

  // Función para manejar el cambio de imagen
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUserData({ ...userData, profilePicture: reader.result });
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
    setShowModal(true); // Mostrar el modal
    setIsEditing(false); // Desactivar el modo de edición
  };

  // Función para cerrar el modal
  const closeModal = () => {
    setShowModal(false);
  };

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const images = [
    { default: "/img/imagen1.jpg", hover: "/img/imagen2.jpg" },
    { default: "/img/imagen1.jpg", hover: "/img/imagen2.jpg" },
    { default: "/img/imagen1.jpg", hover: "/img/imagen2.jpg" },
    { default: "/img/imagen1.jpg", hover: "/img/imagen2.jpg" },
    { default: "/img/imagen1.jpg", hover: "/img/imagen2.jpg" },
  ];

  return (
    // Copiado directamente del dashboard: degradado de fondo y overflow-hidden
    <div className="flex-1 min-h-screen ml-0 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 p-8 relative overflow-hidden">
      {/* Copiado directamente del dashboard: Gradiente animado de fondo */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
        background: `radial-gradient(circle at top left, #39FF14 0%, transparent 30%), 
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
        backgroundSize: '200% 200%',
        animation: 'bg-pan 20s ease infinite'
      }}></div>

      {/* Copiado directamente del dashboard: Estilos CSS para la animación y glassmorphism */}
      <style jsx>{`
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .glass-card {
          background-color: rgba(255, 255, 255, 0.05); /* Semi-transparent blanco */
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
          background: rgba(255,255,255,0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00FF8C; /* CAMBIO DE COLOR: Verde Eléctrico */
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39FF14; /* CAMBIO DE COLOR: Verde Neón */
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
            Perfil de Usuario
          </motion.p>
        </div>

        {/* Segundo bloque de código (Perfil y edición) */}
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="bg-white w-full max-w-4xl p-6 md:p-8 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center space-y-6 md:space-y-0 md:space-x-10 glass-card" // Añadido glass-card
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, type: "spring", stiffness: 100, damping: 10 }}
          >
            {/* Sección de la imagen de perfil */}
            <div className="flex flex-col items-center">
              <div className="relative w-40 h-40 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label
                    htmlFor="profilePicture"
                    className="absolute inset-0 bg-black bg-opacity-50 flex flex-col items-center justify-center rounded-full cursor-pointer text-white transition-opacity duration-300 opacity-0 hover:opacity-100"
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
                    <span className="text-sm font-medium">Cambiar imagen</span>
                  </label>
                )}
                <input
                  id="profilePicture"
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="hidden"
                />
              </div>
            </div>

            {/* Sección de datos del perfil */}
            <form className="w-full">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-6">
                {/* Columna izquierda: Nombre y Correo */}
                <div>
                  <div className="mb-4">
                    <motion.label
                      htmlFor="name"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.1 }}
                    >
                      Nombre
                    </motion.label>
                    <motion.input
                      type="text"
                      id="name"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="mb-4">
                    <motion.label
                      htmlFor="email"
                      className="block text-sm font-semibold text-gray-700 mb-1"
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
                      value={userData.email}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>

                {/* Columna derecha: Número y Ubicación */}
                <div>
                  {/* Campo de número */}
                  <div className="mb-4">
                    <motion.label
                      htmlFor="phone"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.3 }}
                    >
                      Número
                    </motion.label>
                    <motion.input
                      type="text"
                      id="phone"
                      name="phone"
                      value={userData.phone}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>

                  <div className="mb-4">
                    <motion.label
                      htmlFor="location"
                      className="block text-sm font-semibold text-gray-700 mb-1"
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.4, delay: 0.4 }}
                    >
                      Ubicación
                    </motion.label>
                    <motion.input
                      type="text"
                      id="location"
                      name="location"
                      value={userData.location}
                      onChange={handleChange}
                      disabled={!isEditing}
                      className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                      whileFocus={{ scale: 1.02 }}
                    />
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-8">
                <motion.button
                  type="button"
                  onClick={isEditing ? saveChanges : toggleEdit}
                  className="bg-green-600 text-white py-3 px-8 rounded-full font-bold hover:bg-green-700 transition duration-300 shadow-md"
                  whileTap={{ scale: 0.95 }}
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.5 }}
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
              className="bg-white p-8 rounded-xl shadow-2xl max-w-sm w-full text-center border-t-8 border-green-500"
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
                {/* Icono de "check" animado con borde verde claro */}
                <motion.svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-20 h-20 text-green-600 border-4 border-green-300 rounded-full p-3"
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
                className="text-xl font-bold text-gray-800 mb-2"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.7 }}
              >
                ¡Éxito!
              </motion.p>
              <motion.p
                className="mt-2 text-gray-600"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.8 }}
              >
                Tus datos han sido editados con éxito.
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

        {/* Barra blanca con el texto Mis Publicaciones */}
        <div className="flex justify-center items-center py-10">
          <motion.div
            className="bg-green-700 p-7 rounded-2xl shadow-xl text-center"
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
              Mis Publicaciones
            </motion.p>
          </motion.div>
        </div>

        {/* Tres cuadros en la parte baja con fondo gradiente */}
        <div className="flex justify-center items-center py-10">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl w-full">
            {images.map((image, index) => (
              <motion.div
                key={index}
                className="w-full h-60 bg-gray-500 rounded-xl overflow-hidden cursor-pointer shadow-lg glass-card" // Añadido glass-card
                whileHover={{ scale: 1.05, boxShadow: "0px 10px 15px rgba(0, 0, 0, 0.2)" }}
                transition={{ duration: 0.3 }}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <motion.img
                  src={hoveredIndex === index ? image.hover : image.default}
                  alt={`Imagen ${index + 1}`}
                  className="w-full h-full object-cover"
                  initial={{ opacity: 0.7 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.3 }}
                />
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Perfil;