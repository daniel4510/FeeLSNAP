const apiKey = "bfd2e2b966618a3d3fb2035d90530ba6"; // 카카오 REST API 키

const emotionConfig = {
  happy: { keywords: ["행복", "긍정"], category: "자기계발" },
  sad: { keywords: ["위로", "힐링"], category: "에세이" },
  angry: { keywords: ["진정", "분노"], category: "심리학" },
  surprise: { keywords: ["미스터리", "스릴러"], category: "추리 소설" },
  neutral: { keywords: ["일상", "에세이"], category: "에세이" },
  fear: { keywords: ["용기", "극복"], category: "자기계발" },
};

// 감정에 따라 책 검색
async function searchBooksForEmotion() {
  const emotion = sessionStorage.getItem("selectedEmotion");
  if (!emotion) {
    console.error("선택된 감정이 없습니다.");
    return [];
  }

  const config = emotionConfig[emotion];
  const uniqueBooks = new Map();

  for (let keyword of config.keywords) {
    const response = await fetch(
      `https://dapi.kakao.com/v3/search/book?query=${keyword}&size=50`,
      {
        headers: {
          Authorization: `KakaoAK ${apiKey}`,
        },
      }
    );

    const data = await response.json();

    data.documents?.forEach((book) => {
      const title = book.title;

      // 중복 제거
      if (!uniqueBooks.has(title)) {
        uniqueBooks.set(title, {
          title: title,
          authors: book.authors.length ? book.authors : ["Unknown Author"],
          thumbnail:
            book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image",
          description: book.contents || "No description available",
          infoLink: book.url,
        });
      }
    });
  }

  // 최대 6권만 선택
  const allBooks = Array.from(uniqueBooks.values());
  const selectedBooks =
    allBooks.length > 6
      ? allBooks.sort(() => 0.5 - Math.random()).slice(0, 6)
      : allBooks;

  // 부족한 경우 대체 데이터 추가
  while (selectedBooks.length < 6) {
    selectedBooks.push({
      title: "Book Not Available",
      authors: ["Unknown Author"],
      thumbnail: "https://via.placeholder.com/100x150?text=No+Image",
      description: "No description available",
      infoLink: "#",
    });
  }

  return selectedBooks;
}

// 감정을 기반으로 책을 검색하고 bookshelf.html로 이동
async function loadBooksForEmotion() {
  try {
    const books = await searchBooksForEmotion();

    // 책 목록과 감정 저장
    const emotion = sessionStorage.getItem("selectedEmotion");
    sessionStorage.setItem("bookList", JSON.stringify(books));
    sessionStorage.setItem("emotion", emotion);

    // 2초 뒤 bookshelf.html로 이동
    setTimeout(() => {
      window.location.href = "bookshelf.html";
    }, 3000);
  } catch (error) {
    console.error("책 검색 중 오류 발생:", error);
  }
}

loadBooksForEmotion();
