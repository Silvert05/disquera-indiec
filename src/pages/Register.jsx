//Archivo de Registro
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { FiUserPlus } from "react-icons/fi";
import Swal from "sweetalert2";
import DOMPurify from "dompurify"; // Importación de DOMPurify

const Register = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  // Función para sanitizar entradas usando DOMPurify
  const sanitizeInput = (input) => {
    return DOMPurify.sanitize(input, {
      ALLOWED_TAGS: [], // No permitir ningún tag HTML
      ALLOWED_ATTR: [], // No permitir ningún atributo
    });
  };

  // Función para manejar el registro
  const handleRegister = (e) => {
    e.preventDefault();

    // Sanitizar todas las entradas del usuario
    const cleanEmail = sanitizeInput(email);
    const cleanPassword = sanitizeInput(password);
    const cleanUsername = sanitizeInput(username);
    const cleanPhoneNumber = sanitizeInput(phoneNumber);

    // Validación básica de campos vacíos
    if (!cleanEmail || !cleanPassword || !cleanUsername || !cleanPhoneNumber) {
      Swal.fire({
        title: "Error",
        text: "Todos los campos son requeridos",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(cleanEmail)) {
      Swal.fire({
        title: "Error",
        text: "Ingresa un correo electrónico válido",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Validación de contraseña (mínimo 6 caracteres)
    if (cleanPassword.length < 6) {
      Swal.fire({
        title: "Error",
        text: "La contraseña debe tener al menos 6 caracteres",
        icon: "error",
        confirmButtonText: "Aceptar",
      });
      return;
    }

    // Lógica de registro simulada
    Swal.fire({
      title: "Registro Exitoso",
      text: "Te has registrado correctamente",
      icon: "success",
      confirmButtonText: "Ir al Dashboard",
    }).then(() => {
      navigate("/dashboard");
    });
  };

  return (
    <div className="flex justify-center items-center h-screen bg-cover bg-center bg-[url('/registro-fondo.jpg')]">
      <motion.div
        className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg"
        initial={{ opacity: 0, x: -100 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <div
          className="hidden lg:block w-full lg:w-1/2 h-[300px] lg:h-auto bg-cover bg-center bg-no-repeat rounded-lg overflow-hidden"
          style={{ backgroundImage: "url('/img/piezas.jpeg')" }}
        />

        <div className="w-full sm:w-1/2 p-8">
          <h2 className="text-4xl font-bold text-center text-green-700 mb-6">Regístrate</h2>
          <form onSubmit={handleRegister}>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700">Nombre de Usuario</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(sanitizeInput(e.target.value))} // Sanitizar al cambiar
              placeholder="Ingresa tu nombre de usuario"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mt-4">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(sanitizeInput(e.target.value))} // Sanitizar al cambiar
              placeholder="Ingresa tu correo"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-gray-700 mt-4">Número de Teléfono</label>
            <input
              type="tel"
              id="phoneNumber"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(sanitizeInput(e.target.value))} // Sanitizar al cambiar
              placeholder="Ingresa tu número de teléfono"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mt-4">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(sanitizeInput(e.target.value))} // Sanitizar al cambiar
              placeholder="Crea una contraseña"
              className="w-full p-3 border border-gray-300 rounded-md focus:ring-2 focus:ring-green-500"
            />
            
            <button type="submit" className="w-full py-3 bg-green-600 text-white rounded-md flex items-center justify-center gap-2 hover:bg-green-700 transition duration-200 mt-6">
              <FiUserPlus /> Registrar
            </button>
          </form>

          <div className="mt-4 text-center">
            <p className="text-sm text-gray-500">
              ¿Ya tienes una cuenta? <a href="/" className="text-green-600 hover:text-green-700 font-semibold">Inicia sesión aquí</a>
            </p>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Register;