import { ReservaModel } from "../models/Reserva";
import { MentorModel } from "../models/Mentor";
import { AlumnoModel } from "../models/Alumno";

interface CrearReservaInput {
  mentorId: string;
  alumnoId: string;
  habilidad: string;
  mensaje?: string;
}

export const crearReservaService = async (input: CrearReservaInput) => {
  const { mentorId, alumnoId, habilidad, mensaje } = input;

  // 1️⃣ Buscar mentor
  const mentor = await MentorModel.findOne({ usuario: mentorId });
  if (!mentor) throw new Error("Mentor no encontrado");

  // 2️⃣ Validar que el mentor tenga esa habilidad
  if (!mentor.habilidadesClave.includes(habilidad)) {
    throw new Error("El mentor no ofrece esa habilidad");
  }

  // 3️⃣ Buscar alumno
  const alumno = await AlumnoModel.findOne({ usuario: alumnoId });
  if (!alumno) throw new Error("Alumno no encontrado");

  // 4️⃣ Crear reserva
  const reserva = await ReservaModel.create({
    alumno: alumno._id,
    mentor: mentor._id,
    habilidad,
    mensaje,
  });

  return reserva;
};

// Obtener solicitudes para un mentor
export const obtenerSolicitudesParaMentor = async (mentorId: string) => {
  return await ReservaModel.find({ mentor: mentorId })
    .populate("alumno") // para ver nombre, email, etc.
    .sort({ fechaSolicitud: -1 });
};