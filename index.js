require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');

const app = express();

// 一定要最先使用 cors，允許所有來源
app.use(cors());
app.use(express.json());

// 環境變數
const openaiApiKey = process.env.OPENAI_API_KEY;
const mongodbUri = process.env.MONGODB_URI;

if (!openaiApiKey) {
  console.error('❌ OPENAI_API_KEY is not set');
  process.exit(1);
}
if (!mongodbUri) {
  console.error('❌ MONGODB_URI is not set');
  process.exit(1);
}

console.log('使用 OpenAI API Key:', openaiApiKey ? '已設置' : '未設置');
console.log('使用 MongoDB URI:', mongodbUri ? '已設置' : '未設置');

// 連線 MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB 已連線'))
  .catch(err => {
    console.error('❌ MongoDB 連線失敗:', err);
    process.exit(1);
  });

// 載入 Mongoose 模型
const HealthInfo = require('./models/HealthInfo');
const HealthyRecipe = require('./models/HealthyRecipe');

// 初始化 OpenAI\Client
const openai = new OpenAI({ apiKey: openaiApiKey });

// 根路由
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Health Info Backend API' });
});

// 聊天端點
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: '請提供訊息' });
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '你是一個健康資訊助手，專注於提供疾病相關資訊和建議。請使用繁體中文回答。' },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('❌ OpenAI API 錯誤:', error);
    res.status(500).json({ error: '無法處理聊天請求' });
  }
});

// 健康資訊查詢
app.get('/api/health-info', async (req, res) => {
  try {
    const infos = await HealthInfo.find();
    res.json(infos);
  } catch (err) {
    console.error('❌ 取得健康資訊錯誤:', err);
    res.status(500).json({ error: 'Failed to fetch health info' });
  }
});

// 全部健康食譜
app.get('/api/healthy-recipes', async (req, res) => {
  try {
    const recipes = await HealthyRecipe.find();
    res.json(recipes);
  } catch (err) {
    console.error('❌ 取得健康食譜錯誤:', err);
    res.status(500).json({ error: 'Failed to fetch healthy recipes' });
  }
});

// 根據食物篩選食譜
app.get('/api/healthy-recipes-by-food', async (req, res) => {
  try {
    const { food } = req.query;
    if (!food) {
      return res.status(400).json({ error: '請提供食物名稱' });
    }
    const recipes = await HealthyRecipe.find({
      food: { $regex: new RegExp(food, 'i') }
    });
    if (recipes.length === 0) {
      return res.status(404).json({ error: '未找到該食物的食譜' });
    }
    res.json(recipes);
  } catch (err) {
    console.error('❌ 取得食譜錯誤:', err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

// 靜態檔案處理 (SPA支持)
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
} else {
  console.warn('⚠️ Public directory not found, static file serving disabled.');
}

// 啟動服務
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 伺服器運行於端口 ${PORT}`));

