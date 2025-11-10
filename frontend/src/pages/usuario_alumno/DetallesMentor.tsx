import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { Footer } from "../../components/Footer";
import { InfoPrincipal } from "../../components/alumno/detalles_mentor_page/InfoPrincipal";
import { Acciones } from "../../components/alumno/detalles_mentor_page/Acciones";
import { obtenerMentorPorId } from "../../services/mentorService";
import "../../styles/pages/alumno/detalle-mentor.css";

export const DetallesMentor: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [mentor, setMentor] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    obtenerMentorPorId(id)
      .then((data) => setMentor(data))
      .catch((error) => console.error("Error al cargar mentor:", error))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <p className="loading-text">Cargando datos del mentor...</p>;
  if (!mentor) return <p className="error-text">No se encontró el mentor.</p>;

  return (
    <>
      <NavbarAlumno />
      <main className="perfil-container">
        <InfoPrincipal mentor={mentor} />
        <Acciones mentor={mentor} />
      </main>
      <Footer />
    </>
  );
};
