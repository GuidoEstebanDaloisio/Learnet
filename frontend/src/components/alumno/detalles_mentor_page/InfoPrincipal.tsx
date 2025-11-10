import "./info-principal.css";

interface InfoPrincipalProps {
  mentor: {
    nombre: string;
    apellido: string;
    titulo: string;
    presentacion: string;
    biografia: string;
    habilidadesClave: string[];
    experiencia: string;
    precioPorClase: number;
    tiempoRespuesta: string;
    fotoPerfil?: string;
    fechaRegistro?: string;
  };
}

export const InfoPrincipal: React.FC<InfoPrincipalProps> = ({ mentor }) => {
  return (
    <div className="perfil-info-principal">

      <section className="encabezado-mentor">
        <img
          src={mentor.fotoPerfil || "/img/Mentor_perfil.png"}
          alt={`Foto de ${mentor.nombre} ${mentor.apellido}`}
          className="foto-perfil"
        />

        <div className="info-resumen">
          <h1>{mentor.nombre} {mentor.apellido}</h1>
          <p className="titulo-area">
            <strong>{mentor.titulo}</strong>
          </p>

          <div className="stats">
            <span>⭐ <strong>4.8</strong> (89 reseñas)</span>
            <span>✅ <strong>75+</strong> Mentorías completadas</span>
            <span>🗓️ Responde en {mentor.tiempoRespuesta} hs o menos</span>
          </div>

          <p className="bio-corta">"{mentor.presentacion}"</p>
        </div>
      </section>

      <hr />

      <section className="acerca-de-mi">
        <h2>Acerca de mí</h2>
        <p>{mentor.biografia}</p>
      </section>

      <hr />

      <section className="habilidades-experiencia">
        <h2>Habilidades Clave</h2>
        <div className="tags-container">
          {mentor.habilidadesClave && mentor.habilidadesClave.length > 0 ? (
            mentor.habilidadesClave.map((hab, i) => (
              <span key={i} className="tag">{hab}</span>
            ))
          ) : (
            <p>No se registraron habilidades aún.</p>
          )}
        </div>

        <h2>Experiencia Profesional</h2>
        <p>{mentor.experiencia}</p>
      </section>

      <hr />

      <section className="reseñas">
        <h2>Reseñas de Alumnos (89)</h2>
        <div className="reseña-card">
          <p className="reseña-texto">
            "Excelente mentor. Me ayudó a definir mis prioridades y mejorar mis habilidades de liderazgo."
          </p>
          <p className="reseña-autor">Andrea C. - <span className="reseña-rating">⭐ 5.0</span></p>
        </div>
        <div className="reseña-card">
          <p className="reseña-texto">
            "Muy profesional y atento. Recomiendo sus mentorías al 100%."
          </p>
          <p className="reseña-autor">Ricardo V. - <span className="reseña-rating">⭐ 4.5</span></p>
        </div>
        <a href="#" className="btn-ver-mas-reseñas">Ver todas las reseñas</a>
      </section>

      <hr />

<section className="fecha-union">
  <p>
    {mentor.nombre} se unió a la plataforma el{" "}
    <strong>
      {mentor.fechaRegistro
        ? new Date(mentor.fechaRegistro).toLocaleDateString("es-ES", {
            day: "numeric",
            month: "long",
            year: "numeric",
          })
        : "fecha desconocida"}
    </strong>.
  </p>
</section>

    </div>
  );
};
