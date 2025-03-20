import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imagePath: { type: String, required: true }, // Image URL
  pdfPath: { type: String, required: true }, // PDF URL
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);
