import React from 'react';

const MatchStatistics = ({ results }) => {
  const totalFunding = results.eligible_scholarships.reduce((sum, s) => {
    const amount = s.amount.replace(/[^\d]/g, '');
    return sum + parseInt(amount);
  }, 0);

  return (
    <div className="bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl shadow-lg p-8 text-white">
      <h3 className="text-2xl font-bold mb-6">Match Results</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{results.total_matches}</div>
          <div className="text-blue-100">Eligible Scholarships</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">{results.average_match_score}%</div>
          <div className="text-blue-100">Average Match Score</div>
        </div>
        <div className="text-center">
          <div className="text-4xl font-bold mb-2">
            {totalFunding.toLocaleString()}
          </div>
          <div className="text-blue-100">Total Potential Funding</div>
        </div>
      </div>
    </div>
  );
};

export default MatchStatistics;