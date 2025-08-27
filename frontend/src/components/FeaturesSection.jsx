import React from 'react';
import { Search, Award, BookOpen } from 'lucide-react';

const FeaturesSection = () => {
  return (
    <div className="mt-16">
      <h3 className="text-3xl font-bold text-center text-gray-900 mb-12">
        How ScholarSync Works
      </h3>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Search className="w-8 h-8 text-blue-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Smart Analysis</h4>
          <p className="text-gray-600">
            Our AI analyzes your profile using zero-shot prompting to understand your unique academic background and eligibility criteria.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-indigo-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <Award className="w-8 h-8 text-indigo-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Precise Matching</h4>
          <p className="text-gray-600">
            Advanced matching algorithms calculate compatibility scores to find scholarships that best fit your profile and goals.
          </p>
        </div>
        
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center hover:shadow-xl transition-shadow duration-300">
          <div className="bg-purple-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
            <BookOpen className="w-8 h-8 text-purple-600" />
          </div>
          <h4 className="text-xl font-bold text-gray-900 mb-4">Real-time Results</h4>
          <p className="text-gray-600">
            Get instant access to updated scholarship databases with current deadlines, amounts, and application requirements.
          </p>
        </div>
      </div>
    </div>
  );
};

export default FeaturesSection;