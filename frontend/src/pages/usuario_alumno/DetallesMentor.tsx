import React from "react";

import { Footer } from "../../components/Footer";
import { NavbarAlumno } from "../../components/NavbarAlumno";

import { Presentacion } from "../../components/mentor/Presentacion";
import { AcercaDeMentor } from "../../components/mentor/AcercaDeMentor";
import { Habilidades } from "../../components/mentor/Habilidades";
import { Reseñas } from "../../components/mentor/Reseñas";
import { FechaUnion } from "../../components/mentor/FechaUnion";
import { Acciones } from "../../components/mentor/Acciones";

//import "../../styles/pages/mentor-detalle.css";

export const DetallesMentor: React.FC = () => {
  return (
    <>
      <NavbarAlumno />
      <main className="perfil-container">
        <div className="perfil-info-principal">
          <Presentacion />
          <hr />
          <AcercaDeMentor />
          <hr />
          <Habilidades />
          <hr />
          <Reseñas />
          <hr />
          <FechaUnion />
        </div>

        <Acciones />
      </main>
      <Footer />
    </>
  );
};
