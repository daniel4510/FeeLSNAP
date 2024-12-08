const apiKey = "bfd2e2b966618a3d3fb2035d90530ba6"; // 카카오 REST API 키

const emotionConfig = {
  happy: { keywords: ["행복", "긍정"], category: "자기계발" },
  sad: { keywords: ["위로", "힐링"], category: "에세이" },
  angry: { keywords: ["진정", "분노"], category: "심리학" },
  surprise: { keywords: ["미스터리", "스릴러"], category: "추리 소설" },
  neutral: { keywords: ["일상", "에세이"], category: "에세이" },
  fear: { keywords: ["용기", "극복"], category: "자기계발" }
};

async function searchBooks(emotion) {
    const config = emotionConfig[emotion];
    const uniqueBooks = new Map();
  
    for (let keyword of config.keywords) {
      try {
        const response = await fetch(
          `https://dapi.kakao.com/v3/search/book?query=${keyword}&size=50`,
          {
            headers: {
              Authorization: `KakaoAK ${apiKey}`
            }
          }
        );
  
        if (!response.ok) throw new Error("Failed to fetch books from Kakao API");
  
        const data = await response.json();
  
        data.documents?.forEach((book) => {
          const title = book.title;
  
          if (!uniqueBooks.has(title)) {
            uniqueBooks.set(title, {
              title: title,
              authors: book.authors.length ? book.authors : ["Unknown"],
              thumbnail: book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image",
              description: book.content || "내용이 없습니다.", // `content`로 수정
              infoLink: book.url || book.sale_url || "#", // URL 대체 처리
              publisher: book.publisher || "Unknown publisher",
              datetime: book.datetime ? book.datetime.split("T")[0] : "Unknown date"
            });
          }
        });
      } catch (error) {
        console.error(`Error fetching books for keyword "${keyword}":`, error);
      }
    }
  
    const allBooks = Array.from(uniqueBooks.values());
  
    let selectedBooks = [];
    if (allBooks.length > 6) {
      selectedBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
      selectedBooks = allBooks;
    }
  
    while (selectedBooks.length < 6) {
      selectedBooks.push({
        title: "Book Not Available",
        authors: ["Unknown Author"],
        thumbnail: "https://via.placeholder.com/100x150?text=No+Image",
        description: "No description available", // 기본값 유지
        infoLink: "#", // 기본 URL 처리
        publisher: "Unknown publisher",
        datetime: "Unknown date"
      });
    }
  
    return selectedBooks;
  }
  

// 감정 분석 종료 처리
async function stopDetection(stream, emotionCounts) {
  stream.getTracks().forEach((track) => track.stop()); // 스트림 종료

  if (emotionCounts.length > 0) {
    const emotion = getMostCommonEmotion(emotionCounts);
    const books = await searchBooks(emotion); // 책 검색

    sessionStorage.setItem("bookList", JSON.stringify(books));
    sessionStorage.setItem("emotion", emotion);

    window.location.href = "/bookshelf";
  } else {
    console.error("No emotions detected");
  }
}

// 감정 리스트에서 가장 많이 나온 감정을 찾는 함수
function getMostCommonEmotion(emotionCounts) {
  const emotionFrequency = emotionCounts.reduce((acc, emotion) => {
    acc[emotion] = (acc[emotion] || 0) + 1;
    return acc;
  }, {});

  const mostCommonEmotion = Object.entries(emotionFrequency).reduce((a, b) =>
    b[1] > a[1] ? b : a
  );
  return mostCommonEmotion[0]; // 가장 많이 나온 감정 반환
}

// 감정 인식 프로세스 시작
async function startEmotionDetection() {
  const videoElement = document.createElement("video"); // 화면에 추가하지 않는 비디오 요소 생성
  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");

  // 카메라 스트림 시작
  const stream = await navigator.mediaDevices.getUserMedia({ video: true });
  videoElement.srcObject = stream;

  const emotionCounts = [];
  const startTime = Date.now();

  // 비디오를 숨기기 위해 autoplay 설정
  videoElement.autoplay = true;
  videoElement.style.display = "none"; // 비디오를 화면에 보이지 않게 설정

  // 비디오가 로드되면 캔버스 크기와 동기화
  videoElement.addEventListener("loadedmetadata", () => {
    canvas.width = videoElement.videoWidth;
    canvas.height = videoElement.videoHeight;

    processFrame();
  });

  const processFrame = async () => {
    const elapsedTime = Date.now() - startTime;
    if (elapsedTime > 3000) {
      stopDetection(stream, emotionCounts);
      return;
    }

    // 캔버스에 비디오 프레임을 그리기
    context.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
    const frame = canvas.toDataURL("image/jpeg");

    try {
      const response = await fetch("http://127.0.0.1:5000/start_emotion_detection", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ image: frame })
      });

      if (!response.ok) throw new Error("Failed to detect emotion");

      const data = await response.json();
      const detectedEmotion = data.emotion;

      if (detectedEmotion) {
        emotionCounts.push(detectedEmotion);
      }
    } catch (error) {
      console.error("Error detecting emotion:", error);
    }

    requestAnimationFrame(processFrame);
  };
}

// 감정 인식 프로세스 시작 호출
startEmotionDetection();
