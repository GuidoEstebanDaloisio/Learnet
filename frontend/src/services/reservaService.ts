import api from "./api";

export const crearReserva = async (data: {
  mentorId: string;
  habilidad: string;
  mensaje?: string;
}) => {
  const res = await api.post("/reservas/solicitar", data);
  return res.data.reserva;
};

export const obtenerSolicitudesParaMentor = async (mentorId: string) => {
  const res = await api.get(`/reservas/mentor/${mentorId}`);
  return res.data;
};