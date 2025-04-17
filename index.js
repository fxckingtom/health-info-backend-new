require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const infoRoutes = require('./routes/info');
const predictRoutes = require('./routes/predict');
const { OpenAI } = require('openai');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', infoRoutes);
app.use('/api', predictRoutes);


const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});


// 添加根路徑處理
app.get('/', (req, res) => {
  res.json({ message: 'Welcome to Health Info Backend API' });
});

app.post('/api/chat', async (req, res) => {
  try {
    const { message } = req.body;
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [
        { role: 'system', content: '我是一個健康資訊助手，專注於提供疾病相關資訊和建議。' },
        { role: 'user', content: message },
      ],
    });
    res.json({ reply: response.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API 錯誤:', error);
    res.status(500).json({ error: '無法處理聊天請求' });
  }
});

mongoose.connect('mongodb+srv://uyu99876a:t7yuegnZKJhFra63@aw.4kg9zlm.mongodb.net/?retryWrites=true&w=majority&appName=aw')
  .then(() => console.log('MongoDB 已連線'))
  .catch((err) => console.error('MongoDB 連線失敗:', err));

app.listen(process.env.PORT || 5000, () => console.log('伺服器運行於端口', process.env.PORT || 5000));