/*
====================================================
LOGIN.JSX
====================================================

VISTA LOGIN

Representa una pantalla completa.

Esta vista utiliza:

- FormInput (componente reutilizable)
- useState (estado local)
- React Router (Link y useNavigate)

Teoría relacionada:
- Componentes React
- Estado local
- Props
- Routing
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import Quote from "../components/Quote";

function Login() {

  /*
  ====================================================
  useNavigate
  ====================================================

  Hook de React Router.

  Permite navegar entre vistas
  sin recargar la página.

  Teoría:
  Routing SPA.
  */

  const navigate = useNavigate();

  /*
  ====================================================
  ESTADO LOCAL
  ====================================================

  Guarda los datos del formulario.

  React vuelve a renderizar
  cuando cambia el estado.

  Teoría:
  useState.
  */

  const [formData, setFormData] = useState({

    email: "",

    password: ""

  });

  /*
  ====================================================
  EVENTO onChange
  ====================================================

  Se ejecuta cada vez que el usuario escribe.

  Actualiza el estado local.

  Teoría:
  Eventos DOM + Estado local.
  */

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value

    });

  };

  /*
  ====================================================
  EVENTO onSubmit
  ====================================================

  Cuando el usuario presiona
  INICIAR SESIÓN.

  preventDefault evita el refresco.

  Luego React Router navega a la
  pantalla de confirmación.

  Teoría:
  Eventos DOM + Routing.
  */

  const handleSubmit = (e) => {

    e.preventDefault();

    navigate("/confirmacion-registro");

  };

  return (

    <main
      className="
        bg-[#faf7f5]
        min-h-screen
        px-4
        py-10
      "
    >

      {/* CONTENEDOR PRINCIPAL */}

      <section
        className="
          mx-auto
          max-w-6xl
          border
          border-[#ead8d4]
          bg-white
          px-8
          py-12
          shadow-sm
          md:px-20
        "
      >

        {/* CABECERA */}

        <div className="mb-14 text-center">

          <h1
            className="
              font-serif
              text-5xl
              text-[#351118]
            "
          >
            Bienvenido
          </h1>

          <p className="mt-4 text-gray-500">
            Accede a tu santuario literario personal.
          </p>

        </div>

        {/* FORMULARIO */}

        <form onSubmit={handleSubmit}>

          <FormInput

            label="Correo electrónico"

            name="email"

            type="email"

            value={formData.email}

            onChange={handleChange}

            placeholder="ejemplo@libros.com"

          />

          <FormInput

            label="Contraseña"

            name="password"

            type="password"

            value={formData.password}

            onChange={handleChange}

          />

          {/* RECUPERAR CONTRASEÑA */}

          <div className="mb-10 text-right">

            <button
              type="button"
              className="
                text-sm
                text-gray-500
                hover:underline
              "
            >
              Olvidé mi contraseña
            </button>

          </div>

          {/* BOTÓN LOGIN */}

          <button

            type="submit"

            className="
              w-full
              bg-[#4b385c]
              py-4

              text-sm
              font-semibold

              tracking-[0.25em]

              text-white

              transition
              hover:bg-[#382943]
            "

          >
            INICIAR SESIÓN
          </button>

        </form>

        {/* LINK REGISTRO */}

        <div className="mt-10 text-center">

          ¿No tienes una cuenta?{" "}

          <Link

            to="/registro"

            className="
              font-semibold
              text-[#7d6296]
              hover:underline
            "

          >
            Regístrese
          </Link>

        </div>

      </section>

      {/* FRASE LITERARIA */}

      <div
        className="
          mx-auto
          mt-8
          max-w-6xl
        "
      >

        <Quote />

      </div>

    </main>

  );

}

export default Login;

