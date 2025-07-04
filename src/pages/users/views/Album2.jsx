import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiShoppingCart, FiMusic, FiX } from "react-icons/fi";
import AOS from 'aos';
import 'aos/dist/aos.css';

// Datos de ejemplo para los álbumes (adaptados de tu imagen)
const initialAlbums = [
  {
    id: 1,
    title: "Roll With The Punchies",
    artist: "Bryan Adams",
    year: 2023,
    genre: "Pop",
    price: 109.26,
    image: "https://via.placeholder.com/200x200/333333/FFFFFF?text=Roll+With+The+Punchies"
  },
  {
    id: 2,
    title: "El Que Quiera Dormir",
    artist: "Bryan Adams",
    year: 2023,
    genre: "Pop",
    price: 24.42,
    image: "https://via.placeholder.com/200x200/444444/FFFFFF?text=El+Que+Quiera+Dormir"
  },
  {
    id: 3,
    title: "No Sta Li",
    artist: "Grupo Pilon",
    year: 2015,
    genre: "Jazz",
    price: 24.42,
    image: "https://via.placeholder.com/200x200/555555/FFFFFF?text=No+Sta+Li"
  },
  {
    id: 4,
    title: "Alsa",
    artist: "Niña Coyote Esa Chica",
    year: "Torriado",
    genre: "Clásica",
    price: 14.50,
    image: "https://via.placeholder.com/200x200/666666/FFFFFF?text=Alsa"
  },
  {
    id: 5,
    title: "Nosotros",
    artist: "Ago",
    year: 2010,
    genre: "Estadillo",
    price: 2.00,
    image: "https://via.placeholder.com/200x200/777777/FFFFFF?text=Nosotros"
  },
  {
    id: 6,
    title: "Somberlain",
    artist: "Dissertion",
    year: 2005,
    genre: "Rock",
    price: 17.27,
    image: "https://via.placeholder.com/200x200/888888/FFFFFF?text=Somberlain"
  },
  {
    id: 7,
    title: "Liberación",
    artist: "Azucena",
    year: 2007,
    genre: "Clásica",
    price: 20.00,
    image: "https://via.placeholder.com/200x200/999999/FFFFFF?text=Liberación"
  },
  {
    id: 8,
    title: "Scream",
    artist: "Otary Osbourne",
    year: 2004,
    genre: "Rock",
    price: 53.05,
    image: "https://via.placeholder.com/200x200/AAAAAA/FFFFFF?text=Scream"
  }
];

const genres = ["Pop", "Jazz", "Clásica", "Rock", "Estadillo"];
const artists = [...new Set(initialAlbums.map(album => album.artist))];

const AlbumStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [selectedAlbum, setSelectedAlbum] = useState(null);

  useEffect(() => {
    AOS.init({
      once: true,
    });
  }, []);

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleGenreFilterChange = (genre) => {
    setSelectedGenres((prev) =>
      prev.includes(genre)
        ? prev.filter((g) => g !== genre)
        : [...prev, genre]
    );
  };

  const handleArtistFilterChange = (artist) => {
    setSelectedArtists((prev) =>
      prev.includes(artist)
        ? prev.filter((a) => a !== artist)
        : [...prev, artist]
    );
  };

  const openDetailsModal = (album) => {
    setSelectedAlbum(album);
    setModalDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setModalDetailsOpen(false);
    setSelectedAlbum(null);
  };

  const handleAddToCart = () => {
    closeDetailsModal();
    setModalSuccessOpen(true);
    setTimeout(() => {
      setModalSuccessOpen(false);
    }, 1500);
  };

  const filteredAlbums = initialAlbums.filter((album) => {
    const matchesSearch = album.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesGenre = selectedGenres.length === 0 || selectedGenres.includes(album.genre);
    const matchesArtist = selectedArtists.length === 0 || selectedArtists.includes(album.artist);
    
    return matchesSearch && matchesGenre && matchesArtist;
  });

  // Variantes de animación (consistentes con el componente MerchStore)
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
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 150, damping: 12 } },
    exit: { scale: 0.8, opacity: 0, transition: { duration: 0.2 } },
  };

  return (
    <div 
      className="flex bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen relative overflow-hidden"
      data-aos="fade-down" // Aquí se añade la animación a la div principal
      data-aos-easing="linear"
      data-aos-duration="1500"
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

      <div className="relative z-10 flex w-full">
        {/* Sidebar de filtros */}
        <motion.div
          className="w-64 p-6 glass-card m-6 flex-shrink-0 custom-scrollbar overflow-y-auto max-h-[calc(100vh-48px)]"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="relative mb-6">
            <input
              type="text"
              placeholder="Buscar Álbum..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiMusic className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <h2 className="text-2xl font-bold mb-4 text-white">Género</h2>
          <div className="space-y-2 mb-6">
            {genres.map((genre) => (
              <motion.label
                key={genre}
                className="flex items-center text-gray-300 cursor-pointer"
                whileHover={{ x: 5, color: "#00FF8C" }}
                transition={{ duration: 0.1 }}
              >
                <input
                  type="checkbox"
                  checked={selectedGenres.includes(genre)}
                  onChange={() => handleGenreFilterChange(genre)}
                  className="form-checkbox h-5 w-5 text-[#00FF8C] bg-gray-700 border-gray-600 rounded focus:ring-[#00FF8C] mr-2"
                />
                {genre}
              </motion.label>
            ))}
          </div>

          <h2 className="text-2xl font-bold mb-4 text-white">Artista</h2>
          <div className="space-y-2">
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

        {/* Contenido principal */}
        <div className="flex-1 p-8">
          <motion.h1 
            className="text-4xl font-bold mb-8 text-white"
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Álbumes Disponibles
          </motion.h1>

          {/* Grid de álbumes */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 custom-scrollbar overflow-y-auto max-h-[calc(100vh-180px)] pr-2"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <AnimatePresence>
              {filteredAlbums.map((album) => (
                <motion.div
                  key={album.id}
                  className="glass-card p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  onClick={() => openDetailsModal(album)}
                >
                  <img
                    src={album.image}
                    alt={album.title}
                    className="w-full h-40 object-cover mb-4 rounded-lg border border-gray-700"
                  />
                  <h3 className="text-lg font-semibold text-white mb-1">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-1">{album.artist}</p>
                  <p className="text-gray-400 text-xs mb-2">{album.year} • {album.genre}</p>
                  <p className="text-xl font-bold text-[#00FF8C] mb-4">
                    €{album.price.toFixed(2)}
                  </p>
                  <motion.button
                    className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-2 px-4 rounded-full shadow-lg flex items-center justify-center gap-2 group"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAddToCart();
                    }}
                  >
                    <FiShoppingCart className="group-hover:translate-y-0.5 transition-transform" />
                    Añadir al carrito
                  </motion.button>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>

      {/* Modal de Detalles del Álbum */}
      <AnimatePresence>
        {modalDetailsOpen && selectedAlbum && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white border-opacity-20 relative">
              <button
                onClick={closeDetailsModal}
                className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
              >
                <FiX size={24} />
              </button>
              <h2 className="text-3xl font-bold mb-6 text-white text-center">
                Detalles del Álbum
              </h2>
              <div className="flex flex-col md:flex-row items-center gap-6 mb-6">
                <img
                  src={selectedAlbum.image}
                  alt={selectedAlbum.title}
                  className="w-32 h-32 object-cover rounded-lg border border-gray-700 flex-shrink-0"
                />
                <div className="space-y-3 text-left w-full">
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Título:</p>
                    <p className="text-lg text-white">{selectedAlbum.title}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Artista:</p>
                    <p className="text-lg text-white">{selectedAlbum.artist}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Año:</p>
                    <p className="text-lg text-white">{selectedAlbum.year}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Género:</p>
                    <p className="text-lg text-white">{selectedAlbum.genre}</p>
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-300">Precio:</p>
                    <p className="text-xl font-bold text-[#00FF8C]">
                      €{selectedAlbum.price.toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-3 px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiShoppingCart className="group-hover:translate-y-0.5 transition-transform" />
                  Añadir al carrito
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Éxito al Adquirir */}
      <AnimatePresence>
        {modalSuccessOpen && (
          <motion.div
            className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50 p-4"
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={modalVariants}
          >
            <div className="glass-card p-8 rounded-2xl shadow-2xl w-full max-w-sm text-center border border-white border-opacity-20">
              <div className="w-20 h-20 rounded-full bg-green-500 flex items-center justify-center mx-auto mb-4">
                <svg
                  className="w-12 h-12 text-white"
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
              <h2 className="text-3xl font-bold mb-2 text-white">¡Éxito!</h2>
              <p className="text-lg text-gray-300 mb-6">Álbum añadido a tu carrito</p>
              <motion.button
                onClick={() => setModalSuccessOpen(false)}
                className="bg-gradient-to-r from-purple-600 to-purple-700 text-white font-bold py-3 px-6 rounded-full shadow-lg"
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

export default AlbumStore;