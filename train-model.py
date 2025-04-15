import pandas as pd
import joblib
import xgboost as xgb
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import accuracy_score

# 載入數據
df = pd.read_csv('diabetes.csv')
df = df[(df['Glucose'] != 0) & (df['BMI'] != 0)]  # 過濾無效數據
X = df[['Glucose', 'BMI', 'Age', 'BloodPressure', 'DiabetesPedigreeFunction']]
y = df['Outcome']

# 分割數據
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# 標準化
scaler = StandardScaler()
X_train_scaled = scaler.fit_transform(X_train)
X_test_scaled = scaler.transform(X_test)

# 訓練 XGBoost
model = xgb.XGBClassifier(
    n_estimators=100,
    learning_rate=0.1,
    max_depth=5,
    random_state=42,
    eval_metric='logloss'
)
model.fit(X_train_scaled, y_train)

# 保存模型和標準化器
joblib.dump(model, 'diabetes_model.pkl')
joblib.dump(scaler, 'scaler.pkl')

# 測試準確率
y_pred = model.predict(X_test_scaled)
print('準確率:', accuracy_score(y_test, y_pred))