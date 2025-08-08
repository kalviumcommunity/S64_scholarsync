// Helper functions for zero-shot profile extraction

export const extractYear = (input) => {
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

export const extractField = (input) => {
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

export const extractLocation = (input) => {
  const locations = ['India', 'USA', 'UK', 'Canada', 'Australia'];
  for (const location of locations) {
    if (input.toLowerCase().includes(location.toLowerCase())) {
      return location;
    }
  }
  return 'India'; // default
};

export const extractSpecialCategories = (input) => {
  const categories = [];
  if (input.toLowerCase().includes('women') || input.toLowerCase().includes('female')) {
    categories.push('Women in STEM');
  }
  if (input.toLowerCase().includes('international')) {
    categories.push('International Students');
  }
  return categories;
};

export const extractGPA = (input) => {
  const gpaMatch = input.match(/gpa\s*:?\s*(\d+\.?\d*)/i) || input.match(/(\d+\.?\d*)\s*gpa/i);
  return gpaMatch ? parseFloat(gpaMatch[1]) : 3.5;
};

export const extractGender = (input) => {
  if (input.toLowerCase().includes('female') || input.toLowerCase().includes('women')) {
    return 'Female';
  }
  if (input.toLowerCase().includes('male') || input.toLowerCase().includes('men')) {
    return 'Male';
  }
  return 'Female'; // default for demo
};