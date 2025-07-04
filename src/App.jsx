import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes";

function App() {
  return (
    // Aplica las clases de Tailwind CSS para el fondo oscuro y el texto blanco aquí
    <div className="cursor-custom bg-gray-900 text-white min-h-screen"> 
      <Router>
        <AppRoutes />
      </Router>
    </div>
  );
}

export default App;