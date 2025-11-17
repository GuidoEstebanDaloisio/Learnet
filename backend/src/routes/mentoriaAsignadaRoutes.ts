// src/routes/mentoriaAsignadaRoutes.ts
import { Router } from "express";
import { listarMentoriasAsignadasDeMentor, listarMentoriasAsignadasDeAlumno, finalizarMentoriaAsignada, cancelarMentoriaAsignada, obtenerMentoriaAsignadaPorIdController} from "../controllers/mentoriaAsignadaController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

// Mentor ve sus sesiones asignadas
router.get("/mentor/:id", verificarToken, listarMentoriasAsignadasDeMentor);

// Alumno ve sus sesiones asignadas
router.get("/alumno/:id", verificarToken, listarMentoriasAsignadasDeAlumno);

router.get("/:id", verificarToken, obtenerMentoriaAsignadaPorIdController);

// Finalizar una sesión
router.put("/finalizar/:id", verificarToken, finalizarMentoriaAsignada);

// Cancelar una sesión
router.put("/cancelar/:id", verificarToken, cancelarMentoriaAsignada);

export default router;
