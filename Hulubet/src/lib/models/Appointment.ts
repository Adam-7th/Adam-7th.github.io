import mongoose, { Schema, type InferSchemaType } from "mongoose";

const AppointmentSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    service: { type: String, required: true },
    date: { type: String, required: true },
    time: { type: String, required: true },
    duration: { type: String, required: true },
    notes: { type: String },
    status: {
      type: String,
      enum: ["new", "confirmed", "completed", "cancelled"],
      default: "new",
    },
  },
  { timestamps: true },
);

export type Appointment = InferSchemaType<typeof AppointmentSchema>;

export default mongoose.models.Appointment ||
  mongoose.model("Appointment", AppointmentSchema);
