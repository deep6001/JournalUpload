import React from 'react';

const Editorial = () => {
  return (
    <div className="space-y-8 p-6 bg-gray-900/50 backdrop-blur-md border border-gray-700 rounded-lg shadow-[0_8px_32px_0_rgba(31,38,135,0.55)] text-white">
      {/* Main Heading */}
      <div>
        <h1 className="text-3xl font-serif font-bold text-white mb-4">
          Editorial Board
        </h1>
      </div>

      {/* Editors-in-Chief */}
      <div>
        <h2 className="text-xl font-serif font-bold text-blue-400 mb-6">
          Editors-in-Chief
        </h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[ 
            { name: "Dr. Chander Parkash Singh", institution: "Chandigarh University", email: "Dr.chanderparkashsingh@gmail.com", position: "Assistant Professor, UILS, Chandigarh University" }
          ].map((editor, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 shadow-lg">
              <h3 className="font-bold text-gray-200">{editor.name}</h3>
              <p className="text-gray-300 text-sm">{editor.institution}</p>
              <p className="text-gray-300 text-sm">{editor.position}</p>
              {editor.email && <p className="text-gray-300 text-xs">Email: {editor.email}</p>}
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
            { name: "Prof. (Dr) Shailesh N Hadli", institution: "Professor, Dharamshastra National Law University, Jabalpur" },
            { name: "Prof. (Dr.) Rajiv Bhalla", institution: "Professor, Chandigarh University" },
            { name: "Dr. Ajaymeet Singh", institution: "Associate Professor, UILS, Chandigarh University" },
            { name: "Dr. Ashwani Kumar", institution: "Assistant Professor, UILS, Chandigarh University" },
            { name: "Dr. Vikas Bhandhari", institution: "Assistant Professor, UILS, Chandigarh University" }
          ].map((editor, index) => (
            <div key={index} className="bg-white/10 backdrop-blur-md border border-white/20 rounded-lg p-5 shadow-lg">
              <h3 className="font-bold text-gray-200">{editor.name}</h3>
              <p className="text-gray-300 text-sm">{editor.institution}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Editorial;
