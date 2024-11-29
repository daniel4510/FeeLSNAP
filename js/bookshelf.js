const emotion = sessionStorage.getItem("emotion");
      const books = JSON.parse(sessionStorage.getItem("bookList"));

      document.getElementById("emotionTitle").innerText = emotion
        ? emotion.toUpperCase()
        : "Emotion";

      books.forEach((book, index) => {
        const coverImage = document.getElementById(`cover${index + 1}`);
        if (coverImage) {
          coverImage.src =
            book.thumbnail ||
            "https://via.placeholder.com/100x150?text=No+Image";
          coverImage.onclick = () => showBookDetails(book);
        }
      });

      function showBookDetails(book) {
        document.getElementById("modalThumbnail").src =
          book.thumbnail || "https://via.placeholder.com/100x150?text=No+Image";
        document.getElementById("modalTitle").innerText = book.title;
      
        const descriptionElement = document.getElementById("modalDescription");
        const fullDescription = book.description || "No description available.";
      
        // 설명이 300자를 초과할 경우, 300자까지만 표시하고 "더보기" 추가
        if (fullDescription.length > 90) {
          descriptionElement.innerText = fullDescription.slice(0, 90) + "... ";
        } else {
          descriptionElement.innerText = fullDescription;
        }
      
        // "더보기" 링크 생성
        const moreLink = document.createElement("a");
        moreLink.href = book.infoLink || "#"; // 상세 페이지로 이동 (링크가 없으면 "#" 사용)
        moreLink.innerText = "더보기";
        moreLink.target = "_blank"; // 새 창에서 열기
      
        // "더보기" 링크 중복 추가 방지
        if (!descriptionElement.querySelector("a")) {
          descriptionElement.appendChild(moreLink);
        }
      
        // 기존 버튼 삭제 후 "서재에 추가" 버튼 생성
        const modalContent = document.querySelector(".modal-content");
        const existingButton = modalContent.querySelector(".save-button");
        if (existingButton) {
          modalContent.removeChild(existingButton);
        }
      
        const saveButton = document.createElement("button");
        saveButton.innerText = "서재에 추가";
        saveButton.classList.add("save-button");
      
        // 버튼 클릭 이벤트: 현재 book 객체 전달
        saveButton.onclick = () => saveToBookhouse(book);
      
        modalContent.appendChild(saveButton);
      
        document.getElementById("bookModal").classList.add("show"); // 모달 표시
      }
      

      function saveToBookhouse(book) {
        const bookHouse = JSON.parse(localStorage.getItem("bookHouse")) || [];
        const currentDate = new Date().toISOString().split("T")[0]; // YYYY-MM-DD 형식으로 날짜 저장
        const emotion = sessionStorage.getItem("emotion") || "Unknown"; // 현재 감정을 가져옴
      
        const newBook = {
          title: book.title,
          authors: book.authors && book.authors.length > 0 ? book.authors : ["Unknown Author"], // authors가 없거나 빈 배열일 경우 기본값 설정
          thumbnail:
            book.thumbnail ||
            "https://via.placeholder.com/100x150?text=No+Image",
          infoLink: book.infoLink || "#",
          emotion: emotion,
          date: currentDate,
        };
      
        console.log("현재 저장하려는 책:", newBook.title, newBook.authors.join(","));
      
        // 중복 저장 방지: 제목과 저자 모두 동일한 경우 중복으로 간주
        const isDuplicate = bookHouse.some((b) => {
          const titleMatch = b.title === newBook.title;
          const authorMatch =
            (b.authors.join(",") || "Unknown Author") ===
            (newBook.authors.join(",") || "Unknown Author");
      
          console.log(
            `비교: 저장된 제목="${b.title}" vs 저장하려는 제목="${newBook.title}" => ${titleMatch}`
          );
          console.log(
            `비교: 저장된 저자="${b.authors.join(",")}" vs 저장하려는 저자="${newBook.authors.join(",")}" => ${authorMatch}`
          );
      
          return titleMatch && authorMatch;
        });
      
        if (!isDuplicate) {
          bookHouse.push(newBook);
          localStorage.setItem("bookHouse", JSON.stringify(bookHouse));
          alert(`${book.title}이(가) 서재에 추가되었습니다.`);
        } else {
          alert("이미 서재에 추가된 책입니다.");
        }
      }
      

      // 모달 외부 클릭 시 닫기 이벤트 설정
      window.onclick = function (event) {
        const modal = document.getElementById("bookModal");
        if (event.target === modal) {
          closeModal();
        }
      };

      // 모달 닫기 함수
      function closeModal() {
        document.getElementById("bookModal").classList.remove("show");
      }

      function closeModal() {
        document.getElementById("bookModal").classList.remove("show"); // 모달 숨기기
      }