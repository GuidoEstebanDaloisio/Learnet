import React from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/login.css";
import buttons from "../styles/modules/buttons.module.css";




export const Login: React.FC = () => {
    return (
        <>
            <Navbar />
            <main className="login-container">
                <div className="login-card">
                    <h2>Iniciar sesión</h2>
                    <p className="subtitle">Accedé a tu cuenta para continuar</p>

                    <form className="login-form">
                        <div className="form-group">
                            <label htmlFor="email">Correo electrónico</label>
                            <input
                                type="email"
                                id="email"
                                placeholder="ejemplo@correo.com"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="password">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                placeholder="••••••••"
                                required
                            />
                        </div>

                        <button type="submit" className={buttons.btn}>
                            Ingresar
                        </button>

                        <div className="role-buttons">
                            <a href="/" className={buttons["btn-secondary"]}>
                                Mentor
                            </a>
                            <a href="/alumno/explorar-mentores" className={buttons["btn-secondary"]}>
                                Mentorizado
                            </a>
                        </div>

                        <p className="register-text">
                            ¿No tenés cuenta? <a href="#">Registrate</a>
                        </p>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
};
