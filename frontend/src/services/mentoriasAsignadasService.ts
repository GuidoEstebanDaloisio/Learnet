import api from "./api";

export const obtenerMentoriasAsignadasDeAlumno = async (alumnoId: string) => {
  const res = await api.get(`/mentoria-asignada/alumno/${alumnoId}`);
  return res.data;
};

export const obtenerMentoriasAsignadasDeMentor = async (mentorId: string) => {
  const res = await api.get(`/mentoria-asignada/mentor/${mentorId}`);
  return res.data;
};

export const obtenerMentoriaAsignadaPorId = async (mentoriaId: string) => {
  const res = await api.get(`/mentoria-asignada/${mentoriaId}`);
  return res.data;
};