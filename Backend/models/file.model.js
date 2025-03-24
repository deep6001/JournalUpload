// models/file.model.js
import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: String,
  description: String,
  imagePath: String,
  pdfPath: String,
  imagePublicId: String, // Public ID for image
  pdfPublicId: String,   // Public ID for PDF
  uploadedAt: { type: Date, default: Date.now }
});

const File = mongoose.model("File", fileSchema);

export default File;