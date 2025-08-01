function startExperience() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  loadingScreen.style.opacity = '0';
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    setTimeout(() => {
      mainContent.style.opacity = '1';
      initMatrix();
    }, 50);
  }, 500);
}

function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  
  const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charArray = chars.split('');
  
  const fontSize = 16;
  const columns = Math.floor(canvas.width / fontSize);
  
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = 0;
  }
  
  function draw() {
    ctx.fillStyle = 'rgba(0, 0, 0, 0.08)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.985) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  setInterval(draw, 60);
}

function showPrivacySection() {
  const layoutContainer = document.querySelector('.layout-container');
  const privacySection = document.getElementById('privacy-section');
  
  layoutContainer.style.opacity = '0';
  
  setTimeout(() => {
    layoutContainer.style.display = 'none';
    privacySection.style.display = 'block';
    setTimeout(() => {
      privacySection.style.opacity = '1';
    }, 50);
  }, 300);
}

function showMainSection() {
  const layoutContainer = document.querySelector('.layout-container');
  const privacySection = document.getElementById('privacy-section');
  
  privacySection.style.opacity = '0';
  
  setTimeout(() => {
    privacySection.style.display = 'none';
    layoutContainer.style.display = 'grid';
    setTimeout(() => {
      layoutContainer.style.opacity = '1';
    }, 50);
  }, 300);
}

document.addEventListener('DOMContentLoaded', () => {
  const loadingPlayBtn = document.getElementById('loading-play-btn');
  if (loadingPlayBtn) {
    loadingPlayBtn.onclick = startExperience;
  }
  
  const privacyBtn = document.getElementById('privacy-btn');
  if (privacyBtn) {
    privacyBtn.onclick = showPrivacySection;
  }
  
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.onclick = showMainSection;
  }
});
