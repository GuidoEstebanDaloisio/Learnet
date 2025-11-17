// src/controllers/mentoriaAsignadaController.ts
import { Request, Response } from "express";
import { MentoriaAsignadaModel } from "../models/MentoriaAsignada";
import { obtenerMentoriasAsignadasDeMentor, obtenerMentoriasAsignadasDeAlumno, obtenerMentoriaAsignadaPorId } from "../services/mentoriaAsignadaService";

export const listarMentoriasAsignadasDeMentor = async (req: Request, res: Response) => {
  try {
    const mentorId = req.params.id;
    const mentorias = await obtenerMentoriasAsignadasDeMentor(mentorId);
    res.json(mentorias);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};

// Listar mentorías asignadas de un alumno
export const listarMentoriasAsignadasDeAlumno = async (req: Request, res: Response) => {
  try {
    const alumnoId = req.params.id;
    const mentorias = await obtenerMentoriasAsignadasDeAlumno(alumnoId);
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


export const obtenerMentoriaAsignadaPorIdController = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const mentoria = await obtenerMentoriaAsignadaPorId(id);
    res.json(mentoria);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};