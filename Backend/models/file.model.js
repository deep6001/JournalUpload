import mongoose from "mongoose";

const fileSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  imagePath: { type: String ,required:true},
  pdfPath: { type: String ,required:true},
  imagePublicId: { type: String ,required:true},
  pdfPublicId: { type: String ,required:true},
  uploadedAt: { type: Date, default: Date.now },
});

export default mongoose.model("File", fileSchema);