#!/usr/bin/env node

import { spawn } from "node:child_process";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const COMMANDS = new Set([
    "setup",
    "dev",
    "build",
    "preview",
    "deploy"
]);

const command = process.argv[2];
const commandArguments = process.argv.slice(3);

if (!COMMANDS.has(command)) {
    console.error(
        "Usage: moracarta <setup|dev|build|preview|deploy> [options]"
    );
    process.exit(1);
}

const packageRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..", "..");
const npmCommand = process.platform === "win32" ? "npm.cmd" : "npm";

const child = command === "setup" || command === "deploy"
    ? spawn(
        process.execPath,
        [resolve(packageRoot, "src", "commands", `${command}.js`), ...commandArguments],
        { stdio: "inherit" }
    )
    : spawn(
        npmCommand,
        ["run", command, "--", ...commandArguments],
        { stdio: "inherit" }
    );

child.on("exit", (code, signal) => {
    if (signal) {
        process.kill(process.pid, signal);
        return;
    }

    process.exitCode = code ?? 1;
});