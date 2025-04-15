const express = require('express');
const router = express.Router();
const HealthInfo = require('../models/HealthInfo');

router.get('/health-info', async (req, res) => {
  try {
    const diseases = await HealthInfo.find();
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

router.get('/health-info/:name', async (req, res) => {
  try {
    const disease = await HealthInfo.findOne({ name: req.params.name });
    if (!disease) {
      return res.status(404).json({ error: '疾病未找到' });
    }
    res.json(disease);
  } catch (error) {
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

module.exports = router;