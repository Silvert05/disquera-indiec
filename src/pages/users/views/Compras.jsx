import { useState } from "react";  // Hook para manejar el estado en componentes funcionales

const Compras = () => {
  // Definimos un estado con un arreglo de compras predefinidas
  const [compras] = useState([
    {
      id: 1,
      nombre: "Cancion 1",
      artista: "Artista A",
      precio: "$2.99",
      fecha: "2024-01-31",
      imagen: "/img/imagen1.jpg",
    },
    {
      id: 2,
      nombre: "Cancion 2",
      artista: "Artista B",
      precio: "$3.49",
      fecha: "2024-01-30",
      imagen: "/img/imagen1.jpg",
    },
    {
      id: 3,
      nombre: "Cancion 3",
      artista: "Artista C",
      precio: "$1.99",
      fecha: "2024-01-28",
      imagen: "/img/imagen1.jpg",
    },
    {
      id: 4,
      nombre: "Cancion 4",
      artista: "Artista D",
      precio: "$4.99",
      fecha: "2024-01-15",
      imagen: "/img/imagen1.jpg",
    },
    {
      id: 5,
      nombre: "Cancion 5",
      artista: "Artista E",
      precio: "$2.00",
      fecha: "2024-01-20",
      imagen: "/img/imagen1.jpg",
    },
    {
      id: 6,
      nombre: "Cancion 6",
      artista: "Artista F",
      precio: "$1.00",
      fecha: "2024-01-24",
      imagen: "/img/imagen1.jpg",
    },
  ]);

  return (
    <div className="flex-1 ml-10 md:ml-72 cursor-pointer">
      {/* Contenedor principal de la sección de compras */}
      <div className="flex flex-col justify-start items-center min-h-screen px-4 pt-4 bg-black w-full">
        {/* Banner de encabezado */}
        <div
          className="w-full bg-cover bg-center rounded-2xl shadow-lg p-8"
          style={{
            backgroundImage: "url(/img/dc.jpg)",
            height: "100px",
          }}
        >
          <h1 className="text-center text-white text-xl md:text-2xl font-semibold leading-tight">
            Compras o Factura
          </h1>
        </div>

        {/* Sección del historial de compras */}
        <div className="w-full bg-cover bg-center rounded-2xl shadow-lg p-6 bg-black mt-8 overflow-x-auto">
          <h2 className="text-white text-lg font-semibold mb-4">
            Historial de Compras
          </h2>
          <div className="w-full overflow-x-auto">
            <table className="w-full text-white border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-gray-700">
                  <th className="py-2 text-left">Imagen</th>   {/* Variables cargadas en la vista */}
                  <th className="py-2 text-left">Canción</th>  {/* Variables cargadas en la vista */}
                  <th className="py-2 text-left">Artista</th>  {/* Variables cargadas en la vista */}
                  <th className="py-2 text-left">Precio</th>   {/* Variables cargadas en la vista */}
                  <th className="py-2 text-left">Fecha</th>    {/* Variables cargadas en la vista */}
                  <th className="py-2 text-left">Factura</th>  {/* Variables cargadas en la vista */}
                </tr>
              </thead>
              <tbody>
                {compras.map((compra) => (
                  <tr key={compra.id} className="border-b border-gray-700">
                    <td className="py-2">
                      <img
                        src={compra.imagen}
                        alt={compra.nombre}
                        className="w-16 h-16 object-cover rounded"
                      />
                    </td>
                    <td className="py-2">
                      {/* XSS Vulnerability: Renderizamos el nombre de la canción sin sanitizar */}
                      <span
                        dangerouslySetInnerHTML={{ __html: compra.nombre }}
                      />
                    </td>
                    <td className="py-2">{compra.artista}</td>
                    <td className="py-2">{compra.precio}</td>
                    <td className="py-2">{compra.fecha}</td>
                    <td className="py-2">
                      <button className="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600">
                        Descargar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Compras;