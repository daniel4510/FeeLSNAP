const dots = document.querySelector('.dots');
let dotState = 0;

setInterval(() => {
  dotState = (dotState + 1) % 4; // 0 -> 1 -> 2 -> 3 -> 0
  dots.textContent = '.'.repeat(dotState); // 점 개수에 따라 텍스트 변경
}, 400); // 200ms마다 실행
