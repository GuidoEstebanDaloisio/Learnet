// src/services/mentoriaService.ts
import api from "./api";

export const obtenerMentoriasDeMentor = async (mentorId: string) => {
  const res = await api.get(`/mentoria/mentor/${mentorId}`);
  return res.data;
};

export const crearMentoria = async (data: any) => {
  const res = await api.post("/mentoria/crear", data);
  return res.data.mentoria;
};

export const obtenerMentoriasPorMentorYTema = async (mentorId: string, tema: string) => {
  const res = await api.get(`/mentoria/mentor/${mentorId}/${encodeURIComponent(tema)}`);
  return res.data;
};