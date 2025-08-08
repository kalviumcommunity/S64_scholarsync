import { 
  extractYear, 
  extractField, 
  extractLocation, 
  extractSpecialCategories, 
  extractGPA, 
  extractGender 
} from '../utils/helpers';

// Mock API calls (replace with actual API endpoints)
export const extractProfile = async (input) => {
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

export const findMatchingScholarships = async (profile) => {
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