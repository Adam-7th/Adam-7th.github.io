import mongoose, { Schema, type InferSchemaType } from "mongoose";

const ProjectSchema = new Schema(
  {
    name: { type: String, required: true },
    company: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String },
    budget: { type: String },
    timeline: { type: String },
    needs: { type: [String], default: [] },
    details: { type: String },
    status: {
      type: String,
      enum: ["new", "review", "in-progress", "done"],
      default: "new",
    },
    fileUrls: { type: [String], default: [] },
  },
  { timestamps: true },
);

export type Project = InferSchemaType<typeof ProjectSchema>;

export default mongoose.models.Project || mongoose.model("Project", ProjectSchema);
