import { chromium, devices } from "playwright";
import { mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const outDir = "/opt/cursor/artifacts";
mkdirSync(outDir, { recursive: true });

const fileUrl = `file://${join(root, "dist", "index.html")}`;

const browser = await chromium.launch();

try {
  {
    const page = await browser.newPage({ viewport: { width: 1440, height: 900 } });
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.screenshot({
      path: join(outDir, "beachbird-desktop-full.png"),
      fullPage: true,
    });
    await page.close();
  }

  {
    const iphone = devices["iPhone 13"];
    const page = await browser.newPage({
      ...iphone,
      viewport: iphone.viewport,
    });
    await page.goto(fileUrl, { waitUntil: "networkidle" });
    await page.screenshot({
      path: join(outDir, "beachbird-mobile-full.png"),
      fullPage: true,
    });
    await page.close();
  }

  console.log("Screenshots saved to", outDir);
} finally {
  await browser.close();
}
