import type { ComponentProps, ReactNode } from "react";
import { Link, useRouter } from "wouter";

/** Every outbound link goes through here: new tab, no opener, no referrer. */
export function ExternalLink({ href, children, ...props }: Omit<ComponentProps<"a">, "target" | "rel"> & { href: string; children: ReactNode }) {
  return (
    <a href={href} target="_blank" rel="noopener noreferrer" {...props}>
      {children}
    </a>
  );
}

/** Internal navigation through wouter: respects the detected base path, stays in the same tab. */
export function AppLink({ href, children, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string; children: ReactNode }) {
  return (
    <Link href={href} {...props}>
      {children}
    </Link>
  );
}

/** Plain link to a static file (RSS, sitemap): base-aware, no client routing */
export function RawLink({ href, children, ...props }: Omit<ComponentProps<"a">, "href"> & { href: string; children: ReactNode }) {
  const { base } = useRouter();
  return (
    <a href={`${base}${href}`} {...props}>
      {children}
    </a>
  );
}
