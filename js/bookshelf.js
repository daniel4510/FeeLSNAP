// 뒤로 가기 버튼 동작 감지
window.addEventListener("popstate", function (event) {
  // index.html로 강제 이동
  window.location.href = "index.html";
});

// bookshelf.html이 로드될 때 브라우저 히스토리 상태 추가
window.history.pushState({}, "Bookshelf", window.location.href);

const emotion = sessionStorage.getItem("emotion");
const books = JSON.parse(sessionStorage.getItem("bookList"));

document.getElementById("emotionTitle").innerText = emotion
  ? `${emotion.toUpperCase()}`
  : "추천 책 6권";

const bookGrid = document.getElementById("bookGrid");

books.forEach((book) => {
  const bookCard = document.createElement("div");
  bookCard.classList.add("book-card");

  const coverImage = document.createElement("img");
  coverImage.src =
    book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
  coverImage.alt = book.title;
  coverImage.classList.add("book-cover");

  const title = document.createElement("div");
  title.classList.add("book-title");

  // 제목 길이가 18자를 초과하면 자르고 "..." 추가
  if (book.title.length > 18) {
    title.innerText = book.title.substring(0, 18) + "...";
  } else {
    title.innerText = book.title;
  }

  const author = document.createElement("div");
  author.classList.add("book-author");

  // 저자 길이가 10자를 초과하면 자르고 "..." 추가
  const authorName =
    book.authors && book.authors.length > 0
      ? book.authors.join(", ")
      : "Unknown Author";

  if (authorName.length > 10) {
    author.innerText = authorName.substring(0, 10) + "...";
  } else {
    author.innerText = authorName;
  }

  const moreLink = document.createElement("a");
  moreLink.href = book.infoLink || "#";
  moreLink.target = "_blank";
  moreLink.classList.add("book-link");
  moreLink.innerText = "더보기";

  const saveButton = document.createElement("button");
  saveButton.classList.add("save-button");
  saveButton.innerText = "서재에 추가";
  saveButton.onclick = () => saveToBookhouse(book);

  bookCard.appendChild(coverImage);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(moreLink);
  bookCard.appendChild(saveButton);

  bookGrid.appendChild(bookCard);
});


function saveToBookhouse(book) {
  const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];
  const currentDate = new Date().toISOString().split("T")[0];

  const newBook = {
    title: book.title,
    authors: book.authors.length ? book.authors : ["Unknown Author"],
    thumbnail: book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image",
    infoLink: book.infoLink || "#",
    emotion: sessionStorage.getItem("emotion") || "Unknown",
    date: currentDate,
  };

  const isDuplicate = bookHouse.some(
    (b) => b.title === newBook.title && b.authors.join(",") === newBook.authors.join(",")
  );

  if (!isDuplicate) {
    bookHouse.push(newBook);
    localStorage.setItem("bookHouse", JSON.stringify(bookHouse));
    alert(`${book.title}이(가) 서재에 추가되었습니다.`);
  } else {
    alert("이미 서재에 추가된 책입니다.");
  }
}
