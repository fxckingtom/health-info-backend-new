require('dotenv').config();


const express = require('express');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');
//const infoRoutes = require('./routes/info');

const app = express();

const openaiApiKey = process.env.OPENAI_API_KEY;
const mongodbUri = process.env.MONGODB_URI;

if (!openaiApiKey) {
  console.error('OPENAI_API_KEY is not set');
  process.exit(1);
}

if (!mongodbUri) {
  console.error('MONGODB_URI is not set');
  process.exit(1);
}

console.log('使用 OpenAI API Key:', openaiApiKey ? '已設置' : '未設置');
console.log('Using OpenAI API Key:', openaiApiKey);
console.log('Using MONGODB_URI:', mongodbUri ? '已設置' : '未設置');

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
//app.use('/api', infoRoutes);

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

app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


// 連線 MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB 已連線'))
  .catch((err) => {
    console.error('MongoDB 連線失敗:', err);
    process.exit(1); // 如果連線失敗，終止應用程式
  });

// 靜態文件處理（僅在 public 目錄存在時啟用）
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));

  // **只針對非 API 路由做處理**
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
} else {
  console.warn('Public directory not found, static file serving disabled.');
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log('伺服器運行於端口', PORT));
