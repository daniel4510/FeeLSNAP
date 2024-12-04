const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
      if (entry.isIntersecting) {
          const cell = entry.target;
          cell.classList.add('visible');
      } else {
          cell.classList.remove('visible');
      }
  });
});

document.querySelectorAll('.cell').forEach(cell => observer.observe(cell));


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
  document.querySelector(".stepbystep").scrollIntoView({ top: 150, behavior: "smooth" });
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

window.body.style.overflowX = "hidden";





  