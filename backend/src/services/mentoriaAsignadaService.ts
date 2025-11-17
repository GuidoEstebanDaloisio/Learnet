import { MentoriaAsignadaModel, IMentoriaAsignada } from "../models/MentoriaAsignada";
import { ReservaModel, IReserva } from "../models/Reserva";
import { MentoriaModel, IMentoria } from "../models/Mentoria";
import { MentorModel } from "../models/Mentor";
import { AlumnoModel } from "../models/Alumno";
import mongoose from "mongoose";

interface CrearMentoriaAsignadaInput {
  reservaId: string;   // ID de la reserva que se acepta
  mentoriaId: string;   // ID de la reserva que se acepta
  fechaHora: Date;     // Fecha y hora acordada para la mentoría
  linkMeet: string;    // Link de Meet
}

export const crearMentoriaAsignada = async (input: CrearMentoriaAsignadaInput) => {
  const { reservaId, mentoriaId, fechaHora, linkMeet } = input;

  // 1. Obtener la reserva
  const reserva = await ReservaModel.findById(reservaId);
  if (!reserva) throw new Error("Reserva no encontrada");

  if (reserva.estado !== "pendiente") {
    throw new Error("Solo se pueden aceptar reservas pendientes");
  }

  // 2. Obtener mentor y alumno
  const mentor = await MentorModel.findById(reserva.mentor);
  if (!mentor) throw new Error("Mentor no encontrado");

  const alumno = await AlumnoModel.findById(reserva.alumno);
  if (!alumno) throw new Error("Alumno no encontrado");

  // 3. Buscar la mentoría seleccionada y validar que sea del mentor
  const mentoriaElegida = await MentoriaModel.findOne({
    _id: mentoriaId,
    mentor: mentor._id,
  });

  if (!mentoriaElegida) {
    throw new Error("La mentoría seleccionada no pertenece al mentor");
  }

  // 4. Crear MentoriaAsignada
  const mentoriaAsignada = await MentoriaAsignadaModel.create({
    reserva: reserva._id,
    mentoria: mentoriaId,
    mentor: mentor._id,
    alumno: alumno._id,
    fechaHora,
    linkMeet,
    estado: "pendiente",
  });

  // 5. Actualizar estado de la reserva
  reserva.estado = "aceptada";
  await reserva.save();

  return mentoriaAsignada;
};

