import React, { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../services/authService";
import { obtenerMentoriasAsignadasDeMentor } from "../../services/mentoriasAsignadasService";
import { NavbarMentor } from "../../components/NavbarMentor";
import { Footer } from "../../components/Footer";

import "../../styles/pages/alumno/mis-mentorias.css";
import "../../styles/pages/alumno/tarjetas-mentorias.css"; 

export const Agenda: React.FC = () => {
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [mentorId, setMentorId] = useState("");

  // 1️⃣ Obtener ID del mentor
  useEffect(() => {
    const loadPerfil = async () => {
      const perfil = await obtenerPerfilUsuario();
      setMentorId(perfil.perfil?._id);
    };
    loadPerfil();
  }, []);

  // 2️⃣ Obtener mentorías asignadas
  useEffect(() => {
    if (!mentorId) return;

    const loadMentorias = async () => {
      try {
        const data = await obtenerMentoriasAsignadasDeMentor(mentorId);
        setMentorias(data);
      } catch (error) {
        console.error("Error al cargar mentorías:", error);
      }
    };

    loadMentorias();
  }, [mentorId]);

  // Función para formatear fecha
  const formatearFecha = (fecha: string) => {
    if (!fecha) return "Pendiente";
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth()+1).toString().padStart(2,"0")}/${f.getFullYear()} - ${f.getHours().toString().padStart(2,"0")}:${f.getMinutes().toString().padStart(2,"0")} hs`;
  };

  return (
    <>
      <NavbarMentor />

      <main className="mentorias-container">
        <section className="titulo-seccion">
          <h2>Agenda de Mentorías</h2>
          <p>Aquí puedes ver tus mentorías agendadas y próximas sesiones.</p>
        </section>

        <div className="filtros-estado">
          <button className="filtro activo" data-filtro="todas">Todas</button>
          <button className="filtro" data-filtro="activa">En curso</button>
          <button className="filtro" data-filtro="proxima">Próximas</button>
          <button className="filtro" data-filtro="finalizada">Finalizadas</button>
        </div>

        <div className="mentorias-grid">
          {mentorias.length === 0 && <p>No tienes mentorías asignadas aún.</p>}

          {mentorias.map((m) => (
            <div
              key={m._id}
              className={`mentoria-card ${m.estado?.toLowerCase() || "activa"}`}
            >
              <div className={`estado ${m.estado?.toLowerCase() || "activa"}`}>
                {m.estado === "pendiente" ? "En curso" : m.estado}
              </div>

              <div className="header-card">
                <img
                  src="/img/Mentora_perfil.png"
                  alt={m.alumno?.nombre || "Alumno"}
                />
                <div className="info">
                  <h3>{m.alumno?.nombre || "Alumno"}</h3>
                  <p className="area">{m.mentoria?.tema || "Área desconocida"}</p>
                </div>
              </div>

              <div className="detalles">
                <p>
                  <strong>Próxima sesión:</strong>{" "}
                  {m.fechaHora ? formatearFecha(m.fechaHora) : "Pendiente"}
                </p>
              </div>

              <div className="acciones">
                <a className="btn" href={`/mentor/detalle-mentoria/${m._id}`}>
                  Ver Detalles
                </a>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </>
  );
};
