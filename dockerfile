# 1. Python 3.9 이미지를 기반으로 설정
FROM python:3.9-slim

# 2. pip 업그레이드 및 필수 패키지 설치
RUN python -m ensurepip --upgrade && \
    pip install --no-cache-dir --upgrade pip setuptools wheel

# 3. 애플리케이션 파일을 컨테이너에 복사
COPY . /app

# 4. 작업 디렉토리 변경
WORKDIR /app

# 5. 요구 사항 파일을 사용하여 필요한 패키지 설치
RUN pip install --no-cache-dir -r requirements.txt

# 6. gunicorn을 사용하여 Flask 애플리케이션 실행
CMD ["gunicorn", "-b", "0.0.0.0:5000", "app:app"]

# 7. 컨테이너가 5000 포트를 사용하도록 설정
EXPOSE 5000
