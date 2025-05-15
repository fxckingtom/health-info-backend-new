// index.js
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');

const app = express();

// 環境變數檢查
const { OPENAI_API_KEY, MONGODB_URI } = process.env;
if (!OPENAI_API_KEY) {
  console.error('❌ OPENAI_API_KEY 未設定');
  process.exit(1);
}
if (!MONGODB_URI) {
  console.error('❌ MONGODB_URI 未設定');
  process.exit(1);
}

// 全域 middleware
app.use(cors());               // 開放所有來源跨域
app.use(express.json());       // 解析 JSON body

// === inline Model 定義，取代 require('./models/XYZ') ===
const DiseaseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  tagline: String,
  description: String,
  handling: [String],
});
const Disease = mongoose.model('Disease', DiseaseSchema);

const HealthyRecipeSchema = new mongoose.Schema({
  name: String,
  food: String,
  suitable_diseases: [String],
  ingredients: [String],
  steps: [String],
  explanation: String,
});
const HealthyRecipe = mongoose.model('HealthyRecipe', HealthyRecipeSchema);

// === OpenAI 客戶端 ===
const openai = new OpenAI({ apiKey: OPENAI_API_KEY });

// 根路徑
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Health Info Backend API' });
});

// 聊天端點
app.post('/api/chat', async (req, res) => {
  const { message } = req.body;
  if (!message) {
    return res.status(400).json({ error: '請提供訊息' });
  }
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一個健康資訊助手，專注於提供疾病相關資訊和建議。' },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (err) {
    console.error('OpenAI API 錯誤:', err);
    res.status(500).json({ error: '無法處理聊天請求' });
  }
});

// 取得所有疾病資料（中文版）
app.get('/api/health-info', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch health info' });
  }
});

// 取得所有健康食譜
app.get('/api/healthy-recipes', async (req, res) => {
  try {
    const recipes = await HealthyRecipe.find();
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch healthy recipes' });
  }
});

// 以食物名稱篩選食譜
app.get('/api/healthy-recipes-by-food', async (req, res) => {
  const { food } = req.query;
  if (!food) {
    return res.status(400).json({ error: '請提供食物名稱' });
  }
  try {
    const recipes = await HealthyRecipe.find({ food });
    if (recipes.length === 0) {
      return res.status(404).json({ error: '未找到該食物的食譜' });
    }
    res.json(recipes);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch recipes by food' });
  }
});

// === 連線 MongoDB 並啟動伺服器 ===
mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('✅ MongoDB 已連線');
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`🚀 伺服器運行於 port ${PORT}`));
  })
  .catch(err => {
    console.error('❌ MongoDB 連線失敗:', err);
    process.exit(1);
  });
