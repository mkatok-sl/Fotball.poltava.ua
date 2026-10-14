import { useEffect, useMemo, useState } from "react";
import { Mail, Search } from "lucide-react";
import { AUTHORS_DATA, CLUBS_DATA, PEOPLE_DATA, SITE, STADIUMS_DATA, TOURNAMENTS_DATA } from "@/data";
import { formatText } from "@/lib/format";
import { SERVICE_PAGES, articlePath, authorPath, clubPath, personPath, stadiumPath, tournamentPath } from "@/lib/paths";
import { articlesOfAuthor, club, person, sortedArticles, stadium, tournament } from "@/lib/queries";
import { ArticleGrid } from "@/components/site/ArticleCard";
import { ClubCard } from "@/components/site/ClubCard";
import { AppLink, ExternalLink } from "@/components/site/Links";
import { Container, EmptyState, JsonLd, MoreLink, PageHeader, Section } from "@/components/site/Page";

const home = { label: "Головна", href: "/" };

export function PeopleIndexPage() {
  return (
    <>
      <PageHeader crumbs={[home, { label: "Персони" }]} title="Гравці й тренери футболу Полтавщини" intro="Люди, про яких пишемо: статистика сезону й посилання на матеріали." />
      <Container>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {PEOPLE_DATA.map((p) => (
            <li key={p.id} className="group relative rounded-[10px] border border-lapis-border bg-lapis-surface p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
              <h2 className="font-sans text-[15px] font-semibold text-ivory-light"><AppLink href={personPath(p.id)} className="after:absolute after:inset-0">{p.name}</AppLink></h2>
              <p className="mt-1 font-sans text-[12px] text-lapis-secondary">{p.role}, {club(p.club)?.name}</p>
              <p className="mt-2 font-serif text-[14px] text-ivory/75">{p.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function PersonPage({ id }: { id: string }) {
  const p = person(id)!;
  const c = club(p.club);
  const mentions = sortedArticles().filter((a) => a.body.some((b) => b.includes(p.name.split(" ")[1] ?? p.name)) || a.excerpt.includes(p.name.split(" ")[1] ?? p.name)).slice(0, 4);
  return (
    <>
      <PageHeader crumbs={[home, { label: "Персони", href: "/persony/" }, { label: p.name }]} title={p.name} eyebrow={`${p.role}${c ? `, ${c.name}` : ""}`} intro={p.note} />
      <Container className="space-y-12">
        {p.stats && (
          <Section id="statystyka" title="Статистика сезону 2026/27">
            <ul className="grid gap-3 sm:grid-cols-2">
              {p.stats.map((s) => (
                <li key={s.tournament} className="rounded-[10px] border border-lapis-border bg-lapis-surface p-4 font-sans">
                  <AppLink href={tournamentPath(s.tournament)} className="text-[13px] text-lapis-secondary hover:text-ivory-light">{tournament(s.tournament)?.name}</AppLink>
                  <p className="tnum mt-2 text-[2rem] leading-none font-semibold text-gold">{s.goals ?? 0}<span className="ml-2 text-[13px] font-normal text-lapis-secondary">голів{s.penalties ? `, ${s.penalties} з пенальті` : ""}{s.matches ? `, ${s.matches} матчів` : ""}</span></p>
                </li>
              ))}
            </ul>
          </Section>
        )}
        {c && <Section id="klub" title="Клуб"><div className="max-w-[28rem]"><ClubCard club={c} /></div></Section>}
        {mentions.length > 0 && <Section id="materialy" title="Згадки в матеріалах"><ArticleGrid articles={mentions} /></Section>}
        {p.sourceUrl && <p className="font-sans text-[12.5px] text-lapis-secondary">Джерело даних: <ExternalLink href={p.sourceUrl} className="text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">{p.sourceUrl.replace(/^https?:\/\//, "")}</ExternalLink></p>}
      </Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "Person", name: p.name, ...(c ? { memberOf: { "@type": "SportsTeam", name: c.name } } : {}) }} />
    </>
  );
}

export function StadiumsIndexPage() {
  return (
    <>
      <PageHeader crumbs={[home, { label: "Стадіони" }]} title="Стадіони Полтавщини" intro="Арени, де грають команди області цього сезону." />
      <Container>
        <ul className="grid gap-3 md:grid-cols-2 xl:grid-cols-3">
          {STADIUMS_DATA.map((s) => (
            <li key={s.id} className="group relative rounded-[10px] border border-lapis-border bg-lapis-surface p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
              <h2 className="font-sans text-[15px] font-semibold text-ivory-light"><AppLink href={stadiumPath(s.id)} className="after:absolute after:inset-0">{s.name}</AppLink></h2>
              <p className="mt-1 font-sans text-[12px] text-lapis-secondary">{s.city}</p>
              <p className="mt-2 font-serif text-[14px] text-ivory/75">{s.note}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function StadiumPage({ id }: { id: string }) {
  const s = stadium(id)!;
  const clubs = s.clubs.map(club).filter((c): c is NonNullable<typeof c> => !!c);
  return (
    <>
      <PageHeader crumbs={[home, { label: "Стадіони", href: "/stadiony/" }, { label: s.name }]} title={s.name} eyebrow={s.city} intro={s.note} />
      <Container><Section id="kluby" title="Клуби"><div className="grid gap-3 md:grid-cols-2">{clubs.map((c) => <ClubCard key={c.id} club={c} />)}</div></Section></Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "StadiumOrArena", name: s.name, address: { "@type": "PostalAddress", addressLocality: s.city, addressCountry: "UA" } }} />
    </>
  );
}

export function EditorialPage() {
  return (
    <>
      <PageHeader crumbs={[home, { label: "Редакція" }]} title="Редакція" intro={`«${SITE.name}» — видання про футбол Полтавської області.`} />
      <Container>
        <ul className="grid gap-3 md:grid-cols-2">
          {AUTHORS_DATA.map((a) => (
            <li key={a.id} className="rounded-[10px] border border-lapis-border bg-lapis-surface p-5">
              <h2 className="font-sans text-[16px] font-semibold text-ivory-light"><AppLink href={authorPath(a.id)} className="hover:text-gold-hover">{a.name}</AppLink></h2>
              <p className="mt-1 font-sans text-[12.5px] text-lapis-secondary">{a.role}</p>
              <p className="mt-2 font-serif text-[14.5px] text-ivory/80">{a.bio}</p>
            </li>
          ))}
        </ul>
      </Container>
    </>
  );
}

export function AuthorPage({ id }: { id: string }) {
  const a = AUTHORS_DATA.find((x) => x.id === id)!;
  const list = articlesOfAuthor(id);
  return (
    <>
      <PageHeader crumbs={[home, { label: "Редакція", href: "/redaktsiia/" }, { label: a.name }]} title={a.name} eyebrow={a.role} intro={a.bio}>
        {a.email && <a href={`mailto:${a.email}`} className="mt-4 inline-flex items-center gap-2 font-sans text-[14px] text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold"><Mail className="size-4" strokeWidth={1.5} aria-hidden="true" />{a.email}</a>}
      </PageHeader>
      <Container><Section id="materialy" title={`Матеріали автора (${list.length})`}><ArticleGrid articles={list} /></Section></Container>
      <JsonLd data={{ "@context": "https://schema.org", "@type": "ProfilePage", mainEntity: { "@type": "Person", name: a.name, jobTitle: a.role, email: a.email } }} />
    </>
  );
}

const SERVICE_TEXT: Record<string, string[]> = {
  "/pro-vydannia/": [
    `«${SITE.name}» пише про футбол Полтавської області: професійні клуби, аматорів у національних змаганнях, чемпіонат і Кубок області, жіночий футбол та історію клубів.`,
    "Таблиці, календарі й результати ми беремо з **офіційних джерел** — ПФЛ, ААФУ, УАФ та офіційних сайтів клубів — і вказуємо джерело на кожній сторінці.",
  ],
  "/redaktsiina-polityka/": [
    "Факти перевіряються за офіційними джерелами. Якщо дані розходяться, перевагу має документ організатора змагань.",
    "Помилки виправляємо відкрито й оновлюємо дату матеріалу. Тексти інших медіа не копіюємо; цитати подаємо з посиланням на першоджерело.",
  ],
  "/kontakty/": [`Редакційна пошта: **${SITE.email}**. Пишіть, якщо помітили помилку, маєте новину або пропозицію співпраці.`],
  "/reklama/": [`Щодо розміщення реклами й партнерських матеріалів пишіть на **${SITE.email}**. Рекламні матеріали позначаються окремо.`],
  "/pravyla/": ["Використання матеріалів дозволено за умови активного посилання на сторінку першоджерела на сайті.", "Таблиці й результати є фактичними даними організаторів змагань і доступні для вільного використання з посиланням на них."],
  "/konfidentsiinist/": ["Сайт не вимагає реєстрації й не збирає персональних даних читачів. Технічні журнали сервера зберігаються лише для захисту від атак і не передаються третім особам."],
};

export function ServicePage({ path }: { path: string }) {
  const p = SERVICE_PAGES.find((x) => x.path === path)!;
  return (
    <>
      <PageHeader crumbs={[home, { label: p.title }]} title={p.h1} />
      <Container>
        <div className="max-w-[46rem] space-y-5 font-serif text-[17px] leading-[1.8] text-ivory/85">{SERVICE_TEXT[path].map((t, i) => <p key={i}>{formatText(t)}</p>)}</div>
        {path === "/kontakty/" && SITE.facebookUrl && <p className="mt-6"><ExternalLink href={SITE.facebookUrl} className="font-sans text-[14px] text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">Сторінка у Facebook</ExternalLink></p>}
      </Container>
    </>
  );
}

type Hit = { href: string; title: string; kind: string };
const INDEX: Hit[] = [
  ...sortedArticles().map((a) => ({ href: articlePath(a.id), title: a.title, kind: "Матеріал" })),
  ...CLUBS_DATA.map((c) => ({ href: clubPath(c.id), title: c.name, kind: "Клуб" })),
  ...TOURNAMENTS_DATA.map((t) => ({ href: tournamentPath(t.id), title: t.name, kind: "Турнір" })),
  ...PEOPLE_DATA.map((p) => ({ href: personPath(p.id), title: p.name, kind: "Персона" })),
];

export function SearchPage() {
  const [q, setQ] = useState("");
  useEffect(() => { setQ(new URLSearchParams(window.location.search).get("q") ?? ""); }, []);
  const hits = useMemo(() => {
    const s = q.trim().toLowerCase();
    return s.length < 2 ? [] : INDEX.filter((h) => h.title.toLowerCase().includes(s)).slice(0, 40);
  }, [q]);
  return (
    <>
      <PageHeader crumbs={[home, { label: "Пошук" }]} title="Пошук по сайту" />
      <Container className="space-y-6">
        <form role="search" onSubmit={(e) => e.preventDefault()} className="flex max-w-[40rem] items-center gap-2 rounded-[10px] border border-lapis-border bg-lapis-surface px-3 focus-within:border-gold/60">
          <Search className="size-5 text-lapis-secondary" strokeWidth={1.5} aria-hidden="true" />
          <label htmlFor="q" className="sr-only">Що шукаємо?</label>
          <input id="q" value={q} onChange={(e) => setQ(e.target.value)} placeholder="Клуб, турнір, гравець або тема" className="h-12 flex-1 bg-transparent font-sans text-[15px] text-ivory placeholder:text-lapis-muted focus:outline-none" />
        </form>
        {q.trim().length >= 2 && (
          hits.length ? (
            <ul className="divide-y divide-lapis-border/60 overflow-hidden rounded-[10px] border border-lapis-border bg-lapis-surface">
              {hits.map((h) => <li key={h.href}><AppLink href={h.href} className="flex flex-wrap items-center justify-between gap-3 px-4 py-3 hover:bg-lapis-elevated"><span className="font-serif text-[15.5px] text-ivory-light">{h.title}</span><span className="font-sans text-[12px] text-lapis-secondary">{h.kind}</span></AppLink></li>)}
            </ul>
          ) : <EmptyState text="Нічого не знайдено. Спробуйте назву клубу або турніру." />
        )}
      </Container>
    </>
  );
}

export function NotFoundPage() {
  return (
    <>
      <PageHeader crumbs={[home, { label: "Сторінку не знайдено" }]} title="Сторінку не знайдено" intro="Можливо, адреса змінилася. Скористайтеся пошуком або перейдіть до популярних розділів." />
      <Container className="flex flex-wrap gap-4">
        <MoreLink href="/poshuk/">Пошук</MoreLink><MoreLink href="/kluby/">Клуби</MoreLink><MoreLink href="/turniry/">Турніри</MoreLink><MoreLink href="/tablytsi/">Таблиці</MoreLink><MoreLink href="/novyny/">Новини</MoreLink>
      </Container>
    </>
  );
}
