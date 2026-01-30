import mongoose, { Schema, type InferSchemaType } from "mongoose";

const UserSchema = new Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, lowercase: true },
    passwordHash: { type: String, required: true },
    role: { type: String, enum: ["client", "team", "admin"], default: "client" },
    locale: { type: String, enum: ["en", "ru", "ar"], default: "en" },
  },
  { timestamps: true },
);

export type User = InferSchemaType<typeof UserSchema>;

export default mongoose.models.User || mongoose.model("User", UserSchema);
