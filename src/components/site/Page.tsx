import type { ReactNode } from "react";
import { ChevronRight, Info } from "lucide-react";
import { useLocation } from "wouter";
import type { Crumb } from "@/types";
import { cn } from "@/lib/utils";
import { formatText } from "@/lib/format";
import { AppLink, ExternalLink } from "./Links";

export function JsonLd({ data }: { data: Record<string, unknown> }) {
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }} />;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  if (items.length === 0) return null;
  return (
    <nav aria-label="Хлібні крихти" className="font-sans text-[12.5px] text-lapis-secondary">
      <ol className="flex flex-wrap items-center gap-x-1.5 gap-y-1">
        {items.map((c, i) => (
          <li key={i} className="inline-flex items-center gap-1.5">
            {i > 0 && <ChevronRight className="size-3 text-lapis-muted" strokeWidth={1.5} aria-hidden="true" />}
            {c.href && i < items.length - 1 ? (
              <AppLink href={c.href} className="transition-colors hover:text-ivory-light">
                {c.label}
              </AppLink>
            ) : (
              <span aria-current={i === items.length - 1 ? "page" : undefined} className="text-ivory/80">
                {c.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

/** Single H1 per page */
export function PageHeader({ crumbs, eyebrow, title, intro, aside, children }: {
  crumbs: Crumb[]; eyebrow?: ReactNode; title: ReactNode; intro?: string; aside?: ReactNode; children?: ReactNode;
}) {
  return (
    <header className="lapis-texture relative overflow-hidden border-b border-lapis-border bg-lapis-deep">
      <div className="mx-auto max-w-[1440px] px-4 pt-6 pb-9 sm:px-6 lg:px-8 lg:pb-11">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 flex flex-wrap items-end justify-between gap-x-8 gap-y-5">
          <div className="min-w-0 max-w-[52rem] flex-1 basis-[18rem]">
            {eyebrow && <div className="mb-3 font-sans text-[13px] text-lapis-secondary">{eyebrow}</div>}
            <h1 className="font-display text-[clamp(2rem,5vw,3.25rem)] leading-[1.05] font-semibold text-ivory-light [overflow-wrap:anywhere]">{title}</h1>
            {intro && <p className="mt-4 max-w-[46rem] font-serif text-[16.5px] leading-[1.7] text-ivory/75">{formatText(intro)}</p>}
            {children}
          </div>
          {aside}
        </div>
      </div>
    </header>
  );
}

export function Section({ id, title, description, action, children, className }: {
  id?: string; title: string; description?: string; action?: ReactNode; children: ReactNode; className?: string;
}) {
  const hid = id ? `${id}-title` : undefined;
  return (
    <section id={id} aria-labelledby={hid} className={cn("min-w-0", className)}>
      <div className="mb-6 flex flex-wrap items-end justify-between gap-x-6 gap-y-2">
        <div className="max-w-[46rem]">
          <h2 id={hid} className="font-display text-[1.75rem] leading-[1.1] font-semibold text-ivory-light sm:text-[2rem]">{title}</h2>
          {description && <p className="mt-2 font-serif text-[15px] leading-[1.6] text-lapis-secondary">{formatText(description)}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

export function MoreLink({ href, children }: { href: string; children: ReactNode }) {
  return (
    <AppLink href={href} className="font-sans text-[13px] font-semibold text-ivory underline decoration-gold/60 underline-offset-4 transition-colors hover:text-ivory-light hover:decoration-gold">
      {children}
    </AppLink>
  );
}

/** Honest placeholder for data that arrives from the parser */
export function EmptyState({ text, sourceUrl, sourceLabel }: { text: string; sourceUrl?: string; sourceLabel?: string }) {
  return (
    <div className="flex gap-3 rounded-[10px] border border-dashed border-lapis-border bg-lapis-surface/60 p-5">
      <Info className="mt-0.5 size-4 shrink-0 text-lapis-secondary" strokeWidth={1.5} aria-hidden="true" />
      <div className="font-serif text-[15px] leading-[1.6] text-ivory/75">
        <p>{formatText(text)}</p>
        {sourceUrl && (
          <ExternalLink href={sourceUrl} className="mt-2 inline-block font-sans text-[13px] text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">
            {sourceLabel ?? "Офіційне джерело"}
          </ExternalLink>
        )}
      </div>
    </div>
  );
}

/** Route-based tabs (each tab is its own page) */
export function TabNav({ items, label }: { items: { href: string; label: string }[]; label: string }) {
  const [location] = useLocation();
  return (
    <nav aria-label={label} className="border-b border-lapis-border bg-lapis-bg">
      <ul className="scrollbar-none mx-auto flex max-w-[1440px] gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {items.map((it) => {
          const active = location === it.href;
          return (
            <li key={it.href} className="shrink-0">
              <AppLink
                href={it.href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "relative -mb-px inline-flex h-12 items-center border-b px-3 font-sans text-[14px] font-semibold transition-colors",
                  active ? "border-gold text-ivory-light" : "border-transparent text-lapis-secondary hover:text-ivory-light",
                )}
              >
                {it.label}
              </AppLink>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function Container({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("mx-auto max-w-[1440px] px-4 py-12 sm:px-6 lg:px-8 lg:py-14", className)}>{children}</div>;
}

export function SourceNote({ sources }: { sources: { label: string; url: string }[] }) {
  if (!sources.length) return null;
  return (
    <p className="flex flex-wrap items-center gap-x-4 gap-y-1 font-sans text-[12.5px] text-lapis-secondary">
      <span>Джерела даних:</span>
      {sources.map((s) => (
        <ExternalLink key={s.url} href={s.url} className="text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">
          {s.label}
        </ExternalLink>
      ))}
    </p>
  );
}
