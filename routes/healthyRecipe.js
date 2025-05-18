const express = require('express');
const HealthyRecipe = require('../models/HealthyRecipe');
const router = express.Router();

// GET /api/healthy-recipes — 全部食譜
router.get('/', async (req, res) => {
  try {
    const recipes = await HealthyRecipe.find();
    res.json(recipes);
  } catch (err) {
    console.error('取得食譜列表錯誤：', err);
    res.status(500).json({ error: 'Failed to fetch healthy recipes' });
  }
});

// GET /api/healthy-recipes/search?food=番茄 — 依食材過濾
router.get('/search', async (req, res) => {
  try {
    const { food } = req.query;
    if (!food) return res.status(400).json({ error: '請提供食物名稱' });

    const recipes = await HealthyRecipe.find({
      food: { $regex: new RegExp(food, 'i') }
    });

    if (!recipes.length) {
      return res.status(404).json({ error: '未找到該食物的食譜' });
    }
    res.json(recipes);
  } catch (err) {
    console.error('取得食譜時錯誤：', err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

module.exports = router;
