import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { TODOS_LOS_ROLES, ROLES } from "../constants/roles";
import { UsuarioModel } from "../models/Usuario";
import { AlumnoModel } from "../models/Alumno";
import { MentorModel } from "../models/Mentor";
import { AdminModel } from "../models/Admin";


export const registrarUsuario = async (req: Request, res: Response) => {
  try {
    const { email, contraseña, rol, codigoAcceso } = req.body;

    // 🔹 Validar rol
    if (!TODOS_LOS_ROLES.includes(rol)) {
      return res.status(400).json({ error: "Rol inválido" });
    }

    // 🔹 Validar código de acceso si el rol es admin
    if (rol === ROLES.ADMIN) {
      const codigoCorrecto = process.env.CODIGO_ACCESO_ADMIN;
      if (codigoAcceso !== codigoCorrecto) {
        return res.status(403).json({ error: "Código de acceso inválido" });
      }
    }

    // Verificar si ya existe
    const existe = await UsuarioModel.findOne({ email });
    if (existe) return res.status(400).json({ error: "El correo ya está registrado" });

    // Encriptar contraseña
    const hashedPassword = await bcrypt.hash(contraseña, 10);

    // Crear usuario base
    const usuario = await UsuarioModel.create({ email, contraseña: hashedPassword, rol });

    // Crear registro adicional según el rol
    if (rol === "alumno") {
      const { nombre, apellido, fechaNacimiento, nivelEducativo } = req.body;
      await AlumnoModel.create({ usuario: usuario._id, nombre, apellido, fechaNacimiento, nivelEducativo });
    }

    if (rol === "mentor") {
      const {
        nombre,
        apellido,
        fechaNacimiento,
        titulo,
        presentacion,
        biografia,
        habilidadesClave,
        experiencia,
        precioPorClase,
        tiempoRespuesta,
      } = req.body;
      await MentorModel.create({
        usuario: usuario._id,
        nombre,
        apellido,
        fechaNacimiento,
        titulo,
        presentacion,
        biografia,
        habilidadesClave,
        experiencia,
        precioPorClase,
        tiempoRespuesta,
      });
    }

    if (rol === "admin") {
      const { nombre, apellido, fechaNacimiento } = req.body;
      await AdminModel.create({ usuario: usuario._id, nombre, apellido, fechaNacimiento });
    }

    res.status(201).json({ mensaje: "Usuario registrado correctamente", usuario });
  } catch (error) {
    console.error("Error al registrar usuario:", error);
    res.status(500).json({ error: "Error al registrar usuario" });
  }
};

import jwt from "jsonwebtoken";

// 🔹 Iniciar sesión
export const iniciarSesion = async (req: Request, res: Response) => {
  try {
    const { email, contraseña } = req.body;

    // Buscar usuario
    const usuario = await UsuarioModel.findOne({ email });
    if (!usuario) return res.status(400).json({ error: "Usuario no encontrado" });

    // Verificar contraseña
    const coincide = await bcrypt.compare(contraseña, usuario.contraseña);
    if (!coincide) return res.status(400).json({ error: "Contraseña incorrecta" });

    // Crear token JWT
    const token = jwt.sign(
      {
        id: usuario._id,
        rol: usuario.rol,
      },
      process.env.JWT_SECRET || "claveSecreta",
      { expiresIn: "2h" }
    );

    // 🔹 Buscar detalles según el tipo de usuario
    let perfil;
    if (usuario.rol === "alumno") {
      perfil = await AlumnoModel.findOne({ usuario: usuario._id });
    } else if (usuario.rol === "mentor") {
      perfil = await MentorModel.findOne({ usuario: usuario._id });
    } else if (usuario.rol === "admin") {
      perfil = await AdminModel.findOne({ usuario: usuario._id });
    }

    res.json({
      mensaje: "Inicio de sesión exitoso",
      token,
      usuario: {
        id: usuario._id,
        email: usuario.email,
        rol: usuario.rol,
        perfil,
      },
    });
  } catch (error) {
    console.error("Error al iniciar sesión:", error);
    res.status(500).json({ error: "Error al iniciar sesión" });
  }
};
