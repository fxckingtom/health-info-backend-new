// models/HealthLog.js

const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
  bloodPressure: { type: String, required: true },
  weight:        { type: Number, required: true },
  date:          { type: Date,   required: true },
  time:          { type: String, required: true },
  medicationTaken: { type: Boolean, default: false },
  mood:          { type: String, default: '' },
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthLog', HealthLogSchema);
