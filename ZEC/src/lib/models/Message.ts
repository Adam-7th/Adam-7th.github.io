import mongoose, { Schema, type InferSchemaType } from "mongoose";

const MessageSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true },
    subject: { type: String },
    message: { type: String, required: true },
    status: { type: String, enum: ["new", "read"], default: "new" },
  },
  { timestamps: true },
);

export type Message = InferSchemaType<typeof MessageSchema>;

export default mongoose.models.Message || mongoose.model("Message", MessageSchema);
