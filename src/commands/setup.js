import {
    select,
    input
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

const FONT = await select({
    message: "What font would you like to use?",
    choices: [
        { name: "Handwritten", value: "handwritten" },
        { name: "Classic", value: "classic" },
        { name: "Modern", value: "modern" }
    ]
});

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

const FONT = ${JSON.stringify(FONT)};

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
    FONT,
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