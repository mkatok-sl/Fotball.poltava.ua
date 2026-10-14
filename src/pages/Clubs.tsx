import { ExternalLink as ExternalIcon, MapPin } from "lucide-react";
import { CLUBS_DATA } from "@/data";
import type { Club, ClubGroup, Crumb } from "@/types";
import { Badge } from "@/components/ui/badge";
import { formatText } from "@/lib/format";
import { CLUB_GROUPS, CLUB_TABS, clubGroupPath, clubPath, clubTabs, personPath, stadiumPath, tournamentPath, type ClubTab } from "@/lib/paths";
import {
  articlesOfClub, clubTables, club as getClub, isFinished, lastMatch, matchesOfClub, nextMatch, peopleOfClub, scorersOf, stadium, standingsOf, tournament,
} from "@/lib/queries";
import { ArticleGrid } from "@/components/site/ArticleCard";
import { ClubCard } from "@/components/site/ClubCard";
import { ClubCrest } from "@/components/site/ClubCrest";
import { AppLink, ExternalLink } from "@/components/site/Links";
import { MatchList, Scoreboard } from "@/components/site/Matches";
import { Container, EmptyState, JsonLd, MoreLink, PageHeader, Section, SourceNote, TabNav } from "@/components/site/Page";
import { LeagueTable } from "@/components/site/Tables";

const groupMeta = (g: ClubGroup) => CLUB_GROUPS.find((x) => x.id === g)!;
const clubsCrumbs: Crumb[] = [{ label: "Головна", href: "/" }, { label: "Клуби", href: "/kluby/" }];

export function ClubsIndexPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Клуби" }]} title="Футбольні клуби Полтавщини"
        intro="Професійні, аматорські, обласні й жіночі команди області, а також клуби, які цього сезону **не виступають**. Групи формуються з участі клубів у турнірах сезону 2026/27." />
      <Container className="space-y-14">
        {CLUB_GROUPS.filter((g) => g.id !== "arkhiv").map((g) => {
          const list = CLUBS_DATA.filter((c) => c.group === g.id);
          return (
            <Section key={g.id} id={g.id} title={g.label} action={<MoreLink href={clubGroupPath(g.id)}>Сторінка групи</MoreLink>}>
              <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{list.map((c) => <ClubCard key={c.id} club={c} />)}</div>
            </Section>
          );
        })}
      </Container>
    </>
  );
}

export function ClubGroupPage({ group }: { group: ClubGroup }) {
  const g = groupMeta(group);
  const list = CLUBS_DATA.filter((c) => c.group === group);
  const intro: Record<ClubGroup, string> = {
    profesiini: "Команди, що виступають у змаганнях **ПФЛ** у сезоні 2026/27.",
    amatory: "Учасники **чемпіонату та Кубка України серед аматорів**.",
    oblast: "Учасники **чемпіонату Полтавської області** 2026/27.",
    zhinochi: "Жіночі команди області в національних змаганнях.",
    "poza-zmahanniamy": "Клуби, які **пропускають сезон** або знялися зі змагань. Хаби залишаються: тут хронологія та умови повернення.",
    arkhiv: "Розформовані клуби з історією виступів.",
  };
  return (
    <>
      <PageHeader crumbs={[...clubsCrumbs, { label: g.short }]} title={g.h1} intro={intro[group]} />
      <Container>
        {list.length ? (
          <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">{list.map((c) => <ClubCard key={c.id} club={c} />)}</div>
        ) : (
          <EmptyState text="Розформованих клубів в архіві поки немає. Сторінка з’явиться в меню, коли тут будуть записи." />
        )}
      </Container>
    </>
  );
}

function ClubHeader({ c, tab }: { c: Club; tab: ClubTab }) {
  const g = groupMeta(c.group);
  const st = c.stadium ? stadium(c.stadium) : undefined;
  const crumbs: Crumb[] = [...clubsCrumbs, { label: g.short, href: clubGroupPath(c.group) }, { label: c.name, href: clubPath(c.id) }];
  if (tab) crumbs.push({ label: CLUB_TABS[tab] });
  return (
    <>
      <PageHeader
        crumbs={crumbs}
        title={
          <span className="flex flex-wrap items-center gap-x-5 gap-y-4">
            <ClubCrest club={c} size="lg" />
            <span className="min-w-0">{tab ? `${c.name}: ${CLUB_TABS[tab].toLowerCase()}` : c.name}</span>
          </span>
        }
        intro={c.summary}
      >
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-2 font-sans text-[12.5px] text-lapis-secondary">
          {c.status !== "active" ? <Badge variant="paused">{c.statusLabel}</Badge> : c.tournaments.map((t) => (
            <AppLink key={t} href={tournamentPath(t)}><Badge variant="muted">{tournament(t)?.name}</Badge></AppLink>
          ))}
          {c.badge && <Badge variant="muted">{c.badge}</Badge>}
          <span className="inline-flex items-center gap-1.5"><MapPin className="size-3.5" strokeWidth={1.5} aria-hidden="true" />{c.city}</span>
          {st && <AppLink href={stadiumPath(st.id)} className="underline decoration-lapis-border underline-offset-4 hover:text-ivory-light">{st.name}</AppLink>}
          {c.founded && <span className="tnum">Засновано {c.founded}</span>}
          {c.officialUrl && (
            <ExternalLink href={c.officialUrl} className="inline-flex items-center gap-1 text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">
              Офіційний сайт<ExternalIcon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </ExternalLink>
          )}
        </div>
      </PageHeader>
      <TabNav label={`Розділи клубу ${c.name}`} items={clubTabs(c).map((t) => ({ href: clubPath(c.id, t), label: CLUB_TABS[t] }))} />
    </>
  );
}

export function ClubPage({ id, tab }: { id: string; tab: ClubTab }) {
  const c = getClub(id)!;
  return (
    <>
      <ClubHeader c={c} tab={tab} />
      <Container className="space-y-14">
        {tab === "" && <ClubOverview c={c} />}
        {tab === "novyny/" && <ClubNews c={c} />}
        {tab === "matchi/" && <ClubMatches c={c} />}
        {tab === "tablytsia/" && <ClubTablesTab c={c} />}
        {tab === "sklad/" && <ClubSquad c={c} />}
        {tab === "statystyka/" && <ClubStats c={c} />}
        {tab === "istoriia/" && <ClubHistory c={c} />}
        {tab === "shcho-vidomo/" && <ClubStatus c={c} />}
        <SourceNote sources={c.sources} />
      </Container>
      {tab === "" && (
        <JsonLd data={{
          "@context": "https://schema.org", "@type": "SportsTeam", name: c.name, sport: "Футбол", location: { "@type": "Place", name: c.city },
          ...(c.founded ? { foundingDate: String(c.founded) } : {}), ...(c.officialUrl ? { url: c.officialUrl } : {}),
          memberOf: c.tournaments.map((t) => ({ "@type": "SportsOrganization", name: tournament(t)?.name })),
        }} />
      )}
    </>
  );
}

function ClubOverview({ c }: { c: Club }) {
  const nx = nextMatch(c);
  const ls = lastMatch(c);
  const news = articlesOfClub(c.id).slice(0, 4);
  const tables = clubTables(c);
  return (
    <>
      {c.status !== "active" ? (
        <ClubStatus c={c} compact />
      ) : (
        <Section id="matchi" title="Матчі" action={<MoreLink href={clubPath(c.id, "matchi/")}>Усі матчі</MoreLink>}>
          {nx || ls ? (
            <div className="grid gap-4 md:grid-cols-2">
              {ls && <Scoreboard m={ls} headingLevel={3} />}
              {nx && <Scoreboard m={nx} headingLevel={3} />}
            </div>
          ) : (
            <EmptyState text="Календар команди з’явиться після підключення офіційного джерела." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />
          )}
        </Section>
      )}
      {tables.length > 0 && (
        <Section id="tablytsia" title="Місце в турнірі" action={<MoreLink href={clubPath(c.id, "tablytsia/")}>Повна таблиця</MoreLink>}>
          {tables.slice(0, 1).map((tid) => {
            const t = tournament(tid)!;
            const rows = standingsOf(tid);
            const idx = rows.findIndex((r) => c.tableNames.includes(r.club));
            const slice = rows.slice(Math.max(0, idx - 2), idx + 3);
            return <LeagueTable key={tid} t={t} rows={slice} compact />;
          })}
        </Section>
      )}
      <Section id="novyny" title="Новини" action={news.length ? <MoreLink href={clubPath(c.id, "novyny/")}>Усі новини клубу</MoreLink> : undefined}>
        {news.length ? <ArticleGrid articles={news} /> : <EmptyState text="Матеріалів про клуб поки немає." />}
      </Section>
      {c.related && c.related.length > 0 && (
        <Section id="poviazani" title="Пов’язані команди">
          <div className="grid gap-3 md:grid-cols-2">{c.related.map((r) => getClub(r)).filter((x): x is Club => !!x).map((rc) => <ClubCard key={rc.id} club={rc} />)}</div>
        </Section>
      )}
    </>
  );
}

function ClubNews({ c }: { c: Club }) {
  const list = articlesOfClub(c.id);
  return (
    <Section id="novyny" title={`Усі матеріали: ${c.name}`}>
      {list.length ? <ArticleGrid articles={list} /> : <EmptyState text="Матеріалів про клуб поки немає." />}
    </Section>
  );
}

function ClubMatches({ c }: { c: Club }) {
  const all = matchesOfClub(c);
  const upcoming = all.filter((m) => !isFinished(m));
  const done = all.filter(isFinished).reverse();
  if (!all.length) return <EmptyState text="Календар команди з’явиться після підключення офіційного джерела." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />;
  return (
    <>
      <Section id="nastupni" title="Найближчі матчі">
        {upcoming.length ? <MatchList matches={upcoming} showTournament label="Найближчі матчі" /> : <EmptyState text="Найближчих матчів у календарі немає." />}
      </Section>
      <Section id="rezultaty" title="Результати сезону 2026/27">
        {done.length ? <MatchList matches={done} showTournament label="Результати" /> : <EmptyState text="Зіграних матчів у сезоні ще немає." />}
      </Section>
    </>
  );
}

function ClubTablesTab({ c }: { c: Club }) {
  const tables = clubTables(c);
  if (!tables.length) {
    return <EmptyState text="Таблиця з’явиться після публікації офіційних результатів." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />;
  }
  return (
    <>
      {tables.map((tid) => {
        const t = tournament(tid)!;
        return (
          <Section key={tid} id={tid} title={`${t.name}${t.tableLabel ? `, ${t.tableLabel.toLowerCase()}` : ""}`} action={<MoreLink href={tournamentPath(tid)}>Сторінка турніру</MoreLink>}>
            <LeagueTable t={t} rows={standingsOf(tid)} />
          </Section>
        );
      })}
    </>
  );
}

function ClubSquad({ c }: { c: Club }) {
  const people = peopleOfClub(c.id);
  return (
    <Section id="sklad" title="Гравці й тренери на сайті" description="Повний заявковий список — на сторінці команди в ПФЛ і на сайті клубу.">
      {people.length ? (
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {people.map((p) => (
            <li key={p.id} className="rounded-[10px] border border-lapis-border bg-lapis-surface p-4">
              <h3 className="font-sans text-[15px] font-semibold text-ivory-light"><AppLink href={personPath(p.id)} className="hover:text-gold-hover">{p.name}</AppLink></h3>
              <p className="mt-1 font-sans text-[12px] text-lapis-secondary">{p.role}</p>
              <p className="mt-2 font-serif text-[14px] leading-[1.55] text-ivory/75">{p.note}</p>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState text="Склад з’явиться після підключення сторінки команди." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />
      )}
    </Section>
  );
}

function ClubStats({ c }: { c: Club }) {
  const rows = c.tournaments.flatMap((t) => scorersOf(t).filter((s) => c.tableNames.includes(s.team)).map((s) => ({ ...s, t })));
  return (
    <Section id="statystyka" title="Бомбардири команди">
      {rows.length ? (
        <ul className="divide-y divide-lapis-border/60 overflow-hidden rounded-[10px] border border-lapis-border bg-lapis-surface">
          {rows.map((s) => (
            <li key={s.player} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 font-sans text-[14px]">
              <span className="text-ivory-light">{s.personId ? <AppLink href={personPath(s.personId)} className="hover:text-gold-hover">{s.player}</AppLink> : s.player}</span>
              <span className="tnum text-lapis-secondary">{tournament(s.t)?.name}: <span className="font-semibold text-gold">{s.goals}</span>{s.penalties ? ` (${s.penalties} з пен.)` : ""}</span>
            </li>
          ))}
        </ul>
      ) : (
        <EmptyState text="Статистика з’явиться після підключення протоколів матчів." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />
      )}
    </Section>
  );
}

function ClubHistory({ c }: { c: Club }) {
  const items = articlesOfClub(c.id).filter((a) => a.type === "istoriia");
  return (
    <>
      <Section id="sezony" title="Сезони й досягнення">
        {c.history?.length ? (
          <div className="scrollbar-thin overflow-x-auto rounded-[10px] border border-lapis-border">
            <table className="tnum w-full min-w-[520px] border-collapse font-sans text-[14px]">
              <caption className="sr-only">Історія виступів: {c.name}</caption>
              <thead><tr className="bg-lapis-deep text-[12px] text-lapis-secondary"><th scope="col" className="px-4 py-2.5 text-left font-medium">Сезон</th><th scope="col" className="px-4 py-2.5 text-left font-medium">Турнір</th><th scope="col" className="px-4 py-2.5 text-left font-medium">Місце</th><th scope="col" className="px-4 py-2.5 text-left font-medium">Примітка</th></tr></thead>
              <tbody>
                {c.history.map((h) => (
                  <tr key={h.season + h.tournament} className="border-t border-lapis-border/60 bg-lapis-surface">
                    <th scope="row" className="px-4 py-2.5 text-left font-semibold text-ivory-light">{h.season}</th>
                    <td className="px-4 py-2.5 text-ivory/85">{h.tournament}</td>
                    <td className="px-4 py-2.5 text-gold">{h.place}</td>
                    <td className="px-4 py-2.5 text-lapis-secondary">{h.note}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <EmptyState text="Історія виступів з’явиться після імпорту архівних сезонів." sourceUrl={c.sources[0]?.url} sourceLabel={c.sources[0]?.label} />
        )}
      </Section>
      {items.length > 0 && <Section id="materialy" title="Історичні матеріали"><ArticleGrid articles={items} /></Section>}
    </>
  );
}

function ClubStatus({ c, compact = false }: { c: Club; compact?: boolean }) {
  const related = articlesOfClub(c.id).filter((a) => ["ofitsiino", "analityka"].includes(a.type)).slice(0, compact ? 2 : 6);
  return (
    <Section id="shcho-vidomo" title="Що відомо" action={compact ? <MoreLink href={clubPath(c.id, "shcho-vidomo/")}>Докладніше</MoreLink> : undefined}>
      <div className="rounded-[10px] border border-dusty-red/30 bg-dusty-red/5 p-5">
        <p className="font-sans text-[13px] font-semibold text-dusty-red">{c.statusLabel}</p>
        <p className="mt-2 max-w-[48rem] font-serif text-[16px] leading-[1.7] text-ivory/85">{formatText(c.statusNote ?? "")}</p>
      </div>
      {related.length > 0 && <div className="mt-5"><ArticleGrid articles={related} /></div>}
    </Section>
  );
}
