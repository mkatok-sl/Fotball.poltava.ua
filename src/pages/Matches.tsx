import { MATCHES_DATA } from "@/data";
import type { Match } from "@/types";
import { formatDayMonth, formatWeekdayShort } from "@/lib/format";
import { articlePath, tournamentPath } from "@/lib/paths";
import { articlesOfMatch, clubByName, daysFromEdition, isFinished, isRegionalMatch, tournament } from "@/lib/queries";
import { ArticleGrid } from "@/components/site/ArticleCard";
import { ClubCard } from "@/components/site/ClubCard";
import { GroupedMatches, Scoreboard } from "@/components/site/Matches";
import { Container, EmptyState, JsonLd, MoreLink, PageHeader, Section, TabNav } from "@/components/site/Page";
import { sportsEvent } from "./Tournaments";

export type MatchesView = "week" | "kalendar" | "rezultaty" | "translyatsii";
const VIEWS: Record<MatchesView, { path: string; label: string; h1: string; intro: string }> = {
  week: { path: "/matchi/", label: "Цього тижня", h1: "Матчі команд Полтавщини: сьогодні й цього тижня", intro: "Матчі всіх рівнів: від Першої ліги до обласних турнірів." },
  kalendar: { path: "/matchi/kalendar/", label: "Календар", h1: "Календар матчів команд Полтавщини", intro: "Найближчі матчі з відомою датою." },
  rezultaty: { path: "/matchi/rezultaty/", label: "Результати", h1: "Результати матчів команд Полтавщини", intro: "Зіграні матчі сезону 2026/27." },
  translyatsii: { path: "/matchi/translyatsii/", label: "Трансляції", h1: "Трансляції матчів команд Полтавщини", intro: "Матчі з офіційними трансляціями. Посилання надходять з календаря ПФЛ та офіційних каналів." },
};

const byDay = (ms: Match[]) => {
  const map = new Map<string, Match[]>();
  for (const m of ms) {
    const key = m.date.slice(0, 10);
    map.set(key, [...(map.get(key) ?? []), m]);
  }
  return [...map.entries()].map(([d, matches]) => ({ title: `${formatWeekdayShort(d + "T00:00")}, ${formatDayMonth(d + "T00:00")}`, matches }));
};

export function MatchesPage({ view }: { view: MatchesView }) {
  const v = VIEWS[view];
  const regional = MATCHES_DATA.filter(isRegionalMatch);
  let list: Match[] = [];
  if (view === "week") list = regional.filter((m) => { const d = daysFromEdition(m.date); return d >= -3 && d <= 7; }).sort((a, b) => a.date.localeCompare(b.date));
  if (view === "kalendar") list = regional.filter((m) => !isFinished(m) && daysFromEdition(m.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));
  if (view === "rezultaty") list = regional.filter(isFinished).sort((a, b) => b.date.localeCompare(a.date));
  if (view === "translyatsii") list = MATCHES_DATA.filter((m) => (m.streamUrl || m.broadcaster) && daysFromEdition(m.date) >= 0).sort((a, b) => a.date.localeCompare(b.date));
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Матчі", href: "/matchi/" }, ...(view === "week" ? [] : [{ label: v.label }])]} title={v.h1} intro={v.intro} />
      <TabNav label="Розділи матчів" items={(Object.keys(VIEWS) as MatchesView[]).map((k) => ({ href: VIEWS[k].path, label: VIEWS[k].label }))} />
      <Container className="space-y-8">
        {list.length ? <GroupedMatches groups={byDay(list)} showTournament /> : <EmptyState text="Матчів у цьому розділі поки немає." />}
        {view === "translyatsii" && <EmptyState text="Трансляції аматорських і обласних матчів додаються, щойно клуби публікують посилання на своїх каналах." />}
      </Container>
    </>
  );
}

export function MatchPage({ m }: { m: Match }) {
  const t = tournament(m.tournament)!;
  const related = articlesOfMatch(m);
  const clubs = [clubByName(m.homeTeam), clubByName(m.awayTeam)].filter((c, i, a) => c && a.indexOf(c) === i);
  const title = `${m.homeTeam} — ${m.awayTeam}`;
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Матчі", href: "/matchi/" }, { label: t.name, href: tournamentPath(t.id) }, { label: title }]}
        title={m.score ? `${m.homeTeam} — ${m.awayTeam} ${m.score.home}:${m.score.away}` : title}
        eyebrow={`${t.name}, ${m.round}`} intro={m.note} />
      <Container className="space-y-12">
        <div className="max-w-[52rem]"><Scoreboard m={m} /></div>
        {related.length > 0 && <Section id="materialy" title="Матеріали про матч"><ArticleGrid articles={related} /></Section>}
        {clubs.length > 0 && (
          <Section id="komandy" title="Команди">
            <div className="grid gap-3 md:grid-cols-2">{clubs.map((c) => c && <ClubCard key={c.id} club={c} />)}</div>
          </Section>
        )}
        <p className="font-sans text-[13px] text-lapis-secondary">
          <MoreLink href={tournamentPath(t.id, t.format === "cup" ? "sitka/" : "kalendar/")}>Календар турніру «{t.name}»</MoreLink>
          {related[0] && <> · <MoreLink href={articlePath(related[0].id)}>Читати звіт</MoreLink></>}
        </p>
      </Container>
      <JsonLd data={{ "@context": "https://schema.org", ...sportsEvent(m) }} />
    </>
  );
}

