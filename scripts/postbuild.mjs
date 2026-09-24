import { copyFile, mkdir } from "node:fs/promises";

const routes = ["work", "docs", "agents", "about"];

await mkdir("dist", { recursive: true });
await copyFile("dist/index.html", "dist/404.html");

for (const route of routes) {
  await mkdir(`dist/${route}`, { recursive: true });
  await copyFile("dist/index.html", `dist/${route}/index.html`);
}
