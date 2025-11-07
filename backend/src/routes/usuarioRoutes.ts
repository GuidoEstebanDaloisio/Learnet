import { Router, Response } from "express";
import { RequestConUsuario, verificarToken } from "../middlewares/authMiddleware";
import { UsuarioModel } from "../models/Usuario";

const router = Router();

// Ruta protegida: solo con token
router.get("/perfil", verificarToken, async (req: RequestConUsuario, res: Response) => {
  try {
    const usuario = await UsuarioModel.findById(req.usuario.id).select("-password");
    if (!usuario) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(usuario);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener perfil" });
  }
});

export default router;
