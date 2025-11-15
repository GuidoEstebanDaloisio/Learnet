import api from "./api";

export const obtenerAlumnoPorId = async (id: string) => {
  const res = await api.get(`/alumnos/${id}`);
  return res.data;
};
