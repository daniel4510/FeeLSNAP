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


// 가로 스크롤 막기
window.body.style.overflowX = "hidden";



window.addEventListener('scroll', () => {
    const mainpage = document.querySelector('.mainpage');
    const transitionTitle = document.querySelector('.transition-title');
    const scrollY = window.scrollY;
  
    // 메인 페이지 이동 및 희미해짐
    if (scrollY <= 300) {
      mainpage.style.opacity = 1 - scrollY / 300; // opacity 점진적으로 감소
      mainpage.style.transform = `translateY(-${scrollY / 15}px)`; // 위로 이동
  
      // 트랜지션 타이틀 나타남
      transitionTitle.style.opacity = scrollY / 300; // opacity 점진적으로 증가
      transitionTitle.style.transform = `translateY(${20 - scrollY / 15}px)`; // 아래에서 위로 이동
    }
  
    // 스크롤 되돌림 (위로 이동 시)
    if (scrollY < 300) {
      mainpage.style.opacity = 1 - scrollY / 300; // 메인 페이지 opacity 복구
      mainpage.style.transform = `translateY(-${scrollY / 15}px)`; // 원래 위치로 복구
  
      transitionTitle.style.opacity = scrollY / 300; // 트랜지션 타이틀 opacity 복구
      transitionTitle.style.transform = `translateY(${20 - scrollY / 15}px)`; // 원래 위치로 복구
    }
  });
  