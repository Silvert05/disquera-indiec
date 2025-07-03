//Archivo del Login
// Importaciones de librerías y hooks necesarios
import { useState } from "react"; // Hook para manejar estados
import { useNavigate } from "react-router-dom"; // Hook para navegar entre rutas
import { motion } from "framer-motion"; // Librería para animaciones
import Swal from "sweetalert2"; // Librería para alertas personalizadas
import DOMPurify from "dompurify"; // Librería para sanitizar entradas y prevenir XSS

// Función para sanitizar entradas usando DOMPurify
const sanitizeInput = (input) => {
  return DOMPurify.sanitize(input); // Sanitiza el input para prevenir ataques XSS
};

// Componente Loading: Muestra una animación de carga
const Loading = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
      <div className="text-center">
        {/* Spinner de carga con animación */}
        <div className="border-t-4 border-blue-600 border-solid w-16 h-16 sm:w-20 sm:h-20 md:w-24 md:h-24 rounded-full animate-spin mx-auto"></div>
        <p className="mt-4 text-lg sm:text-xl md:text-2xl text-gray-600">
          Cargando...
        </p>
      </div>
    </div>
  );
};

// Componente Login: Maneja el inicio de sesión de usuarios
const Login = () => {
  // Hooks para navegación y estados
  const navigate = useNavigate(); // Hook para redireccionar a otras rutas
  const [email, setEmail] = useState(""); // Estado para almacenar el email
  const [password, setPassword] = useState(""); // Estado para almacenar la contraseña
  const [loading, setLoading] = useState(false); // Estado para controlar la carga
  const [dataLoaded, setDataLoaded] = useState(false); // Estado para indicar si los datos se cargaron
  const [loginAttempts, setLoginAttempts] = useState(0); // Estado para contar intentos fallidos

  // Función para manejar el inicio de sesión
  const handleLogin = (e) => {
    e.preventDefault(); // Evita el comportamiento por defecto del formulario

    // Bloquear después de 3 intentos fallidos
    if (loginAttempts >= 3) {
      Swal.fire({
        title: "Bloqueado",
        text: "Has excedido el número de intentos permitidos. Intenta de nuevo más tarde.",
        icon: "error",
        confirmButtonText: "OK",
      });
      return; // Detiene la ejecución si hay demasiados intentos fallidos
    }

    // Sanitizar las entradas del usuario
    const sanitizedEmail = sanitizeInput(email); // Sanitiza el email
    const sanitizedPassword = sanitizeInput(password); // Sanitiza la contraseña

    // Credenciales predefinidas
    const adminEmail = "admin@yavirac.edu.ec"; // Email del administrador
    const adminPassword = "12345"; // Contraseña del administrador
    const userEmail = "user@yavirac.edu.ec"; // Email del usuario
    const userPassword = "67890"; // Contraseña del usuario

    // Lógica para admin
    if (sanitizedEmail === adminEmail && sanitizedPassword === adminPassword) {
      Swal.fire({
        title: "Bienvenido Admin",
        text: "Datos cargados correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        setLoading(true); // Activa el estado de carga
        // Simula un proceso de carga
        setTimeout(() => {
          setLoading(false); // Desactiva el estado de carga
          setDataLoaded(true); // Marca los datos como cargados
          // Redirección después de una breve espera
          setTimeout(() => {
            navigate("/dashboard"); // Redirige al dashboard del admin
          }, 200);
        }, 200);
      });
    }
    // Lógica para usuario normal
    else if (sanitizedEmail === userEmail && sanitizedPassword === userPassword) {
      Swal.fire({
        title: "Bienvenido Usuario",
        text: "Datos cargados correctamente",
        icon: "success",
        confirmButtonText: "Continuar",
      }).then(() => {
        setLoading(true); // Activa el estado de carga
        // Simula un proceso de carga
        setTimeout(() => {
          setLoading(false); // Desactiva el estado de carga
          setDataLoaded(true); // Marca los datos como cargados
          // Redirección después de una breve espera
          setTimeout(() => {
            navigate("/dashboard2"); // Redirige al dashboard del usuario
          }, 200);
        }, 200);
      });
    } else {
      // Incrementar el contador de intentos fallidos
      setLoginAttempts(loginAttempts + 1);

      // Muestra alerta de error con SweetAlert2
      Swal.fire({
        title: "Error",
        text: "Credenciales incorrectas",
        icon: "error",
        confirmButtonText: "Intentar de nuevo",
      });
    }
  };

  // Render condicional durante la carga
  if (loading) {
    return <Loading />; // Muestra el componente Loading (spinner)
  }

  // Render condicional post-carga exitosa
  if (dataLoaded) {
    return (
      <div className="flex items-center justify-center h-screen bg-gray-100 px-4">
        <div className="text-center text-lg sm:text-xl md:text-2xl text-gray-600">
          ¡Datos cargados con éxito!
        </div>
      </div>
    );
  }

  // Vista principal del formulario de login
  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/login-fondo.jpg')]">
      {/* Contenedor animado con Framer Motion */}
      <motion.div
        className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0 }} // Estado inicial de la animación
        animate={{ opacity: 1 }} // Estado final de la animación
        transition={{ duration: 0.2 }} // Duración de la transición
      >
        {/* Sección de imagen lateral (solo en pantallas grandes) */}
        <div
          className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/img/dc.jpg')" }}
        ></div>

        {/* Sección del formulario */}
        <div className="w-full lg:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">
            Iniciar Sesión
          </h2>
          <form onSubmit={handleLogin}>
            {/* Campo Email con animación de entrada */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }} // Posición inicial (50px abajo)
              animate={{ opacity: 1, y: 0 }} // Posición final
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }} // Animación tipo resorte
            >
              <label
                htmlFor="email"
                className="block text-sm font-medium text-gray-700"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(sanitizeInput(e.target.value))} // Sanitiza el email
                placeholder="Ingresa tu correo electrónico"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </motion.div>

            {/* Campo Contraseña con misma animación que email */}
            <motion.div
              className="mb-6"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
            >
              <label
                htmlFor="password"
                className="block text-sm font-medium text-gray-700"
              >
                Contraseña
              </label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(sanitizeInput(e.target.value))} // Sanitiza la contraseña
                placeholder="Ingresa tu contraseña"
                className="w-full p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500"
              />
            </motion.div>

            {/* Botón de envío del formulario */}
            <button
              type="submit"
              className="w-full py-3 bg-green-600 text-white rounded-md hover:bg-green-700 transition duration-200"
            >
              Iniciar Sesión
            </button>
          </form>

          {/* Enlace a registro */}
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              ¿No tienes una cuenta?{" "}
              <a
                href="/register"
                className="text-green-600 hover:text-green-700 font-semibold"
              >
                Regístrate aquí
              </a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Login; // Exportación del componente