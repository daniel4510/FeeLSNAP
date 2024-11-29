// Load saved books from localStorage
const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];
const bookShelf = document.getElementById("bookShelf");
let currentBookIndex = null; // 현재 선택된 책의 인덱스를 저장

// Populate the bookshelf
bookHouse.forEach((book, index) => {
  const bookElement = document.createElement("img");
  bookElement.src =
    book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
  bookElement.alt = book.title;
  bookElement.classList.add("book-cover");
  bookElement.onclick = () => showBookDetails(book, index);
  bookShelf.appendChild(bookElement);
});

// Function to show book details in modal
function showBookDetails(book, index) {
  currentBookIndex = index; // 현재 선택된 책의 인덱스를 저장
  document.getElementById("modalThumbnail").src =
    book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
  document.getElementById(
    "modalTitle"
  ).innerText = book.title;
  document.getElementById(
    "modalAuthor"
  ).innerText = `Author: ${book.authors.join(", ")}`;
  document.getElementById(
    "modalEmotion"
  ).innerText = `Emotion: ${book.emotion}`;
  document.getElementById(
    "modalDate"
  ).innerText = `Saved on: ${book.date}`;
  document.getElementById("modalLink").href = book.infoLink || "#";
  document.getElementById("bookModal").classList.add("show");
}

// Close modal
function closeModal() {
  document.getElementById("bookModal").classList.remove("show");
}

// 서재 초기화 버튼 기능
const clearButton = document.getElementById("clearButton");
clearButton.onclick = () => {
  if (confirm("정말로 서재를 초기화하시겠습니까?")) {
    localStorage.removeItem("bookHouse"); // 책 정보 삭제
    bookShelf.innerHTML = ""; // 화면에서 책 표지 삭제
    alert("서재가 초기화되었습니다.");
  }
};

// Delete button functionality
const deleteButton = document.getElementById("deleteButton");
deleteButton.onclick = () => {
  if (currentBookIndex !== null) {
    // 현재 선택된 책 삭제
    bookHouse.splice(currentBookIndex, 1);
    localStorage.setItem("bookHouse", JSON.stringify(bookHouse)); // 변경 사항 저장

    // 화면에서 책 다시 렌더링
    bookShelf.innerHTML = "";
    bookHouse.forEach((book, index) => {
      const bookElement = document.createElement("img");
      bookElement.src =
        book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
      bookElement.alt = book.title;
      bookElement.classList.add("book-cover");
      bookElement.onclick = () => showBookDetails(book, index);
      bookShelf.appendChild(bookElement);
    });

    // 모달 닫기
    closeModal();
    alert("선택한 책이 삭제되었습니다.");
  }
};
