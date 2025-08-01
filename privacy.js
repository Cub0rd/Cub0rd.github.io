// Privacy Page JavaScript

// Privacy page song list (different from main page)
const songs = [
  { title: "Animal I Have Become", artist: "Three Days Grace", file: "../songs/Animal I Have Become - Three Days Grace.mp3" },
  { title: "Jungle", artist: "A Boogie Wit da Hoodie", file: "../songs/Jungle - A Boogie Wit da Hoodie.mp3" },
  { title: "Suge", artist: "DaBaby", file: "../songs/Suge - DaBaby.mp3" },
  { title: "The Box", artist: "Roddy Ricch", file: "../songs/The Box - Roddy Ricch.mp3" }
];

let currentSongIndex = 0;
let isPlaying = false;

// Page initialization with smooth transition
document.addEventListener('DOMContentLoaded', () => {
  // Initialize the freedom canvas background immediately
  initFreedomCanvas();
  
  // Add smooth scroll behavior for links
  addSmoothScrolling();
  
  // Add card effects
  addCardEffects();
  
  // Add smooth transition for back button
  addBackButtonTransition();
  
  // Initialize music player
  initializePlayer();
  
  // Add click event to loading screen play button
  const loadingPlayBtn = document.getElementById('loading-play-btn');
  if (loadingPlayBtn) {
    loadingPlayBtn.onclick = startPrivacyExperience;
  }
});

// Loading screen functionality for privacy page
function startPrivacyExperience() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  // Start playing first song
  if (songs.length > 0) {
    playSong(0);
  }
  
  // Fade out loading screen and fade in main content
  loadingScreen.style.opacity = '0';
  
  setTimeout(() => {
    loadingScreen.style.display = 'none';
    mainContent.style.display = 'block';
    setTimeout(() => {
      mainContent.style.opacity = '1';
    }, 50);
  }, 500);
}

// Music Player Functions
function initializePlayer() {
  const player = document.getElementById("player");
  const currentSongDisplay = document.getElementById("current-song");
  const playPauseBtn = document.getElementById("play-pause-btn");
  const prevBtn = document.getElementById("prev-btn");
  const nextBtn = document.getElementById("next-btn");

  if (!player || !currentSongDisplay || !playPauseBtn || !prevBtn || !nextBtn) {
    return; // Elements not found, skip initialization
  }

  // Event listeners
  playPauseBtn.onclick = togglePlayPause;
  prevBtn.onclick = previousSong;
  nextBtn.onclick = nextSong;

  player.onended = nextSong;
  player.onplay = () => {
    isPlaying = true;
    playPauseBtn.textContent = "⏸";
  };
  player.onpause = () => {
    isPlaying = false;
    playPauseBtn.textContent = "▶";
  };
}

function playSong(index) {
  const player = document.getElementById("player");
  const currentSongDisplay = document.getElementById("current-song");
  const playPauseBtn = document.getElementById("play-pause-btn");

  if (index >= 0 && index < songs.length && player && currentSongDisplay) {
    currentSongIndex = index;
    const song = songs[index];
    player.src = song.file;
    
    // Try to play, handle potential autoplay restrictions
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        if (playPauseBtn) playPauseBtn.textContent = "⏸";
      }).catch((error) => {
        console.log("Autoplay prevented:", error);
        isPlaying = false;
        if (playPauseBtn) playPauseBtn.textContent = "▶";
      });
    }
    
    currentSongDisplay.textContent = `${song.title}${song.artist ? ` - ${song.artist}` : ''}`;
  }
}

function togglePlayPause() {
  const player = document.getElementById("player");
  const playPauseBtn = document.getElementById("play-pause-btn");
  
  if (songs.length === 0 || !player) return;
  
  if (isPlaying) {
    player.pause();
    if (playPauseBtn) playPauseBtn.textContent = "▶";
  } else {
    if (!player.src) {
      playSong(0);
    } else {
      player.play();
      if (playPauseBtn) playPauseBtn.textContent = "⏸";
    }
  }
  isPlaying = !isPlaying;
}

function previousSong() {
  const newIndex = currentSongIndex > 0 ? currentSongIndex - 1 : songs.length - 1;
  playSong(newIndex);
}

function nextSong() {
  const newIndex = currentSongIndex < songs.length - 1 ? currentSongIndex + 1 : 0;
  playSong(newIndex);
}

// Smooth transition for back button
function addBackButtonTransition() {
  const backBtn = document.getElementById('back-btn');
  if (backBtn) {
    backBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Direct navigation to home page without loading screen
      window.location.href = backBtn.href;
    });
  }
}

// Freedom Canvas Animation (Neural Network Style)
function initFreedomCanvas() {
  const canvas = document.getElementById('freedom-canvas');
  if (!canvas) return;
  
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Neural network nodes
  const nodes = [];
  const connections = [];
  const nodeCount = 60;
  const maxConnections = 3;
  const connectionDistance = 120;
  
  // Initialize nodes
  for (let i = 0; i < nodeCount; i++) {
    nodes.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      vx: (Math.random() - 0.5) * 0.3,
      vy: (Math.random() - 0.5) * 0.3,
      radius: Math.random() * 2 + 1,
      opacity: Math.random() * 0.8 + 0.2,
      pulsePhase: Math.random() * Math.PI * 2,
      connections: []
    });
  }
  
  // Create connections
  function updateConnections() {
    connections.length = 0;
    
    for (let i = 0; i < nodes.length; i++) {
      nodes[i].connections = [];
      
      for (let j = i + 1; j < nodes.length; j++) {
        const dx = nodes[i].x - nodes[j].x;
        const dy = nodes[i].y - nodes[j].y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < connectionDistance && 
            nodes[i].connections.length < maxConnections && 
            nodes[j].connections.length < maxConnections) {
          
          const connection = {
            from: i,
            to: j,
            opacity: (1 - distance / connectionDistance) * 0.3,
            pulse: 0
          };
          
          connections.push(connection);
          nodes[i].connections.push(connection);
          nodes[j].connections.push(connection);
        }
      }
    }
  }
  
  // Animation loop
  function animate() {
    // Clear canvas with fade effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Update nodes
    nodes.forEach(node => {
      // Move nodes
      node.x += node.vx;
      node.y += node.vy;
      
      // Bounce off edges
      if (node.x < 0 || node.x > canvas.width) node.vx *= -1;
      if (node.y < 0 || node.y > canvas.height) node.vy *= -1;
      
      // Keep nodes in bounds
      node.x = Math.max(0, Math.min(canvas.width, node.x));
      node.y = Math.max(0, Math.min(canvas.height, node.y));
      
      // Update pulse
      node.pulsePhase += 0.02;
      const pulse = (Math.sin(node.pulsePhase) + 1) * 0.5;
      
      // Draw node
      const gradient = ctx.createRadialGradient(node.x, node.y, 0, node.x, node.y, node.radius * 3);
      gradient.addColorStop(0, `rgba(0, 255, 0, ${node.opacity * (0.5 + pulse * 0.5)})`);
      gradient.addColorStop(1, 'rgba(0, 255, 0, 0)');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(node.x, node.y, node.radius * (1 + pulse * 0.3), 0, Math.PI * 2);
      ctx.fill();
    });
    
    // Update connections occasionally
    if (Math.random() < 0.05) {
      updateConnections();
    }
    
    // Draw connections
    connections.forEach(connection => {
      const nodeA = nodes[connection.from];
      const nodeB = nodes[connection.to];
      
      // Animate connection pulse
      connection.pulse += 0.03;
      const pulseFactor = (Math.sin(connection.pulse) + 1) * 0.5;
      
      // Draw connection line
      const gradient = ctx.createLinearGradient(nodeA.x, nodeA.y, nodeB.x, nodeB.y);
      gradient.addColorStop(0, `rgba(0, 255, 0, ${connection.opacity * 0.3})`);
      gradient.addColorStop(0.5, `rgba(0, 255, 0, ${connection.opacity * (0.5 + pulseFactor * 0.3)})`);
      gradient.addColorStop(1, `rgba(0, 255, 0, ${connection.opacity * 0.3})`);
      
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 1 + pulseFactor * 0.5;
      ctx.beginPath();
      ctx.moveTo(nodeA.x, nodeA.y);
      ctx.lineTo(nodeB.x, nodeB.y);
      ctx.stroke();
    });
    
    requestAnimationFrame(animate);
  }
  
  // Start animation
  updateConnections();
  animate();
}

// Smooth scrolling for internal links
function addSmoothScrolling() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
}

// Card hover effects
function addCardEffects() {
  const privacyCards = document.querySelectorAll('.privacy-card');
  
  privacyCards.forEach(card => {
    card.addEventListener('mouseenter', () => {
      card.style.boxShadow = '0 15px 35px rgba(0, 255, 0, 0.2)';
    });
    
    card.addEventListener('mouseleave', () => {
      card.style.boxShadow = '0 8px 30px rgba(0, 0, 0, 0.3)';
    });
  });
}
