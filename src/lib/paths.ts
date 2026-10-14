import type { Club, ClubGroup, Match } from "@/types";
import { translit } from "@/data";

export const CLUB_GROUPS: { id: ClubGroup; label: string; short: string; h1: string }[] = [
  { id: "profesiini", label: "Професійні клуби", short: "Професійні", h1: "Професійні клуби Полтавщини" },
  { id: "amatory", label: "Аматорські клуби", short: "Аматори", h1: "Аматорські клуби Полтавщини" },
  { id: "oblast", label: "Клуби чемпіонату області", short: "Область", h1: "Клуби чемпіонату Полтавської області" },
  { id: "zhinochi", label: "Жіночі клуби", short: "Жіночі", h1: "Жіночі футбольні клуби Полтавщини" },
  { id: "poza-zmahanniamy", label: "Клуби поза змаганнями", short: "Поза змаганнями", h1: "Клуби Полтавщини поза змаганнями" },
  { id: "arkhiv", label: "Архів клубів", short: "Архів", h1: "Архів футбольних клубів Полтавщини" },
];

export const CLUB_TABS = {
  "": "Огляд",
  "novyny/": "Новини",
  "matchi/": "Матчі",
  "tablytsia/": "Таблиця",
  "sklad/": "Склад",
  "statystyka/": "Статистика",
  "istoriia/": "Історія",
  "shcho-vidomo/": "Що відомо",
} as const;
export type ClubTab = keyof typeof CLUB_TABS;

export const TOURNAMENT_TABS = {
  "": "Огляд",
  "tablytsia/": "Таблиця",
  "sitka/": "Сітка",
  "kalendar/": "Календар і результати",
  "bombardyry/": "Бомбардири",
  "novyny/": "Новини",
  "reglament/": "Регламент",
} as const;
export type TournamentTab = keyof typeof TOURNAMENT_TABS;

export const clubGroupPath = (g: ClubGroup) => `/kluby/${g}/`;
export const clubPath = (id: string, tab: ClubTab = "") => `/klub/${id}/${tab}`;
export const tournamentPath = (id: string, tab: TournamentTab = "") => `/turnir/${id}/${tab}`;
export const tourPath = (id: string, n: number) => `/turnir/${id}/tur-${n}/`;
export const archivePath = (id: string, season: string) => `/turnir/${id}/${season}/`;
export const matchPath = (m: Match) => `/match/${m.date.slice(0, 10)}-${translit(m.homeTeam)}-${translit(m.awayTeam)}/`;
export const articlePath = (id: string) => `/novyny/${id}/`;
export const rubricPath = (id: string) => `/rubryka/${id}/`;
export const seriesPath = (id: string) => `/serii/${id}/`;
export const personPath = (id: string) => `/persony/${id}/`;
export const stadiumPath = (id: string) => `/stadiony/${id}/`;
export const authorPath = (id: string) => `/avtor/${id}/`;

export const SERVICE_PAGES: { path: string; title: string; h1: string }[] = [
  { path: "/pro-vydannia/", title: "Про видання", h1: "Про видання" },
  { path: "/redaktsiina-polityka/", title: "Редакційна політика", h1: "Редакційна політика" },
  { path: "/kontakty/", title: "Контакти", h1: "Контакти редакції" },
  { path: "/reklama/", title: "Реклама", h1: "Реклама на сайті" },
  { path: "/pravyla/", title: "Правила використання матеріалів", h1: "Правила використання матеріалів" },
  { path: "/konfidentsiinist/", title: "Конфіденційність", h1: "Політика конфіденційності" },
];

export const clubTabs = (c: Club): ClubTab[] => {
  if (c.status !== "active") return ["", "novyny/", "shcho-vidomo/", "istoriia/"];
  const base: ClubTab[] = ["", "novyny/", "matchi/", "tablytsia/"];
  if (c.group === "profesiini") base.push("sklad/", "statystyka/");
  base.push("istoriia/");
  return base;
};
