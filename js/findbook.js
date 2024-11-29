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

    // 모든 키워드에 대해 최대 50권씩 요청
    for (let keyword of config.keywords) {
        const response = await fetch(`https://dapi.kakao.com/v3/search/book?query=${keyword}&size=50`, {
            headers: {
                Authorization: `KakaoAK ${apiKey}`
            }
        });

        const data = await response.json();

        data.documents?.forEach((book) => {
            const title = book.title;

            // 책 제목으로 중복 제거
            if (!uniqueBooks.has(title)) {
                uniqueBooks.set(title, {
                    title: title,
                    authors: book.authors.length ? book.authors : ["Unknown Author"],
                    thumbnail: book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image",
                    description: book.contents || "No description available",
                    infoLink: book.url
                });
            }
        });
    }

    // 300권 이상 중복 제거된 데이터를 수집
    const allBooks = Array.from(uniqueBooks.values());

    // 6권을 랜덤으로 선택
    let selectedBooks = [];
    if (allBooks.length > 6) {
        selectedBooks = allBooks.sort(() => 0.5 - Math.random()).slice(0, 6);
    } else {
        selectedBooks = allBooks;
    }

    // 6권 미만일 경우 대체 정보 추가
    while (selectedBooks.length < 6) {
        selectedBooks.push({
            title: "Book Not Available",
            authors: ["Unknown Author"],
            thumbnail: "https://via.placeholder.com/100x150?text=No+Image",
            description: "No description available",
            infoLink: "#"
        });
    }

    return selectedBooks;
}

async function startEmotionDetection() {
    try {
        // 감정 분석 요청
        const response = await fetch("http://127.0.0.1:5000/start_emotion_detection", { method: "POST" });
        const data = await response.json();
        const detectedEmotion = data.emotion;

        // 감정에 맞는 도서 추천
        const books = await searchBooks(detectedEmotion);

        // 도서 목록을 sessionStorage에 저장
        sessionStorage.setItem("bookList", JSON.stringify(books));
        sessionStorage.setItem("emotion", detectedEmotion);

        window.location.href = "bookshelf.html";
    } catch (error) {
        console.error("Error during emotion detection:", error);
    }
}

startEmotionDetection();
