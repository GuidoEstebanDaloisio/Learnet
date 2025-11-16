// src/services/mentoriaAsignadaService.ts
import { MentoriaAsignadaModel } from "../models/MentoriaAsignada";

interface CrearMentoriaAsignadaInput {
  reservaId: string;
  plantillaId: string;
  mentorId: string;
  alumnoId: string;
  fechaHora: Date;
  linkMeet: string;
}

export const crearMentoriaAsignada = async (data: CrearMentoriaAsignadaInput) => {
  return await MentoriaAsignadaModel.create({
    reserva: data.reservaId,
    plantilla: data.plantillaId,
    mentor: data.mentorId,
    alumno: data.alumnoId,
    fechaHora: data.fechaHora,
    linkMeet: data.linkMeet,
  });
};
