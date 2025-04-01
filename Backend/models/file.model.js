import mongoose from "mongoose";

const JournalSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  coverImage: { type: String, required: true },
  pdf: { type: String, required: true },
  uploadDate: { type: Date, default: Date.now },
});

const Journal = mongoose.model("Journal", JournalSchema);
export default Journal;