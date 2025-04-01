import Journal from "../models/file.model.js";
import cloudinary from "../utils/cloudnary.js";

// 🔹 Upload Journal with Cover Image & PDF to Cloudinary & Save to Database
export const uploadJournal = async (req, res) => {
  try {
    if (!req.files || !req.files.coverImage || !req.files.pdf) {
      return res.status(400).json({ message: "Cover image and PDF are required" });
    }

    const { title, description } = req.body;
    const coverImage = req.files.coverImage[0].path; // Cloudinary URL
    const pdf = req.files.pdf[0].path; // Cloudinary URL

    const newJournal = new Journal({
      title,
      description,
      coverImage,
      pdf,
    });
    await newJournal.save();

    res.status(201).json({ message: "Journal uploaded successfully!", journal: newJournal });
  } catch (error) {
    res.status(500).json({ message: "Journal upload failed", error: error.message });
  }
};

// 🔹 Fetch All Journals
export const getJournals = async (req, res) => {
  try {
    const journals = await Journal.find().sort({ uploadDate: -1 });
    res.status(200).json(journals);
  } catch (error) {
    res.status(500).json({ message: "Failed to retrieve journals", error: error.message });
  }
};

// 🔹 Fetch a Single Journal by ID
export const getJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: "Journal not found" });
    
    res.status(200).json(journal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching journal", error: error.message });
  }
};

// 🔹 Delete a Journal from Cloudinary & Database
export const deleteJournal = async (req, res) => {
  try {
    const journal = await Journal.findById(req.params.id);
    if (!journal) return res.status(404).json({ message: "Journal not found" });

    // Extract Cloudinary Public IDs from URLs
    const coverImageId = journal.coverImage.split("/").pop().split(".")[0];
    const pdfId = journal.pdf.split("/").pop().split(".")[0];

    // Delete files from Cloudinary
    await cloudinary.uploader.destroy(coverImageId);
    await cloudinary.uploader.destroy(pdfId, { resource_type: "raw" });

    // Remove from database
    await Journal.findByIdAndDelete(req.params.id);

    res.status(200).json({ message: "Journal deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting journal", error: error.message });
  }
};

// 🔹 Fetch the Latest Uploaded Journal (Current Issue)
export const getCurrentIssue = async (req, res) => {
  try {
    const latestJournal = await Journal.findOne().sort({ uploadDate: -1 });
    if (!latestJournal) return res.status(404).json({ message: "No uploaded journal found" });
    
    res.status(200).json(latestJournal);
  } catch (error) {
    res.status(500).json({ message: "Error fetching current issue", error: error.message });
  }
};
