import React, { useState } from "react";
import { Footer } from "../../components/Footer";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { BarraDeBusqueda } from "../../components/alumno/explorar_page/BarraDeBusqueda";
import { Filtros } from "../../components/alumno/explorar_page/Filtros";
import { GridMentores } from "../../components/alumno/explorar_page/GridMentores";
import "../../styles/pages/alumno/explore.css";

export const Explorar: React.FC = () => {
  const [mostrarNoDisponibles, setMostrarNoDisponibles] = useState(true);

  return (
    <>
      <NavbarAlumno />
      <main>
        <BarraDeBusqueda />
        <div className="explore-conteiner">
          <Filtros onToggleDisponibles={setMostrarNoDisponibles} />
          <GridMentores mostrarNoDisponibles={mostrarNoDisponibles} />
        </div>
      </main>
      <Footer />
    </>
  );
};
