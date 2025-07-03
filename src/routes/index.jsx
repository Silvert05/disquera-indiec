import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Admin/Dashboard";
import Navbar from "../components/Navbar";
import Musica from "../pages/Admin/Musica";

import Artistas from "../pages/Admin/Artista";
import Usuarios from "../pages/Admin/Usuarios";
import Ventas from "../pages/Admin/Ventas";
import ArtistasAdquiridos from "../pages/Admin/ArtistasAdquiridos";




import Album from "../pages/Admin/Album";
import Perfil from "../pages/Admin/Perfil";

import Topbar from "../pages/users/component/Topbar";
import Dashboard2 from "../pages/users/views/Dashboard2";
import Catalogo from "../pages/users/views/Catalogo";
import Compras from "../pages/users/views/Compras";
import Perfil_usuario from "../pages/users/views/Perfil_usuario";



const AppRoutes = () => {
  return (
    <Routes>
      {/* rutas de logeo  */}

      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      {/* rutas de admin  */}
      <Route
        path="/dashboard"
        element={
          <>
            <Navbar />
            <Dashboard />
          </>
        }
      />
      <Route
        path="/artista"
        element={
          <>
            <Navbar />
            <Artistas />
          </>
        }
      />
      <Route
        path="/album"
        element={
          <>
            <Navbar />
            <Album />
          </>
        }
      />
      <Route
        path="/canciones"
        element={
          <>
            <Navbar />
            <Musica />
          </>
        }
      />
      <Route
        path="/ventas"
        element={
          <>
            <Navbar />
            <Ventas />
          </>
        }
      />
      <Route
        path="/usuarios"
        element={
          <>
            <Navbar />
            <Usuarios />
          </>
        }
      />
       <Route
        path="/artistasAdquiridos"
        element={
          <>
            <Navbar />
            <ArtistasAdquiridos />
          </>
        }
      />
      <Route
        path="/perfil"
        element={
          <>
            <Navbar />
            <Perfil />
          </>
        }
      />
      {/* rutas del usuario */}
      <Route
        path="/dashboard2"
        element={
          <>
            <Topbar />
            <Dashboard2 />
          </>
        }
      />
      <Route
        path="/Catalogo"
        element={
          <>
            <Topbar />
            <Catalogo />
          </>
        }
      />
      <Route
        path="/Compras"
        element={
          <>
            <Topbar />
            <Compras />
          </>
        }
      />

      <Route
        path="/perfil2"
        element={
          <>
            <Topbar />
            <Perfil_usuario />
          </>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
