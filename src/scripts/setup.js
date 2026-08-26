import {
    select,
    input,
    confirm
} from "@inquirer/prompts";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

const LANGUAGE = await select({
    message: "What is the main language of the application?",
    choices: [
        { name: "English", value: "en" }
    ]
});

const TITLE = await input({
    message: "What is the title of the application?",
    default: "Moracarta"
});

const USE_PASSWORD = await confirm({
    message: "Would you like to use a password?",
    default: false
});

let PASSWORD1 = "";
let PASSWORD2 = "";

if (USE_PASSWORD) {
    PASSWORD1 = await input({
        message: "Enter the password:"
    });

    PASSWORD2 = await input({
        message: "Confirm the password:"
    });
}

const FONT = await select({
    message: "What font would you like to use?",
    choices: [
        { name: "Default", value: "default" }
    ]
});

const MUSIC = await confirm({
    message: "Would you like to enable music?",
    default: true
});

let USE_MAIN_PAGE_MUSIC = false;
let MAIN_PAGE_MUSIC_PATH = "";

if (MUSIC) {
    USE_MAIN_PAGE_MUSIC = await confirm({
        message: "Would you like music on the main page?",
        default: true
    });

    if (USE_MAIN_PAGE_MUSIC) {
        MAIN_PAGE_MUSIC_PATH = "./../assets/music/" + await input({
            message: "What is the music file name?",
            default: "music.mp3"
        });
    }
}

const TEXT_TOP = await input({
    message: "What text should appear at the top?",
    default: "A special letter for you"
});

const TEXT_BOTTOM = await input({
    message: "What text should appear at the bottom?",
    default: "With love"
});

const YOUR_NAME = await input({
    message: "What is your name?",
    default: "Your name"
});

const CLOSED_LETTER_TEXT_TOP_LINE = await input({
    message: "What text should appear on the top of the closed letter?",
    default: "You have a letter"
});

const CLOSED_LETTER_TEXT_BOTTOM_LINE = await input({
    message: "What text should appear on the bottom of the closed letter?",
    default: "Click to open"
});

const config = `/**
 * This file was generated automatically by Moracarta setup.
 */

const LANGUAGE = ${JSON.stringify(LANGUAGE)};
const TITLE = ${JSON.stringify(TITLE)};

const USE_PASSWORD = ${USE_PASSWORD};
const PASSWORD1 = ${JSON.stringify(PASSWORD1)};
const PASSWORD2 = ${JSON.stringify(PASSWORD2)};
const FONT = ${JSON.stringify(FONT)};

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
    FONT,
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

console.log("\nSetup complete!");
console.log(`Configuration saved to ${configPath}`);
console.log("Run npm run dev to test the application");