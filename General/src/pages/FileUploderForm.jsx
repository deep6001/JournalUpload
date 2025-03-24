// React Component
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
  const [pdfPreview, setPdfPreview] = useState(null);

  useEffect(() => { fetchFiles(); }, []);

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
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handlePdfChange = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setPdfFile(file);
      setPdfPreview(file.name);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure?")) return;
    try {
      await axios.delete(`${API_URL}/api/files/${id}`);
      setUploadedFiles(uploadedFiles.filter(file => file._id !== id));
    } catch (err) {
      alert("Deletion failed");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || (!imageFile && !pdfFile)) {
      setError("Title and at least one file required");
      return;
    }

    setLoading(true);
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    if (imageFile) formData.append("image", imageFile);
    if (pdfFile) formData.append("pdf", pdfFile);

    try {
      await axios.post(`${API_URL}/api/files/upload`, formData);
      setTitle("");
      setDescription("");
      setImageFile(null);
      setPdfFile(null);
      setImagePreview(null);
      setPdfPreview(null);
      fetchFiles();
    } catch (err) {
      setError(err.response?.data?.message || "Upload failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900/50 border border-gray-700 rounded-lg">
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Title and Description Inputs (same as before) */}

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300">Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
          {imagePreview && (
            <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover" />
          )}
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-gray-300">PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600"
          />
          {pdfPreview && <p className="mt-2 text-gray-400">{pdfPreview}</p>}
        </div>

        {/* Error and Submit Button (same as before) */}
      </form>

      {/* Display Uploaded Files */}
      <div className="mt-6">
        {uploadedFiles.map(file => (
          <div key={file._id} className="p-4 bg-gray-800 rounded-lg mt-4">
            <h3 className="text-xl text-white">{file.title}</h3>
            {file.imagePath && (
              <img src={file.imagePath} alt={file.title} className="w-32 h-32 mt-2" />
            )}
            {file.pdfPath && (
              <a
                href={file.pdfPath}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-2 inline-block text-blue-400 hover:underline"
              >
                View PDF
              </a>
            )}
            <button
              onClick={() => handleDelete(file._id)}
              className="mt-2 bg-red-500 text-white px-4 py-2 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default FileUploadForm;