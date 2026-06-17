// VISTA — editar libro del panel admin
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import HeaderAdmin from "../../components/HeaderAdmin"
import Sidebar from "../../components/Sidebar"
import EncabezadoSeccion from "../../components/EncabezadoSeccion"
import Alerta from "../../components/Alerta"
import { apiFetch } from "../../services/api"

function FormField({ label, children, className = "" }) {
  return (
    <div className={`flex flex-col gap-1.5 ${className}`}>
      <label className="text-xs font-bold text-gray-500 uppercase tracking-widest">
        {label}
      </label>
      {children}
    </div>
  )
}

const inputClass =
  "w-full px-4 py-2.5 text-sm text-[#544341] bg-white border border-[#CBC4CE] rounded-lg " +
  "focus:outline-none focus:ring-2 focus:ring-[#EBE5F2] focus:border-[#7B5B98] " +
  "placeholder:text-[#877270] transition-colors"

export default function EditarLibro() {
  // useParams — lee el :id de la URL (/admin/libros/editar/5)
  const { id }   = useParams()
  const navigate = useNavigate()
  const token    = localStorage.getItem("jwtToken") || localStorage.getItem("token")

  // HOOK useState — estado del formulario
  const [form, setForm] = useState({
    titulo: "", descripcion: "", paginas: "", precio: "",
    stock: "", genero: "", editorial: "", autores: "", imagenId: "",
  })

  const [updated, setUpdated]     = useState(false)
  const [errors, setErrors]       = useState({})
  const [cargando, setCargando]   = useState(false)
  const [error, setError]         = useState(null)
  const [cargandoDatos, setCargandoDatos] = useState(true)

  // Datos para los selects
  const [generos, setGeneros]         = useState([])
  const [editoriales, setEditoriales] = useState([])
  const [autores, setAutores]         = useState([])
  const [imagenes, setImagenes]       = useState([])

  // HOOK useEffect — carga el libro actual y los selectores al montar
  // [id] como dependencia = se vuelve a ejecutar si cambia el id en la URL
  useEffect(() => {
    const cargarTodo = async () => {
      setCargandoDatos(true)
      setError(null)
      try {
        // Promise.all — ejecuta todas las promesas en paralelo
        const [libro, dataGeneros, dataEditoriales, dataAutores, dataImagenes] = await Promise.all([
          apiFetch(`/libros/${id}`, token),
          apiFetch("/generos", token),
          apiFetch("/editoriales", token),
          apiFetch("/autores", token),
          apiFetch("/imagenes/todas", token),
        ])

        // Precargamos el formulario con los datos actuales del libro
        // Buscamos el id del género/editorial actual para preseleccionarlo en el select
        const generoActual    = dataGeneros.find(g => g.nombre === libro.genero)
        const editorialActual = dataEditoriales.find(e => e.nombre === libro.editorial)
        const autorActual     = dataAutores.find(a =>
          libro.autores?.includes(`${a.nombre} ${a.apellido || ''}`.trim())
        )

        setForm({
          titulo:      libro.titulo      || "",
          descripcion: libro.descripcion || "",
          paginas:     libro.paginas     || "",
          precio:      libro.precio      || "",
          stock:       libro.stock       || "",
          genero:      generoActual?.idGenero    || "",
          editorial:   editorialActual?.id       || "",
          autores:     autorActual?.idAutor || autorActual?.id || "",
          imagenId:    "",
        })

        setGeneros(dataGeneros)
        setEditoriales(dataEditoriales)
        setAutores(dataAutores)
        setImagenes(dataImagenes || [])
      } catch (err) {
        setError("No se pudo cargar el libro. Verificá que el servidor esté activo.")
        console.error(err)
      } finally {
        setCargandoDatos(false)
      }
    }

    if (token) cargarTodo()
  }, [id])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const e = {}
    if (!form.titulo.trim())        e.titulo    = "El título es obligatorio"
    if (!String(form.precio).trim()) e.precio   = "Ingresá un precio"
    if (!form.genero)               e.genero    = "Seleccioná un género"
    if (!form.editorial)            e.editorial = "Seleccioná una editorial"
    return e
  }

  const handleSubmit = async () => {
    const newErrors = validate()
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors)
      return
    }

    setCargando(true)
    setError(null)

    try {
      // El backend no tiene PUT general — usa PATCH por campo
      // Ejecutamos todos los PATCHs en paralelo con Promise.all

      const patches = [
        // PATCH — actualiza género
        apiFetch(`/libros/${id}/genero/${form.genero}`, token, { method: "PATCH" }),
        // PATCH — actualiza editorial
        apiFetch(`/libros/${id}/editorial/${form.editorial}`, token, { method: "PATCH" }),
      ]

      // PATCH — actualiza autores (si se seleccionó uno)
      if (form.autores) {
        patches.push(
          apiFetch(`/libros/${id}/autores`, token, {
            method: "PATCH",
            body: JSON.stringify([parseInt(form.autores)]),
          })
        )
      }

      // PATCH — actualiza imagen (si se seleccionó una)
      if (form.imagenId) {
        patches.push(
          apiFetch(`/libros/${id}/imagen/${form.imagenId}`, token, { method: "PATCH" })
        )
      }

      // PATCH — actualiza stock
      if (form.stock !== "") {
        patches.push(
          apiFetch(`/libros/${id}/stock?cantidad=${parseInt(form.stock)}`, token, { method: "PATCH" })
        )
      }

      // Ejecutamos todos los PATCHs y esperamos que terminen
      await Promise.all(patches)

      setUpdated(true)
      setTimeout(() => setUpdated(false), 3000)
    } catch (err) {
      setError(err.message || "No se pudo actualizar el libro.")
    } finally {
      setCargando(false)
    }
  }

  // RENDERIZADO CONDICIONAL — mientras cargan los datos del libro
  if (cargandoDatos) {
    return (
      <div className="min-h-screen bg-[#f7f4ef] font-serif">
        <Sidebar />
        <div className="ml-56 min-h-screen flex items-center justify-center">
          <p className="text-gray-400 text-sm">Cargando datos del libro...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-8 space-y-6">

          <EncabezadoSeccion titulo="Editar Libro" />

          {/* RENDERIZADO CONDICIONAL — feedback */}
          {updated && (
            <Alerta texto="¡Libro actualizado correctamente!" onClose={() => setUpdated(false)} />
          )}
          {error && (
            <p className="text-center text-red-500 font-bold tracking-wide py-2 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">

            <FormField label="Título del libro">
              <input type="text" name="titulo" value={form.titulo} onChange={handleChange}
                className={inputClass} disabled={cargando} />
              {errors.titulo && <p className="text-xs text-red-500">{errors.titulo}</p>}
            </FormField>

            <FormField label="Descripción">
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
                rows={5} className={`${inputClass} resize-none`} disabled={cargando} />
            </FormField>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <FormField label="Páginas">
                <input type="number" name="paginas" value={form.paginas} onChange={handleChange}
                  placeholder="452" min="1" className={inputClass} disabled={cargando} />
              </FormField>

              <FormField label="Precio (ARS)">
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm font-medium">$</span>
                  <input type="number" name="precio" value={form.precio} onChange={handleChange}
                    placeholder="0.00" min="0" step="0.01" className={`${inputClass} pl-7`} disabled={cargando} />
                </div>
                {errors.precio && <p className="text-xs text-red-500">{errors.precio}</p>}
              </FormField>

              <FormField label="Stock disponible">
                <input type="number" name="stock" value={form.stock} onChange={handleChange}
                  placeholder="Ej: 50" min="0" className={inputClass} disabled={cargando} />
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <FormField label="Género">
                <select name="genero" value={form.genero} onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`} disabled={cargando}>
                  <option value="">Seleccionar género</option>
                  {generos.map(g => (
                    <option key={g.idGenero} value={g.idGenero}>{g.nombre}</option>
                  ))}
                </select>
                {errors.genero && <p className="text-xs text-red-500">{errors.genero}</p>}
              </FormField>

              <FormField label="Editorial">
                <select name="editorial" value={form.editorial} onChange={handleChange}
                  className={`${inputClass} appearance-none cursor-pointer`} disabled={cargando}>
                  <option value="">Seleccionar editorial</option>
                  {editoriales.map(e => (
                    <option key={e.id} value={e.id}>{e.nombre}</option>
                  ))}
                </select>
                {errors.editorial && <p className="text-xs text-red-500">{errors.editorial}</p>}
              </FormField>
            </div>

            <FormField label="Autor">
              <select name="autores" value={form.autores} onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`} disabled={cargando}>
                <option value="">Seleccionar autor</option>
                {autores.map(a => (
                  <option key={a.idAutor || a.id} value={a.idAutor || a.id}>
                    {`${a.nombre} ${a.apellido || ''}`.trim()}
                  </option>
                ))}
              </select>
            </FormField>

            <FormField label="Cambiar portada">
              <select name="imagenId" value={form.imagenId} onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`} disabled={cargando}>
                <option value="">Mantener portada actual</option>
                {imagenes.map(img => (
                  <option key={img.id} value={img.id}>
                    {img.nombreArchivo || `Portada ID: ${img.id}`}
                  </option>
                ))}
              </select>
            </FormField>

          </div>

          <div className="flex items-center justify-end gap-3">
            <button onClick={() => navigate("/admin/libros")}
              className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              disabled={cargando}>
              Cancelar
            </button>
            <button onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#473954] rounded-xl hover:bg-[#3A3074] active:scale-95 transition-all shadow-sm disabled:opacity-60"
              disabled={cargando}>
              {cargando ? "GUARDANDO..." : "ACTUALIZAR LIBRO"}
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}
