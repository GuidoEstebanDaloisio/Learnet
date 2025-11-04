import React from "react";
import "./acciones.css";

export const Acciones: React.FC = () => {
  return (
    <aside className="perfil-acciones">
      <div className="tarjeta-sesion">
        <h3>¿Listo para comenzar?</h3>
        <p className="texto-sesion">Juan está disponible ahora. ¡Reserva tu sesión!</p>

        <div className="precio">
          <div className="precio-label">Precio estimado</div>
          <div className="precio-monto">$25 USD / Sesión</div>
        </div>

        <button className="btn-solicitar-mentoria">Reservar Sesión</button>
      </div>

      <div className="tarjeta-reporte">
        <h4>¿Algo no parece correcto?</h4>
        <a href="#" className="reportar-link">Reportar este perfil</a>
      </div>
    </aside>
  );
};
