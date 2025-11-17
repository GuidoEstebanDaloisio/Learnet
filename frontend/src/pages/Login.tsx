import React, { useState } from "react";
import { Navbar } from "../components/Navbar";
import { Footer } from "../components/Footer";
import "../styles/login.css";
import buttons from "../styles/modules/buttons.module.css";
import { useNavigate } from "react-router-dom";
import { loginUsuario } from "../services/authService";
import { jwtDecode } from "jwt-decode";





export const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [contraseña, setContraseña] = useState("");
  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  try {
    const data = await loginUsuario({ email, contraseña });
    localStorage.setItem("token", data.token);
    setMensaje("Inicio de sesión exitoso ✅");

    // Decodificamos el token para obtener el rol
    const decoded: any = jwtDecode(data.token);
    const rol = decoded?.rol || decoded?.role;

    // Redirigimos según el rol
    setTimeout(() => {
      if (rol === "alumno") {
        navigate("/alumno/explorar-mentores");
      } else if (rol === "mentor") {
        navigate("/mentor/perfil"); // o la ruta que corresponda
      } else if (rol === "admin") {
        navigate("/admin/panel");
      } else {
        navigate("/"); // fallback si no hay rol
      }
    }, 800);
  } catch (error: any) {
    setMensaje(error.response?.data?.error || "Error al iniciar sesión ❌");
  }
};


  return (
    <>
      <Navbar />
      <main className="login-container">
        <div className="login-card">
          <h2>Iniciar sesión</h2>
          <p className="subtitle">Accedé a tu cuenta para continuar</p>

          <form className="login-form" onSubmit={handleSubmit}>
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
                value={contraseña}
                onChange={(e) => setContraseña(e.target.value)}
                required
              />
            </div>

            <button type="submit" className={buttons.btn}>
              Ingresar
            </button>

            <p className="register-text">
              ¿No tenés cuenta? <a href="/registro">Registrate</a>
            </p>
          </form>

          {mensaje && <p className="mensaje-login">{mensaje}</p>}
        </div>
      </main>
      <Footer />
    </>
  );
};
