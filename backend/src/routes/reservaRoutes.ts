import { Router } from "express";
import {
  crearReservaController,
  listarSolicitudesParaMentor,
  aceptarReservaController
} from "../controllers/reservaController";

import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

// Crear una reserva
router.post("/solicitar", verificarToken, crearReservaController);

// Listar solicitudes recibidas por el mentor
router.get("/mentor/:id", verificarToken, listarSolicitudesParaMentor);

// Aceptar una reserva y crear MentoriaAsignada (Ruta protegida para mentores)
router.put("/aceptar/:id", verificarToken, aceptarReservaController);

export default router;
