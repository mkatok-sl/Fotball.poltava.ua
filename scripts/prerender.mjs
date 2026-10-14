/**
 * Static generation for GitHub Pages: one HTML file per page of the site tree.
 *
 *   PRERENDER_BASE  folder the site is served from ("/repository"; GitHub Actions sets it)
 *   SITE_URL        absolute site URL; enables canonical, og:url, sitemap.xml, news-sitemap.xml
 *
 * Asset links stay relative ("./assets", "../../assets") so the same output works in any folder.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const serverDir = path.join(root, "dist-server");
const norm = (v) => { const t = (v ?? "").trim().replace(/\/+$/, ""); return !t || t === "/" ? "" : t.startsWith("/") ? t : `/${t}`; };
const base = norm(process.env.PRERENDER_BASE);
const siteUrl = (process.env.SITE_URL ?? "").trim().replace(/\/+$/, "");
const esc = (s) => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

const entry = (await fs.readdir(serverDir)).find((f) => /^entry-server\.m?js$/.test(f));
const { render, allPaths, feedItems, site, nameClashes, regionalMisuse } = await import(pathToFileURL(path.join(serverDir, entry)).href);
const problems = [...nameClashes(), ...regionalMisuse()];
if (problems.length) throw new Error(`Конфлікт назв команд:\n${problems.join("\n")}`);
const template = await fs.readFile(path.join(dist, "index.html"), "utf8");
if (!template.includes('<div id="root"></div>')) throw new Error("index.html: missing root");

const assets = await fs.readdir(path.join(dist, "assets"));
const preload = [/^cormorant-sc-cyrillic-600-normal.*\.woff2$/, /^lora-cyrillic-400-normal.*\.woff2$/]
  .map((re) => assets.find((f) => re.test(f))).filter(Boolean)
  .map((f) => `<link rel="preload" href="./assets/${f}" as="font" type="font/woff2" crossorigin />`);

function page(p, { assetPrefix }) {
  const { html, meta, status } = render(p, base);
  let out = template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(meta.title)}</title>`)
    .replace(/(<meta name="description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta property="og:title" content=")[^"]*(")/, `$1${esc(meta.title)}$2`)
    .replace(/(<meta property="og:description" content=")[^"]*(")/, `$1${esc(meta.description)}$2`)
    .replace(/(<meta name="robots" content=")[^"]*(")/, `$1${meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large"}$2`);
  const extra = [...preload];
  if (siteUrl && status === 200 && !meta.noindex) extra.push(`<link rel="canonical" href="${siteUrl}${p}" />`, `<meta property="og:url" content="${siteUrl}${p}" />`);
  out = out.replace("<!--head-extra-->", extra.join("\n    "));
  out = out.replace(/(href|src)="\.\//g, `$1="${assetPrefix}`);
  out = out.replace('<div id="root"></div>', `<div id="root" data-prerendered="true" data-base="${base}">${html}</div>`);
  return { out, meta, status };
}

const paths = allPaths();
const indexable = [];
for (const p of paths) {
  const depth = p.split("/").filter(Boolean).length;
  const { out, meta } = page(p, { assetPrefix: depth ? "../".repeat(depth) : "./" });
  const file = path.join(dist, ...p.split("/").filter(Boolean), "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, out);
  if (!meta.noindex) indexable.push(p);
}

// GitHub Pages serves 404.html for any missing path: asset links must be base-absolute there
const nf = page("/__404__/", { assetPrefix: `${base}/` });
await fs.writeFile(path.join(dist, "404.html"), nf.out);

// Old football.poltava.ua category addresses → new pages (static redirect stubs)
const OLD = {
  "премєр-ліга": "/turnir/upl/", "перша-ліга": "/turnir/persha-liha/", "друга-ліга": "/turnir/druha-liha/", "кубок-україни": "/turnir/kubok-ukrainy/",
  "ск-полтава": "/klub/sk-poltava/", "ворскла": "/klub/vorskla/", "гірник-спорт": "/klub/hirnyk-sport/", contact: "/kontakty/",
};
for (const [from, to] of Object.entries(OLD)) {
  const target = `${base}${to}`;
  const file = path.join(dist, from, "index.html");
  await fs.mkdir(path.dirname(file), { recursive: true });
  await fs.writeFile(file, `<!doctype html><html lang="uk"><head><meta charset="utf-8"><title>Сторінку перенесено</title><meta name="robots" content="noindex"><link rel="canonical" href="${siteUrl ? siteUrl + to : target}"><meta http-equiv="refresh" content="0; url=${target}"></head><body><a href="${target}">Сторінку перенесено</a></body></html>`);
}

// Feeds and sitemaps
const abs = (p) => (siteUrl ? `${siteUrl}${p}` : `${base}${p}`);
const items = feedItems();
await fs.writeFile(path.join(dist, "rss.xml"), `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0"><channel><title>${esc(site.name)}</title><link>${abs("/")}</link><description>${esc(site.description)}</description><language>uk</language>
${items.slice(0, 30).map((i) => `<item><title>${esc(i.title)}</title><link>${abs(i.path)}</link><guid>${abs(i.path)}</guid><description>${esc(i.description)}</description><category>${esc(i.category)}</category><pubDate>${new Date(i.date).toUTCString()}</pubDate></item>`).join("\n")}
</channel></rss>
`);
await fs.writeFile(path.join(dist, "robots.txt"), `User-agent: *\nAllow: /\n${siteUrl ? `Sitemap: ${siteUrl}/sitemap.xml\nSitemap: ${siteUrl}/news-sitemap.xml\n` : ""}`);
if (siteUrl) {
  const today = new Date().toISOString().slice(0, 10);
  await fs.writeFile(path.join(dist, "sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${indexable.map((p) => `  <url><loc>${siteUrl}${p}</loc><lastmod>${today}</lastmod></url>`).join("\n")}\n</urlset>\n`);
  const edition = new Date(`${site.edition}:00+03:00`).getTime();
  const fresh = items.filter((i) => edition - new Date(i.date).getTime() <= 2 * 86_400_000);
  await fs.writeFile(path.join(dist, "news-sitemap.xml"), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">\n${fresh.map((i) => `  <url><loc>${siteUrl}${i.path}</loc><news:news><news:publication><news:name>${esc(site.name)}</news:name><news:language>uk</news:language></news:publication><news:publication_date>${i.date}</news:publication_date><news:title>${esc(i.title)}</news:title></news:news></url>`).join("\n")}\n</urlset>\n`);
}
await fs.writeFile(path.join(dist, ".nojekyll"), "");
await fs.rm(serverDir, { recursive: true, force: true });
console.log(`Prerendered ${paths.length} pages (+404, ${Object.keys(OLD).length} redirects) for base "${base || "/"}"${siteUrl ? ` (${siteUrl})` : ""}`);
