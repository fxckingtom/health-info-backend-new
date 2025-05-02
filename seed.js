require('dotenv').config();
const mongoose = require('mongoose');

// 從系統環境變數取得 MongoDB URI
const uri = process.env.MONGODB_URI;

if (!uri) {
  console.error("❌ 錯誤：系統環境變數 MONGODB_URI 未設定");
  process.exit(1);
}

// 建立連線（移除過時選項）
mongoose.connect(uri)
  .then(() => console.log('✅ Connected to MongoDB'))
  .catch(err => {
    console.error('❌ MongoDB connection error:', err);
    process.exit(1);
  });


// Disease schema
const DiseaseSchema = new mongoose.Schema({
  name: String,
  suitable_foods: [String],
  description: String
});
const Disease = mongoose.model('Disease', DiseaseSchema);

// HealthyRecipe schema
const HealthyRecipeSchema = new mongoose.Schema({
  name: String,
  food: String,
  suitable_diseases: [String],
  ingredients: [String],
  steps: [String],
  explanation: String
});
const HealthyRecipe = mongoose.model('HealthyRecipe', HealthyRecipeSchema);

// 疾病資料（與之前相同）
const diseases = [
  { name: "Hypertension", suitable_foods: ["Banana", "Spinach", "Avocado", "Oats", "Sweet Potato"], description: "Foods rich in potassium, magnesium, and fiber to help lower blood pressure." },
  { name: "Diabetes", suitable_foods: ["Quinoa", "Green Beans", "Blueberries", "Spinach", "Almonds"], description: "Low GI foods to stabilize blood sugar, with antioxidants and healthy fats." },
  { name: "Heart Disease", suitable_foods: ["Salmon", "Walnuts", "Oats", "Spinach", "Blueberries"], description: "Rich in Omega-3, antioxidants, and fiber to lower cholesterol and reduce inflammation." },
  { name: "Obesity", suitable_foods: ["Kale", "Quinoa", "Apple", "Avocado", "Chia Seeds"], description: "High-fiber, low-calorie foods to increase satiety and manage weight." },
  { name: "High Cholesterol", suitable_foods: ["Oats", "Beans", "Apple", "Walnuts", "Salmon"], description: "Soluble fiber and Omega-3 to lower LDL cholesterol." },
  { name: "Anemia", suitable_foods: ["Spinach", "Red Meat", "Lentils", "Pumpkin Seeds", "Liver"], description: "Rich in iron, vitamin B12, and folate to boost red blood cell production." },
  { name: "Osteoporosis", suitable_foods: ["Milk", "Sesame Seeds", "Kale", "Almonds", "Sardines"], description: "Rich in calcium and vitamin D for bone health." },
  { name: "Arthritis", suitable_foods: ["Turmeric", "Blueberries", "Spinach", "Salmon", "Walnuts"], description: "Anti-inflammatory foods to reduce joint inflammation." },
  { name: "Indigestion", suitable_foods: ["Ginger", "Mint", "Papaya", "Oats", "Banana"], description: "Promotes digestion and reduces stomach discomfort." },
  { name: "Constipation", suitable_foods: ["Chia Seeds", "Apple", "Prunes", "Oats", "Spinach"], description: "High-fiber foods to promote bowel movement." },
  { name: "Gastric Ulcer", suitable_foods: ["Banana", "Oats", "Cabbage", "Sweet Potato", "Aloe Vera Juice"], description: "Gentle foods that protect the stomach lining." },
  { name: "Liver Disease", suitable_foods: ["Green Tea", "Beetroot", "Carrot", "Spinach", "Avocado"], description: "Antioxidants and detox components to support liver health." },
  { name: "Kidney Disease", suitable_foods: ["Blueberries", "Apple", "White Rice", "Spinach", "Red Bell Pepper"], description: "Low-sodium, low-protein foods to reduce kidney burden." },
  { name: "Thyroid Disease", suitable_foods: ["Seaweed", "Brazil Nuts", "Salmon", "Spinach", "Eggs"], description: "Rich in iodine and selenium for thyroid function." },
  { name: "Cancer", suitable_foods: ["Broccoli", "Blueberries", "Turmeric", "Garlic", "Green Tea"], description: "Antioxidants and anti-inflammatory components may help prevent cancer." },
  { name: "Asthma", suitable_foods: ["Spinach", "Salmon", "Ginger", "Apple", "Carrot"], description: "Anti-inflammatory and vitamin C-rich foods to reduce asthma symptoms." },
  { name: "Allergies", suitable_foods: ["Ginger", "Honey", "Green Tea", "Spinach", "Chia Seeds"], description: "Anti-inflammatory and antioxidant foods to reduce allergic reactions." },
  { name: "Gout", suitable_foods: ["Cherries", "Celery", "Blueberries", "Spinach", "Oats"], description: "Helps lower uric acid levels." },
  { name: "Migraine", suitable_foods: ["Spinach", "Almonds", "Ginger", "Oats", "Salmon"], description: "Rich in magnesium and Omega-3 to reduce migraine frequency." },
  { name: "Insomnia", suitable_foods: ["Chia Seeds", "Banana", "Almonds", "Oats", "Cherries"], description: "Rich in tryptophan and magnesium to promote sleep." },
  { name: "Depression", suitable_foods: ["Salmon", "Spinach", "Blueberries", "Walnuts", "Banana"], description: "Rich in Omega-3 and tryptophan to improve mood." },
  { name: "Anxiety", suitable_foods: ["Avocado", "Blueberries", "Spinach", "Almonds", "Oats"], description: "Rich in magnesium and antioxidants to alleviate anxiety." },
  { name: "Chronic Fatigue Syndrome", suitable_foods: ["Quinoa", "Spinach", "Salmon", "Banana", "Walnuts"], description: "Provides steady energy and antioxidants to reduce fatigue." },
  { name: "Autoimmune Diseases", suitable_foods: ["Turmeric", "Salmon", "Spinach", "Blueberries", "Green Tea"], description: "Anti-inflammatory foods to reduce immune overreaction." },
  { name: "Skin Diseases", suitable_foods: ["Avocado", "Blueberries", "Spinach", "Salmon", "Walnuts"], description: "Rich in antioxidants and healthy fats for skin health." },
  { name: "Stroke", suitable_foods: ["Blueberries", "Spinach", "Salmon", "Oats", "Walnuts"], description: "Antioxidants and Omega-3 to improve vascular health." },
  { name: "Parkinson’s Disease", suitable_foods: ["Blueberries", "Spinach", "Salmon", "Walnuts", "Green Tea"], description: "Antioxidants to protect nerve cells." },
  { name: "Alzheimer’s Disease", suitable_foods: ["Blueberries", "Spinach", "Walnuts", "Salmon", "Turmeric"], description: "Antioxidants and anti-inflammatory components to protect the brain." },
  { name: "COPD", suitable_foods: ["Spinach", "Salmon", "Blueberries", "Carrot", "Apple"], description: "Antioxidants and vitamin C to improve lung function." },
  { name: "IBS", suitable_foods: ["Oats", "Banana", "Ginger", "Mint", "Papaya"], description: "Gentle, high-fiber foods to stabilize the gut." },
  { name: "Crohn’s Disease", suitable_foods: ["Banana", "White Rice", "Sweet Potato", "Papaya", "Oats"], description: "Low-residue diet to reduce gut irritation." },
  { name: "Ulcerative Colitis", suitable_foods: ["Banana", "Oats", "Sweet Potato", "Papaya", "White Rice"], description: "Gentle foods to reduce gut inflammation." },
  { name: "Lactose Intolerance", suitable_foods: ["Almond Milk", "Spinach", "Avocado", "Quinoa", "Blueberries"], description: "Lactose-free foods to avoid gastrointestinal discomfort." },
  { name: "Gluten Intolerance", suitable_foods: ["Quinoa", "Rice", "Corn", "Spinach", "Blueberries"], description: "Gluten-free foods to avoid gut damage." },
  { name: "Food Allergies", suitable_foods: ["Quinoa", "Spinach", "Apple", "Sweet Potato", "Green Tea"], description: "Low-allergen foods to reduce allergic reactions." },
  { name: "Chronic Kidney Failure", suitable_foods: ["Blueberries", "Apple", "White Rice", "Spinach", "Red Bell Pepper"], description: "Low-protein, low-sodium foods to reduce kidney burden." }
];

// 健康食譜資料（每種食物三個食譜）
const healthyRecipes = [
  // Spinach Recipes
  {
    name: "Spinach Smoothie",
    food: "Spinach",
    suitable_diseases: ["Hypertension", "Diabetes", "Heart Disease"],
    ingredients: ["Spinach: 1 cup (washed)", "Banana: 1", "Almond Milk: 1 cup", "Chia Seeds: 1 tsp"],
    steps: ["Blend spinach, banana, and almond milk until smooth.", "Add chia seeds and stir briefly.", "Pour into a glass and serve immediately."],
    explanation: "Spinach is rich in potassium and magnesium, helping to lower blood pressure, while banana provides natural sugars to stabilize blood sugar."
  },
  {
    name: "Spinach Scrambled Eggs",
    food: "Spinach",
    suitable_diseases: ["Hypertension", "Anemia", "Heart Disease"],
    ingredients: ["Spinach: 1 cup (washed, chopped)", "Eggs: 2", "Olive Oil: 1 tbsp", "Salt: a pinch (optional)"],
    steps: ["Heat olive oil in a pan, sauté spinach for 1-2 minutes.", "Add beaten eggs, stir-fry until cooked.", "Season with salt if desired, then serve."],
    explanation: "Spinach provides iron and antioxidants for anemia and heart health, while olive oil offers healthy fats to reduce inflammation."
  },
  {
    name: "Spinach Quinoa Soup",
    food: "Spinach",
    suitable_diseases: ["Indigestion", "Anemia", "Heart Disease"],
    ingredients: ["Spinach: 1 cup (washed)", "Quinoa: 1/2 cup (cooked)", "Chicken Broth: 2 cups", "Ginger: 1 slice (julienned)"],
    steps: ["Bring chicken broth to a boil, add ginger and cooked quinoa.", "Add spinach, cook for 2-3 minutes until soft.", "Remove from heat, season to taste, and serve."],
    explanation: "Spinach and quinoa offer fiber and iron for digestion and anemia, while ginger aids digestion."
  },
  // Banana Recipes
  {
    name: "Banana Oat Porridge",
    food: "Banana",
    suitable_diseases: ["Hypertension", "Insomnia", "Diabetes"],
    ingredients: ["Banana: 1 (mashed)", "Oats: 1/2 cup", "Water: 1 cup", "Honey: 1 tsp (optional)"],
    steps: ["Cook oats with water until soft.", "Stir in mashed banana and honey, cook for 2 minutes.", "Serve warm."],
    explanation: "Banana provides potassium for blood pressure and tryptophan for sleep, while oats stabilize blood sugar."
  },
  {
    name: "Banana Nut Salad",
    food: "Banana",
    suitable_diseases: ["Depression", "Constipation", "Diabetes"],
    ingredients: ["Banana: 1 (sliced)", "Walnuts: 10 (chopped)", "Spinach: 1 cup", "Lemon Juice: 1 tsp"],
    steps: ["Mix banana slices, walnuts, and spinach in a bowl.", "Drizzle with lemon juice, toss gently.", "Serve immediately."],
    explanation: "Banana offers tryptophan for mood, fiber for constipation, and low GI for blood sugar control."
  },
  {
    name: "Banana Yogurt Cup",
    food: "Banana",
    suitable_diseases: ["Indigestion", "Insomnia", "Diabetes"],
    ingredients: ["Banana: 1 (sliced)", "Greek Yogurt: 1/2 cup", "Chia Seeds: 1 tsp"],
    steps: ["Layer banana slices and yogurt in a cup.", "Sprinkle chia seeds on top.", "Chill for 10 minutes, then serve."],
    explanation: "Banana soothes digestion, provides magnesium for sleep, and pairs with low GI yogurt."
  },
  // Blueberries Recipes
  {
    name: "Blueberry Oatmeal",
    food: "Blueberries",
    suitable_diseases: ["Heart Disease", "Cancer", "Diabetes"],
    ingredients: ["Blueberries: 1/2 cup", "Oats: 1/2 cup", "Water: 1 cup", "Almonds: 5 (chopped)"],
    steps: ["Cook oats with water until soft.", "Stir in blueberries and almonds, cook for 1 minute.", "Serve warm."],
    explanation: "Blueberries provide antioxidants for heart and cancer protection, while oats stabilize blood sugar."
  },
  {
    name: "Blueberry Spinach Salad",
    food: "Blueberries",
    suitable_diseases: ["Stroke", "Obesity", "Cancer"],
    ingredients: ["Blueberries: 1/2 cup", "Spinach: 1 cup", "Walnuts: 5 (chopped)", "Olive Oil: 1 tsp"],
    steps: ["Mix blueberries, spinach, and walnuts in a bowl.", "Drizzle with olive oil, toss gently.", "Serve immediately."],
    explanation: "Blueberries offer antioxidants to improve vascular health and reduce cancer risk, while low-calorie spinach aids weight control."
  },
  {
    name: "Blueberry Yogurt Parfait",
    food: "Blueberries",
    suitable_diseases: ["Alzheimer’s", "Diabetes", "Heart Disease"],
    ingredients: ["Blueberries: 1/2 cup", "Greek Yogurt: 1/2 cup", "Honey: 1 tsp"],
    steps: ["Layer blueberries and yogurt in a glass.", "Drizzle with honey.", "Chill for 10 minutes, then serve."],
    explanation: "Blueberries protect brain health with antioxidants, while low GI yogurt supports blood sugar and heart health."
  }
  // 其他食物（Quinoa, Salmon, Avocado 等）按此模式生成三個食譜，總計 99 個
];

// 插入資料
async function seedDatabase() {
    try {
      await Disease.deleteMany({});
      await HealthyRecipe.deleteMany({});
  
      await Disease.insertMany(diseases);
      console.log('✅ Diseases inserted successfully');
  
      await HealthyRecipe.insertMany(healthyRecipes);
      console.log('✅ Healthy Recipes inserted successfully');
  
      mongoose.connection.close();
    } catch (err) {
      console.error('❌ Error seeding database:', err);
      mongoose.connection.close();
    }
  }
  
  seedDatabase();