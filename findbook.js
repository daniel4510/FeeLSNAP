const apiKey = "AIzaSyDlDBQMZYOMNyjtYISOJoM6sLjzWJeLVfY"; // Google Books API 키

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

    // 모든 키워드에 대해 책을 불러오고 중복 없이 Map에 추가
    for (let keyword of config.keywords) {
        const response = await fetch(`https://www.googleapis.com/books/v1/volumes?q=${keyword}&maxResults=40&key=${apiKey}`);
        const data = await response.json();

        data.items?.forEach((book) => {
            const volumeInfo = book.volumeInfo;
            const title = volumeInfo.title;

            // 썸네일 URL을 고해상도로 변경 시도
            let thumbnail = volumeInfo.imageLinks?.extraLarge || 
                            volumeInfo.imageLinks?.large ||
                            volumeInfo.imageLinks?.medium ||
                            volumeInfo.imageLinks?.thumbnail ||
                            "https://via.placeholder.com/100x150?text=No+Image";
            
            if (thumbnail.includes("zoom=")) {
                thumbnail = thumbnail.replace(/zoom=\d+/, "zoom=3");
            }

            // 책 제목으로 중복 제거
            if (!uniqueBooks.has(title)) {
                uniqueBooks.set(title, {
                    title: title,
                    authors: volumeInfo.authors || ["Unknown Author"],
                    thumbnail: thumbnail,
                    description: volumeInfo.description || "No description available",
                    infoLink: volumeInfo.infoLink
                });
            }
        });
    }

    // Map을 배열로 변환한 후, 랜덤으로 6개만 남기고 나머지 삭제
    let books = Array.from(uniqueBooks.values());
    if (books.length > 6) {
        books = books.sort(() => 0.5 - Math.random()).slice(0, 6);
    }

    // 6권 미만일 경우 대체 정보 추가
    while (books.length < 6) {
        books.push({
            title: "Book Not Available",
            authors: ["Unknown Author"],
            thumbnail: "https://via.placeholder.com/100x150?text=No+Image",
            description: "No description available",
            infoLink: "#"
        });
    }

    return books;
}

async function startEmotionDetection() {

    try {
        const response = await fetch("http://127.0.0.1:5000/start_emotion_detection", { method: "POST" });
        const data = await response.json();
        const detectedEmotion = data.emotion;

        // 감정에 맞는 도서 추천
        const books = await searchBooks(detectedEmotion);

        // 도서 목록을 sessionStorage에 저장 후 bookshelf.html로 이동
        sessionStorage.setItem("bookList", JSON.stringify(books));
        sessionStorage.setItem("emotion", detectedEmotion);
        window.location.href = "bookshelf.html";
    } catch (error) {
        console.error("Error during emotion detection:", error);
    }
}
