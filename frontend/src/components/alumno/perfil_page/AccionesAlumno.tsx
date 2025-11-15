import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/alumno/perfilAlumno.css";

interface Props {
  alumno: any;
}

export const AccionesAlumno: React.FC<Props> = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <aside className="perfil-acciones-alumno">
      <div className="tarjeta-sesion">
        <h3>Ajustes de la Cuenta</h3>
        <button className="btn-solicitar-mentoria">Cambiar contraseña</button>
        <button onClick={handleLogout} className="reportar-link">
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
