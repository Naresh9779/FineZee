const mongoose = require('mongoose');

const StudentSchema = new mongoose.Schema({
  image: {
    type: String,
    default: ''
  },
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  phone: {
    type: String,
    required: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  documents: {
    type: [String],
    default: []
  },
  interestedCountries: {
    type: [String],
    default: []
  },
  interestedCourses: {
    type: [String],
    default: []
  },
  bookmarkedUniversities: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'University'
    }
  ],

 
  isVerified: {
    type: Boolean,
    default: false
  },
  otp: {
    code: { type: String },
    expiresAt: { type: Date }
  },
  status: {
    type: String,
    enum: ['active', 'inactive', 'banned'],
    default: 'active'
  },
  profileCompletion: {
    type: Number,
    default: 0,
    min: 0,
    max: 100
  },

  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('Student', StudentSchema);
