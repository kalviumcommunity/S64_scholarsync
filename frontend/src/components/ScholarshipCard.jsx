import React from 'react';
import { DollarSign, Calendar } from 'lucide-react';

const ScholarshipCard = ({ scholarship, index }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
      <div className="flex justify-between items-start mb-6">
        <div className="flex-1">
          <h4 className="text-xl font-bold text-gray-900 mb-2">{scholarship.name}</h4>
          <p className="text-gray-600 mb-4">{scholarship.eligibility}</p>
          <div className="text-sm text-gray-500">
            Provided by: <span className="font-medium">{scholarship.provider}</span>
          </div>
        </div>
        <div className="ml-6 text-right">
          <div className="inline-flex items-center bg-green-100 text-green-800 px-4 py-2 rounded-full font-semibold mb-2">
            {scholarship.match_score}% Match
          </div>
        </div>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="bg-green-100 p-2 rounded-lg">
            <DollarSign className="w-5 h-5 text-green-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Award Amount</div>
            <div className="font-bold text-lg text-green-600">{scholarship.amount}</div>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <div className="bg-red-100 p-2 rounded-lg">
            <Calendar className="w-5 h-5 text-red-600" />
          </div>
          <div>
            <div className="text-sm text-gray-600">Application Deadline</div>
            <div className="font-semibold text-red-600">{scholarship.deadline}</div>
          </div>
        </div>
        
        <div className="flex justify-end">
          <button className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-6 py-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 font-semibold">
            Apply Now
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScholarshipCard;