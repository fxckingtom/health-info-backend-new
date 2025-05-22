const express = require('express'); 
const HealthyRecipe = require('../models/HealthyRecipe');
const router = express.Router();

// GET /api/healthy-recipes — 全部食譜
router.get('/', async (req, res) => {
  try {
    const recipes = await HealthyRecipe.find().lean();
    res.json(recipes);
  } catch (err) {
    console.error('取得食譜列表錯誤：', err);
    res.status(500).json({ error: 'Failed to fetch healthy recipes' });
  }
});

// GET /api/healthy-recipes/search?q=關鍵字 — 多欄位模糊搜尋
router.get('/search', async (req, res) => {
  try {
    const { q } = req.query;
    if (!q) {
      return res.status(400).json({ error: '請提供搜尋關鍵字' });
    }

    const regex = new RegExp(q, 'i');
    const num = parseInt(q, 10);

    // 組成一個 $or 條件陣列
    const orConditions = [
      { name:      { $regex: regex } },
      { category:  { $regex: regex } },
      { cooking_time: { $regex: regex } },
      { difficulty:   { $regex: regex } },
      { ingredients: { $elemMatch: { $regex: regex } } }
    ];

    // 如果輸入可轉成數字，就加入 servings 比對
    if (!isNaN(num)) {
      orConditions.push({ servings: num });
    }

    const recipes = await HealthyRecipe.find({ $or: orConditions }).lean();

    if (!recipes.length) {
      return res.status(404).json({ error: '找不到符合搜尋條件的食譜' });
    }

    res.json(recipes);
  } catch (err) {
    console.error('搜尋食譜時錯誤：', err);
    res.status(500).json({ error: '伺服器錯誤' });
  }
});

module.exports = router;
