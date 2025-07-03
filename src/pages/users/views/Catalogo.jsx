import { useState } from "react"; // Hook para manejar el estado en componentes funcionales

const Catalogo = () => {
  // Estado para almacenar las URLs de las imágenes subidas por el usuario
  const [imageUrls, setImageUrls] = useState(Array(24).fill(null));
  const [imageNames, setImageNames] = useState(Array(24).fill("")); // Agregamos nombres sin sanitización

  const handleImageUpload = (index, event) => {
    const file = event.target.files[0]; // Obtiene el archivo subido
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedImageUrls = [...imageUrls];
        updatedImageUrls[index] = reader.result; // Guarda la URL en el estado
        setImageUrls(updatedImageUrls);

        const updatedImageNames = [...imageNames];
        updatedImageNames[index] = file.name; // Guarda el nombre del archivo sin sanitizar (XSS)
        setImageNames(updatedImageNames);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
     // Contenedor principal 
    <div className="flex-1 pl-0 md:pl-72 cursor-pointer">
      <main className="flex-1 p-6 sm:p-8 bg-black">
        {/* Banner de bienvenida */}
        <div
          className="w-full bg-cover bg-center rounded-2xl p-6"
          style={{ backgroundImage: "url('/img/dc.jpg')", height: "80px" }}
        >
          <h1 className="text-3xl font-bold text-white">Bienvenido</h1>
        </div>

        <section className="mt-6">
          {/* Título referente a la vista */}
          <h2 className="text-3xl font-bold text-white mb-4">Explorar todo</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6">
            {/* Datos cargados que se visualizan  */}
            {[
              { title: "Música", color: "bg-pink-600" },
              { title: "Podcasts", color: "bg-green-700" },
              { title: "Eventos en directo", color: "bg-purple-700" },
              { title: "Especialmente para ti", color: "bg-blue-700" },
              { title: "Novedades", color: "bg-green-500" },
              { title: "Latina", color: "bg-pink-500" },
              { title: "Pop", color: "bg-blue-500" },
              { title: "Hip hop", color: "bg-gray-700" },
              { title: "Cumbia", color: "bg-yellow-500" },
              { title: "Listas de éxitos", color: "bg-indigo-600" },
              { title: "Éxitos en pódcasts", color: "bg-teal-600" },
              { title: "Contenidos educativos", color: "bg-orange-500" },
              { title: "Documentales", color: "bg-gray-800" },
              { title: "Humor", color: "bg-rose-600" },
              { title: "Rock", color: "bg-red-600" },
            ].map((item, index) => (
              <div
                key={index}
                className={`${item.color} relative rounded-lg p-4 h-36 md:h-48 lg:h-60 flex items-end transition-transform transform hover:scale-105`}
              >
                <h3 className="text-white font-semibold text-lg">{item.title}</h3>
                {/* Imagen del artista */}
                <div
                  className="relative w-full h-full bg-cover bg-center rounded-lg transition-transform transform group-hover:scale-110"
                  style={{
                    backgroundImage: imageUrls[index] ? `url(${imageUrls[index]})` : "none",
                  }}
                >
                  <input
                    type="file"
                    className="absolute inset-0 opacity-0 cursor-pointer"
                    onChange={(e) => handleImageUpload(index, e)}
                  />
                  {!imageUrls[index] && (
                    <div className="absolute inset-0 flex justify-center items-center text-white opacity-70">
                      <span>Sube la imagen</span>
                    </div>
                  )}
                </div>
                {/* XSS: Mostramos el nombre del archivo sin sanitización */}
                <p dangerouslySetInnerHTML={{ __html: imageNames[index] }} className="text-white mt-2" />
                <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 rotate-12 w-16 h-20 bg-gray-900 opacity-50 rounded-lg" />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Catalogo;