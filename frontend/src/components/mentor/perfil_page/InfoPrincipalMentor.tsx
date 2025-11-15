// src/components/mentor/perfil_page/InfoPrincipalMentor.tsx
import React from "react";
import "../../../styles/pages/alumno/perfilAlumno.css";

interface Props {
  mentor: any;
}

export const InfoPrincipalMentor: React.FC<Props> = ({ mentor }) => {
  const perfil = mentor.perfil;

  return (
    <div className="perfil-info-principal">
      <section className="encabezado-mentor">
        <img
          src="/img/Mentor_perfil.png"
          alt="Foto de Perfil del Mentor"
          className="foto-perfil"
        />

        <div className="info-resumen">
          <h1>{perfil.nombre} {perfil.apellido}</h1>
          <p className="titulo">{perfil.titulo}</p>
          <button className="btn-editar-perfil">Editar Perfil</button>
        </div>
      </section>

      <hr />

      <section className="datos-personales">
        <h2>Información Personal y Profesional</h2>

        <div className="lista-datos">
          <div className="dato-item">
            <span className="dato-etiqueta">📧 Email:</span>
            <span className="dato-valor">{mentor.email}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">🎂 Fecha de nacimiento:</span>
            <span className="dato-valor">
              {new Date(perfil.fechaNacimiento).toLocaleDateString("es-AR")}
            </span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">📝 Presentación:</span>
            <span className="dato-valor">{perfil.presentacion}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">📖 Biografía:</span>
            <span className="dato-valor">{perfil.biografia}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">💡 Habilidades Clave:</span>
            <span className="dato-valor">{perfil.habilidadesClave.join(", ")}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">🏆 Experiencia:</span>
            <span className="dato-valor">{perfil.experiencia}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">💰 Precio por Clase:</span>
            <span className="dato-valor">${perfil.precioPorClase}</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">⏱ Tiempo de Respuesta:</span>
            <span className="dato-valor">{perfil.tiempoRespuesta} horas</span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">✅ Disponible:</span>
            <span className="dato-valor">{perfil.estaDisponible ? "Sí" : "No"}</span>
          </div>
        </div>
      </section>
    </div>
  );
};
