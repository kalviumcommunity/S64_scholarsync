import React from 'react';

const LoadingState = () => {
  return (
    <div className="text-center py-12">
      <div className="inline-flex items-center space-x-3">
        <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
        <div className="text-lg font-medium text-gray-700">
          Analyzing your profile and matching scholarships...
        </div>
      </div>
    </div>
  );
};

export default LoadingState;