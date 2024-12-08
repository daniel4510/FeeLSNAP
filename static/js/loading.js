const dots = document.querySelector('.dots');
let dotState = 0;

setInterval(() => {
  dotState = (dotState + 1) % 4;
  dots.textContent = '.'.repeat(dotState);
}, 400);
