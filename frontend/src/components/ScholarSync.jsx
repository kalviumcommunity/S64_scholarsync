import React, { useState } from 'react';

// Import all components
import Header from './Header';
import SearchSection from './SearchSection';
import LoadingState from './LoadingState';
import ProfileSummary from './ProfileSummary';
import MatchStatistics from './MatchStatistics';
import ScholarshipCard from './ScholarshipCard';
import NextSteps from './NextSteps';
import FeaturesSection from './FeaturesSection';
import SampleQueries from './SampleQueries';
import Footer from './Footer';

// Import API services
import { extractProfile, findMatchingScholarships } from '../services/api';

const ScholarSync = () => {
  const [input, setInput] = useState('');
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    year: '',
    field: '',
    location: '',
    specialCategory: [],
    gpa: 0,
    gender: '',
    isInternational: false
  });

  const handleSearch = async () => {
    if (!input.trim()) return;
    
    setLoading(true);
    try {
      // Step 1: Extract profile from natural language input
      const extractedProfile = await extractProfile(input);
      setProfile(extractedProfile);
      
      // Step 2: Find matching scholarships
      const matches = await findMatchingScholarships(extractedProfile);
      setResults(matches);
    } catch (error) {
      console.error('Error processing request:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleProfileUpdate = (field, value) => {
    const updatedProfile = { ...profile, [field]: value };
    setProfile(updatedProfile);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
        <SearchSection 
          input={input}
          setInput={setInput}
          loading={loading}
          handleSearch={handleSearch}
        />

        {/* Loading State */}
        {loading && <LoadingState />}

        {/* Results Section */}
        {results && !loading && (
          <div className="space-y-8">
            {/* Profile Summary */}
            <ProfileSummary profile={profile} />

            {/* Match Statistics */}
            <MatchStatistics results={results} />

            {/* Scholarship Matches */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Scholarship Matches</h3>
              
              {results.eligible_scholarships.map((scholarship, index) => (
                <ScholarshipCard 
                  key={index}
                  scholarship={scholarship}
                  index={index}
                />
              ))}
            </div>

            {/* Next Steps */}
            <NextSteps nextSteps={results.next_steps} />
          </div>
        )}

        {/* Features Section */}
        {!results && !loading && <FeaturesSection />}

        {/* Sample Queries */}
        {!results && !loading && <SampleQueries setInput={setInput} />}
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ScholarSync;