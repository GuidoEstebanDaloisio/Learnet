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

export const aceptarReserva = async (
  reservaId: string,
  data: {
    fechaHora: string;
    linkMeet: string;
    mentoriaId: string; 
  }
) => {
  return await api.put(`/reservas/aceptar/${reservaId}`, data);
};
