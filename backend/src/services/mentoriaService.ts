import { MentoriaModel } from "../models/Mentoria";
import { MentorModel } from "../models/Mentor";

interface CrearMentoriaInput {
  mentorId: string;
  titulo: string;
  tema: string;
  descripcion: string;
}

export const crearMentoria = async (input: CrearMentoriaInput) => {
  const { mentorId, titulo, tema, descripcion } = input;

  // Buscar mentor por usuario
  const mentor = await MentorModel.findOne({ usuario: mentorId });
  if (!mentor) throw new Error("Mentor no encontrado");

  // Validar habilidad
  if (!mentor.habilidadesClave.includes(tema)) {
    throw new Error("El mentor no posee esa habilidad");
  }

  // Crear plantilla o mentoría base
  const nuevaMentoria = await MentoriaModel.create({
    mentor: mentor._id, // convertir ObjectId -> string
    titulo,
    tema,
    descripcion,
  });

  return nuevaMentoria;
};


export const obtenerMentoriasDeMentor = async (mentorId: string) => {
  return await MentoriaModel.find({
    mentor: mentorId.toString()
  }).sort({ titulo: 1 });
};


export const obtenerMentoriasPorMentorYTema = async (mentorId: string, tema: string) => {
  return await MentoriaModel.find({
    mentor: mentorId.toString(),
    tema: tema,
  }).sort({ titulo: 1 });
};
