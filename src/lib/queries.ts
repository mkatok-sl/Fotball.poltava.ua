import {
  ARTICLES_DATA, AUTHORS_DATA, CLUBS_DATA, MATCHES_DATA, PEOPLE_DATA, RUBRICS_DATA, SCORERS_DATA, SERIES_DATA, SITE,
  STADIUMS_DATA, STANDINGS_DATA, TOURNAMENTS_DATA,
} from "@/data";
import type { Article, Club, Match, Tournament } from "@/types";

const byDateDesc = (a: { date: string }, b: { date: string }) => b.date.localeCompare(a.date);
const byDateAsc = (a: { date: string }, b: { date: string }) => a.date.localeCompare(b.date);

export const club = (id: string) => CLUBS_DATA.find((c) => c.id === id);
export const tournament = (id: string) => TOURNAMENTS_DATA.find((t) => t.id === id);
export const article = (id: string) => ARTICLES_DATA.find((a) => a.id === id);
export const person = (id: string) => PEOPLE_DATA.find((p) => p.id === id);
export const stadium = (id: string) => STADIUMS_DATA.find((s) => s.id === id);
export const rubric = (id: string) => RUBRICS_DATA.find((r) => r.id === id);
export const series = (id: string) => SERIES_DATA.find((s) => s.id === id);
export const author = (id: string) => AUTHORS_DATA.find((a) => a.id === id);
export const matchById = (id: string) => MATCHES_DATA.find((m) => m.id === id);

const NAME_INDEX = new Map<string, Club>();
for (const c of CLUBS_DATA) {
  NAME_INDEX.set(c.matchName, c);
  for (const n of c.tableNames) NAME_INDEX.set(n, c);
}
/** Regional club behind a team name used in tables or match listings */
export const clubByName = (name: string) => NAME_INDEX.get(name);
export const isRegional = (name: string) => NAME_INDEX.has(name);
export const isRegionalMatch = (m: Match) => isRegional(m.homeTeam) || isRegional(m.awayTeam);

export const clubsInGroup = (g: Club["group"]) => CLUBS_DATA.filter((c) => c.group === g);
export const tournamentsInGroup = (g: Tournament["group"]) => TOURNAMENTS_DATA.filter((t) => t.group === g);

export const matchesOfClub = (c: Club) =>
  MATCHES_DATA.filter((m) => m.homeTeam === c.matchName || m.awayTeam === c.matchName).sort(byDateAsc);
export const matchesOfTournament = (id: string) => MATCHES_DATA.filter((m) => m.tournament === id).sort(byDateAsc);
export const regionalMatches = () => MATCHES_DATA.filter(isRegionalMatch).sort(byDateAsc);

export const isFinished = (m: Match) => m.status === "finished" || m.status === "live";
export const nextMatch = (c: Club) => matchesOfClub(c).find((m) => m.status === "scheduled" && m.date >= SITE.edition.slice(0, 10));
export const lastMatch = (c: Club) => [...matchesOfClub(c)].reverse().find((m) => isFinished(m));

export const standingsOf = (id: string) => STANDINGS_DATA.filter((r) => r.tournament === id).sort((a, b) => a.position - b.position);
export const scorersOf = (id: string) => SCORERS_DATA.filter((s) => s.tournament === id).sort((a, b) => b.goals - a.goals);
export const rounds = (id: string) => [...new Set(matchesOfTournament(id).map((m) => m.roundNo).filter((n): n is number => !!n))].sort((a, b) => a - b);
export const completedRounds = (id: string) =>
  rounds(id).filter((n) => {
    const ms = matchesOfTournament(id).filter((m) => m.roundNo === n && m.status !== "postponed");
    return ms.length > 0 && ms.every(isFinished);
  });

export const sortedArticles = () => [...ARTICLES_DATA].sort(byDateDesc);
export const articlesOfClub = (id: string) => sortedArticles().filter((a) => a.clubs.includes(id));
export const articlesOfTournament = (id: string) => sortedArticles().filter((a) => a.tournaments.includes(id));
export const articlesOfRubric = (id: string) => sortedArticles().filter((a) => a.type === id);
export const articlesOfSeries = (id: string) => [...ARTICLES_DATA].filter((a) => a.series === id).sort(byDateAsc);
export const articlesOfAuthor = (id: string) => sortedArticles().filter((a) => a.author === id);
export const articlesOfMatch = (m: Match) => sortedArticles().filter((a) => a.matchId === m.id);
export const latestArticles = (n: number, skip: (a: Article) => boolean = () => false) =>
  sortedArticles().filter((a) => !skip(a)).slice(0, n);
export const leadArticle = () => sortedArticles().find((a) => a.isBreaking) ?? sortedArticles()[0];

export const peopleOfClub = (id: string) => PEOPLE_DATA.filter((p) => p.club === id);
export const stadiumsOfClub = (id: string) => STADIUMS_DATA.filter((s) => s.clubs.includes(id));

/** Tables the site can render for a club this season */
export const clubTables = (c: Club) => c.tournaments.filter((t) => standingsOf(t).length > 0);

const dayIdx = (iso: string) => Date.UTC(+iso.slice(0, 4), +iso.slice(5, 7) - 1, +iso.slice(8, 10)) / 86_400_000;
export const daysFromEdition = (iso: string) => dayIdx(iso) - dayIdx(SITE.edition);

/** Build-time guard: a regional team name must not equal a team from another club's competitions */
export function nameClashes(): string[] {
  const out: string[] = [];
  const seen = new Map<string, string>();
  for (const c of CLUBS_DATA) for (const n of new Set([c.matchName, ...c.tableNames])) {
    if (seen.has(n) && seen.get(n) !== c.id) out.push(`${n}: ${seen.get(n)} / ${c.id}`);
    seen.set(n, c.id);
  }
  return out;
}

/** A regional name appearing in a competition the club does not play in means a name clash */
export function regionalMisuse(): string[] {
  const out = new Set<string>();
  const check = (name: string, t: string) => {
    const c = clubByName(name);
    if (c && !c.tournaments.includes(t)) out.add(`${name} → ${c.id} у турнірі ${t}`);
  };
  for (const m of MATCHES_DATA) { check(m.homeTeam, m.tournament); check(m.awayTeam, m.tournament); }
  for (const r of STANDINGS_DATA) check(r.club, r.tournament);
  return [...out];
}
