import React from "react";
import "../../styles/components/perfil_mentor/presentacion.css";

export const Presentacion: React.FC = () => (
  <section className="encabezado-mentor">
    <img src="/img/Mentor_perfil.png" alt="Foto de Juan P. Ramírez" className="foto-perfil" />
    <div className="info-resumen">
      <h1>Juan P. Ramírez</h1>
      <p className="titulo-area">
        Experto en <strong>Liderazgo de Equipos de Alto Rendimiento</strong> y{" "}
        <strong>Gestión Estratégica</strong>
      </p>
      <div className="estadisticas">
        <span>⭐ <strong>4.8</strong> (89 reseñas)</span>
        <span>✅ <strong>75+</strong> Mentorías completadas</span>
        <span>🗓️ Responde en 12h</span>
      </div>
      <p className="bio-corta">
        "Mi experiencia como CEO me permite guiarte para potenciar tus habilidades de liderazgo,
        mejorar la productividad de tu equipo y alcanzar objetivos estratégicos claros."
      </p>
    </div>
  </section>
);
