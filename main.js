// Ease-In-Out 함수 정의
Math.easeInOutQuad = function (t) {
    return t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;
};

// 스크롤 애니메이션 함수
function scrollToPosition(targetY, duration = 500) {
    const startY = window.scrollY;
    const distance = targetY - startY;
    const startTime = performance.now();
  
    function scrollAnimation(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1); // 0과 1 사이의 값을 계산
      const easedProgress = Math.easeInOutQuad(progress); // 부드러운 스무스 효과 적용
  
      window.scrollTo(0, startY + distance * easedProgress);
  
      if (progress < 1) {
        requestAnimationFrame(scrollAnimation);
      }
    }
  
    requestAnimationFrame(scrollAnimation);
}

document.querySelector(".nav-emotion").addEventListener('click', () => {
    // 부드럽게 스크롤 이동
    scrollToPosition(1110, 500);
});

document.querySelector(".gohome").addEventListener('click', () => {
    // 부드럽게 스크롤 이동
    scrollToPosition(0, 500);
});

document.querySelector(".nav-intro").addEventListener('click', () => {
    // 부드럽게 스크롤 이동
    scrollToPosition(2250, 500);
});

// 가로 스크롤 막기
window.body.style.overflowX = "hidden";