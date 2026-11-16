/**
 * Captures one above-the-fold desktop screenshot per project and saves it as
 * assets/img/projects/<slug>.webp (1200x750, 16:10).
 *
 *   npm i -D playwright sharp        (once; browsers: npx playwright install chromium)
 *   node scripts/capture-screenshots.mjs              # all projects
 *   node scripts/capture-screenshots.mjs ambur-leather adorsh   # only these
 *
 * If a capture fails, the existing image is left untouched.
 * Set CHROME_CHANNEL=chrome to use an installed Chrome instead of bundled Chromium.
 */
import { chromium } from "playwright";
import sharp from "sharp";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import path from "node:path";

const OUT_DIR = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../assets/img/projects");

const SITES = [
  { slug: "studio-miniminds", url: "https://studiominiminds.com" },
  { slug: "ambur-leather", url: "https://amburleather.com" },
  { slug: "kkm-keychains", url: "https://kkmkeychains.in" },
  { slug: "true-safety", url: "https://truesafety.in" },
  { slug: "adorsh", url: "https://adorsh.com" },
  { slug: "kkm-crafts", url: "https://kkm-crafts.netlify.app/" },
  { slug: "automotoservice", url: "https://automotoservice.netlify.app/" },
];

// Buttons that commonly dismiss cookie / consent / newsletter popups
const DISMISS = [
  'button:has-text("Accept all")', 'button:has-text("Accept All")', 'button:has-text("Accept")',
  'button:has-text("I agree")', 'button:has-text("Got it")', 'button:has-text("Allow all")',
  '[aria-label="Close"]', '[aria-label="close"]', 'button.close', ".cookie-accept", "#cookie-accept",
  "#onetrust-accept-btn-handler", ".cmplz-accept", ".cli_action_button", "#wt-cli-accept-all-btn",
];

async function dismissPopups(page) {
  for (const sel of DISMISS) {
    try {
      const el = page.locator(sel).first();
      if (await el.isVisible({ timeout: 300 })) { await el.click({ timeout: 1000 }); await page.waitForTimeout(400); }
    } catch { /* not present */ }
  }
}

const only = process.argv.slice(2);
const targets = only.length ? SITES.filter((s) => only.includes(s.slug)) : SITES;
await mkdir(OUT_DIR, { recursive: true });

const browser = await chromium.launch({ channel: process.env.CHROME_CHANNEL || undefined });
let failed = 0;
for (const { slug, url } of targets) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, deviceScaleFactor: 1 });
  const page = await ctx.newPage();
  try {
    await page.goto(url, { waitUntil: "load", timeout: 60000 });
    await page.waitForLoadState("networkidle", { timeout: 20000 }).catch(() => {}); // some sites never go idle
    await page.waitForTimeout(2000);
    await dismissPopups(page);
    await page.waitForTimeout(800);
    await page.evaluate(() => window.scrollTo(0, 0));
    const png = await page.screenshot({ type: "png" }); // viewport only (above the fold)
    const webp = await sharp(png).resize({ width: 1200 }).webp({ quality: 80 }).toBuffer();
    await writeFile(path.join(OUT_DIR, `${slug}.webp`), webp);
    console.log(`ok   ${slug.padEnd(18)} ${Math.round(webp.length / 1024)} KB`);
  } catch (err) {
    failed++;
    console.error(`FAIL ${slug}: ${err.message.split("\n")[0]} (kept existing image)`);
  } finally {
    await ctx.close();
  }
}
await browser.close();
process.exit(failed ? 1 : 0);
