import { cp, mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";

export function buildSetupConfig({
    projectName,
    title,
    font,
    textTop,
    textBottom,
    yourName,
    closedLetterTextTopLine,
    closedLetterTextBottomLine,
    showBranding
}) {
    return `/**
 * This file was generated automatically by Moracarta setup.
 */

const PROJECT_NAME = ${JSON.stringify(projectName)};
const TITLE = ${JSON.stringify(title)};

const FONT = ${JSON.stringify(font)};

const TEXT_TOP = ${JSON.stringify(textTop)};
const TEXT_BOTTOM = ${JSON.stringify(textBottom)};
const YOUR_NAME = ${JSON.stringify(yourName)};

const CLOSED_LETTER_TEXT_TOP_LINE =
    ${JSON.stringify(closedLetterTextTopLine)};

const CLOSED_LETTER_TEXT_BOTTOM_LINE =
    ${JSON.stringify(closedLetterTextBottomLine)};

const SHOW_BRANDING = ${showBranding};

const globalVariables = {
    PROJECT_NAME,
    TITLE,
    YOUR_NAME,
    FONT,
    TEXT_TOP,
    TEXT_BOTTOM,
    CLOSED_LETTER_TEXT_TOP_LINE,
    CLOSED_LETTER_TEXT_BOTTOM_LINE,
    SHOW_BRANDING
};

export default globalVariables;
`;
}

export async function ensureModuleType(projectRoot) {
    const userPackageJsonPath = resolve(projectRoot, "package.json");

    let userPackageJson;

    try {
        userPackageJson = JSON.parse(
            await readFile(userPackageJsonPath, "utf8")
        );
    } catch (error) {
        if (error.code === "ENOENT") {
            return;
        }

        throw error;
    }

    if (userPackageJson.type === "module") {
        return;
    }

    userPackageJson.type = "module";

    await writeFile(
        userPackageJsonPath,
        JSON.stringify(userPackageJson, null, 2) + "\n",
        "utf8"
    );
}

export async function copyTemplateFiles(packageRoot, projectRoot, templateEntries) {
    if (resolve(packageRoot) === resolve(projectRoot)) {
        return;
    }

    for (const entry of templateEntries) {
        const source = resolve(packageRoot, entry);
        const destination = resolve(projectRoot, entry);

        await mkdir(dirname(destination), { recursive: true });
        await cp(source, destination, { recursive: true });
    }
}
