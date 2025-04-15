const mongoose = require('mongoose');

const healthInfoSchema = new mongoose.Schema({
  name: { type: String, required: true, unique: true },
  tagline: { type: String, required: true },
  description: { type: String, required: true },
  handling: { type: [String], required: true }
});

module.exports = mongoose.model('HealthInfo', healthInfoSchema);