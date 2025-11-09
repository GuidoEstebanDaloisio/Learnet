import { Request, Response } from "express";
import { RequestConUsuario } from "../middlewares/authMiddleware";
import { UsuarioModel } from "../models/Usuario";
import { AlumnoModel } from "../models/Alumno";
import { MentorModel } from "../models/Mentor";
import { AdminModel } from "../models/Admin";

export const obtenerPerfil = async (req: RequestConUsuario, res: Response) => {
  try {
    if (!req.usuario) {
      return res.status(401).json({ error: "No autorizado" });
    }

    const { id, rol } = req.usuario;

    // Buscar los datos según el rol
    let perfil: any;

    switch (rol) {
      case "alumno":
        perfil = await AlumnoModel.findOne({ usuario: id }).populate("usuario", "email rol");
        break;
      case "mentor":
        perfil = await MentorModel.findOne({ usuario: id }).populate("usuario", "email rol");
        break;
      case "admin":
        perfil = await AdminModel.findOne({ usuario: id }).populate("usuario", "email rol");
        break;
      default:
        return res.status(400).json({ error: "Rol desconocido" });
    }

    if (!perfil) {
      return res.status(404).json({ error: "Perfil no encontrado" });
    }

    res.json(perfil);
  } catch (error) {
    console.error("Error al obtener perfil:", error);
    res.status(500).json({ error: "Error al obtener perfil" });
  }
};
