import React from "react";

const FormattingGuidelines = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <h1 className="text-3xl font-serif font-bold text-white mb-4">
        Formatting Guidelines
      </h1>

      {/* Guidelines Section */}
      <div className="bg-white/10 backdrop-blur-md p-6 rounded-lg border border-white/20 space-y-4">
        {/* Title / Heading */}
        <h2 className="text-2xl font-semibold text-blue-400">Title / Heading</h2>
        <ul className="text-gray-300 text-lg space-y-1">
          <li><strong>- Font Size:</strong> 14</li>
          <li><strong>- Style:</strong> Bold, Capitalized</li>
          <li><strong>- Line Spacing:</strong> 1.5</li>
        </ul>

        {/* Main Text */}
        <h2 className="text-2xl font-semibold text-blue-400">Main Text</h2>
        <ul className="text-gray-300 text-lg space-y-1">
          <li><strong>- Font Size:</strong> 12</li>
          <li><strong>- Style:</strong> Sentence case</li>
          <li><strong>- Line Spacing:</strong> 1.5</li>
        </ul>

        {/* Footnotes */}
        <h2 className="text-2xl font-semibold text-blue-400">Footnotes</h2>
        <ul className="text-gray-300 text-lg space-y-1">
          <li><strong>- Font Size:</strong> 10</li>
          <li><strong>- Style:</strong> APA, MLA, Bluebook, or ILI</li>
          <li><strong>- Font-Family:</strong> Times New Roman</li>
        </ul>
      </div>
    </div>
  );
};

export default FormattingGuidelines;
