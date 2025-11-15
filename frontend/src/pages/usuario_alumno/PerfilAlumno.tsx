// PerfilAlumno.tsx
import React, { useEffect, useState } from "react";
import { NavbarAlumno } from "../../components/NavbarAlumno";
import { Footer } from "../../components/Footer";
import { InfoPrincipalAlumno } from "../../components/alumno/perfil_page/InfoPrincipalAlumno";
import { AccionesAlumno } from "../../components/alumno/perfil_page/AccionesAlumno";
import { obtenerPerfilUsuario } from "../../services/authService";

import "../../styles/pages/alumno/perfilAlumno.css";

export const PerfilAlumno: React.FC = () => {
  const [perfil, setPerfil] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPerfil = async () => {
      try {
        const data = await obtenerPerfilUsuario(); // Trae todo: email, rol, perfil
        setPerfil(data); 
      } catch (error) {
        console.error("Error al cargar perfil:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchPerfil();
  }, []);

  if (loading) return <p className="loading-text">Cargando datos del alumno...</p>;
  if (!perfil) return <p className="error-text">No se encontró el perfil.</p>;

  return (
    <>
      <NavbarAlumno />

      <main className="perfil-container">
        {/* Pasamos todo el perfil */}
        <InfoPrincipalAlumno alumno={perfil} />
        <AccionesAlumno alumno={perfil} />
      </main>

      <Footer />
    </>
  );
};
