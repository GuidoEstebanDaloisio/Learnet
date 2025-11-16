import React, { useEffect, useState } from "react";
import { obtenerPerfilUsuario } from "../../services/authService";
import { obtenerSolicitudesParaMentor } from "../../services/reservaService";
import { NavbarMentor } from "../../components/NavbarMentor";
import { Footer } from "../../components/Footer";

import "../../styles/pages/mentor/lista-base.css";

export const SolicitudesMentor: React.FC = () => {
  const [solicitudes, setSolicitudes] = useState<any[]>([]);
  const [mentorId, setMentorId] = useState("");

  // 1️⃣ Obtener el ID del mentor
  useEffect(() => {
    const loadPerfil = async () => {
      const perfil = await obtenerPerfilUsuario();
      setMentorId(perfil.perfil?._id); // ID del mentor
    };
    loadPerfil();
  }, []);

  // 2️⃣ Cargar solicitudes
  useEffect(() => {
    if (!mentorId) return;

    const loadSolicitudes = async () => {
      const data = await obtenerSolicitudesParaMentor(mentorId);
      setSolicitudes(data);
    };

    loadSolicitudes();
  }, [mentorId]);

   return (
    <>
      <NavbarMentor />

      <h2>Solicitudes Recibidas</h2>
      <hr />

      {solicitudes.length === 0 ? (
        <p>No tienes solicitudes pendientes.</p>
      ) : (
        <ul className="lista">
          {solicitudes.map((s) => (
            <li key={s._id} className="item">

              {/* NOMBRE ALUMNO */}
              <h3 className="item-titulo">
                {s.alumno?.nombre || "Alumno sin nombre"}
              </h3>

              {/* DETALLES */}
              <span className="item-detalle">
                <strong>Habilidad solicitada:</strong> {s.habilidad}
              </span>

              <span className="item-detalle">
                <strong>Estado:</strong> {s.estado}
              </span>

              <span className="item-detalle">
                <strong>Fecha:</strong> {new Date(s.fechaSolicitud).toLocaleString()}
              </span>

              {/* MENSAJE DEL ALUMNO */}
              {s.mensaje && (
                <p className="item-descripcion">
                  {s.mensaje}
                </p>
              )}

              {/* ACCIONES */}
              <div className="item-acciones">
                <button className="item-btn item-btn-primario">
                  Aceptar
                </button>

                <button className="item-btn item-btn-secundario">
                  Rechazar
                </button>
              </div>

            </li>
          ))}
        </ul>
      )}

      <Footer />
    </>
  );
};