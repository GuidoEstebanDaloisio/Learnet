import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { registrarUsuario } from "../../services/authService";
import { getBaseUser, clearBaseUser } from "../../utils/session";

export const RegisterAlumno: React.FC = () => {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    nivelEducativo: "",
  });
  const [mensaje, setMensaje] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUser = getBaseUser();
    if (!baseUser) return setMensaje("Error: faltan datos base");

    const fullUser = { ...baseUser, ...data };

    try {
      await registrarUsuario(fullUser);
      setMensaje("✅ Registro exitoso. Ahora podés iniciar sesión.");
      clearBaseUser();
    } catch (error: any) {
      setMensaje(error.response?.data?.error || "❌ Error al registrar usuario.");
    }
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card narrow">
          <h2>Datos del alumno</h2>
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
              <label>Nivel educativo (opcional)</label>
              <input
                name="nivelEducativo"
                value={data.nivelEducativo}
                onChange={handleChange}
                placeholder="Ej: Secundario, Terciario..."
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
