// src/controllers/mentoriaAsignadaController.ts
import { Request, Response } from "express";
import { MentoriaAsignadaModel } from "../models/MentoriaAsignada";
import { crearMentoriaAsignada } from "../services/mentoriaAsignadaService";

export const listarMentoriasAsignadasDeMentor = async (req: any, res: Response) => {
  try {
    const mentorId = req.usuario.id;

    const mentorias = await MentoriaAsignadaModel.find({ mentor: mentorId })
      .populate("plantilla")
      .populate("alumno")
      .sort({ fechaHora: 1 });

    res.json(mentorias);

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const listarMentoriasAsignadasDeAlumno = async (req: any, res: Response) => {
  try {
    const alumnoId = req.usuario.id;

    const mentorias = await MentoriaAsignadaModel.find({ alumno: alumnoId })
      .populate("plantilla")
      .populate("mentor")
      .sort({ fechaHora: 1 });

    res.json(mentorias);

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const finalizarMentoriaAsignada = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const mentoria = await MentoriaAsignadaModel.findById(id);
    if (!mentoria) throw new Error("Mentoría asignada no encontrada");

    mentoria.estado = "finalizada";
    await mentoria.save();

    res.json({ mensaje: "Mentoría finalizada", mentoria });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

export const cancelarMentoriaAsignada = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;

    const mentoria = await MentoriaAsignadaModel.findById(id);
    if (!mentoria) throw new Error("Mentoría asignada no encontrada");

    mentoria.estado = "cancelada";
    await mentoria.save();

    res.json({ mensaje: "Mentoría cancelada", mentoria });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
