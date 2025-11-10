import "./acciones.css";

interface AccionesProps {
  mentor: {
    nombre: string;
    precioPorClase: number;
    disponible?: boolean;
  };
}

export const Acciones: React.FC<AccionesProps> = ({ mentor }) => {
  return (
    <aside className="perfil-acciones">
      <div className="tarjeta-sesion">
        <h3>¿Listo para comenzar?</h3>
        <p className="texto-sesion">
          {mentor.nombre} {mentor.disponible ? "está disponible ahora. ¡Reserva tu sesión!" : "no está disponible en este momento."}
        </p>

        <div className="precio">
          <div className="precio-label">Precio estimado</div>
          <div className="precio-monto">${mentor.precioPorClase} ARS / Sesión</div>
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
