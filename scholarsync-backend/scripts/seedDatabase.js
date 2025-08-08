// # Database Seeding Script
// # Create: scholarsync-backend/scripts/seedDatabase.js

const mongoose = require('mongoose');
const Scholarship = require('../models/Scholarship');
require('dotenv').config();

const seedScholarships = [
  {
    name: "Women in Engineering Scholarship",
    amount: "₹50,000",
    deadline: "30th September 2025",
    eligibility: "Female students in engineering",
    provider: "Tech Foundation India",
    field: "Engineering",
    location: "India",
    specialCategory: ["Women in STEM"],
    minGPA: 3.0,
    yearEligible: ["2nd year", "3rd year", "4th year"]
  },
  {
    name: "Tech Leaders of Tomorrow",
    amount: "₹75,000",
    deadline: "15th October 2025",
    eligibility: "CS students with 3.5+ GPA",
    provider: "Innovation Hub",
    field: "Computer Science",
    location: "India",
    specialCategory: [],
    minGPA: 3.5,
    yearEligible: ["3rd year", "4th year"]
  },
  {
    name: "International Student Excellence Award",
    amount: "$5,000",
    deadline: "1st November 2025",
    eligibility: "International students in US universities",
    provider: "Global Education Foundation",
    field: "Any",
    location: "USA",
    specialCategory: ["International Students"],
    minGPA: 3.2,
    yearEligible: ["1st year", "2nd year", "3rd year", "4th year"]
  },
  {
    name: "Merit-Based Engineering Grant",
    amount: "₹30,000",
    deadline: "20th November 2025",
    eligibility: "All engineering students with good academic record",
    provider: "Education Ministry",
    field: "Engineering",
    location: "India",
    specialCategory: [],
    minGPA: 3.0,
    yearEligible: ["2nd year", "3rd year", "4th year"]
  },
  {
    name: "Research Excellence Scholarship",
    amount: "$10,000",
    deadline: "15th December 2025",
    eligibility: "Graduate students in biotechnology research",
    provider: "Bio Research Institute",
    field: "Biotechnology",
    location: "USA",
    specialCategory: [],
    minGPA: 3.5,
    yearEligible: ["Graduate"]
  },
  {
    name: "Creative Arts Fellowship",
    amount: "₹40,000",
    deadline: "10th January 2026",
    eligibility: "Fine arts students with portfolio",
    provider: "Arts Council",
    field: "Fine Arts",
    location: "India",
    specialCategory: [],
    minGPA: 2.5,
    yearEligible: ["2nd year", "3rd year", "4th year"]
  }
];

async function seedDatabase() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Clear existing scholarships
    await Scholarship.deleteMany({});
    console.log('Cleared existing scholarships');
    
    // Insert new scholarships
    await Scholarship.insertMany(seedScholarships);
    console.log(`Inserted ${seedScholarships.length} scholarships`);
    
    console.log('Database seeded successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();

