import { useState } from "react";
import {
  FaBars,
  FaTimes,
  FaHome,
  FaUserAlt,
  FaSignOutAlt,
  FaBell,
  FaCompactDisc,
  FaMusic,
  FaTshirt,
  FaShoppingCart
} from "react-icons/fa";
import { GrCatalog } from "react-icons/gr";

const Topbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
    setShowNotification(false);
  };

  const toggleNotification = () => {
    setShowNotification(!showNotification);
    setDropdownOpen(false);
  };

  // Common styles for menu items
  const menuItemClass =
    "flex items-center gap-3 p-3 rounded-xl transition-all duration-300 ease-in-out cursor-pointer group";
  const menuItemHoverClass = "hover:bg-gradient-to-r hover:from-green-500 hover:to-emerald-600 hover:shadow-lg transform hover:scale-105";
  const menuItemIconClass = "transition-colors duration-300 group-hover:text-gray-900 text-green-400";
  const menuItemTextClass = "transition-colors duration-300 group-hover:text-gray-900 font-medium text-gray-200";

  return (
    <div className="flex">
      {/* ========== SIDEBAR ========== */}
      <nav
        className={`fixed top-0 left-0 h-full bg-gradient-to-b from-gray-900 to-black text-white w-64 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-300 ease-in-out md:translate-x-0 md:w-72 shadow-2xl z-40`}
      >
        <div className="p-6">
          {/* Logo */}
          <div className="text-4xl font-extrabold text-green-400 mb-10 flex items-center justify-center border-b border-gray-700 pb-5">
            <span className="tracking-wide">𝕀ℕ𝔻𝕀𝔼ℂ</span>
          </div>

          {/* Menu items */}
          <ul className="space-y-4">
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/dashboard2" className="flex items-center gap-3 w-full">
                <FaHome size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Dashboard</span>
              </a>
            </li>
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/album2" className="flex items-center gap-3 w-full">
                <FaCompactDisc size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Álbum</span>
              </a>
            </li>
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/cancion" className="flex items-center gap-3 w-full">
                <FaMusic size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Canciones</span>
              </a>
            </li>
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/merch" className="flex items-center gap-3 w-full">
                <FaTshirt size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Ropa</span>
              </a>
            </li>
            <li className={`${menuItemClass} ${menuItemHoverClass}`}>
              <a href="/carrito" className="flex items-center gap-3 w-full">
                <FaShoppingCart size={22} className={menuItemIconClass} />
                <span className={menuItemTextClass}>Carrito</span>
              </a>
            </li>
          </ul>
        </div>
      </nav>

      {/* ========== CONTENIDO PRINCIPAL ========== */}
      <div className="flex-1 ml-0 md:ml-72 bg-gray-50">
        {/* Top Bar */}
        <div className="flex justify-between items-center bg-gradient-to-r from-gray-800 to-black text-white shadow-lg p-4 md:p-6 sticky top-0 z-30 border-b border-gray-700">
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="p-2 rounded-full text-white hover:bg-gray-700 focus:outline-none transition-colors duration-200"
              aria-label="Toggle menu"
            >
              {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
            </button>
          </div>
          <div className="flex-grow"></div>

          <div className="flex items-center space-x-4 md:space-x-6">
            {/* Notification Button */}
            <div className="relative">
              <button
                className="p-3 rounded-full bg-gray-700 text-white hover:bg-green-600 focus:outline-none transition-all duration-300 transform hover:scale-110 relative"
                onClick={toggleNotification}
                aria-label="Show notifications"
              >
                <FaBell size={22} />
                <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full transform translate-x-1/2 -translate-y-1/2">
                  3
                </span>
              </button>
              {showNotification && (
                <div className="absolute right-0 mt-3 w-80 bg-white text-gray-800 rounded-lg shadow-xl p-5 text-sm animate-fade-in-down origin-top-right border border-gray-200">
                  <p className="font-bold text-lg mb-3 border-b pb-2 text-gray-900 flex justify-between items-center">
                    Notificaciones
                    <span className="text-gray-500 text-sm">Nuevas (3)</span>
                  </p>
                  <div className="bg-green-50 p-3 rounded-md border border-green-200 flex items-start gap-3 hover:bg-green-100 transition-colors duration-200">
                    <FaShoppingCart className="text-green-600 mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-semibold text-gray-800">
                        ¡Nuevos productos disponibles!
                      </p>
                      <p className="text-gray-600 text-xs">
                        Revisa nuestra nueva colección de merchandising.
                      </p>
                    </div>
                  </div>
                  <a
                    href="/notifications"
                    className="block text-center mt-4 text-green-600 hover:underline font-medium text-sm"
                  >
                    Ver todas las notificaciones
                  </a>
                </div>
              )}
            </div>

            {/* User Dropdown */}
            <div className="relative">
              <div
                className="flex items-center space-x-2 cursor-pointer p-2 rounded-full transition-all duration-300 hover:bg-gray-700 group"
                onClick={toggleDropdown}
              >
                <img
                  className="w-10 h-10 rounded-full border-2 border-green-400 object-cover transform group-hover:scale-110 transition-transform duration-300"
                  src="/musicaa.png"
                  alt="User Avatar"
                />
                <span className="hidden md:block text-gray-300 font-medium group-hover:text-white transition-colors duration-200">
                  Billi
                </span>
                <FaUserAlt
                  size={20}
                  className="text-green-400 hidden md:block group-hover:text-green-300 transition-colors duration-200"
                />
              </div>

              {dropdownOpen && (
                <div className="absolute right-0 mt-3 w-56 bg-white text-gray-800 rounded-lg shadow-xl p-4 text-base animate-fade-in-down origin-top-right border border-gray-200">
                  <div className="flex items-center gap-3 mb-4 pb-3 border-b border-gray-200">
                    <FaUserAlt size={30} className="text-green-500" />
                    <div>
                      <h5 className="font-bold text-lg text-gray-900">Billi</h5>
                      <p className="text-sm text-gray-600">Usuario</p>
                    </div>
                  </div>
                  <ul className="space-y-3">
                    <li className="flex items-center gap-3 hover:bg-gray-100 p-2 rounded-md transition-colors duration-200">
                      <FaUserAlt size={20} className="text-gray-600" />
                      <a
                        href="/perfil2"
                        className="text-gray-800 hover:text-green-600 font-medium w-full"
                      >
                        Perfil
                      </a>
                    </li>
                    <li className="flex items-center gap-3 hover:bg-red-50 p-2 rounded-md transition-colors duration-200">
                      <FaSignOutAlt size={20} className="text-red-500" />
                      <a
                        href="/"
                        className="text-gray-800 hover:text-red-600 w-full font-medium"
                      >
                        Cerrar sesión
                      </a>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Topbar;