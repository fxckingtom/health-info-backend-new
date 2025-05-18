const express = require('express');
const HealthInfo = require('../models/HealthInfo');
const router = express.Router();

// GET /api/health-info
router.get('/', async (req, res) => {
  try {
    const infos = await HealthInfo.find();
    res.json(infos);
  } catch (err) {
    console.error('取得健康資訊錯誤：', err);
    res.status(500).json({ error: 'Failed to fetch health info' });
  }
});

// GET /api/health-info/:name
router.get('/:name', async (req, res) => {
  try {
    const info = await HealthInfo.findOne({ name: req.params.name });
    if (!info) return res.status(404).json({ error: '疾病未找到' });
    res.json(info);
  } catch (err) {
    console.error('查詢單筆健康資訊出錯：', err);
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
