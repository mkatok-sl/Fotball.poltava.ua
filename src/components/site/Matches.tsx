import { Goal, MapPin, PlayCircle, Tv } from "lucide-react";
import type { Match, MatchEvent } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { formatDayMonth, formatTime, formatWeekdayShort, toIsoWithZone } from "@/lib/format";
import { matchPath, tournamentPath } from "@/lib/paths";
import { clubByName, isRegionalMatch, tournament } from "@/lib/queries";
import { ClubCrest, TeamMark } from "./ClubCrest";
import { AppLink, ExternalLink } from "./Links";

export function TeamBadge({ name, size = "sm" }: { name: string; size?: "sm" | "md" }) {
  const c = clubByName(name);
  return c ? <ClubCrest club={c} size={size} /> : <TeamMark name={name} className={size === "md" ? "size-10 text-[11px]" : undefined} />;
}

export function matchWhen(m: Match) {
  return `${formatWeekdayShort(m.date)}, ${formatDayMonth(m.date)}${m.timeKnown ? `, ${formatTime(m.date)}` : ""}`;
}

export function ScoreOrTime({ m, big = false }: { m: Match; big?: boolean }) {
  if (m.score) {
    return (
      <span className={cn("tnum font-semibold text-gold", big ? "text-[2.75rem] leading-none sm:text-[3.25rem]" : "text-[15px]")}>
        {m.score.home}
        <span className="mx-1 text-lapis-muted">:</span>
        {m.score.away}
      </span>
    );
  }
  if (m.status === "postponed") return <span className="font-sans text-[12px] text-dusty-red">Перенесено</span>;
  if (m.resultNote) return <span className="font-sans text-[12px] text-lapis-secondary">завершено</span>;
  return <span className={cn("tnum text-lapis-secondary", big ? "font-sans text-[1.5rem]" : "font-sans text-[13px]")}>{m.timeKnown ? formatTime(m.date) : "—"}</span>;
}

/** One row of a match list; regional matches link to their own page */
export function MatchRow({ m, showTournament = false }: { m: Match; showTournament?: boolean }) {
  const t = tournament(m.tournament);
  const linked = isRegionalMatch(m);
  const team = (name: string, align: "left" | "right") => (
    <span className={cn("flex min-w-0 items-center gap-2", align === "right" && "flex-row-reverse text-right")}>
      <TeamBadge name={name} />
      <span className={cn("font-sans text-[14px] [overflow-wrap:anywhere]", clubByName(name) ? "font-semibold text-ivory-light" : "text-ivory/90")}>{name}</span>
    </span>
  );
  const inner = (
    <>
      <span className="col-span-3 flex flex-wrap items-center gap-x-2 gap-y-0.5 font-sans text-[12px] text-lapis-secondary sm:col-span-1">
        <time dateTime={toIsoWithZone(m.date)} className="tnum">{matchWhen(m)}</time>
        {showTournament && t && <span>· {t.shortName}, {m.round}</span>}
      </span>
      <span className="col-span-3 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:col-span-1">
        {team(m.homeTeam, "left")}
        <span className="min-w-12 text-center"><ScoreOrTime m={m} /></span>
        {team(m.awayTeam, "right")}
      </span>
      <span className="col-span-3 flex flex-wrap items-center justify-end gap-1.5 sm:col-span-1">
        {m.penalties && <Badge variant="muted">пен. {m.penalties.home}:{m.penalties.away}</Badge>}
        {m.status === "postponed" && <Badge variant="paused">Перенесено</Badge>}
        {m.resultNote && <Badge variant="muted">рахунок уточнюється</Badge>}
        {m.streamUrl && m.status === "scheduled" && <Badge variant="muted"><PlayCircle strokeWidth={2} />трансляція</Badge>}
        {m.broadcaster && <Badge variant="muted"><Tv strokeWidth={2} />{m.broadcaster}</Badge>}
      </span>
    </>
  );
  const cls = "grid grid-cols-3 items-center gap-x-4 gap-y-2 px-4 py-3 sm:grid-cols-[11rem_minmax(0,1fr)_9rem]";
  return (
    <li className="border-t border-lapis-border/60 first:border-t-0">
      {linked ? (
        <AppLink href={matchPath(m)} className={cn(cls, "transition-colors hover:bg-lapis-elevated/60")}>{inner}</AppLink>
      ) : (
        <div className={cls}>{inner}</div>
      )}
    </li>
  );
}

export function MatchList({ matches, showTournament = false, label }: { matches: Match[]; showTournament?: boolean; label?: string }) {
  return (
    <ul aria-label={label} className="overflow-hidden rounded-[10px] border border-lapis-border bg-lapis-surface">
      {matches.map((m) => <MatchRow key={m.id} m={m} showTournament={showTournament} />)}
    </ul>
  );
}

/** Group matches by a key (date or round) with H3 headers */
export function GroupedMatches({ groups, showTournament }: { groups: { title: string; matches: Match[] }[]; showTournament?: boolean }) {
  return (
    <div className="space-y-7">
      {groups.map((g) => (
        <div key={g.title}>
          <h3 className="mb-3 font-sans text-[14px] font-semibold text-ivory-light">{g.title}</h3>
          <MatchList matches={g.matches} showTournament={showTournament} label={g.title} />
        </div>
      ))}
    </div>
  );
}

function EventIcon({ type }: { type: MatchEvent["type"] }) {
  if (type === "red") return <span aria-hidden="true" className="inline-block h-3 w-2 shrink-0 rounded-[2px] bg-dusty-red" />;
  return <Goal className="size-3.5 shrink-0 text-lapis-secondary" strokeWidth={1.5} aria-hidden="true" />;
}

export function Scoreboard({ m, headingLevel = 2 }: { m: Match; headingLevel?: 2 | 3 }) {
  const t = tournament(m.tournament);
  const H = headingLevel === 2 ? "h2" : "h3";
  const status = m.status === "finished" ? "Завершено" : m.status === "live" ? "Наживо" : m.status === "postponed" ? "Перенесено" : "Заплановано";
  const side = (name: string, align: "start" | "end") => {
    const c = clubByName(name);
    return (
      <div className={cn("flex min-w-0 flex-col items-center gap-2.5 text-center sm:flex-row", align === "end" && "sm:flex-row-reverse sm:text-right", align === "start" && "sm:text-left")}>
        <TeamBadge name={name} size="md" />
        <span className={cn("font-sans text-[15px] leading-tight [overflow-wrap:anywhere]", c ? "font-semibold text-ivory-light" : "text-ivory")}>{name}</span>
      </div>
    );
  };
  return (
    <div className="rounded-[10px] border border-lapis-border bg-lapis-surface p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <H className="font-sans text-[15px] font-semibold text-ivory-light">{m.status === "finished" ? "Результат" : "Матч"}</H>
        <Badge variant={m.status === "live" ? "gold" : m.status === "postponed" ? "paused" : "muted"}>{status}</Badge>
      </div>
      <p className="mt-3 font-sans text-[12.5px] text-lapis-secondary">
        {t && <AppLink href={tournamentPath(t.id)} className="underline decoration-lapis-border underline-offset-4 hover:text-ivory-light">{t.name}</AppLink>}
        , {m.round} / <time dateTime={toIsoWithZone(m.date)}>{matchWhen(m)}</time>
      </p>
      <div className="mt-5 grid grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)] items-center gap-3 sm:gap-5">
        {side(m.homeTeam, "start")}
        <p className="text-center" aria-label={m.score ? `Рахунок ${m.score.home} : ${m.score.away}` : undefined}><ScoreOrTime m={m} big /></p>
        {side(m.awayTeam, "end")}
      </div>
      {m.penalties && <p className="mt-2 text-center font-sans text-[13px] text-lapis-secondary">Серія пенальті: <span className="tnum text-ivory">{m.penalties.home}:{m.penalties.away}</span></p>}
      {m.resultNote && <p className="mt-3 text-center font-serif text-[14px] text-ivory/75">{m.resultNote}</p>}
      {m.venue && (
        <p className="mt-4 flex items-center justify-center gap-1.5 font-sans text-[12.5px] text-lapis-secondary">
          <MapPin className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
          {m.venue}
        </p>
      )}
      {m.events && m.events.length > 0 && (
        <ol aria-label="Ключові моменти" className="mt-5 space-y-1.5 border-t border-lapis-border pt-4">
          {m.events.map((e, i) => (
            <li key={i} className={cn("flex items-center gap-2 font-sans text-[13px]", e.team === "away" && "flex-row-reverse text-right")}>
              <span className="tnum w-10 shrink-0 text-lapis-secondary">{e.minute}′</span>
              <EventIcon type={e.type} />
              <span className="text-ivory/90">{e.type === "penalty" ? `${e.player} (пен.)` : e.type === "red" ? `${e.player}, вилучення` : e.player}</span>
            </li>
          ))}
        </ol>
      )}
      {m.streamUrl && (
        <ExternalLink href={m.streamUrl} className="mt-5 inline-flex items-center gap-2 font-sans text-[13px] text-ivory underline decoration-gold/60 underline-offset-4 hover:decoration-gold">
          <PlayCircle className="size-4" strokeWidth={1.5} aria-hidden="true" />
          Трансляція на YouTube-каналі ПФЛ
        </ExternalLink>
      )}
    </div>
  );
}
