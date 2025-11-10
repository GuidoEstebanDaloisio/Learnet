import "./acciones.css";

interface AccionesProps {
  mentor: {
    nombre: string;
    precioPorClase: number;
    estaDisponible: boolean;
  };
}

export const Acciones: React.FC<AccionesProps> = ({ mentor }) => {
  const { nombre, precioPorClase, estaDisponible } = mentor;

  return (
    <aside className="perfil-acciones">
      <div className="tarjeta-sesion">
        <h3>¿Listo para comenzar?</h3>

        {estaDisponible ? (
          <>
            <p className="texto-sesion">
              {nombre} está disponible ahora. ¡Reserva tu sesión!
            </p>

            <div className="precio">
              <div className="precio-label">Precio estimado</div>
              <div className="precio-monto">${precioPorClase} ARS / Sesión</div>
            </div>

            <button className="btn-solicitar-mentoria">Reservar Sesión</button>
          </>
        ) : (
          <>
            <p className="texto-sesion">
              La disponibilidad de {nombre} puede cambiar pronto. ¡Asegura tu
              cupo!
            </p>

            <div className="precio">
              <div className="precio-label">Precio estimado</div>
              <div className="precio-monto">${precioPorClase} ARS / Sesión</div>
            </div>

            <button className="btn-solicitar-mentoria disabled" disabled>
              Actualmente No Disponible
            </button>


            <button className="btn-notificar-disponibilidad">
              🔔 Notificarme cuando esté disponible
            </button>
          </>
        )}
      </div>

      <div className="tarjeta-reporte">
        <h4>¿Algo no parece correcto?</h4>
        <a href="#" className="reportar-link">
          Reportar este perfil
        </a>
      </div>
    </aside>
  );
};
