// VISTA Registro
// Teoría: una vista representa una pantalla completa.
// Esta vista usa el componente RegistroForm para construir la interfaz.

import RegistroForm from "../components/RegistroForm";
import {useNavigate} from "react-router-dom";

function Registro({setUsuario}) {
  const navigate = useNavigate();

  const handleSubmit = (datosFormulario) => {
    setUsuario(datosFormulario);
    navigate ("/perfil");
    };

  return (
    <main className="bg-[#faf7f5] px-4 py-10">
      <RegistroForm onSubmit={handleSubmit} />
    </main>
  );
}

export default Registro;

