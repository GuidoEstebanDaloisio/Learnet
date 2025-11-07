import React, { useState } from "react";
import { Navbar } from "../../components/Navbar";
import { Footer } from "../../components/Footer";
import "../../styles/register.css";
import buttons from "../../styles/modules/buttons.module.css";

export const RegisterAdmin: React.FC = () => {
  const [data, setData] = useState({
    nombre: "",
    apellido: "",
    fechaNacimiento: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const baseUser = JSON.parse(sessionStorage.getItem("baseUser") || "{}");
    const fullUser = { ...baseUser, ...data };
    console.log("Usuario Admin:", fullUser);
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
              <input type="date" name="fechaNacimiento" value={data.fechaNacimiento} onChange={handleChange} required />
            </div>

            <button type="submit" className={buttons.btn}>
              Finalizar registro
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </>
  );
};
