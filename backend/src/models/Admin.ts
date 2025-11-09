import mongoose, { Schema, Document } from "mongoose";

export interface IAdmin extends Document {
  usuario: mongoose.Types.ObjectId;
  nombre: string;
  apellido: string;
  fechaNacimiento: Date;
}

const AdminSchema = new Schema<IAdmin>({
  usuario: { type: Schema.Types.ObjectId, ref: "Usuario", required: true },
  nombre: { type: String, required: true },
  apellido: { type: String, required: true },
  fechaNacimiento: { type: Date, required: true },
});

export const AdminModel = mongoose.model<IAdmin>("Admin", AdminSchema);

