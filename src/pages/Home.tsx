import { ChevronRight } from "lucide-react";
import { CLUBS_DATA, SITE } from "@/data";
import type { Club, SectionLinkItem } from "@/types";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatLongEditionDate, formatText } from "@/lib/format";
import { articlePath, clubGroupPath, clubPath, matchPath } from "@/lib/paths";
import {
  articlesOfClub, clubsInGroup, isFinished, lastMatch, latestArticles, leadArticle, nextMatch, regionalMatches, sortedArticles,
} from "@/lib/queries";
import { ArticleBadges, ArticleGrid, ArticleMeta, ArticleRow } from "@/components/site/ArticleCard";
import { ArticleImage } from "@/components/site/ArticleImage";
import { ClubCard } from "@/components/site/ClubCard";
import { ClubCrest } from "@/components/site/ClubCrest";
import { GoldVeins, VeinDivider } from "@/components/site/Decor";
import { AppLink } from "@/components/site/Links";
import { matchWhen, Scoreboard, ScoreOrTime } from "@/components/site/Matches";
import { MoreLink, Section } from "@/components/site/Page";
import { SocialBlock } from "@/components/site/SocialBlock";
import { TablesTabs } from "@/components/site/Tables";
import { TocFloating, TocRail } from "@/components/site/TableOfContents";

export const HOME_TOC: SectionLinkItem[] = [
  { id: "holovne", label: "Головне", placement: "main" },
  { id: "match-tsentr", label: "Матч-центр", placement: "main" },
  { id: "profesionaly", label: "Професіонали", placement: "main" },
  { id: "amatory-oblast", label: "Аматори та область", placement: "main" },
  { id: "zhinochyi-futbol", label: "Жіночий футбол", placement: "main" },
  { id: "tablytsi", label: "Таблиці", placement: "main" },
  { id: "istoriia", label: "Історія", placement: "main" },
  { id: "poza-zmahanniamy", label: "Поза змаганнями", placement: "main" },
  { id: "ostanni-novyny", label: "Останні новини", placement: "aside" },
  { id: "spilnota", label: "Спільнота", placement: "main" },
];

const byLevel = (groups: Club["group"][]) => {
  const ids = new Set(CLUBS_DATA.filter((c) => groups.includes(c.group)).map((c) => c.id));
  return sortedArticles().filter((a) => a.clubs.some((c) => ids.has(c)) || (a.primary.kind === "tournament" && groups.includes("amatory") && /amator|oblasti/.test(a.primary.id ?? "")));
};

export function HomePage() {
  const lead = leadArticle();
  const pro = sortedArticles().filter((a) => a !== lead && (a.clubs.includes("sk-poltava") || a.clubs.includes("sk-poltava-2"))).slice(0, 4);
  const amateur = byLevel(["amatory", "oblast"]).slice(0, 4);
  const women = sortedArticles().filter((a) => a.clubs.includes("lider-kobeliaky") || a.clubs.includes("vorskla-zhinky")).slice(0, 2);
  const history = sortedArticles().filter((a) => a.type === "istoriia").slice(0, 4);
  const latest = latestArticles(9);
  return (
    <>
      <Hero lead={lead} />
      <div className="mx-auto max-w-[1440px] px-4 sm:px-6 lg:px-8">
        <div className="grid gap-x-10 gap-y-16 py-14 lg:grid-cols-[minmax(0,1fr)_300px] lg:py-16 xl:grid-cols-[150px_minmax(0,1fr)_300px]">
          <div className="hidden xl:block"><TocRail items={HOME_TOC} /></div>
          <div className="min-w-0 space-y-14">
            <MatchCenter />
            <VeinDivider />
            <Section id="profesionaly" title="Професіонали" description="СК «Полтава» в Першій лізі та «Полтава-2» у Другій." action={<MoreLink href={clubGroupPath("profesiini")}>Професійні клуби</MoreLink>}>
              <ClubStrip clubs={clubsInGroup("profesiini")} />
              <div className="mt-5"><ArticleGrid articles={pro} /></div>
            </Section>
            <VeinDivider />
            <Section id="amatory-oblast" title="Аматори та область" description="Чемпіонат і Кубок України серед аматорів, чемпіонат і Кубок Полтавської області." action={<MoreLink href={clubGroupPath("amatory")}>Аматорські клуби</MoreLink>}>
              <ClubStrip clubs={clubsInGroup("amatory")} />
              <div className="mt-5"><ArticleGrid articles={amateur} mirror /></div>
            </Section>
            <VeinDivider />
            <Section id="zhinochyi-futbol" title="Жіночий футбол" action={<MoreLink href={clubGroupPath("zhinochi")}>Жіночі клуби</MoreLink>}>
              <ArticleGrid articles={women} />
            </Section>
            <VeinDivider />
            <Section id="tablytsi" title="Таблиці" description="Сезон 2026/27. Клуби Полтавщини виділено." action={<MoreLink href="/tablytsi/">Усі таблиці</MoreLink>}>
              <TablesTabs ids={["persha-liha", "druha-liha", "chempionat-ukrainy-amatory", "upl"]} />
            </Section>
            <VeinDivider />
            <Section id="istoriia" title="Історія та інтерв’ю" action={<MoreLink href="/rubryka/istoriia/">Рубрика «Історія»</MoreLink>}>
              <ArticleGrid articles={history} mirror />
            </Section>
            <VeinDivider />
            <Section id="poza-zmahanniamy" title="Поза змаганнями" description="Клуби, які цього сезону не виступають, і що відомо про їхнє повернення." action={<MoreLink href={clubGroupPath("poza-zmahanniamy")}>Усі клуби поза змаганнями</MoreLink>}>
              <div className="grid gap-3 md:grid-cols-2">{clubsInGroup("poza-zmahanniamy").map((c) => <ClubCard key={c.id} club={c} />)}</div>
            </Section>
          </div>
          <aside aria-label="Стрічка новин" className="min-w-0">
            <section id="ostanni-novyny" aria-labelledby="latest-title" className="scrollbar-thin lg:sticky lg:top-[calc(var(--header-h)+40px)] lg:max-h-[calc(100vh-var(--header-h)-64px)] lg:overflow-y-auto lg:pr-1">
              <h2 id="latest-title" className="font-display text-[1.625rem] leading-tight font-semibold text-ivory-light">Останні новини</h2>
              <ol className="mt-4 divide-y divide-lapis-border/70 border-t border-lapis-border">
                {latest.map((a) => <ArticleRow key={a.id} article={a} edition={SITE.edition} />)}
              </ol>
              <p className="mt-4"><MoreLink href="/novyny/">Усі новини</MoreLink></p>
            </section>
          </aside>
        </div>
      </div>
      <SocialBlock site={SITE} posts={latest.slice(0, 2)} />
      <TocFloating items={HOME_TOC} className="xl:hidden" />
    </>
  );
}

function Hero({ lead }: { lead: ReturnType<typeof leadArticle> }) {
  return (
    <section id="holovne" aria-labelledby="lead-heading" className="lapis-texture relative overflow-hidden border-b border-lapis-border bg-lapis-deep">
      <GoldVeins variant="hero" />
      <div className="mx-auto grid max-w-[1440px] gap-x-12 gap-y-10 px-4 pt-10 pb-12 sm:px-6 lg:grid-cols-12 lg:px-8 lg:pt-16 lg:pb-20">
        <div className="flex flex-col lg:col-span-5 lg:pt-4">
          <p className="font-sans text-[13px] text-lapis-secondary">
            <time dateTime={SITE.edition.slice(0, 10)}>{formatLongEditionDate(SITE.edition)}</time>
            <span className="mx-2 text-lapis-muted" aria-hidden="true">/</span>сезон {SITE.season}
          </p>
          <h1 className="mt-6 font-display text-[clamp(2.75rem,7vw,4.75rem)] leading-[0.95] font-semibold tracking-[0.01em] text-ivory-light [overflow-wrap:anywhere]">
            Футбол Полтавщини
            <span className="mt-5 block max-w-[30rem] font-serif text-[clamp(1.125rem,2vw,1.375rem)] leading-[1.4] font-normal tracking-normal text-ivory/80 normal-case">
              новини, матчі й таблиці клубів області: від Першої ліги до обласної першості
            </span>
          </h1>
          <p className="mt-6 max-w-[32rem] font-serif text-[16px] leading-[1.7] text-ivory/70">{formatText(SITE.intro)}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a href="#match-tsentr" className={buttonVariants({ size: "lg" })}>Відкрити матч-центр</a>
            <AppLink href="/tablytsi/" className={buttonVariants({ variant: "outline", size: "lg" })}>Турнірні таблиці</AppLink>
          </div>
        </div>
        <div className="min-w-0 lg:col-span-7">
          <div className="mb-4 flex items-center gap-4">
            <h2 id="lead-heading" className="shrink-0 font-sans text-[13px] font-semibold text-gold">Головне за день</h2>
            <span aria-hidden="true" className="h-px flex-1 bg-lapis-border" />
          </div>
          <article className="group relative rounded-[12px] border border-lapis-border bg-lapis-bg/70 p-2.5 transition-colors duration-200 hover:border-gold/55">
            <div className="relative">
              <ArticleImage id={lead.id} bg={lead.imageBg} icon={lead.imageIcon} size="lead" className="rounded-[9px]" />
              <ArticleBadges article={lead} className="absolute top-3 right-3 left-3" />
            </div>
            <div className="px-3 pt-6 pb-4 sm:px-5">
              <h3 className="font-serif text-[1.625rem] leading-[1.2] font-semibold text-ivory-light [overflow-wrap:anywhere] hyphens-auto sm:text-[2rem]">
                <AppLink href={articlePath(lead.id)} className="outline-none after:absolute after:inset-0 after:rounded-[12px] focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-gold">{lead.title}</AppLink>
              </h3>
              <p className="mt-4 max-w-[44rem] font-serif text-[16.5px] leading-[1.7] text-ivory/80">{formatText(lead.excerpt)}</p>
              <ArticleMeta article={lead} className="mt-5" />
            </div>
          </article>
        </div>
      </div>
    </section>
  );
}

function MatchCenter() {
  const finishedPro = regionalMatches().filter((m) => isFinished(m) && m.score && ["persha-liha", "druha-liha", "kubok-ukrainy-amatory", "chempionat-ukrainy-amatory"].includes(m.tournament));
  const featured = finishedPro.sort((a, b) => b.date.localeCompare(a.date)).find((m) => m.tournament === "persha-liha") ?? finishedPro[0];
  const active = CLUBS_DATA.filter((c) => c.status === "active" && ["profesiini", "amatory", "zhinochi"].includes(c.group));
  return (
    <section id="match-tsentr" aria-labelledby="match-center-title">
      <div className="mb-7 flex flex-wrap items-end justify-between gap-3">
        <div>
          <h2 id="match-center-title" className="font-display text-[1.75rem] leading-[1.1] font-semibold text-ivory-light sm:text-[2rem]">Матч-центр</h2>
          <p className="mt-2 font-serif text-[15px] text-lapis-secondary">Останній результат і найближчі матчі команд Полтавщини.</p>
        </div>
        <MoreLink href="/matchi/">Усі матчі тижня</MoreLink>
      </div>
      <div className="grid gap-4 md:grid-cols-12">
        <div className="md:col-span-7">{featured && <Scoreboard m={featured} headingLevel={3} />}</div>
        <div className="rounded-[10px] border border-lapis-border bg-lapis-surface p-5 md:col-span-5">
          <h3 className="font-sans text-[15px] font-semibold text-ivory-light">Наступні матчі</h3>
          <ul className="mt-3 divide-y divide-lapis-border/70">
            {active.map((c) => {
              const nx = nextMatch(c);
              const ls = lastMatch(c);
              const m = nx ?? ls;
              return (
                <li key={c.id} className="flex gap-3 py-3">
                  <ClubCrest club={c} size="md" />
                  <div className="min-w-0 flex-1 font-sans text-[13px]">
                    <AppLink href={clubPath(c.id)} className="font-semibold text-ivory-light hover:text-gold-hover">{c.name}</AppLink>
                    {m ? (
                      <AppLink href={matchPath(m)} className="mt-0.5 block text-ivory/85 hover:text-ivory-light">
                        <span className="text-lapis-secondary">{nx ? matchWhen(m) : "Останній матч"}</span>
                        <span className="block">{m.homeTeam} <ScoreOrTime m={m} /> {m.awayTeam}</span>
                      </AppLink>
                    ) : (
                      <p className="mt-0.5 text-lapis-secondary">Матчі з’являться після оновлення календаря</p>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </section>
  );
}

function ClubStrip({ clubs }: { clubs: Club[] }) {
  return (
    <ul className="grid gap-2.5 sm:grid-cols-2 lg:grid-cols-3">
      {clubs.map((c) => (
        <li key={c.id}>
          <AppLink href={clubPath(c.id)} className="flex items-center gap-3 rounded-lg border border-lapis-border bg-lapis-surface p-2.5 pr-3 transition-[transform,border-color] duration-200 hover:scale-105 hover:border-gold/55">
            <ClubCrest club={c} size="md" />
            <span className="flex min-w-0 flex-1 flex-col">
              <span className="font-sans text-[14px] font-semibold text-ivory-light">{c.name}</span>
              <span className="truncate font-sans text-[12px] text-lapis-secondary">{articlesOfClub(c.id).length} матеріалів</span>
            </span>
            {c.badge && <Badge variant="muted" className={cn("hidden sm:inline-flex")}>{c.badge}</Badge>}
            <ChevronRight className="size-4 shrink-0 text-lapis-muted" strokeWidth={1.5} aria-hidden="true" />
          </AppLink>
        </li>
      ))}
    </ul>
  );
}
