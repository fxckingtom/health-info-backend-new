require('dotenv').config();
const mongoose = require('mongoose');

const HealthyRecipe = require('./models/HealthyRecipe');

async function seedRecipes() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');

    await HealthyRecipe.deleteMany({});
    console.log('🗑️ 已清空 HealthyRecipe 集合');

const healthyRecipesZH = [
  {
    name: '檸檬香煎鮭魚',
    category: '低醣',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '鮭魚排：2片（約150g/片）',
      '檸檬：1/2顆，切片',
      '橄欖油：1大匙',
      '海鹽：1/2茶匙',
      '黑胡椒：1/4茶匙',
      '蒜末：1瓣'
    ],
    steps: [
      '鮭魚排吸乾水分，抹上海鹽與黑胡椒。',
      '熱鍋加入橄欖油，小火爆香蒜末30秒。',
      '中火放入鮭魚排，每面煎4–5分鐘至金黃。',
      '加入檸檬片同煎1分鐘，增香。',
      '擺盤並淋上鍋中檸檬汁即可。'
    ]
  },
  {
    name: '蒜香牛肉捲心菜',
    category: '低醣',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '牛肉片：200g',
      '高麗菜葉：6片',
      '蒜末：1瓣',
      '橄欖油：1大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '高麗菜葉川燙1分鐘，撈起瀝乾。',
      '牛肉片抹鹽與胡椒，包入高麗菜葉中。',
      '平底鍋熱油，放入肉捲煎至兩面微焦。',
      '起鍋前淋上蒜末香油拌勻即可。'
    ]
  },
  {
    name: '奶油菠菜雞肉卷',
    category: '低醣',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞腿肉排：2片',
      '菠菜：一把',
      '無鹽奶油：10g',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '雞腿肉拍平，抹鹽與胡椒醃10分鐘。',
      '菠菜川燙後擠乾水分，包入雞排內。',
      '平底鍋中小火溶奶油，放入雞肉卷煎至全熟。',
      '切段擺盤即可。'
    ]
  },
  {
    name: '蔥香豬里肌',
    category: '低醣',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '豬里肌肉：2片',
      '蔥花：2大匙',
      '醬油：1大匙',
      '芝麻油：1茶匙',
      '蒜末：1瓣'
    ],
    steps: [
      '豬肉抹醬油、芝麻油、蒜末與少許鹽醃5分鐘。',
      '熱鍋乾煎豬肉兩面至熟透。',
      '關火前撒上蔥花，利用餘溫燜1分鐘。',
      '切片擺盤即可。'
    ]
  },
  {
    name: '檸檬草香雞翅',
    category: '低醣',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '雞翅：8支',
      '檸檬草：2支切段',
      '魚露：1大匙',
      '蒜末：2瓣',
      '黑胡椒：1/2茶匙'
    ],
    steps: [
      '雞翅抹魚露、蒜末、黑胡椒醃20分鐘。',
      '烤箱預熱180°C，烤25分鐘。',
      '中途翻面再塗抹檸檬草香氣更佳。',
      '烤至金黃後取出，靜置5分鐘後享用。'
    ]
  },
  {
    name: '香煎鱸魚排',
    category: '低醣',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '鱸魚排：2片',
      '橄欖油：1大匙',
      '海鹽、黑胡椒：各適量',
      '檸檬：1/2顆'
    ],
    steps: [
      '魚排抹鹽與黑胡椒醃5分鐘。',
      '中火熱鍋加油，煎每面約4分鐘。',
      '擠上檸檬汁，擺盤即成。'
    ]
  },
  {
    name: '蒸蛋菠菜盅',
    category: '低醣',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '雞蛋：2顆',
      '菠菜：一把',
      '水：50ml',
      '海鹽：1/4茶匙'
    ],
    steps: [
      '菠菜鋪小碗底，備用。',
      '蛋打散拌入水與鹽。',
      '倒入蛋液於菠菜盅中，蒸10分鐘至凝固。',
      '稍涼後即可食用。'
    ]
  },
  {
    name: '蒜辣蘆筍牛柳',
    category: '低醣',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '牛柳：200g',
      '蘆筍：8根',
      '蒜末：1瓣',
      '辣椒末：1/2茶匙',
      '橄欖油：1大匙'
    ],
    steps: [
      '牛柳抹鹽胡椒醃5分鐘。',
      '熱鍋爆香蒜末與辣椒末。',
      '加入牛柳快炒至半熟。',
      '放入蘆筍拌炒1–2分鐘，盛盤即可。'
    ]
  },
  {
    name: '香烤檸香花椰',
    category: '低醣',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 3,
    ingredients: [
      '花椰菜：300g，切小朵',
      '檸檬皮屑：1茶匙',
      '橄欖油：1.5大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '花椰菜拌橄欖油、鹽與胡椒。',
      '烤箱200°C烤15分鐘。',
      '取出撒檸檬皮屑，再烤5分鐘。',
      '取出稍涼享用。'
    ]
  },
  {
    name: '泰式酸辣海鮮湯',
    category: '低醣',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '綜合海鮮：200g',
      '香茅：1支切段',
      '檸檬葉：4片',
      '椰奶：100ml',
      '辣椒：2根'
    ],
    steps: [
      '水煮滾加入香茅與檸檬葉。',
      '放入海鮮煮熟。',
      '倒入椰奶與辣椒煮1分鐘。',
      '調味後關火即可。'
    ]
  },
  {
    name: '酪梨鮪魚沙拉',
    category: '低醣',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '酪梨：1顆切丁',
      '鮪魚罐頭：1罐',
      '洋蔥丁：2大匙',
      '檸檬汁：1大匙',
      '橄欖油：1茶匙'
    ],
    steps: [
      '酪梨丁拌入洋蔥與檸檬汁。',
      '加入鮪魚與橄欖油拌勻。',
      '冷藏10分鐘後食用更佳。'
    ]
  },
  {
    name: '香煎紫蘇雞腿排',
    category: '低醣',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞腿排：2片',
      '紫蘇葉：6片',
      '醬油：1大匙',
      '味醂：1大匙',
      '蒜泥：1瓣'
    ],
    steps: [
      '雞腿排抹醬油、味醂與蒜泥醃15分鐘。',
      '熱鍋煎雞皮面至酥脆。',
      '翻面加入紫蘇葉續煎3分鐘。',
      '切片擺盤即可。'
    ]
  },
  {
    name: '松露拌蛋花',
    category: '低醣',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '雞蛋：3顆',
      '松露油：1茶匙',
      '海鹽：1/4茶匙',
      '香蔥：少許'
    ],
    steps: [
      '蛋打散加鹽。',
      '鍋中滑蛋至半熟。',
      '淋上松露油，撒香蔥。'
    ]
  },
  {
    name: '香辣蝦仁炒蛋',
    category: '低醣',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '蝦仁：150g',
      '雞蛋：3顆',
      '辣椒醬：1大匙',
      '蔥花：1大匙',
      '鹽：少許'
    ],
    steps: [
      '蝦仁煎至變色。',
      '倒入蛋液快炒。',
      '加入辣椒醬與鹽調味。',
      '撒蔥花即可。'
    ]
  },
  {
    name: '酸奶黃瓜杯',
    category: '低醣',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '黃瓜：1根切丁',
      '希臘優格：100g',
      '蒜末：1瓣',
      '薄荷葉：少許',
      '海鹽：少許'
    ],
    steps: [
      '黃瓜丁拌入優格與蒜末。',
      '加鹽調味後裝杯。',
      '頂部擺薄荷葉。'
    ]
  },
  {
    name: '迷迭香烤羊排',
    category: '低醣',
    cooking_time: '45 分鐘',
    difficulty: '困難',
    servings: 4,
    ingredients: [
      '羊小排：8根',
      '迷迭香：3枝',
      '橄欖油：1.5大匙',
      '蒜末：2瓣',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '羊排抹油、鹽、胡椒與蒜末。',
      '撒上迷迭香。',
      '烤箱200°C烤30分鐘。',
      '靜置5分鐘後切享用。'
    ]
  },
  {
    name: '青醬烤花枝',
    category: '低醣',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '花枝圈：200g',
      '青醬：2大匙',
      '檸檬片：2片',
      '橄欖油：1茶匙'
    ],
    steps: [
      '花枝拌青醬。',
      '平底鍋煎至熟。',
      '擺檸檬片增香。'
    ]
  },
  {
    name: '涼拌海帶芽',
    category: '低醣',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '海帶芽：50g',
      '米醋：1大匙',
      '芝麻油：1茶匙',
      '蒜末：1瓣'
    ],
    steps: [
      '海帶芽泡水洗淨。',
      '拌入醋、芝麻油與蒜末。',
      '冷藏10分鐘後食用。'
    ]
  },
  {
    name: '椰香花椰拌雞',
    category: '低醣',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '花椰菜：200g',
      '雞胸肉：150g',
      '椰奶：50ml',
      '鹽、胡椒：少許'
    ],
    steps: [
      '花椰菜川燙。',
      '雞胸煎熟切絲。',
      '拌入椰奶調味。'
    ]
  },
  {
    name: '杏仁奶昔',
    category: '低醣',
    cooking_time: '5 分鐘',
    difficulty: '簡單',
    servings: 1,
    ingredients: [
      '無糖杏仁奶：200ml',
      '冰塊：適量',
      '香草精：幾滴'
    ],
    steps: [
      '所有材料放入果汁機攪打。',
      '倒出即可享用。'
    ]
  },
  {
    name: '鮮蝦菠菜盅',
    category: '低醣',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '菠菜：一把',
      '蝦仁：100g',
      '蒜末：1瓣',
      '海鹽：少許'
    ],
    steps: [
      '菠菜鋪碗底。',
      '蝦仁爆炒至變色。',
      '放上菠菜，撒蒜末拌勻。'
    ]
  },
  {
    name: '香煎干貝蘆筍',
    category: '低醣',
    cooking_time: '15 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '干貝：6顆',
      '蘆筍：8根',
      '橄欖油：1大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '干貝抹鹽煎2分鐘/面。',
      '蘆筍快炒至熟。',
      '合併擺盤即可。'
    ]
  },
  {
    name: '柚香生魚片',
    category: '低醣',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '鮭魚生魚片：100g',
      '柚子：1/2顆取汁',
      '海鹽：少許'
    ],
    steps: [
      '生魚片擺盤。',
      '淋上柚子汁。',
      '撒少許海鹽。'
    ]
  },
  {
    name: '五香烤雞腿',
    category: '低醣',
    cooking_time: '50 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞腿：2支',
      '五香粉：1茶匙',
      '醬油：1大匙',
      '蜜糖：1茶匙'
    ],
    steps: [
      '雞腿抹五香粉與醬油，醃20分鐘。',
      '烤箱180°C烤35分鐘。',
      '刷蜜糖再烤5分鐘。'
    ]
  },
  {
    name: '義式香料煎豬排',
    category: '低醣',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '豬排：2片',
      '義式香料混合：1茶匙',
      '橄欖油：1大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '豬排抹鹽、黑胡椒與義式香料醃10分鐘。',
      '熱鍋加油煎每面約5分鐘。',
      '靜置2分鐘後切片享用。'
    ]
  },
  {
    name: '香煎雞胸沙拉堡',
    category: '高蛋白',
    cooking_time: '30 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '去皮雞胸：2片（約200g/片）',
      '全麥漢堡麵包：2個',
      '生菜：4片',
      '小番茄：6顆，對切',
      '低脂優格醬：2大匙',
      '橄欖油：1茶匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '雞胸抹鹽、胡椒，平底鍋中火煎5–6分鐘至熟。',
      '漢堡麵包對切，放烤箱微烤1分鐘。',
      '底層鋪生菜、小番茄，放上切片雞胸。',
      '抹上優格醬，蓋上麵包，對切即可。'
    ]
  },
  {
    name: '香烤牛肉捲餅',
    category: '高蛋白',
    cooking_time: '35 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '牛里肌薄片：200g',
      '全麥捲餅皮：2張',
      '洋蔥絲：1/4顆',
      '青椒絲：1/2顆',
      '低脂起司絲：50g',
      '橄欖油：1大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '牛肉片抹鹽、胡椒，煎熟後切條。',
      '洋蔥、青椒快炒至軟。',
      '捲餅皮上鋪牛肉、蔬菜與起司。',
      '捲起後放入烤箱180°C烤5分鐘，至起司融化。'
    ]
  },
  {
    name: '蜜烤豬里肌排',
    category: '高蛋白',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '豬里肌排：2片（約180g/片）',
      '蜂蜜：1.5大匙',
      '醬油：1大匙',
      '蒜末：1瓣',
      '黑胡椒：1/4茶匙'
    ],
    steps: [
      '豬排抹醬油、蜂蜜、蒜末、胡椒醃20分鐘。',
      '烤箱預熱180°C，烤25分鐘。',
      '翻面再烤10分鐘至金黃。',
      '取出靜置5分鐘切片。'
    ]
  },
  {
    name: '煙燻鮭魚班尼迪克蛋',
    category: '高蛋白',
    cooking_time: '20 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '煙燻鮭魚片：100g',
      '英式瑪芬：2個',
      '水波蛋：2顆',
      '荷蘭醬：4大匙',
      '檸檬汁：1茶匙'
    ],
    steps: [
      '英式瑪芬對半切，微烤1分鐘。',
      '擺上鮭魚片，放水波蛋。',
      '淋荷蘭醬，灑少許檸檬汁。',
      '立刻享用。'
    ]
  },
  {
    name: '韓式豆腐肉末碗',
    category: '高蛋白',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '絹豆腐：1盒（300g）',
      '絞肉：150g',
      '韓式辣醬：1大匙',
      '蒜末：1瓣',
      '蔥花：1大匙',
      '香油：1茶匙'
    ],
    steps: [
      '絞肉炒熟，加入蒜末與辣醬拌炒。',
      '豆腐切塊鋪碗底。',
      '將肉末淋在豆腐上，淋香油，撒蔥花。'
    ]
  },
  {
    name: '芝士焗雞翅',
    category: '高蛋白',
    cooking_time: '45 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '雞翅：8支',
      '義式綜合香料：1茶匙',
      '橄欖油：1大匙',
      '馬蘇里拉起司：80g',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '雞翅抹油與香料醃20分鐘。',
      '烤箱200°C烤20分鐘。',
      '取出撒起司，再烤10分鐘至金黃。'
    ]
  },
  {
    name: '牛肉藜麥碗',
    category: '高蛋白',
    cooking_time: '30 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '藜麥：1/2杯（煮熟）',
      '牛絞肉：150g',
      '菠菜：一把',
      '番茄丁：4大匙',
      '橄欖油：1大匙',
      '鹽、黑胡椒：適量'
    ],
    steps: [
      '牛絞肉炒熟調味。',
      '菠菜川燙備用。',
      '將藜麥、牛肉、菠菜、番茄交疊擺碗中。'
    ]
  },
  {
    name: '水煮蛋蝦仁帕尼尼',
    category: '高蛋白',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '帕尼尼麵包：2片',
      '蝦仁：100g',
      '水煮蛋：2顆切片',
      '低脂起司：2片',
      '橄欖油：1茶匙'
    ],
    steps: [
      '蝦仁快炒至熟並調味。',
      '帕尼尼夾入蛋片、蝦仁與起司。',
      '烤盤或平底鍋壓煎至麵包酥脆。'
    ]
  },
  {
    name: '香料烤羊肩',
    category: '高蛋白',
    cooking_time: '2 小時',
    difficulty: '困難',
    servings: 4,
    ingredients: [
      '羊肩排：800g',
      '迷迭香：2枝',
      '蒜末：3瓣',
      '橄欖油：2大匙',
      '鹽、黑胡椒：適量'
    ],
    steps: [
      '羊肩與蒜末、香料、油、鹽胡椒醃過夜。',
      '烤箱150°C慢烤1.5小時。',
      '轉200°C再烤15分鐘上色。',
      '靜置10分鐘後切片。'
    ]
  },
  {
    name: '味噌醬烤鯖魚',
    category: '高蛋白',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '鯖魚切片：2片',
      '味噌：1大匙',
      '味醂：1大匙',
      '糖：1茶匙'
    ],
    steps: [
      '味噌、味醂、糖拌成醬。',
      '抹於魚排，醃15分鐘。',
      '烤箱180°C烤12分鐘。'
    ]
  },
  {
    name: '牛肉蔬菜串',
    category: '高蛋白',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 4,
    ingredients: [
      '牛肉塊：200g',
      '彩椒塊：適量',
      '洋蔥塊：適量',
      '醬油：1大匙',
      '橄欖油：1大匙'
    ],
    steps: [
      '串起牛肉、蔬菜並抹油醬。',
      '平底鍋或烤架煎烤每面3–4分鐘。'
    ]
  },
  {
    name: '墨西哥雞肉薄餅',
    category: '高蛋白',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞胸切丁：200g',
      '墨西哥香料粉：1大匙',
      '薄餅皮：2張',
      '生菜絲：適量',
      '莎莎醬：2大匙'
    ],
    steps: [
      '雞肉拌香料粉煎熟。',
      '薄餅鋪餡料，捲起。'
    ]
  },
  {
    name: '蒜香牛腩燉鍋',
    category: '高蛋白',
    cooking_time: '2 小時',
    difficulty: '困難',
    servings: 4,
    ingredients: [
      '牛腩：500g',
      '蒜頭：5瓣',
      '紅酒：100ml',
      '蔬菜高湯：300ml',
      '鹽、胡椒：適量'
    ],
    steps: [
      '牛腩切塊川燙。',
      '鍋中爆香蒜頭，加入牛腩與紅酒燉煮1小時。',
      '加高湯再燉1小時，調味後即可。'
    ]
  },
  {
    name: '黑椒豬肉蘆筍炒',
    category: '高蛋白',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '豬里肌：150g切片',
      '蘆筍：8根',
      '黑胡椒醬：1大匙',
      '蒜末：1瓣'
    ],
    steps: [
      '豬肉與蒜末拌炒至半熟。',
      '加入蘆筍與醬炒2分鐘。'
    ]
  },
  {
    name: '羅勒番茄雞腿',
    category: '高蛋白',
    cooking_time: '35 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞腿排：2片',
      '番茄：1顆切丁',
      '新鮮羅勒葉：10片',
      '橄欖油：1大匙'
    ],
    steps: [
      '雞腿排煎至金黃。',
      '加入番茄丁與羅勒拌炒3分鐘。'
    ]
  },
  {
    name: '香煎鴨胸佐莓果醬',
    category: '高蛋白',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '鴨胸：2塊（約150g/塊）',
      '莓果醬：2大匙',
      '鹽、黑胡椒：適量'
    ],
    steps: [
      '鴨胸脂面切格，抹鹽胡椒煎至酥脆。',
      '反面煎3分鐘，盛盤淋上莓果醬。'
    ]
  },
  {
    name: '蛋白炒蛋蔬菜',
    category: '高蛋白',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '蛋白：6顆份量',
      '蘑菇絲：50g',
      '菠菜：一把',
      '鹽：少許'
    ],
    steps: [
      '蛋白打散。',
      '蔬菜快炒，倒入蛋白拌至凝固。'
    ]
  },
  {
    name: '三文魚拌麥片',
    category: '高蛋白',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 1,
    ingredients: [
      '三文魚罐頭：1罐',
      '即食燕麥：50g',
      '希臘優格：2大匙'
    ],
    steps: [
      '燕麥與優格拌勻。',
      '鋪上三文魚罐頭即可。'
    ]
  },
  {
    name: '豆漿豆腐蛋白碗',
    category: '高蛋白',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 1,
    ingredients: [
      '無糖豆漿：200ml',
      '嫩豆腐：150g',
      '蜜糖：1茶匙'
    ],
    steps: [
      '豆漿加熱後倒入豆腐。',
      '淋蜜糖調味。'
    ]
  },
  {
    name: '火雞肉蔬菜炒麵',
    category: '高蛋白',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '細麵：150g',
      '火雞肉絲：150g',
      '胡蘿蔔絲：4大匙',
      '青椒絲：4大匙',
      '醬油：1大匙'
    ],
    steps: [
      '麵煮熟撈起。',
      '火雞肉炒熟，加入蔬菜拌炒。',
      '倒入麵與醬油快炒均勻。'
    ]
  },
  {
    name: '香烤羊排薄荷醬',
    category: '高蛋白',
    cooking_time: '50 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '羊排：8根',
      '薄荷葉：10片',
      '優格：2大匙',
      '橄欖油：1大匙'
    ],
    steps: [
      '羊排抹油鹽胡椒烤30分鐘。',
      '薄荷與優格拌醬，佐羊排食用。'
    ]
  },
  {
    name: '芝麻牛肉涼拌',
    category: '高蛋白',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '牛肉片：200g',
      '芝麻醬：1大匙',
      '黃瓜絲：4大匙'
    ],
    steps: [
      '牛肉水煮熟切絲。',
      '與芝麻醬、黃瓜絲拌勻。'
    ]
  },
  {
    name: '奶酪雞肉菠菜捲',
    category: '高蛋白',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '雞胸切片：200g',
      '奶酪片：4片',
      '菠菜：一把'
    ],
    steps: [
      '雞胸先煎熟切條。',
      '捲入奶酪與菠菜，微烤5分鐘。'
    ]
  },
  {
    name: '燻雞藜麥沙拉',
    category: '高蛋白',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '蒜味燻雞：150g切丁',
      '煮熟藜麥：1/2杯',
      '彩椒丁：4大匙',
      '橄欖油：1大匙',
      '檸檬汁：1大匙'
    ],
    steps: [
      '藜麥、雞肉與蔬菜拌勻。',
      '淋油與檸檬汁調味。'
    ]
  },
  {
    name: '焗烤南瓜芝士盅',
    category: '素食',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '小南瓜：1顆（約500g）',
      '馬蘇里拉起司：100g',
      '橄欖油：1大匙',
      '海鹽、黑胡椒：各適量',
      '迷迭香：少許'
    ],
    steps: [
      '南瓜對切去籽，表面抹油、鹽、胡椒。',
      '預熱烤箱180°C，烤20分鐘。',
      '取出填入起司與迷迭香，再烤10分鐘。',
      '稍涼後即可吃。'
    ]
  },
  {
    name: '菠菜起司千層麵',
    category: '素食',
    cooking_time: '50 分鐘',
    difficulty: '中等',
    servings: 6,
    ingredients: [
      '千層麵皮：12片',
      '菠菜：200g',
      '白醬：200ml',
      '馬蘇里拉起司：150g',
      '帕瑪森起司粉：20g'
    ],
    steps: [
      '菠菜川燙切碎拌白醬。',
      '交替鋪麵皮、菠菜醬、起司。',
      '預熱180°C烤30分鐘至金黃。'
    ]
  },
  {
    name: '香菇豆腐煲',
    category: '素食',
    cooking_time: '35 分鐘',
    difficulty: '簡單',
    servings: 3,
    ingredients: [
      '嫩豆腐：300g',
      '鮮香菇：150g',
      '薑片：3片',
      '醬油：1.5大匙',
      '蔥段：1根'
    ],
    steps: [
      '香菇切片與薑片爆香。',
      '加入豆腐與醬油，小火煮10分鐘。',
      '撒蔥段起鍋。'
    ]
  },
  {
    name: '菠蘿咖哩雞（素）',
    category: '素食',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '素雞塊：200g',
      '菠蘿丁：100g',
      '紅咖哩醬：2大匙',
      '椰奶：150ml',
      '檸檬葉：3片'
    ],
    steps: [
      '素雞快炒加入咖哩醬。',
      '倒椰奶煮滾，加入菠蘿與檸檬葉。',
      '煮5分鐘後即可。'
    ]
  },
  {
    name: '番茄羅勒冷湯',
    category: '素食',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '熟番茄：3顆',
      '新鮮羅勒葉：10片',
      '橄欖油：1大匙',
      '海鹽、黑胡椒：各適量'
    ],
    steps: [
      '所有材料放入果汁機攪打。',
      '冰鎮10分鐘後倒出即可。'
    ]
  },
  {
    name: '杏鮑菇義大利麵',
    category: '素食',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '義大利麵：160g',
      '杏鮑菇：150g',
      '蒜末：1瓣',
      '橄欖油：1大匙',
      '羅勒葉：少許'
    ],
    steps: [
      '麵煮熟備用。',
      '杏鮑菇與蒜末爆香拌麵。',
      '撒羅勒葉即可。'
    ]
  },
  {
    name: '藜麥彩蔬碗',
    category: '素食',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '藜麥：1/2杯',
      '紅黃椒各1/2顆',
      '玉米粒：50g',
      '檸檬汁：1大匙',
      '橄欖油：1大匙'
    ],
    steps: [
      '藜麥煮熟。',
      '蔬菜丁拌入藜麥與調味料。'
    ]
  },
  {
    name: '芝麻羽衣甘藍沙拉',
    category: '素食',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '羽衣甘藍：100g',
      '蘋果：1/2顆',
      '芝麻醬：1大匙',
      '檸檬汁：1小匙'
    ],
    steps: [
      '甘藍切絲與蘋果丁拌勻。',
      '淋上芝麻醬與檸檬汁即可。'
    ]
  },
  {
    name: '奶油蘑菇烤麵包',
    category: '素食',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 4,
    ingredients: [
      '法式麵包：4片',
      '奶油：20g',
      '蘑菇：100g切片',
      '蒜末：1瓣',
      '巴西里：少許'
    ],
    steps: [
      '奶油融化爆香蒜末與蘑菇。',
      '舀料於麵包上，200°C烤8分鐘。',
      '灑巴西里。'
    ]
  },
  {
    name: '焦糖洋蔥披薩（素）',
    category: '素食',
    cooking_time: '35 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '披薩皮：2張',
      '洋蔥：2顆切絲',
      '糖：1大匙',
      '馬蘇里拉起司：100g',
      '橄欖油：1大匙'
    ],
    steps: [
      '洋蔥與糖小火炒至金黃。',
      '鋪於披薩皮，撒起司，200°C烤15分鐘。'
    ]
  },
  {
    name: '青醬四季豆盅',
    category: '素食',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 3,
    ingredients: [
      '四季豆：200g',
      '青醬：3大匙',
      '起司絲：50g',
      '橄欖油：1茶匙'
    ],
    steps: [
      '四季豆汆燙後拌青醬。',
      '放入烤盤，撒起司，180°C烤10分鐘。'
    ]
  },
  {
    name: '和風豆腐蘆筍沙拉',
    category: '素食',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '嫩豆腐：150g',
      '蘆筍：8根川燙',
      '和風醬：2大匙',
      '海苔絲：少許'
    ],
    steps: [
      '豆腐切塊與蘆筍擺盤。',
      '淋和風醬，撒海苔絲。'
    ]
  },
  {
    name: '椰香紅扁豆湯',
    category: '素食',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '紅扁豆：100g',
      '椰奶：200ml',
      '薑末：1小匙',
      '洋蔥丁：1/2顆'
    ],
    steps: [
      '洋蔥與薑爆香。',
      '加入紅扁豆與水煮20分鐘。',
      '倒椰奶煮5分鐘。'
    ]
  },
  {
    name: '南洋咖哩蔬菜鍋',
    category: '素食',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '各式蔬菜：400g',
      '南洋咖哩醬：2大匙',
      '椰奶：200ml',
      '魚露（可省）：1小匙'
    ],
    steps: [
      '蔬菜拌咖哩醬快炒。',
      '倒椰奶燉煮10分鐘。'
    ]
  },
  {
    name: '核桃蔓越莓燕麥球',
    category: '素食',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 8,
    ingredients: [
      '即食燕麥：100g',
      '核桃碎：50g',
      '蔓越莓乾：50g',
      '蜂蜜：2大匙'
    ],
    steps: [
      '拌勻所有材料，塑形。',
      '冷藏10分鐘定型。'
    ]
  },
  {
    name: '地中海烤蔬菜',
    category: '素食',
    cooking_time: '35 分鐘',
    difficulty: '簡單',
    servings: 3,
    ingredients: [
      '彩椒、茄子、櫛瓜：各150g',
      '橄欖油：2大匙',
      '義式香料：1茶匙'
    ],
    steps: [
      '切塊拌油香料。',
      '200°C烤25分鐘。'
    ]
  },
  {
    name: '杏仁醬涼拌花椰',
    category: '素食',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '花椰菜：200g川燙',
      '杏仁醬：2大匙',
      '檸檬汁：1小匙'
    ],
    steps: [
      '拌入杏仁醬與檸檬汁即可。'
    ]
  },
  {
    name: '芝麻菠菜拌麵',
    category: '素食',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '中式拉麵：160g',
      '菠菜：一把',
      '芝麻醬：1大匙',
      '醬油：1小匙'
    ],
    steps: [
      '麵煮熟、菠菜川燙。',
      '拌入醬料即可。'
    ]
  },
  {
    name: '櫛瓜玉米餅',
    category: '素食',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '櫛瓜：1根刨絲',
      '玉米粒：100g',
      '麵粉：50g',
      '雞蛋替代品：1顆'
    ],
    steps: [
      '拌勻做餅糊。',
      '平底鍋小火煎至金黃兩面。'
    ]
  },
  {
    name: '黑椒芝士烤南瓜',
    category: '素食',
    cooking_time: '30 分鐘',
    difficulty: '簡單',
    servings: 3,
    ingredients: [
      '南瓜：300g切片',
      '黑胡椒：1/2茶匙',
      '起司絲：80g'
    ],
    steps: [
      '南瓜拌胡椒烤15分鐘。',
      '撒起司再烤10分鐘。'
    ]
  },
  {
    name: '抹茶紅豆能量球',
    category: '素食',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 6,
    ingredients: [
      '燕麥粉：100g',
      '紅豆泥：50g',
      '抹茶粉：1小匙',
      '蜂蜜：1大匙'
    ],
    steps: [
      '拌勻塑形。',
      '冷藏10分鐘定型。'
    ]
  },
  {
    name: '香柚胡蘿蔔沙拉',
    category: '素食',
    cooking_time: '10 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '胡蘿蔔絲：100g',
      '香柚：1/2顆切瓣',
      '橄欖油：1大匙',
      '鹽：少許'
    ],
    steps: [
      '拌入油與鹽。',
      '鋪上香柚即可。'
    ]
  },
  {
    name: '南瓜紅豆粥',
    category: '素食',
    cooking_time: '60 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '南瓜：200g切塊',
      '紅豆：100g',
      '糙米：1/2杯'
    ],
    steps: [
      '紅豆與糙米先煮30分鐘。',
      '加入南瓜再煮30分鐘。'
    ]
  },
  {
    name: '糙米雞肉蔬菜碗',
    category: '無麩質',
    cooking_time: '35 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '糙米：1杯（煮熟）',
      '雞腿肉：200g，去皮切塊',
      '彩椒：1/2顆，切絲',
      '菠菜：一把',
      '無麩質醬油：1大匙'
    ],
    steps: [
      '雞腿肉以醬油醃10分鐘。',
      '平底鍋加油，拌炒雞肉至全熟。',
      '加入彩椒與菠菜快炒1–2分鐘。',
      '將雞肉蔬菜鋪於糙米飯上即可。'
    ]
  },
  {
    name: '什錦藜麥沙拉',
    category: '無麩質',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '藜麥：1/2杯（煮熟）',
      '小黃瓜：1根，切丁',
      '小番茄：6顆，對切',
      '橄欖油：1大匙',
      '檸檬汁：1大匙'
    ],
    steps: [
      '藜麥煮熟後放涼。',
      '拌入切丁蔬菜與調味料。',
      '冷藏10分鐘後享用風味更佳。'
    ]
  },
  {
    name: '煙燻鮭魚糙米捲',
    category: '無麩質',
    cooking_time: '25 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '糙米飯：1杯（煮熟）',
      '煙燻鮭魚片：100g',
      '牛油果：1/2顆，切片',
      '海苔：2張（無麩質認證）',
      '芝麻：少許'
    ],
    steps: [
      '鋪上海苔與糙米飯。',
      '依序排放鮭魚與牛油果。',
      '捲緊後切段，撒芝麻即可。'
    ]
  },
  {
    name: '烤雞胸佐無麩質香草',
    category: '無麩質',
    cooking_time: '30 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '雞胸肉：2片',
      '乾燥百里香：1茶匙',
      '乾燥迷迭香：1茶匙',
      '橄欖油：1大匙',
      '鹽、黑胡椒：各適量'
    ],
    steps: [
      '雞胸抹油與香草及調味料醃15分鐘。',
      '烤箱180°C烤18–20分鐘至全熟。',
      '切片擺盤，淋煮出肉汁。'
    ]
  },
  {
    name: '杏仁南瓜濃湯',
    category: '無麩質',
    cooking_time: '45 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '南瓜：500g，切塊',
      '洋蔥：1/2顆，切丁',
      '無鹽杏仁奶：200ml',
      '橄欖油：1大匙',
      '鹽、胡椒：各適量'
    ],
    steps: [
      '洋蔥爆香後加入南瓜拌炒。',
      '加水煮30分鐘至南瓜軟化。',
      '以食物調理棒打成泥，加入杏仁奶加熱即可。'
    ]
  },
  {
    name: '無麩質香煎干貝',
    category: '無麩質',
    cooking_time: '15 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '干貝：6顆',
      '鹽、白胡椒：各適量',
      '橄欖油：1大匙',
      '蒜末：1瓣',
      '檸檬汁：1小匙'
    ],
    steps: [
      '干貝抹鹽胡椒醃5分鐘。',
      '熱鍋爆香蒜末，煎干貝每面2分鐘。',
      '擠檸檬汁後盛盤。'
    ]
  },
  {
    name: '無麩質烤雞翅',
    category: '無麩質',
    cooking_time: '45 分鐘',
    difficulty: '簡單',
    servings: 4,
    ingredients: [
      '雞翅：8支',
      '無麩質辣醬：2大匙',
      '蜂蜜：1大匙',
      '橄欖油：1茶匙',
      '鹽：少許'
    ],
    steps: [
      '雞翅抹鹽醃10分鐘。',
      '拌入辣醬與蜂蜜。',
      '烤箱200°C烤25分鐘，中途翻面再烤10分鐘。'
    ]
  },
  {
    name: '香煎三文魚佐無麩質醬',
    category: '無麩質',
    cooking_time: '20 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '三文魚排：2片',
      '無麩質醬油：1大匙',
      '檸檬汁：1茶匙',
      '橄欖油：1大匙',
      '蒜末：1瓣'
    ],
    steps: [
      '三文魚抹醬油與蒜末醃5分鐘。',
      '平底鍋煎至表面金黃。',
      '淋檸檬汁後盛盤。'
    ]
  },
  {
    name: '無麩質蕃茄鷹嘴豆燉煮',
    category: '無麩質',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 3,
    ingredients: [
      '鷹嘴豆：200g（提前泡水）',
      '番茄罐頭：400g',
      '洋蔥：1/2顆切丁',
      '蒜末：1瓣',
      '橄欖油：1大匙'
    ],
    steps: [
      '洋蔥蒜末爆香。',
      '加入番茄與鷹嘴豆燉煮30分鐘。',
      '調味後即可食用。'
    ]
  },
  {
    name: '烤蘆筍蕈菇拼盤',
    category: '無麩質',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '蘆筍：8根',
      '鮮蕈菇：150g',
      '橄欖油：1.5大匙',
      '海鹽、黑胡椒：各適量'
    ],
    steps: [
      '蔬菜拌油調味。',
      '烤箱200°C烤15分鐘。',
      '取出翻面再烤10分鐘。'
    ]
  },
  {
    name: '燻雞奇亞籽碗',
    category: '無麩質',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '燻雞絲：150g',
      '奇亞籽：2大匙',
      '無糖豆奶：200ml',
      '藍莓：50g'
    ],
    steps: [
      '奇亞籽與豆奶攪拌靜置10分鐘。',
      '鋪上雞絲與藍莓享用。'
    ]
  },
  {
    name: '無麩質披薩（花椰菜皮）',
    category: '無麩質',
    cooking_time: '40 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '花椰菜碎：300g',
      '蛋白：1顆',
      '馬蘇里拉起司：80g',
      '番茄醬：2大匙',
      '義式香料：1茶匙'
    ],
    steps: [
      '花椰菜碎與蛋白混合，壓平成披薩皮，烤15分鐘。',
      '塗醬鋪起司與香料，再烤10分鐘。'
    ]
  },
  {
    name: '鮮蝦無麩質粉絲煲',
    category: '無麩質',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '無麩質粉絲：50g',
      '蝦仁：150g',
      '蒜末：1瓣',
      '高湯：200ml',
      '蔥花：少許'
    ],
    steps: [
      '粉絲泡軟，熱鍋爆香蒜末。',
      '加入蝦仁翻炒，倒入高湯煮3分鐘。',
      '放入粉絲收汁，撒蔥花。'
    ]
  },
  {
    name: '墨西哥無麩質玉米餅',
    category: '無麩質',
    cooking_time: '25 分鐘',
    difficulty: '簡單',
    servings: 4,
    ingredients: [
      '無麩質玉米餅皮：4張',
      '牛絞肉：200g',
      '墨西哥香料粉：1大匙',
      '生菜絲：適量',
      '莎莎醬：2大匙'
    ],
    steps: [
      '牛肉拌香料炒熟。',
      '玉米餅夾入餡料。'
    ]
  },
  {
    name: '香菇雞肉飯碗',
    category: '無麩質',
    cooking_time: '35 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '糙米：1杯',
      '雞腿肉：200g',
      '香菇：100g',
      '無麩質醬油：1大匙',
      '蔥花：少許'
    ],
    steps: [
      '香菇雞肉切丁爆香並調味。',
      '鋪於糙米飯上，撒蔥花即可。'
    ]
  },
  {
    name: '南瓜藜麥烤盅',
    category: '無麩質',
    cooking_time: '50 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '小南瓜：2顆',
      '藜麥：1/2杯（煮熟）',
      '起司：100g',
      '鹽、胡椒：各適量'
    ],
    steps: [
      '南瓜對切去籽，烤箱180°C烤20分鐘。',
      '填入藜麥與起司，再烤10分鐘。'
    ]
  },
  {
    name: '泰式酸辣無麩質海鮮湯',
    category: '無麩質',
    cooking_time: '30 分鐘',
    difficulty: '中等',
    servings: 2,
    ingredients: [
      '綜合海鮮：200g',
      '椰奶：100ml',
      '檸檬葉：4片',
      '香茅：1支',
      '辣椒：2根'
    ],
    steps: [
      '水煮滾加入香茅檸檬葉。',
      '放海鮮煮熟，倒椰奶與辣椒煮1分鐘。'
    ]
  },
  {
    name: '黑豆玉米沙拉',
    category: '無麩質',
    cooking_time: '15 分鐘',
    difficulty: '簡單',
    servings: 2,
    ingredients: [
      '黑豆：100g（煮熟）',
      '玉米粒：100g',
      '洋蔥丁：2大匙',
      '橄欖油：1大匙',
      '檸檬汁：1大匙'
    ],
    steps: [
      '拌勻所有材料即可。'
    ]
  },
  {
    name: '焦糖洋蔥焗無麩質豆腐',
    category: '無麩質',
    cooking_time: '45 分鐘',
    difficulty: '中等',
    servings: 4,
    ingredients: [
      '嫩豆腐：300g',
      '洋蔥：2顆切絲',
      '糖：1大匙',
      '馬蘇里拉起司：100g'
    ],
    steps: [
      '洋蔥與糖炒至金黃，鋪於豆腐上。',
      '撒起司，200°C烤15分鐘。'
    ]
  },
  {
    name: '香草燴牛迷迭香',
    category: '無麩質',
    cooking_time: '2 小時',
    difficulty: '困難',
    servings: 4,
    ingredients: [
      '牛腩：500g',
      '迷迭香：3枝',
      '紅酒：100ml',
      '高湯：300ml',
      '蒜頭：3瓣'
    ],
    steps: [
      '牛腩川燙後與香料炒香。',
      '加入紅酒與高湯小火燉2小時至軟嫩。'
    ]
  }
];


await HealthyRecipe.insertMany(healthyRecipesZH);
    console.log(`✅ 成功新增 ${healthyRecipesZH.length} 筆健康食譜`);

  } catch (err) {
    console.error('❌ 健康食譜種子失敗：', err);
  } finally {
    await mongoose.disconnect();
    console.log('🔌 MongoDB 連線已關閉');
  }
}

seedRecipes();
