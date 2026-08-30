#!/usr/bin/env node

import { execSync } from "node:child_process";
import { resolve } from "node:path";
import { pathToFileURL } from "node:url";

const dataPath = resolve(process.cwd(), "src", "config", "globalVariables.js");

let globalVariables;

try {
    ({ default: globalVariables } = await import(pathToFileURL(dataPath).href));
} catch (error) {
    if (error.code === "ERR_MODULE_NOT_FOUND") {
        console.error("\n✗ No configuration found. Run moracarta setup first.");
        process.exit(1);
    }

    throw error;
}

const { PROJECT_NAME } = globalVariables;

const npxCommand = process.platform === "win32" ? "npx.cmd" : "npx";

console.log(`Building ${PROJECT_NAME}...`);

execSync(`${npxCommand} vite build --config vite.config.mjs`, {
    stdio: "inherit"
});

console.log(`Deploying ${PROJECT_NAME} to Cloudflare Pages...`);

execSync(
    `${npxCommand} wrangler pages deploy dist --project-name ${PROJECT_NAME}`,
    {
        stdio: "inherit"
    }
);

console.log(`\n❤️ ${PROJECT_NAME} deployed successfully!`);