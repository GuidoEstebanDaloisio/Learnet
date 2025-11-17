import React, { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../services/authService";
import { obtenerMentoriasAsignadasDeAlumno } from "../../services/mentoriasAsignadasService";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { Footer } from "../../components/Footer";

import "../../styles/pages/alumno/mis-mentorias.css";
import "../../styles/pages/alumno/tarjetas-mentorias.css"; 


export const MisMentoriasAlumno: React.FC = () => {
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [alumnoId, setAlumnoId] = useState("");

  // 1️⃣ Obtener ID del alumno
  useEffect(() => {
    const loadPerfil = async () => {
      const perfil = await obtenerPerfilUsuario();
      setAlumnoId(perfil.perfil?._id);
    };
    loadPerfil();
  }, []);

  // 2️⃣ Obtener mentorías asignadas
  useEffect(() => {
    if (!alumnoId) return;

    const loadMentorias = async () => {
      try {
        const data = await obtenerMentoriasAsignadasDeAlumno(alumnoId);
        setMentorias(data);
      } catch (error) {
        console.error("Error al cargar mentorías:", error);
      }
    };

    loadMentorias();
  }, [alumnoId]);

  // Función para formatear fecha
  const formatearFecha = (fecha: string) => {
    const f = new Date(fecha);
    return `${f.getDate().toString().padStart(2, "0")}/${(f.getMonth()+1).toString().padStart(2, "0")}/${f.getFullYear()} - ${f.getHours().toString().padStart(2,"0")}:${f.getMinutes().toString().padStart(2,"0")} hs`;
  };

  return (
    <>
      <NavbarAlumno />

      <main className="mentorias-container">
        <section className="titulo-seccion">
          <h2>Mis Mentorías</h2>
          <p>Aquí puedes ver tus mentorías activas, próximas y finalizadas.</p>
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
                  src="/img/Mentor_perfil.png"
                  alt={m.mentor?.nombre || "Mentor"}
                />
                <div className="info">
                  <h3>{m.mentor?.nombre || "Mentor"}</h3>
                  <p className="area">{m.mentoria?.tema || "Área desconocida"}</p>
                  <p className="rating">⭐ 4.9</p>
                </div>
              </div>

              <div className="detalles">
                <p>
                  <strong>Próxima sesión:</strong>{" "}
                  {m.fechaHora ? formatearFecha(m.fechaHora) : "Pendiente"}
                </p>
              </div>

              <div className="acciones">
                <a className="btn" href={`/alumno/detalle-mentoria/${m._id}`}>
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
