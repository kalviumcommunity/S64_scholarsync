import React from 'react';
import { Award } from 'lucide-react';

const NextSteps = ({ nextSteps }) => {
  return (
    <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
      <div className="flex">
        <div className="flex-shrink-0">
          <Award className="h-5 w-5 text-yellow-400" />
        </div>
        <div className="ml-3">
          <h3 className="text-lg font-medium text-yellow-800">Next Steps</h3>
          <p className="mt-2 text-yellow-700">{nextSteps}</p>
        </div>
      </div>
    </div>
  );
};

export default NextSteps;