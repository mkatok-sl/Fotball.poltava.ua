import { useMemo, useRef, useState } from "react";
import { Activity, ChevronDown, Menu, Search } from "lucide-react";
import { useLocation } from "wouter";
import { MATCHES_DATA, RUBRICS_DATA, SITE, TOURNAMENTS_DATA } from "@/data";
import type { Match } from "@/types";
import { cn } from "@/lib/utils";
import { formatLongEditionDate, formatShortDate, formatTime } from "@/lib/format";
import { CLUB_GROUPS, clubGroupPath, clubPath, matchPath, rubricPath, tournamentPath } from "@/lib/paths";
import { clubByName, clubsInGroup, daysFromEdition, isRegionalMatch, tournament } from "@/lib/queries";
import { useHeaderOffset } from "@/hooks/use-header-offset";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetDescription, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { ClubCrest } from "./ClubCrest";
import { AppLink, ExternalLink } from "./Links";
import { Logo } from "./Logo";

const T_GROUPS = ["Національні", "Аматорські", "Обласні", "Жіночі", "Огляд"] as const;
const MATCH_LINKS = [
  { href: "/matchi/", label: "Сьогодні й цього тижня" },
  { href: "/matchi/kalendar/", label: "Календар" },
  { href: "/matchi/rezultaty/", label: "Результати" },
  { href: "/matchi/translyatsii/", label: "Трансляції" },
];
const VISIBLE_GROUPS = CLUB_GROUPS.filter((g) => clubsInGroup(g.id).length > 0);

export function SiteHeader() {
  const ref = useRef<HTMLElement>(null);
  useHeaderOffset(ref);
  return (
    <header ref={ref} className="sticky top-0 z-50">
      <LiveStrip />
      <div className="border-b border-lapis-border bg-lapis-deep/95 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-[1440px] items-center gap-2 px-3 sm:gap-4 sm:px-6 lg:gap-6 lg:px-8">
          <Logo name={SITE.name} tagline={SITE.tagline} />
          <DesktopNav className="hidden xl:block" />
          <div className="ml-auto flex shrink-0 items-center gap-0.5 sm:gap-1">
            <time dateTime={SITE.edition.slice(0, 10)} className="mr-2 hidden font-sans text-[12.5px] text-lapis-secondary 2xl:block">
              {formatLongEditionDate(SITE.edition)}
            </time>
            <AppLink href="/poshuk/" aria-label="Пошук" className="inline-flex size-10 items-center justify-center rounded-lg text-ivory transition-colors hover:bg-lapis-elevated">
              <Search className="size-5" strokeWidth={1.5} />
            </AppLink>
            <MobileNav className="xl:hidden" />
          </div>
        </div>
      </div>
    </header>
  );
}

/* ---------------------------------------------------------------- live strip */
function tickerMatches(): Match[] {
  const rank = { live: 0, finished: 1, scheduled: 2, postponed: 3 } as const;
  return MATCHES_DATA.filter((m) => {
    const d = daysFromEdition(m.date);
    const big = ["persha-liha", "druha-liha", "upl", "kubok-ukrainy-amatory", "kubok-ukrainy"].includes(m.tournament);
    return d >= -4 && d <= 5 && m.status !== "postponed" && (big || isRegionalMatch(m)) && !m.resultNote;
  }).sort((a, b) => {
    const ra = isRegionalMatch(a) ? 0 : 1, rb = isRegionalMatch(b) ? 0 : 1;
    if (a.status !== b.status) return rank[a.status] - rank[b.status];
    if (ra !== rb) return ra - rb;
    return a.status === "scheduled" ? a.date.localeCompare(b.date) : b.date.localeCompare(a.date);
  });
}

function LiveStrip() {
  const items = useMemo(tickerMatches, []);
  return (
    <div className="border-b border-lapis-border/70 bg-lapis-deep">
      <div className="mx-auto flex h-9 max-w-[1440px] items-center gap-3 px-4 sm:px-6 lg:px-8">
        <span className="inline-flex shrink-0 items-center gap-1.5 font-sans text-[11px] font-semibold text-lapis-secondary">
          <Activity className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          Матчі
        </span>
        <ul aria-label="Результати та розклад матчів" className="fade-x scrollbar-none flex min-w-0 flex-1 items-center gap-0.5 overflow-x-auto">
          {items.map((m) => {
            const t = tournament(m.tournament)!;
            const href = isRegionalMatch(m) ? matchPath(m) : tournamentPath(t.id, "kalendar/");
            const when = m.score ? "" : `${formatShortDate(m.date)}${m.timeKnown ? ` ${formatTime(m.date)}` : ""}`;
            const tc = (n: string) => (clubByName(n) ? "font-semibold text-ivory-light" : "text-ivory/85");
            return (
              <li key={m.id} className="shrink-0">
                <AppLink href={href} className="flex h-7 items-center gap-2 rounded-md px-2.5 font-sans text-[12px] whitespace-nowrap transition-colors duration-200 hover:bg-lapis-surface">
                  <span className="text-[10px] font-semibold text-lapis-muted">{t.shortName}</span>
                  {when && <span className="tnum text-[11px] text-lapis-secondary">{when}</span>}
                  <span className={tc(m.homeTeam)}>{m.homeTeam}</span>
                  {m.score ? <span className="tnum font-semibold text-gold">{m.score.home}:{m.score.away}</span> : <span className="text-lapis-muted">—</span>}
                  <span className={tc(m.awayTeam)}>{m.awayTeam}</span>
                </AppLink>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}

/* ---------------------------------------------------------------- desktop nav */
function activeKey(path: string) {
  if (path === "/") return "home";
  if (path.startsWith("/klub") ) return "clubs";
  if (path.startsWith("/turni")) return "tournaments";
  if (path.startsWith("/match")) return "matches";
  if (path.startsWith("/tablytsi")) return "tables";
  if (path.startsWith("/rubryka") || path.startsWith("/novyny") || path.startsWith("/serii")) return "rubrics";
  return "";
}

const navItem = (active: boolean) =>
  cn(
    "relative inline-flex h-10 items-center gap-1.5 rounded-md px-3 font-sans text-[14px] font-medium outline-none transition-colors duration-200 hover:text-ivory-light data-[state=open]:text-ivory-light",
    "after:absolute after:inset-x-3 after:-bottom-[13px] after:h-px after:bg-gold after:transition-opacity after:duration-200",
    active ? "text-ivory-light after:opacity-100" : "text-ivory/80 after:opacity-0",
  );

function Chevron() {
  return <ChevronDown className="size-3.5 text-lapis-secondary transition-transform duration-200 group-data-[state=open]:rotate-180" strokeWidth={1.75} aria-hidden="true" />;
}

function DesktopNav({ className }: { className?: string }) {
  const [location] = useLocation();
  const key = activeKey(location);
  return (
    <nav aria-label="Основна навігація" className={className}>
      <ul className="flex items-center gap-0.5">
        <li><AppLink href="/" className={navItem(key === "home")}>Головна</AppLink></li>
        <li>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(navItem(key === "clubs"), "group")}>Клуби<Chevron /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[min(92vw,760px)] p-3">
              <div className="grid grid-cols-3 gap-x-4 gap-y-3">
                {VISIBLE_GROUPS.map((g) => (
                  <div key={g.id} className={g.id === "oblast" ? "row-span-2" : undefined}>
                    <DropdownMenuItem asChild className="px-2 py-1.5 font-semibold text-lapis-secondary">
                      <AppLink href={clubGroupPath(g.id)}>{g.short}</AppLink>
                    </DropdownMenuItem>
                    {clubsInGroup(g.id).map((c) => (
                      <DropdownMenuItem key={c.id} asChild className="gap-2.5 py-1.5">
                        <AppLink href={clubPath(c.id)}>
                          <ClubCrest club={c} size="sm" />
                          <span className="flex min-w-0 flex-col">
                            <span className="truncate">{c.name}</span>
                            {c.status !== "active" && <span className="text-[11px] text-dusty-red">{c.statusLabel}</span>}
                          </span>
                        </AppLink>
                      </DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><AppLink href="/kluby/">Усі клуби</AppLink></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(navItem(key === "tournaments"), "group")}>Турніри<Chevron /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-[min(92vw,620px)] p-3">
              <div className="grid grid-cols-2 gap-x-4 gap-y-3">
                {T_GROUPS.map((g) => (
                  <div key={g}>
                    <DropdownMenuLabel>{g}</DropdownMenuLabel>
                    {TOURNAMENTS_DATA.filter((t) => t.group === g).map((t) => (
                      <DropdownMenuItem key={t.id} asChild className="py-1.5"><AppLink href={tournamentPath(t.id)}>{t.name}</AppLink></DropdownMenuItem>
                    ))}
                  </div>
                ))}
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><AppLink href="/turniry/">Усі турніри</AppLink></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(navItem(key === "matches"), "group")}>Матчі<Chevron /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {MATCH_LINKS.map((l) => <DropdownMenuItem key={l.href} asChild><AppLink href={l.href}>{l.label}</AppLink></DropdownMenuItem>)}
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
        <li><AppLink href="/tablytsi/" className={navItem(key === "tables")}>Таблиці</AppLink></li>
        <li>
          <DropdownMenu modal={false}>
            <DropdownMenuTrigger className={cn(navItem(key === "rubrics"), "group")}>Рубрики<Chevron /></DropdownMenuTrigger>
            <DropdownMenuContent align="start" className="w-64">
              {RUBRICS_DATA.filter((r) => r.inMenu).map((r) => <DropdownMenuItem key={r.id} asChild><AppLink href={rubricPath(r.id)}>{r.name}</AppLink></DropdownMenuItem>)}
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild><AppLink href="/novyny/">Усі новини</AppLink></DropdownMenuItem>
              <DropdownMenuItem asChild><AppLink href="/serii/">Серії матеріалів</AppLink></DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </li>
      </ul>
    </nav>
  );
}

/* ---------------------------------------------------------------- mobile nav */
function MobileNav({ className }: { className?: string }) {
  const [open, setOpen] = useState(false);
  const close = () => setOpen(false);
  const link = "flex min-h-11 items-center rounded-md px-3 font-sans text-[15px] text-ivory transition-colors hover:bg-lapis-surface hover:text-ivory-light";
  const head = "px-3 pt-4 pb-1 font-sans text-xs font-semibold text-lapis-secondary";
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger aria-label="Відкрити меню" className={cn("inline-flex size-10 items-center justify-center rounded-lg text-ivory transition-colors hover:bg-lapis-elevated", className)}>
        <Menu className="size-5" strokeWidth={1.5} />
      </SheetTrigger>
      <SheetContent side="right" aria-describedby="mobile-nav-desc">
        <div className="border-b border-lapis-border px-5 pt-5 pb-4">
          <SheetTitle className="font-display text-xl text-ivory-light">Меню</SheetTitle>
          <SheetDescription id="mobile-nav-desc" className="mt-1 font-sans text-xs text-lapis-secondary">
            {formatLongEditionDate(SITE.edition)}, сезон {SITE.season}
          </SheetDescription>
        </div>
        <nav aria-label="Мобільна навігація" className="scrollbar-thin flex-1 overflow-y-auto px-3 pb-6" onClick={(e) => { if ((e.target as HTMLElement).closest("a")) close(); }}>
          <AppLink href="/" className={link}>Головна</AppLink>
          <p className={head}>Клуби</p>
          {VISIBLE_GROUPS.map((g) => (
            <div key={g.id}>
              <AppLink href={clubGroupPath(g.id)} className={cn(link, "justify-between")}>{g.label}<span className="text-xs text-lapis-secondary">{clubsInGroup(g.id).length}</span></AppLink>
            </div>
          ))}
          <p className={head}>Турніри</p>
          {TOURNAMENTS_DATA.map((t) => <AppLink key={t.id} href={tournamentPath(t.id)} className={link}>{t.name}</AppLink>)}
          <p className={head}>Матчі й таблиці</p>
          {MATCH_LINKS.map((l) => <AppLink key={l.href} href={l.href} className={link}>{l.label}</AppLink>)}
          <AppLink href="/tablytsi/" className={link}>Таблиці</AppLink>
          <p className={head}>Матеріали</p>
          <AppLink href="/novyny/" className={link}>Усі новини</AppLink>
          {RUBRICS_DATA.filter((r) => r.inMenu).map((r) => <AppLink key={r.id} href={rubricPath(r.id)} className={link}>{r.name}</AppLink>)}
          <p className={head}>Редакція</p>
          <AppLink href="/redaktsiia/" className={link}>Редакція</AppLink>
          <AppLink href="/kontakty/" className={link}>Контакти</AppLink>
          {SITE.facebookUrl && <ExternalLink href={SITE.facebookUrl} className={link}>Facebook</ExternalLink>}
        </nav>
      </SheetContent>
    </Sheet>
  );
}
