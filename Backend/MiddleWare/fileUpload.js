import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudnary.js";

// Cloudinary Storage Setup for Images
const imageStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "images",
    resource_type: "image",
  },
});

// Cloudinary Storage Setup for PDFs
const pdfStorage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: "pdfs",
    resource_type: "raw",
    format: "pdf",
  },
});

// Multer Upload Middleware
const upload = multer({
  storage: multer.diskStorage({}), // Temporary disk storage
});

export const imageUpload = multer({ storage: imageStorage }).single("image");
export const pdfUpload = multer({ storage: pdfStorage }).single("pdf");
