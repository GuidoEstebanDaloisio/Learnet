// src/controllers/reservaController.ts
import { Request, Response } from "express";
import { RequestConUsuario } from "../middlewares/authMiddleware";

import {crearReservaService, obtenerSolicitudesParaMentor} from "../services/reservaService";
import {crearMentoriaAsignada} from "../services/mentoriaAsignadaService";


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

export const aceptarReservaController = async (req: Request, res: Response) => {
  try {
    const reservaId = req.params.id;
    const { fechaHora, linkMeet, mentoriaId } = req.body;

    const mentoriaAsignada = await crearMentoriaAsignada({
      reservaId,
      mentoriaId, 
      fechaHora: new Date(fechaHora),
      linkMeet,
    });

    return res.status(201).json({
      mensaje: "Reserva aceptada y mentoría asignada creada",
      mentoriaAsignada,
    });
  } catch (error: any) {
    return res.status(400).json({ error: error.message });
  }
};
