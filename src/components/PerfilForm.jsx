// COMPONENTE PerfilForm
// Teoría: un componente en React es una función JavaScript que devuelve JSX.
// React construye la interfaz combinando componentes pequeños.

import { Link } from "react-router-dom";

function PerfilForm({ usuario }) {
  // Props:
  // usuario llega desde la vista Perfil.jsx.
  // Teoría: las props permiten pasar datos de un componente padre a uno hijo.
  // En este caso Perfil.jsx lee localStorage y le pasa el usuario a PerfilForm.

  return (
    <section className="mx-auto max-w-6xl bg-white px-8 py-12 shadow-sm md:px-24">
      <div className="mb-12 text-center">
        <h1 className="font-serif text-4xl text-[#351118]">
          Mi Perfil
        </h1>

        <p className="mt-3 text-gray-500">
          Actualiza tu información personal y preferencias literarias.
        </p>
      </div>

      <div>
        <div className="mb-7">
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
            Nombre completo
          </label>

          <p className="w-full border-b border-[#ead8d4] px-3 py-3 text-[#2d2528]">
            {usuario?.nombre || "Sin nombre registrado"}
          </p>
        </div>

        <div className="mb-7">
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
            Correo electrónico
          </label>

          <p className="w-full border-b border-[#ead8d4] px-3 py-3 text-[#2d2528]">
            {usuario?.email || "Sin email registrado"}
          </p>
        </div>

        <div className="mb-10">
          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
            Contraseña
          </label>

          <p className="w-full border-b border-[#ead8d4] px-3 py-3 text-[#2d2528]">
            {usuario?.password ? "••••••••••" : "Sin contraseña registrada"}
          </p>
        </div>

        <div className="my-10 flex items-center gap-5">
          <div className="h-px flex-1 bg-[#eadfdd]"></div>
          <span className="text-[#9b7c7c]">◇</span>
          <div className="h-px flex-1 bg-[#eadfdd]"></div>
        </div>

        <Link
          to="/editar-perfil"
          className="block w-full bg-[#4b385c] py-4 text-center text-sm font-semibold tracking-[0.25em] text-white transition hover:bg-[#382943]"
        >
          EDITAR DATOS
        </Link>
      </div>

      <div className="mt-5 flex justify-center gap-10 border-b border-[#f0e7e5] pb-5 text-xs font-semibold uppercase tracking-widest text-[#5c4b51]">
        <Link to="/login">
          Cancelar
        </Link>

        <Link to="/">
          Volver al inicio
        </Link>
      </div>

      <div className="mt-8 text-center">
        <p className="font-serif text-xl italic text-[#351118]">
          "La sabiduría no se traspasa, se conquista."
        </p>

        <p className="mt-2 text-xs tracking-widest text-gray-500">
          — Hermann Hesse
        </p>
      </div>
    </section>
  );
}

export default PerfilForm;


