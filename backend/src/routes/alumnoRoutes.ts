import { Router } from "express";
import { AlumnoModel } from "../models/Alumno";
import { logger } from "../utils/logger";

const router = Router();

// 🔹 Obtener un alumno por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;

    const alumno = await AlumnoModel.findById(id)
      .populate("usuario", "email") // Para traer el email asociado
      .select("nombre apellido fechaNacimiento nivelEducativo");

    if (!alumno) {
      return res.status(404).json({ error: "Alumno no encontrado" });
    }

    logger.info(`Alumno ${id} obtenido correctamente`);
    res.json(alumno);

  } catch (error) {
    logger.error("Error al obtener alumno", error);
    res.status(500).json({ error: "Error al obtener alumno" });
  }
});

export default router;
