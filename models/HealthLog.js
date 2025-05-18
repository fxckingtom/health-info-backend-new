const mongoose = require('mongoose');
const HealthLogSchema = new mongoose.Schema({
  bloodPressure: String,
  weight: Number,
  date: Date,
});
module.exports = mongoose.model('HealthLog', HealthLogSchema);
