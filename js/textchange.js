const changeText = () => {
  const changeTextContainer = document.querySelector('.change-text');
  const textItems = changeTextContainer.querySelectorAll('div');
  let currentIndex = 0;

  // 초기 상태: 각 텍스트의 위치 설정
  textItems.forEach((item, index) => {
    item.style.transform = `translateY(${index * 100}%)`;
    item.style.transition = 'transform 0.5s ease'; // 부드러운 애니메이션
  });

  setInterval(() => {
    // 현재 텍스트를 위로 이동
    textItems[currentIndex].style.transform = `translateY(-100%)`;

    // 다음 텍스트를 아래에서 준비시키고 중앙으로 이동
    const nextIndex = (currentIndex + 1) % textItems.length;

    // 다음 텍스트를 아래에서 준비
    textItems[nextIndex].style.transition = 'none'; // 위치 초기화 시 애니메이션 제거
    textItems[nextIndex].style.transform = `translateY(100%)`;

    // 다음 텍스트를 중앙으로 이동
    setTimeout(() => {
      textItems[nextIndex].style.transition = 'transform 0.5s ease';
      textItems[nextIndex].style.transform = `translateY(0)`;
    }, 50); // 약간의 지연 후 애니메이션 실행

    // 인덱스 업데이트
    currentIndex = nextIndex;
  }, 2000); // 2초마다 텍스트 변경
};

// 애니메이션 시작
changeText();
