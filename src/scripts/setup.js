import {
    select,
    input,
    confirm
} from "@inquirer/prompts";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";
import setupTranslations from "../i18n/setupTranslations.js";

const LANGUAGE = await select({
    message: setupTranslations.en.language.message,
    choices: [
        { name: "English", value: "en" },
        { name: "Português (Brasil)", value: "pt-BR" },
        { name: "Español", value: "es" },
        { name: "Français", value: "fr" },
        { name: "Deutsch", value: "de" },
        { name: "Italiano", value: "it" },
        { name: "日本語", value: "ja" },
        { name: "한국어", value: "ko" },
        { name: "中文", value: "zh" },
        { name: "Русский", value: "ru" }
    ],
    pageSize: 3
});

const t = setupTranslations[LANGUAGE];

const TITLE = await input({
    message: t.title.message,
    default: t.title.default
});

const USE_PASSWORD = await confirm({
    message: t.password.message,
    default: false
});

let PASSWORD1 = "";
let PASSWORD2 = "";

if (USE_PASSWORD) {
    PASSWORD1 = await input({
        message: t.password.first
    });

    PASSWORD2 = await input({
        message: t.password.second
    });
}

const MUSIC = await confirm({
    message: t.music.enable,
    default: true
});

let USE_MAIN_PAGE_MUSIC = false;
let MAIN_PAGE_MUSIC_PATH = "";

if (MUSIC) {
    USE_MAIN_PAGE_MUSIC = await confirm({
        message: t.music.mainPage,
        default: true
    });

    if (USE_MAIN_PAGE_MUSIC) {
        MAIN_PAGE_MUSIC_PATH = "./../assets/music/" + await input({
            message: t.music.path,
            default: t.music.defaultPath
        });
    }
}

const TEXT_TOP = await input({
    message: t.text.top.message,
    default: t.text.top.default
});

const TEXT_BOTTOM = await input({
    message: t.text.bottom.message,
    default: t.text.bottom.default
});

const YOUR_NAME = await input({
    message: t.name.message,
    default: t.name.default
});

const CLOSED_LETTER_TEXT_TOP_LINE = await input({
    message: t.envelope.top.message,
    default: t.envelope.top.default
});

const CLOSED_LETTER_TEXT_BOTTOM_LINE = await input({
    message: t.envelope.bottom.message,
    default: t.envelope.bottom.default
});

const config = `/**
 * This file was generated automatically by Moracarta setup.
 */

const LANGUAGE = ${JSON.stringify(LANGUAGE)};
const TITLE = ${JSON.stringify(TITLE)};

const USE_PASSWORD = ${USE_PASSWORD};
const PASSWORD1 = ${JSON.stringify(PASSWORD1)};
const PASSWORD2 = ${JSON.stringify(PASSWORD2)};

const MUSIC = ${MUSIC};
const USE_MAIN_PAGE_MUSIC = ${USE_MAIN_PAGE_MUSIC};
const MAIN_PAGE_MUSIC_PATH = ${JSON.stringify(MAIN_PAGE_MUSIC_PATH)};

const TEXT_TOP = ${JSON.stringify(TEXT_TOP)};
const TEXT_BOTTOM = ${JSON.stringify(TEXT_BOTTOM)};
const YOUR_NAME = ${JSON.stringify(YOUR_NAME)};

const CLOSED_LETTER_TEXT_TOP_LINE =
    ${JSON.stringify(CLOSED_LETTER_TEXT_TOP_LINE)};

const CLOSED_LETTER_TEXT_BOTTOM_LINE =
    ${JSON.stringify(CLOSED_LETTER_TEXT_BOTTOM_LINE)};

const globalVariables = {
    LANGUAGE,
    TITLE,
    YOUR_NAME,
    USE_PASSWORD,
    PASSWORD1,
    PASSWORD2,
    MUSIC,
    USE_MAIN_PAGE_MUSIC,
    MAIN_PAGE_MUSIC_PATH,
    TEXT_TOP,
    TEXT_BOTTOM,
    CLOSED_LETTER_TEXT_TOP_LINE,
    CLOSED_LETTER_TEXT_BOTTOM_LINE
};

export default globalVariables;
`;

const configPath = resolve(
    "src",
    "config",
    "globalVariables.js"
);

await writeFile(configPath, config, "utf8");

console.log(`\n${t.complete}`);
console.log(`${t.saved} ${configPath}`);
console.log(`npm run dev to test the application`);