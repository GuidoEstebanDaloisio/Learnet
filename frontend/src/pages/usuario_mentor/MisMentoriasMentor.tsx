import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { obtenerMentoriasDeMentor } from "../../services/mentoriaService";
import { obtenerPerfilUsuario } from "../../services/authService";
import { NavbarMentor } from "../../components/NavbarMentor"; 
import { Footer } from "../../components/Footer";
import "../../styles/pages/mentor/mis-mentorias.css";
import styles from "../../styles/modules/buttons.module.css";


export const MisMentoriasMentor: React.FC = () => {
  const [mentorias, setMentorias] = useState<any[]>([]);
  const [mentorId, setMentorId] = useState<string>("");

  // 1️⃣ Obtener ID real del mentor
  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const perfil = await obtenerPerfilUsuario();
        setMentorId(perfil.perfil?._id); // ← ID DEL MENTOR
      } catch (error) {
        console.error("Error al obtener perfil:", error);
      }
    };
    fetchPerfil();
  }, []);

  // 2️⃣ Obtener mentorías del mentor
  useEffect(() => {
    if (!mentorId) return;

    const fetchMentorias = async () => {
      try {
        const data = await obtenerMentoriasDeMentor(mentorId);
        setMentorias(data);
      } catch (error) {
        console.error("Error al obtener mentorías:", error);
      }
    };

    fetchMentorias();
  }, [mentorId]);

  return (


    <>
      <NavbarMentor />

      <h2>Mis Mentorías</h2>

      <Link to="/mentor/crear-mentoria" className={styles.btn}>
      
        + Crear nueva mentoría
      </Link>

      <hr />

      <h3>Listado de mentorías</h3>

      {mentorias.length === 0 && <p>No tienes mentorías creadas aún.</p>}

      <ul className="lista-mentorias">
        {mentorias.map((m) => (
          <li key={m._id}>
            <strong>{m.titulo}</strong> <br />
            <span>Tema: {m.tema}</span> <br />
            <span>{m.descripcion}</span>
          </li>
        ))}
      </ul>

      <Footer />
    </>
  );
};
