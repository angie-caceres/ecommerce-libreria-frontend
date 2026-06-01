// VISTA Perfil
// Teoría: una vista representa una pantalla completa asociada a una ruta.
// Esta vista compone la interfaz utilizando el componente PerfilForm.

import PerfilForm from "../components/PerfilForm";

function Perfil () {
    const usuarioGuardado = JSON.parse(localStorage.getItem("usuario"));

 return (
   <main className="bg-[#faf7f5] px-4 py-10">
     <PerfilForm usuario={usuarioGuardado}/>
   </main>
 );
}

export default Perfil;
