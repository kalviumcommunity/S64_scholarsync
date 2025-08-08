// models/Student.js - Student Profile Schema
const mongoose = require('mongoose');

const studentSchema = new mongoose.Schema({
  year: {
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
  gpa: {
    type: Number,
    default: 0
  },
  gender: String,
  isInternational: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Student', studentSchema);