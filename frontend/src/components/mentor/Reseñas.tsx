import React from "react";
import "../../styles/components/perfil_mentor/reseñas.css";

export const Reseñas: React.FC = () => (
  <section className="reseñas">
    <h2>Reseñas de alumnos (89)</h2>

    <div className="reseña-card">
      <p className="reseña-texto">
        "Juan me dio las herramientas para manejar una situación de crisis con mi equipo. Su perspectiva fue clave."
      </p>
      <p className="reseña-autor">Andrea C. - <span className="reseña-rating">⭐ 5.0</span></p>
    </div>

    <div className="reseña-card">
      <p className="reseña-texto">
        "Excelente mentor. Me ayudó a definir mis prioridades y a delegar efectivamente."
      </p>
      <p className="reseña-autor">Ricardo V. - <span className="reseña-rating">⭐ 4.5</span></p>
    </div>

    <a href="#" className="btn-ver-mas-reseñas">Ver todas las reseñas</a>
  </section>
);
