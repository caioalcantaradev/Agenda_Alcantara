import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  passwordHash: string;
  roles: string[];
  mustChangePassword: boolean;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    roles: { type: [String], default: [] },
    mustChangePassword: { type: Boolean, default: true },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Evita recompilar o modelo se já existe
export const User =
  mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
