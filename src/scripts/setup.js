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
        { name: "English", value: "en" },
        { name: "Português (Brasil)", value: "pt-BR" }
    ]
});

const PROJECT_NAME = await input({
    message: "What should your project be called? (Cloudflare project name, do not use 'moracarta')",
    default: "romantic-gift",
});

const TITLE = await input({
    message: "Enter the title of the application:",
    default: "Letters to my love"
});

const USE_PASSWORD = await confirm({
    message: "Do you want to require a password in the URL? (default N, See docs/PASSWORD.md for more information)",
    default: false
});

let PASSWORD1 = "";
let PASSWORD2 = "";

if (USE_PASSWORD) {
    PASSWORD1 = await input({
        message: "Enter the first password parameter:"
    });

    PASSWORD2 = await input({
        message: "Enter the second password parameter:"
    });
}

const FONT = await select({
    message: "What font would you like to use?",
    choices: [
        { name: "Default", value: "default" }
    ]
});

const MUSIC = await confirm({
    message: "Enable music?",
    default: true
});

let USE_MAIN_PAGE_MUSIC = false;
let MAIN_PAGE_MUSIC_PATH = "";

if (MUSIC) {
    USE_MAIN_PAGE_MUSIC = await confirm({
        message: "Play music on the main page?",
        default: true
    });

    if (USE_MAIN_PAGE_MUSIC) {
        MAIN_PAGE_MUSIC_PATH = "./../assets/music/" + await input({
            message: "Enter the name of the main page music (see docs/MUSIC.md for more information): ",
            default: "leberch-romantic-date.mp3"
        });
    }
}

const TEXT_TOP = await input({
    message: "Enter the message at the top of the main page:",
    default: "Here you can put a custom message"
});

const TEXT_BOTTOM = await input({
    message: "Enter the message at the bottom of the main page:",
    default: "Here you can put another custom message"
});

const YOUR_NAME = await input({
    message: "Enter your name (your quote, press TAB to edit):",
    default: "— Name ♡"
});

const CLOSED_LETTER_TEXT_TOP_LINE = await input({
    message: "Enter the text on the top line of the closed envelope (press TAB to edit): ",
    default: "&#10084;&#65039; To Mary Jane &#10084;&#65039;"
});

const CLOSED_LETTER_TEXT_BOTTOM_LINE = await input({
    message: "Enter the text on the bottom line of the closed envelope (press TAB to edit): ",
    default: "&#10084;&#65039; I love you &#10084;&#65039;"
});

const config = `/**
 * This file was generated automatically by Moracarta setup.
 */

const LANGUAGE = ${JSON.stringify(LANGUAGE)};

const PROJECT_NAME = ${JSON.stringify(PROJECT_NAME)};
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
    PROJECT_NAME,
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

console.log("\n❤️ Moracarta setup complete!");
console.log(`Configuration saved to: ${configPath}`);
console.log("Run npm run dev to test the application");