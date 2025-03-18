import React, { useEffect, useState } from "react";
import axios from "axios";
import Noimage from "../assets/image.png";

const Home = () => {
  const [currentIssue, setCurrentIssue] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const scrollElement = document.scrollingElement || document.documentElement;
    scrollElement.scrollTo({ top: 0, behavior: "smooth" });

    fetchCurrentIssue();
  }, []);

  // 🔹 Fetch Current Issue from Backend
  const fetchCurrentIssue = async () => {
    try {
      const res = await axios.get("http://localhost:5000/api/files");
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
                {/* Image or Dummy Image (Left Side) */}
                {issue.fileType.startsWith("image/") ? (
                  <img
                    src={issue.filePath}
                    alt="Current Issue"
                    className="w-full md:w-1/3 h-48 object-cover rounded-lg border border-white/10 mb-4 md:mb-0"
                  />
                ) : (
                  <img
                    src={Noimage} // ✅ Replace with your dummy image URL
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
                        {issue.fileType.startsWith("image/")
                          ? "View Image"
                          : "View PDF"}
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

      {/* Featured Articles */}
      <div>
        <h2 className="text-xl font-serif font-bold text-blue-300 mb-4">
          Featured Articles
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="border border-white/20 rounded-lg p-5 bg-white/10 backdrop-blur-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-100 mb-2">
              Advances in Quantum Computing: A Systematic Review
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              By Dr. Sarah Johnson, Dr. Michael Chen
            </p>
            <p className="text-gray-300">
              This comprehensive review examines recent developments in quantum
              computing algorithms and their potential applications in solving
              complex computational problems.
            </p>
          </div>
          <div className="border border-white/20 rounded-lg p-5 bg-white/10 backdrop-blur-md hover:shadow-lg transition-shadow">
            <h3 className="font-bold text-gray-100 mb-2">
              Climate Change Impact on Biodiversity: A Global Perspective
            </h3>
            <p className="text-gray-400 text-sm mb-3">
              By Prof. David Williams, Dr. Emily Rodriguez
            </p>
            <p className="text-gray-300">
              An analysis of how climate change is affecting biodiversity across
              different ecosystems, with recommendations for conservation
              strategies.
            </p>
          </div>
        </div>
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
