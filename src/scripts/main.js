import { letters } from '../loaders/lettersLoader.js';
import globalVariables from '../config/globalVariables.js';
import generatePalette from './generatePalette.js';

const listContainer = document.getElementById('letter-list');

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

    // Creates a new envelope object for each loaded letter.
    link.innerHTML = `
      <div class="envelope-wrap">
        <div class="envelope-shadow"></div>
        <div class="envelope" style="background:${palette.envelope}; --envelope-shadow:${palette.shadow};">
          <div class="env-body-svg">
            <svg viewBox="0 0 100 63" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 0,63 50,31" fill="${palette.shadow}" />
              <polygon points="100,0 100,63 50,31" fill="${palette.shadow}" />
              <polygon points="0,63 100,63 50,31" fill="${palette.base}" />
            </svg>
          </div>

          <div class="env-flap" style="border-top-color:${palette.flap};">
            <svg viewBox="0 0 100 44" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
              <polygon points="0,0 100,0 50,44" fill="${palette.flap}" />
            </svg>
            <div class="env-seal" style="background:${palette.seal};">♡</div>
          </div>

          <div class="envelope-center">
            <span class="envelope-date" style="color:${palette.text};">${letter.date}</span>
            <span class="envelope-title" style="color:${palette.text};">${letter.title}</span>
            <span class="envelope-hint" style="color:${palette.text};">Tap to open</span>
          </div>
          <div class="envelope-corner tl"></div>
          <div class="envelope-corner tr"></div>
          <div class="envelope-corner bl"></div>
          <div class="envelope-corner br"></div>
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