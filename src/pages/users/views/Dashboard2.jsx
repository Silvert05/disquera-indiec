import React, { useRef, useEffect } from 'react'; // Import useEffect
import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

export const metadata = {
  viewport: {
    width: 'device-width',
    initialScale: 1,
    maximumScale: 1,
  },
};

const fadeUp = {
  hidden: { opacity: 0, y: 40 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: 'easeOut',
    },
  },
};

const Home = () => {
  const scrollRef = useRef(null);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true, // Animation will only play once
    });
  }, []); // Empty dependency array means this runs once on mount

  const handleScroll = () => {
    if (!scrollRef.current) return;

    const targetPosition = scrollRef.current.getBoundingClientRect().top + window.scrollY;
    const startPosition = window.scrollY;
    const distance = targetPosition - startPosition;
    const duration = 1200; // duración en milisegundos (ajústalo si quieres más lento)
    let startTime = null;

    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    const animateScroll = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const timeElapsed = currentTime - startTime;
      const progress = Math.min(timeElapsed / duration, 1);
      const ease = easeInOutCubic(progress);

      window.scrollTo(0, startPosition + distance * ease);

      if (timeElapsed < duration) {
        requestAnimationFrame(animateScroll);
      }
    };

    requestAnimationFrame(animateScroll);
  };



  return (
    <div
      className="min-h-screen bg-black text-white font-sans overflow-x-hidden pl-0 md:pl-72 transition-all"
      data-aos="fade-down" // Added AOS animation
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      {/* HERO SECTION */}
      <section className="relative w-full h-screen flex items-center justify-center text-center px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 bg-[url('/imgs/bg-humo.png')] bg-cover opacity-10 blur-sm" />
        <div className="absolute top-1/2 left-1/2 w-[80vw] sm:w-[60vw] max-w-[800px] aspect-square bg-green-500 opacity-10 blur-[10vw] sm:blur-[160px] rounded-full -translate-x-1/2 -translate-y-1/2" />

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1 }}
          className="relative w-full max-w-6xl px-4"
        >
          <motion.h1
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-[2.5rem] sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-green-500 drop-shadow-neon mb-4 sm:mb-6"
          >
            Siente la Música
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="text-gray-300 text-base sm:text-lg md:text-xl max-w-2xl mx-auto"
          >
            Más que sonidos, es una estética. Más que ropa, es identidad. Bienvenido a tu universo.
          </motion.p>
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            animate={{
              scale: [1, 1.03, 1],
              boxShadow: ['0 0 0px green', '0 0 12px green', '0 0 0px green'],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              repeatType: 'loop',
            }}
            onClick={handleScroll}
            className="mt-6 sm:mt-8 px-6 sm:px-8 py-3 sm:py-4 bg-green-500 text-black text-base sm:text-lg font-bold rounded-full"
          >
            Explorar Ahora
          </motion.button>
        </motion.div>
      </section>

      {/* TOP PRODUCTS SECTION */}
      <motion.section
        ref={scrollRef}
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-zinc-950 border-y border-green-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-500 font-bold text-center mb-8 sm:mb-12"
          variants={fadeUp}
        >
          Ropa Más Vendida
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            { nombre: 'Hoodie Aqo', img: '/imgs/hoodieaqo.png' },
            { nombre: 'Camiseta Leo', img: '/imgs/camiseta1.png' },
            { nombre: 'Pulsera BTS', img: '/imgs/pulsera.png' },
          ].map((producto, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 p-4 rounded-lg border border-green-500 hover:shadow-neon text-center"
            >
              <div className="flex items-center justify-center min-h-[180px]">
                <img
                  src={producto.img}
                  alt={producto.nombre}
                  className="w-full max-h-[160px] object-contain mx-auto"
                />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mt-4">
                {producto.nombre}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FEATURED ALBUMS */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 lg:px-8 bg-black border-t border-green-600"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
        variants={fadeUp}
      >
        <motion.h2
          className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl text-green-500 font-bold text-center mb-8 sm:mb-12"
          variants={fadeUp}
        >
          Álbumes Destacados
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8 max-w-7xl mx-auto">
          {[
            { nombre: 'LEO - Aqo', img: '/imgs/aqoalbum.png' },
            { nombre: 'Versick Deluxe', img: '/imgs/taza.png' },
            { nombre: 'Pink Floyd Limited', img: '/imgs/pinkfloydpin.png' },
          ].map((album, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.1 }}
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
              className="bg-zinc-900 p-4 rounded-lg border border-green-500 hover:shadow-neon text-center"
            >
              <div className="flex items-center justify-center min-h-[180px]">
                <img
                  src={album.img}
                  alt={album.nombre}
                  className="w-full max-h-[160px] object-contain mx-auto"
                />
              </div>
              <h3 className="text-white font-bold text-base sm:text-lg mt-4">
                {album.nombre}
              </h3>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* FINAL BANNER */}
      <motion.section
        className="py-12 sm:py-16 md:py-20 px-4 sm:px-6 bg-zinc-950 text-center"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.3 }}
        variants={fadeUp}
      >
        <Sparkles className="mx-auto text-green-500 mb-3 sm:mb-4" size={32} />
        <motion.h3
          className="text-xl sm:text-2xl md:text-3xl text-green-500 font-bold mb-2"
          variants={fadeUp}
        >
          Únete a la experiencia INDIEC
        </motion.h3>
        <motion.p
          className="text-gray-400 text-sm sm:text-base md:text-lg"
          variants={fadeUp}
        >
          No sigas modas. Crea la tuya con música.
        </motion.p>
      </motion.section>

      {/* FOOTER */}
      <footer className="py-4 sm:py-6 text-center text-xs sm:text-sm text-gray-600 bg-black border-t border-green-500">
        © 2025 INDIEC — Cultura musical independiente
      </footer>
    </div>
  );
};

export default Home;