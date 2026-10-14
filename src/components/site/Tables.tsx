import { useState } from "react";
import { ExternalLink as ExternalIcon } from "lucide-react";
import type { FormResult, StandingRow, Tournament, TableZone } from "@/types";
import { cn } from "@/lib/utils";
import { formatText } from "@/lib/format";
import { tournamentPath } from "@/lib/paths";
import { clubByName, standingsOf, tournament } from "@/lib/queries";
import { clubPath } from "@/lib/paths";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { AppLink, ExternalLink } from "./Links";
import { EmptyState } from "./Page";

const ZONE_SHADOW: Record<TableZone["tone"], string> = {
  sage: "shadow-[inset_2px_0_0_var(--color-sage)]",
  pure: "shadow-[inset_2px_0_0_var(--color-lapis-pure)]",
  muted: "shadow-[inset_2px_0_0_var(--color-lapis-muted)]",
  red: "shadow-[inset_2px_0_0_var(--color-dusty-red)]",
};
const ZONE_SWATCH: Record<TableZone["tone"], string> = { sage: "bg-sage", pure: "bg-lapis-pure", muted: "bg-lapis-muted", red: "bg-dusty-red" };
const FORM: Record<FormResult, { letter: string; label: string; cls: string }> = {
  W: { letter: "В", label: "перемога", cls: "bg-sage/20 text-sage" },
  D: { letter: "Н", label: "нічия", cls: "bg-lapis-muted/25 text-lapis-secondary" },
  L: { letter: "П", label: "поразка", cls: "bg-dusty-red/20 text-dusty-red" },
};
const signed = (n: number) => (n > 0 ? `+${n}` : n < 0 ? `−${Math.abs(n)}` : "0");

/** Full league table: sticky club column, zones, regional rows highlighted */
export function LeagueTable({ t, rows, compact = false }: { t: Tournament; rows: StandingRow[]; compact?: boolean }) {
  const showForm = !compact && rows.some((r) => r.form.length > 0);
  const zoneFor = (p: number) => t.zones.find((z) => p >= z.from && p <= z.to);
  const hasRegional = rows.some((r) => clubByName(r.club));
  const th = "px-2.5 py-2.5 text-center font-medium";
  return (
    <div>
      {t.tableCaption && !compact && <p className="mb-3 font-serif text-[14.5px] leading-[1.6] text-lapis-secondary">{formatText(t.tableCaption)}</p>}
      <div className="scrollbar-thin overflow-x-auto rounded-[10px] border border-lapis-border">
        <table className={cn("tnum w-full border-collapse font-sans text-[13px]", showForm ? "min-w-[720px]" : compact ? "min-w-[420px]" : "min-w-[600px]")}>
          <caption className="sr-only">{t.name} {t.season}{t.tableLabel ? `, ${t.tableLabel}` : ""}: турнірна таблиця</caption>
          <thead>
            <tr className="bg-lapis-deep text-[11.5px] text-lapis-secondary">
              <th scope="col" className="sticky left-0 z-10 w-11 bg-lapis-deep px-2.5 py-2.5 text-center font-medium">#</th>
              <th scope="col" className="sticky left-11 z-10 bg-lapis-deep px-2.5 py-2.5 text-left font-medium">Клуб</th>
              <th scope="col" className={th}><abbr title="Ігри" className="no-underline">І</abbr></th>
              {!compact && <th scope="col" className={th}><abbr title="Перемоги" className="no-underline">В</abbr></th>}
              {!compact && <th scope="col" className={th}><abbr title="Нічиї" className="no-underline">Н</abbr></th>}
              {!compact && <th scope="col" className={th}><abbr title="Поразки" className="no-underline">П</abbr></th>}
              <th scope="col" className={th}><abbr title="Забиті та пропущені м’ячі" className="no-underline">М</abbr></th>
              {!compact && <th scope="col" className={th}><abbr title="Різниця м’ячів" className="no-underline">РМ</abbr></th>}
              <th scope="col" className={cn(th, "text-ivory")}><abbr title="Очки" className="no-underline">О</abbr></th>
              {showForm && <th scope="col" className="px-3 py-2.5 text-left font-medium">Форма</th>}
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => {
              const c = clubByName(r.club);
              const zone = zoneFor(r.position);
              const cell = cn(
                "border-t border-lapis-border/60 transition-colors duration-150",
                c
                  ? "bg-[color-mix(in_oklab,var(--color-gold)_13%,var(--color-lapis-surface))] group-hover:bg-[color-mix(in_oklab,var(--color-gold)_17%,var(--color-lapis-elevated))]"
                  : "bg-lapis-surface group-hover:bg-lapis-elevated",
              );
              return (
                <tr key={r.club} className="group">
                  <td className={cn(cell, "sticky left-0 z-[1] w-11 px-2.5 py-2.5 text-center text-lapis-secondary", zone && ZONE_SHADOW[zone.tone])}>{r.position}</td>
                  <th scope="row" className={cn(cell, "sticky left-11 z-[1] px-2.5 py-2.5 text-left font-normal whitespace-nowrap")}>
                    <span className="inline-flex items-center gap-2">
                      {c && <span aria-hidden="true" className="size-1.5 shrink-0 rounded-full bg-gold" />}
                      {c ? (
                        <AppLink href={clubPath(c.id)} className="font-semibold text-ivory-light underline decoration-gold/40 underline-offset-4 hover:decoration-gold">{r.club}</AppLink>
                      ) : (
                        <span className="text-ivory">{r.club}</span>
                      )}
                    </span>
                    {c && <span className="sr-only"> (клуб Полтавщини)</span>}
                  </th>
                  <td className={cn(cell, "px-2.5 py-2.5 text-center text-ivory/85")}>{r.played}</td>
                  {!compact && <td className={cn(cell, "px-2.5 py-2.5 text-center text-ivory/85")}>{r.won}</td>}
                  {!compact && <td className={cn(cell, "px-2.5 py-2.5 text-center text-ivory/85")}>{r.drawn}</td>}
                  {!compact && <td className={cn(cell, "px-2.5 py-2.5 text-center text-ivory/85")}>{r.lost}</td>}
                  <td className={cn(cell, "px-2.5 py-2.5 text-center whitespace-nowrap text-ivory/85")}>{r.goalsFor}–{r.goalsAgainst}</td>
                  {!compact && <td className={cn(cell, "px-2.5 py-2.5 text-center text-lapis-secondary")}>{signed(r.goalsFor - r.goalsAgainst)}</td>}
                  <td className={cn(cell, "px-2.5 py-2.5 text-center font-semibold text-ivory-light")}>{r.points}</td>
                  {showForm && (
                    <td className={cn(cell, "px-3 py-2")}>
                      <span className="flex gap-1" aria-label={`Останні матчі: ${r.form.map((f) => FORM[f].label).join(", ")}`}>
                        {r.form.map((f, i) => (
                          <span key={i} aria-hidden="true" title={FORM[f].label} className={cn("inline-flex size-[22px] items-center justify-center rounded-[5px] text-[10.5px] font-semibold", FORM[f].cls)}>{FORM[f].letter}</span>
                        ))}
                      </span>
                    </td>
                  )}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
      {!compact && (
        <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 font-sans text-[12px] text-lapis-secondary">
          {t.zones.map((z) => (
            <span key={z.label} className="inline-flex items-center gap-2"><span aria-hidden="true" className={cn("h-3 w-0.5 rounded-full", ZONE_SWATCH[z.tone])} />{z.label}</span>
          ))}
          {hasRegional && <span className="inline-flex items-center gap-2"><span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />Клуб Полтавщини</span>}
          {showForm && <span>Форма: від давнішого матчу до останнього</span>}
          {t.sourceUrl && (
            <ExternalLink href={t.sourceUrl} className="ml-auto inline-flex items-center gap-1 text-ivory underline decoration-lapis-border underline-offset-4 hover:decoration-gold">
              Джерело: {t.sourceLabel ?? t.organizer}
              <ExternalIcon className="size-3" strokeWidth={1.5} aria-hidden="true" />
            </ExternalLink>
          )}
        </div>
      )}
    </div>
  );
}

/** Table, or the participant list with an honest note when rows have not been published */
export function TournamentTable({ t, compact }: { t: Tournament; compact?: boolean }) {
  const rows = standingsOf(t.id);
  if (rows.length) return <LeagueTable t={t} rows={rows} compact={compact} />;
  return (
    <div className="space-y-4">
      {t.participants && (
        <ul className="grid gap-2 sm:grid-cols-2">
          {t.participants.map((p) => {
            const c = clubByName(p.replace(/^ЖФК /, ""));
            return (
              <li key={p} className="rounded-lg border border-lapis-border bg-lapis-surface px-4 py-2.5 font-sans text-[14px] text-ivory">
                {c ? <AppLink href={clubPath(c.id)} className="font-semibold text-ivory-light hover:text-gold-hover">{p}</AppLink> : p}
              </li>
            );
          })}
        </ul>
      )}
      <EmptyState text="Таблиця з’явиться після публікації офіційних результатів і підключення джерела." sourceUrl={t.sourceUrl} sourceLabel={t.sourceLabel} />
    </div>
  );
}

/** Tabs with several tables (home page, «Таблиці») */
export function TablesTabs({ ids }: { ids: string[] }) {
  const items = ids.map((id) => tournament(id)).filter((t): t is Tournament => !!t);
  const [tab, setTab] = useState(items[0]?.id ?? "");
  return (
    <Tabs value={tab} onValueChange={setTab}>
      <TabsList aria-label="Оберіть турнір">
        {items.map((t) => {
          const regional = standingsOf(t.id).some((r) => clubByName(r.club));
          return (
            <TabsTrigger key={t.id} value={t.id}>
              {t.name}{t.tableLabel ? `, ${t.tableLabel.toLowerCase()}` : ""}
              {regional && <span aria-hidden="true" className="size-1.5 rounded-full bg-gold" />}
            </TabsTrigger>
          );
        })}
      </TabsList>
      {items.map((t) => (
        <TabsContent key={t.id} value={t.id} forceMount className="data-[state=inactive]:hidden">
          <TournamentTable t={t} />
          <p className="mt-4"><AppLink href={tournamentPath(t.id, "tablytsia/")} className="font-sans text-[13px] font-semibold text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">Сторінка турніру «{t.name}»</AppLink></p>
        </TabsContent>
      ))}
    </Tabs>
  );
}
