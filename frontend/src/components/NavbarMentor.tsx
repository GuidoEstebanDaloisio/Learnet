import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/components/navbar.css";
import "../utils/scroll.js";

export const NavbarMentor: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token"); // Borra el token
    navigate("/login");               // Redirige al login
  };

  return (
    <main className="navbar">
      <Link to="/" className="logo">
        <img src="/img/Logo.png" alt="Logo Learnet" />
        <h1>Learnet</h1>
      </Link>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/mentoriasMentor" className="nav-link">
              Mis mentorías
            </Link>
          </li>

          <li>
            <Link to="/notificaciones" className="notificaciones">
              <img
                src="https://cdn-icons-png.flaticon.com/512/1827/1827349.png"
                alt="Campana"
                className="icono-campana"
              />
            </Link>
          </li>

          {/* Perfil */}
          <li>
            <Link to="/mentor/perfil" className="nav-link">
              Perfil
            </Link>
          </li>

          {/* Cerrar sesión */}
          <li>
            <button onClick={handleLogout} className="nav-link logout-btn">
              Cerrar sesión
            </button>
          </li>
        </ul>
      </nav>
    </main>
  );
};
