/*
====================================================
REGISTRO.JSX
====================================================

Vista Registro.

Esta vista reutiliza AuthForm y FormInput.

Buenas prácticas aplicadas:

✔ Reutilización de componentes
✔ Estado local con useState
✔ Props
✔ Flujo unidireccional
✔ React Router

Teoría relacionada:
Estados locales y props.
Componentes React.
Routing.
*/

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Quote from "../components/Quote";
import AuthForm from "../components/AuthForm";
import FormInput from "../components/FormInput";

function Registro() {

  /*
  ====================================================
  useNavigate
  ====================================================

  Permite navegar a otra vista
  sin recargar la página.

  Registro
  ↓
  ConfirmacionRegistro

  Teoría:
  Routing React.
  */

  const navigate = useNavigate();

  /*
  ====================================================
  ESTADO LOCAL
  ====================================================

  Guarda la información que escribe
  el usuario.

  React vuelve a renderizar
  automáticamente cuando cambia.

  Teoría:
  useState.
  */

  const [usuario, setUsuario] =
    useState({

      nombre: "",

      email: "",

      password: "",

      confirmar: ""

    });

  /*
  ====================================================
  CAMPOS PRINCIPALES
  ====================================================

  AuthForm utiliza este array
  para construir dinámicamente
  los inputs.

  Ventaja:
  no duplicamos código.
  */

  const fields = [

    {
      label: "Nombre completo",
      name: "nombre",
      placeholder:
        "p. ej. Miguel de Cervantes"
    },

    {
      label: "Correo electrónico",
      name: "email",
      type: "email",
      placeholder:
        "ejemplo@libro.com"
    }

  ];

  /*
  ====================================================
  onChange
  ====================================================

  Evento del DOM.

  Se ejecuta cada vez que
  el usuario escribe.

  Teoría:
  Eventos DOM + Estado local.
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
  onSubmit
  ====================================================

  Cuando el usuario presiona
  REGISTRARSE.

  preventDefault evita el refresco.

  Luego React Router cambia
  a ConfirmacionRegistro.

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
        py-10
        px-4
      "
    >

      <AuthForm

        /*
        Cabecera
        */

        title="Crear Cuenta"

        subtitle="Únase a nuestra selecta comunidad de bibliófilos."

        /*
        Inputs principales
        */

        fields={fields}

        /*
        Estado
        */

        formData={usuario}

        /*
        Evento escritura
        */

        onChange={handleChange}

        /*
        Texto botón
        */

        buttonText="REGISTRARSE"

        /*
        Evento submit
        */

        onSubmit={handleSubmit}

        /*
        Texto inferior
        */

        footerContent={

          <>
            ¿Ya tienes una cuenta?{" "}

            <Link

              to="/login"

              className="
                text-[#7d6296]
                font-semibold
                hover:underline
              "

            >
              Iniciar sesión
            </Link>

          </>

        }

      >

        {/*

        children

        AuthForm permite insertar
        contenido adicional.

        En este caso:

        Contraseña
        Confirmación

        */}

        <div
          className="
            grid
            md:grid-cols-2
            gap-20
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

            value={usuario.confirmar}

            onChange={handleChange}

          />

        </div>

      </AuthForm>

      {/*

      Frase literaria.

      Componente reutilizable.

      */}

      <div
        className="
        max-w-6xl
        mx-auto
        mt-8
      "
      >

        <Quote />

      </div>

    </main>

  );
}

export default Registro;

