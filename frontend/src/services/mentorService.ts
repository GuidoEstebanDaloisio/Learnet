import api from "./api";


export const obtenerMentores = async () => {
  const res = await api.get("/mentores");
  return res.data;
};

export const obtenerMentorPorId = async (id: string) => {
  const res = await api.get(`/mentores/${id}`);
  return res.data;
};