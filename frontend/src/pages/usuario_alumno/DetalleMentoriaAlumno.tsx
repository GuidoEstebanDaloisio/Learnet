import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerMentoriaAsignadaPorId } from "../../services/mentoriasAsignadasService";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { Footer } from "../../components/Footer";

import "../../styles/pages/alumno/detalle-mentoria.css";

export const DetalleMentoriaAlumno: React.FC = () => {
  const { mentoriaId } = useParams<{ mentoriaId: string }>();
  const [mentoria, setMentoria] = useState<any>(null);

  useEffect(() => {
    if (!mentoriaId) return;

    const loadMentoria = async () => {
      try {
        const data = await obtenerMentoriaAsignadaPorId(mentoriaId);
        setMentoria(data);
      } catch (error) {
        console.error("Error al cargar mentoría:", error);
      }
    };

    loadMentoria();
  }, [mentoriaId]);

  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Pendiente";
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, "0")}/${
      (f.getMonth() + 1).toString().padStart(2, "0")
    }/${f.getFullYear()} - ${f.getHours().toString().padStart(2, "0")}:${f
      .getMinutes()
      .toString()
      .padStart(2, "0")} hs`;
  };

  if (!mentoria) return <p>Cargando mentoría...</p>;

  return (
    <>
      <NavbarAlumno />

      <main className="detalles-mentoria-container">
        <p className="breadcrumb">
          <a href="/alumno/mis-mentorias">Mis Mentorías</a> / {mentoria.mentoria?.tema || "Sin tema"}
        </p>

        <header className="header-detalles">
          <h2 className="titulo-mentoria">{mentoria.mentoria?.tema || "Sin tema"}</h2>
        </header>

        <section className="mentor-resumen-grid">
          <div className="card-mentor-detalles">
            <img
              src="/img/Mentor_perfil.png"
              alt={mentoria.mentor?.nombre || "Mentor"}
              className="mentor-foto"
            />
            <h3>{mentoria.mentor?.nombre || "Mentor"}</h3>
            <p className="area-experiencia">{mentoria.mentoria?.descripcion || ""}</p>
            <p className="rating-detalles">⭐ 4.9 (65 opiniones)</p>
            <div className="contacto-acciones">
              {mentoria.linkMeet && (
                <a href={mentoria.linkMeet} target="_blank" rel="noopener noreferrer">
                  <button className="btn-sesion">🔗 Unirse a Sesión</button>
                </a>
              )}
            </div>
          </div>

          <div className="resumen-mentoria">
            <h3>Resumen y Objetivos</h3>
            <p>{mentoria.mentoria?.descripcion}</p>
            <ul>
              <li>Tema: {mentoria.mentoria?.tema}</li>
              <li>Fecha de sesión: {formatearFecha(mentoria.fechaHora)}</li>
              <li>Mentor: {mentoria.mentor?.nombre}</li>
            </ul>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
