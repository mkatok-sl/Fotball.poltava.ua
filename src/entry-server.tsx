import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { App } from "./App";
import { allPaths, resolve } from "./router";
import { ARTICLES_DATA, SITE } from "./data";
import { stripFormatting, toIsoWithZone } from "./lib/format";

/** Used by scripts/prerender.mjs at build time */
export function render(path: string, base: string) {
  const html = renderToString(
    <StrictMode>
      <App base={base} ssrPath={`${base}${path}`} />
    </StrictMode>,
  );
  const { meta, status } = resolve(path);
  return { html, meta, status };
}

export { allPaths };
export { nameClashes, regionalMisuse } from "./lib/queries";

export function feedItems() {
  return [...ARTICLES_DATA].sort((a, b) => b.date.localeCompare(a.date)).map((a) => ({
    path: `/novyny/${a.id}/`, title: a.title, description: stripFormatting(a.excerpt), date: toIsoWithZone(a.date), category: a.category,
  }));
}

export const site = { name: SITE.name, description: stripFormatting(SITE.description), edition: SITE.edition };
