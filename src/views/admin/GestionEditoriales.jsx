// COMPONENTE — Vista de gestión de géneros del panel de administrador
import { useState } from 'react'
import { Edit2, Trash2, Plus, X, Pencil } from 'lucide-react'
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";

// DATOS DE PRUEBA — reemplazá esto por una llamada a tu API
const editorialesIniciales = [
  { id: '#ED-1', nombre: 'Penguin',           libros: 87  },
  { id: '#ED-2', nombre: 'Edificio',             libros: 142 },
  { id: '#ED-3', nombre: 'Bolivia Editorial',              libros: 95  },
  { id: '#ED-4', nombre: 'Novelle',        libros: 63  },
  { id: '#ED-5', nombre: 'Classic', libros: 54  },
  { id: '#ED-6', nombre: 'Italic',              libros: 38  },
  { id: '#ED-7', nombre: 'Ediedi',     libros: 71  },
  { id: '#ED-8', nombre: 'Ejemplar',           libros: 29  },
  { id: '#ED-9', nombre: 'Librástica',           libros: 46  },
]

const POR_PAGINA = 9

function GestionEditoriales() {

  // ESTADOS — cada uno controla una parte de la UI
  // (PDF: Estados locales y props - Estado)
  const [lista, setLista]       = useState(editorialesIniciales)
  const [pagina, setPagina]     = useState(1)
  const [modal, setModal]       = useState(null)   // null | 'crear' | 'editar'
  const [editItem, setEditItem] = useState(null)   // género que se está editando
  const [nombre, setNombre]     = useState('')
  const [deleteId, setDeleteId] = useState(null)   // id del género a eliminar

  // PAGINACIÓN — calcula qué items mostrar según la página actual
  const totalPaginas = Math.ceil(lista.length / POR_PAGINA)
  const paginados = lista.slice((pagina - 1) * POR_PAGINA, pagina * POR_PAGINA)

  // HANDLERS — funciones que manejan eventos de la UI
  const abrirCrear = () => {
    setNombre('')
    setEditItem(null)
    setModal('crear')
  }

  const abrirEditar = (editorial) => {
    setNombre(editorial.nombre)
    setEditItem(editorial)
    setModal('editar')
  }

  const cerrarModal = () => {
    setModal(null)
    setDeleteId(null)
  }

  // Crea o edita un género según el modal abierto
  const handleAceptar = () => {
    if (!nombre.trim()) return

    if (modal === 'editar' && editItem) {
      // EDITAR — reemplaza el género con el mismo id
      setLista(lista.map(g =>
        g.id === editItem.id ? { ...g, nombre: nombre.trim() } : g
      ))
    } else {
      // CREAR — agrega un nuevo género al array
      const nuevoId = `#ED-${lista.length + 1}`
      setLista([...lista, { id: nuevoId, nombre: nombre.trim(), libros: 0 }])
    }

    cerrarModal()
  }

  // ELIMINAR — filtra el array quitando el género con ese id
  const handleEliminar = () => {
    setLista(lista.filter(g => g.id !== deleteId))
    cerrarModal()
  }

  return (
    // LAYOUT — Sidebar fija a la izquierda, contenido a la derecha
    <div className="flex min-h-screen bg-[#f5f2ec]">

      {/* COMPONENTE Sidebar — navegación lateral */}
      <Sidebar />

      {/* Columna principal */}
      <div className="flex-1 flex flex-col ml-44">

        {/* COMPONENTE HeaderAdmin — barra superior */}
        <HeaderAdmin />

        {/* Contenido de la página */}
        <main className="flex-1 p-6 space-y-5 mt-14">

          <h1 className="text-2xl font-bold text-gray-800">Gestión de Editoriales</h1>

          {/* Tabla principal */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Botón nuevo género */}
            <div className="flex justify-end px-5 py-4 border-b border-gray-100">
              <button
                onClick={abrirCrear}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity bg-[#2d2660]"
              >
                <Plus size={14} />
                NUEVA EDITORIAL
              </button>
            </div>

            {/* Tabla */}
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="text-[10px] uppercase tracking-wider text-gray-400 border-b border-gray-100">
                    <th className="px-5 py-3 text-left">ID</th>
                    <th className="px-4 py-3 text-left">Nombre</th>
                    <th className="px-4 py-3 text-left">Libros</th>
                    <th className="px-4 py-3 text-left">Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {/* RENDERIZADO DE LISTA con .map() */}
                  {paginados.map((editorial) => (
                    <tr key={editorial.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">

                      <td className="px-5 py-3 text-xs text-gray-500 font-mono">{editorial.id}</td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                          <span className="text-xs text-gray-800 font-medium">{editorial.nombre}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600">{editorial.libros}</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* EVENTO onClick — abre el modal de editar con los datos del género */}
                          <button onClick={() => abrirEditar(editorial)} className="text-gray-400 hover:text-purple-600 transition-colors">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => setDeleteId(editorial.id)} className="text-gray-400 hover:text-red-500 transition-colors">
                            <Trash2 size={15} />
                          </button>
                        </div>
                      </td>

                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* COMPONENTE Pagination — recibe los datos necesarios como props */}
            <Pagination
              currentPage={pagina}
              totalPages={totalPaginas}
              totalItems={lista.length}
              itemsPerPage={POR_PAGINA}
              itemLabel="editoriales"
              onPageChange={setPagina}
            />

          </div>

          {/* Modal crear / editar
              RENDERIZADO CONDICIONAL con && */}
          {modal && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 backdrop-blur-sm bg-[#2d1f5e]/70" onClick={cerrarModal} />
              <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-10">

                <div className="flex items-center justify-between mb-5">
                  {/* OPERADOR TERNARIO — título cambia según si es crear o editar */}
                  <span className="font-semibold text-gray-800">
                    {modal === 'editar' ? 'Editar Editorial' : 'Nueva Editorial'}
                  </span>
                  <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Nombre de la editorial
                    </label>
                    <input
                      autoFocus
                      className="w-full border border-purple-400 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-100"
                      placeholder="Ej: Argentina Editorial"
                      value={nombre}
                      onChange={e => setNombre(e.target.value)}
                      onKeyDown={e => e.key === 'Enter' && handleAceptar()}
                    />
                  </div>
                  <div className="flex justify-end gap-3">
                    <button onClick={cerrarModal} className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase tracking-wider">
                      CANCELAR
                    </button>
                    <button
                      onClick={handleAceptar}
                      disabled={!nombre.trim()}
                      className="px-5 py-2 rounded-lg text-white text-xs font-semibold uppercase hover:opacity-90 disabled:opacity-40 transition-opacity bg-[#2d2660]"
                    >
                      ACEPTAR
                    </button>
                  </div>
                </div>

              </div>
            </div>
          )}

          {/* Modal confirmación de borrado
              RENDERIZADO CONDICIONAL con && */}
          {deleteId && (
            <div className="fixed inset-0 z-50 flex items-center justify-center">
              <div className="absolute inset-0 backdrop-blur-sm bg-[#2d1f5e]/70" onClick={cerrarModal} />
              <div className="relative bg-white rounded-xl shadow-2xl w-full max-w-sm p-6 z-10">

                <div className="flex items-center justify-between mb-4">
                  <span className="font-semibold text-gray-800">Eliminar editorial</span>
                  <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-5">
                  ¿Estás seguro de que querés eliminar esta editorial? Esta acción no se puede deshacer.
                </p>

                <div className="flex justify-end gap-3">
                  <button onClick={cerrarModal} className="px-4 py-2 text-xs font-semibold text-gray-500 hover:text-gray-700 uppercase tracking-wider">
                    CANCELAR
                  </button>
                  <button onClick={handleEliminar} className="px-5 py-2 rounded-lg text-white text-xs font-semibold uppercase bg-red-500 hover:bg-red-600 transition-colors">
                    ELIMINAR
                  </button>
                </div>

              </div>
            </div>
          )}

        </main>
      </div>
    </div>
  )
}

export default GestionEditoriales