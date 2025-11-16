import { Router } from "express";
import { crearReservaController, listarSolicitudesParaMentor } from "../controllers/reservaController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/solicitar", verificarToken, crearReservaController);

// Listar solicitudes que recibió el mentor
router.get("/mentor/:id", verificarToken, listarSolicitudesParaMentor);


export default router;
