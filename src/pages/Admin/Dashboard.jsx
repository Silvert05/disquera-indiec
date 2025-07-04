import { motion } from "framer-motion";
import { Line, Doughnut } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
} from "chart.js";
import Calendar from "react-calendar";
import "react-calendar/dist/Calendar.css";
import { useState, useRef, useEffect } from "react";
import {
  FaPlay,
  FaPause,
  FaMusic,
  FaCalendarAlt,
  FaBell,
  FaChartBar,
  FaArrowRight,
  FaChevronLeft,
  FaChevronRight,
  FaVolumeUp,
  FaForward,
  FaBackward,
  FaUserCircle, // Added for profile/artist
  FaPlus, // For add button
} from "react-icons/fa";

// Importaciones de AOS (Animate On Scroll)
import AOS from 'aos';
import 'aos/dist/aos.css';

// Register necessary Chart.js elements
ChartJS.register(
  ArcElement,
  Tooltip,
  Legend,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title
);

const AuraFlowDashboard = () => {
  const [hoveredSong, setHoveredSong] = useState(null);
  const [currentPlayingSong, setCurrentPlayingSong] = useState(null);
  const scrollRef = useRef(null);
  const audioRef = useRef(null); // Ref for audio element

  // Inicializa AOS cuando el componente se monta
  useEffect(() => {
    AOS.init({
      duration: 1000, // Duración predeterminada si no se especifica en data-aos-duration
      once: false,    // La animación se reproducirá cada vez que el elemento entre en la vista
    });
  }, []); // El array vacío asegura que se ejecute solo una vez al montar

  // Dummy Data
  const statsData = {
    PistasTotales: "12,345",
   ArtistasActivos: "876",
    PróximosEventos: "14",
    ReproduccionesTotales : "2,100",
  };

  const salesData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Reproducciones Mensuales",
        data: [65, 59, 80, 81, 56, 75],
        fill: true,
        // CAMBIO DE COLOR: Fondo del área del gráfico (verde suave)
        backgroundColor: "rgba(0, 255, 140, 0.15)", // Verde esmeralda con opacidad
        // CAMBIO DE COLOR: Borde de la línea del gráfico (verde vibrante)
        borderColor: "#00FF8C", // Verde Eléctrico
        tension: 0.4,
        // CAMBIO DE COLOR: Puntos del gráfico (verde vibrante)
        pointBackgroundColor: "#00FF8C",
        // CAMBIO DE COLOR: Borde de los puntos (fondo oscuro)
        pointBorderColor: "#1A1A1A",
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 8,
      },
    ],
  };

  const genreData = {
    labels: ["Pop", "Rock", "Electrónica", "Hip Hop", "Clásica"],
    datasets: [
      {
        data: [30, 20, 25, 15, 10],
        // CAMBIO DE COLOR: Colores de los segmentos del gráfico de dona
        backgroundColor: [
          "#00FF8C", // Verde Eléctrico
          "#39FF14", // Verde Neón
          "#6BFF6B", // Verde Claro
          "#9EFF9E", // Verde Pastel
          "#C9FFC9", // Verde Muy Claro
        ],
        // CAMBIO DE COLOR: Borde de los segmentos (transparente oscuro)
        borderColor: "rgba(0,0,0,0.2)",
        borderWidth: 2,
      },
    ],
  };

  // --- URLs de imágenes actualizadas ---
  const upcomingEvents = [
    {
      id: 1,
      name: "Festival Primavera Sound",
      date: "20 Julio, 2025",
      location: "Parque Central",
      image: "https://assets.primaverasound.com/psweb/3cwud8emcxrp83j5kdno_1725533172896.png", // Esta ya es una URL externa
    },
    {
      id: 2,
      name: "Concierto Beneficio: Voces Unidas",
      date: "15 Agosto, 2025",
      location: "Auditorio Municipal",
      image: "https://boletos.casadelamusica.ec/wp-content/uploads/2024/08/6-BoletosWeb-1-3.png", // URL de ejemplo
    },
    {
      id: 3,
      name: "Noche de Jazz en Vivo",
      date: "01 Septiembre, 2025",
      location: "Club Jazz & Blues",
      image: "https://d1csarkz8obe9u.cloudfront.net/posterpreviews/jazz-night-flyer-template-design-de270da6f93bb0d4cab657f9572a765f_screen.jpg?ts=1636991643", // URL de ejemplo
    },
    {
      id: 4,
      name: "Conferencia de Música Digital",
      date: "10 Octubre, 2025",
      location: "Centro de Convenciones",
      image: "https://images.squarespace-cdn.com/content/5477b6e0e4b07ec2525f51b0/1696282235512-M8ULVIKVUP8GZXBLZY7Z/17ProgramacionConferenciaKansas.png?content-type=image%2Fpng", // URL de ejemplo
    },
  ];

  const newReleases = [
    {
      id: 1,
      name: "Eternal Echoes",
      artist: "Luna Sol",
      image: "https://images-platform.99static.com/nXIPds9ZFuk1VYJB4kAQF68e1s0=/0x0:1492x1492/500x500/top/smart/99designs-contests-attachments/95/95064/attachment_95064795", // URL de ejemplo
      audio: "https://drive.google.com/uc?export=download&id=12Fy5tGzdYOXk5Q9cQZQL-dRR2OjYjlyW",
    },
    {
      id: 2,
      name: "City Lights",
      artist: "Urban Flow",
      image: "https://i.pinimg.com/236x/ec/10/93/ec1093ed64d4e7fba3454fc0b6ec9627.jpg", // URL de ejemplo
      audio: "https://drive.google.com/uc?export=download&id=12Fy5tGzdYOXk5Q9cQZQL-dRR2OjYjlyW",
    },
    {
      id: 3,
      name: "Whispering Pines",
      artist: "Forest Spirit",
      image: "https://i.pinimg.com/236x/2e/7a/41/2e7a41a1d8414ef0aa260634e339fd4c.jpg", // URL de ejemplo
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-3.mp3",
    },
    {
      id: 4,
      name: "Cosmic Journey",
      artist: "Stardust Collective",
      image: "https://img.freepik.com/vector-gratis/plantilla-portada-album-degradado_23-2150597431.jpg?semt=ais_hybrid&w=740", // URL de ejemplo
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-4.mp3",
    },
    {
      id: 5,
      name: "Rhythm of the Heart",
      artist: "Soulful Groove",
      image: "https://img.freepik.com/vector-premium/diseno-vectorial-portadas-albumes-artistas-musica-retro-mediados-siglo_238613-257.jpg", // URL de ejemplo
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-5.mp3",
    },
    {
      id: 6,
      name: "Neon Dreams",
      artist: "Synthwave Collective",
      image: "https://img.freepik.com/vector-gratis/plantilla-portada-album-degradado_52683-124660.jpg?semt=ais_hybrid&w=740", // URL de ejemplo
      audio: "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-6.mp3",
    },
  ];
  // --- FIN URLs de imágenes ---

  useEffect(() => {
    if (audioRef.current) {
      if (currentPlayingSong) {
        audioRef.current.src = currentPlayingSong.audio;
        audioRef.current.play();
      } else {
        audioRef.current.pause();
        audioRef.current.currentTime = 0;
      }
    }
  }, [currentPlayingSong]);

  const togglePlayPause = (song) => {
    if (currentPlayingSong?.id === song.id) {
      setCurrentPlayingSong(null); // Pause if same song
    } else {
      setCurrentPlayingSong(song); // Play new song
    }
  };

  const scrollHorizontally = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = direction === "left" ? -350 : 350;
      scrollRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  // Framer Motion Variants for staggered appearance and hover effects
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
      scale: 1.05,
      // CAMBIO DE COLOR: Sombra de brillo en hover (verde)
      boxShadow: "0 10px 30px rgba(0, 255, 140, 0.3)", // Verde esmeralda con opacidad
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.98 },
  };

  const heroButtonVariants = {
    hover: {
      scale: 1.08,
      // CAMBIO DE COLOR: Sombra de botón hero en hover (verde)
      boxShadow: "0 0 25px rgba(0, 255, 140, 0.7)",
      textShadow: "0 0 10px rgba(255,255,255,0.8)",
      transition: { duration: 0.3 },
    },
    tap: { scale: 0.95 },
  };

  return (
    // CAMBIO DE COLOR: Fondo principal del dashboard (degradado de grises/negros)
    // Se agregó la animación AOS: fade-down con easing linear y duration 1500
    <motion.div
      transition={{ duration: 1.0, ease: "easeOut" }}
      className="flex-1 md:ml-72 bg-gradient-to-br from-gray-950 via-black to-gray-900 text-gray-100 min-h-screen p-8 relative overflow-hidden"
      data-aos="fade-down"
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      {/* Background Animated Gradient (Conceptual - requires more advanced CSS/JS) */}
      {/* CAMBIO DE COLOR: Gradiente animado de fondo (verdes/negros) */}
      <div className="absolute inset-0 z-0 opacity-40" style={{
        background: `radial-gradient(circle at top left, #39FF14 0%, transparent 30%), 
                     radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
        backgroundSize: '200% 200%',
        animation: 'bg-pan 20s ease infinite'
      }}></div>

      {/* Tailwind CSS for bg-pan animation, glassmorphism, and custom scrollbar */}
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
        /* Calendar specific styling for dark glassmorphism */
        .calendar-auraflow {
            background-color: rgba(255, 255, 255, 0.03); /* Lighter glass for calendar */
            backdrop-filter: blur(10px);
            -webkit-backdrop-filter: blur(10px);
            border: 1px solid rgba(255, 255, 255, 0.08); /* Borde más sutil */
            border-radius: 1.5rem;
            box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
            font-family: 'Inter', sans-serif; /* Example font */
        }
        .calendar-auraflow .react-calendar__navigation button {
            color: #00FF8C; /* CAMBIO DE COLOR: Verde Eléctrico para navegación */
        }
        .calendar-auraflow .react-calendar__navigation button:enabled:hover,
        .calendar-auraflow .react-calendar__navigation button:enabled:focus {
            background-color: rgba(255, 255, 255, 0.08); /* Ligeramente más oscuro en hover */
            border-radius: 0.75rem;
        }
        .calendar-auraflow .react-calendar__month-view__weekdays {
            color: #64FFDA; /* CAMBIO DE COLOR: Verde claro para días de la semana */
            font-size: 0.9em;
        }
        .calendar-auraflow .react-calendar__tile {
            color: #E2E8F0; /* Light gray for days */
            background: none;
            border-radius: 0.75rem;
            transition: all 0.2s ease-in-out;
        }
        .calendar-auraflow .react-calendar__tile:enabled:hover,
        .calendar-auraflow .react-calendar__tile:enabled:focus {
            background-color: rgba(255, 255, 255, 0.08);
        }
        .calendar-auraflow .react-calendar__tile--now {
            background: rgba(0, 255, 140, 0.3); /* CAMBIO DE COLOR: Verde esmeralda con opacidad para el día actual */
            color: white;
            font-weight: bold;
        }
        .calendar-auraflow .react-calendar__tile--now:enabled:hover,
        .calendar-auraflow .react-calendar__tile--now:enabled:focus {
            background: rgba(0, 255, 140, 0.5);
        }
        .calendar-auraflow .react-calendar__tile--active {
            background: #00FF8C; /* CAMBIO DE COLOR: Verde Eléctrico para el día activo */
            color: black; /* Texto oscuro para contraste */
            font-weight: bold;
        }
        .calendar-auraflow .react-calendar__tile--active:enabled:hover,
        .calendar-auraflow .react-calendar__tile--active:enabled:focus {
            background: #39FF14; /* Verde Neón */
        }
      `}</style>


      <div className="relative z-10">
       {/* Hero Section */}
        <div
          className="glass-card p-10 mb-12 shadow-2xl relative overflow-hidden"
          data-aos="fade-up" // Aquí se cambió a fade-up
          data-aos-duration="3000" // Y aquí la duración a 3000ms
        >
          {/* Subtle background pattern or image */}
          {/* CAMBIO: La imagen de patrón de fondo debe encajar con la nueva paleta */}
          <div className="absolute inset-0 opacity-10" style={{ backgroundImage: `url(/img/dashboard-img/abstract-pattern-dark.png)`, backgroundSize: 'cover' }}></div>
          <div className="relative z-10 flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-3/5">
              <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-4 leading-tight drop-shadow-lg">
                Tu Universo Musical,<br />Siempre en Armonía.
              </h1>
              
            </div>
            {/* Animated SVG/Lottie placeholder for visualizer/album art */}
            <motion.div
              // CAMBIO DE COLOR: Círculo animado (degradado de verdes)
              className="hidden md:block w-56 h-56 flex-shrink-0 bg-gradient-to-br from-green-500 to-lime-500 rounded-full shadow-2xl flex items-center justify-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.6, type: "spring", stiffness: 100, damping: 10 }}
              whileHover={{ rotate: 5, scale: 1.05 }}
            >
              <FaMusic className="text-white text-7xl opacity-70" />
              {/* Replace with actual Lottie/SVG animation if desired */}
            </motion.div>
          </div>
          </div>

        {/* Key Statistics Section */}
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {Object.entries(statsData).map(([key, value], index) => (
            <motion.div
              key={key}
              className="glass-card p-6 flex items-center justify-between border border-opacity-10 border-gray-300 cursor-pointer relative overflow-hidden group"
              variants={itemVariants}
              whileHover="hover"
              whileTap="tap"
            >
              {/* CAMBIO DE COLOR: Resplandor sutil en hover para estadísticas (blanco transparente) */}
              <div className="absolute inset-0 bg-gradient-to-br from-transparent to-white opacity-0 group-hover:opacity-5 transition-opacity duration-300"></div>
              <div>
                <p className="text-gray-400 text-sm font-semibold uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</p>
                {/* CAMBIO DE COLOR: Texto de valor de estadística (degradado de verdes) */}
                <p className="text-4xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-lime-400 to-green-400 mt-2">{value}</p>
              </div>
              {/* CAMBIO DE COLOR: Iconos de estadísticas (verde) */}
              <div className="text-5xl text-lime-400 opacity-60">
                {key === "totalTracks" && <FaMusic />}
                {key === "activeArtists" && <FaUserCircle />}
                {key === "upcomingEvents" && <FaCalendarAlt />}
                {key === "totalPlaylists" && <FaPlus />}

                
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
          {/* Monthly Playback Chart */}
          <motion.div
            className="lg:col-span-2 glass-card p-6 relative overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.5 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white">Reproducciones Mensuales</h2>
            <div className="h-72">
              <Line
                data={salesData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: { display: false },
                    title: { display: false },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        // CAMBIO DE COLOR: Título del tooltip (verde)
                        titleColor: '#00FF8C',
                        bodyColor: '#E2E8F0',
                        // CAMBIO DE COLOR: Borde del tooltip (verde)
                        borderColor: '#00FF8C',
                        borderWidth: 1,
                    }
                  },
                  scales: {
                    x: {
                      // CAMBIO DE COLOR: Líneas de la cuadrícula del gráfico (transparente oscuro)
                      grid: { color: 'rgba(255,255,255,0.05)' },
                      // CAMBIO DE COLOR: Etiquetas del eje X (blanco/gris)
                      ticks: { color: '#E0E0E0' }
                    },
                    y: {
                      // CAMBIO DE COLOR: Líneas de la cuadrícula del gráfico (transparente oscuro)
                      grid: { color: 'rgba(255,255,255,0.05)' },
                      // CAMBIO DE COLOR: Etiquetas del eje Y (blanco/gris)
                      ticks: { color: '#E0E0E0' }
                    },
                  },
                }}
              />
            </div>
          </motion.div>

          {/* Genre Distribution Chart */}
          <motion.div
            className="glass-card p-6 flex flex-col items-center justify-center relative overflow-hidden"
            variants={itemVariants}
            initial="hidden"
            animate="visible"
            whileHover="hover"
            transition={{ delay: 0.6 }}
          >
            <h2 className="text-2xl font-bold mb-6 text-white text-center">Distribución por Género</h2>
            <div className="h-64 w-full flex items-center justify-center">
              <Doughnut
                data={genreData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'bottom',
                      labels: {
                        // CAMBIO DE COLOR: Etiquetas de leyenda (blanco/gris)
                        color: '#E0E0E0',
                        font: { size: 14 },
                      }
                    },
                    tooltip: {
                        backgroundColor: 'rgba(0,0,0,0.8)',
                        // CAMBIO DE COLOR: Título del tooltip (verde)
                        titleColor: '#00FF8C',
                        bodyColor: '#E2E8F0',
                        // CAMBIO DE COLOR: Borde del tooltip (verde)
                        borderColor: '#00FF8C',
                        borderWidth: 1,
                    }
                  },
                }}
              />
            </div>
          </motion.div>
        </div>

        {/* Upcoming Events & Calendar Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-12">
            {/* Upcoming Events List */}
            <motion.div
                className="glass-card p-6 relative overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.7 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-white">Próximos Eventos</h2>
                <div className="space-y-4 max-h-96 overflow-y-auto custom-scrollbar pr-2">
                    {upcomingEvents.map((event) => (
                        <motion.div
                            key={event.id}
                            className="flex items-center bg-white bg-opacity-5 p-4 rounded-xl shadow-md border border-white border-opacity-10 hover:bg-opacity-10 transition-colors duration-200 cursor-pointer"
                            whileHover={{ x: 5, boxShadow: "0 5px 20px rgba(0,0,0,0.2)" }}
                        >
                            <img src={event.image} alt={event.name} className="w-20 h-20 object-cover rounded-lg mr-4 flex-shrink-0 shadow-md"/>
                            <div>
                                <h3 className="text-lg font-semibold text-white">{event.name}</h3>
                                {/* CAMBIO DE COLOR: Fecha del evento (verde) */}
                                <p className="text-green-400 text-sm mt-1">
                                    <FaCalendarAlt className="inline-block mr-2" /> {event.date}
                                </p>
                                <p className="text-gray-300 text-sm">{event.location}</p>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </motion.div>

            {/* Calendar */}
            <motion.div
                className="glass-card p-6 flex flex-col items-center relative overflow-hidden"
                variants={itemVariants}
                initial="hidden"
                animate="visible"
                whileHover="hover"
                transition={{ delay: 0.8 }}
            >
                <h2 className="text-2xl font-bold mb-6 text-white">Calendario</h2>
                {/* La clase calendar-auraflow aplica los estilos custom definidos en <style jsx> */}
                <Calendar className="calendar-auraflow w-full max-w-md shadow-2xl" tileClassName="calendar-tile-custom" />
            </motion.div>
        </div>


        {/* New Releases Section */}
        <h2 className="text-3xl font-bold mt-16 mb-8 text-white text-center">Nuevos Lanzamientos Estelares</h2>
        <div className="relative">
          <button
            onClick={() => scrollHorizontally("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 text-white p-3 rounded-full shadow-lg z-20 hover:bg-opacity-20 transition-colors duration-200 focus:outline-none backdrop-blur-sm"
          >
            <FaChevronLeft />
          </button>
          {/* Custom scrollbar class applied here */}
          <div ref={scrollRef} className="flex overflow-x-auto custom-scrollbar pb-4 -mx-2">
            <div className="flex space-x-6 px-2">
              {newReleases.map((song) => (
                <motion.div
                  key={song.id}
                  className="flex-none w-60 glass-card rounded-xl shadow-xl cursor-pointer overflow-hidden group relative"
                  onMouseEnter={() => setHoveredSong(song.id)}
                  onMouseLeave={() => setHoveredSong(null)}
                  variants={itemVariants}
                  whileHover="hover"
                  whileTap="tap"
                  initial="hidden"
                  animate="visible"
                  transition={{ delay: 0.1 * song.id }}
                >
                  <img
                    src={song.image}
                    alt={song.name}
                    className="w-full h-60 object-cover transition-transform duration-300 group-hover:scale-110 group-hover:brightness-75"
                  />
                  {/* Play Button Overlay */}
                  <motion.div
                    className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    onClick={() => togglePlayPause(song)}
                  >
                    <motion.div
                      // CAMBIO DE COLOR: Botón de play/pause en las tarjetas (degradado de verdes)
                      className="text-white text-5xl p-4 rounded-full bg-gradient-to-br from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 transition-all duration-200 flex items-center justify-center"
                      // CAMBIO DE COLOR: Sombra de brillo en hover del botón (verde)
                      whileHover={{ scale: 1.1, boxShadow: "0 0 20px rgba(0, 255, 140, 0.7)" }}
                      whileTap={{ scale: 0.9 }}
                    >
                      {currentPlayingSong?.id === song.id ? <FaPause /> : <FaPlay />}
                    </motion.div>
                  </motion.div>
                  <div className="p-4">
                    <h3 className="text-xl font-semibold text-white truncate">{song.name}</h3>
                    {/* CAMBIO DE COLOR: Nombre del artista en las tarjetas (verde) */}
                    <p className="text-green-400 text-sm">{song.artist}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
          <button
            onClick={() => scrollHorizontally("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white bg-opacity-10 text-white p-3 rounded-full shadow-lg z-20 hover:bg-opacity-20 transition-colors duration-200 focus:outline-none backdrop-blur-sm"
          >
            <FaChevronRight />
          </button>
        </div>
      </div>

      {/* Sticky Music Player */}
      <audio ref={audioRef} /> {/* Hidden audio element */}
      {currentPlayingSong && (
        <motion.div
          className="fixed bottom-0 left-0 md:left-72 right-0 glass-card p-4 shadow-2xl z-50 flex flex-col sm:flex-row items-center justify-between border-t border-white border-opacity-10"
          initial={{ y: 150, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 150, opacity: 0 }}
          transition={{ type: "spring", damping: 15, stiffness: 200 }}
        >
          <div className="flex items-center mb-4 sm:mb-0 w-full sm:w-auto">
            <img
              src={currentPlayingSong.image}
              alt={currentPlayingSong.name}
              className="w-16 h-16 object-cover rounded-md mr-4 shadow-lg"
            />
            <div>
              <p className="font-semibold text-lg text-white">{currentPlayingSong.name}</p>
              {/* CAMBIO DE COLOR: Artista en el reproductor (verde) */}
              <p className="text-green-300 text-sm">{currentPlayingSong.artist}</p>
            </div>
          </div>
          <div className="flex items-center space-x-6 w-full sm:w-auto justify-center">
            <motion.button
                className="text-gray-400 hover:text-white text-2xl"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            ><FaBackward /></motion.button>
            <motion.button
              onClick={() => togglePlayPause(currentPlayingSong)}
              // CAMBIO DE COLOR: Botón de play/pause del reproductor (degradado de verdes)
              className="text-white text-4xl p-3 rounded-full bg-gradient-to-br from-green-500 to-lime-500 hover:from-green-600 hover:to-lime-600 shadow-lg flex items-center justify-center"
              whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            >
              {currentPlayingSong && !audioRef.current?.paused ? <FaPause /> : <FaPlay />}
            </motion.button>
            <motion.button
                className="text-gray-400 hover:text-white text-2xl"
                whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}
            ><FaForward /></motion.button>
            {/* Volume control could be a range input styled */}
            {/* <FaVolumeUp className="text-gray-400 text-xl hidden sm:block" /> */}
          </div>
          <div className="mt-4 sm:mt-0 w-full sm:w-auto flex justify-end">
            <motion.button
              onClick={() => setCurrentPlayingSong(null)}
              // CAMBIO DE COLOR: Botón "Detener" (rojo, un contraste fuerte y funcional)
              className="bg-red-600 hover:bg-red-700 text-white px-5 py-2 rounded-full shadow-lg"
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            >
              Detener
            </motion.button>
          </div>
        </motion.div>
      )}
    </motion.div>
  );
};

export default AuraFlowDashboard;