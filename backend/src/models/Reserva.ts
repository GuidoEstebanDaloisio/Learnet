import mongoose, { Schema, Document } from "mongoose";

export interface IReserva extends Document {
  alumno: mongoose.Types.ObjectId;
  mentor: mongoose.Types.ObjectId;
  habilidad: string;
  mensaje?: string;
  estado: "pendiente" | "aceptada" | "rechazada";
  fechaSolicitud: Date;
}

const ReservaSchema = new Schema<IReserva>({
  alumno: { type: Schema.Types.ObjectId, ref: "Alumno", required: true },
  mentor: { type: Schema.Types.ObjectId, ref: "Mentor", required: true },
  habilidad: { type: String, required: true },
  mensaje: { type: String },
  estado: {type: String,enum: ["pendiente", "aceptada", "rechazada"], default: "pendiente"},
  fechaSolicitud: { type: Date, default: Date.now }
});

export const ReservaModel = mongoose.model<IReserva>("Reserva", ReservaSchema);
