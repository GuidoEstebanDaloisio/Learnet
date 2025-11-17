// src/routes/mentoriaRoutes.ts

import { Router } from "express";
import {crearMentoriaController, listarMentoriasDeMentor, listarMentoriasPorMentorYTema} from "../controllers/mentoriaController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

// Crear plantilla de mentoría
router.post("/crear", verificarToken, crearMentoriaController);

// Listar mentorías del mentor
router.get("/mentor/:id", verificarToken, listarMentoriasDeMentor);

// Listar mentorías del mentor por tema
router.get("/mentor/:id/:tema", verificarToken, listarMentoriasPorMentorYTema);

export default router;
