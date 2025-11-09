// .env
import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import authRoutes from "./routes/authRoutes";
import mentorRoutes from "./routes/mentorRoutes";
import usuarioRoutes from "./routes/usuarioRoutes";
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

export default app;







