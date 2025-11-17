import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { obtenerPerfilUsuario } from "../../services/authService";
import { obtenerMentoriasPorMentorYTema } from "../../services/mentoriaService";
import { aceptarReserva } from "../../services/reservaService";
import { NavbarMentor } from "../../components/NavbarMentor";
import { Footer } from "../../components/Footer";

export const AsignarMentoria: React.FC = () => {
  const { reservaId, habilidad: reservaHabilidad } = useParams<{ reservaId: string; habilidad: string }>();
  const navigate = useNavigate();

  const [mentorId, setMentorId] = useState("");
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [selectedMentoria, setSelectedMentoria] = useState("");
  const [fechaHora, setFechaHora] = useState("");
  const [linkMeet, setLinkMeet] = useState("");

  // 1️⃣ Obtener ID del mentor logueado
  useEffect(() => {
    const loadPerfil = async () => {
      const perfil = await obtenerPerfilUsuario();
      setMentorId(perfil.perfil?._id);
    };
    loadPerfil();
  }, []);

  // 2️⃣ Obtener mentorías filtradas por la habilidad pasada en la URL
  useEffect(() => {
    const loadMentorias = async () => {
      if (!mentorId || !reservaHabilidad) return;

      const mentoriasData = await obtenerMentoriasPorMentorYTema(mentorId, reservaHabilidad);
      setMentorias(mentoriasData);

      if (mentoriasData.length > 0) setSelectedMentoria(mentoriasData[0]._id);
    };
    loadMentorias();
  }, [mentorId, reservaHabilidad]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!reservaId) return;

    try {
      await aceptarReserva(reservaId, {
        fechaHora,
        linkMeet,
        mentoriaId: selectedMentoria, // ✔️ pasar la mentoría seleccionada
      });

      alert("Mentoría asignada creada correctamente!");
      navigate("/mentor/solicitudes");
    } catch (error: any) {
      alert("Error al crear mentoría asignada: " + error.message);
    }
  };

  return (
    <>
      <NavbarMentor />

      <h2>Asignar Mentoría</h2>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Mentoría</label>
          <select
            value={selectedMentoria}
            onChange={(e) => setSelectedMentoria(e.target.value)}
            required
          >
            {mentorias.map((m) => (
              <option key={m._id} value={m._id}>
                {m.titulo}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label>Fecha y hora</label>
          <input
            type="datetime-local"
            value={fechaHora}
            onChange={(e) => setFechaHora(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Link Meet</label>
          <input
            type="text"
            value={linkMeet}
            onChange={(e) => setLinkMeet(e.target.value)}
            required
          />
        </div>

        <button type="submit">Crear Mentoría Asignada</button>
      </form>

      <Footer />
    </>
  );
};
