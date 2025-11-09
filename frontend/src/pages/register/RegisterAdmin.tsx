import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { registrarUsuario } from "../../services/authService";

export const RegisterAdmin: React.FC = () => {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    codigoAcceso: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const baseUser = JSON.parse(sessionStorage.getItem("baseUser") || "{}");
    const fullUser = { ...baseUser, ...data };

    try {
      await registrarUsuario(fullUser);
      setMensaje("✅ Registro de administrador exitoso.");
      sessionStorage.removeItem("baseUser");
    } catch (error: any) {
      setMensaje(error.response?.data?.error || "❌ Código de acceso incorrecto.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card narrow">
          <h2>Datos del administrador</h2>
          <form className="register-form" onSubmit={handleSubmit}>
            <div className="form-group">
              <label>Nombre</label>
              <input name="nombre" value={data.nombre} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Apellido</label>
              <input name="apellido" value={data.apellido} onChange={handleChange} required />
            </div>

            <div className="form-group">
              <label>Fecha de nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={data.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>

            <div className="form-group">
              <label>Código de acceso</label>
              <input
                type="password"
                name="codigoAcceso"
                value={data.codigoAcceso}
                onChange={handleChange}
                placeholder="Ingresá tu código secreto"
                required
              />
            </div>

            <button type="submit" className={buttons.btn}>
              Finalizar registro
            </button>

            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
