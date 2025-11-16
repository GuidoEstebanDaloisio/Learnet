// src/controllers/mentoriaController.ts
import { Request, Response } from "express";
import { crearMentoria, obtenerMentoriasDeMentor } from "../services/mentoriaService";

export const crearMentoriaController = async (req: Request, res: Response) => {
  try {
    const { mentorId, titulo, tema, descripcion } = req.body;

    const mentoria = await crearMentoria({
      mentorId,
      titulo,
      tema,
      descripcion,
    });

    res.status(201).json({
      mensaje: "Mentoría creada correctamente",
      mentoria,
    });

  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};


export const listarMentoriasDeMentor = async (req: Request, res: Response) => {
  try {
    const mentorId = req.params.id;
    const mentorias = await obtenerMentoriasDeMentor(mentorId);
    res.json(mentorias);
  } catch (error: any) {
    res.status(400).json({ error: error.message });
  }
};
