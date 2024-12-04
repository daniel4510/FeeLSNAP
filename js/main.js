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




  