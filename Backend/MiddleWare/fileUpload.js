import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudnary.js";

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: async (req, file) => {
    const isPDF = file.mimetype === "application/pdf";

    return {
      folder: "uploads", // Folder in Cloudinary
      resource_type: isPDF ? "raw" : "auto", // ✅ Ensures PDFs are treated correctly
      format: isPDF ? "pdf" : undefined, // ✅ Keeps PDF format
    };
  },
});

// Multer Upload Middleware
const upload = multer({ storage });

export default upload;
