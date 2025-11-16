// src/services/reservaService.ts
import { ReservaModel } from "../models/Reserva";
import { MentorModel } from "../models/Mentor";
import { AlumnoModel } from "../models/Alumno";

import { obtenerMentoriasPorMentorYTema } from "./mentoriaService";
import { crearMentoriaAsignada } from "./mentoriaAsignadaService";

interface CrearReservaInput {
  mentorId: string;
  alumnoId: string;
  habilidad: string;
  mensaje?: string;
}

export const crearReservaService = async (input: CrearReservaInput) => {
  const { mentorId, alumnoId, habilidad, mensaje } = input;

  const mentor = await MentorModel.findOne({ usuario: mentorId });
  if (!mentor) throw new Error("Mentor no encontrado");

  if (!mentor.habilidadesClave.includes(habilidad)) {
    throw new Error("El mentor no ofrece esa habilidad");
  }

  const alumno = await AlumnoModel.findOne({ usuario: alumnoId });
  if (!alumno) throw new Error("Alumno no encontrado");

  const reserva = await ReservaModel.create({
    alumno: alumno._id,
    mentor: mentor._id,
    habilidad,
    mensaje
  });

  return reserva;
};

export const obtenerSolicitudesParaMentor = async (mentorId: string) => {
  return await ReservaModel.find({ mentor: mentorId })
    .populate("alumno")
    .sort({ fechaSolicitud: -1 });
};

export const actualizarEstadoReserva = async (
  reservaId: string,
  nuevoEstado: "aceptada" | "rechazada",
  mentorId: string
) => {
  const reserva = await ReservaModel.findById(reservaId);
  if (!reserva) throw new Error("Reserva no encontrada");

  if (reserva.mentor.toString() !== mentorId)
    throw new Error("No autorizado para modificar esta solicitud");

  if (reserva.estado !== "pendiente")
    throw new Error("La reserva ya fue procesada");

  reserva.estado = nuevoEstado;
  await reserva.save();

  return reserva;
};


// ⭐⭐⭐ NUEVO: Servicio completo para aceptar y asignar una mentoría ⭐⭐⭐
export const aceptarReservaService = async (params: {
  reservaId: string;
  mentorId: string;
  fechaHora: string;
  linkMeet: string;
}) => {
  const { reservaId, mentorId, fechaHora, linkMeet } = params;

  // Cambiar estado
  const reserva = await actualizarEstadoReserva(reservaId, "aceptada", mentorId);

  // Buscar plantillas del mentor según habilidad
  const plantillas = await obtenerMentoriasPorMentorYTema(
    reserva.mentor.toString(),
    reserva.habilidad
  );

  if (plantillas.length === 0)
    throw new Error("No hay mentorías creadas para esta habilidad");

  const plantillaElegida = plantillas[0];

  // Crear la sesión asignada
  const cita = await crearMentoriaAsignada({
    reservaId,
    plantillaId: plantillaElegida._id.toString(),
    mentorId: reserva.mentor.toString(),
    alumnoId: reserva.alumno.toString(),
    fechaHora: new Date(fechaHora),
    linkMeet: linkMeet.trim(),
  });

  return {
    mensaje: "Reserva aceptada y mentoría asignada",
    reserva,
    cita,
  };
};
