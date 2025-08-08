import React from 'react';
import { BookOpen } from 'lucide-react';

const Header = () => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3">
            <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
              <BookOpen className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">ScholarSync</h1>
              <p className="text-sm text-gray-600">AI-Powered Scholarship Matching</p>
            </div>
          </div>
          <div className="hidden md:flex items-center space-x-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">500+</div>
              <div className="text-sm text-gray-600">Scholarships</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-indigo-600">95%</div>
              <div className="text-sm text-gray-600">Match Accuracy</div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;