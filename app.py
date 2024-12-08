from flask import Flask, render_template, jsonify, request
from flask_cors import CORS  # CORS 라이브러리 가져오기
import cv2
import numpy as np
import base64
from fer import FER

app = Flask(__name__)

# CORS 설정
CORS(app, resources={r"/*": {"origins": "*"}})  # 모든 출처 허용

# FER 모델 초기화
emotion_detector = FER()

def get_dominant_emotion(image_data):
    try:
        # Base64 이미지를 디코딩하여 처리
        image_data = base64.b64decode(image_data.split(',')[1])
        np_arr = np.frombuffer(image_data, np.uint8)
        img = cv2.imdecode(np_arr, cv2.IMREAD_COLOR)

        # 감정 예측
        emotions = emotion_detector.detect_emotions(img)
        if emotions:
            emotion, _ = emotion_detector.top_emotion(img)
            return emotion
        return "neutral"  # 기본값
    except Exception as e:
        print(f"Error decoding or processing image: {e}")
        return "neutral"

@app.after_request
def add_cors_headers(response):
    response.headers.add("Access-Control-Allow-Origin", "*")  # 모든 출처 허용
    response.headers.add("Access-Control-Allow-Methods", "GET, POST, OPTIONS")  # 허용되는 메서드
    response.headers.add("Access-Control-Allow-Headers", "Content-Type,Authorization")  # 허용되는 헤더
    return response

@app.route("/start_emotion_detection", methods=["OPTIONS", "POST"])
def start_emotion_detection():
    try:
        if request.method == "OPTIONS":
            return "", 200  # preflight 요청을 허용
        data = request.get_json()
        image_data = data.get("image")
        if not image_data:
            return jsonify({"error": "No image provided"}), 400

        emotion = get_dominant_emotion(image_data)
        return jsonify({"emotion": emotion})
    except Exception as e:
        print(f"Error processing request: {e}")
        return jsonify({"error": "Failed to process emotion detection"}), 500

if __name__ == "__main__":
    app.run(host="127.0.0.1", port=5000, debug=True)


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/bookshelf')
def bookshelf():
    return render_template('bookshelf.html')

@app.route('/loading')
def loading():
    return render_template('loading.html')

@app.route('/bookhouse')
def bookhouse():
    return render_template('bookhouse.html')

@app.route('/emotionloading')
def emotionloading():
    return render_template('emotionloading.html')