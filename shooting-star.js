function createShootingStar() {
  const star = document.createElement('div');
  star.className = 'shooting-star';

  const startX = Math.random() * window.innerWidth;
  const startY = Math.random() * (window.innerHeight * 0.4);

  star.style.left = `${startX}px`;
  star.style.top = `${startY}px`;

  const duration = Math.random() * 1.5 + 2.0;
  star.style.animation = `shoot ${duration}s ease-out forwards`;

  document.body.appendChild(star);

  setTimeout(() => star.remove(), duration * 1000);
}

function launchStars() {
  const count = Math.floor(Math.random() * 4) + 2;

  for (let i = 0; i < count; i++) {
    setTimeout(createShootingStar, i * 250);
  }

  setTimeout(launchStars, Math.random() * 3000 + 2500);
}

// 🌌 스크롤에 따라 배경색 변화
function updateBackgroundOnScroll() {
  const scrollPercent = window.scrollY / (document.body.scrollHeight - window.innerHeight);
  const skyGradient = document.querySelector('.sky-gradient');
  
  let brightness;
  
  if (scrollPercent < 0.25) {
    brightness = 1 - (scrollPercent * 2);
  } else if (scrollPercent < 0.5) {
    brightness = 0.5;
  } else if (scrollPercent < 0.75) {
    brightness = 0.5 + ((scrollPercent - 0.5) * 2);
  } else {
    brightness = 1;
  }
  
  skyGradient.style.filter = `brightness(${brightness})`;
}

// 별 개수 줄이기
function createBackgroundStars() {
  const starCount = 100; // 150 → 100
  
  for (let i = 0; i < starCount; i++) {
    const star = document.createElement('div');
    star.className = 'star';
    
    star.style.left = `${Math.random() * 100}%`;
    star.style.top = `${Math.random() * 100}%`;
    
    const size = Math.random() * 1.5 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    
    const colors = [
      'white',
      'rgba(173, 216, 230, 0.9)',
      'rgba(135, 206, 250, 0.8)',
      'rgba(240, 248, 255, 0.95)'
    ];
    star.style.background = colors[Math.floor(Math.random() * colors.length)];
    
    star.style.opacity = Math.random() * 0.5 + 0.3;
    
    document.body.appendChild(star);
    
    animateStar(star);
  }
}

// 개별 별 반짝임 + 더 빠른 움직임
function animateStar(star) {
  const minOpacity = Math.random() * 0.3 + 0.2;
  const maxOpacity = Math.random() * 0.3 + 0.7;
  const opacitySpeed = Math.random() * 0.008 + 0.003;
  
  // 움직임 속도 2배 증가
  const moveSpeedX = (Math.random() - 0.5) * 0.02; // -0.01 ~ 0.01 (2배)
  const moveSpeedY = (Math.random() - 0.5) * 0.02;
  let posX = parseFloat(star.style.left);
  let posY = parseFloat(star.style.top);
  
  let increasing = Math.random() > 0.5;
  let currentOpacity = parseFloat(star.style.opacity);
  let startTime = performance.now() + Math.random() * 3000;
  
  function animate(timestamp) {
    if (timestamp < startTime) {
      requestAnimationFrame(animate);
      return;
    }
    
    // 반짝임
    if (increasing) {
      currentOpacity += opacitySpeed;
      if (currentOpacity >= maxOpacity) {
        currentOpacity = maxOpacity;
        increasing = false;
      }
    } else {
      currentOpacity -= opacitySpeed;
      if (currentOpacity <= minOpacity) {
        currentOpacity = minOpacity;
        increasing = true;
      }
    }
    
    // 움직임
    posX += moveSpeedX;
    posY += moveSpeedY;
    
    if (posX < -0.5) posX = 100.5;
    if (posX > 100.5) posX = -0.5;
    if (posY < -0.5) posY = 100.5;
    if (posY > 100.5) posY = -0.5;
    
    star.style.opacity = currentOpacity;
    star.style.left = `${posX}%`;
    star.style.top = `${posY}%`;
    
    requestAnimationFrame(animate);
  }
  
  requestAnimationFrame(animate);
}

// 스크롤 이벤트 리스너
window.addEventListener('scroll', updateBackgroundOnScroll);

// 페이지 로드 시 실행
launchStars();
createBackgroundStars();