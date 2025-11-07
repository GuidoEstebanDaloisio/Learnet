import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";

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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUser = JSON.parse(sessionStorage.getItem("baseUser") || "{}");
    const fullUser = { ...baseUser, ...data };
    console.log("Usuario Mentor:", fullUser);
    // Aquí podrías enviar los datos al backend con fetch/axios
  };

  return (
    <>
      <Navbar />
      <main className="register-container">
        <div className="register-card wide">
          <h2>Datos del mentor</h2>
          <p className="subtitle">Completá tu perfil profesional</p>

          <form className="register-form grid" onSubmit={handleSubmit}>
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
              <label>Título / profesión</label>
              <input name="titulo" value={data.titulo} onChange={handleChange} required />
            </div>

            <div className="form-group full">
              <label>Presentación</label>
              <textarea
                name="presentacion"
                value={data.presentacion}
                onChange={handleChange}
                rows={3}
                placeholder="Escribí una invitación breve que verán tus futuros alumnos"
              />
            </div>

            <div className="form-group full">
              <label>Biografía</label>
              <textarea
                name="biografia"
                value={data.biografia}
                onChange={handleChange}
                rows={3}
                placeholder="Contá brevemente tu trayectoria y formación"
              />
            </div>

            <div className="form-group">
              <label>Habilidades clave</label>
              <input
                name="habilidades"
                value={data.habilidades}
                onChange={handleChange}
                placeholder="Ej: Matemática, liderazgo, Python..."
              />
            </div>

            <div className="form-group full">
              <label>Experiencia</label>
              <textarea
                name="experiencia"
                value={data.experiencia}
                onChange={handleChange}
                rows={3}
                placeholder="Describí tu experiencia relevante"
              />
            </div>

            <div className="form-group">
              <label>Precio estimado por clase</label>
              <input
                name="precioClase"
                value={data.precioClase}
                onChange={handleChange}
                placeholder="Ej: 5000"
                type="number"
              />
            </div>

            <div className="form-group">
              <label>Tiempo de respuesta (horas)</label>
              <input
                name="tiempoRespuesta"
                value={data.tiempoRespuesta}
                onChange={handleChange}
                placeholder="Ej: 2 horas"
              />
            </div>

            <div className="form-group full">
              <button type="submit" className={buttons.btn}>
                Finalizar registro
              </button>
            </div>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
