import { letters } from '../loaders/lettersLoader.js';
import globalVariables from '../config/globalVariables.js';

const listContainer = document.getElementById('letter-list');

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

function generatePalette(letter) {
  const baseHash = hashString(`${letter.id}|${letter.title}|${letter.date}`);
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

function renderLetters() {
  if (!listContainer) {
    return;
  }

  const orderedLetters = [...letters].reverse();

  orderedLetters.forEach((letter) => {
    const palette = generatePalette(letter);
    const link = document.createElement('a');
    link.href = `./src/views/letters.html?id=${letter.id}`;
    link.className = 'envelope-link';

    link.innerHTML = `
      <div class="envelope-wrap">
        <div class="envelope-sombra"></div>
        <div class="envelope" style="background:${palette.envelope}; --envelope-sombra:${palette.shadow};">
          <div class="env-corpo-svg">
            <svg viewBox="0 0 100 63" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 0,63 50,31" fill="${palette.shadow}" />
              <polygon points="100,0 100,63 50,31" fill="${palette.shadow}" />
              <polygon points="0,63 100,63 50,31" fill="${palette.base}" />
            </svg>
          </div>

          <div class="env-aba" style="border-top-color:${palette.flap};">
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 100,0 50,44" fill="${palette.flap}" />
            </svg>
            <div class="env-lacre" style="background:${palette.seal};">♡</div>
          </div>

          <div class="envelope-centro">
            <span class="envelope-data" style="color:${palette.text};">${letter.date}</span>
            <span class="envelope-titulo" style="color:${palette.text};">${letter.title}</span>
            <span class="envelope-hint" style="color:${palette.text};">Tap to open</span>
          </div>
          <div class="envelope-canto tl"></div>
          <div class="envelope-canto tr"></div>
          <div class="envelope-canto bl"></div>
          <div class="envelope-canto br"></div>
        </div>
      </div>
    `;

    listContainer.appendChild(link);
  });
}

renderLetters();

if(globalVariables.SHOW_BRANDING){
  let footer = document.getElementById('footer-link');
  footer.textContent = "Made with 💌 Moracarta";
}