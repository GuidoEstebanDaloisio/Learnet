import { Router } from "express";
import { MentorModel } from "../models/Mentor";
import { logger } from "../utils/logger";

const router = Router();

// 🔹 Obtener todos los mentores (solo los campos necesarios)
router.get("/", async (req, res) => {
  try {
    const mentores = await MentorModel.find()
      .populate("usuario", "email") // para obtener también el email
      .select("nombre apellido titulo presentacion disponible");

    logger.info("Mentores obtenidos correctamente", { cantidad: mentores.length });
    res.json(mentores);
  } catch (error) {
    logger.error("Error al obtener mentores", error);
    res.status(500).json({ error: "Error al obtener mentores" });
  }
});

export default router;
