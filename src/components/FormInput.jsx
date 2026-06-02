/*
=====================================================
FORMINPUT.JSX
=====================================================

Este componente representa un único campo del formulario.

La teoría de React indica que un componente es una
función JavaScript que devuelve JSX y puede reutilizarse
en distintas partes de la aplicación.

En este proyecto se reutiliza en:

- Login
- Registro
- Perfil

De esta forma evitamos duplicar código.

Teoría relacionada:
Componentes React
(Exposición de experto + Estados y Props)
*/

function FormInput({

  /*
  Props recibidas desde el componente padre.

  Según la teoría:

  Las props son el mecanismo que permite que un
  componente padre envíe información a un hijo.

  Son de solo lectura.

  En este caso AuthForm envía la información
  necesaria para construir cada input.
  */

  label,
  name,
  type = "text",
  value,
  onChange,
  placeholder = ""

}) {

  /*
  El componente retorna JSX.

  JSX es la mezcla entre JavaScript y HTML
  que React utiliza para construir la interfaz.

  Teoría:
  "Un componente es una función JavaScript
  que devuelve JSX".
  */

  return (

    /*
    Contenedor del input.

    w-full = ocupa todo el ancho disponible.

    mb-8 = margen inferior.

    Tailwind permite aplicar estilos mediante clases.
    */

    <div className="w-full">

      {/*
      LABEL

      Muestra el nombre del campo.

      htmlFor conecta el label con el input.

      Esto mejora accesibilidad.
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
        Renderizamos dinámicamente el texto
        recibido mediante props.

        Ejemplos:

        label="Correo electrónico"

        label="Contraseña"

        label="Nombre completo"
        */}

        {label}

      </label>

      {/*
      INPUT

      Campo de entrada reutilizable.

      El mismo componente sirve para:

      email
      password
      nombre
      apellido
      etc.
      */}

      <input

        /*
        ID asociado al label.

        Se recibe mediante props.
        */
        id={name}

        /*
        Nombre del campo.

        Se usa para identificar qué valor
        debe actualizarse.
        */
        name={name}

        /*
        Tipo del input.

        Puede ser:

        text
        email
        password

        según la vista.
        */
        type={type}

        /*
        Value transforma el input
        en un componente controlado.

        React controla el valor
        mostrado en pantalla.

        Esto está relacionado con el estado local.
        */
        value={value}

        /*
        Evento del DOM.

        Se ejecuta cada vez que el usuario
        escribe algo.

        Teoría relacionada:
        Eventos del DOM

        input
        change

        React utiliza onChange para capturar
        los cambios.
        */
        onChange={onChange}

        /*
        Texto de ayuda.
        */
        placeholder={placeholder}

        className="
          w-full
          bg-transparent
          border-b
          border-[#cbbfc2]
          pb-4
          outline-none
          text-lg
        "
      />

    </div>

  );
}

/*
Exportamos el componente.

Esto permite reutilizarlo
en Login, Registro y Perfil.

Teoría:
Módulos ES6.
Cada componente vive en su propio archivo
y puede importarse en otros componentes.
*/

export default FormInput;




