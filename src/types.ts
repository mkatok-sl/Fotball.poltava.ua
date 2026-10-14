import type { LucideIcon } from "lucide-react";

export type ClubGroup = "profesiini" | "amatory" | "oblast" | "zhinochi" | "poza-zmahanniamy" | "arkhiv";
export type ClubStatus = "active" | "paused" | "withdrawn" | "inactive" | "dissolved";
export type TournamentGroup = "Національні" | "Аматорські" | "Обласні" | "Жіночі" | "Огляд";
export type TournamentFormat = "league" | "groups" | "stages" | "cup" | "single";

export interface ClubSeason {
  season: string;
  tournament: string;
  place?: string;
  note?: string;
}

export interface Club {
  /** URL slug: /klub/{id}/ */
  id: string;
  name: string;
  city: string;
  group: ClubGroup;
  status: ClubStatus;
  statusLabel?: string;
  statusNote?: string;
  /** Tournament ids this season */
  tournaments: string[];
  badge?: "U-19" | "Жінки" | "Друга команда";
  crestBg: string;
  crestText: string;
  crestShape: "heater" | "round" | "angular";
  founded?: number;
  stadium?: string;
  officialUrl?: string;
  socialUrl?: string;
  /** Names used in league tables and match listings */
  tableNames: string[];
  matchName: string;
  related?: string[];
  summary: string;
  history?: ClubSeason[];
  /** Visible pages data comes from (see «Парсинг» sheet) */
  sources: { label: string; url: string }[];
}

export interface TableZone {
  from: number;
  to: number;
  tone: "sage" | "pure" | "muted" | "red";
  label: string;
}

export interface TournamentArchive {
  slug: string;
  label: string;
  summary: string;
  sourceUrl?: string;
}

export interface Tournament {
  id: string;
  name: string;
  shortName: string;
  group: TournamentGroup;
  format: TournamentFormat;
  organizer: string;
  organizerUrl?: string;
  /** Visible page with the official table or schedule */
  sourceUrl?: string;
  sourceLabel?: string;
  season: string;
  about: string;
  /** Stage / group label of the published table */
  tableLabel?: string;
  tableCaption?: string;
  zones: TableZone[];
  hasScorers: boolean;
  scorersSourceUrl?: string;
  reglament: string[];
  archives: TournamentArchive[];
  /** Shown when the site has no table rows yet */
  participants?: string[];
}

export type MatchStatus = "live" | "finished" | "scheduled" | "postponed";

export interface MatchEvent {
  minute: string;
  type: "goal" | "penalty" | "red";
  team: "home" | "away";
  player: string;
}

export interface Match {
  id: string;
  tournament: string;
  round: string;
  /** Round number for tour pages */
  roundNo?: number;
  /** Kyiv local "YYYY-MM-DDTHH:mm"; time "00:00" with timeKnown=false when not announced */
  date: string;
  timeKnown: boolean;
  homeTeam: string;
  awayTeam: string;
  score: { home: number; away: number } | null;
  penalties?: { home: number; away: number };
  status: MatchStatus;
  minute?: number;
  venue?: string;
  events?: MatchEvent[];
  /** Short note when the score is not yet published */
  resultNote?: string;
  note?: string;
  streamUrl?: string;
  broadcaster?: string;
}

export type FormResult = "W" | "D" | "L";

export interface StandingRow {
  tournament: string;
  position: number;
  club: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  goalsFor: number;
  goalsAgainst: number;
  points: number;
  form: FormResult[];
}

export interface Article {
  /** URL slug: /novyny/{id}/ */
  id: string;
  title: string;
  excerpt: string;
  body: string[];
  /** Rubric slug */
  type: string;
  /** Badge text */
  category: string;
  primary: { kind: "club" | "tournament" | "general"; id?: string };
  clubs: string[];
  tournaments: string[];
  season: string;
  /** Kyiv local "YYYY-MM-DDTHH:mm" */
  date: string;
  commentsCount: number;
  imageBg: string;
  imageIcon: LucideIcon;
  isBreaking?: boolean;
  isLive?: boolean;
  isPremium?: boolean;
  series?: string;
  matchId?: string;
  author: string;
}

export interface Person {
  id: string;
  name: string;
  role: "Гравець" | "Тренер";
  club: string;
  note: string;
  stats?: { tournament: string; goals?: number; penalties?: number; matches?: number }[];
  sourceUrl?: string;
}

export interface Stadium {
  id: string;
  name: string;
  city: string;
  note: string;
  clubs: string[];
}

export interface Rubric {
  id: string;
  name: string;
  description: string;
  inMenu: boolean;
}

export interface Series {
  id: string;
  title: string;
  description: string;
}

export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  email?: string;
}

export interface SiteInfo {
  name: string;
  tagline: string;
  edition: string;
  season: string;
  intro: string;
  description: string;
  socialText: string;
  email: string;
  facebookUrl: string;
  telegramUrl: string;
}

export interface SectionLinkItem {
  id: string;
  label: string;
  placement: "main" | "aside";
}

export interface Crumb {
  label: string;
  href?: string;
}

export interface PageMeta {
  title: string;
  description: string;
  noindex?: boolean;
  jsonLd?: Record<string, unknown>;
}

export interface Scorer {
  tournament: string;
  player: string;
  team: string;
  goals: number;
  penalties?: number;
  matches?: number;
  personId?: string;
}
