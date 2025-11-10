import { Router } from "express";
import { MentorModel } from "../models/Mentor";
import { logger } from "../utils/logger";

const router = Router();

// 🔹 Obtener todos los mentores
router.get("/", async (req, res) => {
  try {
    const mentores = await MentorModel.find()
      .populate("usuario", "email")
      .select("nombre apellido titulo presentacion disponible");

    logger.info("Mentores obtenidos correctamente", { cantidad: mentores.length });
    res.json(mentores);
  } catch (error) {
    logger.error("Error al obtener mentores", error);
    res.status(500).json({ error: "Error al obtener mentores" });
  }
});

// 🔹 Obtener un mentor por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const mentor = await MentorModel.findById(id)
      .populate("usuario", "email")
      .select("nombre apellido titulo presentacion habilidades experiencia descripcion fechaUnion disponible precioPorClase");

    if (!mentor) {
      return res.status(404).json({ error: "Mentor no encontrado" });
    }

    logger.info(`Mentor ${id} obtenido correctamente`);
    res.json(mentor);
  } catch (error) {
    logger.error("Error al obtener mentor", error);
    res.status(500).json({ error: "Error al obtener mentor" });
  }
});


export default router;
