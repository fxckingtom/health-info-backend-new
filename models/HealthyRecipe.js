// models/HealthyRecipe.js
const mongoose = require('mongoose');

// 定義食譜資料結構
const healthyRecipeSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, '請輸入食譜名稱'],
      trim: true
    },
    category: {
      type: String,
      required: [true, '請選擇食譜分類'], // 範例：低醣、高蛋白、素食、無麩質
      enum: ['低醣', '高蛋白', '素食', '無麩質', '其他'],
      default: '其他'
    },
    cooking_time: {
      type: String,
      required: [true, '請輸入料理時間'],
      trim: true
    },
    difficulty: {
      type: String,
      required: [true, '請選擇難易度'],
      enum: ['簡單', '中等', '困難'],
      default: '中等'
    },
    servings: {
      type: Number,
      required: [true, '請輸入人份數'],
      min: [1, '至少要 1 人份']
    },
    ingredients: {
      type: [String],
      required: [true, '請輸入食材'],
      validate: {
        validator: arr => arr.length > 0,
        message: '至少需要一項食材'
      }
    },
    steps: {
      type: [String],
      required: [true, '請輸入料理步驟'],
      validate: {
        validator: arr => arr.length > 0,
        message: '至少需要一個步驟'
      }
    }
  },
  {
    timestamps: true // 自動加入 createdAt 和 updatedAt
  }
);

// 匯出模型
module.exports = mongoose.model('HealthyRecipe', healthyRecipeSchema);
