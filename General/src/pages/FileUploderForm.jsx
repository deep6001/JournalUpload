import React, { useState, useEffect } from "react";
import axios from "axios";

const FileUploadForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [file, setFile] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [preview, setPreview] = useState(null);

  // Fetch uploaded files
  useEffect(() => {
    fetchFiles();
  }, []);

  const API_URL= import.meta.env.VITE_API_URL;

  const fetchFiles = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setUploadedFiles(res.data);
    } catch (err) {
      console.error("Error fetching files", err);
    }
  };

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setPreview(URL.createObjectURL(selectedFile));
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
    if (!title || !file) {
      setError("Title and File are required");
      return;
    }

    setLoading(true);
    setError("");

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("file", file);

    try {
      await axios.post(`${API_URL}/api/files/upload`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      setTitle("");
      setDescription("");
      setFile(null);
      setPreview(null);
      fetchFiles(); // Refresh file list
    } catch (err) {
      setError("File upload failed. Try again.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-lg text-white ">
      <h2 className="text-2xl font-bold text-white mb-4">Upload File</h2>

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

        <div>
          <label className="block text-gray-300">Upload Image</label>
          <input
            type="file"
            onChange={handleFileChange}
            className="w-full p-2 rounded bg-gray-800 border border-gray-600 text-white"
            required
          />
        </div>
        

        {preview && (
          <div className="mt-2">
            <p className="text-gray-300">Preview:</p>
            {file.type.startsWith("image") ? (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded"
              />
            ) : (
              <p className="text-gray-400">{file.name}</p>
            )}
          </div>
        )}

        {error && <p className="text-red-500">{error}</p>}

        <button
          type="submit"
          className="w-full py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? "Uploading..." : "Upload File"}
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
                  <p className="text-lg font-semibold text-white">
                    {file.title}
                  </p>
                 

                  {/* View File Button */}
                  <img src={file.filePath} alt="image"  className="w-32 h-32 object-cover"/>
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
