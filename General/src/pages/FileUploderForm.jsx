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

  const API_URL = import.meta.env.VITE_API_URL;

  useEffect(() => { fetchFiles(); }, []);

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type.startsWith("image/")) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    } else if (file.type === "application/pdf") {
      setPdfFile(file);
      setPdfPreview(file.name);
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this file?")) return;
    try {
      await axios.delete(`${API_URL}/api/files/${id}`);
      setUploadedFiles(uploadedFiles.filter((file) => file._id !== id));
    } catch (err) {
      alert("Failed to delete file");
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
      setError("File upload failed. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900/50 border border-gray-700 rounded-lg text-white">
      <h2 className="text-2xl font-bold text-white mb-4">Upload File</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" required />
        <textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description (Optional)" className="w-full p-2 bg-gray-800 border border-gray-600 rounded" />
        <input type="file" accept="image/*,application/pdf" onChange={handleFileChange} className="w-full p-2 bg-gray-800 border border-gray-600 rounded" required />
        {imagePreview && <img src={imagePreview} alt="Preview" className="mt-2 w-32 h-32 object-cover rounded" />}
        {pdfPreview && <p className="mt-2 text-gray-400">{pdfPreview}</p>}
        {error && <p className="text-red-500">{error}</p>}
        <button type="submit" className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700" disabled={loading}>{loading ? "Uploading..." : "Upload File"}</button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">Uploaded Files</h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-400">No files uploaded yet.</p>
        ) : (
          <ul className="space-y-2">
            {uploadedFiles.map((file) => (
              <li key={file._id} className="p-4 bg-gray-900/50 rounded-lg border border-gray-700 flex flex-col md:flex-row items-center justify-between gap-4">
                <div className="flex-1">
                  <p className="text-lg font-semibold text-white">{file.title}</p>
                  {file.imagePath && <img src={file.imagePath} alt="Uploaded" className="w-32 h-32 object-cover mt-2" />}
                  {file.pdfPath && <a href={file.pdfPath} target="_blank" rel="noopener noreferrer" className="mt-2 inline-block text-blue-400 hover:underline">View PDF</a>}
                </div>
                <button onClick={() => handleDelete(file._id)} className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600">Delete</button>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileUploadForm;
