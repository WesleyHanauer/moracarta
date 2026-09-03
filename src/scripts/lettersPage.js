import { letters } from '../loaders/lettersLoader.js';
import generatePalette from './generatePalette.js';

// Checks the URL to see what ID is select.
// Then loads letter with that same ID.
const params = new URLSearchParams(window.location.search);
const requestedId = parseInt(params.get('id'), 10);
const letter = letters.find((entry) => entry.id === requestedId);

function applyEnvelopePalette(letterItem) {
  const palette = generatePalette(letterItem);
  document.querySelector('.env-background').style.background = palette.envelope;

  const flapPolygon = document.querySelector('.env-flap svg polygon');
  if (flapPolygon) {
    flapPolygon.setAttribute('fill', palette.flap);
  }

  const sidePolygons = document.querySelectorAll('.env-body-svg svg polygon');
  if (sidePolygons.length === 3) {
    sidePolygons[0].setAttribute('fill', palette.shadow);
    sidePolygons[1].setAttribute('fill', palette.shadow);
    sidePolygons[2].setAttribute('fill', palette.base);
  }
}

if (!letter) {
  document.getElementById('error-message').style.display = 'block';
  document.getElementById('envelope-wrap').style.display = 'none';
  document.getElementById('letter-wrap').style.display = 'none';
  document.getElementById('letter-nav').style.display = 'none';
} else {
  document.title = letter.title;

  document.getElementById('letter-date').textContent = letter.date;
  document.getElementById('letter-title').textContent = letter.title;
  document.getElementById('letter-body').innerHTML = letter.content
      .split(/\n\s*\n/)
      .filter(paragraph => paragraph.trim())
      .map(paragraph => `<p>${paragraph.trimEnd()}</p>`)
      .join('');

  applyEnvelopePalette(letter);
  document.querySelector('.envelope-stage').classList.add('ready');

  const sortedLetters = letters.slice().sort((first, second) => first.id - second.id);
  const currentIndex = sortedLetters.findIndex((entry) => entry.id === requestedId);
  const previousLetter = currentIndex > 0 ? sortedLetters[currentIndex - 1] : null;
  const nextLetter = currentIndex < sortedLetters.length - 1 ? sortedLetters[currentIndex + 1] : null;

  document.getElementById('letter-counter').textContent = `${currentIndex + 1} Of ${sortedLetters.length}`;

  if (previousLetter) {
    const previousButton = document.getElementById('nav-previous');
    previousButton.href = `./letters.html?id=${previousLetter.id}`;
    previousButton.classList.remove('invisible');
  }

  if (nextLetter) {
    const nextButton = document.getElementById('nav-next');
    nextButton.href = `./letters.html?id=${nextLetter.id}`;
    nextButton.classList.remove('invisible');
  }

  startHeartAnimation();

  // Animate the envelope opening, sealing, and letter reveal in timed stages.
  window.setTimeout(() => {
    document.getElementById('flap').classList.add('open');
    document.getElementById('seal').classList.add('fading');
  }, 400);

  window.setTimeout(() => {
    document.getElementById('flap').classList.add('behind');
  }, 1050);

  window.setTimeout(() => {
    document.getElementById('paper').classList.add('leaving');
  }, 900);

  window.setTimeout(() => {
    document.getElementById('letter-wrap').classList.add('visible');
    document.getElementById('letter-nav').classList.add('visible');
    document.getElementById('envelope-wrap').style.display = 'none';

  }, 2100);
}

  // Floating heart particle animation for the letter view background.
  // Particles are born after a delay, float upward, fade at the top, and die
  // when they leave the canvas to keep the animation visually light.
function startHeartAnimation() {
  const canvas = document.getElementById('canvas-hearts');
  const context = canvas.getContext('2d');
  const devicePixelRatio = window.devicePixelRatio || 1;

  canvas.width = window.innerWidth * devicePixelRatio;
  canvas.height = window.innerHeight * devicePixelRatio;
  canvas.style.width = `${window.innerWidth}px`;
  canvas.style.height = `${window.innerHeight}px`;
  context.scale(devicePixelRatio, devicePixelRatio);

  const width = window.innerWidth;
  const height = window.innerHeight;
  const colors = ['#c0392b', '#e74c3c', '#e91e63', '#ff4081', '#ad1457', '#f06292', '#ff6b6b', '#d63031', '#ff8a80'];

  function drawHeart(radius) {
    context.beginPath();
    context.moveTo(0, -radius * 0.3);
    context.bezierCurveTo(radius, -radius * 1.1, radius * 1.5, radius * 0.4, 0, radius);
    context.bezierCurveTo(-radius * 1.5, radius * 0.4, -radius, -radius * 1.1, 0, -radius * 0.3);
    context.closePath();
  }

  const totalParticles = 55;
  const particles = [];

  for (let index = 0; index < totalParticles; index += 1) {
    const angle = (Math.random() - 0.5) * (Math.PI / 1.5);
    const velocity = 1.2 + Math.random() * 2.2;
    const radius = 8 + Math.random() * 18;

    particles.push({
      x: width * 0.05 + Math.random() * width * 0.9,
      y: height + radius * 2,
      velocityX: Math.sin(angle) * velocity,
      velocityY: -Math.cos(angle) * velocity,
      radius,
      rotation: (Math.random() - 0.5) * 0.06,
      currentAngle: 0,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0,
      delay: Math.random() * 2500,
      born: false,
      dead: false
    });
  }

  let startTime = null;

  function animate(timestamp) {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    context.clearRect(0, 0, width, height);

    let allDead = true;

    particles.forEach((particle) => {
      if (elapsed < particle.delay) {
        allDead = false;
        return;
      }

      if (!particle.born) {
        particle.born = true;
      }

      if (particle.dead) {
        return;
      }

      allDead = false;
      particle.x += particle.velocityX;
      particle.y += particle.velocityY;
      particle.velocityY -= 0.012;
      particle.velocityX *= 0.998;
      particle.currentAngle += particle.rotation;

      const fraction = 1 - (particle.y / height);
      if (fraction < 0.08) {
        particle.alpha = fraction / 0.08;
      } else if (fraction > 0.55) {
        particle.alpha = Math.max(0, 1 - (fraction - 0.55) / 0.45);
      } else {
        particle.alpha = 1;
      }

      if (particle.y < -particle.radius * 3) {
        particle.dead = true;
        return;
      }

      context.save();
      context.translate(particle.x, particle.y);
      context.rotate(particle.currentAngle);
      context.globalAlpha = particle.alpha;
      context.shadowColor = particle.color;
      context.shadowBlur = 6;
      context.fillStyle = particle.color;
      drawHeart(particle.radius);
      context.fill();
      context.restore();
    });

    if (!allDead) {
      window.requestAnimationFrame(animate);
    } else {
      context.clearRect(0, 0, width, height);
    }
  }
  window.requestAnimationFrame(animate);
}