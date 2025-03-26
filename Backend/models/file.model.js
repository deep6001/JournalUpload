import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imagePath: { type: String },
  pdfPath: { type: String },
  imagePublicId: { type: String },
  pdfPublicId: { type: String },
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);