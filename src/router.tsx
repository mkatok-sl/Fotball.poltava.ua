import type { ReactNode } from "react";
import { ARTICLES_DATA, AUTHORS_DATA, CLUBS_DATA, PEOPLE_DATA, RUBRICS_DATA, SERIES_DATA, SITE, STADIUMS_DATA, TOURNAMENTS_DATA } from "@/data";
import type { ClubGroup, PageMeta } from "@/types";
import { stripFormatting } from "@/lib/format";
import { CLUB_GROUPS, CLUB_TABS, SERVICE_PAGES, clubPath, clubTabs, matchPath, tournamentPath, TOURNAMENT_TABS, type ClubTab, type TournamentTab } from "@/lib/paths";
import { club, completedRounds, isRegionalMatch, rubric, series, tournament } from "@/lib/queries";
import { MATCHES_DATA } from "@/data";
import { HomePage } from "@/pages/Home";
import { ClubGroupPage, ClubPage, ClubsIndexPage } from "@/pages/Clubs";
import { ArchivePage, TourPage, TournamentPage, TournamentsIndexPage, tournamentTabs } from "@/pages/Tournaments";
import { MatchPage, MatchesPage, type MatchesView } from "@/pages/Matches";
import { ArticlePage, NewsPage, RubricPage, RubricsIndexPage, SeriesIndexPage, SeriesPage, TablesPage, newsPages } from "@/pages/Content";
import {
  AuthorPage, EditorialPage, NotFoundPage, PeopleIndexPage, PersonPage, SearchPage, ServicePage, StadiumPage, StadiumsIndexPage,
} from "@/pages/Misc";

export interface Resolved {
  element: ReactNode;
  meta: PageMeta;
  status: 200 | 404;
}

const brand = SITE.name;
const cut = (s: string, n = 158) => {
  const t = stripFormatting(s).replace(/\s+/g, " ").trim();
  return t.length <= n ? t : `${t.slice(0, n - 1).replace(/\s+\S*$/, "")}…`;
};
const ok = (element: ReactNode, title: string, description: string, noindex = false): Resolved => ({
  element, status: 200, meta: { title: title.includes(brand) ? title : `${title} — ${brand}`, description: cut(description), noindex },
});
const MATCH_VIEWS: Record<string, MatchesView> = { "/matchi/": "week", "/matchi/kalendar/": "kalendar", "/matchi/rezultaty/": "rezultaty", "/matchi/translyatsii/": "translyatsii" };
const regionalMatches = () => MATCHES_DATA.filter(isRegionalMatch);

export function normalize(path: string) {
  let p = path.split("?")[0].split("#")[0] || "/";
  if (!p.startsWith("/")) p = `/${p}`;
  if (!p.endsWith("/") && !/\.[a-z]+$/.test(p)) p = `${p}/`;
  return p;
}

export function resolve(rawPath: string): Resolved {
  const path = normalize(rawPath);
  const seg = path.split("/").filter(Boolean);

  if (path === "/") return ok(<HomePage />, `${brand}: новини, матчі, таблиці`, SITE.intro);
  if (path === "/kluby/") return ok(<ClubsIndexPage />, "Футбольні клуби Полтавщини", "Професійні, аматорські, обласні та жіночі клуби Полтавщини, а також клуби поза змаганнями.");
  if (seg[0] === "kluby" && seg.length === 2) {
    const g = CLUB_GROUPS.find((x) => x.id === seg[1]);
    if (g) return ok(<ClubGroupPage group={g.id as ClubGroup} />, `${g.label}: клуби Полтавщини`, `${g.h1}: склад групи, статуси й турніри сезону 2026/27.`, g.id === "arkhiv" && !CLUBS_DATA.some((c) => c.group === "arkhiv"));
  }
  if (seg[0] === "klub" && seg.length >= 2 && seg.length <= 3) {
    const c = club(seg[1]);
    const tab = (seg[2] ? `${seg[2]}/` : "") as ClubTab;
    if (c && clubTabs(c).includes(tab)) {
      const title = tab ? `${c.name}: ${CLUB_TABS[tab].toLowerCase()}` : `${c.name}: новини, матчі, таблиця`;
      return ok(<ClubPage id={c.id} tab={tab} />, title, c.summary);
    }
  }
  if (path === "/turniry/") return ok(<TournamentsIndexPage />, `Турніри з участю команд Полтавщини, ${SITE.season}`, "Перша й Друга ліги, Кубок України, аматорські та обласні турніри, жіночий футбол і огляд УПЛ.");
  if (seg[0] === "turnir" && seg.length >= 2 && seg.length <= 3) {
    const t = tournament(seg[1]);
    if (t) {
      if (seg.length === 2) return ok(<TournamentPage id={t.id} tab="" />, `${t.name} ${t.season}: таблиця, результати, календар`, t.about);
      const tab = `${seg[2]}/` as TournamentTab;
      if (tab in TOURNAMENT_TABS && tournamentTabs(t).includes(tab)) return ok(<TournamentPage id={t.id} tab={tab} />, `${t.name} ${t.season}: ${TOURNAMENT_TABS[tab].toLowerCase()}`, t.about);
      const tour = /^tur-(\d+)$/.exec(seg[2]);
      if (tour && completedRounds(t.id).includes(+tour[1])) return ok(<TourPage id={t.id} n={+tour[1]} />, `${t.name} ${t.season}, ${tour[1]}-й тур: результати`, `Усі результати ${tour[1]}-го туру турніру «${t.name}».`);
      const arch = t.archives.find((a) => a.slug === seg[2]);
      if (arch) return ok(<ArchivePage id={t.id} season={arch.slug} />, `${t.name}: ${arch.label.toLowerCase()}, підсумки`, arch.summary);
    }
  }
  if (MATCH_VIEWS[path]) {
    const v = MATCH_VIEWS[path];
    const titles: Record<MatchesView, string> = { week: "Матчі команд Полтавщини: сьогодні й цього тижня", kalendar: "Календар матчів команд Полтавщини", rezultaty: "Результати матчів команд Полтавщини", translyatsii: "Трансляції матчів команд Полтавщини" };
    return ok(<MatchesPage view={v} />, titles[v], `${titles[v]} — усі рівні: від Першої ліги до обласних турнірів.`);
  }
  if (seg[0] === "match" && seg.length === 2) {
    const m = regionalMatches().find((x) => matchPath(x) === path);
    if (m) {
      const t = tournament(m.tournament)!;
      const score = m.score ? ` ${m.score.home}:${m.score.away}` : "";
      return ok(<MatchPage m={m} />, `${m.homeTeam} — ${m.awayTeam}${score}: ${t.name}, ${m.round}`, `${m.homeTeam} — ${m.awayTeam}${score}. ${t.name}, ${m.round}${m.venue ? `. ${m.venue}` : ""}.`);
    }
  }
  if (path === "/tablytsi/") return ok(<TablesPage />, `Турнірні таблиці команд Полтавщини, ${SITE.season}`, "Таблиці Першої та Другої ліги, аматорського чемпіонату, чемпіонату області та УПЛ.");
  if (path === "/novyny/") return ok(<NewsPage page={1} />, "Новини футболу Полтавщини", SITE.description);
  if (seg[0] === "novyny" && seg[1] === "page" && seg.length === 3) {
    const n = +seg[2];
    if (n >= 2 && n <= newsPages()) return ok(<NewsPage page={n} />, `Новини футболу Полтавщини, сторінка ${n}`, SITE.description);
  }
  if (seg[0] === "novyny" && seg.length === 2) {
    const a = ARTICLES_DATA.find((x) => x.id === seg[1]);
    if (a) return { ...ok(<ArticlePage id={a.id} />, a.title, a.excerpt), meta: { title: `${a.title} — ${brand}`, description: cut(a.excerpt) } };
  }
  if (path === "/rubryka/") return ok(<RubricsIndexPage />, "Рубрики", "Анонси, звіти, аналітика, історія та офіційні рішення.");
  if (seg[0] === "rubryka" && seg.length === 2 && rubric(seg[1])) return ok(<RubricPage id={seg[1]} />, `${rubric(seg[1])!.name}: футбол Полтавщини`, rubric(seg[1])!.description);
  if (path === "/serii/") return ok(<SeriesIndexPage />, "Серії матеріалів", "Цикли матеріалів про футбол Полтавщини.");
  if (seg[0] === "serii" && seg.length === 2 && series(seg[1])) return ok(<SeriesPage id={seg[1]} />, `${series(seg[1])!.title}: усі частини`, series(seg[1])!.description);
  if (path === "/persony/") return ok(<PeopleIndexPage />, "Гравці й тренери футболу Полтавщини", "Статистика й матеріали про гравців і тренерів команд Полтавщини.");
  if (seg[0] === "persony" && seg.length === 2) {
    const p = PEOPLE_DATA.find((x) => x.id === seg[1]);
    if (p) return ok(<PersonPage id={p.id} />, `${p.name}: клуб, матчі, статистика`, p.note);
  }
  if (path === "/stadiony/") return ok(<StadiumsIndexPage />, "Стадіони Полтавщини", "Арени, де грають команди Полтавщини в сезоні 2026/27.");
  if (seg[0] === "stadiony" && seg.length === 2) {
    const s = STADIUMS_DATA.find((x) => x.id === seg[1]);
    if (s) return ok(<StadiumPage id={s.id} />, `${s.name}: матчі, клуби`, s.note);
  }
  if (path === "/redaktsiia/") return ok(<EditorialPage />, "Редакція", `Редакція видання «${brand}».`);
  if (seg[0] === "avtor" && seg.length === 2) {
    const a = AUTHORS_DATA.find((x) => x.id === seg[1]);
    if (a) return ok(<AuthorPage id={a.id} />, `${a.name}, ${a.role.toLowerCase()}`, a.bio);
  }
  const sp = SERVICE_PAGES.find((x) => x.path === path);
  if (sp) return ok(<ServicePage path={sp.path} />, sp.title, `${sp.h1} — ${brand}.`);
  if (path === "/poshuk/") return ok(<SearchPage />, "Пошук", "Пошук по сайту.", true);
  return { element: <NotFoundPage />, status: 404, meta: { title: `Сторінку не знайдено — ${brand}`, description: "Сторінку не знайдено.", noindex: true } };
}

/** Every concrete page of the site tree: used by the prerender, sitemap and tests */
export function allPaths(): string[] {
  const out = ["/", "/kluby/", ...CLUB_GROUPS.map((g) => `/kluby/${g.id}/`)];
  for (const c of CLUBS_DATA) for (const t of clubTabs(c)) out.push(clubPath(c.id, t));
  out.push("/turniry/");
  for (const t of TOURNAMENTS_DATA) {
    for (const tab of tournamentTabs(t)) out.push(tournamentPath(t.id, tab));
    for (const n of completedRounds(t.id)) out.push(`/turnir/${t.id}/tur-${n}/`);
    for (const a of t.archives) out.push(`/turnir/${t.id}/${a.slug}/`);
  }
  out.push(...Object.keys(MATCH_VIEWS));
  out.push(...[...new Set(regionalMatches().map(matchPath))]);
  out.push("/tablytsi/", "/novyny/");
  for (let n = 2; n <= newsPages(); n++) out.push(`/novyny/page/${n}/`);
  out.push(...ARTICLES_DATA.map((a) => `/novyny/${a.id}/`));
  out.push("/rubryka/", ...RUBRICS_DATA.map((r) => `/rubryka/${r.id}/`));
  out.push("/serii/", ...SERIES_DATA.map((s) => `/serii/${s.id}/`));
  out.push("/persony/", ...PEOPLE_DATA.map((p) => `/persony/${p.id}/`));
  out.push("/stadiony/", ...STADIUMS_DATA.map((s) => `/stadiony/${s.id}/`));
  out.push("/redaktsiia/", ...AUTHORS_DATA.map((a) => `/avtor/${a.id}/`));
  out.push(...SERVICE_PAGES.map((s) => s.path), "/poshuk/");
  return [...new Set(out)];
}
