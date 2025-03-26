import express from "express";
import upload from "../MiddleWare/fileUpload.js";
import { uploadFile, getFiles, getFile, deleteFileRecord, getCurrentIssue } from "../controller/fileController.js";

const router = express.Router();

router.post(
    "/upload",
    upload.fields([
      { name: "image", maxCount: 1 },
      { name: "pdf", maxCount: 1 }
    ]),
    uploadFile
  );
router.get("/", getFiles);
router.get("/:id", getFile);
router.delete("/:id", deleteFileRecord);
router.get("/current", getCurrentIssue); // Fetch Latest Uploaded File

export default router;




