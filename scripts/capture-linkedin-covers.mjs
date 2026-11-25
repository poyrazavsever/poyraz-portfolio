import { mkdir } from "node:fs/promises";
import path from "node:path";
import puppeteer from "puppeteer";

const outputDir = path.resolve("public/linkedin-covers/projects");

const targets = [
  ["ohhike", "https://www.ohhike.com"],
  ["neta", "https://takeneta.com"],
  ["ostim", "https://ostim.org.tr"],
  ["ostim-istihdam", "https://ostimistihdam.com"],
  ["htk", "https://www.htk.org.tr"],
  ["isim", "https://www.isim.org.tr"],
  ["medikal", "https://www.medikalkume.com"],
  ["enerjik", "https://www.ostimenerjik.com"],
  ["kaucuk", "https://www.kaucukteknolojileri.com"],
  ["ossa", "https://www.ostimsavunma.org"],
  ["arus", "https://www.anadoluraylisistemler.org"],
  ["targiz", "https://targiz.com"],
  ["ataturk", "https://ataturk-kronolojisi.org"],
  ["poyraz-ui", "https://ui.poyrazavsever.com"],
  ["reactive-image", "https://reactive-image.vercel.app/en"],
  ["reactive-switcher", "https://reactive-switcher-j9qb.vercel.app"],
];

await mkdir(outputDir, { recursive: true });

const browser = await puppeteer.launch({ headless: true });

try {
  const page = await browser.newPage();
  await page.setViewport({ width: 1080, height: 1080, deviceScaleFactor: 1 });

  for (const [name, url] of targets) {
    process.stdout.write(`Capturing ${name}... `);
    try {
      await page.goto(url, { waitUntil: "networkidle2", timeout: 60_000 });
      await page.screenshot({
        path: path.join(outputDir, `${name}.png`),
        type: "png",
      });
      console.log("done");
    } catch (error) {
      console.log(`failed: ${error.message}`);
    }
  }
} finally {
  await browser.close();
}
