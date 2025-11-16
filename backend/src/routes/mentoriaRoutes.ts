// src/routes/mentoriaRoutes.ts
import { Router } from "express";
import { crearMentoriaController, listarMentoriasDeMentor } from "../controllers/mentoriaController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

// Crear plantilla o mentoria base
router.post("/crear", verificarToken, crearMentoriaController);

// Listar mentorías del mentor
router.get("/mentor/:id", verificarToken, listarMentoriasDeMentor);

export default router;
