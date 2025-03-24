import File from "../models/file.model.js";
import cloudinary from "../utils/cloudnary.js";

// 🔹 Upload File to Cloudinary & Save to Database
export const uploadFile = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageFile = req.files?.image?.[0];
    const pdfFile = req.files?.pdf?.[0];

    if (!imageFile && !pdfFile) {
      return res.status(400).json({ message: "No files uploaded" });
    }

    const newFile = new File({
      title,
      description,
      imagePath: imageFile?.path || null,
      pdfPath: pdfFile?.path || null,
      imagePublicId: imageFile?.filename || null,
      pdfPublicId: pdfFile?.filename || null
    });

    await newFile.save();
    res.status(201).json({ message: "Files uploaded successfully", file: newFile });
  } catch (error) {
    res.status(500).json({ message: "Upload failed", error: error.message });
  }
};

// 🔹 Delete File (Handles both image and PDF)
export const deleteFileRecord = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Delete image from Cloudinary
    if (file.imagePublicId) {
      await cloudinary.uploader.destroy(file.imagePublicId, { resource_type: "image" });
    }

    // Delete PDF from Cloudinary
    if (file.pdfPublicId) {
      await cloudinary.uploader.destroy(file.pdfPublicId, { resource_type: "raw" });
    }

    await File.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Deletion failed", error: error.message });
  }
};

// 🔹 Fetch All Uploaded Files
export const getFiles = async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve files" });
  }
};

// 🔹 Fetch a Single File by ID
export const getFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    res.status(200).json(file);
  } catch (error) {
    res.status(500).json({ message: "Error fetching file" });
  }
};

// 🔹 Delete a File from Cloudinary & Database
// export const deleteFileRecord = async (req, res) => {
//   try {
//     const file = await File.findById(req.params.id);
//     if (!file) return res.status(404).json({ message: "File not found" });

//     // Extract Cloudinary Public ID from URL
//     const publicId = file.filePath.split("/").pop().split(".")[0]; // Extract ID from URL

//     // Delete file from Cloudinary
//     await cloudinary.uploader.destroy(publicId);

//     // Remove from database
//     await File.findByIdAndDelete(req.params.id);

//     res.status(200).json({ message: "File deleted successfully" });
//   } catch (error) {
//     res.status(500).json({ message: "Error deleting file" });
//   }
// };

// 🔹 Fetch the Latest Uploaded File (Current Issue)
export const getCurrentIssue = async (req, res) => {
  try {
    const latestFile = await File.findOne().sort({ uploadedAt: -1 });
    if (!latestFile) return res.status(404).json({ message: "No uploaded file found" });

    res.status(200).json(latestFile);
  } catch (error) {
    res.status(500).json({ message: "Error fetching current issue", error });
  }
};
