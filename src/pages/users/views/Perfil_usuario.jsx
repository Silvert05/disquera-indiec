import { useState } from "react";
import { motion } from "framer-motion";

const PerfilCliente = () => {
  // Datos del cliente (simulados)
  const [userData, setUserData] = useState({
    name: "Carlos Martínez",
    email: "carlos.martinez@example.com",
    phone: "+34 612 345 678",
    location: "Madrid, España",
    bio: "Cliente premium desde 2022. Apasionado por la tecnología y el buen servicio.",
    profilePicture: "/img/user-default.jpg",
    memberSince: "Enero 2022",
    lastPurchase: "Hace 2 semanas",
    totalPurchases: 15
  });

  const [isEditing, setIsEditing] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };

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

  const toggleEdit = () => setIsEditing(!isEditing);

  const saveChanges = () => {
    setShowModal(true);
    setIsEditing(false);
  };

  const closeModal = () => setShowModal(false);

  return (
    <div className="flex-1 min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-800 text-gray-100 p-4 md:p-8 relative overflow-hidden">
      {/* Fondo animado */}
      <div className="absolute inset-0 z-0 opacity-30" style={{
        background: `radial-gradient(circle at 20% 30%, rgba(0, 255, 140, 0.3) 0%, transparent 30%), 
                     radial-gradient(circle at 80% 70%, rgba(57, 255, 20, 0.3) 0%, transparent 30%)`,
        backgroundSize: '200% 200%',
        animation: 'bg-pan 15s ease infinite'
      }}></div>

      <style jsx>{`
        @keyframes bg-pan {
          0% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
          100% { background-position: 0% 0%; }
        }
        .glass-card {
          background: rgba(255, 255, 255, 0.08);
          backdrop-filter: blur(12px);
          -webkit-backdrop-filter: blur(12px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.36);
        }
        .profile-pic {
          border: 3px solid rgba(0, 255, 140, 0.7);
          box-shadow: 0 0 20px rgba(0, 255, 140, 0.4);
        }
      `}</style>

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Encabezado del perfil */}
        <motion.div 
          className="flex flex-col items-center py-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <h1 className="text-4xl font-bold text-center bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent">
            Mi Perfil
          </h1>
          <p className="mt-2 text-gray-300">Administra tu información personal</p>
        </motion.div>

        {/* Tarjeta principal del perfil */}
        <motion.div 
          className="glass-card rounded-2xl p-6 mb-10"
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          <div className="flex flex-col md:flex-row gap-8">
            {/* Sección de la foto de perfil */}
            <div className="flex flex-col items-center md:items-start">
              <div className="relative w-40 h-40 rounded-full overflow-hidden profile-pic mb-4">
                <img
                  src={userData.profilePicture}
                  alt="Profile"
                  className="w-full h-full object-cover"
                />
                {isEditing && (
                  <label
                    htmlFor="profilePicture"
                    className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center rounded-full cursor-pointer text-white transition-opacity duration-300 opacity-0 hover:opacity-100"
                  >
                    <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
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

              {/* Estadísticas del cliente */}
              <div className="text-center md:text-left">
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Miembro desde</p>
                  <p className="font-medium text-white">{userData.memberSince}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Última compra</p>
                  <p className="font-medium text-white">{userData.lastPurchase}</p>
                </div>
                
                <div className="mb-4">
                  <p className="text-sm text-gray-300">Compras totales</p>
                  <p className="font-medium text-white">{userData.totalPurchases}</p>
                </div>
              </div>
            </div>

            {/* Información del cliente */}
            <div className="flex-1">
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Nombre completo</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="name"
                      value={userData.name}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-800 rounded-lg">{userData.name}</p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Sobre mí</label>
                  {isEditing ? (
                    <textarea
                      name="bio"
                      value={userData.bio}
                      onChange={handleChange}
                      rows="3"
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-800 rounded-lg">{userData.bio}</p>
                  )}
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Email</label>
                    {isEditing ? (
                      <input
                        type="email"
                        name="email"
                        value={userData.email}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-800 rounded-lg">{userData.email}</p>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-300 mb-1">Teléfono</label>
                    {isEditing ? (
                      <input
                        type="text"
                        name="phone"
                        value={userData.phone}
                        onChange={handleChange}
                        className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                      />
                    ) : (
                      <p className="p-3 bg-gray-800 rounded-lg">{userData.phone}</p>
                    )}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-1">Ubicación</label>
                  {isEditing ? (
                    <input
                      type="text"
                      name="location"
                      value={userData.location}
                      onChange={handleChange}
                      className="w-full p-3 bg-gray-800 border border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500"
                    />
                  ) : (
                    <p className="p-3 bg-gray-800 rounded-lg">{userData.location}</p>
                  )}
                </div>

                <div className="pt-4">
                  <motion.button
                    type="button"
                    onClick={isEditing ? saveChanges : toggleEdit}
                    className="w-full md:w-auto bg-gradient-to-r from-green-500 to-blue-600 text-white py-3 px-8 rounded-lg font-medium hover:opacity-90 transition duration-300"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isEditing ? "Guardar cambios" : "Editar perfil"}
                  </motion.button>
                </div>
              </form>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Modal de éxito */}
      {showModal && (
        <motion.div 
          className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          <motion.div
            className="glass-card rounded-xl p-8 max-w-md w-full text-center"
            initial={{ scale: 0.9 }}
            animate={{ scale: 1 }}
          >
            <div className="mb-6 flex justify-center">
              <motion.div 
                className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center"
                animate={{ rotate: [0, 360], scale: [1, 1.1, 1] }}
                transition={{ duration: 1 }}
              >
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
                </svg>
              </motion.div>
            </div>
            <h3 className="text-2xl font-bold text-white mb-2">¡Cambios guardados!</h3>
            <p className="text-gray-300 mb-6">Tu información se ha actualizado correctamente.</p>
            <motion.button
              onClick={closeModal}
              className="bg-green-600 hover:bg-green-700 text-white py-2 px-6 rounded-lg font-medium transition duration-300"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Continuar
            </motion.button>
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default PerfilCliente;