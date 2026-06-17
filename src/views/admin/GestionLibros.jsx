// VISTA — gestión de libros del panel admin
import { useState, useEffect } from 'react'
import { Trash2, Pencil } from 'lucide-react'
import HeaderAdmin from "../../components/HeaderAdmin"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import ModalConfirmacion from "../../components/ModalConfirmacion"
import EncabezadoSeccion from "../../components/EncabezadoSeccion"
import { useNavigate } from "react-router-dom"
import { apiFetch } from "../../services/api" // 👈 Importamos apiFetch

const GENERO_COLORES = {
  'Distopía':  'bg-purple-100 text-purple-700',
  'Fantasía':  'bg-blue-100 text-blue-700',
  'Terror':    'bg-red-100 text-red-700',
  'Clásico':   'bg-yellow-100 text-yellow-700',
  'Romance':   'bg-pink-100 text-pink-700',
  'Infantil':  'bg-green-100 text-green-700',
  'Filosofía': 'bg-orange-100 text-orange-700',
}

const POR_PAGINA = 9

function GestionLibros({ token }) { // 👈 Recibimos el token por props
  const navigate = useNavigate()

  // HOOK useState — estados locales del componente
  const [lista, setLista] = useState([]) // Arranca vacío para la BD
  const [pagina, setPagina] = useState(1)
  const [deleteId, setDeleteId] = useState(null)
  
  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  // Función para cargar los libros desde la base de datos
  const cargarLibros = async () => {
    setCargando(true)
    setError(null)
    try {
      const data = await apiFetch("/libros", token)
      
      // Mapeamos los datos de MySQL lidiando con los objetos anidados de Hibernate
      const librosFormateados = data.map(l => ({
        id: l.id || l.idLibro,
        titulo: l.titulo,
        // Manejo seguro por si autor o género vienen nulos en la relación
        autor: l.autor ? `${l.autor.nombre} ${l.autor.apellido || ''}`.trim() : 'Sin autor',
        genero: l.genero ? l.genero.nombre : 'Sin género',
        precioOriginal: l.precio || 0,
        descuento: l.descuento ? `${l.descuento}%` : '0%'
      }))
      
      setLista(librosFormateados)
    } catch (err) {
      console.error(err)
      setError("No se pudieron cargar los libros desde el servidor.")
    } finally {
      setCargando(false)
    }
  }

  // Hook useEffect para disparar la carga inicial
  useEffect(() => {
    if (token) {
      cargarLibros()
    }
  }, [token])

  const totalPaginas = Math.ceil(lista.length / POR_PAGINA)
  const paginados = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const cerrarModal = () => setDeleteId(null)

  // EVENTO — elimina un libro de la base de datos
  const handleEliminar = async () => {
    try {
      setError(null)
      await apiFetch(`/libros/${deleteId}`, token, {
        method: "DELETE"
      })
      // Filtramos el estado local para no tener que recargar toda la API
      setLista(prev => prev.filter(l => l.id !== deleteId))
      cerrarModal()
    } catch (err) {
      console.error(err)
      setError(err.message || "No se pudo eliminar el libro del servidor.")
      cerrarModal()
    }
  }

  const getPrecio = (libro) => {
    if (libro.descuento && libro.descuento !== '0%') {
      const porcentaje = parseInt(libro.descuento)
      const final = libro.precioOriginal * (1 + porcentaje / 100)
      return `$${final.toLocaleString()} (${libro.descuento})`
    }
    return `$${libro.precioOriginal.toLocaleString()}`
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin token={token} />
        <main className="flex-1 p-8 space-y-6">

          <EncabezadoSeccion
            titulo="Gestión de libros"
            textBoton="Nuevo Libro"
            onAccion={() => navigate("/admin/libros/crear")}
          />

          {error && (
            <p className="text-center text-red-500 font-bold tracking-wide py-2 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {['ID', 'TÍTULO', 'AUTOR', 'GÉNERO', 'PRECIO', 'ACCIONES'].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cargando ? (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-gray-400 text-sm animate-pulse">
                        Cargando libros desde la base de datos...
                      </td>
                    </tr>
                  ) : (
                    paginados.map(libro => (
                      <tr key={libro.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs text-gray-500 font-mono">#{libro.id}</td>
                        <td className="px-6 py-4 text-sm font-semibold text-gray-800">{libro.titulo}</td>
                        <td className="px-6 py-4 text-sm text-gray-500">{libro.autor}</td>
                        <td className="px-6 py-4">
                          <span className={`text-xs font-medium px-3 py-1 rounded-full ${GENERO_COLORES[libro.genero] ?? 'bg-gray-100 text-gray-600'}`}>
                            {libro.genero}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">{getPrecio(libro)}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <button onClick={() => navigate(`/admin/libros/editar/${libro.id}`)} className="text-gray-400 hover:text-purple-600 transition-colors">
                              <Pencil size={15} />
                            </button>
                            <button onClick={() => setDeleteId(libro.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  {!cargando && lista.length === 0 && (
                    <tr>
                      <td colSpan={6} className="px-6 py-16 text-center text-gray-400 text-sm">
                        No hay libros registrados en la base de datos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={pagina} totalPages={totalPaginas} totalItems={lista.length} itemsPerPage={POR_PAGINA} itemLabel="libros" onPageChange={setPagina} />
          </div>

          {deleteId && (
            <ModalConfirmacion
              titulo="Eliminar libro"
              mensaje="¿Estás seguro de que querés eliminar este libro? Esta acción no se puede deshacer de la base de datos."
              onCancelar={cerrarModal}
              onConfirmar={handleEliminar}
            />
          )}

        </main>
      </div>
    </div>
  )
}

export default GestionLibros