import { useEffect, useRef } from "react";
import { useLocation } from "wouter";

/** Multi-page behaviour: new page starts at the top; a #hash scrolls to its section. */
export function RouteEffects() {
  const [location] = useLocation();
  const first = useRef(true);
  useEffect(() => {
    const isFirst = first.current;
    first.current = false;
    const hash = window.location.hash.slice(1);
    if (hash) {
      const t = window.setTimeout(() => document.getElementById(decodeURIComponent(hash))?.scrollIntoView({ block: "start" }), isFirst ? 120 : 0);
      return () => window.clearTimeout(t);
    }
    if (!isFirst) window.scrollTo({ top: 0 });
  }, [location]);
  return null;
}
