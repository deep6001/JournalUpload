import express from "express";
import upload from "../MiddleWare/fileUpload.js";
import { uploadJournal, getJournals, getJournal, deleteJournal, getCurrentIssue } from "../controller/fileController.js";

const router = express.Router();

router.post("/upload", upload.fields([{ name: "coverImage" }, { name: "pdf" }]), uploadJournal);
router.get("/", getJournals);

router.get("/:id", getJournal);
router.delete("/:id", deleteJournal);
router.get("/current", getCurrentIssue); // Fetch Latest Uploaded File

export default router;




