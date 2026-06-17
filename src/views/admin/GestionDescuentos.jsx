// VISTA — gestión de descuentos del panel admin
import { useState, useEffect } from 'react'
import HeaderAdmin from "../../components/HeaderAdmin"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import ModalFormulario from "../../components/ModalFormulario"
import ModalConfirmacion from "../../components/ModalConfirmacion"
import EncabezadoSeccion from "../../components/EncabezadoSeccion"
import { Pencil, Trash2 } from 'lucide-react'
import { apiFetch } from "../../services/api" // 👈 Importamos apiFetch

const POR_PAGINA = 9
const inputClass = "w-full border border-purple-400 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-100"

function GestionDescuentos({ token }) { // 👈 Recibimos el token por props

  // HOOK useState — estados locales del componente
  const [lista, setLista] = useState([]) // Arranca vacío para la BD
  const [librosDB, setLibrosDB] = useState([]) // Para el buscador de sugerencias
  const [pagina, setPagina] = useState(1)
  const [modal, setModal] = useState(null)
  const [editItem, setEditItem] = useState(null)
  const [deleteId, setDeleteId] = useState(null)
  
  // Estados para el formulario
  const [libroSeleccionado, setLibroSeleccionado] = useState(null) // Guardará el objeto completo {id, titulo}
  const [libroInput, setLibroInput] = useState('') // El texto del input
  const [porcentaje, setPorcentaje] = useState('')
  const [activo, setActivo] = useState(true)
  const [sugerencias, setSugerencias] = useState([])
  const [mostrarSugerencias, setMostrarSugerencias] = useState(false)

  const [cargando, setCargando] = useState(false)
  const [error, setError] = useState(null)

  // 1. Cargar descuentos y libros desde la API
  const cargarDatos = async () => {
    setCargando(true)
    setError(null)
    try {
      const [dataDescuentos, dataLibros] = await Promise.all([
        apiFetch("/descuentos", token),
        apiFetch("/libros", token)
      ])

      // Mapeamos los descuentos de la base de datos
      const descFormateados = dataDescuentos.map(d => ({
        id: d.id || d.idDescuento,
        libroId: d.libro ? (d.libro.id || d.libro.idLibro) : null,
        libroTitulo: d.libro ? d.libro.titulo : 'Libro eliminado o sin asignar',
        porcentaje: typeof d.porcentaje === 'string' ? d.porcentaje : `${d.porcentaje}%`,
        activo: d.activo ?? true
      }))

      setLista(descFormateados)
      setLibrosDB(dataLibros)
    } catch (err) {
      console.error(err)
      setError("No se pudieron sincronizar los datos con el servidor.")
    } finally {
      setCargando(false)
    }
  }

  useEffect(() => {
    if (token) {
      cargarDatos()
    }
  }, [token])

  const totalPaginas = Math.ceil(lista.length / POR_PAGINA)
  const paginados = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  const abrirCrear = () => { 
    setLibroInput('')
    setLibroSeleccionado(null)
    setPorcentaje('')
    setActivo(true)
    setSugerencias([])
    setMostrarSugerencias(false)
    setEditItem(null)
    setModal('crear') 
  }

  const abrirEditar = (d) => { 
    setLibroInput(d.libroTitulo)
    setLibroSeleccionado({ id: d.libroId, titulo: d.libroTitulo })
    setPorcentaje(d.porcentaje.replace('%', ''))
    setActivo(d.activo)
    setSugerencias([])
    setMostrarSugerencias(false)
    setEditItem(d)
    setModal('editar') 
  }

  const cerrarModal = () => { setModal(null); setDeleteId(null) }

  // Buscador de libros dinámico sobre los datos reales de MySQL
  const handleLibroChange = (val) => {
    setLibroInput(val)
    if (val.trim().length > 0) {
      const filtrados = librosDB.filter(libro => 
        libro.titulo.toLowerCase().includes(val.toLowerCase())
      )
      setSugerencias(filtrados)
      setMostrarSugerencias(true)
    } else {
      setSugerencias([])
      setMostrarSugerencias(false)
      setLibroSeleccionado(null)
    }
  }

  const seleccionarSugerencia = (libroObj) => { 
    setLibroInput(libroObj.titulo)
    setLibroSeleccionado({ id: libroObj.id || libroObj.idLibro, titulo: libroObj.titulo })
    setMostrarSugerencias(false) 
  }

  // 2. Crear o Editar un descuento en la base de datos
  const handleAceptar = async () => {
    if (!libroSeleccionado || !porcentaje.trim()) return

    // Limpiamos el porcentaje para mandarlo como número o string limpio según tu backend
    const valorPorcentaje = parseInt(porcentaje.replace('%', ''))

    const descuentoBody = {
      idLibro: libroSeleccionado.id,
      porcentaje: valorPorcentaje,
      activo: activo
    }

    try {
      setError(null)
      if (modal === 'editar' && editItem) {
        // Petición PUT para actualizar
        await apiFetch(`/descuentos/${editItem.id}`, token, {
          method: "PUT",
          body: JSON.stringify(descuentoBody)
        })
      } else {
        // Petición POST para guardar nuevo
        await apiFetch("/descuentos", token, {
          method: "POST",
          body: JSON.stringify(descuentoBody)
        })
      }
      // Recargamos la lista completa para reflejar los cambios de IDs generados por MySQL
      await cargarDatos()
      cerrarModal()
    } catch (err) {
      console.error(err)
      setError(err.message || "Error al procesar el descuento en el servidor.")
      cerrarModal()
    }
  }

  // 3. Eliminar un descuento de la base de datos
  const handleEliminar = async () => {
    try {
      setError(null)
      await apiFetch(`/descuentos/${deleteId}`, token, {
        method: "DELETE"
      })
      setLista(prev => prev.filter(g => g.id !== deleteId))
      cerrarModal()
    } catch (err) {
      console.error(err)
      setError(err.message || "No se pudo eliminar el descuento.")
      cerrarModal()
    }
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin token={token} />
        <main className="flex-1 p-8 space-y-6">

          <EncabezadoSeccion
            titulo="Gestión de descuentos"
            textBoton="Nuevo Descuento"
            onAccion={abrirCrear}
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
                    {["ID", "LIBRO", "PORCENTAJE", "ESTADO", "ACCIONES"].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-widest px-6 py-4">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {cargando ? (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm animate-pulse">
                        Cargando descuentos desde la base de datos...
                      </td>
                    </tr>
                  ) : (
                    paginados.map(descuento => (
                      <tr key={descuento.id} className="hover:bg-purple-50/30 transition-colors">
                        <td className="px-6 py-4 text-xs text-gray-500 font-mono">#{descuento.id}</td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="w-2 h-2 rounded-full bg-[#7B5B98] flex-shrink-0" />
                            <span className="text-sm font-semibold text-gray-800">{descuento.libroTitulo}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">{descuento.porcentaje}</td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border ${descuento.activo ? 'bg-emerald-50 text-emerald-700 border-emerald-200' : 'bg-gray-50 text-gray-500 border-gray-200'}`}>
                            <span className={`w-1.5 h-1.5 rounded-full ${descuento.activo ? 'bg-emerald-500' : 'bg-gray-400'}`} />
                            {descuento.activo ? 'Activo' : 'Inactivo'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <button onClick={() => abrirEditar(descuento)} className="text-gray-400 hover:text-purple-600 transition-colors"><Pencil size={15} /></button>
                            <button onClick={() => setDeleteId(descuento.id)} className="text-gray-400 hover:text-red-500 transition-colors"><Trash2 size={15} /></button>
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                  {!cargando && lista.length === 0 && (
                    <tr>
                      <td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">
                        No hay descuentos registrados en la base de datos.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
            <Pagination currentPage={pagina} totalPages={totalPaginas} totalItems={lista.length} itemsPerPage={POR_PAGINA} itemLabel="descuentos" onPageChange={setPagina} />
          </div>

          {modal && (
            <ModalFormulario
              titulo={modal === 'editar' ? 'Editar Descuento' : 'Nuevo Descuento'}
              onCerrar={cerrarModal}
              onAceptar={handleAceptar}
              deshabilitado={!libroInput.trim() || !porcentaje.trim() || !libroSeleccionado}
            >
              <div className="relative">
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Libro</label>
                <input
                  autoFocus
                  className={inputClass}
                  placeholder="Escribí para buscar libro de la base de datos..."
                  value={libroInput}
                  onChange={e => handleLibroChange(e.target.value)}
                  onFocus={() => libroInput.trim().length > 0 && setMostrarSugerencias(true)}
                  onBlur={() => setTimeout(() => setMostrarSugerencias(false), 250)}
                />
                {mostrarSugerencias && sugerencias.length > 0 && (
                  <ul className="absolute left-0 right-0 top-[calc(100%+4px)] z-50 max-h-40 bg-white border border-gray-200 rounded-lg shadow-lg overflow-y-auto text-sm divide-y divide-gray-50">
                    {sugerencias.map((opcion) => (
                      <li 
                        key={opcion.id || opcion.idLibro} 
                        onClick={() => seleccionarSugerencia(opcion)} 
                        className="px-3 py-2 text-xs text-gray-700 hover:bg-purple-50 cursor-pointer"
                      >
                        {opcion.titulo}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Porcentaje de descuento</label>
                <input type="number" className={inputClass} placeholder="Ej: 15" value={porcentaje} onChange={e => setPorcentaje(e.target.value)} onKeyDown={e => e.key === 'Enter' && handleAceptar()} />
              </div>
              <div>
                <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">Estado del descuento</label>
                <select className={`${inputClass} bg-white`} value={activo} onChange={e => setActivo(e.target.value === 'true')}>
                  <option value="true">Activo</option>
                  <option value="false">Inactivo</option>
                </select>
              </div>
            </ModalFormulario>
          )}

          {deleteId && (
            <ModalConfirmacion
              titulo="Eliminar descuento"
              mensaje="¿Estás seguro de que querés eliminar este descuento? Esta acción lo borrará de la base de datos."
              onCancelar={cerrarModal}
              onConfirmar={handleEliminar}
            />
          )}

        </main>
      </div>
    </div>
  )
}

export default GestionDescuentos