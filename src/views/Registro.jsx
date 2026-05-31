// VISTA Registro
// Teoría: una vista representa una pantalla completa.
// Esta vista usa el componente RegistroForm para construir la interfaz.

import RegistroForm from "../components/RegistroForm";

function Registro() {
 return (
   <main className="bg-[#faf7f5] px-4 py-10">
     <RegistroForm />
   </main>
 );
}

export default Registro;
