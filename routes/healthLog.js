const express = require('express');
const HealthLog = require('../models/HealthLog');
const router = express.Router();

// POST /api/health-log — 新增日誌
router.post('/', async (req, res) => {
  try {
    const log = await HealthLog.create(req.body);
    res.json(log);
  } catch (err) {
    console.error('保存健康日誌失敗：', err);
    res.status(500).json({ error: err.message });
  }
});

// GET /api/health-log — 取得所有日誌，時間倒序
router.get('/', async (req, res) => {
  try {
    const logs = await HealthLog.find().sort({ date: -1, time: -1 });
    res.json(logs);
  } catch (err) {
    console.error('獲取健康日誌失敗：', err);
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/health-log/:id —（如有需要再開啟）
router.delete('/:id', async (req, res) => {
  try {
    await HealthLog.findByIdAndDelete(req.params.id);
    res.json({ message: '刪除成功' });
  } catch (err) {
    console.error('刪除健康日誌失敗：', err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
