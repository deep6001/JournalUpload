import React, { useState, useEffect } from "react";
import axios from "axios";
import { FileImage, FileText } from "lucide-react";
import { toast } from "react-toastify";

const FileUploadForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    coverImage: null,
    pdf: null,
  });
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    fetchFiles();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`, {
        withCredentials: true,
      });
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleFileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.files[0] });
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
    if (!formData.title || !formData.coverImage || !formData.pdf) {
      setError("Title, Cover Image, and PDF are required");
      return;
    }

    setLoading(true);
    setError("");

    const data = new FormData();
    data.append("title", formData.title);
    data.append("description", formData.description);
    data.append("coverImage", formData.coverImage);
    data.append("pdf", formData.pdf);

    try {
      await axios.post(`${API_URL}/api/files/upload`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast.success("File uploaded successfully!");
      setFormData({ title: "", description: "", coverImage: null, pdf: null });
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
      <h2 className="text-2xl font-bold text-white mb-4">Upload Journal</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          placeholder="Title"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          onChange={handleChange}
          required
        />
        <textarea
          name="description"
          placeholder="Description"
          className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
          onChange={handleChange}
        />
        <input
          type="file"
          name="coverImage"
          accept="image/*"
          className="hidden"
          id="coverImage"
          onChange={handleFileChange}
          required
        />

        <label
          htmlFor="coverImage"
          className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white cursor-pointer hover:bg-gray-700 transition"
        >
          <FileImage className="w-5 h-5 text-blue-400" />
          <span>Upload Cover Image</span>
        </label>
        {
          formData.coverImage && (
            <p className="text-gray-400">{formData.coverImage.name}</p>
          )
        }
        

        <input
          type="file"
          name="pdf"
          accept="application/pdf"
          className="hidden"
          id="pdfFile"
          onChange={handleFileChange}
          required
        />
        <label
          htmlFor="pdfFile"
          className="flex items-center gap-2 w-full p-3 rounded-lg bg-gray-800 border border-gray-600 text-white cursor-pointer hover:bg-gray-700 transition"
        >
          <FileText className="w-5 h-5 text-green-400" />
          <span>Upload PDF</span>
        </label>
        {
          formData.pdf && (
            <p className="text-gray-400">{formData.pdf.name}</p>
          )
        }
        
        {error && <p className="text-red-500">{error}</p>}
        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload"}
        </button>
      </form>
      <div className="mt-6">
        <h3 className="text-xl font-semibold text-blue-400 mb-3">
          Uploaded Journals
        </h3>
        {uploadedFiles.length === 0 ? (
          <p className="text-gray-400">No journals uploaded yet.</p>
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
                  <img
                    src={file.coverImage}
                    alt="Cover"
                    className="w-32 h-32 object-cover"
                  />
                </div>
                <a
                  href={file.pdf}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline"
                >
                  View PDF
                </a>
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
