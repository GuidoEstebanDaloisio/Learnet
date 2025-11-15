// src/pages/mentor/PerfilMentor.tsx
import React, { useEffect, useState } from "react";
import { NavbarMentor } from "../../components/NavbarMentor"; // Podés hacer NavbarMentor si querés
import { Footer } from "../../components/Footer";
import { InfoPrincipalMentor } from "../../components/mentor/perfil_page/InfoPrincipalMentor";
import { AccionesMentor } from "../../components/mentor/perfil_page/AccionesMentor";
import { obtenerPerfilUsuario } from "../../services/authService";

//por el momento uso el del alumno luego voy a unificarlo en solo perfil
import "../../styles/pages/alumno/perfilAlumno.css";

export const PerfilMentor: React.FC = () => {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await obtenerPerfilUsuario(); // Trae todo el objeto: email, rol, perfil
        setPerfil(data); 
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <p className="loading-text">Cargando datos del mentor...</p>;
  if (!perfil) return <p className="error-text">No se encontró el perfil.</p>;

  return (
    <>
      <NavbarMentor /> 
      
      <main className="perfil-container">
        <InfoPrincipalMentor mentor={perfil} />
        <AccionesMentor mentor={perfil} />
      </main>

      <Footer />
    </>
  );
};
