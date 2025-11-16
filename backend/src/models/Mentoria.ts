import mongoose, { Schema, Document } from "mongoose";

export interface IMentoria extends Document {
  mentor: mongoose.Types.ObjectId;
  titulo: string;
  tema: string;
  descripcion: string; // ← ahora sí
}

const MentoriaSchema = new Schema<IMentoria>({
  mentor: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
  titulo: { type: String, required: true },
  tema: { type: String, required: true },
  descripcion: { type: String, required: true }, // ← renombrado
});

export const MentoriaModel = mongoose.model<IMentoria>("Mentoria", MentoriaSchema);