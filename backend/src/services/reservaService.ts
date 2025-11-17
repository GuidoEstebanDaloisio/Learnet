// src/services/reservaService.ts
import { ReservaModel, IReserva } from "../models/Reserva";
import {IMentoria, MentoriaModel} from "../models/Mentoria";
import { MentorModel, } from "../models/Mentor";
import { AlumnoModel } from "../models/Alumno";

import { obtenerMentoriasPorMentorYTema } from "./mentoriaService";
import { crearMentoriaAsignada } from "./mentoriaAsignadaService";

import mongoose from "mongoose";

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
  reservaId: mongoose.Types.ObjectId | string,
  nuevoEstado: "aceptada" | "rechazada",
  mentorId: mongoose.Types.ObjectId | string
) => {
  const reserva = await ReservaModel.findById(reservaId);
  if (!reserva) throw new Error("Reserva no encontrada");

  if (reserva.mentor.toString() !== mentorId.toString())
    throw new Error("No autorizado para modificar esta solicitud");

  if (reserva.estado !== "pendiente")
    throw new Error("La reserva ya fue procesada");

  reserva.estado = nuevoEstado;
  await reserva.save();

  return reserva;
};

interface AceptarReservaInput {
  reservaId: String;
  mentorId: string;
  mentoriaId: string; // ID de la plantilla de Mentoria que se usará
  fechaHora: Date;
  linkMeet: string;
}

/**
 * Proceso de aceptación de una reserva:
 * 1. Valida la existencia de la reserva y la mentoria.
 * 2. Crea la MentoriaAsignada.
 * 3. Cambia el estado de la Reserva a "aceptada".
 * @param input Datos para la aceptación.
 * @returns La MentoriaAsignada creada.
 */
export const aceptarReservaService = async (input: AceptarReservaInput) => {
  const { reservaId, mentoriaId, mentorId, fechaHora, linkMeet } = input;

  // 1. Buscar y validar la Reserva
  const reserva = await ReservaModel.findById(reservaId);
  if (!reserva) {
    throw new Error("Reserva no encontrada");
  }

  if (reserva.mentor.toString() !== mentorId) {
    // Validar que el mentor que acepta es el dueño de la reserva
    throw new Error("El mentor no está autorizado para aceptar esta reserva");
  }

  if (reserva.estado !== "pendiente") {
    throw new Error(
      `La reserva ya fue ${reserva.estado}. No se puede aceptar.`
    );
  }

  // 2. Buscar y validar la plantilla de Mentoria
  const mentoriaPlantilla = await mongoose.model("Mentoria").findById(mentoriaId);
  if (!mentoriaPlantilla) {
    throw new Error("Plantilla de Mentoria no encontrada");
  }

  if (
    mentoriaPlantilla.mentor.toString() !== mentorId ||
    mentoriaPlantilla.tema !== reserva.habilidad
  ) {
    // Es crucial que la plantilla sea del mentor y corresponda al tema de la solicitud
    throw new Error(
      "La plantilla de Mentoria no es válida para esta solicitud"
    );
  }

  // 3. Crear la MentoriaAsignada
  const nuevaMentoriaAsignada = await crearMentoriaAsignada({
    reservaId: reserva._id.toString(),
    mentoriaId: mentoriaPlantilla._id,
    mentorId: reserva.mentor, // ID de Mentor (colección Mentor)
    alumnoId: reserva.alumno, // ID de Alumno (colección Alumno)
    fechaHora,
    linkMeet,
  });

  // 4. Actualizar el estado de la Reserva a "aceptada"
  reserva.estado = "aceptada";
  await reserva.save();

  // Opcional: podrías devolver un objeto con la reserva actualizada y la mentoria asignada
  return nuevaMentoriaAsignada;
};