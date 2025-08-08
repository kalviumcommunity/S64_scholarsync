import React from 'react';

const SampleQueries = ({ setInput }) => {
  const sampleQueries = [
    {
      category: "STEM Student",
      color: "blue",
      query: "I'm a 3rd-year Computer Science student in India, female, with a 3.7 GPA."
    },
    {
      category: "International Student",
      color: "indigo",
      query: "International student studying biotechnology in USA, looking for research scholarships."
    },
    {
      category: "Arts Student",
      color: "purple",
      query: "2nd-year Fine Arts student from low-income family, need financial assistance."
    },
    {
      category: "High Achiever",
      color: "green",
      query: "Engineering student with 4.0 GPA, interested in women in tech scholarships."
    }
  ];

  return (
    <div className="mt-16 bg-gray-50 rounded-2xl p-8">
      <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
        Try These Sample Queries
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {sampleQueries.map((sample, index) => (
          <div 
            key={index}
            className={`bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-${sample.color}-500`}
            onClick={() => setInput(sample.query)}
          >
            <div className={`text-sm text-${sample.color}-600 font-semibold mb-2`}>
              {sample.category}
            </div>
            <p className="text-gray-800">"{sample.query}"</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SampleQueries;