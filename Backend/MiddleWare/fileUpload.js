// MiddleWare/fileUpload.js
import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudnary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    const isPDF = file.mimetype === "application/pdf";
    return {
      folder: isPDF ? "pdfs" : "images",
      resource_type: isPDF ? "raw" : "image",
      format: isPDF ? "pdf" : undefined,
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`
    };
  }
});

const fileFilter = (req, file, cb) => {
  if (file.fieldname === "image" && !file.mimetype.startsWith("image/")) {
    return cb(new Error("Only image files are allowed!"), false);
  }
  if (file.fieldname === "pdf" && file.mimetype !== "application/pdf") {
    return cb(new Error("Only PDF files are allowed!"), false);
  }
  cb(null, true);
};

const upload = multer({ 
  storage, 
  fileFilter,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export default upload;