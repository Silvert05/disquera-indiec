import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiShoppingCart, FiX, FiFilter } from "react-icons/fi";

// Datos de ejemplo para los álbumes
const initialAlbums = [
  {
    id: 1,
    title: "Roll With The Punchies",
    artist: "Bryan Adams",
    year: 2023,
    genre: "Pop",
    price: 109.26,
    image: "https://i.scdn.co/image/ab67616d0000b27379444b7e1f30ee546f05d8eb",
    details: {
      tracks: 12,
      status: "Disponible",
      quality: "Alta Calidad"
    }
  },
  {
    id: 2,
    title: "El Que Quiera Dormir",
    artist: "Bryan Adams",
    year: 2023,
    genre: "Pop",
    price: 24.42,
    image: "https://cdn-images.dzcdn.net/images/cover/36d1aa06520e7fc9ce26757a71971d7f/1900x1900-000000-80-0-0.jpg",
    details: {
      tracks: 10,
      status: "Disponible",
      quality: "Alta Calidad"
    }
  },
  {
    id: 3,
    title: "No Sta Li",
    artist: "Grupo Pilon",
    year: 2015,
    genre: "Jazz",
    price: 24.42,
    image: "https://i.scdn.co/image/ab67616d00001e02289a226b6c24cb19eeb7a2cd",
    details: {
      tracks: 8,
      status: "Últimas copias",
      quality: "Estándar"
    }
  },
  {
    id: 4,
    title: "Alsa",
    artist: "Niña Coyote Esa Chica",
    year: "Torriado",
    genre: "Clásica",
    price: 14.50,
    image: "https://cdn-images.dzcdn.net/images/cover/f15cae20b541646a257bc9cbbb67f3cd/0x1900-000000-80-0-0.jpg",
    details: {
      tracks: 15,
      status: "Disponible",
      quality: "Alta Calidad"
    }
  },
  {
    id: 5,
    title: "Nosotros",
    artist: "Ago",
    year: 2010,
    genre: "Estadillo",
    price: 2.00,
    image: "https://cdn-images.dzcdn.net/images/cover/4fcecb51a7eab8370d0c98b471aac088/1900x1900-000000-80-0-0.jpg",
    details: {
      tracks: 7,
      status: "Agotado",
      quality: "Estándar"
    }
  },
  {
    id: 6,
    title: "Somberlain",
    artist: "Dissertion",
    year: 2005,
    genre: "Rock",
    price: 17.27,
    image: "https://cdn-images.dzcdn.net/images/cover/e205344f947ecddaf04f2230fc1cb6ad/0x1900-000000-80-0-0.jpg",
    details: {
      tracks: 9,
      status: "Disponible",
      quality: "Alta Calidad"
    }
  },
  {
    id: 7,
    title: "Liberación",
    artist: "Azucena",
    year: 2007,
    genre: "Clásica",
    price: 20.00,
    image: "https://s.songswave.com/album-images/vol1001/207/207685/1377021-big/Don-T-Be-Scared-cover.jpg",
    details: {
      tracks: 12,
      status: "Disponible",
      quality: "Alta Calidad"
    }
  },
  {
    id: 8,
    title: "Scream",
    artist: "Otary Osbourne",
    year: 2004,
    genre: "Rock",
    price: 53.05,
    image: "https://i1.sndcdn.com/artworks-000049400990-wezqge-t500x500.jpg",
    details: {
      tracks: 11,
      status: "Últimas copias",
      quality: "Estándar"
    }
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
  const [isFilterSidebarOpen, setIsFilterSidebarOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
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
            
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Buscar Álbum..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <h2 className="text-xl font-bold mb-4 text-white">Género</h2>
            <div className="space-y-3 max-h-60 overflow-y-auto custom-scrollbar">
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
          className="hidden md:block fixed top-16 left-10 md:left-72 h-[calc(100vh-6rem)] w-74 p-4 glass-card m-12 flex-shrink-1 custom-scrollbar overflow-y-auto z-30 pt-10"
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
        >
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Buscar Álbum..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-500 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Género</h2>
          <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar">
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

          <h2 className="text-xl font-bold mb-4 text-white">Artista</h2>
          <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar">
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
      <div className="flex-1 p-4 sm:p-6 md:ml-[calc(18rem+1.5rem)] md:pt-8">
        <motion.h1 
          className="text-3xl sm:text-4xl font-bold mb-6 text-white"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          Álbumes Disponibles
        </motion.h1>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredAlbums.length > 0 ? (
              filteredAlbums.map((album) => (
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
                    className="w-full h-48 sm:h-56 object-cover mb-4 rounded-lg border border-gray-700"
                  />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
                    {album.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{album.artist}</p>
                  <p className="text-gray-400 text-xs mb-2">{album.year} • {album.genre}</p>
                  <p className="text-lg sm:text-xl font-bold text-[#00FF8C] mb-4">
                    €{album.price.toFixed(2)}
                  </p>
                  <motion.button
                    className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-medium sm:font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
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
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl text-gray-300">No se encontraron álbumes</h3>
                <p className="text-gray-500">Intenta con otros filtros de búsqueda</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Album details modal */}
      <AnimatePresence>
        {modalDetailsOpen && selectedAlbum && (
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
                Detalles Del Álbum
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <img
                  src={selectedAlbum.image}
                  alt={selectedAlbum.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-700 flex-shrink-0"
                />
                <div className="space-y-2 sm:space-y-3 text-left w-full">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">
                      Título:
                    </p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.title}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Artista:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.artist}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Año:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.year}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Género:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.genre}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Precio:</p>
                    <p className="text-base sm:text-lg text-[#00FF8C]">€{selectedAlbum.price.toFixed(2)}</p>
                  </div>
                  {/* Additional album details */}
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Canciones:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.details.tracks}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Estado:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.details.status}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Calidad:</p>
                    <p className="text-base sm:text-lg text-white">{selectedAlbum.details.quality}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6">
                <motion.button
                  onClick={handleAddToCart}
                  className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
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
              <p className="text-base sm:text-lg text-gray-300 mb-6">Álbum añadido a tu carrito</p>
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

export default AlbumStore;