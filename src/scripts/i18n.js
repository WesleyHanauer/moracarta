import globalVariables from "../config/globalVariables.js";

import en from "../i18n/en.js";
import ptbr from "../i18n/pt-BR.js";
import es from "../i18n/es.js";
import fr from "../i18n/fr.js";
import de from "../i18n/de.js";
import it from "../i18n/it.js";
import ja from "../i18n/ja.js";
import ko from "../i18n/ko.js";
import zh from "../i18n/zh.js";
import ru from "../i18n/ru.js";

// Language files are selected by the configured LANGUAGE value.
// Missing translation keys fall back to English, then to the key name.
const translations = {
    en,
    "pt-BR": ptbr,
    es,
    fr,
    de,
    it,
    ja,
    ko,
    zh,
    ru
};

const getCurrentLanguage = () => globalVariables?.LANGUAGE || "en";

export const getTranslation = (key, ...args) => {
    const language = translations[getCurrentLanguage()] || translations.en;

    const translation =
        language?.[key] ??
        translations.en?.[key] ??
        key;

    // Support translated functions such as PROGRESS(current, total)
    return typeof translation === "function"
        ? translation(...args)
        : translation;
};

export const translateElement = (element) => {
    const key = element.dataset.i18n;

    if (key) {
        element.textContent = getTranslation(key);
    }
};

document
    .querySelectorAll("[data-i18n]")
    .forEach(translateElement);

export const refreshTranslations = () => {
    document
        .querySelectorAll("[data-i18n]")
        .forEach(translateElement);
};

window.i18n = {
    getTranslation,
    translateElement,
    refreshTranslations
};