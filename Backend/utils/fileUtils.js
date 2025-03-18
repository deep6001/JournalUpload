import fs from "fs";

// Delete file if an error occurs
export const deleteFile = (filePath) => {
  fs.unlink(filePath, (err) => {
    if (err) console.error("Failed to delete file:", err);
  });
};
