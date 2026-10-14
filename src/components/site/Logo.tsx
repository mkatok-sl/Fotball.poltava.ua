import { useId } from "react";
import { cn } from "@/lib/utils";
import { AppLink } from "./Links";

/** Brand mark: football on a lapis tile with a pyrite ring (same artwork as favicon.svg) */
export function LogoMark({ className }: { className?: string }) {
  const uid = useId().replace(/:/g, "");
  const stone = `stone-${uid}`, leather = `leather-${uid}`, gold = `gold-${uid}`, clip = `clip-${uid}`;
  return (
    <svg aria-hidden="true" viewBox="0 0 64 64" className={cn("shrink-0", className)}>
      <defs>
        <radialGradient id={stone} cx="28%" cy="22%" r="85%">
          <stop offset="0" stopColor="#3A5196" />
          <stop offset=".5" stopColor="#232C4D" />
          <stop offset="1" stopColor="#131A33" />
        </radialGradient>
        <radialGradient id={leather} cx="38%" cy="32%" r="75%">
          <stop offset="0" stopColor="#FAF8F3" />
          <stop offset=".7" stopColor="#E7E2D8" />
          <stop offset="1" stopColor="#C4BDAF" />
        </radialGradient>
        <linearGradient id={gold} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#E2CE9C" />
          <stop offset=".5" stopColor="#CBB27A" />
          <stop offset="1" stopColor="#9E8752" />
        </linearGradient>
        <clipPath id={clip}>
          <circle cx="32.0" cy="32.0" r="23.0" />
        </clipPath>
      </defs>
      <rect width="64" height="64" rx="14" fill={`url(#${stone})`} />
      <circle cx="32.0" cy="32.0" r="23.0" fill={`url(#${leather})`} />
      <g clipPath={`url(#${clip})`}>
        <g stroke="#2C3659" strokeWidth="2.1" strokeLinecap="round">
          <line x1="32.00" y1="23.72" x2="32.00" y2="18.66" />
          <line x1="41.19" y1="11.99" x2="48.20" y2="17.08" />
          <line x1="39.87" y1="29.44" x2="44.69" y2="27.88" />
          <line x1="53.87" y1="34.55" x2="51.20" y2="42.79" />
          <line x1="36.87" y1="38.70" x2="39.84" y2="42.79" />
          <line x1="36.33" y1="53.59" x2="27.67" y2="53.59" />
          <line x1="27.13" y1="38.70" x2="24.16" y2="42.79" />
          <line x1="12.80" y1="42.79" x2="10.13" y2="34.55" />
          <line x1="24.13" y1="29.44" x2="19.31" y2="27.88" />
          <line x1="15.80" y1="17.08" x2="22.81" y2="11.99" />
        </g>
        <g fill="#131A33">
          <polygon points="32.00,23.72 39.87,29.44 36.87,38.70 27.13,38.70 24.13,29.44" />
          <polygon points="32.00,18.66 22.81,11.99 26.32,1.18 37.68,1.18 41.19,11.99" />
          <polygon points="44.69,27.88 48.20,17.08 59.55,17.08 63.06,27.88 53.87,34.55" />
          <polygon points="39.84,42.79 51.20,42.79 54.71,53.59 45.52,60.27 36.33,53.59" />
          <polygon points="24.16,42.79 27.67,53.59 18.48,60.27 9.29,53.59 12.80,42.79" />
          <polygon points="19.31,27.88 10.13,34.55 0.94,27.88 4.45,17.08 15.80,17.08" />
        </g>
        <ellipse cx="23.26" cy="21.42" rx="5.06" ry="2.53" fill="#FFFFFF" opacity="0.45" transform="rotate(-35 23.26 21.42)" />
      </g>
      <circle cx="32.0" cy="32.0" r="24.2" fill="none" stroke={`url(#${gold})`} strokeWidth="3" />
    </svg>
  );
}

export function Logo({ name, tagline, className }: { name: string; tagline: string; className?: string }) {
  return (
    <AppLink href="/" aria-label={`${name}: на головну`} className={cn("group flex min-w-0 shrink items-center gap-2.5 sm:gap-3", className)}>
      <LogoMark className="size-8 transition-transform duration-200 group-hover:scale-105 sm:size-9" />
      <span className="flex flex-col leading-none">
        <span className="font-display text-[1rem] font-semibold tracking-[0.03em] whitespace-nowrap text-ivory-light sm:text-[1.1875rem] sm:tracking-[0.04em]">{name}</span>
        <span className="mt-1 font-sans text-[11px] text-lapis-secondary">{tagline}</span>
      </span>
    </AppLink>
  );
}
