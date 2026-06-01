// VISTA ConfirmacionRegistro
// Teoría: una vista representa una pantalla completa asociada a una ruta.
// Esta vista compone la interfaz usando un componente hijo.

import ConfirmacionRegistroCard from "../components/ConfirmacionRegistroCard";

function ConfirmacionRegistro() {
  return (
    <main className="bg-[#faf7f5] px-4 py-10">
      <ConfirmacionRegistroCard />
    </main>
  );
}

export default ConfirmacionRegistro;
