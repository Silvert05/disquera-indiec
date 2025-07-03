const Dashboard2 = () => {
  return (
    <div className="flex-1 ml-10 md:ml-72 cursor-pointer  bg-black min-h-screen">
      {/* Contenido principal */}
      <main className="flex-1 p-6 overflow-y-auto bg-black">
        {/* Encabezado */}
        <div
          className="w-full bg-cover bg-center rounded-2xl shadow-lg p-6"
          style={{ backgroundImage: `url("/img/dc.jpg")`, height: "80px" }}
        >
          <h1 className="text-3xl font-bold text-white">Bienvenido </h1>
        </div>

        {/* Sección de playlists o contenido */}
        <section className="mt-6 ml-12">
          <h2 className="text-xl font-semibold text-white mb-4">
            Tus listas de reproducción
          </h2>

          {/* Botones al lado */}
          <div className="flex space-x-4 mb-6">
            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-400">
              Inicio
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-400">
              Catálogo
            </button>
            <button className="bg-gray-700 text-white py-2 px-4 rounded hover:bg-green-400">
              Compras
            </button>
          </div>

          {/* Sección de listas y portadas */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {/* Lista 1 */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white">Lista 1</h3>
            </div>
            {/* Lista 2 */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white">Lista 2</h3>
            </div>
            {/* Lista 3 */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white">Lista 3</h3>
            </div>
            {/* Lista 4 */}
            <div className="bg-gray-800 p-4 rounded-lg">
              <h3 className="font-semibold text-white">Lista 4</h3>
            </div>
          </div>

          {/* Sección de cuadros debajo de cada lista */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
            {/* Cuadro debajo de Lista 1 */}
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 1"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"  
                alt="Portada 1" 
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            {/* Cuadro debajo de Lista 2 */}
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 2"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 2"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            {/* Cuadro debajo de Lista 3 */}
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 3"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 3"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            {/* Cuadro debajo de Lista 4 */}
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 4"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
            <div className="group bg-gray-800 p-6 rounded-lg h-48 relative overflow-hidden">
              <img
                src="/img/imagen2.jpg"
                alt="Portada 4"
                className="absolute inset-0 w-full h-full object-cover rounded-lg"
              />
              {/* Icono de Play */}
              <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <svg
                  className="w-12 h-12 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5.25 5.75l13.5 6.25-13.5 6.25V5.75z"
                  ></path>{" "}
                </svg>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Dashboard2;
