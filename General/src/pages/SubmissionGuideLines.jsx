import React from 'react';

const SubmissionGuideLines = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-lg border border-white/20 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Submission Guidelines
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          Please carefully follow the submission guidelines below to ensure that your manuscript meets the requirements of the <strong>Interdisciplinary Journal of Law, Policy and Social Sciences (IJLPS).</strong>
        </p>
      </div>

      <div className="space-y-6">
        {/* Submission Requirements */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Submission Requirements
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li><strong>Cover Letter:</strong> The submission must include a cover letter with the author’s name, official designation, institution, manuscript title, and contact details.</li>
            <li><strong>Original Research Certification:</strong> A certificate stating that the submission is original research and has not been published or considered elsewhere.</li>
            <li><strong>Plagiarism Report:</strong> A Similarity Index Report (Turnitin), with a similarity percentage <strong>below 10%</strong>.</li>
          </ul>
        </section>

        {/* Manuscript Guidelines */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Manuscript Guidelines
          </h2>
          <ul className="list-disc list-inside text-gray-300 space-y-2">
            <li>Manuscripts must be written in <strong>English</strong> and follow the IJLPS formatting guidelines.</li>
            <li>Submissions should be in <strong>PDF and MS Word</strong> formats.</li>
            <li>The <strong>word limit</strong> for research papers is between <strong>4,000 to 8,000 words</strong> (including footnotes).</li>
            <li>Submissions from <strong>academicians, practitioners, Ph.D. researchers, and LL.M. students</strong> are accepted. <strong>Undergraduate students can submit only as co-authors.</strong></li>
            <li>Each manuscript must be <strong>blind peer-reviewed</strong> before final acceptance.</li>
            <li>Referencing must follow the <strong>British English format</strong> with complete URLs for any online sources.</li>
          </ul>
        </section>

        {/* Co-Authorship */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Co-Authorship Policy
          </h2>
          <p className="text-gray-300">
            Co-authorship is <strong>allowed up to two co-authors</strong> (a maximum of three authors per paper). The submission should not contain any identifying details within the text, footnotes, or document properties.
          </p>
        </section>

        {/* Review & Decision Process */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Review & Decision Process
          </h2>
          <p className="text-gray-300">
            The journal follows a <strong>blind peer-review process</strong> where the reviewers will not have access to the author's identity. Authors may be asked to make <strong>necessary amendments</strong> based on reviewer feedback. A revised submission must be returned within <strong>one week</strong>.
          </p>
          <p className="text-gray-300 mt-2">
            Decisions regarding acceptance, revision, or rejection will be communicated via email. The <strong>Editorial Board’s decision is final.</strong>
          </p>
        </section>

        {/* Submission Process */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Submission Process
          </h2>
          <div className="bg-white/10 backdrop-blur-md p-5 rounded-lg border border-white/20">
            <ol className="list-decimal list-inside space-y-3 text-gray-300">
              <li><strong>Prepare your manuscript</strong> following the guidelines above.</li>
              <li><strong>Email the submission</strong> along with the required documents to the <strong>Editorial Board</strong>.</li>
              <li><strong>Wait for the review process</strong> and respond to any feedback promptly.</li>
              <li><strong>If accepted</strong>, you will receive a notification regarding publication.</li>
            </ol>
            {/* <div className="mt-5">
              <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition">
                Submit Your Manuscript
              </button>
            </div> */}
          </div>
        </section>

        {/* Copyright & Final Decision */}
        <section>
          <h2 className="text-xl font-serif font-bold text-blue-300 mb-3">
            Copyright & Final Decision
          </h2>
          <p className="text-gray-300">
            The <strong>copyright of all published papers exclusively belongs to IJLPS.</strong>  
            Submission does not guarantee publication, and the Editorial Board holds the final decision on manuscript acceptance.
          </p>
        </section>
      </div>
    </div>
  );
};

export default SubmissionGuideLines;
