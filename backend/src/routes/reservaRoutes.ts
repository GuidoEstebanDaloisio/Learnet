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

// Aceptar reserva y asignar mentoría
router.post("/aceptar/:id", verificarToken, aceptarReservaController);

export default router;
