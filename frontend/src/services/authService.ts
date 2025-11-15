import api from "./api";

export const registrarUsuario = async (data: any) => {
  const res = await api.post("/auth/register", data);
  return res.data;
};

export const loginUsuario = async (data: any) => {
  const res = await api.post("/auth/login", data);
  return res.data;
};

/*export const obtenerPerfil = async (token: string) => {
  const res = await api.get("/usuarios/perfil", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};*/


export const obtenerPerfilUsuario = async () => {
  const token = localStorage.getItem("token");
  const res = await api.get("/auth/me", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
  return res.data;
};