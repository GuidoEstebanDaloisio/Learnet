import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { obtenerMentoriaAsignadaPorId } from "../../services/mentoriasAsignadasService";
import { NavbarMentor } from "../../components/NavbarMentor";
import { Footer } from "../../components/Footer";

import "../../styles/pages/alumno/detalle-mentoria.css";

export const DetalleMentoriaMentor: React.FC = () => {
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
      <NavbarMentor />

      <main className="detalles-mentoria-container">
        <p className="breadcrumb">
          <a href="/mentor/agenda">Agenda</a> / {mentoria.mentoria?.tema || "Mentoría"}
        </p>

        <header className="header-detalles">
          <h2 className="titulo-mentoria">{mentoria.mentoria?.tema}</h2>
        </header>

        <section className="mentor-resumen-grid">
          {/* Panel con información del alumno */}
          <div className="card-mentor-detalles">
            <img
              src="/img/Alumna_perfil.png"
              alt={mentoria.alumno?.nombre || "Alumno"}
              className="mentor-foto"
            />
            <h3>{mentoria.alumno?.nombre}</h3>

            <p className="area-experiencia">{mentoria.mentoria?.descripcion}</p>
            <p className="rating-detalles">📘 Alumno</p>

            <div className="contacto-acciones">
              {mentoria.linkMeet && (
                <a href={mentoria.linkMeet} target="_blank" rel="noopener noreferrer">
                  <button className="btn-sesion">🔗 Iniciar Sesión</button>
                </a>
              )}
            </div>
          </div>

          {/* Información de la mentoría */}
          <div className="resumen-mentoria">
            <h3>Detalles de la Mentoría</h3>
            <p>{mentoria.mentoria?.descripcion}</p>

            <ul>
              <li><strong>Tema:</strong> {mentoria.mentoria?.tema}</li>
              <li><strong>Fecha y hora:</strong> {formatearFecha(mentoria.fechaHora)}</li>
              <li><strong>Alumno:</strong> {mentoria.alumno?.nombre}</li>
              <li><strong>Estado:</strong> {mentoria.estado}</li>
            </ul>

            <div className="acciones-mentor">
              <button className="btn-finalizar">✔ Finalizar Mentoría</button>
              <button className="btn-cancelar">✖ Cancelar</button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </>
  );
};
