import { resolve } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = resolve(fileURLToPath(new URL("../..", import.meta.url)));

// npm sets INIT_CWD to wherever the install was actually run from.
// If that's this repo itself, we're installing moracarta's own
// dependencies for development, not installing moracarta as a
// package, so skip the message.
const initCwd = process.env.INIT_CWD;

if (initCwd && resolve(initCwd) === packageRoot) {
    process.exit(0);
}

console.log("\n💌 Thanks for installing Moracarta!");
console.log("Run 'npx moracarta --help' to see available commands.\n");