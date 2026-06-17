// VISTA — gestión de pedidos del panel admin
import { useEffect, useState } from 'react'
import HeaderAdmin from "../../components/HeaderAdmin"
import Sidebar from "../../components/Sidebar"
import Pagination from "../../components/Pagination"
import FiltrosBotones from "../../components/FiltrosBotones"
import EncabezadoSeccion from "../../components/EncabezadoSeccion"

const ITEMS_POR_PAGINA = 15
const AVATAR_COLORS = ["#CBAAE9"]

export default function VerPedidos() {

  // HOOK useState — estados locales del componente
  const [pedidos, setPedidos] = useState([])
  const [currentPage, setCurrentPage] = useState(1)
  const [filtroEstado, setFiltroEstado] = useState("TODOS")
  useEffect(() => {
    const obtenerPedidos = async () => {
      const token = localStorage.getItem("jwtToken") || localStorage.getItem("token")

      const response = await fetch("http://localhost:4002/ordenes", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })

      console.log("STATUS PEDIDOS:", response.status)

      if (response.ok) {
        const data = await response.json()
        console.log("PEDIDOS BACKEND:", data)
        setPedidos(data)
      }
    }

    obtenerPedidos()
  }, [])

  const pedidosFiltrados = pedidos.filter(p =>
    filtroEstado === "TODOS" || p.estado === filtroEstado
  )
  const totalPages = Math.max(1, Math.ceil(pedidosFiltrados.length / ITEMS_POR_PAGINA))
  const pedidosPagina = pedidosFiltrados.slice((currentPage - 1) * ITEMS_POR_PAGINA, currentPage * ITEMS_POR_PAGINA)

  const handleFiltro = (estado) => { setFiltroEstado(estado); setCurrentPage(1) }

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-8 space-y-6">

          {/* COMPONENTE reutilizable — título sin botón
  */}
          <EncabezadoSeccion titulo="Todos los pedidos" />

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
            <div className="p-4 border-b border-gray-100">
              {/* COMPONENTE reutilizable — botones de filtro
  */}
              <FiltrosBotones
                opciones={["TODOS", "CONFIRMADA", "PENDIENTE"]}
                activo={filtroEstado}
                onChange={handleFiltro}
              />
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100">
                    {["ID", "CLIENTE", "PRODUCTOS", "TOTAL", "ESTADO"].map(h => (
                      <th key={h} className="text-left text-xs font-bold text-gray-400 uppercase tracking-wider px-6 py-3.5">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {/* RENDERIZADO DE LISTA con .map()
  */}
                  {pedidosPagina.map(pedido => {
                    const iniciales = pedido.nombreUsuario
                      ? pedido.nombreUsuario
                          .split(" ")
                          .map(nombre => nombre[0])
                          .join("")
                          .toUpperCase()
                      : "U"

                    return (
                      <tr key={pedido.idOrden} className="hover:bg-purple-50/40 transition-colors">
                        <td className="px-6 py-4 text-xs text-gray-500 font-mono">
                          #{pedido.idOrden}
                        </td>

                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div
                              className="w-8 h-8 rounded-full flex items-center justify-center text-white text-xs font-bold flex-shrink-0"
                              style={{ backgroundColor: AVATAR_COLORS[0] }}
                            >
                              {iniciales}
                            </div>
                            <div>
                              <p className="text-sm font-semibold text-gray-700">
                                {pedido.nombreUsuario}
                              </p>
                              <p className="text-xs text-gray-400">
                                {pedido.emailUsuario}
                              </p>
                            </div>
                          </div>
                        </td>

                        <td className="px-6 py-4">
                          <span className="text-sm text-gray-600">
                            {pedido.productos}
                          </span>
                        </td>

                        <td className="px-6 py-4">
                          <p className="text-xs text-gray-400 font-medium">ARS</p>
                          <p className="text-sm font-bold text-gray-800">
                            {pedido.total}
                          </p>
                        </td>

                        <td className="px-6 py-4">
                          <span className={`text-xs font-bold tracking-wide ${pedido.estado === "CONFIRMADA" ? "text-emerald-600" : "text-amber-500"}`}>
                            {pedido.estado}
                          </span>
                        </td>
                      </tr>
                    )
                  })}
                  {pedidosPagina.length === 0 && (
                    <tr><td colSpan={5} className="px-6 py-16 text-center text-gray-400 text-sm">No se encontraron pedidos.</td></tr>
                  )}
                </tbody>
              </table>
            </div>

            <Pagination currentPage={currentPage} totalPages={totalPages} totalItems={pedidosFiltrados.length} itemsPerPage={ITEMS_POR_PAGINA} itemLabel="pedidos" onPageChange={page => { if (page >= 1 && page <= totalPages) setCurrentPage(page) }} />
          </div>

        </main>
      </div>
    </div>
  )
}