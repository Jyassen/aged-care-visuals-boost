import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { FUNNELS } from "../src/funnels/config";
import { LAUNCH_PAGES } from "../src/launch/brand";

function jpegSize(buf: Buffer) {
  let i = 2;
  while (i < buf.length - 8) {
    if (buf[i] !== 0xff) break;
    const marker = buf[i + 1];
    const len = buf.readUInt16BE(i + 2);
    if (marker >= 0xc0 && marker <= 0xc3) {
      return { height: buf.readUInt16BE(i + 5), width: buf.readUInt16BE(i + 7) };
    }
    i += 2 + len;
  }
  return { width: 1200, height: 900 };
}

const dist = path.resolve("dist");
const template = await readFile(path.join(dist, "index.html"), "utf8");

function escapeAttr(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/"/g, "&quot;")
    .replace(/</g, "&lt;");
}

function setMeta(html: string, attr: "property" | "name", key: string, content: string) {
  const tag = `<meta ${attr}="${key}" content="${escapeAttr(content)}" />`;
  const pattern = new RegExp(`<meta ${attr}="${key}" content="[^"]*"\\s*/?>`);
  if (pattern.test(html)) return html.replace(pattern, tag);
  return html.replace("</head>", `    ${tag}\n  </head>`);
}

for (const funnel of FUNNELS) {
  const shareTitle = `${funnel.headline} ${funnel.headlineAccent}`.replace(/\s+/g, " ").trim();
  const url = `https://yourmedguy.com/${funnel.slug}`;
  const image = `https://yourmedguy.com/og/${funnel.slug}.jpg`;
  const { width, height } = jpegSize(await readFile(path.join(dist, "og", `${funnel.slug}.jpg`)));
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(funnel.seoTitle)}</title>`);
  html = setMeta(html, "name", "description", funnel.subhead);
  html = setMeta(html, "property", "og:title", shareTitle);
  html = setMeta(html, "property", "og:description", funnel.subhead);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:alt", shareTitle);
  html = setMeta(html, "property", "og:image:width", String(width));
  html = setMeta(html, "property", "og:image:height", String(height));
  html = setMeta(html, "name", "twitter:title", shareTitle);
  html = setMeta(html, "name", "twitter:description", funnel.subhead);
  html = setMeta(html, "name", "twitter:image", image);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);

  const dir = path.join(dist, funnel.slug);
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
  console.log(`stamped /${funnel.slug}`);
}

for (const page of LAUNCH_PAGES) {
  const url = `https://yourmedguy.com${page.path}`;
  const image = "https://yourmedguy.com/launch/hero.jpg";
  let html = template;
  html = html.replace(/<title>[^<]*<\/title>/, `<title>${escapeAttr(page.title)}</title>`);
  html = setMeta(html, "name", "description", page.description);
  html = setMeta(html, "property", "og:title", page.title);
  html = setMeta(html, "property", "og:description", page.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", image);
  html = setMeta(html, "property", "og:image:alt", page.title);
  html = setMeta(html, "property", "og:image:width", "1024");
  html = setMeta(html, "property", "og:image:height", "768");
  html = setMeta(html, "name", "twitter:title", page.title);
  html = setMeta(html, "name", "twitter:description", page.description);
  html = setMeta(html, "name", "twitter:image", image);
  html = html.replace(/<link rel="canonical" href="[^"]*"\s*\/?>/, `<link rel="canonical" href="${url}" />`);

  const dir = path.join(dist, page.path.replace(/^\//, ""));
  await mkdir(dir, { recursive: true });
  await writeFile(path.join(dir, "index.html"), html);
  console.log(`stamped ${page.path}`);
}
