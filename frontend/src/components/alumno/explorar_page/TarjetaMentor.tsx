import React from "react";
import { Link } from "react-router-dom";
import "./tarjetas-mentores.css";
import styles from "../../../styles/modules/buttons.module.css";
interface TarjetaMentorProps {
  id: string;
  nombre: string;
  area: string;
  calificacion: number;
  opiniones: number;
  disponible: boolean;
  imagen: string;
  precio: number;
}

export const TarjetaMentor: React.FC<TarjetaMentorProps> = ({
  id,
  nombre,
  area,
  calificacion,
  opiniones,
  disponible,
  imagen,
  precio,
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

      <p className="precio">
         ${precio} ARS por sesión
      </p>

      <div className="acciones">
        <Link to={`/alumno/detalles-mentor/${id}`} className={styles.btn}>
          Ver Mentor
        </Link>
      </div>
    </div>
  );
};
