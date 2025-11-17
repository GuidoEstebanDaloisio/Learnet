// src/routes/mentoriaAsignadaRoutes.ts
import { Router } from "express";
import {
  listarMentoriasAsignadasDeMentor,
  listarMentoriasAsignadasDeAlumno,
  finalizarMentoriaAsignada,
  cancelarMentoriaAsignada,
} from "../controllers/mentoriaAsignadaController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

// Mentor ve sus sesiones asignadas
router.get("/mentor", verificarToken, listarMentoriasAsignadasDeMentor);

// Alumno ve sus sesiones asignadas
router.get("/alumno", verificarToken, listarMentoriasAsignadasDeAlumno);

// Finalizar una sesión
router.put("/finalizar/:id", verificarToken, finalizarMentoriaAsignada);

// Cancelar una sesión
router.put("/cancelar/:id", verificarToken, cancelarMentoriaAsignada);

export default router;
