/*
====================================================
REGISTRO.JSX
====================================================

VISTA REGISTRO

Responsabilidad:

- Mostrar formulario de registro.
- Actualizar el usuario global.
- Navegar a ConfirmacionRegistro.

Teoría:
- Componentes React
- Props
- Estado compartido
- Routing
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import FormInput from "../components/FormInput";
import Quote from "../components/Quote";

/*
====================================================
PROPS
====================================================

usuario y setUsuario llegan desde App.

App es el componente padre.

Teoría:
Props + Flujo unidireccional.
*/

function Registro({

  usuario,

  setUsuario

}) {

  /*
  ====================================================
  REACT ROUTER
  ====================================================

  Permite navegar sin recargar.

  Registro
  ↓
  ConfirmacionRegistro
  */

  const navigate = useNavigate();

  /*
  ====================================================
  ESTADO LOCAL
  ====================================================

  Sólo para confirmar contraseña.

  El usuario NO vive acá.

  Vive en App.
  */

  const [confirmar, setConfirmar] =
    useState("");

  /*
  ====================================================
  onChange
  ====================================================

  Actualiza el usuario global.

  Teoría:
  Estado compartido.
  */

  const handleChange = (e) => {

    setUsuario({

      ...usuario,

      [e.target.name]:
        e.target.value

    });

  };

  /*
  ====================================================
  SUBMIT
  ====================================================

  Envía el formulario.

  Luego navega a la pantalla
  de confirmación.

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
            Crear Cuenta
          </h1>

          <p className="mt-4 text-gray-500">
            Únase a nuestra selecta comunidad de bibliófilos.
          </p>

        </div>

        {/* FORMULARIO */}

        <form onSubmit={handleSubmit}>

          {/* NOMBRE */}

          <FormInput

            label="Nombre completo"

            name="nombre"

            value={usuario.nombre}

            onChange={handleChange}

            placeholder="Ej: Miguel de Cervantes"

          />

          {/* EMAIL */}

          <FormInput

            label="Correo electrónico"

            name="email"

            type="email"

            value={usuario.email}

            onChange={handleChange}

            placeholder="ejemplo@libros.com"

          />

          {/* PASSWORDS */}

          <div
            className="
              grid
              gap-10
              md:grid-cols-2
            "
          >

            <FormInput

              label="Contraseña"

              name="password"

              type="password"

              value={usuario.password}

              onChange={handleChange}

            />

            <FormInput

              label="Confirmar"

              name="confirmar"

              type="password"

              value={confirmar}

              onChange={(e) =>
                setConfirmar(
                  e.target.value
                )
              }

            />

          </div>

          {/* BOTÓN */}

          <button

            type="submit"

            className="
              mt-10

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
            REGISTRARSE
          </button>

        </form>

        {/* LINK LOGIN */}

        <div className="mt-10 text-center">

          ¿Ya tienes una cuenta?{" "}

          <Link

            to="/login"

            className="
              font-semibold
              text-[#7d6296]
              hover:underline
            "

          >
            Iniciar sesión
          </Link>

        </div>

      </section>

      {/* FRASE */}

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

export default Registro;
