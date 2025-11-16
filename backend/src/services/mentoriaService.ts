// src/services/mentoriaService.ts
import { MentoriaModel } from "../models/Mentoria";
import { MentorModel } from "../models/Mentor";

interface CrearMentoriaInput {
  mentorId: string;       // ID del usuario mentor
  titulo: string;
  tema: string;
  descripcion: string;
}

export const crearMentoria = async (input: CrearMentoriaInput) => {
  const { mentorId, titulo, tema, descripcion } = input;

  // 1️⃣ Buscar el mentor correctmente
  const mentor = await MentorModel.findOne({ usuario: mentorId });
  if (!mentor) throw new Error("Mentor no encontrado");

  // 2️⃣ Validar habilidad
  if (!mentor.habilidadesClave.includes(tema)) {
    throw new Error("El mentor no posee esa habilidad");
  }

  // 3️⃣ Crear mentoría
  const nuevaMentoria = await MentoriaModel.create({
    mentor: mentor._id,
    titulo,
    tema,
    descripcion,
  });

  return nuevaMentoria;
};

// Listar mentorías
export const obtenerMentoriasDeMentor = async (mentorId: string) => {
  return await MentoriaModel.find({ mentor: mentorId }).sort({ titulo: 1 });
};
