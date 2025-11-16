import { Request, Response } from "express";
import { crearReservaService, obtenerSolicitudesParaMentor } from "../services/reservaService";
import { RequestConUsuario } from "../middlewares/authMiddleware";

export const crearReservaController = async (
  req: RequestConUsuario,
  res: Response
) => {
  try {
    const alumnoId = req.usuario?.id;
    if (!alumnoId) {
      return res.status(401).json({ error: "Usuario no autenticado" });
    }

    const { mentorId, habilidad, mensaje } = req.body;

    const reserva = await crearReservaService({
      mentorId,
      alumnoId,
      habilidad,
      mensaje,
    });

    return res.status(201).json({
      mensaje: "Reserva creada correctamente",
      reserva,
    });

  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};

export const listarSolicitudesParaMentor = async (req: Request, res: Response) => {
  try {
    const mentorId = req.params.id;

    const solicitudes = await obtenerSolicitudesParaMentor(mentorId);

    res.json(solicitudes);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};