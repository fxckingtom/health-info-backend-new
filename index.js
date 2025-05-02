require('dotenv').config();
const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');
const infoRoutes = require('./routes/info');
const app = express();

const openaiApiKey = process.env.OPENAI_API_KEY;

if (!openaiApiKey) {
    console.error('OPENAI_API_KEY is not set');
    process.exit(1);
}

// 使用 openaiApiKey 與 OpenAI API 交互
console.log('使用 OpenAI API Key:', process.env.OPENAI_API_KEY ? '已設置' : '未設置');
console.log('Using OpenAI API Key:', openaiApiKey);
app.use(cors({
  origin: ['https://fxckingtom.github.io', 'http://localhost:3000']
}));
app.use(express.json());

// 確保 OpenAI 客戶端正確初始化
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// 根路徑處理
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Health Info Backend API' });
});

// 聊天端點（確保在其他路由之前）
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: '請提供訊息' });
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一個健康資訊助手，專注於提供疾病相關資訊和建議。' },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API 錯誤:', error);
    res.status(500).json({ error: '無法處理聊天請求' });
  }
});

// 其他路由
app.use('/api', infoRoutes);

const DiseaseSchema = new mongoose.Schema({
  name: String,
  suitable_foods: [String],
  description: String
});
const Disease = mongoose.model('Disease', DiseaseSchema);

const HealthyRecipeSchema = new mongoose.Schema({
  name: String,
  food: String,
  suitable_diseases: [String],
  ingredients: [String],
  steps: [String],
  explanation: String
});
const HealthyRecipe = mongoose.model('HealthyRecipe', HealthyRecipeSchema);

app.get('/api/health-info', async (req, res) => {
  try {
    const diseases = await Disease.find();
    res.json(diseases);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch health info' });
  }
});

app.get('/api/healthy-recipes', async (req, res) => {
  try {
    const recipes = await HealthyRecipe.find();
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch healthy recipes' });
  }
});

app.get('/api/healthy-recipes-by-food', async (req, res) => {
  try {
    const { food } = req.query;
    if (!food) {
      return res.status(400).json({ error: '請提供食物名稱' });
    }
    const recipes = await HealthyRecipe.find({ food });
    if (recipes.length === 0) {
      return res.status(404).json({ error: '未找到該食物的食譜' });
    }
    res.json(recipes);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch recipes by food' });
  }
});

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 已連線'))
  .catch((err) => console.error('MongoDB 連線失敗:', err));

  const publicPath = path.join(__dirname, 'public');

  if (fs.existsSync(publicPath)) {
    app.use(express.static(publicPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(publicPath, 'index.html'));
    });
  }

app.listen(process.env.PORT || 5000, () => console.log('伺服器運行於端口', process.env.PORT || 5000));