import React from 'react';
import { Search } from 'lucide-react';

const SearchSection = ({ input, setInput, loading, handleSearch }) => {
  return (
    <div className="text-center mb-12">
      <h2 className="text-4xl font-bold text-gray-900 mb-4">
        Find Your Perfect Scholarship Match
      </h2>
      <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
        Describe your academic profile in natural language and let our AI find the best scholarship opportunities for you.
      </p>
      
      <div className="max-w-4xl mx-auto">
        <div className="flex flex-col space-y-4">
          <div className="relative">
            <textarea
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Example: I'm a 3rd-year Computer Science student in India, female, with a 3.7 GPA. Looking for scholarships."
              className="w-full p-6 pr-16 border-2 border-gray-300 rounded-2xl focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none text-lg resize-none h-32"
            />
            <button
              onClick={handleSearch}
              disabled={loading || !input.trim()}
              className="absolute bottom-4 right-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white p-3 rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="animate-spin w-6 h-6 border-2 border-white border-t-transparent rounded-full" />
              ) : (
                <Search className="w-6 h-6" />
              )}
            </button>
          </div>
          
          {input.trim() && (
            <div className="text-sm text-gray-500 text-left">
              💡 Tip: Include details like your year, field of study, location, GPA, and any special categories (e.g., women in STEM, international student).
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchSection;