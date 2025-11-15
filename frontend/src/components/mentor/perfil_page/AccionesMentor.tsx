// src/components/mentor/perfil_page/AccionesMentor.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import "../../../styles/pages/alumno/perfilAlumno.css";

interface Props {
  mentor: any;
}

export const AccionesMentor: React.FC<Props> = ({ mentor }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const toggleDisponibilidad = () => {
    // Aquí podrías hacer un request a backend para actualizar disponibilidad
    alert("Funcionalidad de disponibilidad aún no implementada");
  };

  return (
    <aside className="perfil-acciones-mentor">
      <div className="tarjeta-sesion">
        <h3>Ajustes de la Cuenta</h3>
        <button className="btn-solicitar-mentoria" onClick={toggleDisponibilidad}>
          {mentor.perfil.estaDisponible ? "Marcar como no disponible" : "Marcar como disponible"}
        </button>
        <button onClick={handleLogout} className="reportar-link">
          Cerrar Sesión
        </button>
      </div>
    </aside>
  );
};
