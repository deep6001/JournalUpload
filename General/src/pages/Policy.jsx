import React from 'react';

const Policy = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Copyright Policy
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          The copyright over all papers published in the <strong>Interdisciplinary Journal of Law, Public Policy, and Social Sciences (IJLPS)</strong> shall vest exclusively with IJLPS. The submission of a manuscript implies that the author(s) have assigned such rights to IJLPS.
        </p>
      </div>

      {/* Policy Sections */}
      <div className="space-y-6">
        {/* Ownership of Copyright */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-400 mb-3">
            Ownership of Copyright
          </h2>
          <p className="text-gray-300 mb-3">
            Upon submission, authors agree that the copyright of their work will be transferred to IJLPS upon acceptance and publication. The journal holds exclusive rights to the publication and distribution of all published works.
          </p>
        </section>

        {/* Author Rights and Permissions */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-400 mb-3">
            Author Rights and Permissions
          </h2>
          <p className="text-gray-300 mb-3">
            While authors assign copyright to IJLPS, they are allowed to:
          </p>
          <ul className="list-disc list-inside text-gray-200 mb-3 space-y-2">
            <li>Use their published work in personal compilations or institutional repositories with proper acknowledgment.</li>
            <li>Distribute copies for personal or professional use, but not for commercial distribution.</li>
            <li>Republish their work in edited books, provided IJLPS is credited as the original publisher.</li>
          </ul>
        </section>

        {/* Plagiarism and Originality */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-400 mb-3">
            Plagiarism and Originality
          </h2>
          <p className="text-gray-300 mb-3">
            IJLPS strictly prohibits plagiarism and self-plagiarism. Authors must ensure that their submissions are original and have not been published or submitted elsewhere. Plagiarism detection software may be used to verify originality.
          </p>
        </section>

        {/* Licensing Terms */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-400 mb-3">
            Licensing Terms
          </h2>
          <p className="text-gray-300 mb-3">
            The journal retains full rights over the content and does not allow redistribution of published papers without explicit permission. Any reproduction or use of published content must adhere to the journal’s copyright policies.
          </p>
        </section>
      </div>
    </div>
  );
};

export default Policy;
