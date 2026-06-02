/*
====================================================
LOGIN.JSX
====================================================


Vista Login.


Esta vista representa únicamente el contenido
central de la pantalla.


Navbar y Footer NO se renderizan aquí
porque ya se encuentran en App.jsx.


Teoría relacionada:
- Routing React
- Componentes React
- Estado local con useState
*/


import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";


import Quote from "../components/Quote";
import AuthForm from "../components/AuthForm";


function Login() {


  /*
  ====================================================
  useNavigate
  ====================================================


  Hook de React Router.


  Permite cambiar de ruta mediante código.


  En este caso:
  Login → Perfil


  Teoría:
  Routing en aplicaciones SPA.
  */


  const navigate = useNavigate();


  /*
  ====================================================
  ESTADO LOCAL
  ====================================================


  useState almacena información que cambia.


  React vuelve a renderizar el componente
  automáticamente cuando cambia el estado.


  Teoría:
  Estados locales en React.
  */


  const [formData, setFormData] = useState({


    email: "",


    password: ""


  });


  /*
  ====================================================
  CONFIGURACIÓN DE CAMPOS
  ====================================================


  Este array describe los inputs que
  AuthForm debe generar.


  Gracias a esto evitamos escribir
  manualmente cada input.


  Reutilización de componentes.
  */


  const fields = [


    {
      label: "Correo electrónico",
      name: "email",
      type: "email",
      placeholder: "ejemplo@libros.com"
    },


    {
      label: "Contraseña",
      name: "password",
      type: "password"
    }


  ];


  /*
  ====================================================
  EVENTO onChange
  ====================================================


  Se ejecuta cuando el usuario escribe.


  React captura el evento del DOM
  y actualiza el estado.


  Teoría:
  Eventos DOM + useState.
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


  Se ejecuta cuando el usuario
  presiona INICIAR SESIÓN.


  preventDefault evita que el navegador
  recargue la página.


  navigate cambia la vista a Perfil.


  Teoría:
  Eventos del DOM + Routing React.
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
        Título principal
        */


        title="Bienvenido"


        /*
        Subtítulo
        */


        subtitle="Accede a tu santuario literario personal."


        /*
        Campos que debe generar AuthForm
        */


        fields={fields}


        /*
        Estado del formulario
        */


        formData={formData}


        /*
        Evento de escritura
        */


        onChange={handleChange}


        /*
        Texto del botón
        */


        buttonText="INICIAR SESIÓN"


        /*
        Evento submit
        */


        onSubmit={handleSubmit}


        /*
        Texto inferior
        */


        footerContent={


          <>
            ¿No tienes una cuenta?{" "}


            <Link


              to="/registro"


              className="
                text-[#7d6296]
                font-semibold
                hover:underline
              "


            >
              Regístrese
            </Link>


          </>


        }


      />


      {/* Frase literaria */}


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


export default Login;







