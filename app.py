from flask import Flask, render_template, jsonify, request
from flask_cors import CORS
import cv2
from fer import FER
import time
from collections import Counter

# Flask 앱 초기화
app = Flask(__name__)
CORS(app)  # 모든 경로에 대해 CORS 활성화

# FER 감정 인식 모델 초기화
emotion_detector = FER()

def get_dominant_emotion():
    # 카메라 초기화
    cap = cv2.VideoCapture(0)
    emotion_counts = []
    start_time = time.time()

    # 3초 동안 감정 예측 기록
    while time.time() - start_time < 3:
        ret, frame = cap.read()
        if not ret:
            break
        emotions = emotion_detector.detect_emotions(frame)
        if emotions:
            # 예측된 감정 중 가장 높은 확률의 감정 추가
            emotion = emotion_detector.top_emotion(frame)[0]
            emotion_counts.append(emotion)

    cap.release()

    # 3초 동안 가장 많이 예측된 감정 찾기
    if emotion_counts:
        most_common_emotion = Counter(emotion_counts).most_common(1)[0][0]
        return most_common_emotion
    return "No emotion detected"

@app.route("/")
def index():
    return render_template("index.html")

@app.route("/start_emotion_detection", methods=["POST"])
def start_emotion_detection():
    # 3초 동안 얼굴 인식 후 결과 반환
    emotion = get_dominant_emotion()
    return jsonify({"emotion": emotion})

if __name__ == "__main__":
    app.run(debug=True)
