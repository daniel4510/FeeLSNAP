const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];
const bookShelf = document.getElementById("bookShelf");
const searchInput = document.getElementById("searchInput");
const filterButtons = document.querySelectorAll(".filter-button");

let currentBookIndex = null;

function renderBooks(books) {
  bookShelf.innerHTML = "";
  books.forEach((book, index) => {
    const bookElement = document.createElement("img");
    bookElement.src =
      book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
    bookElement.alt = book.title;
    bookElement.classList.add("book-cover");
    bookElement.onclick = () => showBookDetails(book, index);
    bookShelf.appendChild(bookElement);
  });
}



renderBooks(bookHouse);

// 감정 필터링
filterButtons.forEach((button) => {
  button.addEventListener("click", () => {
    filterButtons.forEach((btn) => btn.classList.remove("active"));
    button.classList.add("active");

    const selectedEmotion = button.dataset.emotion;
    const filteredBooks =
      selectedEmotion === "all"
        ? bookHouse
        : bookHouse.filter((book) => book.emotion.toLowerCase() === selectedEmotion);

    renderBooks(filteredBooks);
  });
});

// 책 찾기
searchInput.addEventListener("input", () => {
  const query = searchInput.value.toLowerCase();
  const filteredBooks = bookHouse.filter((book) =>
    book.title.toLowerCase().includes(query)
  );
  renderBooks(filteredBooks);
});

// 서재 초기화 버튼
document.getElementById("clearButton").onclick = () => {
  if (confirm("정말로 서재를 초기화하시겠습니까?")) {
    localStorage.removeItem("bookHouse"); // localStorage에서 데이터 삭제
    bookHouse.length = 0; // 배열도 초기화
    bookShelf.innerHTML = ""; // 화면에서 책 표지 삭제
    alert("서재가 초기화되었습니다.");
  }
};

// 책 세부 정보 띄우기
function showBookDetails(book, index) {
  currentBookIndex = index;
  document.getElementById("modalThumbnail").src =
    book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
  document.getElementById("modalTitle").innerText = book.title;
  document.getElementById(
    "modalAuthor"
  ).innerText = `Author: ${book.authors.join(", ")}`;
  document.getElementById("modalEmotion").innerText = `Emotion: ${book.emotion}`;
  document.getElementById("modalDate").innerText = `Saved on: ${book.date}`;
  document.getElementById("modalLink").href = book.infoLink || "#";
  document.getElementById("bookModal").classList.add("show");
}

// 모달 닫기
function closeModal() {
  document.getElementById("bookModal").classList.remove("show");
}

// 책 삭제
document.getElementById("deleteButton").onclick = () => {
  if (currentBookIndex !== null) {
    bookHouse.splice(currentBookIndex, 1);
    localStorage.setItem("bookHouse", JSON.stringify(bookHouse));
    renderBooks(bookHouse);
    closeModal();
    alert("선택한 책이 삭제되었습니다.");
  }
};
