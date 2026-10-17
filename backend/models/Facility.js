const mongoose = require('mongoose');
const facilitySchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ['amenity', 'amenty', 'rule'], // Keep the old spelling readable for existing records.
    default: 'amenity',
    required: true,
  },
  key: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  label: {
    type: String,
    trim: true,
    required: true,
  },
  lable: String, // Legacy field used by the original API.
  icon: {
    type: String,
    default: 'FaRegLightbulb',
    trim: true,
  },
});

facilitySchema.pre('validate', function normalizeFacility(next) {
  this.label = (this.label || this.lable || '').trim();
  this.lable = this.label;
  if (this.type === 'amenty') this.type = 'amenity';
  next();
});

module.exports = mongoose.model('Facility', facilitySchema, 'Facility');
