// VISTA — gestión de libros del panel admin
import { useState, useEffect } from 'react'
import { Trash2, Pencil } from 'lucide-react'
import HeaderAdmin from "../../components/HeaderAdmin"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import ModalConfirmacion from "../../components/ModalConfirmacion"
import EncabezadoSeccion from "../../components/EncabezadoSeccion"
import { useNavigate } from "react-router-dom"
import { apiFetch } from '../../services/api'

const POR_PAGINA = 9

function GestionLibros() {
  const navigate = useNavigate()
  const token = localStorage.getItem("jwtToken") || localStorage.getItem("token")

  // HOOK useState — estados locales
  const [lista, setLista]       = useState([])
  const [pagina, setPagina]     = useState(1)
  const [deleteId, setDeleteId] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [error, setError]       = useState(null)

  // Carga los libros desde el backend
  const cargarLibros = async () => {
    setCargando(true)
    setError(null)
    try {
      // PROMESA — apiFetch devuelve una promesa que resuelve con los datos
      const data = await apiFetch('/libros', token)
      setLista(data)
    } catch (err) {
      setError('No se pudieron cargar los libros desde el servidor.')
      console.error(err)
    } finally {
      setCargando(false)
    }
  }

  // HOOK useEffect — ejecuta cargarLibros al montar el componente ([] = sin dependencias)
  useEffect(() => {
    cargarLibros()
  }, [])

  const cerrarModal = () => setDeleteId(null)

  // EVENTO — elimina un libro llamando al backend
  const handleEliminar = async () => {
    try {
      // PROMESA — DELETE al endpoint /libros/:id
      await apiFetch(`/libros/${deleteId}`, token, { method: 'DELETE' })
      // Actualiza la lista local sin recargar todo
      setLista(prev => prev.filter(l => l.idLibro !== deleteId))
      cerrarModal()
    } catch (err) {
      alert('No se pudo eliminar el libro: ' + err.message)
      cerrarModal()
    }
  }

  const totalPaginas = Math.ceil(lista.length / POR_PAGINA)
  const paginados    = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-8 space-y-6">

          {/* COMPONENTE reutilizable — título y botón */}
          <EncabezadoSeccion
            titulo="Gestión de libros"
            textBoton="Nuevo Libro"
            onAccion={() => navigate("/admin/libros/crear")}
          />

          {/* RENDERIZADO CONDICIONAL — estado de carga */}
          {cargando && (
            <p className="text-center text-gray-400 py-12">Cargando libros...</p>
          )}

          {/* RENDERIZADO CONDICIONAL — error */}
          {error && !cargando && (
            <p className="text-center text-red-500 font-bold py-4 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          {!cargando && !error && (
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="border-b border-gray-100">
                      {['ID', 'PORTADA', 'TÍTULO', 'AUTOR/ES', 'GÉNERO', 'PRECIO', 'STOCK', 'ACCIONES'].map(h => (
                        <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-4">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {/* RENDERIZADO DE LISTA con .map() */}
                    {paginados.map(libro => (
                      <tr key={libro.idLibro} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs text-gray-400 font-mono">#{libro.idLibro}</td>

                        {/* Portada — imagen en base64 que devuelve el backend */}
                        <td className="px-6 py-4">
                          {libro.imagen
                            ? <img src={`data:image/jpeg;base64,${libro.imagen}`} alt={libro.titulo} className="w-10 h-14 object-cover rounded shadow-sm" />
                            : <div className="w-10 h-14 bg-purple-50 rounded flex items-center justify-center text-purple-300 text-lg">📖</div>
                          }
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-sm font-semibold text-gray-800">{libro.titulo}</p>
                          <p className="text-xs text-gray-400 mt-0.5">{libro.editorial}</p>
                        </td>

                        {/* Los autores vienen como array de strings */}
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {libro.autores?.join(', ') || '—'}
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-xs font-medium px-3 py-1 rounded-full bg-purple-100 text-purple-700">
                            {libro.genero || '—'}
                          </span>
                        </td>

                        <td className="px-6 py-4 text-sm text-gray-700 font-semibold">
                          {/* RENDERIZADO CONDICIONAL — muestra precio con descuento si existe */}
                          {libro.porcentajeDescuento > 0 ? (
                            <div>
                              <span className="line-through text-gray-400 text-xs">${libro.precio?.toLocaleString('es-AR')}</span>
                              <span className="ml-1 text-purple-700">
                                ${(libro.precio * (1 - libro.porcentajeDescuento / 100)).toLocaleString('es-AR')}
                              </span>
                              <span className="ml-1 text-xs text-green-600">(-{libro.porcentajeDescuento}%)</span>
                            </div>
                          ) : (
                            <span>${libro.precio?.toLocaleString('es-AR')}</span>
                          )}
                        </td>

                        <td className="px-6 py-4">
                          {/* RENDERIZADO CONDICIONAL — alerta si stock bajo */}
                          <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                            libro.stock <= 5
                              ? 'bg-red-100 text-red-600'
                              : 'bg-green-100 text-green-700'
                          }`}>
                            {libro.stock}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <button
                              onClick={() => navigate(`/admin/libros/editar/${libro.idLibro}`)}
                              className="text-gray-400 hover:text-purple-600 transition-colors"
                            >
                              <Pencil size={15} />
                            </button>
                            <button
                              onClick={() => setDeleteId(libro.idLibro)}
                              className="text-gray-400 hover:text-red-500 transition-colors"
                            >
                              <Trash2 size={15} />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}

                    {/* RENDERIZADO CONDICIONAL con && — lista vacía */}
                    {paginados.length === 0 && (
                      <tr>
                        <td colSpan={8} className="px-6 py-16 text-center text-gray-400 text-sm">
                          No hay libros registrados.
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>

              <Pagination
                currentPage={pagina}
                totalPages={totalPaginas}
                totalItems={lista.length}
                itemsPerPage={POR_PAGINA}
                itemLabel="libros"
                onPageChange={setPagina}
              />
            </div>
          )}

          {/* RENDERIZADO CONDICIONAL con && — modal de confirmación */}
          {deleteId && (
            <ModalConfirmacion
              titulo="Eliminar libro"
              mensaje="¿Estás seguro de que querés eliminar este libro? Esta acción no se puede deshacer."
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
