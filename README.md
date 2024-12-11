![new](https://github.com/user-attachments/assets/2fa005f4-2c18-42cf-9669-abd7d1d2bc92)


# 📗FeeLSNAP - 감정 인식 책 추천 서비스📗

- FeelSNAP은 카메라로 사용자의 감정을 인식해 책을 추천해주는 서비스입니다. 📚
- 표정을 인식하는 AI모델이 당신의 감정을 읽고 책을 추천합니다.
- 책을 추천받고 저장하여 나만의 서재를 만들어 보세요!

<br/>

## 🍀_목차
1. [시작하기](#시작하기)
2. [서비스 사용법](#서비스-사용법)
    1. [메인화면](#메인화면)
    2. [로딩화면](#로딩화면)
    3. [책장 화면](#책장-화면)
    4. [서재 화면](#서재-화면)
3. [개발기간 및 작업관리](#개발-기간-및-작업-관리)
4. [기술스택](#기술-스택)
5. [레퍼런스](#레퍼런스)
6. [라이센스](#라이센스)

<br/>

## 시작하기
- Link
  - <https://feelsnap.me>
- Prerequisites (선택사항)
  - 얼굴 감정 인식을 위한 카메라 (없어도 서비스 이용에 지장은 없습니다.)

<br/>

## 서비스 사용법

### 미리보기

![화면 기록 2024년 12월 11일](https://github.com/user-attachments/assets/258dcd01-7ce1-4ca5-9631-83be1924a7ac)

### **메인화면**
**시작화면**
<img width="1659" alt="스크린샷 2024-12-11 오전 4 09 46" src="https://github.com/user-attachments/assets/02a3eb73-352a-4c73-9abe-71f29855e2fd">

- <감정 입력하기> 버튼을 사용하여 [감정확인 로딩화면](#로딩화면)으로 넘어갈 수 있습니다.
    
<br/>

**스크롤 후**
<img width="1659" alt="스크린샷 2024-12-11 오전 4 12 57" src="https://github.com/user-attachments/assets/739f0760-d305-49de-a8b7-93c4ee93b563">

<br/><br/>

**기능소개 화면**

![step by step](https://github.com/user-attachments/assets/25454c9a-3a77-4d92-86b4-16113887b8f5)

- STEP을 하나씩 밟아보며 사용법을 익혀보세요.

<br/>

**감정이동 화면**

<img width="1659" alt="스크린샷 2024-12-11 오전 4 27 30" src="https://github.com/user-attachments/assets/368995ae-c3a8-467f-a19f-2a47829ce30b">

- 카메라 없이도 책을 추천받을 수 있어요. hover시 색이 바뀌고 클릭하면 [감정선택 로딩화면](#로딩화면)으로 이동합니다.

<br/>

**서재와 Footer**

<img width="1659" alt="스크린샷 2024-12-11 오전 4 31 34" src="https://github.com/user-attachments/assets/c8670b82-a0d1-4d19-9392-0350aa2e031d">

- 자세히보기를 눌러 [서재](#서재-화면)로 이동할 수 있습니다.

<br/>

### **로딩화면**

**감정입력 로딩화면**

<img width="1659" alt="스크린샷 2024-12-11 오전 4 33 29" src="https://github.com/user-attachments/assets/f4b4087f-c0b9-4b05-8080-3f18317c7b7b">

- 시작화면의 <감정 입력하기> 버튼을 클릭하면 이 화면에 들어오고 카메라에서 3초동안 표정을 입력받습니다. 이 페이지에 들어오면 바로 카메라를 보고 3초간 표정을 지어주세요. 딥러닝으로 학습된 **FER**을 활용하여 사용자의 감정을 분석합니다.

<br/>

- 카메라가 없어도 걱정하지 마세요. 페이지 아래 쪽 감정 버튼을 눌러도 책을 추천받을 수 있습니다.

<br/>

**감정선택 로딩화면**

<img width="1659" alt="스크린샷 2024-12-11 오전 4 52 16" src="https://github.com/user-attachments/assets/f52ea593-26ed-44e7-b372-7e0f383c2013">

- 감정 버튼을 클릭하면 이 화면으로 옵니다. 3초 뒤, 선택한 감정에 알맞은 책을 탐색하는 책장 화면으로 이동합니다.

<br/>

### **책장 화면**

![화면 기록 2024-12-11 오후 5 39 26 (2)](https://github.com/user-attachments/assets/3b76fb55-f026-4e1f-a661-d34a826db5cc)

- 감정을 읽고 책장으로 옵니다.

<img width="1659" alt="스크린샷 2024-12-11 오전 4 33 41" src="https://github.com/user-attachments/assets/04af8e4a-2238-4c59-a8d3-04722cd26af6">

- 입력받은 감정에 알맞은 책을 **카카오 도서 검색 API**를 이용해 6권 추천해줍니다. 책에 대한 자세한 정보는 더보기를 클릭해주세요.

<img width="1659" alt="스크린샷 2024-12-11 오전 4 52 41" src="https://github.com/user-attachments/assets/0475089e-fe01-4ec9-9672-4feaf8c48c7f">

- 내 서재 담기 버튼을 클릭해 마음에 드는 책을 서재에 담아보세요. 이미 등록된 책은 체크표시로 바뀝니다.

<br/>

### **서재 화면**

<br/>

<img width="1659" alt="스크린샷 2024-12-11 오전 4 37 18" src="https://github.com/user-attachments/assets/f37effab-85b4-4a99-9d5f-7655b4d9c73e">

- 책장에서 담은 책을 확인할 수 있습니다. cell을 클릭하여 더 자세한 책의 정보를 탐색해보세요.

<br/>

<img width="1659" alt="스크린샷 2024-12-11 오전 5 07 34" src="https://github.com/user-attachments/assets/53a19100-96d3-454e-ba70-feb6602978f8">

- 감정 이모지를 클릭해 필터링해보세요. 감정별로 저장했던 책을 필터링하여 책을 띄워줍니다.

<br/>

<img width="1659" alt="스크린샷 2024-12-11 오전 5 08 00" src="https://github.com/user-attachments/assets/bf220e3a-47cb-4cd3-84b1-213ba2132e45">

- 검색을 통해서 책을 찾을 수 있습니다.

<br/>

<img width="1659" alt="스크린샷 2024-12-11 오전 5 16 03" src="https://github.com/user-attachments/assets/5dae96e1-ca79-4317-ad08-864049b5784d">

- 삭제 버튼을 눌러 cell을 삭제할 수 있습니다. 서재가 따분하다면 서재초기화 버튼을 눌러 서재를 초기화 하는 것도 가능합니다.

<br/>

**로그인 없이도 브라우저가 기억하는 나만의 서재를 간편하게 관리하세요!**

<br/>

## 개발 기간 및 작업 관리

**개발 기간**
- 전체 개발기간: 2024-11-01 ~ 2024-12-10
- 기능 구현: 2024-11-01 ~ 2024-11-15
- UI 구현: 2024-11-16 ~ 2024-12-08
- 전체 배포: 2024-12-09 ~ 2024-12-10

**작업 관리**
- 디자인
  - 전체적인 UI/UX 디자인은 Figma를 사용하여 설계했습니다.
  - [피그마 링크](https://www.figma.com/design/Nlmkh9A5E4eFSpmilJ37dU/FeeLSNAP?node-id=0-1&t=ENhnqVyjZI15Fu20-1)
- 개발
  - 작업은 Git을 사용하여 관리했습니다.
- 유지보수
  - 새로운 아이디어나 개선 사항은 주기적으로 업데이트하고 있습니다.

<br/>

## 기술 스택

![기술스택](https://github.com/user-attachments/assets/c3312c4c-46b8-4452-af1e-f928650b403a)


- **Backend**: Flask (Python)
- **Frontend**: HTML (Templates), CSS, JavaScript (Static Files)
- **WSGI Server**: Gunicorn
- **Reverse Proxy**: Nginx
- **Hosting**: AWS EC2

<br/>

## 레퍼런스

<br/>

## 라이센스

This project is licensed under the MIT License
