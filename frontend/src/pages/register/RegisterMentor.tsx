import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registrarUsuario } from "../../services/authService";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";
import { getBaseUser, clearBaseUser } from "../../utils/session";

export const RegisterMentor: React.FC = () => {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
    titulo: "",
    presentacion: "",
    biografia: "",
    habilidades: "",
    experiencia: "",
    precioClase: "",
    tiempoRespuesta: "",
  });

  const [mensaje, setMensaje] = useState("");
  const navigate = useNavigate();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const baseUser = getBaseUser();
    if (!baseUser) return setMensaje("Error: faltan datos base");

    const fullUser = {
      ...baseUser,
      nombre: data.nombre,
      apellido: data.apellido,
      fechaNacimiento: data.fechaNacimiento,
      titulo: data.titulo,
      presentacion: data.presentacion,
      biografia: data.biografia,
      habilidadesClave: data.habilidades,
      experiencia: data.experiencia,
      precioPorClase: Number(data.precioClase),
      tiempoRespuesta: data.tiempoRespuesta,
    };

    try {
      await registrarUsuario(fullUser);
      setMensaje("Mentor registrado correctamente ✅");
      clearBaseUser();
      setTimeout(() => navigate("/login"), 1000);
    } catch (error: any) {
      setMensaje(error.response?.data?.error || "Error al registrar mentor ❌");
    }
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card wide">
          <h2>Registro de Mentor</h2>
          <form onSubmit={handleSubmit}>
            {/* Campos del mentor */}
            <div className="form-group">
              <label>Nombre</label>
              <input name="nombre" value={data.nombre} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Apellido</label>
              <input name="apellido" value={data.apellido} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Fecha de Nacimiento</label>
              <input
                type="date"
                name="fechaNacimiento"
                value={data.fechaNacimiento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label>Título profesional</label>
              <input name="titulo" value={data.titulo} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Presentación breve</label>
              <textarea name="presentacion" value={data.presentacion} onChange={handleChange} rows={2} />
            </div>
            <div className="form-group">
              <label>Biografía</label>
              <textarea name="biografia" value={data.biografia} onChange={handleChange} rows={3} />
            </div>
            <div className="form-group">
              <label>Habilidades clave</label>
              <input name="habilidades" value={data.habilidades} onChange={handleChange} />
            </div>
            <div className="form-group">
              <label>Experiencia</label>
              <textarea name="experiencia" value={data.experiencia} onChange={handleChange} rows={3} />
            </div>
            <div className="form-group">
              <label>Precio por clase (ARS)</label>
              <input type="number" name="precioClase" value={data.precioClase} onChange={handleChange} required />
            </div>
            <div className="form-group">
              <label>Tiempo de respuesta promedio</label>
              <input name="tiempoRespuesta" value={data.tiempoRespuesta} onChange={handleChange} />
            </div>

            <button type="submit" className={buttons.btn}>
              Finalizar Registro
            </button>
            {mensaje && <p className="mensaje">{mensaje}</p>}
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
