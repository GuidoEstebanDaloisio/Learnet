import React from "react";
import "../styles/components/hero.css";
import buttons from "../styles/modules/buttons.module.css";

export const Hero: React.FC = () => {
  return (
    <section className="hero">
      <div className="hero-content">
        <h4>Sección principal</h4>
        <h1>Conectá con mentores expertos y potenciá tu aprendizaje</h1>
        <button className={buttons.btn}>Explorar mentores</button>
      </div>
      <div className="hero-image">
        <img src="/img/Mentor_y_alumno_index.png" alt="Mentor y alumno" />
      </div>
    </section>
  );
};
