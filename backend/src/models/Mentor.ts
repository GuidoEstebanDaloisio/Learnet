import mongoose, { Schema, Document } from "mongoose";

export interface IMentor extends Document {
  usuario: mongoose.Types.ObjectId;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
  titulo: string;
  presentacion: string;
  biografia: string;
  habilidadesClave: string[];
  experiencia: string;
  precioPorClase: number;
  tiempoRespuesta: string;
}

const MentorSchema = new Schema<IMentor>({
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
  titulo: { type: String, required: true },
  presentacion: { type: String, required: true },
  biografia: { type: String, required: true },
  habilidadesClave: [{ type: String }],
  experiencia: { type: String, required: true },
  precioPorClase: { type: Number, required: true },
  tiempoRespuesta: { type: String, required: true },
});

export const MentorModel = mongoose.model<IMentor>("Mentor", MentorSchema);
