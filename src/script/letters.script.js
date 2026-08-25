import { getTranslation } from './i18n.js';
import globalVariables from '../config/globalVariables.js';
import { letters } from '../data/letters.js';

console.log('letters.script loaded');

const params = new URLSearchParams(window.location.search);
const requestedId = parseInt(params.get('id'), 10);
const letter = letters.find((entry) => entry.id === requestedId);

// A set of base color families used to generate a unique yet consistent
// envelope palette for each letter based on its id, title, and date.
const paletteFamilies = [
  { hue: 18, sat: 54, light: 88, sealHue: 345, sealSat: 76, sealLight: 42 },
  { hue: 26, sat: 48, light: 86, sealHue: 12, sealSat: 72, sealLight: 38 },
  { hue: 4, sat: 50, light: 84, sealHue: 5, sealSat: 78, sealLight: 34 },
  { hue: 38, sat: 42, light: 90, sealHue: 24, sealSat: 66, sealLight: 36 },
  { hue: 8, sat: 58, light: 86, sealHue: 6, sealSat: 82, sealLight: 30 },
  { hue: 12, sat: 50, light: 88, sealHue: 11, sealSat: 74, sealLight: 33 },
  { hue: 22, sat: 46, light: 92, sealHue: 20, sealSat: 68, sealLight: 40 },
  { hue: 16, sat: 60, light: 84, sealHue: 5, sealSat: 86, sealLight: 32 },
  { hue: 28, sat: 52, light: 90, sealHue: 15, sealSat: 70, sealLight: 38 },
  { hue: 14, sat: 44, light: 88, sealHue: 8, sealSat: 80, sealLight: 36 }
];

function hashString(value) {
  // Simple deterministic string hash used to select a palette and variant.
  // This keeps each letter appearance stable across page loads.
  let hash = 0;
  for (let index = 0; index < value.length; index += 1) {
    hash = ((hash << 5) - hash) + value.charCodeAt(index);
    hash |= 0;
  }
  return Math.abs(hash);
}

function clamp(value, min, max) {
  return Math.min(Math.max(value, min), max);
}

function generatePalette(letterItem) {
  // Build a deterministic palette based on the letter's identity.
  // The base hash selects one of the palette families, while the variant
  // arrays add subtle shifts to keep similar letters visually distinct.
  const baseHash = hashString(`${letterItem.id}|${letterItem.title}|${letterItem.date}`);
  const family = paletteFamilies[baseHash % paletteFamilies.length];
  const variant = Math.floor(baseHash / paletteFamilies.length) % 7;
  const hueShift = [0, 14, -12, 20, -18, 26, -22][variant];
  const satShift = [0, 8, -6, 12, -10, 14, -8][variant];
  const lightShift = [0, -8, 8, -5, 6, -10, 10][variant];

  const envelope = `hsl(${clamp(family.hue + hueShift, 0, 360)}, ${clamp(family.sat + satShift, 42, 72)}%, ${clamp(family.light + lightShift, 78, 92)}%)`;
  const flap = `hsl(${clamp(family.hue + hueShift + 2, 0, 360)}, ${clamp(family.sat + satShift + 8, 50, 82)}%, ${clamp(family.light - 18 + lightShift, 60, 76)}%)`;
  const shadow = `hsl(${clamp(family.hue + hueShift + 8, 0, 360)}, ${clamp(family.sat + satShift - 12, 30, 58)}%, ${clamp(family.light - 36 + lightShift, 42, 58)}%)`;
  const base = `hsl(${clamp(family.hue + hueShift + 8, 0, 360)}, ${clamp(family.sat + satShift - 10, 30, 58)}%, ${clamp(family.light - 30 + lightShift, 44, 62)}%)`;
  const seal = `hsl(${clamp(family.sealHue + hueShift, 0, 360)}, ${clamp(family.sealSat + satShift, 68, 92)}%, ${clamp(family.sealLight + lightShift * 0.8, 28, 46)}%)`;
  const text = `hsl(${family.hue}, 22%, 18%)`;

  return { envelope, flap, shadow, base, seal, text };
}

function applyEnvelopePalette(letterItem) {
  const palette = generatePalette(letterItem);
  document.querySelector('.env-fundo').style.background = palette.envelope;

  const flapPolygon = document.querySelector('.env-aba svg polygon');
  if (flapPolygon) {
    flapPolygon.setAttribute('fill', palette.flap);
  }

  const sidePolygons = document.querySelectorAll('.env-corpo-svg svg polygon');
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
  document.getElementById('letter-body').innerHTML = letter.content;

  applyEnvelopePalette(letter);

  const audioElement = document.getElementById('letter-audio');
  let musicButton;
  let musicButtonIcon;
  let isAudioUnlocked = false;

  function createMusicToggle() {
    musicButton = document.createElement('button');
    musicButton.id = 'music-toggle';
    musicButton.className = 'music-toggle';
    musicButton.type = 'button';

    musicButtonIcon = document.createElement('img');
    musicButtonIcon.id = 'music-toggle-icon';
    musicButtonIcon.src = '../../assets/images/pause.png';
    musicButtonIcon.alt = 'Pause music';

    musicButton.appendChild(musicButtonIcon);
    document.body.appendChild(musicButton);
    updateMusicButtonIcon(audioElement ? audioElement.paused : true);
  }

  function updateMusicButtonIcon(isPaused) {
    if (!musicButton || !musicButtonIcon) {
      return;
    }

    if (isPaused) {
      musicButton.setAttribute('aria-label', 'Play music');
      musicButtonIcon.setAttribute('alt', 'Play music');
      musicButtonIcon.src = '../../assets/images/play.png';
    } else {
      musicButton.setAttribute('aria-label', 'Pause music');
      musicButtonIcon.setAttribute('alt', 'Pause music');
      musicButtonIcon.src = '../../assets/images/pause.png';
    }
  }

  function fadeInAudio(audio, duration, targetVolume) {
    if (!audio) {
      return;
    }

    audio.volume = 0;
    let startTime = null;

    function step(timestamp) {
      if (startTime === null) {
        startTime = timestamp;
      }

      const elapsed = timestamp - startTime;
      const progress = Math.min(elapsed / duration, 1);
      audio.volume = targetVolume * progress;

      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    }

    window.requestAnimationFrame(step);
  }

  function removeAudioUnlockListeners() {
    document.removeEventListener('pointerdown', earlyUnlockHandler);
    document.removeEventListener('touchstart', earlyUnlockHandler);
    document.removeEventListener('pointerdown', unlockHandler);
    document.removeEventListener('touchstart', unlockHandler);
  }

  let earlyUnlockHandler = null;
  let unlockHandler = null;

  // Only load letter audio when the global music toggle is enabled and the
  // current letter has a non-empty `music` filename configured.
  const enableLetterMusic = globalVariables.MUSIC && letter.music && letter.music.trim();

  if (enableLetterMusic) {
    const musicFileName = letter.music && letter.music.trim().endsWith('.mp3')
      ? letter.music.trim()
      : `${letter.music.trim()}.mp3`;

    const source = document.createElement('source');
    source.src = `../../assets/music/${musicFileName}`;
    source.type = 'audio/mpeg';
    audioElement.appendChild(source);
    audioElement.loop = true;
    audioElement.volume = 0;
    audioElement.autoplay = true;
    audioElement.muted = true;
    audioElement.preload = 'auto';
    audioElement.load();

    earlyUnlockHandler = () => {
      if (isAudioUnlocked) {
        return;
      }

      removeAudioUnlockListeners();
      audioElement.play().then(() => {
        if (!isAudioUnlocked) {
          isAudioUnlocked = true;
          audioElement.muted = false;
          fadeInAudio(audioElement, 2000, 0.25);
        }
      }).catch(() => {
        // Silent failure is expected on some browsers until the user interacts.
      });
    };

    document.addEventListener('pointerdown', earlyUnlockHandler, { once: true });
    document.addEventListener('touchstart', earlyUnlockHandler, { once: true });
  }

  const sortedLetters = letters.slice().sort((first, second) => first.id - second.id);
  const currentIndex = sortedLetters.findIndex((entry) => entry.id === requestedId);
  const previousLetter = currentIndex > 0 ? sortedLetters[currentIndex - 1] : null;
  const nextLetter = currentIndex < sortedLetters.length - 1 ? sortedLetters[currentIndex + 1] : null;

  document.getElementById('letter-counter').textContent = `${currentIndex + 1} ${getTranslation('OF')} ${sortedLetters.length}`;

  if (previousLetter) {
    const previousButton = document.getElementById('nav-previous');
    previousButton.href = `./letters.view.html?id=${previousLetter.id}`;
    previousButton.classList.remove('invisible');
  }

  if (nextLetter) {
    const nextButton = document.getElementById('nav-next');
    nextButton.href = `./letters.view.html?id=${nextLetter.id}`;
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

    const enableLetterMusic = globalVariables.MUSIC && letter.music && letter.music.trim();

    if (enableLetterMusic) {
      audioElement.currentTime = letter.startTime || 0;
      audioElement.volume = 0;

      createMusicToggle();

      function tryPlay() {
        audioElement.play().then(() => {
          if (!isAudioUnlocked) {
            isAudioUnlocked = true;
            audioElement.muted = false;
            fadeInAudio(audioElement, 2000, 0.25);
            removeAudioUnlockListeners();
          }
          updateMusicButtonIcon(audioElement.paused);
        }).catch(() => {
          if (!isAudioUnlocked) {
            updateMusicButtonIcon(audioElement.paused);
            unlockHandler = () => {
              if (isAudioUnlocked) {
                return;
              }

              isAudioUnlocked = true;
              audioElement.play().then(() => {
                audioElement.muted = false;
                fadeInAudio(audioElement, 2000, 0.25);
                updateMusicButtonIcon(audioElement.paused);
              }).catch(() => {
                updateMusicButtonIcon(audioElement.paused);
              });
              removeAudioUnlockListeners();
            };

            document.addEventListener('pointerdown', unlockHandler, { once: true });
            document.addEventListener('touchstart', unlockHandler, { once: true });
          } else {
            updateMusicButtonIcon(audioElement.paused);
          }
        });
      }

      tryPlay();

      musicButton.addEventListener('click', () => {
        if (audioElement.paused) {
          audioElement.play().then(() => {
            audioElement.muted = false;
            updateMusicButtonIcon(audioElement.paused);
          }).catch(() => {
            updateMusicButtonIcon(audioElement.paused);
          });
        } else {
          audioElement.pause();
          updateMusicButtonIcon(audioElement.paused);
        }
      });
    }
  }, 2100);
}

function startHeartAnimation() {
  // Floating heart particle animation for the letter view background.
  // Particles are born after a delay, float upward, fade at the top, and die
  // when they leave the canvas to keep the animation visually light.
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