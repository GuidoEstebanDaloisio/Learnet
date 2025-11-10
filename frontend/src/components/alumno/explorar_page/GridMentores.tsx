import React, { useEffect, useState } from "react";
import { TarjetaMentor } from "./TarjetaMentor";
import { obtenerMentores } from "../../../services/mentorService";

interface GridMentoresProps {
  mostrarNoDisponibles: boolean;
}

export const GridMentores: React.FC<GridMentoresProps> = ({ mostrarNoDisponibles }) => {
  const [mentores, setMentores] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchMentores = async () => {
      try {
        const data = await obtenerMentores();
        setMentores(data);
      } catch (err: any) {
        setError("Error al cargar mentores");
      } finally {
        setLoading(false);
      }
    };

    fetchMentores();
  }, []);

  if (loading) return <p>Cargando mentores...</p>;
  if (error) return <p>{error}</p>;

  const mentoresFiltrados = mentores.filter(
    (mentor) => mostrarNoDisponibles || mentor.estaDisponible
  );

  return (
    <section className="mentores-destacados">
      <h2>Explora Mentores Destacados</h2>
      <div className="mentores-grid">
        {mentoresFiltrados.map((mentor) => (<TarjetaMentor
  key={mentor._id}
  id={mentor._id}
  nombre={`${mentor.nombre} ${mentor.apellido}`}
  area={mentor.titulo || "Especialidad no especificada"}
  calificacion={mentor.calificacion ?? 5.0}
  opiniones={mentor.opiniones ?? 0}
  disponible={mentor.estaDisponible ?? true}
  imagen="/img/Mentor_perfil.png"
  precio={mentor.precioPorClase}
/>
))}
      </div>
    </section>
  );
};
