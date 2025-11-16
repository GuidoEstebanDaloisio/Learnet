import { useState } from "react";
import { crearReserva } from "../../../services/reservaService";
import "./acciones.css";

interface AccionesProps {
  mentor: {
    _id: string;
    usuario: string;
    nombre: string;
    precioPorClase: number;
    habilidadesClave: string[];
    estaDisponible: boolean;
  };
}

export const Acciones: React.FC<AccionesProps> = ({ mentor }) => {
  const { nombre, precioPorClase, estaDisponible } = mentor;

  // Control interno
  const [mostrandoFormulario, setMostrandoFormulario] = useState(false);
  const [habilidad, setHabilidad] = useState("");
  const [mensaje, setMensaje] = useState("");
  const [loading, setLoading] = useState(false);
  const [exito, setExito] = useState("");

  const abrirFormulario = () => {
    setMostrandoFormulario(true);
    setExito("");
  };

  const enviarSolicitud = async () => {
    if (!habilidad) {
      alert("Debes seleccionar una habilidad.");
      return;
    }

    try {
      setLoading(true);
      await crearReserva({
        mentorId: mentor.usuario, // el ID del usuario mentor
        habilidad,
        mensaje,
      });

      setExito("Solicitud enviada correctamente 🎉");
      setMostrandoFormulario(false);
      setHabilidad("");
      setMensaje("");
    } catch (e: any) {
      alert("Error al enviar solicitud: " + e.message);
    } finally {
      setLoading(false);
    }
  };

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

            <button
              className="btn-solicitar-mentoria"
              onClick={abrirFormulario}
            >
              Reservar Sesión
            </button>
          </>
        ) : (
          <>
            <p className="texto-sesion">
              La disponibilidad de {nombre} puede cambiar pronto.
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

        {/* FORMULARIO DE RESERVA */}
        {mostrandoFormulario && (
          <div className="formulario-reserva">
            <h4>Enviar Solicitud</h4>

            <label>Selecciona una habilidad:</label>
            <select
              value={habilidad}
              onChange={(e) => setHabilidad(e.target.value)}
            >
              <option value="">-- Seleccionar --</option>
              {mentor.habilidadesClave.map((h) => (
                <option key={h} value={h}>
                  {h}
                </option>
              ))}
            </select>

            <label>Mensaje (opcional):</label>
            <textarea
              value={mensaje}
              onChange={(e) => setMensaje(e.target.value)}
              placeholder="Mensaje para el mentor..."
            />

            <button
              className="btn-solicitar-mentoria"
              onClick={enviarSolicitud}
              disabled={loading}
            >
              {loading ? "Enviando..." : "Confirmar Reserva"}
            </button>

            <button
              className="btn-cancelar"
              onClick={() => setMostrandoFormulario(false)}
            >
              Cancelar
            </button>
          </div>
        )}

        {exito && <p className="exito">{exito}</p>}
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
