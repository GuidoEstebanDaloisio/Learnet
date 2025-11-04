import React from "react";
import "./tarjetas-mentores.css";
import styles from "../../../styles/modules/buttons.module.css"; 

interface TarjetaMentorProps {
  nombre: string;
  area: string;
  calificacion: number;
  opiniones: number;
  disponible: boolean;
  imagen: string;
  enlace?: string;
}

export const TarjetaMentor: React.FC<TarjetaMentorProps> = ({
  nombre,
  area,
  calificacion,
  opiniones,
  disponible,
  imagen,
  enlace,
}) => {
  return (
    <div className={`mentor-card ${disponible ? "disponible" : "no-disponible"}`}>
      <div className={`badge ${disponible ? "si" : "no"}`}>
        {disponible ? "Disponible" : "No disponible"}
      </div>

      <img src={imagen} alt={`Mentor ${nombre}`} />
      <h3>{nombre}</h3>
      <p className="area">{area}</p>
      <p className="rating">
        ⭐ {calificacion} ({opiniones})
      </p>

      <div className="acciones">
        {enlace ? (
          <a href={enlace} className={styles.btn}>
            Ver Mentor
          </a>
        ) : (
          <button className={styles.btn}>Ver Mentor</button>
        )}
      </div>
    </div>
  );
};

