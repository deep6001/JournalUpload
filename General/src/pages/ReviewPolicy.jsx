import React from "react";

const ReviewPolicy = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <h1 className="text-3xl font-serif font-bold text-white mb-4">Review Policy</h1>

      {/* Review Process Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 shadow-md">
        <ol className="list-decimal list-inside text-gray-300 text-lg space-y-3 flex flex-col gap-3">
          <li>Submitted manuscripts are first screened by the Editorial Board for alignment with IJLPS standards.</li>
          <li>Selected manuscripts undergo a <strong className="text-gray-100">blind peer review</strong> where experts evaluate the content for originality, clarity, and research significance.</li>
          <li>Authors may be asked to make revisions based on reviewer feedback. Revised manuscripts must be resubmitted within <strong className="text-gray-100">one week</strong>.</li>
        </ol>
      </div>
    </div>
  );
};

export default ReviewPolicy;
