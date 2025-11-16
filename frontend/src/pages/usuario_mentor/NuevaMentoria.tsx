import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { crearMentoria } from "../../services/mentoriaService";
import { obtenerPerfilUsuario } from "../../services/authService";
import "../../styles/pages/mentor/nueva-mentoria.css";
import styles from "../../styles/modules/buttons.module.css";


export const NuevaMentoria: React.FC = () => {
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [habilidad, setHabilidad] = useState("");
  const [titulo, setTitulo] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [mentorId, setMentorId] = useState<string>("");

  const navigate = useNavigate();

useEffect(() => {
  const fetchPerfil = async () => {
    try {
      const perfil = await obtenerPerfilUsuario();

      setMentorId(perfil.id); // ← CAMBIO CLAVE

      setHabilidades(perfil.perfil?.habilidadesClave || []);
    } catch (error) {
      console.error(error);
    }
  };

  fetchPerfil();
}, []);


  const handleCrearMentoria = async () => {
    if (!titulo || !habilidad || !descripcion) {
      setMensaje("Por favor completa todos los campos.");
      return;
    }

    console.log("OBJETO ENVIADO:", {
  mentorId,
  titulo,
  habilidad,
  descripcion
});



    try {
      await crearMentoria({
        mentorId,
        titulo,
        tema: habilidad,
        descripcion,
      });

      setMensaje("✅ Mentoría creada!");
      setTimeout(() => navigate("/mentor/mis-mentorias"), 1000);
    } catch (err: any) {
      setMensaje(err.message || "❌ Error al crear mentoría");
    }
  };

return (
  <div className="crear-mentoria-container">
    <div className="crear-mentoria-card">
      <h2>Crear Nueva Mentoría</h2>

      <div className="form-group">
        <label>Título</label>
        <input
          type="text"
          placeholder="Título de la mentoría"
          value={titulo}
          onChange={(e) => setTitulo(e.target.value)}
        />
      </div>

      <div className="form-group">
        <label>Habilidad</label>
        <select value={habilidad} onChange={(e) => setHabilidad(e.target.value)}>
          <option value="">Seleccionar habilidad</option>
          {habilidades.map((h) => (
            <option key={h} value={h}>{h}</option>
          ))}
        </select>
      </div>

      <div className="form-group">
        <label>Descripción</label>
        <textarea
          placeholder="Describe el contenido de la mentoría"
          value={descripcion}
          onChange={(e) => setDescripcion(e.target.value)}
        />
      </div>

      <button className={styles.btn} onClick={handleCrearMentoria}>
        Crear Mentoría
      </button>

      {mensaje && <p className="crear-mentoria-mensaje">{mensaje}</p>}
    </div>
  </div>
);

};
