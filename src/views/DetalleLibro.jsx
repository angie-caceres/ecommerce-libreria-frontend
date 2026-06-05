// VISTA — obtiene el libro por ID de la URL y lo pasa al componente DetalleLibroCard
import { useParams, Link } from 'react-router-dom'
import DetalleLibroCard from '../components/DetalleLibroCard'
import { libros } from '../data/libros'

// PROPS — recibe agregarAlCarrito del padre App.jsx
function DetalleLibro({ agregarAlCarrito, puedeComprar }) {

  // useParams — obtiene el id de la URL (ej: /libro/6)
  const { id } = useParams()
  const libro = libros.find(l => l.id === Number(id))

  return (
    <div className="bg-[#FCF9F8] min-h-screen px-12 py-8">

      <Link to="/" className="text-sm text-gray-500 hover:text-purple-600 mb-8 inline-block">
        ← VOLVER
      </Link>

      {libro ? (
        /* COMPONENTE hijo — recibe el libro y la función como props */
        <DetalleLibroCard
          libro={libro}
          agregarAlCarrito={agregarAlCarrito}
          puedeComprar={puedeComprar}
        />
      ) : (
        <p className="text-center text-gray-400 mt-24 text-sm uppercase tracking-widest">
          Libro no encontrado.
        </p>
      )}

    </div>
  )
}

export default DetalleLibro
