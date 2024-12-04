async function moveToLoading() {
  window.location.href = "loading.html";
}

async function moveToBookhouse() {
  window.location.href = "bookhouse.html";
}

function moveToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

function moveToStepSection() {
  document.querySelector(".stepbystep").scrollIntoView({ behavior: "smooth" });
}

function moveToEmotionSection() {
  document.querySelector(".emotions").scrollIntoView({ behavior: "smooth" });
}

function moveToEnd() {
  window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });
}

// 감정 선택 시 emotionloading.html로 이동
function selectEmotion(emotion) {
  sessionStorage.setItem("selectedEmotion", emotion); // 선택한 감정을 저장
  window.location.href = "emotionloading.html";
}

window.addEventListener("scroll", () => {
  const mainPage = document.querySelector(".mainpage"); // .mainpage 요소
  const startFixedPos = 50; // 고정된 위치 (80px)
  const scrollY = window.scrollY; // 스크롤 위치
  const fadeStart = 150; // opacity 감소 시작점
  const fadeEnd = 250; // opacity 0이 되는 끝점
  const moveEnd = 250; // 이동이 끝나는 지점

  // 위치 이동
  let offset = startFixedPos;
  if (scrollY > fadeStart && scrollY < moveEnd) {
    offset = startFixedPos - (scrollY - fadeStart); // 스크롤에 따라 위로 이동
  } else if (scrollY >= moveEnd) {
    offset = startFixedPos - (moveEnd - fadeStart); // 최종 위치 고정
  }
  mainPage.style.top = `${offset}px`; // 위치 조정

  // opacity 계산
  let opacity = 1;
  if (scrollY > fadeStart && scrollY < fadeEnd) {
    opacity = 1 - (scrollY - fadeStart) / (fadeEnd - fadeStart); // 1에서 0으로 감소
  } else if (scrollY >= fadeEnd) {
    opacity = 0; // 완전히 투명
  }
  mainPage.style.opacity = opacity.toString(); // opacity 적용
});


window.addEventListener("scroll", () => {
  const transitionTitle = document.querySelector(".transition-title"); // .transition-title 요소
  const startFixedPos = 450; // 화면 중앙에 고정되는 위치
  const fadeStart = 300; // opacity 증가 시작점
  const fadeEnd = 450; // opacity 1이 되는 끝점

  // 항상 고정된 상태 유지
  transitionTitle.style.position = "fixed";
  transitionTitle.style.left = "50%"; // 중앙 정렬
  transitionTitle.style.transform = "translateX(-50%)";

  // 위치 고정
  let offset = startFixedPos;

  // opacity 계산
  let opacity = 0;
  if (scrollY > fadeStart && scrollY < fadeEnd) {
    opacity = (scrollY - fadeStart) / (fadeEnd - fadeStart); // 0에서 1로 증가
  } else if (scrollY >= fadeEnd) {
    opacity = 1; // 완전히 불투명
  } else {
    opacity = 0; // 초기 상태로 복구
  }

  transitionTitle.style.top = `${offset}px`; // 위치 조정
  transitionTitle.style.opacity = opacity.toString(); // opacity 적용
});


// IntersectionObserver를 활용한 감정 카드 애니메이션
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const cell = entry.target;
      cell.classList.add("visible");
    } else {
      const cell = entry.target;
      cell.classList.remove("visible");
    }
  });
});

document.querySelectorAll(".cell").forEach((cell) => observer.observe(cell));
