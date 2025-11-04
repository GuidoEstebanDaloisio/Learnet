import React from "react";
import { TarjetaMentor } from "./TarjetaMentor";

interface GridMentoresProps {
  mostrarNoDisponibles: boolean;
}

export const GridMentores: React.FC<GridMentoresProps> = ({ mostrarNoDisponibles }) => {
  const mentores = [
    {
      nombre: "Sofía G. Ruiz",
      area: "Desarrollo Web Full Stack",
      calificacion: 4.9,
      opiniones: 125,
      disponible: false,
      imagen: "/img/Mentora_perfil.png",
      enlace: "mentor-no-disponible-detalle.html",
    },
    {
      nombre: "Juan P. Ramírez",
      area: "Liderazgo y Gestión",
      calificacion: 4.8,
      opiniones: 89,
      disponible: true,
      imagen: "/img/Mentor_perfil.png",
      enlace: "mentor-disponible-detalle.html",
    },
    {
      nombre: "Martín L. Fernández",
      area: "Diseño UX/UI",
      calificacion: 5.0,
      opiniones: 200,
      disponible: true,
      imagen: "/img/Mentor_perfil.png",
    },
    {
      nombre: "Carlos A. Morales",
      area: "Marketing Digital y SEO",
      calificacion: 4.7,
      opiniones: 150,
      disponible: true,
      imagen: "/img/Mentor_perfil.png",
    },
    {
      nombre: "Laura V. Torres",
      area: "Ciencia de Datos (Python)",
      calificacion: 4.9,
      opiniones: 95,
      disponible: false,
      imagen: "/img/Mentora_perfil.png",
    },
  ];

  // 🔹 Filtramos según el estado del filtro
  const mentoresFiltrados = mentores.filter(
    (mentor) => mostrarNoDisponibles || mentor.disponible
  );

  return (
    <section className="mentores-destacados">
      <h2>Explora Mentores Destacados</h2>
      <div className="mentores-grid">
        {mentoresFiltrados.map((mentor, index) => (
          <TarjetaMentor key={index} {...mentor} />
        ))}
      </div>
    </section>
  );
};
