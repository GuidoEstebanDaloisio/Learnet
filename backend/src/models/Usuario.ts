// src/models/Usuario.ts
import { Schema, model, Document } from "mongoose";
import bcrypt from "bcrypt";

export type TRol = "mentor" | "alumno" | "admin";

export interface IUsuario extends Document {
  nombre: string;
  email: string;
  password: string; // hashed
  rol: TRol;
  fechaRegistro: Date;
  compararPassword(passwordPlain: string): Promise<boolean>;
}

const UsuarioSchema = new Schema<IUsuario>({
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true, lowercase: true, trim: true },
  password: { type: String, required: true },
  rol: { type: String, enum: ["mentor", "alumno", "admin"], default: "alumno" },
  fechaRegistro: { type: Date, default: () => new Date() },
});

// Hash de la contraseña antes de guardar (solo si fue modificada)
UsuarioSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    return next();
  } catch (err) {
    return next(err as any);
  }
});

// Método para comparar password (instancia)
UsuarioSchema.methods.compararPassword = async function (passwordPlain: string) {
  return bcrypt.compare(passwordPlain, this.password);
};

export const UsuarioModel = model<IUsuario>("Usuario", UsuarioSchema);
