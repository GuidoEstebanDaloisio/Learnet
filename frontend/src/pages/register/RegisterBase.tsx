import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../constants/roles";
import type { Rol } from "../../constants/roles";
import { saveBaseUser } from "../../utils/session";


export const RegisterBase: React.FC = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [rol, setRol] = useState<Rol>(ROLES.ALUMNO); // tipo literal

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !contraseña) {
      setMensaje("Por favor completá todos los campos.");
      return;
    }

    saveBaseUser({ email, contraseña, rol });

    switch (rol) {
      case ROLES.MENTOR:
        navigate("/registro/mentor");
        break;
      case ROLES.ADMIN:
        navigate("/registro/admin");
        break;
      case ROLES.ALUMNO:
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
                onChange={(e) => setRol(e.target.value as Rol)}
                required
              >
                <option value={ROLES.ALUMNO}>Alumno</option>
                <option value={ROLES.MENTOR}>Mentor</option>
                <option value={ROLES.ADMIN}>Administrador</option>
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
