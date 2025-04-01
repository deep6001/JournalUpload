import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudnary.js";

// Cloudinary Storage Setup
const storage = new CloudinaryStorage({
  cloudinary,
  params: async (req, file) => ({
    folder: "journals",
    format: file.mimetype.split("/")[1], // Keep original format
    resource_type: file.mimetype.startsWith("image") ? "image" : "raw",
  }),
});

const upload = multer({ storage });

export default upload;
