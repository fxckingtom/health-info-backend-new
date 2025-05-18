// models/HealthLog.js
const mongoose = require('mongoose');

const HealthLogSchema = new mongoose.Schema({
  bloodPressure:    { type: String,  required: true },
  weight:           { type: Number,  required: true },
  date:             { type: Date,    required: true },
  time:             { type: String,  required: true },
  medicationTaken:  { type: Boolean, default: false },
  mood:             { type: String,  default: '' },
}, {
  timestamps: true
});

// 如果已經有註冊過，就不要再 new model 了
module.exports = mongoose.models.HealthLog
  || mongoose.model('HealthLog', HealthLogSchema);

