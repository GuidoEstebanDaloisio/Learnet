import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

export interface RequestConUsuario extends Request {
  usuario?: any;
}

export const verificarToken = (
  req: RequestConUsuario,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      return res.status(401).json({ error: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1]; // formato: "Bearer <token>"

    const decoded = jwt.verify(token, process.env.JWT_SECRET || "claveSecreta");
    req.usuario = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Token inválido o expirado" });
  }
};
