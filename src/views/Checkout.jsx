// VISTA — página de checkout
// Permite seleccionar método de pago y confirmar la compra

import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import ResumenCompra from '../components/ResumenCompra'

function Checkout({ carrito }) {

  const [metodoPago, setMetodoPago] = useState('tarjeta')
  const navigate = useNavigate()

  const handleConfirmarCompra = () => {
    navigate('/pedido')
  }

  return (
    <div className="bg-[#FCF9F8] min-h-screen px-12 py-12">

      <h1
        className="text-6xl text-center text-[#4E3B67] mb-16"
        style={{ fontFamily: "'Libre Caslon Text', serif" }}
      >
        Checkout
      </h1>

      <div className="max-w-7xl mx-auto flex gap-10">

        {/* COLUMNA IZQUIERDA */}
        <div className="flex-1">

          <h2
            className="text-4xl text-[#2d2640] mb-6"
            style={{ fontFamily: "'Libre Caslon Text', serif" }}
          >
            Método de Pago
          </h2>

          <div className="border-t border-gray-200 mb-6"></div>

          {/* Tarjeta / Mercado Pago */}
          <div className="grid grid-cols-2 gap-4 mb-10">

            <button
              onClick={() => setMetodoPago('tarjeta')}
              className={
                metodoPago === 'tarjeta'
                  ? 'border-2 border-[#7B5B98] bg-[#F1E9F6] p-6 text-left'
                  : 'border border-gray-300 bg-white p-6 text-left'
              }
            >
              <p className="font-semibold uppercase text-sm">Tarjeta de Crédito</p>
              <p className="text-sm text-gray-500 mt-2">Visa, Mastercard, Amex</p>
            </button>

            <button
              onClick={() => setMetodoPago('mercadopago')}
              className={
                metodoPago === 'mercadopago'
                  ? 'border-2 border-[#7B5B98] bg-[#F1E9F6] p-6 text-left'
                  : 'border border-gray-300 bg-white p-6 text-left'
              }
            >
              <p className="font-semibold uppercase text-sm">Mercado Pago</p>
              <p className="text-sm text-gray-500 mt-2">Dinero en cuenta o cuotas</p>
            </button>

          </div>

          {/* Datos tarjeta */}
          <div className="grid grid-cols-2 gap-4 mb-12">

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500">
                Nombre en la tarjeta
              </label>
              <input type="text" className="w-full border border-gray-300 p-3 mt-2 bg-white" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500">
                Número de tarjeta
              </label>
              <input type="text" placeholder="**** **** **** ****" className="w-full border border-gray-300 p-3 mt-2 bg-white" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500">Vencimiento</label>
              <input type="text" placeholder="MM / AA" className="w-full border border-gray-300 p-3 mt-2 bg-white" />
            </div>

            <div>
              <label className="text-xs uppercase tracking-wider text-gray-500">CVV</label>
              <input type="text" placeholder="000" className="w-full border border-gray-300 p-3 mt-2 bg-white" />
            </div>

          </div>

          {/* ENVÍO */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2
                className="text-4xl text-[#2d2640]"
                style={{ fontFamily: "'Libre Caslon Text', serif" }}
              >
                Envío
              </h2>
              <button className="border border-gray-400 px-3 py-1 text-xs uppercase">
                Editar
              </button>
            </div>

            <div className="bg-white border border-gray-200 p-6">
              <p className="text-gray-700">Av. del Libertador 1450, Piso 4B</p>
              <p className="text-gray-500">C1425 Buenos Aires, Argentina</p>
              <p className="text-sm text-gray-400 mt-4">Entrega estimada: 3 a 5 días hábiles.</p>
            </div>
          </div>

        </div>

        {/* RESUMEN — componente reutilizable */}
        <div className="w-[380px]">
          <ResumenCompra
            carrito={carrito}
            onConfirmar={handleConfirmarCompra}
            mostrarBoton={true}
            confirmado={false}
          />
        </div>

      </div>
    </div>
  )
}

export default Checkout