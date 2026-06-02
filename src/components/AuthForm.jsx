/*
====================================================
AUTHFORM.JSX
====================================================

Este componente genera la estructura visual
compartida entre Login y Registro.

La teoría de React recomienda reutilizar
componentes para evitar duplicar código.

Por eso Login y Registro utilizan
este mismo componente.

Teoría:
Componentes reutilizables.
*/

import FormInput from "./FormInput";

/*
AuthForm recibe información mediante props.

Props = mecanismo de comunicación entre
componentes.

El componente padre envía:

- título
- campos
- datos
- funciones

Teoría:
Props y flujo unidireccional.
*/

function AuthForm({
  title,
  subtitle,
  fields,
  formData,
  onChange,
  buttonText,
  onSubmit,
  footerContent,
  children
}) {

  return (

    /*
    Contenedor principal.

    Tailwind define apariencia visual.
    */

    <section
      className="
        mx-auto
        max-w-6xl
        border
        border-[#ead8d4]
        bg-[#faf7f5]
        px-12
        py-12
      "
    >

      {/* CABECERA */}

      <div className="text-center mb-16">

        {/* título dinámico */}

        <h1
          className="
            font-serif
            text-6xl
            text-[#351118]
          "
        >
          {title}
        </h1>

        {/* subtítulo dinámico */}

        <p className="mt-5 text-gray-500">
          {subtitle}
        </p>

      </div>

      {/*
      FORMULARIO

      onSubmit es un evento del DOM.

      Se ejecuta cuando el usuario
      presiona el botón.

      Teoría:
      Eventos DOM.
      */}

      <form
        onSubmit={onSubmit}
        className="space-y-10"
      >

        {/*
        Renderizado dinámico.

        map() recorre el array fields.

        Por cada objeto genera un FormInput.

        React construye la interfaz
        dinámicamente usando JSX.
        */}

        {fields.map((field) => (

          <FormInput

            key={field.name}

            {...field}

            value={formData[field.name]}

            onChange={onChange}

          />

        ))}

        {/*
        children permite insertar
        contenido extra.

        Ejemplo:
        Confirmar contraseña
        */}

        {children}

        <button
          type="submit"
          className="
            w-full
            bg-[#544166]
            py-5
            text-white
            uppercase
          "
        >
          {buttonText}
        </button>

      </form>

      {/* Pie inferior */}

      <div className="mt-10 text-center">
        {footerContent}
      </div>

    </section>
  );
}

export default AuthForm;
