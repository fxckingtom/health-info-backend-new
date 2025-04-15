const express = require('express');
const Disease = require('../models/Disease');
const router = express.Router();

router.get('/diseases', async (req, res) => {
  try {
    const diseases = await Disease.find().limit(50);
    res.json(diseases);
  } catch (error) {
    console.error('獲取錯誤:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/diseases/:diagnosis', async (req, res) => {
  try {
    const diseases = await Disease.find({ diagnosis: req.params.diagnosis });
    if (!diseases.length) return res.status(404).json({ error: '無匹配記錄' });
    res.json(diseases);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;