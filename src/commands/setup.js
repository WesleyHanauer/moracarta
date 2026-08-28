import {
    select,
    input,
    confirm
} from "@inquirer/prompts";
import { writeFile } from "node:fs/promises";
import { resolve } from "node:path";

/** TODO
const LANGUAGE = await select({
    message: "What is the main language of the application?",
    choices: [
        { name: "English", value: "en" },
        { name: "Português (Brasil)", value: "pt-BR" }
    ]
});
*/
const LANGUAGE = "en";

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

const TOP_MESSAGES = {
    top_1: "Every letter here holds a piece of everything I feel for you.",
    top_2: "If my love could fit into words, these would just be the beginning.",
    top_3: "Open slowly — every envelope has a little piece of me inside.",
    top_4: "I didn't write letters. I wrote promises.",
    top_5: "Made by hand, kept in my heart — for you."
};

const TOP_CHOICE = await select({
    message: "Choose the message at the top of the main page:",
    choices: [
        {
            name: "Insert custom text",
            value: "custom"
        },
        ...Object.entries(TOP_MESSAGES).map(([value, name]) => ({
            name,
            value
        }))
    ]
});

const TEXT_TOP = TOP_CHOICE === "custom"
    ? await input({
        message: "Enter your custom message:"
    })
    : TOP_MESSAGES[TOP_CHOICE];

const BOTTOM_MESSAGES = {
    bottom_1: "If I could choose again, I'd choose you in every version of my life. ♡",
    bottom_2: "This is only a fraction of what I feel. I show you the rest every day. ♡",
    bottom_3: "Thank you for being the reason for so many letters still to come. ♡",
    bottom_4: "I love you in prose, in silence, and in every line I wrote here. ♡",
    bottom_5: "End of the letters, not of the love. That one keeps going every day. ♡"
};

const BOTTOM_CHOICE = await select({
    message: "Choose the message at the bottom of the main page:",
    choices: [
        {
            name: "Insert custom text",
            value: "custom"
        },
        ...Object.entries(BOTTOM_MESSAGES).map(([value, name]) => ({
            name,
            value
        }))
    ]
});

const TEXT_BOTTOM = BOTTOM_CHOICE === "custom"
    ? await input({
        message: "Enter your custom message:"
    })
    : BOTTOM_MESSAGES[BOTTOM_CHOICE];

const FIRST_NAME = await input({
    message: "Enter your first name: "
});

const YOUR_NAME = "~ "+FIRST_NAME+" ♡"; 

const RECIPIENT_NAME = await input({
    message: "What is their name?"
});

const DEFAULT_CLOSED_LETTER_TEXT_TOP_LINE =
    `&#10084;&#65039; To ${RECIPIENT_NAME} &#10084;&#65039;`;

const DEFAULT_CLOSED_LETTER_TEXT_BOTTOM_LINE =
    "&#10084;&#65039; I love you &#10084;&#65039;";

const EDIT_ENVELOPE_TEXT = await confirm({
    message: "Would you like to customize the envelope text?",
    default: false
});

let CLOSED_LETTER_TEXT_TOP_LINE = DEFAULT_CLOSED_LETTER_TEXT_TOP_LINE;
let CLOSED_LETTER_TEXT_BOTTOM_LINE = DEFAULT_CLOSED_LETTER_TEXT_BOTTOM_LINE;

if (EDIT_ENVELOPE_TEXT) {
    CLOSED_LETTER_TEXT_TOP_LINE = await input({
        message: "Top line of the closed envelope (press TAB to edit):",
        default: DEFAULT_CLOSED_LETTER_TEXT_TOP_LINE
    });

    CLOSED_LETTER_TEXT_BOTTOM_LINE = await input({
        message: "Bottom line of the closed envelope (press TAB to edit):",
        default: DEFAULT_CLOSED_LETTER_TEXT_BOTTOM_LINE
    });
}

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
console.log("Run moracarta dev to test the application");