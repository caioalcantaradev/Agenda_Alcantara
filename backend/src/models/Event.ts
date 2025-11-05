import mongoose, { Schema, Document, Types } from "mongoose";

export interface IEvent extends Document {
  summary: string;
  description?: string;
  startDateTime: Date;
  endDateTime: Date;
  ownerId: Types.ObjectId | null;
}

const EventSchema = new Schema<IEvent>({
  summary: { type: String, required: true },
  description: { type: String },
  startDateTime: { type: Date, required: true },
  endDateTime: { type: Date, required: true },
  ownerId: { type: Schema.Types.ObjectId, ref: "User", default: null },
});

export const Event = mongoose.model<IEvent>("Event", EventSchema);

