from flask import Flask, render_template, jsonify, request
from flask_cors import CORS  # CORS 라이브러리 가져오기
import cv2
import numpy as np
import base64
from fer import FER

app = Flask(__name__)

# CORS 설정
CORS(app, resources={r"/*": {"origins": "http://127.0.0.1:5001"}})  # 프론트엔드 서버의 주소로 설정

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

@app.route("/start_emotion_detection", methods=["POST"])
def start_emotion_detection():
    try:
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
