import mongoose, { Schema, Document } from "mongoose";

export interface IUsuario extends Document {
  email: string;
  contraseña: string;
  rol: "admin" | "alumno" | "mentor";
}

const UsuarioSchema = new Schema<IUsuario>({
  email: { type: String, required: true, unique: true },
  contraseña: { type: String, required: true },
  rol: { type: String, enum: ["admin", "alumno", "mentor"], required: true },
});

export const UsuarioModel = mongoose.model<IUsuario>("Usuario", UsuarioSchema);
