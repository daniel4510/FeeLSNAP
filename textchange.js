const changeText = () => {
    const changeTextContainer = document.querySelector('.change-text');
    const textItems = changeTextContainer.querySelectorAll('span');
    let currentIndex = 0;
  
    setInterval(() => {
      // 현재 텍스트를 슬라이드 위로 이동
      textItems[currentIndex].style.transform = 'translateY(-100%)';
  
      // 다음 텍스트를 아래에서 위로 슬라이드
      const nextIndex = (currentIndex + 1) % textItems.length;
      textItems[nextIndex].style.transform = 'translateY(0)';
  
      // 이전 텍스트 초기화
      setTimeout(() => {
        textItems[currentIndex].style.transition = 'none';
        textItems[currentIndex].style.transform = 'translateY(100%)';
        setTimeout(() => textItems[currentIndex].style.transition = 'transform 0.5s ease');
        currentIndex = nextIndex;
      }, 500);
    }, 2000); // 2초마다 텍스트 변경
  };
  
  // 애니메이션 시작
  changeText();
  