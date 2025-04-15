const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const infoRoutes = require('./routes/info');

const app = express();

app.use(cors());
app.use(express.json());
app.use('/api', infoRoutes);

mongoose.connect('mongodb+srv://uyu99876a:t7yuegnZKJhFra63@aw.4kg9zlm.mongodb.net/?retryWrites=true&w=majority&appName=aw', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB 已連線'));

app.listen(5000, () => console.log('伺服器運行於端口 5000'));