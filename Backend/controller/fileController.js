import File from "../models/file.model.js";
import cloudinary from "../utils/cloudnary.js";

// 🔹 Upload File to Cloudinary & Save to Database
export const uploadFile = async (req, res) => {
  try {
    if (!req.files || !req.files.image || !req.files.pdf) {
      return res.status(400).json({ message: "Image and PDF are required" });
    }

    const { title, description } = req.body;

    // Upload Image to Cloudinary
    const imageUpload = await cloudinary.uploader.upload(req.files.image[0].path, {
      folder: "images",
      resource_type: "image",
    });

    // Upload PDF to Cloudinary
    const pdfUpload = await cloudinary.uploader.upload(req.files.pdf[0].path, {
      folder: "pdfs",
      resource_type: "raw",
      format: "pdf",
    });

    // Save Both Image and PDF URLs to Database
    const newFile = new File({
      title,
      description,
      imagePath: imageUpload.secure_url,
      pdfPath: pdfUpload.secure_url,
    });

    await newFile.save();
    res.status(201).json({ message: "Files uploaded successfully", file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "File upload failed" });
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
export const deleteFileRecord = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) return res.status(404).json({ message: "File not found" });

    // Extract Cloudinary Public ID from URL
    const publicId = file.filePath.split("/").pop().split(".")[0]; // Extract ID from URL

    // Delete file from Cloudinary
    await cloudinary.uploader.destroy(publicId);

    // Remove from database
    await File.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "File deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting file" });
  }
};

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
