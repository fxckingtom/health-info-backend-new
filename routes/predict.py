import sys
import numpy as np
import joblib
from flask import Flask, request, jsonify

# Optional debug
print("Received args:", sys.argv, file=sys.stderr)

# 取得參數
glucose = float(sys.argv[1])
bmi = float(sys.argv[2])
age = int(sys.argv[3])
blood_pressure = float(sys.argv[4])
family_history = int(sys.argv[5])  # 應該是 0 或 1 的整數

# 載入模型
model = joblib.load('diabetes_model.pkl')

# 預測
features = np.array([[glucose, bmi, age, blood_pressure, family_history]])
prediction = model.predict(features)
result = int(prediction[0])

print(json.dumps({'result': result}))
