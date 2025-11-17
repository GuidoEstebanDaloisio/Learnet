import mongoose, { Schema, Document } from "mongoose";

export interface IMentoriaAsignada extends Document {
  reserva: mongoose.Types.ObjectId; 
  mentoria: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  alumno: mongoose.Types.ObjectId;
  fechaHora: Date;
  linkMeet: string;
  estado: "pendiente" | "finalizada" | "cancelada";
}

const MentoriaAsignadaSchema = new Schema<IMentoriaAsignada>({
  reserva: { type: Schema.Types.ObjectId, ref: "Reserva", required: true },
  mentoria: { type: Schema.Types.ObjectId, ref: "Mentoria", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
  alumno: { type: Schema.Types.ObjectId, ref: "Alumno", required: true },

  fechaHora: { type: Date, required: true },
  linkMeet: { type: String, required: true },

  estado: { type: String, enum: ["pendiente", "finalizada", "cancelada"], default: "pendiente" }
});

export const MentoriaAsignadaModel =
  mongoose.model<IMentoriaAsignada>("MentoriaAsignada", MentoriaAsignadaSchema);
