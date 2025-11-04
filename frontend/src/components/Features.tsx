import React from "react";
import "../styles/components/features.css";

export const Features: React.FC = () => {
  return (
    <section className="features">
      <div className="features-new-style">
        <h2 className="features-title">¿Por qué elegir Learnet?</h2>

        <div className="feature-box">
          <div className="feature-icon icon-verified">
            <img src="/img/Logo_verificado.png" alt="Mentores Verificados" />
          </div>
          <h3>Mentores verificados</h3>
          <p>Aprende de profesionales con experiencia real en la industria.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon icon-growth">
            <img src="/img/Logo_crecimiento.png" alt="Desarrollo profesional" />
          </div>
          <h3>Desarrollo profesional</h3>
          <p>Potenciá tu perfil y alcanzá tus metas laborales.</p>
        </div>

        <div className="feature-box">
          <div className="feature-icon icon-network-share">
            <img src="/img/Logo_compartir.png" alt="Networking" />
          </div>
          <h3>Networking</h3>
          <p>Conecta con una comunidad activa de expertos y estudiantes.</p>
        </div>
      </div>
    </section>
  );
};
