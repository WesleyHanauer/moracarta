import globalVariables from '../config/globalVariables.js';
import fonts from '../config/fonts.js';

document.documentElement.style.setProperty(
    '--main-font',
    fonts[globalVariables.FONT] || fonts.handwritten
);

// Template variables are injected from `src/config/globalVariables.js` into
// HTML elements using the `data-variable` attribute.
// HTML entities are preserved when the value contains markup characters.
document.querySelectorAll("[data-variable]").forEach(element => {
    const value = globalVariables[element.dataset.variable];

    if (typeof value === 'string' && (value.includes('&') || value.includes('<') || value.includes('>'))) {
        element.innerHTML = value;
    } else {
        element.textContent = value;
    }
});

document.querySelectorAll("[data-variable-src]").forEach(element => {
    element.src = globalVariables[element.dataset.variableSrc];
});