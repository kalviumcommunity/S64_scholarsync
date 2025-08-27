// routes/scholarships.js - Scholarship Routes
const express = require('express');
const router = express.Router();
const Scholarship = require('../models/Scholarship');

// Get all scholarships
router.get('/', async (req, res) => {
  try {
    const scholarships = await Scholarship.find();
    res.json(scholarships);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Add sample scholarships
router.post('/seed', async (req, res) => {
  try {
    const sampleScholarships = [
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
      }
    ];

    await Scholarship.insertMany(sampleScholarships);
    res.json({ message: 'Sample scholarships added successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;