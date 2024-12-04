// 뒤로 가기 버튼 동작 감지
window.addEventListener("popstate", function () {
  window.location.href = "index.html";
});

// bookshelf.html가 로드될 때 브라우저 히스토리 상태 추가
window.history.pushState({}, "Bookshelf", window.location.href);

const emotion = sessionStorage.getItem("emotion");
const books = JSON.parse(sessionStorage.getItem("bookList"));

document.getElementById("emotionTitle").innerText = emotion
  ? `${emotion.toUpperCase()}`
  : "EMOTION";

const bookGrid = document.getElementById("bookGrid");
// 서재 데이터 로드
const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];

// 책 리스트 생성
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
  title.innerText =
    book.title.length > 18 ? book.title.substring(0, 18) + "..." : book.title;

  const author = document.createElement("div");
  author.classList.add("book-author");

  // 저자 길이가 10자를 초과하면 자르고 "..." 추가
  const authorName =
    book.authors && book.authors.length > 0
      ? book.authors.join(", ")
      : "Unknown Author";
  author.innerText =
    authorName.length > 10 ? authorName.substring(0, 10) + "..." : authorName;

  const moreLink = document.createElement("a");
  moreLink.href = book.infoLink || "#";
  moreLink.target = "_blank";
  moreLink.classList.add("book-link");
  moreLink.innerText = "더보기";

  const saveButton = document.createElement("button");
  saveButton.classList.add("save-button");
  saveButton.innerHTML = '<div><span>내</span><span>서재</span><span>담기</span></div>';

  // 이미 서재에 있는 책인지 확인
  const isDuplicate = bookHouse.some(
    (b) => b.title === book.title && b.authors.join(", ") === book.authors.join(", ")
  );

  if (isDuplicate) {
    console.log("Duplicate detected for book:", book.title);
  
    // 기존 버튼의 모든 자식 요소 제거
    while (saveButton.firstChild) {
      saveButton.removeChild(saveButton.firstChild);
    }
    console.log("Cleared button innerHTML:", saveButton.innerHTML);
  
    // 체크 아이콘 생성
    const checkIcon = document.createElement("img");
    checkIcon.src = "./img/check-icon.svg";
    checkIcon.alt = "Added";
    checkIcon.style.width = "20px";
    checkIcon.style.height = "20px";
    checkIcon.style.background = "transparent";
    console.log("Created checkIcon element:", checkIcon);
  
    // 버튼에 체크 아이콘 추가
    saveButton.appendChild(checkIcon);
    console.log("Appended checkIcon to saveButton:", saveButton.innerHTML);
  
    // 버튼 스타일 업데이트
    saveButton.style.backgroundColor = "#0FC0A8";
    saveButton.style.cursor = "default";
  
    // 애니메이션 클래스 제거
    saveButton.classList.add("clicked-button");
    saveButton.classList.add("clicked-button-wrap");
    saveButton.classList.remove("save-button"); // hover 애니메이션 비활성화
  
    // 클릭 비활성화는 마지막에 설정
    setTimeout(() => {
      saveButton.disabled = true;
      console.log("Button disabled:", saveButton.outerHTML);
    }, 0); // 0ms 후에 비활성화
  } else {
    // 버튼 클릭 이벤트 설정
    saveButton.onclick = (event) => saveToBookhouse(book, event.target);
  }
  
  
  

  bookCard.appendChild(coverImage);
  bookCard.appendChild(title);
  bookCard.appendChild(author);
  bookCard.appendChild(moreLink);
  bookCard.appendChild(saveButton);

  bookGrid.appendChild(bookCard);
});

function saveToBookhouse(book, button) {
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

  // 버튼 전체를 참조
  const buttonElement = button.closest(".save-button");

  if (!isDuplicate) {
    bookHouse.push(newBook);
    localStorage.setItem("bookHouse", JSON.stringify(bookHouse));

    // 새 버튼 생성
    const newButton = document.createElement("button");
    newButton.classList.add("save-button", "clicked-button");
    newButton.style.backgroundColor = "#0FC0A8";
    newButton.style.cursor = "default";
    newButton.disabled = true;

    // 체크 아이콘 추가
    const checkIcon = document.createElement("img");
    checkIcon.src = "./img/check-icon.svg";
    checkIcon.alt = "Added";
    checkIcon.style.width = "20px";
    checkIcon.style.height = "20px";
    checkIcon.style.background = "transparent";
    newButton.appendChild(checkIcon);

    // 기존 버튼 교체
    buttonElement.replaceWith(newButton);
  } else {
    alert("이미 서재에 추가된 책입니다.");
  }
}






// 버튼 텍스트 애니메이션 처리
document.querySelectorAll('.save-button').forEach(button => {
  const textContent = button.textContent.trim();

  // 공백을 HTML 엔티티 &nbsp;로 대체하여 처리
  button.innerHTML = '<div><span>' + 
    textContent.split('').map(char => char === ' ' ? '&nbsp;' : char).join('</span><span>') + 
    '</span></div>';
});


function moveToLobby(){
  window.location.href = "index.html";
}
function moveToHouse(){
  window.location.href = "bookhouse.html";
}