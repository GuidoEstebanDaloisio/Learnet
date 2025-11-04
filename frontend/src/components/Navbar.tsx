import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.css";
import "../utils/scroll.js";

export const Navbar: React.FC = () => {
  return (
    <main className="navbar">
      {/*Logo y nombre redirigen al home */}
      <Link to="/" className="logo">
        <img src="/img/Logo.png" alt="Logo Learnet" />
        <h1>Learnet</h1>
      </Link>

      <nav>
        <ul className="nav-links">
          <li>
            <Link to="/" className="active">Inicio</Link>
          </li>
          <li>
            <Link to="/mentores">Mentores</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to="/registro">Registro</Link>
          </li>
        </ul>
      </nav>
    </main>
  );
};
