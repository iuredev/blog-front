import { copyFile, mkdir } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const source = resolve(root, "game/target/wasm32-unknown-unknown/release/portfolio_game.wasm");
const destination = resolve(root, "public/game/portfolio_game.wasm");

await mkdir(dirname(destination), { recursive: true });
await copyFile(source, destination);
console.log(`Copied ${destination}`);
