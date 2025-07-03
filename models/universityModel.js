const mongoose = require('mongoose');

const UniversitySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true
  },
  location: {
    city: { type: String, required: true },
    state: { type: String },
    country: { type: String, required: true },
    address: { type: String }
  },
  description: {
    type: String,
    required: true
  },
  tuitionFee: {
    currency: { type: String, default: 'USD' },
    annual: { type: Number, required: true },
    scholarshipAvailable: { type: Boolean, default: false }
  },
  establishedYear: {
    type: Number
  },
  ranking: {
    world: { type: Number },
    national: { type: Number }
  },
  contactInfo: {
    email: { type: String },
    phone: { type: String },
    website: { type: String }
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('University', UniversitySchema);
