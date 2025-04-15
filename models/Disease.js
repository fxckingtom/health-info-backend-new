const mongoose = require('mongoose');

const diseaseSchema = new mongoose.Schema({
  name: { type: String, default: 'Diabetes' },
  diagnosis: { type: String, required: true }, // 'Positive' 或 'Negative'
  features: {
    pregnancies: Number,
    glucose: Number,
    bloodPressure: Number,
    skinThickness: Number,
    insulin: Number,
    bmi: Number,
    diabetesPedigree: Number,
    age: Number,
  },
  updatedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Disease', diseaseSchema);
