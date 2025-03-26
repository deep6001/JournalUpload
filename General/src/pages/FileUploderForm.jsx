import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [imagePreview, setImagePreview] = useState(null);
  const [pdfName, setPdfName] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };

  const handleImageChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setImageFile(selectedFile);
      setImagePreview(URL.createObjectURL(selectedFile));
      setPdfFile(null);
      setPdfName("");
    }
  };

  const handlePdfChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setPdfFile(selectedFile);
      setPdfName(selectedFile.name);
      setImageFile(null);
      setImagePreview(null);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;

    try {
      await axios.delete(`${API_URL}/api/files/${id}`, {
        withCredentials: true,
      });
      setUploadedFiles(uploadedFiles.filter((file) => file._id !== id));
    } catch (err) {
      alert("Failed to delete file");
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!imageFile && !pdfFile)) {
      setError("Title and at least one file are required");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);

    try {
      await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPdfFile(null);
      setImagePreview(null);
      setPdfName("");
      fetchFiles();
    } catch (err) {
      setError("File upload failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-white">
      <h2 className="text-2xl font-bold text-white mb-4">Upload Files</h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-gray-300">Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            required
          />
        </div>

        <div>
          <label className="block text-gray-300">Description (Optional)</label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300">Upload Image (optional)</label>
          <input
            type="file"
            onChange={handleImageChange}
            accept="image/*"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        <div>
          <label className="block text-gray-300">Upload PDF (optional)</label>
          <input
            type="file"
            onChange={handlePdfChange}
            accept="application/pdf"
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          />
        </div>

        {imagePreview && (
          <div className="mt-2">
            <p className="text-gray-300">Image Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
          </div>
        )}

        {pdfName && (
          <div className="mt-2">
            <p className="text-gray-300">PDF Selected:</p>
            <p className="text-gray-400">{pdfName}</p>
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload Files"}
        </button>
      </form>

      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">
          Uploaded Files
        </h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-400">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {uploadedFiles.map((file) => (
              <li
                key={file._id}
                className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4"
              >
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">
                    {file.title}
                  </p>
                  {file.filePath.endsWith(".pdf") ? (
                    <div className="mt-2">
                      <a
                        href={file.filePath}
                        className="text-blue-400 hover:text-blue-300"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        View PDF ↗
                      </a>
                    </div>
                  ) : (
                    <img
                      src={file.filePath}
                      alt="Uploaded content"
                      className="w-32 h-32 object-cover mt-2 rounded"
                    />
                  )}
                </div>

                <button
                  onClick={() => handleDelete(file._id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;