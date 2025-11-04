import React from "react";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { Footer } from "../../components/Footer";
import { InfoPrincipal } from "../../components/alumno/detalles_mentor_page/InfoPrincipal";
import { Acciones } from "../../components/alumno/detalles_mentor_page/Acciones";
import "../../styles/pages/alumno/detalle-mentor.css";

export const DetallesMentor: React.FC = () => {
  return (
    <>
      <NavbarAlumno />
      <main className="perfil-container">
        <InfoPrincipal />
        <Acciones />
      </main>
      <Footer />
    </>
  );
};
