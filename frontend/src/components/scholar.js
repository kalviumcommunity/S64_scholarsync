import React, { useState } from 'react';
import { Search, BookOpen, Award, User, MapPin, Calendar, DollarSign } from 'lucide-react';

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

  // Mock API calls (replace with actual API endpoints)
  const extractProfile = async (input) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Zero-shot profile extraction logic
    const extractedProfile = {
      year: extractYear(input),
      field: extractField(input),
      location: extractLocation(input),
      specialCategory: extractSpecialCategories(input),
      gpa: extractGPA(input),
      gender: extractGender(input),
      isInternational: input.toLowerCase().includes('international')
    };
    
    return extractedProfile;
  };

  const findMatchingScholarships = async (profile) => {
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // Mock scholarship data
    const mockScholarships = [
      {
        name: "Women in Engineering Scholarship",
        amount: "₹50,000",
        deadline: "30th September 2025",
        eligibility: "Female students in engineering",
        provider: "Tech Foundation India",
        match_score: 95
      },
      {
        name: "Tech Leaders of Tomorrow",
        amount: "₹75,000",
        deadline: "15th October 2025",
        eligibility: "CS students with 3.5+ GPA",
        provider: "Innovation Hub",
        match_score: 88
      },
      {
        name: "Merit Scholarship Program",
        amount: "₹30,000",
        deadline: "20th November 2025",
        eligibility: "All engineering students",
        provider: "Education Ministry",
        match_score: 75
      }
    ];

    return {
      student_profile: profile,
      eligible_scholarships: mockScholarships,
      total_matches: mockScholarships.length,
      average_match_score: 86,
      match_summary: `Found ${mockScholarships.length} eligible scholarships for ${profile.field} student in ${profile.location}`,
      next_steps: "Review the eligible scholarships and apply before their respective deadlines."
    };
  };

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

  // Helper functions for zero-shot profile extraction
  const extractYear = (input) => {
    const yearPatterns = ['1st year', '2nd year', '3rd year', '4th year', 'first year', 'second year', 'third year', 'fourth year'];
    for (const pattern of yearPatterns) {
      if (input.toLowerCase().includes(pattern)) {
        return pattern.replace(/first|second|third|fourth/, (match) => {
          const map = { first: '1st', second: '2nd', third: '3rd', fourth: '4th' };
          return map[match];
        });
      }
    }
    return '3rd year'; // default
  };

  const extractField = (input) => {
    const fieldPatterns = {
      'Computer Science': ['computer science', 'cs', 'software'],
      'Engineering': ['engineering', 'engineer'],
      'Biotechnology': ['biotechnology', 'biotech'],
      'Fine Arts': ['fine arts', 'arts']
    };
    
    for (const [field, patterns] of Object.entries(fieldPatterns)) {
      if (patterns.some(pattern => input.toLowerCase().includes(pattern))) {
        return field;
      }
    }
    return 'Computer Science'; // default
  };

  const extractLocation = (input) => {
    const locations = ['India', 'USA', 'UK', 'Canada', 'Australia'];
    for (const location of locations) {
      if (input.toLowerCase().includes(location.toLowerCase())) {
        return location;
      }
    }
    return 'India'; // default
  };

  const extractSpecialCategories = (input) => {
    const categories = [];
    if (input.toLowerCase().includes('women') || input.toLowerCase().includes('female')) {
      categories.push('Women in STEM');
    }
    if (input.toLowerCase().includes('international')) {
      categories.push('International Students');
    }
    return categories;
  };

  const extractGPA = (input) => {
    const gpaMatch = input.match(/gpa\s*:?\s*(\d+\.?\d*)/i) || input.match(/(\d+\.?\d*)\s*gpa/i);
    return gpaMatch ? parseFloat(gpaMatch[1]) : 3.5;
  };

  const extractGender = (input) => {
    if (input.toLowerCase().includes('female') || input.toLowerCase().includes('women')) {
      return 'Female';
    }
    if (input.toLowerCase().includes('male') || input.toLowerCase().includes('men')) {
      return 'Male';
    }
    return 'Female'; // default for demo
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
      {/* Header */}
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Search Section */}
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

        {/* Loading State */}
        {loading && (
          <div className="text-center py-12">
            <div className="inline-flex items-center space-x-3">
              <div className="animate-spin w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full"></div>
              <div className="text-lg font-medium text-gray-700">
                Analyzing your profile and matching scholarships...
              </div>
            </div>
          </div>
        )}

        {/* Results Section */}
        {results && !loading && (
          <div className="space-y-8">
            {/* Profile Summary */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-6 flex items-center">
                <User className="w-6 h-6 mr-3 text-blue-600" />
                Your Profile Summary
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="flex items-center space-x-3">
                  <div className="bg-blue-100 p-2 rounded-lg">
                    <BookOpen className="w-5 h-5 text-blue-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Academic Year</div>
                    <div className="font-semibold">{profile.year}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-indigo-100 p-2 rounded-lg">
                    <Award className="w-5 h-5 text-indigo-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Field of Study</div>
                    <div className="font-semibold">{profile.field}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-purple-100 p-2 rounded-lg">
                    <MapPin className="w-5 h-5 text-purple-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Location</div>
                    <div className="font-semibold">{profile.location}</div>
                  </div>
                </div>
                <div className="flex items-center space-x-3">
                  <div className="bg-green-100 p-2 rounded-lg">
                    <User className="w-5 h-5 text-green-600" />
                  </div>
                  <div>
                    <div className="text-sm text-gray-600">Special Category</div>
                    <div className="font-semibold">
                      {profile.specialCategory.length > 0 ? profile.specialCategory.join(', ') : 'None'}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Match Statistics */}
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
                    {results.eligible_scholarships.reduce((sum, s) => {
                      const amount = s.amount.replace(/[^\d]/g, '');
                      return sum + parseInt(amount);
                    }, 0).toLocaleString()}
                  </div>
                  <div className="text-blue-100">Total Potential Funding</div>
                </div>
              </div>
            </div>

            {/* Scholarship Matches */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-gray-900">Your Scholarship Matches</h3>
              
              {results.eligible_scholarships.map((scholarship, index) => (
                <div key={index} className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-xl transition-shadow duration-300">
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
              ))}
            </div>

            {/* Next Steps */}
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-6 rounded-r-xl">
              <div className="flex">
                <div className="flex-shrink-0">
                  <Award className="h-5 w-5 text-yellow-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-yellow-800">Next Steps</h3>
                  <p className="mt-2 text-yellow-700">{results.next_steps}</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Features Section */}
        {!results && !loading && (
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
        )}

        {/* Sample Queries */}
        {!results && !loading && (
          <div className="mt-16 bg-gray-50 rounded-2xl p-8">
            <h3 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Try These Sample queries
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div 
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500"
                onClick={() => setInput("I'm a 3rd-year Computer Science student in India, female, with a 3.7 GPA.")}
              >
                <div className="text-sm text-blue-600 font-semibold mb-2">STEM Student</div>
                <p className="text-gray-800">"I'm a 3rd-year Computer Science student in India, female, with a 3.7 GPA."</p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-indigo-500"
                onClick={() => setInput("International student studying biotechnology in USA, looking for research scholarships.")}
              >
                <div className="text-sm text-indigo-600 font-semibold mb-2">International Student</div>
                <p className="text-gray-800">"International student studying biotechnology in USA, looking for research scholarships."</p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-purple-500"
                onClick={() => setInput("2nd-year Fine Arts student from low-income family, need financial assistance.")}
              >
                <div className="text-sm text-purple-600 font-semibold mb-2">Arts Student</div>
                <p className="text-gray-800">"2nd-year Fine Arts student from low-income family, need financial assistance."</p>
              </div>
              
              <div 
                className="bg-white p-6 rounded-xl shadow-md cursor-pointer hover:shadow-lg transition-shadow duration-300 border-l-4 border-green-500"
                onClick={() => setInput("Engineering student with 4.0 GPA, interested in women in tech scholarships.")}
              >
                <div className="text-sm text-green-600 font-semibold mb-2">High Achiever</div>
                <p className="text-gray-800">"Engineering student with 4.0 GPA, interested in women in tech scholarships."</p>
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-gray-900 text-white mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2 rounded-xl">
                <BookOpen className="h-8 w-8 text-white" />
              </div>
              <h2 className="text-2xl font-bold">ScholarSync</h2>
            </div>
            <p className="text-gray-400 mb-8 max-w-2xl mx-auto">
              Empowering students to find their perfect scholarship match through intelligent AI assistance.
              Built with MERN stack and zero-shot prompting technology.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div>
                <h3 className="text-lg font-semibold mb-4">Technology Stack</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>React.js Frontend</li>
                  <li>Node.js Backend</li>
                  <li>MongoDB Database</li>
                  <li>Zero-shot AI Prompting</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">Features</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Smart Profile Analysis</li>
                  <li>Real-time Matching</li>
                  <li>Natural Language Input</li>
                  <li>Structured Results</li>
                </ul>
              </div>
              
              <div>
                <h3 className="text-lg font-semibold mb-4">AI Capabilities</h3>
                <ul className="space-y-2 text-gray-400">
                  <li>Zero-shot Learning</li>
                  <li>Profile Extraction</li>
                  <li>Eligibility Matching</li>
                  <li>Score Calculation</li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-800 mt-12 pt-8">
              <p className="text-gray-400">
                © 2025 ScholarSync. Built with MERN stack and AI-powered matching algorithms.
              </p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default ScholarSync;