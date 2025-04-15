const mongoose = require('mongoose');
const csv = require('csv-parser');
const fs = require('fs');
const path = require('path');

mongoose.connect('mongodb://localhost:27017/healthinfo')
  .then(() => console.log('MongoDB 已連線'))
  .catch((err) => console.error('連線錯誤:', err));

const Disease = require('./models/Disease');

async function importKaggleData() {
  const results = [];

  fs.createReadStream(path.join(__dirname, 'diabetes.csv'))
    .pipe(csv())
    .on('data', (row) => {
      const glucose = parseFloat(row.Glucose) || 0;
      const bmi = parseFloat(row.BMI) || 0;
      if (glucose === 0 || bmi === 0) return; // 跳過無效數據

      results.push({
        name: 'Diabetes',
        diagnosis: row.Outcome === '1' ? 'Positive' : 'Negative',
        features: {
          pregnancies: parseInt(row.Pregnancies),
          glucose: glucose,
          bloodPressure: parseFloat(row.BloodPressure),
          skinThickness: parseFloat(row.SkinThickness),
          insulin: parseFloat(row.Insulin),
          bmi: bmi,
          diabetesPedigree: parseFloat(row.DiabetesPedigreeFunction),
          age: parseInt(row.Age),
        },
        updatedAt: new Date(),
      });
    })
    .on('end', async () => {
      try {
        await Disease.deleteMany({});
        await Disease.insertMany(results);
        console.log(`成功導入 ${results.length} 筆數據`);
        mongoose.connection.close();
      } catch (err) {
        console.error('導入錯誤:', err);
        mongoose.connection.close();
      }
    });
}

importKaggleData();