// models/HealthyRecipe.js
const mongoose = require('mongoose');

const healthyRecipeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  category: {
    type: String,    // 例如：'低醣'、'高蛋白'、'素食'、'無麩質'
    required: true
  },
  cooking_time: {
    type: String,    // 例如：'2 小時'、'30 分鐘'
    required: true
  },
  difficulty: {
    type: String,    // 例如：'簡單'、'中等'、'困難'
    required: true
  },
  servings: {
    type: Number,    // 幾人份
    required: true
  },
  ingredients: {
    type: [String],  // 每項食材及份量
    required: true
  },
  steps: {
    type: [String],  // 每個步驟
    required: true
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('HealthyRecipe', healthyRecipeSchema);
