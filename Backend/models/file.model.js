import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  filePath: { type: String, required: true },
  fileType: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
