import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { useNavigate } from "react-router-dom";

export const RegisterBase: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("alumno");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Guardamos temporalmente los datos en sessionStorage
    sessionStorage.setItem("baseUser", JSON.stringify({ email, password, role }));

    // Redirigimos según el rol
    if (role === "alumno") navigate("/registro/alumno");
    if (role === "mentor") navigate("/registro/mentor");
    if (role === "admin") navigate("/registro/admin");
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card narrow">
          <h2>Crear cuenta</h2>
          <p className="subtitle">Completá los datos iniciales</p>

          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                placeholder="ejemplo@correo.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="role">Tipo de usuario</label>
              <select
                id="role"
                value={role}
                onChange={(e) => setRole(e.target.value)}
                required
              >
                <option value="alumno">Alumno</option>
                <option value="mentor">Mentor</option>
                <option value="admin">Administrador</option>
              </select>
            </div>

            <button type="submit" className={buttons.btn}>
              Continuar
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
