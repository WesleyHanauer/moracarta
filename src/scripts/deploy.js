import { execSync } from "node:child_process";
import globalVariables from "../config/globalVariables.js";

const { PROJECT_NAME } = globalVariables;

console.log(`Building ${PROJECT_NAME}...`);

execSync("npm run build", {
    stdio: "inherit"
});

console.log(`Deploying ${PROJECT_NAME} to Cloudflare Pages...`);

execSync(
    `npx wrangler pages deploy dist --project-name ${PROJECT_NAME}`,
    {
        stdio: "inherit"
    }
);

console.log(`\n❤️ ${PROJECT_NAME} deployed successfully!`);