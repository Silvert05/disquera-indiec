import React, { useState, useEffect } from "react"; // Import useEffect
import { motion, AnimatePresence } from "framer-motion";
import {
  FaShoppingCart,
  FaCheckCircle,
  FaTimesCircle,
  FaExclamationTriangle,
} from "react-icons/fa";
import AOS from 'aos'; // Import AOS
import 'aos/dist/aos.css'; // Import AOS styles

const overlayVariants = {
  hidden: { opacity: 0, backdropFilter: "blur(0px)" },
  visible: {
    opacity: 1,
    backdropFilter: "blur(4px)",
    transition: { duration: 0.4 },
  },
  exit: { opacity: 0, backdropFilter: "blur(0px)", transition: { duration: 0.3 } },
};

const modalVariants = {
  hidden: { y: -80, scale: 0.8, opacity: 0, rotateX: -10 },
  visible: {
    y: 0,
    scale: 1,
    opacity: 1,
    rotateX: 0,
    transition: { type: "spring", stiffness: 500, damping: 30 },
  },
  exit: { y: 50, scale: 0.8, opacity: 0, rotateX: 5, transition: { duration: 0.25 } },
};

const CarritoTabla = () => {
  const [productos, setProductos] = useState([
    {
      id: 1,
      imagen: "/1507-1.jpg",
      detalle: ["Álbum: Roll With The Punches", "Artista: Bryan Adams"],
      estado: "disponible",
      unidades: 1,
      costo: 109.26,
    },
    {
      id: 2,
      imagen: "/carrito2.jpg",
      detalle: ["Roll With The Punches (2 CD Deluxe)", "Bryan Adams"],
      estado: "disponible",
      unidades: 1,
      costo: 21.65,
    },
    {
      id: 3,
      imagen: "/carrito3.jpeg",
      detalle: ["Camisa Negra", "Con Diseño", "Ago"],
      estado: "disponible",
      unidades: 2,
      costo: 21.39,
    },
  ]);

  const [productoAEliminar, setProductoAEliminar] = useState(null);
  const [ventaConfirmada, setVentaConfirmada] = useState(false);

  useEffect(() => {
    // Initialize AOS
    AOS.init({
      once: true, // Animation will only play once
    });
  }, []); // Empty dependency array means this runs once on mount


  const confirmarEliminar = () => {
    setProductos(productos.filter((p) => p.id !== productoAEliminar.id));
    setProductoAEliminar(null);
  };

  const cancelarEliminar = () => {
    setProductoAEliminar(null);
  };

  const total = productos.reduce((sum, p) => sum + p.costo * p.unidades, 0);

  return (
    <div
      className="relative min-h-screen bg-black overflow-hidden text-white z-10"
      data-aos="fade-down" // Added AOS animation
      data-aos-easing="linear"
      data-aos-duration="1500"
    >
      {/* Fondo animado */}
      <div
        className="absolute inset-0 z-0 opacity-20"
        style={{
          background: `radial-gradient(circle at top left, #39FF14 0%, transparent 30%), 
                         radial-gradient(circle at bottom right, #00FF8C 0%, transparent 30%)`,
          backgroundSize: "200% 200%",
          animation: "bg-pan 20s ease infinite",
        }}
      />

      {/* Encabezado */}
      <motion.div
        className="relative mb-8 ml-10 md:ml-72 z-10"
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 120, damping: 14 }}
      >
        <div className="absolute inset-0 mx-5 mt-5 rounded-2xl bg-gray-800/70 backdrop-blur-md border border-white/30 pointer-events-none" />
        <div className="relative z-10 p-8 glass-card shadow-2xl rounded-2xl">
          <h1 className="flex items-center gap-4 text-4xl md:text-6xl font-extrabold text-white leading-tight drop-shadow-lg">
            <FaShoppingCart className="text-green-400" />
            Productos en su carrito
          </h1>
        </div>
      </motion.div>

      {/* Tabla */}
      <div className="relative z-10 ml-10 md:ml-72 p-4">
        <div className="bg-[#00ff8c]/10 backdrop-blur-md border border-[#00ff8c]/20 rounded-2xl shadow-lg overflow-x-auto relative pb-24">
          <table className="w-full text-white text-sm md:text-base">
            <thead className="px-4 py-3 bg-green-900/80 text-white rounded-md">
              <tr className="text-center border-b border-gray-600">
                <th className="px-4 py-3">Imagen</th>
                <th className="px-4 py-3">Detalle del producto</th>
                <th className="px-4 py-3">Estado</th>
                <th className="px-4 py-3">Unidades</th>
                <th className="px-4 py-3">Costo</th>
                <th className="px-4 py-3">✖</th>
              </tr>
            </thead>
            <tbody className="text-center">
              {productos.map((p) => (
                <tr key={p.id} className="border-b border-gray-700 hover:bg-white/10 transition-colors">
                  <td className="p-3">
                    <img src={p.imagen} alt="producto" className="w-16 h-16 object-cover rounded" />
                  </td>
                  <td className="p-3 text-left">
                    {p.detalle.map((line, i) => (
                      <div key={i} className="leading-tight">{line}</div>
                    ))}
                  </td>
                  <td className="p-3 capitalize">{p.estado}</td>
                  <td className="p-3">{p.unidades}</td>
                  <td className="p-3">${p.costo.toFixed(2)}</td>
                  <td className="p-3">
                    <button
                      onClick={() => setProductoAEliminar(p)}
                      className="bg-white text-black rounded-full w-8 h-8 text-sm font-bold flex items-center justify-center shadow-md hover:scale-110 transition-transform"
                    >
                      ✖
                    </button>
                  </td>
                </tr>
              ))}
              <tr className="text-right text-base font-semibold text-white bg-white/10">
                <td colSpan="4" />
                <td className="py-4 pr-4 text-right">Total:</td>
                <td className="py-4 text-center">${total.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>

          {/* Botón fijo dentro del contenedor de la tabla */}
          <button
            onClick={() => setVentaConfirmada(true)}
            className="
              absolute bottom-4 right-4 z-20
              inline-flex items-center gap-2
              bg-green-600 hover:bg-green-500 active:scale-95
              text-white font-semibold
              px-10 py-3 rounded-full
              shadow-lg hover:shadow-green-400/60
              transition-all duration-300
            "
          >
            <FaCheckCircle className="text-xl" />
            Confirmar venta
          </button>
        </div>
      </div>

      {/* Modal de Confirmación de Venta */}
      <AnimatePresence>
        {ventaConfirmada && (
          <motion.div
            className="fixed inset-0 z-[99999] bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 max-w-sm w-full shadow-2xl border border-white/30 text-center"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
            >
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-green-500 flex items-center justify-center">
                <FaCheckCircle className="text-white text-3xl" />
              </div>
              <h2 className="text-xl font-bold mb-2 text-white">¡Venta confirmada!</h2>
              <p className="text-white mb-6">La compra ha sido realizada correctamente.</p>
              <button
                onClick={() => setVentaConfirmada(false)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold px-6 py-2 rounded-full shadow-md transition"
              >
                Cerrar
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal de Confirmación de Eliminación */}
      <AnimatePresence mode="wait">
        {productoAEliminar && (
          <motion.div
            key="overlay"
            className="fixed inset-0 z-[99999] bg-black bg-opacity-70 backdrop-blur-md flex items-center justify-center"
            variants={overlayVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <motion.div
              key="modal"
              className="bg-white/30 backdrop-blur-lg rounded-2xl p-8 max-w-md w-full shadow-2xl border border-white/30"
              variants={modalVariants}
            >
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
              >
                <FaExclamationTriangle className="text-yellow-400 text-5xl mx-auto mb-4" />
              </motion.div>
              <h2 className="text-xl font-bold mb-6 text-center">
                ¿Seguro que quieres eliminar este producto del carrito?
              </h2>
              <div className="flex justify-center gap-6">
                <button
                  onClick={confirmarEliminar}
                  className="flex items-center gap-2 bg-green-600 hover:bg-green-700 px-6 py-2 rounded-lg shadow-md transition"
                >
                  <FaCheckCircle className="text-xl" /> Eliminar
                </button>
                <button
                  onClick={cancelarEliminar}
                  className="flex items-center gap-2 bg-red-600 hover:bg-red-700 px-6 py-2 rounded-lg shadow-md transition"
                >
                  <FaTimesCircle className="text-xl" /> Cancelar
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx="true">{`
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
      `}</style>
    </div>
  );
};

export default CarritoTabla;