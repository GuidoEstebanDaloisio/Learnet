// InfoPrincipalAlumno.tsx
interface Props {
  alumno: any; // ahora contiene email, rol, perfil
}

export const InfoPrincipalAlumno: React.FC<Props> = ({ alumno }) => {
  return (
    <div className="perfil-info-principal">
      <section className="encabezado-alumno">
        <img
          src="/img/Alumna_perfil.png"
          alt="Foto de Perfil del Alumno"
          className="foto-perfil"
        />

        <div className="info-resumen">
          <h1>{alumno.perfil.nombre} {alumno.perfil.apellido}</h1>
          <button className="btn-editar-perfil">Editar Perfil</button>
        </div>
      </section>

      <hr />

      <section className="datos-personales">
        <h2>Datos Personales y Contacto</h2>

        <div className="lista-datos">
          <div className="dato-item">
            <span className="dato-etiqueta">📧 Correo Electrónico:</span>
            <span className="dato-valor">{alumno.email}</span> 
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">🎂 Fecha de nacimiento:</span>
            <span className="dato-valor">
              {new Date(alumno.perfil.fechaNacimiento).toLocaleDateString("es-AR")}
            </span>
          </div>

          <div className="dato-item">
            <span className="dato-etiqueta">🎓 Nivel Educativo:</span>
            <span className="dato-valor">
              {alumno.perfil.nivelEducativo || "No especificado"}
            </span>
          </div>
        </div>
      </section>
    </div>
  );
};
