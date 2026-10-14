import { useEffect, useSyncExternalStore } from "react";
import { Router, useLocation } from "wouter";

import { SITE } from "@/data";
import { CrestDefs } from "@/components/site/Decor";
import { JsonLd } from "@/components/site/Page";
import { RouteEffects } from "@/components/site/RouteEffects";
import { SiteFooter } from "@/components/site/SiteFooter";
import { SiteHeader } from "@/components/site/SiteHeader";
import { resolve } from "@/router";

interface AppProps {
  /** Folder the site is served from, detected at runtime (lib/base-path.ts) */
  base: string;
  /** Full request path during prerendering */
  ssrPath?: string;
}

const hashRouting = import.meta.env.VITE_ROUTER === "hash";

/* Single-file preview: routes live in "#/path", while plain "#section" anchors keep the current page */
let lastRoute = "/";
const readHashRoute = () => {
  const h = window.location.hash;
  if (h.startsWith("#/")) lastRoute = h.slice(1).split("?")[0] || "/";
  return lastRoute;
};
const subscribeHash = (cb: () => void) => { window.addEventListener("hashchange", cb); return () => window.removeEventListener("hashchange", cb); };
function useHashRoutes(): [string, (to: string) => void] {
  const loc = useSyncExternalStore(subscribeHash, readHashRoute, () => "/");
  return [loc, (to: string) => { window.location.hash = to; }];
}
const hashHrefs = (href: string) => (href.startsWith("/") ? `#${href}` : href);

export function App({ base, ssrPath }: AppProps) {
  return hashRouting ? (
    <Router hook={useHashRoutes} hrefs={hashHrefs} ssrPath={ssrPath}><Shell /></Router>
  ) : (
    <Router base={base} ssrPath={ssrPath}><Shell /></Router>
  );
}

function setMeta(name: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[name="${name}"]`);
  if (!el) { el = document.createElement("meta"); el.name = name; document.head.appendChild(el); }
  el.content = content;
}

function Shell() {
  const [location] = useLocation();
  const page = resolve(location);
  useEffect(() => {
    document.title = page.meta.title;
    setMeta("description", page.meta.description);
    setMeta("robots", page.meta.noindex ? "noindex, follow" : "index, follow, max-image-preview:large");
  }, [page.meta]);
  return (
    <>
      <CrestDefs />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[100] focus:rounded-lg focus:bg-gold focus:px-4 focus:py-2 focus:font-sans focus:text-sm focus:font-semibold focus:text-lapis-deep">
        Перейти до матеріалів
      </a>
      <SiteHeader />
      <main id="main">{page.element}</main>
      <SiteFooter />
      <RouteEffects />
      <JsonLd data={{ "@context": "https://schema.org", "@type": "NewsMediaOrganization", name: SITE.name, email: SITE.email, sameAs: [SITE.facebookUrl].filter(Boolean) }} />
    </>
  );
}
