// COMPONENTE — Vista de gestión de géneros del panel de administrador
import { useState } from 'react'
import { Edit2, Trash2, Plus, X, Pencil } from 'lucide-react'
import HeaderAdmin from "../../components/HeaderAdmin";
import Sidebar from "../../components/Sidebar";
import Pagination from "../../components/Pagination";

// DATOS DE PRUEBA — reemplazá esto por una llamada a tu API
const autoresIniciales = [
  { id: '#AUT-1', nombre: 'Jorge Luis Borges',           libros: 8  },
  { id: '#AUT-2', nombre: 'Pablo Neruda',             libros: 6 },
  { id: '#AUT-3', nombre: 'J.K. Rowling',              libros: 7  },
  { id: '#AUT-4', nombre: 'Suzanne Collins',        libros: 4  },
  { id: '#AUT-5', nombre: 'Julio Verne', libros: 3 },
  { id: '#AUT-6', nombre: 'Stephen King',              libros: 12  },
  { id: '#AUT-7', nombre: 'Mario Benedetti',     libros: 2  },
  { id: '#AUT-8', nombre: 'Gabriel García Márquez',           libros: 5  },
  { id: '#AUT-9', nombre: 'Jane Austen',           libros: 8 },
]

const POR_PAGINA = 9

function GestionAutores() {

  // ESTADOS — cada uno controla una parte de la UI
  // (PDF: Estados locales y props - Estado)
  const [lista, setLista]       = useState(autoresIniciales)
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

  const abrirEditar = (autor) => {
    setNombre(autor.nombre)
    setEditItem(autor)
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
      const nuevoId = `#AUT-${lista.length + 1}`
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

          <h1 className="text-2xl font-bold text-gray-800">Gestión de Autores</h1>

          {/* Tabla principal */}
          <div className="bg-white rounded-2xl shadow-sm overflow-hidden">

            {/* Botón nuevo género */}
            <div className="flex justify-end px-5 py-4 border-b border-gray-100">
              <button
                onClick={abrirCrear}
                className="flex items-center gap-2 px-4 py-2 rounded-lg text-white text-sm font-semibold hover:opacity-90 transition-opacity bg-[#2d2660]"
              >
                <Plus size={14} />
                NUEVO AUTOR
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
                  {paginados.map((autor) => (
                    <tr key={autor.id} className="border-b border-gray-50 hover:bg-gray-50/60 transition-colors">

                      <td className="px-5 py-3 text-xs text-gray-500 font-mono">{autor.id}</td>

                      <td className="px-4 py-3">
                        <span className="inline-flex items-center gap-1.5">
                          <span className="w-2 h-2 rounded-full bg-purple-400 flex-shrink-0" />
                          <span className="text-xs text-gray-800 font-medium">{autor.nombre}</span>
                        </span>
                      </td>

                      <td className="px-4 py-3 text-xs text-gray-600">{autor.libros}</td>

                      <td className="px-4 py-3">
                        <div className="flex items-center gap-3">
                          {/* EVENTO onClick — abre el modal de editar con los datos del género */}
                          <button onClick={() => abrirEditar(autor)} className="text-gray-400 hover:text-purple-600 transition-colors">
                            <Pencil size={15} />
                          </button>
                          <button onClick={() => setDeleteId(autor.id)} className="text-gray-400 hover:text-red-500 transition-colors">
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
              itemLabel="autores"
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
                    {modal === 'editar' ? 'Editar Autor' : 'Nuevo Autor'}
                  </span>
                  <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-[10px] font-semibold uppercase tracking-wider text-gray-500 mb-1">
                      Nombre del autor
                    </label>
                    <input
                      autoFocus
                      className="w-full border border-purple-400 rounded-lg px-3 py-2 text-sm text-gray-700 outline-none focus:ring-2 focus:ring-purple-100"
                      placeholder="Ej: Jorge Luis Borges"
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
                  <span className="font-semibold text-gray-800">Eliminar autor</span>
                  <button onClick={cerrarModal} className="text-gray-400 hover:text-gray-600">
                    <X size={16} />
                  </button>
                </div>

                <p className="text-sm text-gray-600 mb-5">
                  ¿Estás seguro de que querés eliminar este autor? Esta acción no se puede deshacer.
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

export default GestionAutores