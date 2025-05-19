// models/HealthInfo.js

const mongoose = require('mongoose');

const HealthInfoSchema = new mongoose.Schema({
  name:        { type: String, required: true },
  description: { type: String, required: true },
  symptoms:    { type: String },
  treatment:   { type: String }
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthInfo', HealthInfoSchema);
