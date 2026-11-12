import { cpSync, mkdirSync, readFileSync, rmSync, statSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const dist = join(root, "dist");

const required = [
  join(root, "index.html"),
  join(root, "css", "styles.css"),
  join(root, "js", "main.js"),
];

for (const file of required) {
  statSync(file);
}

rmSync(dist, { recursive: true, force: true });
mkdirSync(dist, { recursive: true });

cpSync(join(root, "index.html"), join(dist, "index.html"));
cpSync(join(root, "css"), join(dist, "css"), { recursive: true });
cpSync(join(root, "js"), join(dist, "js"), { recursive: true });

const publicDir = join(root, "public");
if (statSync(publicDir).isDirectory()) {
  cpSync(publicDir, dist, {
    recursive: true,
    filter: (src) => !src.endsWith(".DS_Store"),
  });
}

const html = readFileSync(join(dist, "index.html"), "utf8");
const checks = [
  ["hero", /id="hero"/],
  ["services", /id="services"/],
  ["work", /id="work"/],
  ["partner", /id="partner"/],
  ["pricing", /id="pricing"/],
  ["contact", /id="contact"/],
  ["youtube-embed-facade", /data-video-id=/],
  ["pricing-contact-note", /Contact us to discuss pricing/i],
  ["contact-email", /mailto:media@skrlr\.com/],
];

for (const [name, pattern] of checks) {
  if (!pattern.test(html)) {
    console.error(`Build check failed: ${name}`);
    process.exit(1);
  }
}

console.log("Build OK → dist/");
