import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiX, FiFilter } from "react-icons/fi";

// Datos de productos
const initialProducts = [
  {
    id: 1,
    name: "Camisa Negra Con Diseño",
    artist: "Ago",
    price: 21.39,
    image: "https://i.etsystatic.com/9923777/r/il/cc5930/3101976038/il_570xN.3101976038_j5gb.jpg",
    details: {
      size: "L",
      color: "Negro",
      status: "Disponible",
      material: "Algodón",
    },
  },
  {
    id: 2,
    name: "Parche para abrigo de la Banda Liberty",
    artist: "Banda Liberty",
    price: 18.45,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTV5bSl36522nVt4fFc_jqmdsWGn51nMI3M-w&s",
    details: {
      size: "Única",
      color: "Multicolor",
      status: "Disponible",
      material: "Tela",
    },
  },
  {
    id: 3,
    name: "Hoodie de color negro con el estampado de la banda The Rock",
    artist: "The Rock",
    price: 19.45,
    image: "https://img.joomcdn.net/3f66adf53ef47353c13b2ec8c57efc0210159d9a_original.jpeg",
    details: {
      size: "M",
      color: "Negro",
      status: "Disponible",
      material: "Poliéster",
    },
  },
  {
    id: 4,
    name: "Taza De La Banda Metallica",
    artist: "Metallica",
    price: 12.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRYJqm5jlU6uBJt-mETtRADh4oAAkYHfGnqBA&s",
    details: {
      size: "Estándar",
      color: "Negro",
      status: "Disponible",
      material: "Cerámica",
    },
  },
  {
    id: 5,
    name: "Mochila pequeña de Pink Floyd",
    artist: "Pink Floyd",
    price: 23.84,
    image: "https://http2.mlstatic.com/D_650478-MLM70642867549_072023-O.jpg",
    details: {
      size: "Pequeña",
      color: "Rosa y Negro",
      status: "Disponible",
      material: "Nylon",
    },
  },
  {
    id: 6,
    name: "Pulseras de Los BTS con sus firmas",
    artist: "BTS",
    price: 28.24,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTDpUZAsfCaatqg-eB8TYLthpFCdYlnhYlmsQ&s",
    details: {
      size: "Única",
      color: "Variados",
      status: "Disponible",
      material: "Silicón",
    },
  },
  {
    id: 7,
    name: "Álbum Firmado por la Artista Dua Lipa",
    artist: "Dua Lipa",
    price: 21.39,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7PMPnz0h6xfZuyzsDEs81ZSPj65qFgzWOFA&s",
    details: {
      size: "CD",
      color: "N/A",
      status: "Disponible",
      material: "Papel, Plástico",
    },
  },
  {
    id: 8,
    name: "Skate Firmado por la banda The Sleeping",
    artist: "The Sleeping",
    price: 33.45,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEarlr7qfkdNzJcRFGOeD_ep3yPxWRnMXkQzj9HQvYO2yQ0NNBA-U5Zy9iVvPNBTQPkKM&usqp=CAU",
    details: {
      size: "Estándar",
      color: "Negro",
      status: "Disponible",
      material: "Madera de Arce",
    },
  },
  {
    id: 9,
    name: "Poster Gigante de Bryan Adams",
    artist: "Bryan Adams",
    price: 15.00,
    image: "https://i.ebayimg.com/images/g/S8MAAOSw-jhUBAR0/s-l1200.jpg",
    details: {
      size: "A1",
      color: "Color",
      status: "Disponible",
      material: "Papel",
    },
  },
  {
    id: 10,
    name: "Vaso Coleccionable Tornado",
    artist: "Tornado",
    price: 9.99,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTgRwdY17aP9vzQYFvigobxhlcvx-V8t-r3Cg&s",
    details: {
      size: "Única",
      color: "Transparente",
      status: "Disponible",
      material: "Cristal",
    },
  },
  {
    id: 11,
    name: "Libreta de Azuzena",
    artist: "Azuzena",
    price: 7.50,
    image: "https://m.media-amazon.com/images/I/71Hgdo8NI9L.jpg",
    details: {
      size: "A5",
      color: "Rosa",
      status: "Disponible",
      material: "Papel",
    },
  },
  {
    id: 12,
    name: "Púas de guitarra Gerardo",
    artist: "Gerardo",
    price: 5.00,
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTntAcANwjMWmPJ1VKBHPvS0rQSZxYp3UUloA&s",
    details: {
      size: "Variado",
      color: "Negro, Blanco",
      status: "Disponible",
      material: "Plástico",
    },
  },
];

const artists = [
  "Bryan Adams",
  "Tornado",
  "Ago",
  "Azuzena",
  "Gerardo",
  "Paulo Londra",
  "Banda Liberty",
  "The Rock",
  "Metallica",
  "Pink Floyd",
  "BTS",
  "Dua Lipa",
  "The Sleeping",
];

const MerchStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
      // Cerrar el sidebar de filtros si la pantalla es grande
      if (window.innerWidth >= 768) {
        setIsFilterSidebarOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleArtistFilterChange = (artist) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.filter((a) => a !== artist)
        : [...prev, artist]
    );
  };

  const openDetailsModal = (product) => {
    setSelectedProduct(product);
    setModalDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setModalDetailsOpen(false);
    setSelectedProduct(null);
  };

  const handleAcquireProduct = () => {
    closeDetailsModal();
    setModalSuccessOpen(true);
    setTimeout(() => {
      setModalSuccessOpen(false);
    }, 1500);
  };

  const filteredProducts = initialProducts.filter((product) => {
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesArtist =
      selectedArtists.length === 0 || selectedArtists.includes(product.artist);

    return matchesSearch && matchesArtist;
  });

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
        stiffness: 100,
        damping: 10,
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

  const modalVariants = {
    hidden: { scale: 0.8, opacity: 0 },
    visible: {
      scale: 1,
      opacity: 1,
      transition: { type: "spring", stiffness: 150, damping: 12 },
    },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  };

  const filterSidebarVariants = {
    hidden: { x: "-100%" },
    visible: { x: "0%", transition: { type: "spring", stiffness: 120, damping: 14 } },
    exit: { x: "-100%", transition: { duration: 0.3 } },
  };

  return (
    <div className="flex flex-col bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen relative overflow-hidden pt-16 md:ml-72">
      {/* Background Animated Gradient */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `
            radial-gradient(circle at top left, #39FF14 0%, transparent 30%),
            radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)
          `,
          backgroundSize: "200% 200%",
          animation: "bg-pan 20s ease infinite",
        }}
      ></div>

      <style jsx global>{`
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
          background: rgba(255, 255, 255, 0.05);
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #00ff8c;
          border-radius: 10px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #39ff14;
        }
      `}</style>

      {/* Filter button for mobile/tablet */}
      {windowWidth < 768 && (
        <div className="fixed top-20 right-4 z-40">
          <motion.button
            onClick={() => setIsFilterSidebarOpen(!isFilterSidebarOpen)}
            className="bg-[#00FF8C] text-gray-900 p-3 rounded-full shadow-lg"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <FiFilter size={24} />
          </motion.button>
        </div>
      )}

      {/* Filter sidebar for mobile */}
      <AnimatePresence>
        {isFilterSidebarOpen && windowWidth < 768 && (
          <motion.div
            className="fixed top-0 left-0 h-screen w-full max-w-xs bg-gray-950 p-6 z-50 overflow-y-auto custom-scrollbar"
            variants={filterSidebarVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="flex justify-between items-center mb-6 pt-4">
              <h2 className="text-2xl font-bold text-white">Filtros</h2>
              <button
                onClick={() => setIsFilterSidebarOpen(false)}
                className="text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={28} />
              </button>
            </div>
            <div className="relative mb-6">
              <input
                type="text"
                placeholder="Buscar Producto..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <h2 className="text-xl font-bold mb-4 text-white">Artista</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
              {artists.map((artist) => (
                <motion.label
                  key={artist}
                  className="flex items-center text-gray-300 cursor-pointer"
                  whileHover={{ x: 5, color: "#00FF8C" }}
                  transition={{ duration: 0.1 }}
                >
                  <input
                    type="checkbox"
                    checked={selectedArtists.includes(artist)}
                    onChange={() => handleArtistFilterChange(artist)}
                    className="form-checkbox h-5 w-5 text-[#00FF8C] bg-gray-700 border-gray-600 rounded focus:ring-[#00FF8C] mr-2"
                  />
                  {artist}
                </motion.label>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter sidebar for desktop */}
      {windowWidth >= 768 && (
        <motion.div
          className="hidden md:block fixed top-16 left-0 md:left-72 h-[calc(100vh-4rem)] w-72 p-6 glass-card m-6 flex-shrink-0 custom-scrollbar overflow-y-auto z-30"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar Producto..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Artista</h2>
          <div className="space-y-3 max-h-[calc(100vh-18rem)] overflow-y-auto custom-scrollbar">
            {artists.map((artist) => (
              <motion.label
                key={artist}
                className="flex items-center text-gray-300 cursor-pointer"
                whileHover={{ x: 5, color: "#00FF8C" }}
                transition={{ duration: 0.1 }}
              >
                <input
                  type="checkbox"
                  checked={selectedArtists.includes(artist)}
                  onChange={() => handleArtistFilterChange(artist)}
                  className="form-checkbox h-5 w-5 text-[#00FF8C] bg-gray-700 border-gray-600 rounded focus:ring-[#00FF8C] mr-2"
                />
                {artist}
              </motion.label>
            ))}
          </div>
        </motion.div>
      )}

      {/* Main content */}
      <div className="flex-1 p-4 sm:p-6 md:ml-[calc(18rem+1.5rem)]">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <motion.div
                  key={product.id}
                  className="glass-card p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  onClick={() => openDetailsModal(product)}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    className="w-full h-48 sm:h-56 object-cover mb-4 rounded-lg border border-gray-700"
                  />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
                    {product.name}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{product.artist}</p>
                  <p className="text-lg sm:text-xl font-bold text-[#00FF8C] mb-4">
                    ${product.price.toFixed(2)}
                  </p>
                  <motion.button
                    className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-medium sm:font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcquireProduct();
                    }}
                  >
                    <FiShoppingCart className="group-hover:translate-y-0.5 transition-transform" />
                    Añadir al carrito
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl text-gray-300">No se encontraron productos</h3>
                <p className="text-gray-500">Intenta con otros filtros de búsqueda</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Product details modal */}
      <AnimatePresence>
        {modalDetailsOpen && selectedProduct && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20 relative">
              <button
                onClick={closeDetailsModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-white text-center">
                Detalles Del Producto
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <img
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-700 flex-shrink-0"
                />
                <div className="space-y-2 sm:space-y-3 text-left w-full">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">
                      Nombre del producto:
                    </p>
                    <p className="text-base sm:text-lg text-white">{selectedProduct.name}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Talla:</p>
                    <p className="text-base sm:text-lg text-white">{selectedProduct.details.size}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Color:</p>
                    <p className="text-base sm:text-lg text-white">{selectedProduct.details.color}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Estado:</p>
                    <p className="text-base sm:text-lg text-white">{selectedProduct.details.status}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Material:</p>
                    <p className="text-base sm:text-lg text-white">{selectedProduct.details.material}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={handleAcquireProduct}
                  className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiShoppingCart className="group-hover:translate-y-0.5 transition-transform" />
                  Adquirir
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Success modal */}
      <AnimatePresence>
        {modalSuccessOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="glass-card p-6 sm:p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white border-opacity-20">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-8 h-8 sm:w-12 sm:h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold mb-2 text-white">¡Éxito!</h2>
              <p className="text-base sm:text-lg text-gray-300 mb-6">Artículo añadido a tu carrito</p>
              <motion.button
                onClick={() => setModalSuccessOpen(false)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg text-sm sm:text-base"
                variants={buttonVariants}
                whileHover="hover"
                whileTap="tap"
              >
                Ok
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default MerchStore;