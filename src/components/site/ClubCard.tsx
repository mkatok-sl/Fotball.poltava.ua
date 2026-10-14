import { ChevronRight } from "lucide-react";
import type { Club } from "@/types";
import { Badge } from "@/components/ui/badge";
import { tournament } from "@/lib/queries";
import { clubPath } from "@/lib/paths";
import { formatText } from "@/lib/format";
import { ClubCrest } from "./ClubCrest";
import { AppLink } from "./Links";

export function clubStatusText(c: Club) {
  if (c.status !== "active") return c.statusLabel ?? "Поза змаганнями";
  return c.tournaments.map((t) => tournament(t)?.name).filter(Boolean).join(" · ");
}

export function ClubCard({ club }: { club: Club }) {
  return (
    <article className="group relative flex gap-4 rounded-[10px] border border-lapis-border bg-lapis-surface p-4 transition-[transform,border-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55">
      <ClubCrest club={club} size="lg" className="transition-transform duration-200 group-hover:scale-105" />
      <div className="min-w-0 flex-1">
        <h3 className="font-sans text-[16px] font-semibold text-ivory-light [overflow-wrap:anywhere]">
          <AppLink href={clubPath(club.id)} className="after:absolute after:inset-0 after:rounded-[10px]">
            {club.name}
          </AppLink>
        </h3>
        <div className="mt-1.5 flex flex-wrap gap-1.5">
          {club.status !== "active" ? <Badge variant="paused">{club.statusLabel}</Badge> : <Badge variant="muted">{club.city}</Badge>}
          {club.badge && <Badge variant="muted">{club.badge}</Badge>}
        </div>
        <p className="mt-2 font-serif text-[14px] leading-[1.55] text-ivory/70">{club.status === "active" ? clubStatusText(club) : formatText(club.statusNote ?? "")}</p>
      </div>
      <ChevronRight className="size-4 shrink-0 self-center text-lapis-muted" strokeWidth={1.5} aria-hidden="true" />
    </article>
  );
}
