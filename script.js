const songs = [
  { title: "Jungle", artist: "A Boogie Wit da Hoodie", file: "songs/Jungle - A Boogie Wit da Hoodie.mp3" },
  { title: "Suge", artist: "DaBaby", file: "songs/Suge - DaBaby.mp3" },
  { title: "The Box", artist: "Roddy Ricch", file: "songs/The Box - Roddy Ricch.mp3" },
  // Add more songs here
];

let currentSongIndex = 0;
let isPlaying = false;

const player = document.getElementById("player");
const currentSongDisplay = document.getElementById("current-song");
const playPauseBtn = document.getElementById("play-pause-btn");
const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");

// Create song list
function initializePlayer() {
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
  if (index >= 0 && index < songs.length) {
    currentSongIndex = index;
    const song = songs[index];
    player.src = song.file;
    
    // Try to play, handle potential autoplay restrictions
    const playPromise = player.play();
    if (playPromise !== undefined) {
      playPromise.then(() => {
        isPlaying = true;
        playPauseBtn.textContent = "⏸";
      }).catch((error) => {
        console.log("Autoplay prevented:", error);
        isPlaying = false;
        playPauseBtn.textContent = "▶";
      });
    }
    
    currentSongDisplay.textContent = `${song.title}${song.artist ? ` - ${song.artist}` : ''}`;
  }
}

function togglePlayPause() {
  if (songs.length === 0) return;
  
  if (isPlaying) {
    player.pause();
    playPauseBtn.textContent = "▶";
  } else {
    if (!player.src) {
      playSong(0);
    } else {
      player.play();
      playPauseBtn.textContent = "⏸";
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

// Loading screen functionality
function startExperience() {
  const loadingScreen = document.getElementById('loading-screen');
  const mainContent = document.getElementById('main-content');
  
  // Start playing first song
  playSong(0);
  
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

// Matrix Background Animation
function initMatrix() {
  const canvas = document.getElementById('matrix-canvas');
  const ctx = canvas.getContext('2d');
  
  // Set canvas size
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  
  resizeCanvas();
  window.addEventListener('resize', resizeCanvas);
  
  // Matrix characters (mix of Japanese katakana, numbers, and symbols)
  const chars = "アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const charArray = chars.split('');
  
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  
  // Array to store the y position of each column
  const drops = [];
  for (let x = 0; x < columns; x++) {
    drops[x] = Math.random() * canvas.height;
  }
  
  function draw() {
    // Black background with slight transparency for fading effect
    ctx.fillStyle = 'rgba(0, 0, 0, 0.05)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    ctx.fillStyle = '#00ff00';
    ctx.font = fontSize + 'px monospace';
    
    for (let i = 0; i < drops.length; i++) {
      // Random character
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      
      // x position, y position
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);
      
      // Move drop down
      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }
  
  // Start the animation
  setInterval(draw, 35);
}

// Initialize when page loads
document.addEventListener('DOMContentLoaded', () => {
  initializePlayer();
  initMatrix();
  
  // Add click event to loading screen play button
  const loadingPlayBtn = document.getElementById('loading-play-btn');
  if (loadingPlayBtn) {
    loadingPlayBtn.onclick = startExperience;
  }
  
  // Add smooth transition for take control button
  addTakeControlTransition();
});

// Smooth transition for take control button
function addTakeControlTransition() {
  const takeControlBtn = document.querySelector('.take-control-btn');
  
  if (takeControlBtn) {
    takeControlBtn.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Create the same transition effect as the loading screen
      const mainContent = document.getElementById('main-content');
      
      // Fade out main content
      mainContent.style.opacity = '0';
      
      setTimeout(() => {
        mainContent.style.display = 'none';
        
        setTimeout(() => {
          window.location.href = 'privacy.html';
        }, 50);
      }, 500);
    });
  }
}
