// COMPONENTE reutilizable

import { useState } from "react";
import { Link } from "react-router-dom";

function LoginForm() {

  // HOOK useState
  // Teoría: estado local del componente.
  // Guarda información que cambia durante la ejecución.
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // EVENTO submit
  // Teoría DOM: submit es un evento generado por el usuario.
  const handleSubmit = (e) => {

    // Evita que el navegador recargue la página.
    e.preventDefault();

    console.log(email);
    console.log(password);

    // Más adelante acá irá la llamada a la API.
  };

  return (
    <section className="max-w-5xl mx-auto bg-white border border-gray-200 p-12">

      {/* Encabezado */}
      <div className="text-center mb-10">

        <h1 className="text-5xl font-serif text-[#351118]">
          Bienvenido
        </h1>

        <p className="text-gray-500 mt-3">
          Accede a tu santuario literario personal.
        </p>

      </div>

      {/* Formulario */}
      <form
        onSubmit={handleSubmit}
        className="max-w-4xl mx-auto"
      >

        {/* Email */}
        <div className="mb-8">

          <label className="block text-2xl font-serif text-[#351118] mb-4">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="ejemplo@libros.com"

            // Input controlado por React
            value={email}

            // Evento input/change
            // Actualiza el estado cada vez que escribe el usuario
            onChange={(e) => setEmail(e.target.value)}

            className="w-full border-b border-gray-400 py-3 outline-none"
          />

        </div>

        {/* Password */}
        <div className="mb-8">

          <div className="flex justify-between mb-4">

            <label className="text-2xl font-serif text-[#351118]">
              Contraseña
            </label>

            <Link
              to="/recuperar-password"
              className="text-sm text-gray-500"
            >
              Olvidé mi contraseña
            </Link>

          </div>

          <input
            type="password"
            placeholder="••••••••"

            value={password}

            onChange={(e) => setPassword(e.target.value)}

            className="w-full border-b border-gray-400 py-3 outline-none"
          />

        </div>

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-[#4b385c] text-white py-4"
        >
          INICIAR SESIÓN
        </button>

      </form>

      {/* Separador */}
      <div className="flex items-center gap-4 my-10">
        <div className="h-px bg-gray-200 flex-1"></div>
        <span>◇</span>
        <div className="h-px bg-gray-200 flex-1"></div>
      </div>

      {/* Registro */}
      <p className="text-center text-gray-500">

        ¿No tienes una cuenta?

        <Link
          to="/registro"
          className="text-[#7c5fa0] font-semibold ml-2"
        >
          Regístrese
        </Link>

      </p>

      {/* Frase */}
      <div className="bg-[#f5f1f0] border-l-2 border-[#351118] mt-10 p-8 text-center">

        <p className="italic font-serif text-xl text-[#351118]">
          "Un hogar sin libros es como un cuerpo sin alma."
        </p>

        <p className="text-xs text-gray-400 mt-2">
          — CICERÓN
        </p>

      </div>

    </section>
  );
}

export default LoginForm;
