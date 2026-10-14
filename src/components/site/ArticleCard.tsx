import { Calendar, MessageCircle, Radio, Siren, Star } from "lucide-react";
import type { Article } from "@/types";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { commentsLabel, formatDateTime, formatNewsTime as newsTime, formatText, toIsoWithZone } from "@/lib/format";
import { articlePath } from "@/lib/paths";
import { ArticleImage } from "./ArticleImage";
import { AppLink } from "./Links";

export function ArticleBadges({ article, className }: { article: Article; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-1.5", className)}>
      {article.isLive && (
        <Badge variant="gold">
          <Radio strokeWidth={2} />
          Наживо
        </Badge>
      )}
      {article.isBreaking && (
        <Badge variant="gold">
          <Siren strokeWidth={2} />
          Терміново
        </Badge>
      )}
      <Badge>{article.category}</Badge>
      {article.isPremium && (
        <Badge variant="premium">
          <Star strokeWidth={2} />
          Ексклюзив
        </Badge>
      )}
    </div>
  );
}

export function ArticleMeta({ article, className }: { article: Article; className?: string }) {
  return (
    <div className={cn("flex flex-wrap items-center gap-x-4 gap-y-1.5 font-sans text-[12.5px] text-lapis-secondary", className)}>
      <span className="inline-flex items-center gap-1.5">
        <Calendar className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <time dateTime={toIsoWithZone(article.date)} className="tnum">
          {formatDateTime(article.date)}
        </time>
      </span>
      <span className="inline-flex items-center gap-1.5">
        <MessageCircle className="size-3.5 shrink-0" strokeWidth={1.5} aria-hidden="true" />
        <span className="tnum" aria-hidden="true">
          {article.commentsCount}
        </span>
        <span className="sr-only">{commentsLabel(article.commentsCount)}</span>
      </span>
    </div>
  );
}

/** Image on top, badge overlapping its top-left corner, H3 headline, excerpt, date and comments. */
export function ArticleCard({ article, variant = "standard", className }: { article: Article; variant?: "feature" | "standard"; className?: string }) {
  return (
    <article
      className={cn(
        "group relative flex min-w-0 flex-col rounded-[10px] border border-lapis-border bg-lapis-surface p-2 transition-[transform,border-color,background-color] duration-200 hover:-translate-y-0.5 hover:border-gold/55 focus-within:border-gold/55",
        className,
      )}
    >
      <div className="relative">
        <ArticleImage id={article.id} bg={article.imageBg} icon={article.imageIcon} size={variant === "feature" ? "feature" : "card"} />
        <ArticleBadges article={article} className="absolute top-2.5 right-2.5 left-2.5" />
      </div>
      <div className="flex flex-1 flex-col px-2.5 pt-4 pb-2.5">
        <h3
          className={cn(
            "font-serif font-semibold text-ivory-light [overflow-wrap:anywhere] hyphens-auto",
            variant === "feature" ? "text-[1.375rem] leading-[1.25] sm:text-[1.5rem]" : "text-[1.1875rem] leading-[1.3]",
          )}
        >
          <AppLink
            href={articlePath(article.id)}
            className="outline-none after:absolute after:inset-0 after:rounded-[10px] focus-visible:after:outline focus-visible:after:outline-1 focus-visible:after:outline-gold"
          >
            {article.title}
          </AppLink>
        </h3>
        <p className="mt-2.5 line-clamp-4 font-serif text-[15px] leading-[1.6] text-ivory/75 md:line-clamp-none">{formatText(article.excerpt)}</p>
        <ArticleMeta article={article} className="mt-auto pt-4" />
      </div>
    </article>
  );
}

const SPANS = ["md:col-span-7", "md:col-span-5", "md:col-span-5", "md:col-span-7"];

/** Asymmetric brick grid: wide/narrow, then narrow/wide */
export function ArticleGrid({ articles, mirror = false }: { articles: Article[]; mirror?: boolean }) {
  return (
    <div className="grid gap-4 md:grid-cols-12">
      {articles.map((a, i) => {
        const span = SPANS[(i + (mirror ? 1 : 0)) % 4];
        return <ArticleCard key={a.id} article={a} variant={span === "md:col-span-7" ? "feature" : "standard"} className={span} />;
      })}
    </div>
  );
}

/** Compact list item for side columns and long lists */
export function ArticleRow({ article, edition }: { article: Article; edition: string }) {
  const flag = article.isLive ? "Наживо" : article.isBreaking ? "Терміново" : null;
  return (
    <li className="py-3.5">
      <p className="flex flex-wrap items-center gap-x-2 gap-y-0.5 font-sans text-[11.5px]">
        <time dateTime={toIsoWithZone(article.date)} className="tnum text-lapis-secondary">
          {newsTime(article.date, edition)}
        </time>
        <span aria-hidden="true" className="h-3 w-px bg-lapis-border" />
        <span className={cn(flag ? "font-semibold text-gold" : "text-lapis-secondary")}>{flag ? `${flag}, ${article.category}` : article.category}</span>
      </p>
      <h3 className="mt-1 font-serif text-[15.5px] leading-[1.4] font-semibold text-ivory-light">
        <AppLink href={articlePath(article.id)} className="transition-colors duration-200 hover:text-gold-hover">
          {article.title}
        </AppLink>
      </h3>
    </li>
  );
}

