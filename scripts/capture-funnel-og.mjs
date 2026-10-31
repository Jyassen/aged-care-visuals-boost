import { chromium } from "@playwright/test";
import { mkdir } from "node:fs/promises";
import path from "node:path";

const slugs = [
  "medicare-card-arrived",
  "trusted-advisor",
  "new-to-medicare",
  "dual-eligible",
  "csnp-dsnp",
];

const outDir = path.resolve("public/og");
await mkdir(outDir, { recursive: true });

const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 600, height: 1400 },
  deviceScaleFactor: 2,
});

for (const slug of slugs) {
  await page.goto(`http://localhost:8080/${slug}`, { waitUntil: "networkidle" });
  await page.waitForSelector("h1");
  await page.waitForFunction(() => {
    const frame = document.querySelector("#vsl");
    if (!frame) return false;
    const player = document.querySelector("wistia-player");
    if (!player) return frame.getBoundingClientRect().height > 80;
    const box = player.getBoundingClientRect();
    return getComputedStyle(player).filter === "none" && box.height > 100;
  });
  await page.waitForTimeout(600);

  const clip = await page.evaluate(() => {
    const h1 = document.querySelector("h1").getBoundingClientRect();
    const vsl = document.querySelector("#vsl").getBoundingClientRect();
    const top = Math.max(0, h1.top - 8);
    const bottom = vsl.bottom + 8;
    return { x: 0, y: top, width: 600, height: bottom - top };
  });

  const file = path.join(outDir, `${slug}.jpg`);
  await page.screenshot({ path: file, type: "jpeg", quality: 82, clip });
  console.log(slug, clip.width, Math.round(clip.height), file);
}

await browser.close();
