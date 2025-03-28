import React, { useEffect, useState } from "react";
import axios from "axios";
import { Document, Page, pdfjs } from "react-pdf";
import Noimage from "../assets/image.png";

// Load worker for PDF rendering
pdfjs.GlobalWorkerOptions.workerSrc =
  "https://cdnjs.cloudflare.com/ajax/libs/pdf.js/4.8.69/pdf.worker.min.mjs";
const Home = () => {
  const [currentIssue, setCurrentIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const [numPages, setNumPages] = useState(null);

  // PDF load success handler
  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  useEffect(() => {
    const scrollElement = document.scrollingElement || document.documentElement;
    scrollElement.scrollTo({ top: 0, behavior: "smooth" });

    fetchCurrentIssue();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  // 🔹 Fetch Current Issue from Backend
  const fetchCurrentIssue = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setCurrentIssue(res.data);
    } catch (err) {
      setError("Failed to load the current issue.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Journal of Academic Research
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed">
          Welcome to the Journal of Academic Research, a peer-reviewed
          publication dedicated to advancing knowledge across multiple
          disciplines. Our journal publishes original research, reviews, and
          scholarly articles that contribute to the academic community.
        </p>
      </div>

      {/* Current Issue */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
        {loading ? (
          <p className="text-gray-300">Loading current issue...</p>
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : currentIssue ? (
          <>
            {currentIssue.map((issue) => (
              <div
                key={issue._id}
                className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 mb-6"
              >
                {/* PDF First Page Preview or Dummy Image */}
                {issue.fileType === "application/pdf" ? (
                  <div className="w-full md:w-1/3 h-48 overflow-hidden border border-white/10 mb-4 md:mb-0">
                    <Document
                      file={issue.filePath}
                      onLoadSuccess={onDocumentLoadSuccess}
                      onLoadError={(error) =>
                        console.error("PDF Load Error:", error)
                      }
                      loading={<div className="text-white">Loading PDF...</div>}
                      error={
                        <div className="text-red-500">Failed to load PDF</div>
                      }
                    >
                      <Page
                        pageNumber={1}
                        width={200}
                        renderTextLayer={false}
                        renderAnnotationLayer={false}
                        loading={
                          <div className="text-white">Loading page...</div>
                        }
                      />
                    </Document>
                  </div>
                ) : /* ... rest of the image handling */
                issue.fileType.startsWith("image/") ? (
                  <img
                    src={issue.filePath}
                    alt="Current Issue"
                    className="w-full md:w-1/3 h-48 object-cover rounded-lg border border-white/10 mb-4 md:mb-0"
                  />
                ) : (
                  <img
                    src={Noimage} // ✅ Dummy image for non-image, non-PDF files
                    alt="File Not Available"
                    className="w-full md:w-1/3 h-48 object-cover rounded-lg border border-white/10 mb-4 md:mb-0"
                  />
                )}

                {/* Content (Right Side) */}
                <div className="md:ml-6 flex-1">
                  {/* Title */}
                  <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
                    {issue.title}
                  </h2>

                  {/* Description */}
                  <p className="text-gray-300 mb-4">{issue.description}</p>

                  {/* Publish Date (Formatted) */}
                  <p className="text-sm text-gray-400 mb-2">
                    Published on:{" "}
                    {new Date(issue.uploadedAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}
                  </p>

                  {/* Buttons */}
                  <div className="flex gap-4 mt-4">
                    <a
                      href={issue.filePath}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors">
                        View PDF
                      </button>
                    </a>
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md hover:bg-green-600 transition-colors">
                      Contact Us
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </>
        ) : (
          <p className="text-gray-300">No current issue available.</p>
        )}
      </div>

      {/* About the Journal */}
      <div>
        <h2 className="text-xl font-serif font-bold text-blue-300 mb-4">
          About the Journal
        </h2>
        <p className="text-gray-300 mb-4">
          The Journal of Academic Research is committed to publishing
          high-quality research that contributes to the advancement of
          knowledge. Our rigorous peer-review process ensures that all published
          articles meet the highest standards of academic integrity and
          scientific merit.
        </p>
        <p className="text-gray-300">
          We welcome submissions from researchers across all disciplines. Please
          review our submission guidelines for more information on how to submit
          your work for consideration.
        </p>
      </div>
    </div>
  );
};

export default Home;
