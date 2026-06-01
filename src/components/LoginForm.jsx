import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// COMPONENTE LoginForm
// Teoría: un componente es una función JavaScript que devuelve JSX.
// React construye la interfaz combinando componentes reutilizables.
// PDF: Componentes en React.
function LoginForm() {
// ============================
// ESTADOS LOCALES (useState)
// ============================
// Teoría:
// useState permite crear estado local dentro de un componente.
// El estado local almacena información que cambia durante la ejecución.
// PDF: Estados locales y props.
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
// ============================
// NAVEGACIÓN SPA
// ============================
// Hook de React Router.
// Permite cambiar de vista sin recargar la página.
const navigate = useNavigate();
// ============================
// EVENTO SUBMIT
// ============================
// Teoría DOM:
// submit es un evento generado por el usuario.
// React captura ese evento y ejecuta esta función.
const handleSubmit = (e) => {
// Evita que el navegador recargue la página.
e.preventDefault();

// Recuperamos el usuario registrado desde localStorage.
const usuarioRegistrado = JSON.parse(
  localStorage.getItem("usuario")
);

// Validamos si existe un usuario registrado.
if (!usuarioRegistrado) {

  alert(
    "No existe ningún usuario registrado. Debes registrarte primero."
  );

  return;
}

// Validamos email y contraseña.
if (
  email === usuarioRegistrado.email &&
  password === usuarioRegistrado.password
) {

  // Guardamos la sesión activa.
  localStorage.setItem(
    "usuarioLogueado",
    JSON.stringify(usuarioRegistrado)
  );

  // Redireccionamos al catálogo.
  navigate("/catalogo");

} else {

  alert(
    "Correo electrónico o contraseña incorrectos."
  );

}

};
return (
<section className="max-w-5xl mx-auto bg-white border border-gray-200 p-12">

  {/* ENCABEZADO */}
  <div className="text-center mb-10">

    <h1 className="text-5xl font-serif text-[#351118]">
      Bienvenido
    </h1>

    <p className="text-gray-500 mt-3">
      Accede a tu santuario literario personal.
    </p>

  </div>

  {/* FORMULARIO */}
  <form
    onSubmit={handleSubmit}
    className="max-w-4xl mx-auto"
  >

    {/* EMAIL */}
    <div className="mb-8">

      <label className="block text-2xl font-serif text-[#351118] mb-4">
        Correo electrónico
      </label>

      <input
        type="email"
        placeholder="ejemplo@libros.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        required
        className="w-full border-b border-gray-400 py-3 outline-none"
      />

    </div>

    {/* PASSWORD */}
    <div className="mb-8">

      <div className="flex justify-between mb-4">

        <label className="text-2xl font-serif text-[#351118]">
          Contraseña
        </label>

        <Link
          to="/login"
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
        required
        className="w-full border-b border-gray-400 py-3 outline-none"
      />

    </div>

    {/* BOTÓN LOGIN */}
    <button
      type="submit"
      className="w-full bg-[#4b385c] text-white py-4 hover:bg-[#382943] transition"
    >
      INICIAR SESIÓN
    </button>

  </form>

  {/* SEPARADOR */}
  <div className="flex items-center gap-4 my-10">

    <div className="h-px bg-gray-200 flex-1"></div>

    <span>◇</span>

    <div className="h-px bg-gray-200 flex-1"></div>

  </div>

  {/* REGISTRO */}
  <p className="text-center text-gray-500">

    ¿No tienes una cuenta?

    <Link
      to="/registro"
      className="text-[#7c5fa0] font-semibold ml-2"
    >
      Regístrese
    </Link>

  </p>

  {/* FRASE FINAL */}
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




