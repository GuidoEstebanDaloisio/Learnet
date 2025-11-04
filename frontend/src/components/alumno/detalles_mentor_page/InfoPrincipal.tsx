import React from "react";
import "./info-principal.css";

export const InfoPrincipal: React.FC = () => {
  return (
    <div className="perfil-info-principal">

      <section className="encabezado-mentor">
        <img src="/img/Mentor_perfil.png" alt="Foto de Juan P. Ramírez" className="foto-perfil" />

        <div className="info-resumen">
          <h1>Juan P. Ramírez</h1>
          <p className="titulo-area">
            Experto en <strong>Liderazgo de Equipos de Alto Rendimiento</strong> y{" "}
            <strong>Gestión Estratégica</strong>
          </p>

          <div className="stats">
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

      <hr />

      <section className="acerca-de-mi">
        <h2>Acerca de mí</h2>
        <p>
          He pasado más de 15 años liderando equipos en la industria tecnológica y de consultoría. 
          Mi enfoque se centra en el liderazgo situacional, la comunicación efectiva y la construcción 
          de culturas organizacionales fuertes. Ayudo a managers y futuros líderes a superar los desafíos 
          de la gestión moderna y a crear un impacto positivo en sus organizaciones.
        </p>
        <p>
          En mis sesiones, exploraremos temas como la delegación efectiva, la resolución de conflictos, 
          la motivación de equipos remotos, y cómo pasar de ser un experto técnico a un líder inspirador. 
          ¡Transforma tu manera de liderar!
        </p>
      </section>

      <hr />

      <section className="habilidades-experiencia">
        <h2>Habilidades Clave</h2>
        <div className="tags-container">
          {[
            "Liderazgo Situacional",
            "Gestión del Cambio",
            "Comunicaciones",
            "Coaching Ejecutivo",
            "Productividad de Equipos",
            "Estrategia de Negocios",
            "Inteligencia Emocional",
          ].map((habilidad) => (
            <span key={habilidad} className="tag">
              {habilidad}
            </span>
          ))}
        </div>

        <h2>Experiencia Profesional</h2>
        <ul>
          <li>CEO y Cofundador - InnovaTech Solutions (2015 - Actualidad)</li>
          <li>Director de Operaciones (COO) - Global Dynamics Corp. (2010 - 2015)</li>
          <li>Consultor Senior en Liderazgo - Firma de Consultoría Estratégica.</li>
        </ul>
      </section>

      <hr />

      <section className="reseñas">
        <h2>Reseñas de Alumnos (89)</h2>

        <div className="reseña-card">
          <p className="reseña-texto">
            "Juan me dio las herramientas para manejar una situación de crisis con mi equipo. 
            Su perspectiva fue clave. Lo recomiendo al 100% para temas de liderazgo."
          </p>
          <p className="reseña-autor">
            Andrea C. - <span className="reseña-rating">⭐ 5.0</span>
          </p>
        </div>

        <div className="reseña-card">
          <p className="reseña-texto">
            "Excelente mentor. Me ayudó a definir mis prioridades y a delegar efectivamente. 
            Mis niveles de estrés han bajado y mi equipo es más productivo."
          </p>
          <p className="reseña-autor">
            Ricardo V. - <span className="reseña-rating">⭐ 4.5</span>
          </p>
        </div>

        <a href="#" className="btn-ver-mas-reseñas">
          Ver todas las 89 reseñas
        </a>
      </section>

      <hr />

      <section className="fecha-union">
        <p>
          Juan P. Ramírez se unió a la plataforma el <strong>12 de marzo de 2021</strong>.
        </p>
      </section>
    </div>
  );
};
