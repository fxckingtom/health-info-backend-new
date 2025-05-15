// models/HealthyRecipe.js
const mongoose = require('mongoose');

const healthyRecipeSchema = new mongoose.Schema({
  name:              { type: String, required: true },
  food:              { type: String, required: true },
  suitable_diseases: { type: [String], required: true },
  ingredients:       { type: [String], required: true },
  steps:             { type: [String], required: true },
  explanation:       { type: String,   required: true }
});

module.exports = mongoose.model('HealthyRecipe', healthyRecipeSchema);
