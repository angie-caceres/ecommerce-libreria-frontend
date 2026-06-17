// VISTA — crear libro del panel admin
import { useState, useEffect } from "react"
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

export default function CrearLibro() {
  const token = localStorage.getItem("jwtToken") || localStorage.getItem("token")

  // HOOK useState — estado local del formulario
  const [form, setForm] = useState({
    titulo: "", descripcion: "", paginas: "", precio: "",
    stock: "", genero: "", editorial: "", autores: "", imagenId: "",
  })

  const [submitted, setSubmitted] = useState(false)
  const [errors, setErrors]       = useState({})
  const [cargando, setCargando]   = useState(false)
  const [error, setError]         = useState(null)

  // Datos para los selects — vienen del backend
  const [generos, setGeneros]         = useState([])
  const [editoriales, setEditoriales] = useState([])
  const [autores, setAutores]         = useState([])
  const [imagenes, setImagenes]       = useState([])

  // HOOK useEffect — carga los selectores al montar el componente
  // [] como dependencia = se ejecuta una sola vez
  useEffect(() => {
    const cargarSelectores = async () => {
      setCargando(true)
      setError(null)
      try {
        // Promise.all ejecuta las 4 promesas en paralelo — más eficiente que hacerlas una por una
        const [dataGeneros, dataEditoriales, dataAutores, dataImagenes] = await Promise.all([
          apiFetch("/generos", token),
          apiFetch("/editoriales", token),
          apiFetch("/autores", token),
          apiFetch("/imagenes/todas", token),
        ])
        setGeneros(dataGeneros)
        setEditoriales(dataEditoriales)
        setAutores(dataAutores)
        setImagenes(dataImagenes || [])
      } catch (err) {
        setError("No se pudieron cargar los datos desde el servidor.")
        console.error(err)
      } finally {
        setCargando(false)
      }
    }

    if (token) cargarSelectores()
  }, [])

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: "" }))
  }

  const validate = () => {
    const e = {}
    if (!form.titulo.trim())  e.titulo    = "El título es obligatorio"
    if (!form.precio.trim())  e.precio    = "Ingresá un precio"
    if (!form.stock.trim())   e.stock     = "Ingresá el stock"
    if (!form.genero)         e.genero    = "Seleccioná un género"
    if (!form.editorial)      e.editorial = "Seleccioná una editorial"
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

    // Paso 1 — Crear el libro con los campos básicos
    // El backend recibe idGenero, idEditorial, idAutores (no los nombres)
    const libroBody = {
      titulo:      form.titulo.trim(),
      descripcion: form.descripcion.trim(),
      paginas:     parseInt(form.paginas) || 0,
      precio:      parseFloat(form.precio),
      stock:       parseInt(form.stock),
      idGenero:    parseInt(form.genero),
      idEditorial: parseInt(form.editorial),
      idAutores:   form.autores ? [parseInt(form.autores)] : [],
      idDescuento: null,
    }

    try {
      // PROMESA — POST a /libros para crear el libro
      const libroCreado = await apiFetch("/libros", token, {
        method: "POST",
        body: JSON.stringify(libroBody),
      })

      // Paso 2 — Si se seleccionó imagen, la asignamos con un PATCH separado
      // El backend tiene un endpoint específico para esto: PATCH /libros/:id/imagen/:imagenId
      if (form.imagenId && libroCreado?.idLibro) {
        await apiFetch(
          `/libros/${libroCreado.idLibro}/imagen/${form.imagenId}`,
          token,
          { method: "PATCH" }
        )
      }

      setSubmitted(true)
      handleReset()
    } catch (err) {
      setError(err.message || "No se pudo crear el libro en el servidor.")
    } finally {
      setCargando(false)
    }
  }

  const handleReset = () => {
    setForm({ titulo: "", descripcion: "", paginas: "", precio: "", stock: "", genero: "", editorial: "", autores: "", imagenId: "" })
    setErrors({})
  }

  return (
    <div className="min-h-screen bg-[#f7f4ef] font-serif">
      <Sidebar />
      <div className="ml-56 min-h-screen flex flex-col">
        <HeaderAdmin />
        <main className="flex-1 p-8 space-y-6">

          <EncabezadoSeccion titulo="Crear Libro" />

          {/* RENDERIZADO CONDICIONAL — feedback al usuario */}
          {submitted && (
            <Alerta texto="¡Libro creado correctamente!" onClose={() => setSubmitted(false)} />
          )}
          {error && (
            <p className="text-center text-red-500 font-bold tracking-wide py-2 bg-red-50 border border-red-200 rounded-xl">
              ⚠️ {error}
            </p>
          )}

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 space-y-5">

            <FormField label="Título del libro">
              <input type="text" name="titulo" value={form.titulo} onChange={handleChange}
                placeholder="Ej: Don Quijote de la Mancha" className={inputClass} disabled={cargando} />
              {errors.titulo && <p className="text-xs text-red-500">{errors.titulo}</p>}
            </FormField>

            <FormField label="Descripción">
              <textarea name="descripcion" value={form.descripcion} onChange={handleChange}
                placeholder="Escribí una breve reseña..." rows={4}
                className={`${inputClass} resize-none`} disabled={cargando} />
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
                {errors.stock && <p className="text-xs text-red-500">{errors.stock}</p>}
              </FormField>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Los selects usan los IDs que devuelve el backend */}
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

            <FormField label="Portada">
              <select name="imagenId" value={form.imagenId} onChange={handleChange}
                className={`${inputClass} appearance-none cursor-pointer`} disabled={cargando}>
                <option value="">Seleccionar portada</option>
                {imagenes.map(img => (
                  <option key={img.id} value={img.id}>
                    {img.nombreArchivo || `Portada ID: ${img.id}`}
                  </option>
                ))}
              </select>
            </FormField>

          </div>

          <div className="flex items-center justify-end gap-3">
            <button onClick={handleReset}
              className="px-6 py-2.5 text-sm font-semibold text-gray-600 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors"
              disabled={cargando}>
              Limpiar
            </button>
            <button onClick={handleSubmit}
              className="px-6 py-2.5 text-sm font-bold text-white bg-[#473954] rounded-xl hover:bg-[#3A3074] active:scale-95 transition-all shadow-sm disabled:opacity-60"
              disabled={cargando}>
              {cargando ? "GUARDANDO..." : "CREAR LIBRO"}
            </button>
          </div>

        </main>
      </div>
    </div>
  )
}
