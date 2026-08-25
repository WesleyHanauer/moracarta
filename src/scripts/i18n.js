import globalVariables from "../config/globalVariables.js";
import en from "../i18n/en.js";
import ptbr from "../i18n/pt-BR.js";

// Language files are selected by the configured LANGUAGE value.
// Missing translation keys fall back to English, then to the key name.
const translations = {
    en,
    "pt-BR": ptbr
};

const getCurrentLanguage = () => globalVariables?.LANGUAGE || "en";

export const getTranslation = (key) => {
    const language = translations[getCurrentLanguage()] || translations.en;
    return language?.[key] ?? translations.en?.[key] ?? key;
};

export const translateElement = (element) => {
    const key = element.dataset.i18n;

    if (key) {
        element.textContent = getTranslation(key);
    }
};

document.querySelectorAll("[data-i18n]").forEach(translateElement);

export const refreshTranslations = () => document.querySelectorAll("[data-i18n]").forEach(translateElement);

window.i18n = {
    getTranslation,
    translateElement,
    refreshTranslations
};