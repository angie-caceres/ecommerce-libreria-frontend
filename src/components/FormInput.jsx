/*
=====================================================
FORMINPUT.JSX
=====================================================

COMPONENTE REUTILIZABLE

Este componente representa un único campo
de entrada de datos (input).

Se reutiliza en:

- Login
- Registro
- Perfil
- EditarPerfil

¿Por qué existe?

Porque React promueve la reutilización de
componentes para evitar duplicar código.

En lugar de escribir varias veces:

<label>...</label>
<input ... />

se encapsula esa lógica en un único componente.

Teoría relacionada:
- Componentes React
- Props
- Reutilización
*/

/*
=====================================================
COMPONENTE
=====================================================

Un componente React es una función JavaScript
que devuelve JSX.

Teoría:
"Un componente es una función que devuelve JSX"
*/

function FormInput({

  /*
  ===================================================
  PROPS
  ===================================================

  Las props son datos enviados por el componente padre.

  Teoría:
  Las props permiten la comunicación entre
  componentes.

  Son de solo lectura.
  */

  label,

  name,

  type = "text",

  value,

  onChange,

  placeholder = "",

  required = false

}) {

  /*
  ===================================================
  JSX
  ===================================================

  JSX es la combinación entre JavaScript y HTML
  que utiliza React para construir interfaces.

  React transforma este JSX en elementos del DOM.
  */

  return (

    /*
    =================================================
    CONTENEDOR
    =================================================

    Agrupa label + input.

    Tailwind:
    w-full = ancho completo
    mb-8 = margen inferior
    */

    <div className="w-full mb-8">

      {/*
      ================================================
      LABEL
      ================================================

      Muestra el texto descriptivo del campo.

      htmlFor conecta el label con el input.

      Mejora accesibilidad.
      */}

      <label

        htmlFor={name}

        className="
          block
          mb-3
          uppercase
          tracking-widest
          text-sm
          font-semibold
          text-[#6b5c61]
        "

      >

        {/*
        Renderizado dinámico.

        Ejemplos:

        Correo electrónico
        Contraseña
        Nombre completo
        */}

        {label}

      </label>

      {/*
      ================================================
      INPUT
      ================================================

      Campo reutilizable.

      Puede funcionar como:

      - text
      - email
      - password

      dependiendo del valor recibido en type.
      */}

      <input

        /*
        Identificador único.

        Se vincula con htmlFor.
        */
        id={name}

        /*
        Nombre del campo.

        Permite identificar qué propiedad
        debe actualizar React.
        */
        name={name}

        /*
        Tipo del input.

        text
        email
        password
        */
        type={type}

        /*
        Valor controlado por React.

        El valor viene desde useState
        del componente padre.

        Teoría:
        Componentes controlados.
        */
        value={value}

        /*
        Evento del DOM.

        Se ejecuta cuando el usuario escribe.

        React captura el evento y actualiza
        el estado.

        Teoría:
        Eventos DOM.
        */
        onChange={onChange}

        /*
        Texto de ayuda.
        */
        placeholder={placeholder}

        /*
        Campo obligatorio.

        No agrega lógica de negocio.
        Sólo comportamiento HTML.
        */
        required={required}

        className="
          w-full
          bg-transparent

          border-b
          border-[#cbbfc2]

          pb-4

          text-lg
          text-[#2d2528]

          placeholder:text-gray-400

          outline-none

          focus:border-[#544166]

          transition
        "
      />

    </div>

  );

}

/*
=====================================================
EXPORTACIÓN
=====================================================

Permite importar este componente
en otros archivos.

Ejemplos:

import FormInput from "../components/FormInput";

Teoría:
Módulos ES6.
*/

export default FormInput;

