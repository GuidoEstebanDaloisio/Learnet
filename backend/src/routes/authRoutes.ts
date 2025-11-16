import { Router } from "express";
import { registrarUsuario, iniciarSesion, obtenerPerfil } from "../controllers/authController";
import { verificarToken } from "../middlewares/authMiddleware";

const router = Router();

router.post("/register", registrarUsuario);
router.post("/login", iniciarSesion);


router.get("/me", verificarToken, obtenerPerfil);


export default router;
