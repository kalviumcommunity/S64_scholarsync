// routes/ai.js - AI Processing Routes
const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// Zero-shot prompting function for scholarship matching
function generateZeroShotPrompt(studentProfile, scholarships) {
  const prompt = `You are an academic assistant helping students find scholarships they are eligible for.

Given the following student profile:
- Year: ${studentProfile.year}
- Field of Study: ${studentProfile.field}
- Location: ${studentProfile.location}
- Special Categories: ${studentProfile.specialCategory.join(', ')}
- GPA: ${studentProfile.gpa}
- Gender: ${studentProfile.gender || 'Not specified'}
- International Student: ${studentProfile.isInternational ? 'Yes' : 'No'}

And the following available scholarships:
${scholarships.map((scholarship, index) => `
${index + 1}. ${scholarship.name}
   - Amount: ${scholarship.amount}
   - Deadline: ${scholarship.deadline}
   - Eligibility: ${scholarship.eligibility}
   - Provider: ${scholarship.provider}
   - Field: ${scholarship.field}
   - Location: ${scholarship.location}
   - Min GPA: ${scholarship.minGPA}
   - Year Eligible: ${scholarship.yearEligible.join(', ')}
`).join('')}

Analyze the student profile and identify which scholarships they are eligible for. Calculate a match score (0-100) for each eligible scholarship based on how well the student fits the criteria.

Provide your response in the following JSON format:
{
  "student_profile": {
    "year": "${studentProfile.year}",
    "field": "${studentProfile.field}",
    "location": "${studentProfile.location}",
    "special_category": "${studentProfile.specialCategory.join(', ')}"
  },
  "eligible_scholarships": [
    {
      "name": "Scholarship Name",
      "amount": "Amount",
      "deadline": "Deadline",
      "eligibility": "Eligibility Criteria",
      "provider": "Provider Name",
      "match_score": 85
    }
  ],
  "match_summary": "Brief explanation of matches",
  "next_steps": "Recommended actions for the student"
}

Only include scholarships where the student meets the basic eligibility criteria.`;

  return prompt;
}

// Process student profile and find matching scholarships
router.post('/match', async (req, res) => {
  try {
    const studentProfile = req.body;
    
    // Fetch all available scholarships
    const allScholarships = await Scholarship.find();
    
    // Filter scholarships based on basic criteria
    const eligibleScholarships = allScholarships.filter(scholarship => {
      // Check field match (case-insensitive)
      const fieldMatch = scholarship.field.toLowerCase() === 'any' || 
                         scholarship.field.toLowerCase() === studentProfile.field.toLowerCase() ||
                         (scholarship.field.toLowerCase() === 'engineering' && 
                          ['computer science', 'electrical engineering', 'mechanical engineering'].includes(studentProfile.field.toLowerCase()));
      
      // Check location match
      const locationMatch = scholarship.location.toLowerCase() === studentProfile.location.toLowerCase();
      
      // Check year eligibility
      const yearMatch = scholarship.yearEligible.includes(studentProfile.year);
      
      // Check GPA requirement
      const gpaMatch = studentProfile.gpa >= scholarship.minGPA;
      
      // Check special categories
      const categoryMatch = scholarship.specialCategory.length === 0 || 
                           scholarship.specialCategory.some(cat => studentProfile.specialCategory.includes(cat));
      
      return fieldMatch && locationMatch && yearMatch && gpaMatch && categoryMatch;
    });

    // Calculate match scores for eligible scholarships
    const scoredScholarships = eligibleScholarships.map(scholarship => {
      let score = 70; // Base score for meeting basic criteria
      
      // Boost score for exact field match
      if (scholarship.field.toLowerCase() === studentProfile.field.toLowerCase()) {
        score += 15;
      }
      
      // Boost score for special categories
      if (scholarship.specialCategory.some(cat => studentProfile.specialCategory.includes(cat))) {
        score += 10;
      }
      
      // Boost score if GPA exceeds minimum by significant margin
      if (studentProfile.gpa > scholarship.minGPA + 0.5) {
        score += 5;
      }
      
      return {
        name: scholarship.name,
        amount: scholarship.amount,
        deadline: scholarship.deadline,
        eligibility: scholarship.eligibility,
        provider: scholarship.provider,
        match_score: Math.min(score, 100)
      };
    });

    // Sort by match score (highest first)
    scoredScholarships.sort((a, b) => b.match_score - a.match_score);

    // Prepare the response in the required format
    const response = {
      student_profile: {
        year: studentProfile.year,
        field: studentProfile.field,
        location: studentProfile.location,
        special_category: studentProfile.specialCategory.join(', ')
      },
      eligible_scholarships: scoredScholarships,
      total_matches: scoredScholarships.length,
      average_match_score: scoredScholarships.length > 0 ? 
        Math.round(scoredScholarships.reduce((sum, s) => sum + s.match_score, 0) / scoredScholarships.length) : 0,
      match_summary: `Found ${scoredScholarships.length} eligible scholarships for ${studentProfile.field} student in ${studentProfile.location}`,
      next_steps: scoredScholarships.length > 0 ? 
        "Review the eligible scholarships and apply before their respective deadlines. Prepare required documents and essays." :
        "No current matches found. Consider broadening your search criteria or check back for new opportunities."
    };

    res.json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Extract student profile from natural language input
router.post('/extract-profile', (req, res) => {
  try {
    const { input } = req.body;
    
    // Simple pattern matching for profile extraction (Zero-shot approach)
    const profile = {
      year: extractYear(input),
      field: extractField(input),
      location: extractLocation(input),
      specialCategory: extractSpecialCategories(input),
      gpa: extractGPA(input),
      gender: extractGender(input),
      isInternational: input.toLowerCase().includes('international')
    };

    res.json({ profile });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Helper functions for profile extraction
function extractYear(input) {
  const yearPatterns = ['1st year', '2nd year', '3rd year', '4th year', 'first year', 'second year', 'third year', 'fourth year'];
  for (const pattern of yearPatterns) {
    if (input.toLowerCase().includes(pattern)) {
      return pattern.replace(/first|second|third|fourth/, (match) => {
        const map = { first: '1st', second: '2nd', third: '3rd', fourth: '4th' };
        return map[match];
      });
    }
  }
  return 'Not specified';
}

function extractField(input) {
  const fieldPatterns = {
    'computer science': ['computer science', 'cs', 'software'],
    'engineering': ['engineering', 'engineer'],
    'biotechnology': ['biotechnology', 'biotech'],
    'fine arts': ['fine arts', 'arts']
  };
  
  for (const [field, patterns] of Object.entries(fieldPatterns)) {
    if (patterns.some(pattern => input.toLowerCase().includes(pattern))) {
      return field.charAt(0).toUpperCase() + field.slice(1);
    }
  }
  return 'Not specified';
}

function extractLocation(input) {
  const locations = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  for (const location of locations) {
    if (input.toLowerCase().includes(location.toLowerCase())) {
      return location;
    }
  }
  return 'Not specified';
}

function extractSpecialCategories(input) {
  const categories = [];
  if (input.toLowerCase().includes('women') || input.toLowerCase().includes('female')) {
    categories.push('Women in STEM');
  }
  if (input.toLowerCase().includes('international')) {
    categories.push('International Students');
  }
  return categories;
}

function extractGPA(input) {
  const gpaMatch = input.match(/gpa\s*:?\s*(\d+\.?\d*)/i) || input.match(/(\d+\.?\d*)\s*gpa/i);
  return gpaMatch ? parseFloat(gpaMatch[1]) : 0;
}

function extractGender(input) {
  if (input.toLowerCase().includes('female') || input.toLowerCase().includes('women')) {
    return 'Female';
  }
  if (input.toLowerCase().includes('male') || input.toLowerCase().includes('men')) {
    return 'Male';
  }
  return 'Not specified';
}

module.exports = router;