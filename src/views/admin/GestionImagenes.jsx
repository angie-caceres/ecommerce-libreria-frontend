import { useState } from "react";
import { Plus, Image, Trash2 } from "lucide-react";
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";

export default function GestionImagenes() {
  const [imagenes, setImagenes] = useState([
    {
      id: 1,
      nombre: "1984",
      url: "/libros/1984.png",
    },
    {
      id: 2,
      nombre: "El Hobbit",
      url: "/libros/elhobbit.png",
    },
    {
      id: 3,
      nombre: "Amanecer en la cosecha",
      url: "/libros/juegos.png",
    },
  ]);

  const [nombre, setNombre] = useState("");
  const [url, setUrl] = useState("");
  const [mensaje, setMensaje] = useState("");

  const handleAgregarImagen = (e) => {
    e.preventDefault();

    if (!nombre.trim() || !url.trim()) {
      setMensaje("Completá todos los campos");
      return;
    }

    const nuevaImagen = {
      id: Date.now(),
      nombre,
      url,
    };

    setImagenes([...imagenes, nuevaImagen]);

    setNombre("");
    setUrl("");
    setMensaje("Imagen cargada correctamente");
  };

  const handleEliminar = (id) => {
    setImagenes(imagenes.filter((imagen) => imagen.id !== id));
  };

  return (
    <div className="min-h-screen bg-[#f7f4ef] flex font-sans">
      <Sidebar />

      <main className="flex-1 ml-56">
        <HeaderAdmin titulo="Gestión de Imágenes" />

        <div className="p-8 bg-[#f7f4ef] min-h-screen">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-4xl text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Gestión de Imágenes
              </h1>
              <p className="text-gray-500 text-sm">
                Administrá las imágenes disponibles para los productos
              </p>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-8">
            <h2 className="text-2xl text-gray-900 mb-4" style={{ fontFamily: "'Playfair Display', serif" }}>
              Cargar nueva imagen
            </h2>

            <form
              onSubmit={handleAgregarImagen}
              className="grid grid-cols-1 md:grid-cols-3 gap-4"
            >
              <input
                type="text"
                placeholder="Nombre de la imagen"
                value={nombre}
                onChange={(e) => setNombre(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm"
              />

              <input
                type="text"
                placeholder="URL o ruta de la imagen"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                className="px-4 py-3 rounded-lg bg-gray-50 border border-gray-200 outline-none text-sm"
              />

              <button
                type="submit"
                className="flex items-center justify-center gap-2 px-4 py-3 rounded-full bg-[#CBAAE9] text-white text-sm font-semibold hover:opacity-90"
              >
                <Plus size={18} />
                Cargar imagen
              </button>
            </form>

            {mensaje && (
              <p className="mt-4 text-sm font-semibold text-[#7b5b99]">
                {mensaje}
              </p>
            )}
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-100">
            <div className="p-5 border-b border-gray-100">
              <h2 className="text-2xl text-gray-900" style={{ fontFamily: "'Playfair Display', serif" }}>
                Imágenes cargadas
              </h2>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6 p-6">
              {imagenes.map((imagen) => (
                <div
                  key={imagen.id}
                  className="border border-gray-100 rounded-xl p-4 shadow-sm"
                >
                  <div className="h-40 bg-gray-100 rounded-lg flex items-center justify-center overflow-hidden mb-4">
                    {imagen.url ? (
                      <img
                        src={imagen.url}
                        alt={imagen.nombre}
                        className="w-full h-full object-cover"
                      />
                    ) : (
                      <Image size={32} className="text-gray-400" />
                    )}
                  </div>

                  <h3 className="font-bold text-gray-800 text-sm">
                    {imagen.nombre}
                  </h3>

                  <button
                    onClick={() => handleEliminar(imagen.id)}
                    className="flex items-center gap-2 text-red-500 text-xs font-semibold hover:underline"
                  >
                    <Trash2 size={14} />
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}