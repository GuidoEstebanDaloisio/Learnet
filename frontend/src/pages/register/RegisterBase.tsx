import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { useNavigate } from "react-router-dom";

export const RegisterBase: React.FC = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState("alumno");

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !contraseña) {
      setMensaje("Por favor completá todos los campos.");
      return;
    }

    // Guardamos los datos base en sessionStorage
    sessionStorage.setItem("baseUser", JSON.stringify({ email, contraseña, rol }));

    // Redirigimos según el rol elegido
    switch (rol) {
      case "mentor":
        navigate("/registro/mentor");
        break;
      case "admin":
        navigate("/registro/admin");
        break;
      default:
        navigate("/registro/alumno");
        break;
    }
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card">
          <h2>Crear cuenta</h2>
          <p className="subtitle">Completá tus datos para comenzar</p>

          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label htmlFor="email">Correo electrónico</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="ejemplo@correo.com"
                required
              />
            </div>

            <div className="form-group">
              <label htmlFor="password">Contraseña</label>
              <input
                type="password"
                id="password"
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}

                placeholder="••••••••"
                required
              />
            </div>

            <div className="form-group">
              <label>Seleccioná tu rol</label>
              <select
                value={rol}
                onChange={(e) => setRol(e.target.value)}
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

            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};