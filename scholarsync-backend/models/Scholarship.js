// models/Scholarship.js - Scholarship Schema
const mongoose = require('mongoose');

const scholarshipSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  deadline: {
    type: String,
    required: true
  },
  eligibility: {
    type: String,
    required: true
  },
  provider: {
    type: String,
    required: true
  },
  field: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  specialCategory: {
    type: [String],
    default: []
  },
  minGPA: {
    type: Number,
    default: 0
  },
  yearEligible: {
    type: [String],
    default: []
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Scholarship', scholarshipSchema);