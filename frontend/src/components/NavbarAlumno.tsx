import React from "react";
import { Link } from "react-router-dom";
import "../styles/components/navbar.css";
import "../utils/scroll.js";

export const NavbarAlumno: React.FC = () => {
    return (
        <main className="navbar">

            <Link to="/" className="logo">
                <img src="/img/Logo.png" alt="Logo Learnet" />
                <h1>Learnet</h1>
            </Link>

            <nav>
                <ul className="nav-links">
                    <li>
                        <Link to="/explorarAlumno" className="nav-link">
                            Explorar
                        </Link>
                    </li>

                    <li>
                        <Link to="/mentoriasAlumno" className="nav-link">
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

                    <li>
                        <Link to="/perfilAlumno" className="nav-link">
                            Perfil
                        </Link>
                    </li>
                </ul>
            </nav>
        </main>
    );
};
