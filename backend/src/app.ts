// .env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import alumnoRoutes from "./routes/alumnoRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
import mentoriaRoutes from "./routes/mentoriaRoutes";
import mentoriaAsignadaRoutes from "./routes/mentoriaAsignadaRoutes";
import reservaRoutes from "./routes/reservaRoutes";
import { requestLogger } from "./middlewares/requestLogger";


const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(requestLogger);


// Rutas
app.use("/auth", authRoutes);
app.use("/usuarios", usuarioRoutes);
app.use("/mentores", mentorRoutes);
app.use("/alumnos", alumnoRoutes);
app.use("/mentoria", mentoriaRoutes);
app.use("/mentoria-asignada", mentoriaAsignadaRoutes);
app.use("/reservas", reservaRoutes); 

export default app;








