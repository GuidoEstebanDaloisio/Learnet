import api from "./api";

export const obtenerMentores = async () => {
  const res = await api.get("/mentores");
  return res.data;
};
