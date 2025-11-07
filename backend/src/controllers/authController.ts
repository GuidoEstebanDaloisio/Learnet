import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { UsuarioModel } from "../models/Usuario";

// 🔹 Registrar usuario
export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { nombre, email, password, rol } = req.body;

    const existe = await UsuarioModel.findOne({ email });
    if (existe) return res.status(400).json({ error: "El correo ya está registrado" });

    const hashedPassword = await bcrypt.hash(password, 10);
    const nuevoUsuario = await UsuarioModel.create({
      nombre,
      email,
      password: hashedPassword,
      rol
    });

    res.status(201).json({
      mensaje: "Usuario registrado correctamente",
      usuario: nuevoUsuario
    });
  } catch (error) {
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

// 🔹 Login usuario
export const loginUsuario = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;
    const usuario = await UsuarioModel.findOne({ email });

    if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

    const coincide = await bcrypt.compare(password, usuario.password);
    if (!coincide) return res.status(400).json({ error: "Contraseña incorrecta" });

    const token = jwt.sign(
      { id: usuario._id, rol: usuario.rol },
      process.env.JWT_SECRET || "claveSecreta",
      { expiresIn: "2h" }
    );

    res.json({
      mensaje: "Login exitoso",
      token
    });
  } catch (error) {
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
