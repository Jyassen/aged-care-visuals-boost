import { test, expect, devices } from '@playwright/test';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE_URL = process.env.BASE_URL || 'http://localhost:8080';
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const OUTPUT_DIR = path.resolve(__dirname, 'seo-output');

async function ensureDir(dirPath: string) {
  await fs.promises.mkdir(dirPath, { recursive: true });
}

test.describe('SEO crawl - homepage', () => {
  test('collect metadata and screenshots', async ({ page, browser }) => {
    await ensureDir(OUTPUT_DIR);

    const response = await page.goto(BASE_URL, { waitUntil: 'domcontentloaded' });
    expect(response, 'Homepage should respond').not.toBeNull();
    const status = response ? response.status() : 0;

    // Wait for network to settle for more consistent screenshots/content
    await page.waitForLoadState('networkidle');

    // Extract metadata
    const title = await page.title();
    const descEl = await page.$('meta[name="description"]');
    const metaDescription = descEl ? await descEl.getAttribute('content') : null;
    const robotsEl = await page.$('meta[name="robots"]');
    const metaRobots = robotsEl ? await robotsEl.getAttribute('content') : null;
    const canonEl = await page.$('link[rel="canonical"]');
    const canonical = canonEl ? await canonEl.getAttribute('href') : null;

    const ogTags = await page.evaluate(() => {
      const metas = Array.from(document.querySelectorAll('meta[property^="og:"]'));
      return metas.map(m => ({ property: m.getAttribute('property'), content: m.getAttribute('content') }));
    });

    const twitterTags = await page.evaluate(() => {
      const metas = Array.from(document.querySelectorAll('meta[name^="twitter:"]'));
      return metas.map(m => ({ name: m.getAttribute('name'), content: m.getAttribute('content') }));
    });

    // Headings
    const headings = await page.evaluate(() => {
      const collect = (sel: string) => Array.from(document.querySelectorAll<HTMLElement>(sel)).map(h => h.innerText.trim()).filter(Boolean);
      return {
        h1: collect('h1'),
        h2: collect('h2'),
        h3: collect('h3'),
      };
    });

    // Links
    const links = await page.evaluate(() => {
      const anchors = Array.from(document.querySelectorAll<HTMLAnchorElement>('a[href]'));
      return anchors.map(a => ({
        href: a.href,
        text: (a.innerText || '').trim(),
        rel: a.getAttribute('rel') || undefined,
        target: a.getAttribute('target') || undefined,
      }));
    });

    // Images with alt info
    const images = await page.evaluate(() => {
      const imgs = Array.from(document.querySelectorAll<HTMLImageElement>('img'));
      return imgs.map(img => ({
        src: img.currentSrc || img.src,
        alt: img.getAttribute('alt') || '',
        loading: img.getAttribute('loading') || undefined,
        width: img.width,
        height: img.height,
      }));
    });

    // JSON-LD blocks
    const jsonLd = await page.evaluate(() => {
      const nodes = Array.from(document.querySelectorAll<HTMLScriptElement>('script[type="application/ld+json"]'));
      return nodes.map(n => n.textContent || '').filter(Boolean);
    });

    // Content length estimate
    const bodyText = await page.locator('body').innerText();
    const wordCount = bodyText.split(/\s+/).filter(Boolean).length;

    // Save desktop screenshot
    await page.screenshot({ path: path.join(OUTPUT_DIR, 'home-desktop.png'), fullPage: true });

    // Mobile emulation screenshot
    const iPhone = devices['iPhone 13'];
    const mobileContext = await browser.newContext({ ...iPhone });
    const mobilePage = await mobileContext.newPage();
    const mobileResp = await mobilePage.goto(BASE_URL, { waitUntil: 'networkidle' });
    expect(mobileResp, 'Homepage (mobile) should respond').not.toBeNull();
    await mobilePage.screenshot({ path: path.join(OUTPUT_DIR, 'home-mobile.png'), fullPage: true });
    await mobileContext.close();

    // Write report
    const report = {
      url: BASE_URL,
      status,
      title,
      metaDescription,
      metaRobots,
      canonical,
      ogTags,
      twitterTags,
      headings,
      linksSummary: {
        total: links.length,
        internal: links.filter(l => l.href.startsWith(new URL(page.url()).origin)).length,
        external: links.filter(l => !l.href.startsWith(new URL(page.url()).origin)).length,
      },
      links,
      imagesSummary: {
        total: images.length,
        missingAlt: images.filter(i => !i.alt).length,
        eagerLoaded: images.filter(i => i.loading === 'eager').length,
      },
      images,
      jsonLdCount: jsonLd.length,
      wordCount,
      timestamp: new Date().toISOString(),
    } as const;

    await fs.promises.writeFile(
      path.join(OUTPUT_DIR, 'home-report.json'),
      JSON.stringify(report, null, 2),
      'utf-8'
    );
  });
});


