import React from "react";
import "./barra-busqueda.css";

export const BarraDeBusqueda: React.FC = () => {
  return (
    <div className="barra-busqueda">
      <input
        type="text"
        placeholder="Buscar mentores por área, nombre o habilidad"
      />
      <button>
        <img
          src="https://cdn-icons-png.flaticon.com/512/622/622669.png"
          alt="Buscar"
          className="icono-busqueda"
        />
      </button>
    </div>
  );
};
