// COMPONENTE ConfirmacionRegistroCard
// Teoría: un componente es una función JavaScript que devuelve JSX.
// Se separa en components porque es una pieza reutilizable de interfaz.
// PDF: Componentes - función JS + JSX, archivo .jsx, PascalCase.

import { Link } from "react-router-dom";

function ConfirmacionRegistroCard() {
  return (
    <section className="mx-auto max-w-6xl border border-[#ead8d4] bg-white px-6 py-16 text-center shadow-sm md:px-20">

      {/* Imagen/logo decorativo.
          Relación DOM: React transforma este JSX en nodos del DOM que el navegador renderiza. */}
      <div className="mx-auto mb-8 flex h-40 w-40 items-center justify-center rounded-full border border-[#ead8d4]">
        <img
          src="/logo.png"
          alt="Entre Letras"
          className="w-28 object-contain"
        />
      </div>

      <h1 className="mx-auto max-w-3xl font-serif text-4xl leading-tight text-[#351118] md:text-5xl">
        ¡Bienvenido a la Hermandad Literaria!
      </h1>

      <p className="mt-4 text-lg text-gray-500">
        Tu santuario literario personal está listo!
      </p>

      <div className="mx-auto my-8 flex max-w-xs items-center justify-center gap-5">
        <div className="h-px flex-1 bg-[#ead8d4]"></div>
        <span className="text-[#351118]">📖</span>
        <div className="h-px flex-1 bg-[#ead8d4]"></div>
      </div>

      <blockquote className="mx-auto max-w-xl">
        <p className="font-serif text-xl italic text-[#351118]">
          "Siempre imaginé que el Paraíso sería algún tipo de biblioteca."
        </p>

        <cite className="mt-4 block text-xs font-semibold not-italic tracking-widest text-gray-500">
          — JORGE LUIS BORGES
        </cite>
      </blockquote>

      {/* Link de React Router.
          Teoría: Link permite navegar entre vistas sin recargar la página en una SPA. */}
      <div className="mt-10 flex flex-col justify-center gap-4 sm:flex-row">
        <Link
          to="/catalogo"
          className="bg-[#4b385c] px-10 py-4 text-sm font-semibold tracking-widest text-white transition hover:bg-[#382943]"
        >
          EXPLORAR EL CATÁLOGO
        </Link>

        <Link
          to="/perfil"
          className="border border-[#351118] px-10 py-4 text-sm font-semibold tracking-widest text-[#351118] transition hover:bg-[#f5f1f0]"
        >
          IR A MI PERFIL
        </Link>
      </div>
    </section>
  );
}

export default ConfirmacionRegistroCard;
