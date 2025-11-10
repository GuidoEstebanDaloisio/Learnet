import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import { UsuarioModel } from "../models/Usuario";
import { AdminModel } from "../models/Admin";
import { AlumnoModel } from "../models/Alumno";
import { MentorModel } from "../models/Mentor";
import { env } from "../config/env";

const seedDB = async () => {
  try {
    await mongoose.connect(`${env.mongoUri}/learnet`);
    console.log("✅ Conectado a MongoDB para seed");

    // Limpiar colecciones
    await UsuarioModel.deleteMany({});
    await MentorModel.deleteMany({});
    await AlumnoModel.deleteMany({});
    await AdminModel.deleteMany({});

    const contraseñaHash = await bcrypt.hash("123", 10);

    // ---------- USUARIOS ----------
    const usuarios = await UsuarioModel.insertMany([
      { email: "admin1@learnet.com", contraseña: contraseñaHash, rol: "admin" },
      { email: "admin2@learnet.com", contraseña: contraseñaHash, rol: "admin" },
      { email: "alumno1@learnet.com", contraseña: contraseñaHash, rol: "alumno" },
      { email: "alumno2@learnet.com", contraseña: contraseñaHash, rol: "alumno" },
      { email: "alumno3@learnet.com", contraseña: contraseñaHash, rol: "alumno" },
      { email: "mentor1@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
      { email: "mentor2@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
      { email: "mentor3@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
      { email: "mentor4@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
      { email: "mentor5@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
      { email: "mentor6@learnet.com", contraseña: contraseñaHash, rol: "mentor" },
    ]);

    // ---------- ADMINS ----------
    const admins = await AdminModel.insertMany([
      {
        usuario: usuarios[0]._id,
        nombre: "Sofía",
        apellido: "Pérez",
        fechaNacimiento: new Date("1990-01-15"),
      },
      {
        usuario: usuarios[1]._id,
        nombre: "Carlos",
        apellido: "Ruiz",
        fechaNacimiento: new Date("1988-06-05"),
      },
    ]);

    // ---------- ALUMNOS ----------
    const alumnos = await AlumnoModel.insertMany([
      {
        usuario: usuarios[2]._id,
        nombre: "Martín",
        apellido: "Gómez",
        fechaNacimiento: new Date("2001-09-12"),
        nivelEducativo: "Universitario",
      },
      {
        usuario: usuarios[3]._id,
        nombre: "Camila",
        apellido: "López",
        fechaNacimiento: new Date("2002-03-25"),
        nivelEducativo: "Secundario",
      },
      {
        usuario: usuarios[4]._id,
        nombre: "Tomás",
        apellido: "Fernández",
        fechaNacimiento: new Date("2000-11-08"),
        nivelEducativo: "Terciario",
      },
    ]);

     // ---------- MENTORES ----------
    const mentores = await MentorModel.insertMany([
      {
        usuario: usuarios[5]._id,
        nombre: "Laura",
        apellido: "Díaz",
        fechaNacimiento: new Date("1985-03-22"),
        titulo: "Ingeniera en Sistemas",
        presentacion: "Apasionada por la tecnología y la enseñanza.",
        biografia: "Más de 10 años de experiencia en desarrollo web y liderazgo técnico.",
        habilidadesClave: ["JavaScript", "React", "Node.js", "MongoDB"],
        experiencia: "Mentora en proyectos de software educativo.",
        precioPorClase: 15000,
        tiempoRespuesta: 2,
        estaDisponible: true,
        fechaRegistro: new Date("2021-03-12"),
      },
      {
        usuario: usuarios[6]._id,
        nombre: "Fernando",
        apellido: "Alvarez",
        fechaNacimiento: new Date("1980-07-10"),
        titulo: "Analista de Datos",
        presentacion: "Amo enseñar sobre análisis y visualización de datos.",
        biografia: "Data scientist con 8 años de experiencia en BI y Python.",
        habilidadesClave: ["Python", "Pandas", "Power BI", "SQL"],
        experiencia: "Ha dictado talleres en empresas y universidades.",
        precioPorClase: 13000,
        tiempoRespuesta: 4,
        estaDisponible: true,
        fechaRegistro: new Date("2022-01-05"),
      },
      {
        usuario: usuarios[7]._id,
        nombre: "Valeria",
        apellido: "Rodríguez",
        fechaNacimiento: new Date("1992-09-18"),
        titulo: "Diseñadora UX/UI",
        presentacion: "Me encanta guiar a otros en el mundo del diseño centrado en el usuario.",
        biografia: "Trabajé en startups y grandes empresas en proyectos de diseño digital.",
        habilidadesClave: ["Figma", "UX Research", "Prototipado"],
        experiencia: "Mentora en comunidades de diseño latinoamericanas.",
        precioPorClase: 12000,
        tiempoRespuesta: 3,
        estaDisponible: true,
        fechaRegistro: new Date("2023-06-10"),
      },
      {
        usuario: usuarios[8]._id,
        nombre: "Nicolás",
        apellido: "Torres",
        fechaNacimiento: new Date("1990-02-01"),
        titulo: "Desarrollador Full Stack",
        presentacion: "Programar es crear, y enseñar es compartir ese poder.",
        biografia: "Experiencia en React, Node.js y arquitectura de microservicios.",
        habilidadesClave: ["React", "Node.js", "Docker"],
        experiencia: "Ha liderado equipos en empresas tecnológicas.",
        precioPorClase: 16000,
        tiempoRespuesta: 5,
        estaDisponible: false,
        fechaRegistro: new Date("2020-11-20"),
      },
      {
        usuario: usuarios[9]._id,
        nombre: "Lucía",
        apellido: "Martínez",
        fechaNacimiento: new Date("1987-05-17"),
        titulo: "Project Manager",
        presentacion: "Me especializo en metodologías ágiles.",
        biografia: "Más de 12 años gestionando equipos interdisciplinarios.",
        habilidadesClave: ["Scrum", "Kanban", "Liderazgo"],
        experiencia: "Ha mentoreado equipos de desarrollo en Latinoamérica.",
        precioPorClase: 14000,
        tiempoRespuesta: 6,
        estaDisponible: false,
        fechaRegistro: new Date("2019-08-02"),
      },
      {
        usuario: usuarios[10]._id,
        nombre: "Javier",
        apellido: "Pereyra",
        fechaNacimiento: new Date("1995-12-30"),
        titulo: "Ingeniero Electrónico",
        presentacion: "Combino electrónica y software en proyectos innovadores.",
        biografia: "Experiencia en IoT, robótica y sistemas embebidos.",
        habilidadesClave: ["C++", "Arduino", "IoT"],
        experiencia: "Mentor en programas de innovación tecnológica.",
        precioPorClase: 15500,
        tiempoRespuesta: 2,
        estaDisponible: false,
        fechaRegistro: new Date("2024-02-14"),
      },
    ]);

    console.log("✅ Seed completado con éxito!");
    console.table({
      admins: admins.length,
      alumnos: alumnos.length,
      mentores: mentores.length,
    });

  } catch (error) {
    console.error("❌ Error al ejecutar el seed:", error);
  } finally {
    await mongoose.disconnect();
    console.log("🔌 Desconectado de MongoDB");
  }
};

seedDB();
