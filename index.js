require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const { OpenAI } = require('openai');
const infoRoutes = require('./routes/info');

const app = express();

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

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('MongoDB 已連線'))
  .catch((err) => console.error('MongoDB 連線失敗:', err));

app.listen(process.env.PORT || 5000, () => console.log('伺服器運行於端口', process.env.PORT || 5000));