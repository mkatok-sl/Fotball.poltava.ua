import { TOURNAMENTS_DATA } from "@/data";
import type { Crumb, Match, Tournament } from "@/types";
import { formatText, toIsoWithZone } from "@/lib/format";
import { TOURNAMENT_TABS, archivePath, clubPath, personPath, tourPath, tournamentPath, type TournamentTab } from "@/lib/paths";
import {
  articlesOfTournament, clubByName, completedRounds, matchesOfTournament, rounds, scorersOf, standingsOf, tournament as getTournament,
} from "@/lib/queries";
import { ArticleGrid } from "@/components/site/ArticleCard";
import { ClubCrest } from "@/components/site/ClubCrest";
import { AppLink, ExternalLink } from "@/components/site/Links";
import { GroupedMatches, MatchList } from "@/components/site/Matches";
import { Container, EmptyState, JsonLd, MoreLink, PageHeader, Section, TabNav } from "@/components/site/Page";
import { TournamentTable } from "@/components/site/Tables";

const GROUPS = ["Національні", "Аматорські", "Обласні", "Жіночі", "Огляд"] as const;
const base: Crumb[] = [{ label: "Головна", href: "/" }, { label: "Турніри", href: "/turniry/" }];

export const tournamentTabs = (t: Tournament): TournamentTab[] => {
  const tabs: TournamentTab[] = [""];
  if (t.format === "single") return ["", "novyny/", "reglament/"];
  tabs.push(t.format === "cup" ? "sitka/" : "tablytsia/", "kalendar/");
  if (["persha-liha", "druha-liha", "upl", "chempionat-ukrainy-amatory"].includes(t.id)) tabs.push("bombardyry/");
  tabs.push("novyny/", "reglament/");
  return tabs;
};

export function TournamentsIndexPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Турніри" }]} title="Турніри з участю команд Полтавщини, сезон 2026/27"
        intro="Від Першої ліги до чемпіонату Полтави. Кожен турнір має таблицю або сітку, календар, новини та регламент." />
      <Container className="space-y-14">
        {GROUPS.map((g) => (
          <Section key={g} id={g} title={g}>
            <ul className="grid gap-3 md:grid-cols-2">
              {TOURNAMENTS_DATA.filter((t) => t.group === g).map((t) => (
                <li key={t.id} className="group relative rounded-[10px] border border-lapis-border bg-lapis-surface p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
                  <h3 className="font-sans text-[16px] font-semibold text-ivory-light">
                    <AppLink href={tournamentPath(t.id)} className="after:absolute after:inset-0 after:rounded-[10px]">{t.name}</AppLink>
                  </h3>
                  <p className="mt-1 font-sans text-[12px] text-lapis-secondary">Організатор: {t.organizer}</p>
                  <p className="mt-2 font-serif text-[14.5px] leading-[1.6] text-ivory/75">{formatText(t.about)}</p>
                </li>
              ))}
            </ul>
          </Section>
        ))}
      </Container>
    </>
  );
}

function TournamentHeader({ t, tab, extra }: { t: Tournament; tab: TournamentTab; extra?: Crumb }) {
  const crumbs: Crumb[] = [...base, { label: t.group }, { label: t.name, href: tournamentPath(t.id) }];
  if (tab) crumbs.push({ label: TOURNAMENT_TABS[tab] });
  if (extra) crumbs.push(extra);
  const title = extra ? `${t.name}: ${extra.label.toLowerCase()}` : tab ? `${t.name} ${t.season}: ${TOURNAMENT_TABS[tab].toLowerCase()}` : `${t.name} ${t.season}`;
  return (
    <>
      <PageHeader crumbs={crumbs} title={title} intro={!tab && !extra ? t.about : undefined}
        eyebrow={<>Організатор: {t.organizerUrl ? <ExternalLink href={t.organizerUrl} className="underline decoration-lapis-border underline-offset-4 hover:text-ivory-light">{t.organizer}</ExternalLink> : t.organizer}</>} />
      <TabNav label={`Розділи турніру ${t.name}`} items={tournamentTabs(t).map((x) => ({ href: tournamentPath(t.id, x), label: TOURNAMENT_TABS[x] }))} />
    </>
  );
}

const byRound = (ms: Match[]) => {
  const map = new Map<string, Match[]>();
  for (const m of ms) map.set(m.round, [...(map.get(m.round) ?? []), m]);
  return [...map.entries()].map(([title, matches]) => ({ title, matches }));
};

export function TournamentPage({ id, tab }: { id: string; tab: TournamentTab }) {
  const t = getTournament(id)!;
  const all = matchesOfTournament(id);
  const regionalTeams = [...new Set([...standingsOf(id).map((r) => r.club), ...all.flatMap((m) => [m.homeTeam, m.awayTeam])])].map(clubByName).filter((c, i, arr) => c && arr.indexOf(c) === i);
  const done = completedRounds(id);
  return (
    <>
      <TournamentHeader t={t} tab={tab} />
      <Container className="space-y-14">
        {tab === "" && (
          <>
            {regionalTeams.length > 0 && (
              <Section id="nashi" title="Наші в турнірі">
                <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
                  {regionalTeams.map((c) => c && (
                    <li key={c.id}>
                      <AppLink href={clubPath(c.id)} className="flex items-center gap-3 rounded-lg border border-lapis-border bg-lapis-surface p-2.5 transition-[transform,border-color] duration-200 hover:scale-105 hover:border-gold/55">
                        <ClubCrest club={c} size="md" /><span className="font-sans text-[14px] font-semibold text-ivory-light">{c.name}</span>
                      </AppLink>
                    </li>
                  ))}
                </ul>
              </Section>
            )}
            {t.format === "cup" || t.format === "single" ? (
              <Section id="matchi" title="Матчі за участю команд області" action={all.length ? <MoreLink href={tournamentPath(id, t.format === "cup" ? "sitka/" : "")}>Уся сітка</MoreLink> : undefined}>
                {all.length ? <GroupedMatches groups={byRound(all)} /> : <EmptyState text="Матчі з’являться після оголошення розкладу." sourceUrl={t.sourceUrl} sourceLabel={t.sourceLabel} />}
              </Section>
            ) : (
              <Section id="tablytsia" title={`Таблиця${t.tableLabel ? `, ${t.tableLabel.toLowerCase()}` : ""}`} action={<MoreLink href={tournamentPath(id, "tablytsia/")}>Повна таблиця</MoreLink>}>
                <TournamentTable t={t} />
              </Section>
            )}
            {done.length > 0 && (
              <Section id="tur" title={`${done[done.length - 1]}-й тур`} action={<MoreLink href={tourPath(id, done[done.length - 1])}>Сторінка туру</MoreLink>}>
                <MatchList matches={all.filter((m) => m.roundNo === done[done.length - 1])} label="Матчі туру" />
              </Section>
            )}
            <TournamentNews id={id} />
          </>
        )}
        {tab === "tablytsia/" && <TournamentTable t={t} />}
        {(tab === "kalendar/" || tab === "sitka/") && (
          all.length ? (
            <>
              {all.some((m) => m.roundNo) && done.length > 0 && (
                <p className="flex flex-wrap gap-2 font-sans text-[13px]">
                  <span className="text-lapis-secondary">Сторінки турів:</span>
                  {rounds(id).filter((n) => done.includes(n)).map((n) => <AppLink key={n} href={tourPath(id, n)} className="rounded-md border border-lapis-border px-2 py-0.5 text-ivory hover:border-gold/60">{n}</AppLink>)}
                </p>
              )}
              <GroupedMatches groups={byRound(all)} />
              <EmptyState text="Тут показано матчі з відомим розкладом або результатом. Повний календар — на сайті організатора." sourceUrl={t.sourceUrl} sourceLabel={t.sourceLabel} />
            </>
          ) : (
            <EmptyState text="Календар з’явиться після підключення офіційного джерела." sourceUrl={t.sourceUrl} sourceLabel={t.sourceLabel} />
          )
        )}
        {tab === "bombardyry/" && <Scorers t={t} />}
        {tab === "novyny/" && <TournamentNews id={id} all />}
        {tab === "reglament/" && (
          <Section id="reglament" title="Формат і регламент">
            <div className="max-w-[48rem] space-y-4 font-serif text-[16px] leading-[1.75] text-ivory/85">
              {t.reglament.map((p, i) => <p key={i}>{formatText(p)}</p>)}
            </div>
            {t.archives.length > 0 && (
              <div className="mt-8">
                <h3 className="font-sans text-[15px] font-semibold text-ivory-light">Архів сезонів</h3>
                <ul className="mt-3 space-y-2">{t.archives.map((a) => <li key={a.slug}><MoreLink href={archivePath(id, a.slug)}>{a.label}</MoreLink></li>)}</ul>
              </div>
            )}
            {t.sourceUrl && <p className="mt-6"><ExternalLink href={t.sourceUrl} className="font-sans text-[13px] text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">Документи й таблиці на сайті організатора</ExternalLink></p>}
          </Section>
        )}
      </Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ItemList", name: `${t.name} ${t.season}: матчі`, itemListElement: all.slice(0, 30).map((m, i) => ({ "@type": "ListItem", position: i + 1, item: sportsEvent(m) })) }} />
    </>
  );
}

function TournamentNews({ id, all = false }: { id: string; all?: boolean }) {
  const list = articlesOfTournament(id).slice(0, all ? 100 : 4);
  return (
    <Section id="novyny" title="Новини турніру" action={!all && list.length ? <MoreLink href={tournamentPath(id, "novyny/")}>Усі новини</MoreLink> : undefined}>
      {list.length ? <ArticleGrid articles={list} /> : <EmptyState text="Матеріалів про турнір поки немає." />}
    </Section>
  );
}

function Scorers({ t }: { t: Tournament }) {
  const list = scorersOf(t.id);
  if (!list.length) return <EmptyState text="Список бомбардирів з’явиться після підключення статистики турніру." sourceUrl={t.scorersSourceUrl ?? t.sourceUrl} sourceLabel={t.sourceLabel} />;
  return (
    <div className="scrollbar-thin overflow-x-auto rounded-[10px] border border-lapis-border">
      <table className="tnum w-full min-w-[520px] border-collapse font-sans text-[14px]">
        <caption className="sr-only">{t.name}: бомбардири</caption>
        <thead><tr className="bg-lapis-deep text-[12px] text-lapis-secondary">
          <th scope="col" className="px-4 py-2.5 text-left font-medium">#</th><th scope="col" className="px-4 py-2.5 text-left font-medium">Гравець</th>
          <th scope="col" className="px-4 py-2.5 text-left font-medium">Команда</th><th scope="col" className="px-4 py-2.5 text-center font-medium">Голи</th>
          <th scope="col" className="px-4 py-2.5 text-center font-medium">З пен.</th><th scope="col" className="px-4 py-2.5 text-center font-medium">Матчі</th>
        </tr></thead>
        <tbody>
          {list.map((s, i) => {
            const c = clubByName(s.team);
            return (
              <tr key={s.player} className={c ? "border-t border-lapis-border/60 bg-[color-mix(in_oklab,var(--color-gold)_13%,var(--color-lapis-surface))]" : "border-t border-lapis-border/60 bg-lapis-surface"}>
                <td className="px-4 py-2.5 text-lapis-secondary">{i + 1}</td>
                <th scope="row" className="px-4 py-2.5 text-left font-semibold text-ivory-light">{s.personId ? <AppLink href={personPath(s.personId)} className="hover:text-gold-hover">{s.player}</AppLink> : s.player}</th>
                <td className="px-4 py-2.5 text-ivory/85">{c ? <AppLink href={clubPath(c.id)} className="underline decoration-gold/40 underline-offset-4">{s.team}</AppLink> : s.team}</td>
                <td className="px-4 py-2.5 text-center font-semibold text-gold">{s.goals}</td>
                <td className="px-4 py-2.5 text-center text-lapis-secondary">{s.penalties ?? "—"}</td>
                <td className="px-4 py-2.5 text-center text-lapis-secondary">{s.matches ?? "—"}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export function TourPage({ id, n }: { id: string; n: number }) {
  const t = getTournament(id)!;
  const ms = matchesOfTournament(id).filter((m) => m.roundNo === n);
  const done = completedRounds(id);
  const prev = done.filter((x) => x < n).pop();
  const next = done.find((x) => x > n);
  return (
    <>
      <TournamentHeader t={t} tab="" extra={{ label: `${n}-й тур` }} />
      <Container className="space-y-10">
        <Section id="matchi" title={`Результати ${n}-го туру`}>
          <MatchList matches={ms} label={`${n}-й тур`} />
        </Section>
        <nav aria-label="Інші тури" className="flex flex-wrap justify-between gap-3 font-sans text-[13px]">
          {prev ? <MoreLink href={tourPath(id, prev)}>{`← ${prev}-й тур`}</MoreLink> : <span />}
          {next ? <MoreLink href={tourPath(id, next)}>{`${next}-й тур →`}</MoreLink> : <MoreLink href={tournamentPath(id, "tablytsia/")}>Поточна таблиця</MoreLink>}
        </nav>
      </Container>
    </>
  );
}

export function ArchivePage({ id, season }: { id: string; season: string }) {
  const t = getTournament(id)!;
  const a = t.archives.find((x) => x.slug === season)!;
  return (
    <>
      <TournamentHeader t={t} tab="" extra={{ label: a.label }} />
      <Container className="space-y-8">
        <Section id="pidsumky" title="Підсумки для команд Полтавщини">
          <p className="max-w-[48rem] font-serif text-[16.5px] leading-[1.75] text-ivory/85">{formatText(a.summary)}</p>
        </Section>
        <EmptyState text="Повна підсумкова таблиця сезону імпортується з офіційного архіву." sourceUrl={a.sourceUrl} sourceLabel={`Архів: ${t.organizer}`} />
      </Container>
    </>
  );
}

export function sportsEvent(m: Match) {
  return {
    "@type": "SportsEvent",
    name: `${m.homeTeam} — ${m.awayTeam}`,
    startDate: toIsoWithZone(m.date),
    eventStatus: m.status === "postponed" ? "https://schema.org/EventPostponed" : m.status === "finished" ? "https://schema.org/EventCompleted" : "https://schema.org/EventScheduled",
    sport: "Футбол",
    homeTeam: { "@type": "SportsTeam", name: m.homeTeam },
    awayTeam: { "@type": "SportsTeam", name: m.awayTeam },
    ...(m.venue ? { location: { "@type": "Place", name: m.venue } } : {}),
  };
}

