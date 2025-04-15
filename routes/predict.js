const express = require('express');
const { PythonShell } = require('python-shell');
const router = express.Router();

router.post('/predict', async (req, res) => {
  const { glucose, bmi, age, bloodPressure, familyHistory } = req.body;

  if (!age || typeof familyHistory === 'undefined') {
    return res.status(400).json({ error: '請提供年齡和家族史' });
  }

  const options = {
    mode: 'text',
    pythonOptions: ['-u'],
    scriptPath: path.join(__dirname),  // 指向 predict.py 所在資料夾
    args: [
      String(glucose || '100'),
      String(bmi || '25'),
      String(age),
      String(bloodPressure || '70'),
      familyHistory ? '1' : '0'   // ✅ 這裡是 '1' 或 '0'
    ]
  };

  PythonShell.run('predict.py', options, (err, results) => {
    if (err) {
      console.error('Python 錯誤：', err);
      return res.status(500).json({ error: '預測失敗' });
    }

    try {
      const output = JSON.parse(results[0]);  // 假設 Python 回傳 JSON
      return res.json(output);
    } catch (parseErr) {
      console.error('結果解析失敗：', parseErr);
      return res.status(500).json({ error: '結果解析失敗' });
    }
  });
});

module.exports = router;
