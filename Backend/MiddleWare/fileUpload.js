import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "../utils/cloudnary.js";

const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: (req, file) => {
    let folder, resource_type, format;
    
    if (file.fieldname === "image") {
      folder = "images";
      resource_type = "image";
      format = undefined;
    } else if (file.fieldname === "pdf") {
      folder = "pdfs";
      resource_type = "raw";
      format = "pdf";
    }

    return {
      folder: folder,
      resource_type: resource_type,
      format: format,
      public_id: `${Date.now()}_${file.originalname.split('.')[0]}`
    };
  }
});

const upload = multer({ 
  storage,
  limits: { fileSize: 10 * 1024 * 1024 } // 10MB limit
});

export default upload;