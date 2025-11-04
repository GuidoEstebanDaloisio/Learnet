import React, { useState } from "react";
import "./filtros.css";

interface FiltrosProps {
  onToggleDisponibles: (mostrarNoDisponibles: boolean) => void;
}

export const Filtros: React.FC<FiltrosProps> = ({ onToggleDisponibles }) => {
  const [mostrarNoDisponibles, setMostrarNoDisponibles] = useState(true);

  const handleToggle = () => {
    const nuevoValor = !mostrarNoDisponibles;
    setMostrarNoDisponibles(nuevoValor);
    onToggleDisponibles(nuevoValor); // 🔹 Notifica al padre
  };

  return (
    <div className="filtros">
      <h3>Filtros</h3>

      <div className="seccion-orden">
        <span>Ordenar por:</span>
        <label>
          <input type="radio" name="orden" defaultChecked /> Mejor puntuados
        </label>
        <label>
          <input type="radio" name="orden" /> Más nuevos
        </label>
        <label>
          <input type="radio" name="orden" /> Más antiguos
        </label>
      </div>

      <div className="seccion-disponibilidad">
        <span>Disponibilidad</span>
        <div className="fila-toggle">
          <span>Mostrar no disponibles</span>
          <label className="interruptor">
            <input
              type="checkbox"
              checked={mostrarNoDisponibles}
              onChange={handleToggle}
            />
            <span className="deslizador"></span>
          </label>
        </div>
      </div>
    </div>
  );
};
