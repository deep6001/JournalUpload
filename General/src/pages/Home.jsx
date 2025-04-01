import React, { useEffect, useState, Suspense, lazy } from "react";
import axios from "axios";
import Noimage from "../assets/image.png";
import { ArrowRight } from "lucide-react";

const SkeletonLoader = () => (
  <div className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 mb-6 animate-pulse">
    <div className="w-full md:w-1/3 h-48 bg-gray-700 rounded-lg"></div>
    <div className="md:ml-6 flex-1">
      <div className="h-6 bg-gray-700 w-3/4 mb-3 rounded"></div>
      <div className="h-4 bg-gray-700 w-full mb-2 rounded"></div>
      <div className="h-4 bg-gray-700 w-5/6 mb-4 rounded"></div>
      <div className="h-4 bg-gray-700 w-1/2 mb-2 rounded"></div>
      <div className="h-10 bg-gray-700 w-32 rounded"></div>
    </div>
  </div>
);

const Home = () => {
  const [currentIssues, setCurrentIssues] = useState([]);
  const [filteredIssues, setFilteredIssues] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMonth, setSelectedMonth] = useState(""); // Store selected month
  const issuesPerPage = 5;

  useEffect(() => {
    document.scrollingElement?.scrollTo({ top: 0, behavior: "smooth" });
    fetchCurrentIssues();
  }, []);

  const API_URL = import.meta.env.VITE_API_URL;

  const fetchCurrentIssues = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/files`);
      setCurrentIssues(res.data);
      setFilteredIssues(res.data); // Initially, show all issues
    } catch (err) {
      setError("Failed to load the current issues.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  // Handle Month Filter
  const handleMonthChange = (event) => {
    const selectedDate = event.target.value; // Format: YYYY-MM
    setSelectedMonth(selectedDate);

    if (!selectedDate) {
      setFilteredIssues(currentIssues);
      return;
    }

    const [year, month] = selectedDate.split("-");

    // Filter issues by selected month and year
    const filtered = currentIssues.filter((issue) => {
      const issueDate = new Date(issue.uploadDate);
      return (
        issueDate.getFullYear().toString() === year &&
        (issueDate.getMonth() + 1).toString().padStart(2, "0") === month
      );
    });

    setFilteredIssues(filtered);
    setCurrentPage(1); // Reset to first page after filtering
  };

  const indexOfLastIssue = currentPage * issuesPerPage;
  const indexOfFirstIssue = indexOfLastIssue - issuesPerPage;
  const currentPageIssues = filteredIssues.slice(indexOfFirstIssue, indexOfLastIssue);
  const totalPages = Math.ceil(filteredIssues.length / issuesPerPage);

  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-lg text-white">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Journal of Academic Research
        </h1>
        <p className="text-lg text-gray-200 leading-relaxed">
          Welcome to the Journal of Academic Research, a peer-reviewed publication dedicated to advancing knowledge across multiple disciplines.
        </p>
      </div>

      {/* Date Filter */}
      <div className="flex items-center gap-4">
        <label className="text-white">Filter by Month:</label>
        <input
          type="month"
          value={selectedMonth}
          onChange={handleMonthChange}
          className="bg-gray-800 text-white p-2 rounded-md border border-white/20"
        />
      </div>

      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20">
        {loading ? (
          Array.from({ length: issuesPerPage }).map((_, index) => <SkeletonLoader key={index} />)
        ) : error ? (
          <p className="text-red-400">{error}</p>
        ) : currentPageIssues.length > 0 ? (
          <Suspense fallback={<SkeletonLoader />}>
            {currentPageIssues.map((issue) => (
              <div key={issue._id} className="flex flex-col md:flex-row items-center bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 mb-6">
                <img
                  src={issue.coverImage || Noimage}
                  alt="Current Issue"
                  loading="lazy"
                  className="w-full md:w-1/3 h-48 object-cover rounded-lg border border-white/10 mb-4 md:mb-0"
                />
                <div className="md:ml-6 flex-1">
                  <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">{issue.title}</h2>
                  <p className="text-gray-300 mb-4">{issue.description}</p>
                  <p className="text-sm text-gray-400 mb-2">
                    Published on: {new Date(issue.uploadDate).toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" })}
                  </p>
                  <a
                    href={issue.pdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                  >
                    View Issue <ArrowRight size={20} />
                  </a>
                </div>
              </div>
            ))}
          </Suspense>
        ) : (
          <p className="text-gray-300">No issues available for the selected month.</p>
        )}
        {totalPages > 1 && (
          <div className="flex justify-center items-center gap-4 mt-6">
            <button
              className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="text-gray-300">Page {currentPage} of {totalPages}</span>
            <button
              className="px-4 py-2 bg-gray-700 rounded-lg text-white hover:bg-gray-600 disabled:opacity-50"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;
