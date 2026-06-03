/*
====================================================
PERFIL.JSX
====================================================

VISTA PERFIL

Representa una pantalla completa.

Su responsabilidad es:

- Recibir el usuario desde App.jsx.
- Enviar el usuario a PerfilForm.

No contiene lógica de negocio.

Teoría:
- Componentes React
- Props
- Flujo unidireccional
*/

/*
====================================================
IMPORTS
====================================================
*/

import PerfilForm from "../components/PerfilForm";

/*
====================================================
COMPONENTE
====================================================

Una vista es un componente React
asociado a una ruta.

React Router renderiza Perfil
cuando la URL es:

/perfil
*/

function Perfil({

  /*
  ====================================================
  PROP RECIBIDA
  ====================================================

  El usuario llega desde App.jsx.

  App es el componente padre.

  Teoría:
  Props.
  */

  usuario

}) {

  /*
  ====================================================
  JSX
  ====================================================

  Renderiza la pantalla Perfil.

  El componente PerfilForm recibe
  el usuario mediante props.
  */

  return (

    <main
      className="
        bg-[#faf7f5]
        min-h-screen
        px-4
        py-10
      "
    >

      <PerfilForm

        usuario={usuario}

      />

    </main>

  );

}

/*
====================================================
EXPORTACIÓN
====================================================

Permite importar Perfil
en App.jsx.
*/

export default Perfil;




