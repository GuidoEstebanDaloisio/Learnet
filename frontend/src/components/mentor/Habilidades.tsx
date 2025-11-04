import React from "react";
import "../../styles/components/perfil_mentor/habilidades-experiencia.css";

export const Habilidades: React.FC = () => (
  <section className="habilidades-experiencia">
    <h2>Habilidades Clave</h2>
    <div className="etiquetas-contenedor">
      {[
        "Liderazgo Situacional",
        "Gestión del Cambio",
        "Comunicación Efectiva",
        "Coaching Ejecutivo",
        "Productividad de Equipos",
        "Estrategia de Negocios",
        "Inteligencia Emocional"
      ].map((habilidad, i) => (
        <span key={i} className="etiqueta">{habilidad}</span>
      ))}
    </div>

    <h2>Experiencia Profesional</h2>
    <ul>
      <li>CEO y Cofundador - InnovaTech Solutions (2015 - Actualidad)</li>
      <li>Director de Operaciones - Global Dynamics Corp. (2010 - 2015)</li>
      <li>Consultor Senior en Liderazgo - Firma de Consultoría Estratégica.</li>
    </ul>
  </section>
);
