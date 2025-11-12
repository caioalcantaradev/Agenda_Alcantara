import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document {
  summary: string;
  description?: string;
  startDateTime: Date;
  endDateTime: Date;
  ownerId: Types.ObjectId | null;
}

const EventSchema = new Schema<IEvent>(
  {
    summary: { type: String, required: true },
    description: { type: String },
    startDateTime: { type: Date, required: true, index: true },
    endDateTime: { type: Date, required: true, index: true },
    ownerId: { type: Schema.Types.ObjectId, ref: "User", default: null, index: true },
  },
  {
    timestamps: true, // Adiciona createdAt e updatedAt automaticamente
  }
);

// Índice composto para consultas por período e usuário
EventSchema.index({ startDateTime: 1, endDateTime: 1 });
EventSchema.index({ ownerId: 1, startDateTime: 1 });

export const Event = mongoose.model<IEvent>("Event", EventSchema);

