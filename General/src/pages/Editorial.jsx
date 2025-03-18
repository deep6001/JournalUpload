import React from 'react';

const Editorial = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Editorial Board
        </h1>
        <p className="text-lg text-gray-300 leading-relaxed mb-8">
          The Editorial Board comprises distinguished academics and professionals, ensuring the highest standard of quality and integrity in our publications.
        </p>
      </div>

      {/* Editors-in-Chief */}
      <div>
        <h2 className="text-xl font-serif font-bold text-blue-400 mb-6">
          Editors-in-Chief
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Dr. Chander Parkash Singh", institution: "Chandigarh University", contact: "+91-7087669020" },
            { name: "Prof. (Dr) Shailesh N Hadli", institution: "Dharamshastra National Law University, Jabalpur" },
            { name: "Prof. (Dr.) Rajiv Bhalla", institution: "Chandigarh University" }
          ].map((editor, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 shadow-lg">
              <h3 className="font-bold text-gray-200">{editor.name}</h3>
              <p className="text-gray-300 text-sm">{editor.institution}</p>
              {editor.contact && <p className="text-gray-300 text-xs">Contact: {editor.contact}</p>}
            </div>
          ))}
        </div>
      </div>

      {/* Associate Editors */}
      <div>
        <h2 className="text-xl font-serif font-bold text-blue-400 mb-6">
          Associate Editors
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { name: "Dr. Ajaymeet Singh", institution: "Associate Professor, UILS, Chandigarh University" },
            { name: "Dr. Pyali Chatterjee", institution: "ICFAI University, Raipur" },
            { name: "Ms. Nalini Bhadwal", institution: "BA. LLB & LLM" },
            { name: "Adv. Vasharan Thakur", institution: "Advocate, Jammu & Kashmir High Court" },
            { name: "Dr. Naveen Kumar", institution: "Galgotia University" },
            { name: "Dr. Anushya Hazarika", institution: "" } // Institution not provided
          ].map((editor, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 shadow-lg">
              <h3 className="font-bold text-gray-200">{editor.name}</h3>
              <p className="text-gray-300 text-sm">{editor.institution || "Institution details not provided"}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editorial;
