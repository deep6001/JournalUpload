import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => {
    fetchFiles();
  }, []);

  // Fetch uploaded files
  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };

  // Handle Image Change
  const handleImageChange = (e) => {
    const selectedImage = e.target.files[0];
    if (selectedImage) {
      setImage(selectedImage);
      setPreview(URL.createObjectURL(selectedImage));
    }
  };

  // Handle PDF Change
  const handlePdfChange = (e) => {
    const selectedPdf = e.target.files[0];
    if (selectedPdf) {
      setPdf(selectedPdf);
    }
  };

  // Delete File Record
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

  // Handle Form Submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title || !image || !pdf) {
      setError("Title, Image, and PDF are required");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("pdf", pdf);

    try {
      await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setImage(null);
      setPdf(null);
      setPreview(null);
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
      <h2 className="text-2xl font-bold text-white mb-4">Upload Image & PDF</h2>

      {/* File Upload Form */}
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

        {/* Image Upload */}
        <div>
          <label className="block text-gray-300">Upload Image</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            required
          />
        </div>

        {/* PDF Upload */}
        <div>
          <label className="block text-gray-300">Upload PDF</label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handlePdfChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            required
          />
        </div>

        {/* Preview Image */}
        {preview && (
          <div className="mt-2">
            <p className="text-gray-300">Image Preview:</p>
            <img
              src={preview}
              alt="Preview"
              className="w-32 h-32 object-cover rounded"
            />
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

      {/* Uploaded Files List */}
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
                {/* File Details */}
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{file.title}</p>

                  {/* Image Preview */}
                  {file.imagePath && (
                    <img
                      src={file.imagePath}
                      alt="Uploaded"
                      className="w-32 h-32 object-cover rounded mt-2"
                    />
                  )}

                  {/* PDF Download */}
                  {file.pdfPath && (
                    <a
                      href={file.pdfPath}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="block text-blue-400 hover:underline mt-2"
                    >
                      View PDF
                    </a>
                  )}
                </div>

                {/* Delete Button */}
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
