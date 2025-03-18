import React from "react";

const PublisherDetails = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <h1 className="text-3xl font-serif font-bold text-white mb-4">
        Publisher Details
      </h1>

      {/* Details Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 flex flex-col gap-3">
        <p className="text-gray-300 text-lg">
          <strong>Title of the Journal:</strong> Interdisciplinary Journal of Law, Policy and Social Sciences (IJLPS)
        </p>
        <p className="text-gray-300 text-lg">
          <strong>Language:</strong> English
        </p>
        <p className="text-gray-300 text-lg">
          <strong>Frequency:</strong> Monthly
        </p>
        <p className="text-gray-300 text-lg">
          <strong>Publisher:</strong> Ranjeet Kour
        </p>
        <p className="text-gray-300 text-lg">
          <strong>Place of Publication:</strong> Jammu, J&K
        </p>
      </div>
    </div>
  );
};

export default PublisherDetails;
