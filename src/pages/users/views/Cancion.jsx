import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FiSearch, FiHeadphones, FiDownload, FiX, FiFilter } from "react-icons/fi";

// Datos de Canciones
const initialSongs = [
  {
    id: 1,
    title: "Luz de Luna",
    artist: "Indie Soul",
    duration: "3:45",
    price: 0.99,
    releaseDate: "04/07/2025 - 19:47",
    image: "https://cdn-images.dzcdn.net/images/cover/4fcecb51a7eab8370d0c98b471aac088/1900x1900-000000-80-0-0.jpg", // Imagen de ejemplo
    details: {
      genre: "Indie Pop",
      album: "Sueños Nocturnos",
      status: "Disponible",
      quality: "Alta Calidad",
    },
  },
  {
    id: 2,
    title: "Eco en la Montaña",
    artist: "Senderos Desconocidos",
    duration: "4:10",
    price: 1.29,
    releaseDate: "10/06/2025 - 12:00",
    image: "https://cdn-images.dzcdn.net/images/cover/f15cae20b541646a257bc9cbbb67f3cd/0x1900-000000-80-0-0.jpg",
    details: {
      genre: "Folk Acústico",
      album: "Caminos Lejanos",
      status: "Disponible",
      quality: "Alta Calidad",
    },
  },
  {
    id: 3,
    title: "Ritmo Urbano",
    artist: "Beat City",
    duration: "2:58",
    price: 0.89,
    releaseDate: "20/05/2025 - 10:30",
    image: "https://i1.sndcdn.com/artworks-000049400990-wezqge-t500x500.jpg",
    details: {
      genre: "Hip-Hop",
      album: "Vida de Calle",
      status: "Disponible",
      quality: "Estándar",
    },
  },
  {
    id: 4,
    title: "Estrella Fugaz",
    artist: "Cósmicos",
    duration: "3:30",
    price: 1.09,
    releaseDate: "01/07/2025 - 20:00",
    image: "https://i.scdn.co/image/ab67616d00001e02289a226b6c24cb19eeb7a2cd",
    details: {
      genre: "Electrónica",
      album: "Galaxias",
      status: "Próximamente",
      quality: "Alta Calidad",
    },
  },
  {
    id: 5,
    title: "Memorias del Ayer",
    artist: "La Nostalgia",
    duration: "5:00",
    price: 1.49,
    releaseDate: "15/04/2025 - 09:00",
    image: "https://s.songswave.com/album-images/vol1001/207/207685/1377021-big/Don-T-Be-Scared-cover.jpg",
    details: {
      genre: "Balada",
      album: "Recuerdos",
      status: "Disponible",
      quality: "Alta Calidad",
    },
  },
  {
    id: 6,
    title: "Electric Dreams",
    artist: "CyberPunkers",
    duration: "3:15",
    price: 0.99,
    releaseDate: "01/03/2025 - 14:00",
    image: "https://cdn-images.dzcdn.net/images/cover/36d1aa06520e7fc9ce26757a71971d7f/1900x1900-000000-80-0-0.jpg",
    details: {
      genre: "Synthwave",
      album: "Neo City Nights",
      status: "Disponible",
      quality: "Estándar",
    },
  },
  {
    id: 7,
    title: "Melodía Secreta",
    artist: "Músico Anónimo",
    duration: "2:40",
    price: 0.79,
    releaseDate: "25/02/2025 - 11:11",
    image: "https://cdn-images.dzcdn.net/images/cover/e205344f947ecddaf04f2230fc1cb6ad/0x1900-000000-80-0-0.jpg",
    details: {
      genre: "Clásica Moderna",
      album: "Susurros",
      status: "Disponible",
      quality: "Alta Calidad",
    },
  },
  {
    id: 8,
    title: "Amanecer Tropical",
    artist: "Sabor Latino",
    duration: "3:55",
    price: 1.19,
    releaseDate: "05/01/2025 - 08:00",
    image: "https://i.scdn.co/image/ab67616d0000b27379444b7e1f30ee546f05d8eb",
    details: {
      genre: "Salsa",
      album: "Ritmos Calientes",
      status: "Disponible",
      quality: "Estándar",
    },
  },
];

// Artistas para el filtro
const artists = [
  "Indie Soul",
  "Senderos Desconocidos",
  "Beat City",
  "Cósmicos",
  "La Nostalgia",
  "CyberPunkers",
  "Músico Anónimo",
  "Sabor Latino",
];

const SongsStore = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedArtists, setSelectedArtists] = useState([]);
  const [modalDetailsOpen, setModalDetailsOpen] = useState(false);
  const [modalSuccessOpen, setModalSuccessOpen] = useState(false);
  const [selectedSong, setSelectedSong] = useState(null);
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

  const openDetailsModal = (song) => {
    setSelectedSong(song);
    setModalDetailsOpen(true);
  };

  const closeDetailsModal = () => {
    setModalDetailsOpen(false);
    setSelectedSong(null);
  };

  const handleAcquireSong = () => {
    closeDetailsModal();
    setModalSuccessOpen(true);
    setTimeout(() => {
      setModalSuccessOpen(false);
    }, 1500);
  };

  const filteredSongs = initialSongs.filter((song) => {
    const matchesSearch = song.title
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    const matchesArtist =
      selectedArtists.length === 0 || selectedArtists.includes(song.artist);

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
            {/* Search input for mobile sidebar - adjusted mb-8 for more space */}
            <div className="relative mb-8">
              <input
                type="text"
                placeholder="Buscar Canción..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="glass-card bg-transparent border border-gray-700 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
              />
              <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
            </div>

            <h2 className="text-xl font-bold mb-4 text-white">Artista</h2>
            {/* Limited height and added scrollbar for artist list on mobile */}
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
          className="hidden md:block fixed top-16 left-10 md:left-72 h-[calc(100vh-6rem)] w-74 p-4 glass-card m-12 flex-shrink-1 custom-scrollbar overflow-y-auto z-30 pt-10" // Added pt-6 here
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
        >
          {/* Adjusted mb-8 for more space below the search input */}
          <div className="relative mb-8">
            <input
              type="text"
              placeholder="Buscar Canción..."
              value={searchTerm}
              onChange={handleSearchChange}
              className="glass-card bg-transparent border border-gray-500 p-3 pl-10 rounded-lg w-full text-gray-100 placeholder-gray-200 focus:outline-none focus:ring-2 focus:ring-[#00FF8C]"
            />
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
          </div>

          <h2 className="text-xl font-bold mb-4 text-white">Artista</h2>
          {/* Limited height and added scrollbar for artist list on desktop */}
          <div className="space-y-3 max-h-[calc(100vh-20rem)] overflow-y-auto custom-scrollbar"> {/* Adjusted calc value */}
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
      {/* Increased pt-8 for desktop to push content further down */}
      <div className="flex-1 p-4 sm:p-6 md:ml-[calc(18rem+1.5rem)] md:pt-8">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          <AnimatePresence>
            {filteredSongs.length > 0 ? (
              filteredSongs.map((song) => (
                <motion.div
                  key={song.id}
                  className="glass-card p-4 flex flex-col items-center text-center relative overflow-hidden cursor-pointer"
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  layout
                  onClick={() => openDetailsModal(song)}
                >
                  <img
                    src={song.image}
                    alt={song.title}
                    className="w-full h-48 sm:h-56 object-cover mb-4 rounded-lg border border-gray-700"
                  />
                  <h3 className="text-base sm:text-lg font-semibold text-white mb-1 line-clamp-2">
                    {song.title}
                  </h3>
                  <p className="text-gray-400 text-sm mb-2">{song.artist}</p>
                  <p className="text-lg sm:text-xl font-bold text-[#00FF8C] mb-4">
                    ${song.price.toFixed(2)}
                  </p>
                  <motion.button
                    className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-medium sm:font-bold py-2 px-3 sm:py-2 sm:px-4 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                    variants={buttonVariants}
                    whileHover="hover"
                    whileTap="tap"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleAcquireSong();
                    }}
                  >
                    <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
                    Descargar
                  </motion.button>
                </motion.div>
              ))
            ) : (
              <div className="col-span-full text-center py-12">
                <h3 className="text-xl text-gray-300">No se encontraron canciones</h3>
                <p className="text-gray-500">Intenta con otros filtros de búsqueda</p>
              </div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Song details modal */}
      <AnimatePresence>
        {modalDetailsOpen && selectedSong && (
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
                Detalles De La Canción
              </h2>
              <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 mb-6">
                <img
                  src={selectedSong.image}
                  alt={selectedSong.title}
                  className="w-24 h-24 sm:w-32 sm:h-32 object-cover rounded-lg border border-gray-700 flex-shrink-0"
                />
                <div className="space-y-2 sm:space-y-3 text-left w-full">
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">
                      Título:
                    </p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.title}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Artista:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.artist}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Duración:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.duration}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Precio:</p>
                    <p className="text-base sm:text-lg text-white">${selectedSong.price.toFixed(2)}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Fecha de Lanzamiento:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.releaseDate}</p>
                  </div>
                  {/* Nuevos detalles de la canción */}
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Género:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.details.genre}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Álbum:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.details.album}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Estado:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.details.status}</p>
                  </div>
                  <div>
                    <p className="text-xs sm:text-sm font-semibold text-gray-300">Calidad:</p>
                    <p className="text-base sm:text-lg text-white">{selectedSong.details.quality}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-6 gap-4">
                <motion.button
                  onClick={handleAcquireSong}
                  className="bg-gradient-to-r from-lime-500 to-green-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiHeadphones className="group-hover:translate-y-0.5 transition-transform" />
                  Escuchar ahora
                </motion.button>
                <motion.button
                  onClick={handleAcquireSong}
                  className="bg-gradient-to-r from-blue-500 to-cyan-500 text-white font-bold py-2 px-5 sm:py-3 sm:px-6 rounded-full shadow-lg flex items-center justify-center gap-2 group text-sm sm:text-base"
                  variants={buttonVariants}
                  whileHover="hover"
                  whileTap="tap"
                >
                  <FiDownload className="group-hover:translate-y-0.5 transition-transform" />
                  Descargar archivo
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
              <p className="text-base sm:text-lg text-gray-300 mb-6">Canción adquirida/añadida</p>
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

export default SongsStore;