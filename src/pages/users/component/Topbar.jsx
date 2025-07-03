// Importación de React y hooks necesarios
import { useState } from "react";

// Importación de íconos específicos de librerías
import {
  FaBars, // Ícono de hamburguesa para menú móvil
  FaTimes, // Ícono de "X" para cerrar menú
  FaHome, // Ícono de hogar para dashboard
  FaUserAlt, // Ícono de usuario para perfil
  FaSignOutAlt, // Ícono de salida para cerrar sesión
  FaShoppingCart, // Ícono de carrito de compras
} from "react-icons/fa";
import { GrCatalog } from "react-icons/gr"; // Ícono de catálogo

const Topbar = () => {
  // Estados para controlar componentes dinámicos:
  const [isOpen, setIsOpen] = useState(false); // Controla visibilidad del sidebar en móvil
  const [showNotification, setShowNotification] = useState(false); // Muestra/oculta notificaciones
  const [dropdownOpen, setDropdownOpen] = useState(false); // Controla dropdown del perfil de usuario

  // Función para alternar sidebar en vista móvil
  const toggleMenu = () => {
    setIsOpen(!isOpen); // Cambia estado contrario al actual
  };

  // Función para alternar dropdown del perfil
  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen); // Invierte el estado actual
  };

  return (
    <div className="flex">
      {/* ========== SIDEBAR ========== */}
      <nav
        className={`fixed top-0 left-0 h-full bg-black text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full" // Animación de desplazamiento lateral
        } transition-transform md:translate-x-0 md:w-72 z-50`} // Responsive: visible en desktop
      >
        <div className="p-4">
          {/* Logo con estilo especial Unicode */}
          <div className="text-3xl font-bold text-green-500 mb-8">𝕀ℕ𝔻𝕀𝔼ℂ</div>

          {/* Lista de opciones del menú */}
          <ul className="space-y-6">
            {/* Item Dashboard */}
            <li className="hover:bg-green-500 p-3 rounded-md transition-colors duration-300">
              <a href="/dashboard2" className="flex items-center gap-3">
                <FaHome size={20} /> {/* Ícono */}
                Dashboard {/* Texto del enlace */}
              </a>
            </li>

            {/* Item Catálogo */}
            <li className="hover:bg-green-500 p-3 rounded-md transition-colors duration-300">
              <a href="/Catalogo" className="flex items-center gap-3">
                <GrCatalog size={20} /> {/* Ícono */}
                Catalogo {/* Texto del enlace */}
              </a>
            </li>

            {/* Item Compras */}
            <li className="hover:bg-green-500 p-3 rounded-md transition-colors duration-300">
              <a href="/Compras" className="flex items-center gap-3">
                <FaShoppingCart size={20} /> {/* Ícono */}
                Compras {/* Texto del enlace */}
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <div className="flex-1 ml-0 md:ml-72 bg-gradient-to-r from-green-500">
        {/* Barra superior con gradiente de color */}
        <div className="flex justify-between items-center bg-gradient-to-r from-black to-green-500 shadow-md p-4">
          <div></div> {/* Espaciador para alinear elementos a la derecha */}

          {/* Contenedor de elementos del lado derecho */}
          <div className="flex items-center space-x-4 md:flex-row flex-col">
            {/* ===== DROPDOWN DE USUARIO ===== */}
            <div className="relative">
              {/* Botón que activa el dropdown */}
              <div
                className="flex items-center space-x-2 cursor-pointer"
                onClick={toggleDropdown} // Evento click para mostrar/ocultar
              >
                {/* Avatar del usuario con efecto hover */}
                <img
                  className="w-10 h-10 rounded-full border-2 border-gray-300 hover:bg-gradient-to-r hover:from-green-500 hover:to-black hover:shadow-lg transition-all duration-300"
                  style={{
                    backgroundImage: "url('/musicaa.png')", // Imagen de fondo
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover",
                  }}
                />
              </div>

              {/* Menú desplegable */}
              {dropdownOpen && ( // Render condicional basado en el estado
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg p-4 text-sm">
                  <ul className="space-y-2">
                    {/* Nombre de usuario */}
                    <h5 className="font-bold">Billi</h5>
                    
                    {/* Opción Perfil */}
                    <li className="flex items-center gap-2 hover:text-green-500 transition-colors">
                      <FaUserAlt size={16} className="text-gray-600" />
                      <a href="/perfil2" className="text-gray-800">
                        Perfil
                      </a>
                    </li>

                    {/* Opción Cerrar Sesión */}
                    <li className="flex items-center gap-2 hover:text-green-500 transition-colors">
                      <FaSignOutAlt size={16} className="text-gray-600" />
                      <a href="/" className="text-gray-800">
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>

            {/* ===== NOTIFICACIONES ===== */}
            <div className="relative md:mb-0 mb-2">
              {/* Botón de notificaciones */}
              <button
                className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none transition-colors duration-200"
                onClick={() => setShowNotification(!showNotification)} // Toggle estado
              >
                🔔 {/* Emoji de campana */}
              </button>

              {/* Panel de notificaciones */}
              {showNotification && (
                <div className="absolute right-0 mt-2 w-64 bg-white rounded-md shadow-lg p-4 text-sm">
                  <p className="font-bold mb-2">Notificaciones</p>
                  <div className="bg-gray-100 p-3 rounded-md">
                    Tienes nuevos eventos listos para ti 🎉
                  </div>
                </div>
              )}
            </div>

            {/* ===== BOTÓN MENÚ MÓVIL ===== */}
            <button
              onClick={toggleMenu} // Alternar visibilidad del sidebar
              className="bg-gray-200 p-2 rounded-full hover:bg-gray-300 focus:outline-none md:hidden transition-colors duration-200"
            >
              {/* Ícono dinámico (menú/cerrar) */}
              {isOpen ? (
                <FaTimes size={24} className="text-gray-700" />
              ) : (
                <FaBars size={24} className="text-gray-700" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar; // Exportación del componente