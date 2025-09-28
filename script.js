// Footer year update
document.getElementById("year").textContent = new Date().getFullYear();

// Interactive glow effect
const glowBtn = document.getElementById("glowBtn");
if (glowBtn) {
  glowBtn.addEventListener("click", () => {
    document.body.style.transition = "background 1.5s ease-in-out";
    document.body.style.background = "linear-gradient(to bottom, #1e2a38, #3a4b5c, #ff7b00)";
    glowBtn.textContent = "🔥 Fire’s Lit!";
  });
}

// Snowfall Effect
const canvas = document.getElementById("snowCanvas");
const ctx = canvas.getContext("2d");
let snowflakes = [];

function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
window.addEventListener("resize", resizeCanvas);
resizeCanvas();

function createSnowflakes() {
  const x = Math.random() * canvas.width;
  const y = Math.random() * canvas.height;
  const radius = Math.random() * 4 + 1;
  const speed = Math.random() * 0.4 + 0.2; // slower, featherlike
  const drift = (Math.random() - 0.5) * 0.3; // gentle horizontal drift
  snowflakes.push({ x, y, radius, speed, drift });
}

function drawSnowflakes() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.globalAlpha = 0.85; // more opaque
  ctx.fillStyle = "lightblue"; // light blue snowflakes
  ctx.shadowColor = "rgba(60, 60, 60, 0.25)"; // soft gray shadow
  ctx.shadowBlur = 12; // noticable blur

  ctx.beginPath();
  for (let flake of snowflakes) {
    ctx.moveTo(flake.x, flake.y);
    ctx.arc(flake.x, flake.y, flake.radius, 0, Math.PI * 2);
  }
  ctx.fill();

  // Reset shadow and alpha for other drawings
  ctx.shadowBlur = 0;
  ctx.globalAlpha = 1.0; // reset alpha
  updateSnowflakes();
}

function updateSnowflakes() {
  for (let flake of snowflakes) {
    flake.y += flake.speed;
    flake.x += flake.drift; // featherlike drift
    if (flake.y > canvas.height) {
      flake.y = -flake.radius;
      flake.x = Math.random() * canvas.width;
    }
    // wrap horizontally if needed
    if (flake.x < 0) flake.x = canvas.width;
    if (flake.x > canvas.width) flake.x = 0;
  }
}

function snowLoop() {
  drawSnowflakes();
  requestAnimationFrame(snowLoop);
}

// Initialize snow
for (let i = 0; i < 150; i++) {
  createSnowflakes();
}
snowLoop();
