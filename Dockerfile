FROM python:3.12-slim

# 시스템 의존성 설치 (예: libGL)
RUN apt-get update && \
    apt-get install -y libgl1-mesa-glx && \
    apt-get clean

# 작업 디렉토리 설정
WORKDIR /app

# requirements.txt 복사 후 설치
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# 애플리케이션 소스 복사
COPY . .

# 앱 실행
CMD ["python", "app.py"]
