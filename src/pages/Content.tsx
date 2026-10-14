import { Calendar, User } from "lucide-react";
import { RUBRICS_DATA, SERIES_DATA, SITE, TOURNAMENTS_DATA } from "@/data";
import type { Article } from "@/types";
import { formatDateTime, formatText, stripFormatting, toIsoWithZone } from "@/lib/format";
import { articlePath, authorPath, clubPath, matchPath, rubricPath, seriesPath, tournamentPath } from "@/lib/paths";
import {
  articlesOfRubric, articlesOfSeries, article as getArticle, author, club, matchById, rubric, series, sortedArticles, tournament,
} from "@/lib/queries";
import { ArticleBadges, ArticleGrid } from "@/components/site/ArticleCard";
import { ArticleImage } from "@/components/site/ArticleImage";
import { AppLink } from "@/components/site/Links";
import { Container, EmptyState, JsonLd, MoreLink, PageHeader, Section } from "@/components/site/Page";
import { TournamentTable } from "@/components/site/Tables";

export const PAGE_SIZE = 12;
export const newsPages = () => Math.max(1, Math.ceil(sortedArticles().length / PAGE_SIZE));

export function TablesPage() {
  const ids = ["persha-liha", "druha-liha", "chempionat-ukrainy-amatory", "chempionat-oblasti", "persha-liha-zhinky", "upl"];
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Таблиці" }]} title="Турнірні таблиці команд Полтавщини, сезон 2026/27"
        intro="Таблиці всіх турнірів, у яких грають команди області. **Клуби Полтавщини виділено.**" />
      <Container className="space-y-14">
        {ids.map((id) => {
          const t = tournament(id)!;
          return (
            <Section key={id} id={id} title={`${t.name}${t.tableLabel ? `, ${t.tableLabel.toLowerCase()}` : ""}`} action={<MoreLink href={tournamentPath(id)}>Сторінка турніру</MoreLink>}>
              <TournamentTable t={t} />
            </Section>
          );
        })}
      </Container>
    </>
  );
}

function Pagination({ page, total, base }: { page: number; total: number; base: string }) {
  if (total <= 1) return null;
  const href = (p: number) => (p === 1 ? base : `${base}page/${p}/`);
  return (
    <nav aria-label="Сторінки" className="flex flex-wrap gap-2 font-sans text-[14px]">
      {Array.from({ length: total }, (_, i) => i + 1).map((p) => (
        <AppLink key={p} href={href(p)} aria-current={p === page ? "page" : undefined}
          className={p === page ? "rounded-md border border-gold px-3 py-1.5 text-ivory-light" : "rounded-md border border-lapis-border px-3 py-1.5 text-ivory hover:border-gold/60"}>
          {p}
        </AppLink>
      ))}
    </nav>
  );
}

export function NewsPage({ page }: { page: number }) {
  const all = sortedArticles();
  const total = newsPages();
  const list = all.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Новини", href: "/novyny/" }, ...(page > 1 ? [{ label: `Сторінка ${page}` }] : [])]}
        title={page > 1 ? `Новини футболу Полтавщини — сторінка ${page}` : "Новини футболу Полтавщини"}
        intro="Усі матеріали видання: від новин професійних клубів до обласних турнірів." />
      <Container className="space-y-10">
        <ArticleGrid articles={list} />
        <Pagination page={page} total={total} base="/novyny/" />
      </Container>
    </>
  );
}

export function ArticlePage({ id }: { id: string }) {
  const a = getArticle(id)!;
  const rub = rubric(a.type);
  const au = author(a.author);
  const m = a.matchId ? matchById(a.matchId) : undefined;
  const ser = a.series ? series(a.series) : undefined;
  const parts = ser ? articlesOfSeries(ser.id) : [];
  const primaryHref = a.primary.kind === "club" ? clubPath(a.primary.id!) : a.primary.kind === "tournament" ? tournamentPath(a.primary.id!) : "/novyny/";
  const primaryLabel = a.primary.kind === "club" ? club(a.primary.id!)?.name : a.primary.kind === "tournament" ? tournament(a.primary.id!)?.name : "Новини";
  const related = sortedArticles().filter((x) => x.id !== a.id && (x.clubs.some((c) => a.clubs.includes(c)) || x.tournaments.some((t) => a.tournaments.includes(t)))).slice(0, 4);
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: primaryLabel ?? "Новини", href: primaryHref }, { label: a.title }]} title={a.title}
        eyebrow={<ArticleBadges article={a} />}>
        <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[13px] text-lapis-secondary">
          <span className="inline-flex items-center gap-1.5"><Calendar className="size-3.5" strokeWidth={1.5} aria-hidden="true" /><time dateTime={toIsoWithZone(a.date)}>{formatDateTime(a.date)}</time></span>
          {au && <span className="inline-flex items-center gap-1.5"><User className="size-3.5" strokeWidth={1.5} aria-hidden="true" /><AppLink href={authorPath(au.id)} className="underline decoration-lapis-border underline-offset-4 hover:text-ivory-light">{au.name}</AppLink></span>}
          {rub && <AppLink href={rubricPath(rub.id)} className="underline decoration-lapis-border underline-offset-4 hover:text-ivory-light">{rub.name}</AppLink>}
        </div>
      </PageHeader>
      <Container className="grid gap-12 lg:grid-cols-[minmax(0,1fr)_300px]">
        <article className="min-w-0 max-w-[46rem]">
          <ArticleImage id={a.id} bg={a.imageBg} icon={a.imageIcon} size="lead" />
          <p className="mt-8 font-serif text-[19px] leading-[1.65] font-medium text-ivory-light">{formatText(a.excerpt)}</p>
          <div className="mt-6 space-y-5 font-serif text-[17px] leading-[1.8] text-ivory/85">
            {a.body.map((p, i) => <p key={i}>{formatText(p)}</p>)}
          </div>
        </article>
        <aside className="space-y-8">
          <section aria-labelledby="about-title" className="rounded-[10px] border border-lapis-border bg-lapis-surface p-5">
            <h2 id="about-title" className="font-sans text-[15px] font-semibold text-ivory-light">Про що цей матеріал</h2>
            <ul className="mt-3 space-y-2 font-sans text-[14px]">
              {a.clubs.map((c) => club(c)).filter(Boolean).map((c) => <li key={c!.id}><AppLink href={clubPath(c!.id)} className="text-ivory hover:text-gold-hover">Клуб: {c!.name}</AppLink></li>)}
              {a.tournaments.map((t) => tournament(t)).filter(Boolean).map((t) => <li key={t!.id}><AppLink href={tournamentPath(t!.id)} className="text-ivory hover:text-gold-hover">Турнір: {t!.name}</AppLink></li>)}
              {m && <li><AppLink href={matchPath(m)} className="text-ivory hover:text-gold-hover">Матч: {m.homeTeam} — {m.awayTeam}</AppLink></li>}
              <li className="text-lapis-secondary">Сезон {a.season}</li>
            </ul>
          </section>
          {ser && (
            <section aria-labelledby="series-title" className="rounded-[10px] border border-lapis-border bg-lapis-surface p-5">
              <h2 id="series-title" className="font-sans text-[15px] font-semibold text-ivory-light">Серія: <AppLink href={seriesPath(ser.id)} className="hover:text-gold-hover">{ser.title}</AppLink></h2>
              <ol className="mt-3 list-decimal space-y-2 pl-5 font-serif text-[14.5px] text-ivory/85">
                {parts.map((p) => <li key={p.id}>{p.id === a.id ? <span className="text-gold">{p.title}</span> : <AppLink href={articlePath(p.id)} className="hover:text-ivory-light">{p.title}</AppLink>}</li>)}
              </ol>
            </section>
          )}
        </aside>
      </Container>
      {related.length > 0 && (
        <Container className="pt-0">
          <Section id="shozhi" title="Схожі матеріали"><ArticleGrid articles={related} /></Section>
        </Container>
      )}
      <JsonLd data={newsArticleLd(a)} />
    </>
  );
}

export function newsArticleLd(a: Article) {
  const au = author(a.author);
  return {
    "@context": "https://schema.org", "@type": "NewsArticle", headline: a.title, description: stripFormatting(a.excerpt),
    datePublished: toIsoWithZone(a.date), dateModified: toIsoWithZone(a.date), inLanguage: "uk", articleSection: rubric(a.type)?.name,
    author: au ? { "@type": "Person", name: au.name, jobTitle: au.role } : undefined,
    publisher: { "@type": "NewsMediaOrganization", name: SITE.name },
    about: [...a.clubs.map((c) => ({ "@type": "SportsTeam", name: club(c)?.name })), ...a.tournaments.map((t) => ({ "@type": "SportsOrganization", name: tournament(t)?.name }))],
  };
}

export function RubricsIndexPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Рубрики" }]} title="Рубрики" intro="Матеріали за типом: анонси, звіти, аналітика, історія та офіційні рішення." />
      <Container>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {RUBRICS_DATA.map((r) => (
            <li key={r.id} className="group relative rounded-[10px] border border-lapis-border bg-lapis-surface p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
              <h2 className="font-sans text-[16px] font-semibold text-ivory-light"><AppLink href={rubricPath(r.id)} className="after:absolute after:inset-0">{r.name}</AppLink></h2>
              <p className="mt-2 font-serif text-[14.5px] text-ivory/75">{r.description}</p>
              <p className="mt-2 font-sans text-[12px] text-lapis-secondary">{articlesOfRubric(r.id).length} матеріалів</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function RubricPage({ id }: { id: string }) {
  const r = rubric(id)!;
  const list = articlesOfRubric(id);
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Рубрики", href: "/rubryka/" }, { label: r.name }]} title={`${r.name}: футбол Полтавщини`} intro={r.description} />
      <Container>{list.length ? <ArticleGrid articles={list} /> : <EmptyState text="Матеріалів у рубриці поки немає." />}</Container>
    </>
  );
}

export function SeriesIndexPage() {
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Серії" }]} title="Серії матеріалів" intro="Цикли, які варто читати по порядку." />
      <Container>
        <ul className="grid gap-3 md:grid-cols-2">
          {SERIES_DATA.map((s) => (
            <li key={s.id} className="group relative rounded-[10px] border border-lapis-border bg-lapis-surface p-5 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
              <h2 className="font-sans text-[16px] font-semibold text-ivory-light"><AppLink href={seriesPath(s.id)} className="after:absolute after:inset-0">{s.title}</AppLink></h2>
              <p className="mt-2 font-serif text-[14.5px] text-ivory/75">{s.description}</p>
              <p className="mt-2 font-sans text-[12px] text-lapis-secondary">{articlesOfSeries(s.id).length} частини</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function SeriesPage({ id }: { id: string }) {
  const s = series(id)!;
  return (
    <>
      <PageHeader crumbs={[{ label: "Головна", href: "/" }, { label: "Серії", href: "/serii/" }, { label: s.title }]} title={s.title} intro={s.description} />
      <Container><ArticleGrid articles={articlesOfSeries(id)} /></Container>
    </>
  );
}

export const tournamentIds = () => TOURNAMENTS_DATA.map((t) => t.id);
