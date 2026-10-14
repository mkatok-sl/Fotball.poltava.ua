import { ExternalLink as ExternalIcon, Mail } from "lucide-react";
import { AUTHORS_DATA, SITE } from "@/data";
import { formatText } from "@/lib/format";
import { SERVICE_PAGES, authorPath } from "@/lib/paths";
import { GoldVeins } from "./Decor";
import { AppLink, ExternalLink, RawLink } from "./Links";
import { Logo } from "./Logo";

const SECTIONS = [
  { label: "Клуби", href: "/kluby/" }, { label: "Турніри", href: "/turniry/" }, { label: "Матчі", href: "/matchi/" },
  { label: "Таблиці", href: "/tablytsi/" }, { label: "Новини", href: "/novyny/" }, { label: "Рубрики", href: "/rubryka/" },
  { label: "Трансляції", href: "/matchi/translyatsii/" }, { label: "Персони", href: "/persony/" }, { label: "Стадіони", href: "/stadiony/" },
];
const OFFICIAL = [
  { label: "Українська асоціація футболу", href: "https://uaf.ua/" },
  { label: "Українська Прем’єр-ліга", href: "https://upl.ua/ua" },
  { label: "Професіональна футбольна ліга", href: "https://pfl.ua/" },
  { label: "Асоціація аматорського футболу", href: "https://aafu.org.ua/" },
  { label: "Асоціація футболу Полтавщини", href: "https://ffp.org.ua/" },
  { label: "СК «Полтава»", href: "https://scpoltava.com/" },
  { label: "«Ворскла»", href: "http://vorskla.com.ua/" },
];

export function SiteFooter() {
  const editor = AUTHORS_DATA[0];
  const col = "font-sans text-[12px] font-semibold text-lapis-secondary";
  const link = "font-sans text-[14px] text-ivory/85 transition-colors duration-200 hover:text-ivory-light";
  return (
    <footer id="kontakty" className="lapis-texture relative overflow-hidden border-t border-lapis-border bg-lapis-deep pb-20 xl:pb-0">
      <GoldVeins variant="footer" className="h-24" />
      <div className="mx-auto grid max-w-[1440px] gap-x-10 gap-y-10 px-4 pt-14 pb-10 sm:px-6 md:grid-cols-12 lg:px-8">
        <div className="md:col-span-4">
          <Logo name={SITE.name} tagline={SITE.tagline} />
          <p className="mt-5 max-w-[24rem] font-serif text-[14.5px] leading-[1.65] text-ivory/70">{formatText(SITE.description)}</p>
        </div>
        <div className="md:col-span-3">
          <p className={col}>Редакція</p>
          <dl className="mt-4 space-y-3 font-sans text-[14px]">
            <div>
              <dt className="text-[12px] text-lapis-secondary">{editor.role}</dt>
              <dd className="mt-0.5"><AppLink href={authorPath(editor.id)} className="text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">{editor.name}</AppLink></dd>
            </div>
            <div>
              <dt className="text-[12px] text-lapis-secondary">Редакційна пошта</dt>
              <dd className="mt-0.5">
                <a href={`mailto:${SITE.email}`} className="inline-flex items-center gap-1.5 break-all text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">
                  <Mail className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />{SITE.email}
                </a>
              </dd>
            </div>
          </dl>
        </div>
        <nav aria-label="Розділи сайту" className="md:col-span-2">
          <p className={col}>Розділи</p>
          <ul className="mt-4 space-y-2.5">{SECTIONS.map((s) => <li key={s.href}><AppLink href={s.href} className={link}>{s.label}</AppLink></li>)}</ul>
        </nav>
        <div className="md:col-span-3">
          <p className={col}>Офіційні ресурси</p>
          <ul className="mt-4 space-y-2.5">
            {OFFICIAL.map((o) => (
              <li key={o.href}>
                <ExternalLink href={o.href} className={`${link} inline-flex items-center gap-1.5`}>{o.label}<ExternalIcon className="size-3 text-lapis-muted" strokeWidth={1.5} aria-hidden="true" /></ExternalLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-lapis-border/70">
        <div className="mx-auto flex max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-4 py-5 font-sans text-[12px] text-lapis-secondary sm:px-6 lg:px-8">
          <p>© {SITE.edition.slice(0, 4)} «{SITE.name}». Використання матеріалів — з активним посиланням на видання.</p>
          <ul className="flex flex-wrap gap-x-4 gap-y-1">
            {SERVICE_PAGES.map((p) => <li key={p.path}><AppLink href={p.path} className="hover:text-ivory-light">{p.title}</AppLink></li>)}
            <li><RawLink href="/rss.xml" className="hover:text-ivory-light">RSS</RawLink></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
