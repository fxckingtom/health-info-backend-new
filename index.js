require('dotenv').config();

const express = require('express');
const cors = require('cors');
const path = require('path');
const fs = require('fs');
const mongoose = require('mongoose');
const { OpenAI } = require('openai');

const healthInfoRoutes = require('./routes/healthInfo'); // 引用路由模組
const HealthLogRoutes = require('./routes/healthLog');
const HealthyRecipeRoutes = require('./routes/healthyRecipe');

const app = express();

// Enable CORS for all routes
app.use(cors());
app.use(express.json());

// Environment variables
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

// Initialize OpenAI client
const openai = new OpenAI({ apiKey: openaiApiKey });

// Root endpoint
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Health Info Backend API' });
});

// Chat endpoint
app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    if (!message) {
      return res.status(400).json({ error: '請提供訊息' });
    }
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        {
          role: 'system',
          content: [
            '你是一個健康資訊助手，主要回答「疾病、營養、運動、心理」等健康領域問題；',
            '請使用繁體中文。',
            '當你回答時，**請使用以下結構**：',
            '1. 重點摘要：用 1～2 句話快速說明。',
            '2. 詳細說明：用 1～2 句話快速說明。'
          ].join('\n')
        },
        { role: 'user', content: message }
      ]
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API 錯誤:', error);
    res.status(500).json({ error: '無法處理聊天請求' });
  }
});

// Connect to MongoDB
mongoose.connect(mongodbUri, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('✅ MongoDB 已連線'))
  .catch(err => {
    console.error('❌ MongoDB 連線失敗：', err);
    process.exit(1);
  });

app.use('/api/health-info', healthInfoRoutes);           // 使用路由
app.use('/api/health-log',     HealthLogRoutes);
app.use('/api/healthy-recipes', HealthyRecipeRoutes);

// Serve static files if public folder exists
const publicPath = path.join(__dirname, 'public');
if (fs.existsSync(publicPath)) {
  app.use(express.static(publicPath));
  app.get(/^\/(?!api).*/, (req, res) => {
    res.sendFile(path.join(publicPath, 'index.html'));
  });
} else {
  console.warn('Public directory not found, static serving disabled.');
}

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 伺服器運行於端口 ${PORT}`));
