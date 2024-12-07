const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];
const bookShelf = document.getElementById("bookShelf");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");

const emotionImages = {
  happy: {
    active: "./img/house-btn/happy-btn-on.svg",
    inactive: "./img/house-btn/happy-btn.svg"
  },
  sad: {
    active: "./img/house-btn/sad-btn-on.svg",
    inactive: "./img/house-btn/sad-btn.svg"
  },
  angry: {
    active: "./img/house-btn/angry-btn-on.svg",
    inactive: "./img/house-btn/angry-btn.svg"
  },
  surprise: {
    active: "./img/house-btn/surprise-btn-on.svg",
    inactive: "./img/house-btn/surprise-btn.svg"
  },
  neutral: {
    active: "./img/house-btn/neutral-btn-on.svg",
    inactive: "./img/house-btn/neutral-btn.svg"
  },
  all: {
    active: "./img/house-btn/all-btn-on.svg",  // all 버튼 active 이미지 경로
    inactive: "./img/house-btn/all-btn.svg" // all 버튼 inactive 이미지 경로
  }
};

function formatPublishedDate(dateString) {
  if (dateString === "UNKNOWN") {
    return "UNKNOWN"; // "UNKNOWN"일 경우 그대로 "UNKNOWN" 표시
  }
  const [year, month] = dateString.split("-"); // "-"를 기준으로 년도와 월을 분리
  const formattedMonth = parseInt(month, 10); // 월을 정수로 변환 (앞의 0을 자동으로 제거)
  return `${year}년 ${formattedMonth}월`; // "2022년 3월" 형태로 반환
}

function renderBooks(books) {
  bookShelf.innerHTML = ""; // 기존 내용 초기화
  books.forEach((book, index) => {
    const bookCell = document.createElement("div");
    bookCell.className = "book-cell";

    // 제목이 17자를 넘으면 "..."으로 대체
    const title =
      book.title.length > 17
        ? book.title.substring(0, 17) + "..."
        : book.title;

    // 도서 소개 내용이 100자를 넘으면 "..."으로 대체
    const content =
      book.content && book.content.length > 100
        ? book.content.substring(0, 100) + "..."
        : book.content || "NO DESCRIPTION AVAILABLE";

    const emotionImage = emotionImages[book.emotion.toLowerCase()] || emotionImages["neutral"];
    const dateModified = formatPublishedDate(book.publishedDate);

    // 삭제 버튼 추가
    const deleteButton = `<button class="delete-button">삭제</button>`;

    bookCell.innerHTML = `
      <img src="${book.thumbnail}" alt="${book.title}" class="book-img"/>
      <div class="book-title">${title}</div>
      <div class="book-author">${book.authors.join(", ")}</div>
      <img src="${emotionImage.active}" alt="${book.emotion}" class="emotion-image" />
      <div class="publish-box">
        <p class="book-publisher">${book.publisher}</p>
        <p>ㅣ<p/>
        <p class="book-publishedDate">${dateModified}</p>
      </div>
      <div class="book-content">${content}</div> <!-- 도서 소개 -->
      ${deleteButton} <!-- 삭제 버튼 추가 -->
    `;

    // 삭제 버튼 클릭 시 해당 bookCell 삭제
    const deleteButtonElement = bookCell.querySelector(".delete-button");
    deleteButtonElement.addEventListener("click", (e) => {
      e.stopPropagation(); // 클릭 이벤트가 bookCell로 전파되지 않도록 막음
      if (confirm("이 책을 서재에서 삭제하시겠습니까?")) {
        // bookHouse에서 해당 책 삭제
        bookHouse.splice(index, 1);
        localStorage.setItem("bookHouse", JSON.stringify(bookHouse)); // localStorage에 업데이트
        renderBooks(bookHouse); // 삭제 후 화면 갱신
      }
    });

    // bookCell 클릭 시 infoLink로 이동
    bookCell.addEventListener("click", () => {
      if (book.infoLink) {
        window.open(book.infoLink, "_blank"); // 새 탭에서 링크 열기
      }
    });

    bookShelf.appendChild(bookCell);
  });
}


// 페이지 로드 시, 처음에 'all' 버튼만 active 상태로 설정하고 나머지 버튼은 inactive 상태로 설정
document.addEventListener("DOMContentLoaded", () => {
  const allButton = document.querySelector("[data-emotion='all']");
  const filterButtons = document.querySelectorAll(".filter-button");

  // 'all' 버튼만 active 상태로 설정하고, 나머지 버튼은 inactive 상태로 설정
  if (allButton) {
    allButton.classList.add("active");
    allButton.style.backgroundImage = `url(${emotionImages.all.active})`; // 'all' 버튼을 활성화된 상태로 설정
  }

  filterButtons.forEach((button) => {
    if (button !== allButton) {
      button.classList.remove("active");
      const emotion = button.dataset.emotion;
      const img = emotionImages[emotion.toLowerCase()] || emotionImages["neutral"];
      button.style.backgroundImage = `url(${img.inactive})`; // 나머지 버튼은 inactive 상태로 설정
    }
  });

  renderBooks(bookHouse); // 'all' 버튼을 선택한 상태에서 책 목록 렌더링
});
// 페이지 로드 시, 처음에 'all' 버튼을 활성화 상태로 설정
document.addEventListener("DOMContentLoaded", () => {
  const allButton = document.querySelector("[data-emotion='all']");
  if (allButton) {
    allButton.classList.add("active");
    allButton.style.backgroundImage = `url(${emotionImages.all.active})`; // 'all' 버튼을 활성화된 상태로 설정
    renderBooks(bookHouse); // 'all' 버튼을 선택한 상태에서 책 목록 렌더링
  }
});

// 감정 필터링
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => {
      btn.classList.remove("active");
      const emotion = btn.dataset.emotion;
      const img = emotionImages[emotion.toLowerCase()] || emotionImages["neutral"];
      // 비활성화된 버튼은 non-active 이미지로 설정
      btn.style.backgroundImage = `url(${img.inactive})`;
    });

    button.classList.add("active");
    const selectedEmotion = button.dataset.emotion;
    const img = emotionImages[selectedEmotion.toLowerCase()] || emotionImages["neutral"];
    // 활성화된 버튼은 active 이미지로 설정
    button.style.backgroundImage = `url(${img.active})`;

    const filteredBooks =
      selectedEmotion === "all"
        ? bookHouse
        : bookHouse.filter((book) => book.emotion.toLowerCase() === selectedEmotion);

    renderBooks(filteredBooks);
  });
});

// 검색 기능
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = bookHouse.filter((book) =>
    book.title.toLowerCase().includes(query)
  );
  renderBooks(filteredBooks);
});

// 서재 초기화
document.getElementById("clearButton").onclick = () => {
  if (confirm("정말로 서재를 초기화하시겠습니까?")) {
    localStorage.removeItem("bookHouse"); // localStorage에서 데이터 삭제
    bookHouse.length = 0; // 배열 초기화
    renderBooks([]); // 화면 초기화
    alert("서재가 초기화되었습니다.");
  }
};

// 검색 아이콘 클릭 시, input 요소에 포커스를 주기
document.querySelector(".search-bar img").addEventListener("click", function() {
  document.getElementById("searchInput").focus(); // 검색창(input)에 포커스를 줌
});

function moveToLobby(){
  window.location.href = "index.html";
}