// COMPONENTE RegistroForm
// Teoría: un componente es una función JavaScript que devuelve JSX.
// React construye la interfaz combinando componentes pequeños.
// PDF: Componentes en React.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function RegistroForm() {

  // ============================
  // ESTADOS LOCALES (useState)
  // ============================
  // Teoría: useState permite crear estado local.
  // El estado local representa información interna del componente.
  // Cuando cambia, React vuelve a renderizar automáticamente la UI.
  // PDF: Estados locales y props.

  const [nombre, setNombre] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmarPassword, setConfirmarPassword] = useState("");

  // Hook de React Router.
  // Permite navegar entre vistas sin recargar la página.
  // PDF: Routing en React.
  const navigate = useNavigate();

  // ============================
  // EVENTO SUBMIT
  // ============================
  // Teoría DOM:
  // submit es un evento generado por el usuario.
  // React captura el evento y ejecuta esta función.
  const handleSubmit = (e) => {

    // Evita que el navegador recargue la página.
    e.preventDefault();

    // Validación simple de contraseñas.
    if (password !== confirmarPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    // Creamos un objeto con los datos ingresados.
    const nuevoUsuario = {
      nombre,
      email,
      password,
    };

    // Guardamos el usuario en localStorage.
    // Esto permite recuperar los datos luego en Mi Perfil.
    localStorage.setItem(
      "usuario",
      JSON.stringify(nuevoUsuario)
    );

    console.log(nuevoUsuario);

    // Navegación SPA.
    // Redirige a la pantalla de confirmación.
    navigate("/confirmacion-registro");
  };

  return (
    <section className="mx-auto max-w-6xl border border-[#ead8d4] bg-white px-8 py-12 md:px-20">

      {/* ============================
          TÍTULO
          ============================ */}

      <div className="mb-14 text-center">

        <h1 className="font-serif text-4xl text-[#351118]">
          Crear Cuenta
        </h1>

        <p className="mt-3 text-gray-500">
          Únase a nuestra selecta comunidad de bibliófilos.
        </p>

      </div>

      {/* ============================
          FORMULARIO
          ============================ */}

      <form onSubmit={handleSubmit}>

        {/* ============================
            NOMBRE
            ============================ */}

        <div className="mb-7">

          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
            Nombre completo
          </label>

          <input
            type="text"
            placeholder="p. ej. Miguel de Cervantes"

            // Input controlado por React.
            value={nombre}

            // Evento change.
            // Actualiza el estado cuando el usuario escribe.
            onChange={(e) =>
              setNombre(e.target.value)
            }

            required
            className="w-full border-b border-[#8c7a80] bg-transparent px-3 py-3 outline-none placeholder:text-gray-400"
          />

        </div>

        {/* ============================
            EMAIL
            ============================ */}

        <div className="mb-7">

          <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
            Correo electrónico
          </label>

          <input
            type="email"
            placeholder="ejemplo@libro.com"

            value={email}

            onChange={(e) =>
              setEmail(e.target.value)
            }

            required
            className="w-full border-b border-[#8c7a80] bg-transparent px-3 py-3 outline-none placeholder:text-gray-400"
          />

        </div>

        {/* ============================
            CONTRASEÑAS
            ============================ */}

        <div className="mb-10 grid grid-cols-1 gap-12 md:grid-cols-2">

          <div>

            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
              Contraseña
            </label>

            <input
              type="password"

              value={password}

              onChange={(e) =>
                setPassword(e.target.value)
              }

              required
              className="w-full border-b border-[#8c7a80] bg-transparent px-3 py-3 outline-none"
            />

          </div>

          <div>

            <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
              Confirmar
            </label>

            <input
              type="password"

              value={confirmarPassword}

              onChange={(e) =>
                setConfirmarPassword(e.target.value)
              }

              required
              className="w-full border-b border-[#8c7a80] bg-transparent px-3 py-3 outline-none"
            />

          </div>

        </div>

        {/* ============================
            BOTÓN REGISTRARSE
            ============================ */}

        <button
          type="submit"
          className="w-full bg-[#4b385c] py-4 text-sm font-semibold tracking-[0.25em] text-white transition hover:bg-[#382943]"
        >
          REGISTRARSE
        </button>

      </form>

      {/* ============================
          LINK LOGIN
          ============================ */}

      <p className="mt-8 text-center text-sm text-gray-500">

        ¿Ya tienes una cuenta?{" "}

        <Link
          to="/login"
          className="font-semibold text-[#4b385c] underline"
        >
          Iniciar sesión
        </Link>

      </p>

      {/* ============================
          SEPARADOR
          ============================ */}

      <div className="my-8 flex items-center gap-5">

        <div className="h-px flex-1 bg-[#eadfdd]"></div>

        <span className="text-[#c9a6a6]">
          ◇
        </span>

        <div className="h-px flex-1 bg-[#eadfdd]"></div>

      </div>

      {/* ============================
          FRASE FINAL
          ============================ */}

      <div className="text-center">

        <p className="font-serif text-xl text-[#351118]">
          "La lectura es una conversación con los hombres más ilustres de los siglos pasados"
        </p>

        <p className="mt-4 text-xs font-semibold tracking-widest text-gray-500">
          — DESCARTES
        </p>

      </div>

    </section>
  );
}

export default RegistroForm;

