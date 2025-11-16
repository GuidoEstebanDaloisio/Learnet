import React, { useState } from "react";
import { solicitarMentoria } from "../../../services/solicitudService";

interface Props {
  mentorId: string; // id del perfil del mentor (mentor._id)
  habilidades: string[];
}

export const ReservarSesion: React.FC<Props> = ({ mentorId, habilidades }) => {
  const [open, setOpen] = useState(false);
  const [habilidad, setHabilidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [resp, setResp] = useState<string | null>(null);

  const enviar = async () => {
    if (!habilidad) return alert("Seleccioná una habilidad");
    setLoading(true);
    try {
      const result = await solicitarMentoria({ mentorId, habilidad, mensaje });
      setResp("Solicitud enviada correctamente ✅");
      setOpen(false);
      setHabilidad("");
      setMensaje("");
      // opcional: refrescar lista de solicitudes en UI
    } catch (err: any) {
      setResp(err.response?.data?.error || err.message || "Error al enviar");
    } finally {
      setLoading(false);
      setTimeout(() => setResp(null), 4000);
    }
  };

  return (
    <div style={{ marginTop: 12 }}>
      <button className="btn-solicitar-mentoria" onClick={() => setOpen(!open)}>
        Reservar Sesión
      </button>

      {open && (
        <div style={{
          marginTop: 10,
          padding: 14,
          borderRadius: 10,
          background: "#fff",
          boxShadow: "0 6px 18px rgba(0,0,0,0.08)"
        }}>
          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Seleccioná la habilidad</label>
          <select value={habilidad} onChange={(e) => setHabilidad(e.target.value)} style={{ width: "100%", padding: 10, borderRadius: 8, marginBottom: 10 }}>
            <option value="">-- Elegir --</option>
            {habilidades.map(h => <option key={h} value={h}>{h}</option>)}
          </select>

          <label style={{ display: "block", marginBottom: 6, fontWeight: 600 }}>Mensaje (opcional)</label>
          <textarea value={mensaje} onChange={(e) => setMensaje(e.target.value)}
            placeholder="Escribí un mensaje para el mentor..."
            style={{ width: "100%", padding: 10, minHeight: 80, borderRadius: 8 }} />

          <div style={{ display: "flex", gap: 8, marginTop: 10 }}>
            <button disabled={loading} onClick={enviar} style={{ flex: 1 }} className="btn-crear-mentoria">
              {loading ? "Enviando..." : "Enviar solicitud"}
            </button>
            <button disabled={loading} onClick={() => setOpen(false)} style={{ flex: 0.6 }} className="btn-cancelar">
              Cancelar
            </button>
          </div>

          {resp && <p style={{ marginTop: 8 }}>{resp}</p>}
        </div>
      )}
    </div>
  );
};
