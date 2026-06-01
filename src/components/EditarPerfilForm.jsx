// COMPONENTE EditarPerfilForm
// Teoría: un componente es una función JavaScript que devuelve JSX.
// Usa estado local con useState para editar los datos del usuario.
// Usa eventos onChange y onSubmit para responder a la interacción del usuario.

import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

function EditarPerfilForm() {
 // Recuperamos los datos guardados en localStorage.
 // Esto simula persistencia en el frontend.
 const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

 // ESTADOS LOCALES
 // Cada estado guarda un dato editable del formulario.
 const [nombre, setNombre] = useState(usuarioGuardado?.nombre || "");
 const [email, setEmail] = useState(usuarioGuardado?.email || "");
 const [password, setPassword] = useState(usuarioGuardado?.password || "");

 // Hook de React Router para navegar entre vistas sin recargar.
 const navigate = useNavigate();

 // EVENTO SUBMIT
 // Se ejecuta cuando el usuario presiona "GUARDAR CAMBIOS".
 const handleSubmit = (e) => {
   e.preventDefault();

   const usuarioActualizado = {
     nombre,
     email,
     password,
   };

   // Guardamos los cambios para que persistan.
   localStorage.setItem("usuario", JSON.stringify(usuarioActualizado));

   // SweetAlert muestra una confirmación visual al usuario.
   Swal.fire({
     title: "Cambios guardados",
     text: "Tu perfil fue actualizado con éxito.",
     icon: "success",
     confirmButtonText: "Volver a mi perfil",
     confirmButtonColor: "#4b385c",
   }).then(() => {
     navigate("/perfil");
   });
 };

 return (
   <section className="mx-auto max-w-6xl bg-white px-8 py-12 shadow-sm md:px-20">
     <div className="mb-14">
       <h1 className="font-serif text-5xl text-[#351118]">
         Edita tu perfil
       </h1>

       <p className="mt-3 text-gray-500">
         Actualiza tus preferencias para una experiencia más personalizada.
       </p>
     </div>

     <div className="grid gap-10 md:grid-cols-[260px_1fr]">
       <aside className="rounded-md border border-[#ead8d4] bg-[#f8f5f3] p-8 text-center">
         <div className="mx-auto mb-6 h-28 w-28 rounded-full bg-gray-300"></div>

         <h2 className="font-serif text-3xl text-[#351118]">
           {nombre || "Usuario"}
         </h2>

         <p className="text-xs font-semibold uppercase tracking-widest text-gray-500">
           Miembro senior
         </p>

         <div className="my-6 h-px bg-[#d8c5c1]"></div>

         <div className="flex justify-between text-sm">
           <span>Lecturas Completadas</span>
           <strong>42</strong>
         </div>

         <div className="mt-3 flex justify-between text-sm">
           <span>Colecciones Curadas</span>
           <strong>12</strong>
         </div>
       </aside>

       <form onSubmit={handleSubmit}>
         <div className="mb-7">
           <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
             Nombre completo
           </label>

           <input
             type="text"
             value={nombre}
             onChange={(e) => setNombre(e.target.value)}
             className="w-full border-b border-[#ead8d4] bg-transparent px-3 py-3 outline-none"
           />
         </div>

         <div className="mb-7">
           <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
             Correo electrónico
           </label>

           <input
             type="email"
             value={email}
             onChange={(e) => setEmail(e.target.value)}
             className="w-full border-b border-[#ead8d4] bg-transparent px-3 py-3 outline-none"
           />
         </div>

         <div className="mb-10">
           <label className="mb-3 block text-xs font-bold uppercase tracking-widest text-[#5c4b51]">
             Contraseña
           </label>

           <input
             type="password"
             value={password}
             onChange={(e) => setPassword(e.target.value)}
             className="w-full border-b border-[#ead8d4] bg-transparent px-3 py-3 outline-none"
           />
         </div>

         <div className="my-10 flex items-center gap-5">
           <div className="h-px flex-1 bg-[#eadfdd]"></div>
           <span className="text-[#9b7c7c]">◇</span>
           <div className="h-px flex-1 bg-[#eadfdd]"></div>
         </div>

         <button
           type="submit"
           className="w-full bg-[#4b385c] py-4 text-sm font-semibold tracking-[0.25em] text-white transition hover:bg-[#382943]"
         >
           GUARDAR CAMBIOS
         </button>

         <div className="mt-5 flex justify-center gap-10 border-b border-[#f0e7e5] pb-5 text-xs font-semibold uppercase tracking-widest text-[#5c4b51]">
           <Link to="/perfil">Cancelar</Link>
           <Link to="/">Volver al inicio</Link>
         </div>

         <div className="mt-8 text-center">
           <p className="font-serif text-xl italic text-[#351118]">
             "La sabiduría no se traspasa, se conquista."
           </p>

           <p className="mt-2 text-xs tracking-widest text-gray-500">
             — Hermann Hesse
           </p>
         </div>
       </form>
     </div>
   </section>
 );
}

export default EditarPerfilForm;

