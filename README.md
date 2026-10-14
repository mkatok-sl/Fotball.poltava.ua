# Футбол Полтавщини

Багатосторінковий сайт про футбол Полтавської області за деревом сайту з таблиці навігації: клуби, турніри, тури, матчі, новини, рубрики, серії, персони, стадіони й сервісні сторінки. React 19, TypeScript, Tailwind CSS v4, shadcn/ui (Radix), wouter. Кожна сторінка пререндериться в окремий HTML для пошукових систем і працює на GitHub Pages.

## Запуск

```bash
npm ci
npm run dev        # http://localhost:5173
npm run build      # typecheck → клієнт → SSR → пререндер усіх сторінок у dist/
npm run preview
```

## Публікація на GitHub Pages

1. Завантажте вміст цієї папки в репозиторій (гілка `main`), разом із прихованою папкою `.github`.
2. **Settings → Pages → Source: GitHub Actions**.
3. Workflow `.github/workflows/deploy.yml` збере сайт і викладе його. Він сам передає шлях репозиторію та адресу сайту, тож з’являться правильні посилання, `canonical`, `sitemap.xml`, `news-sitemap.xml` і `robots.txt`.

Ручна збірка для підпапки: `PRERENDER_BASE=/repo SITE_URL=https://user.github.io/repo npm run build`.

## Що генерується

- окремий `index.html` для кожної сторінки дерева (`/klub/sk-poltava/matchi/`, `/turnir/persha-liha/tur-11/`, `/novyny/{slug}/` …) з власними title, description, canonical і розміткою schema.org;
- `404.html` — сторінка «не знайдено»;
- заглушки-редиректи зі старих адрес football.poltava.ua (`/ворскла/` → `/klub/vorskla/` тощо);
- `rss.xml`, `sitemap.xml`, `news-sitemap.xml` (останні 48 годин), `robots.txt`, `.nojekyll`.

Посилання на ресурси відносні (`./assets/…`, `../../assets/…` залежно від глибини), тому одна збірка працює в корені домену й у будь-якій підпапці. `src/lib/base-path.ts` визначає підпапку під час роботи для маршрутизації wouter. Виняток — `404.html`: GitHub Pages віддає його за будь-якою адресою, тому там шлях до ресурсів абсолютний від бази.

## Дані

Усі дані в одному файлі `src/data.ts`; масиви `ARTICLES_DATA`, `CLUBS_DATA`, `MATCHES_DATA`, `STANDINGS_DATA` — на початку файлу. Знімок станом на 13 жовтня 2026 року з видимих сторінок офіційних джерел (лист «Парсинг» у таблиці навігації):

| Дані | Джерело |
| --- | --- |
| Перша ліга: таблиця, календар, бомбардири | pfl.ua/standing/1353, pfl.ua/calendar/1353 |
| Друга ліга, група Б | pfl.ua/standing/1355 |
| ЧУ та Кубок серед аматорів | aafu.org.ua/championship/group_2, aafu.org.ua/cup |
| Обласні турніри | Асоціація футболу Полтавщини, база УАФ |
| УПЛ | upl.ua |
| Клуби | scpoltava.com, vorskla.com.ua, fckremen.com.ua |

Парсер замінює ці масиви свіжими даними; поля не змінюються. Сторінки, для яких даних ще немає (таблиця чемпіонату області, жіноча Перша ліга, Кубок України), показують чесну заглушку з посиланням на джерело.

**Захист від помилок у даних.** Збірка зупиняється, якщо назва полтавської команди трапляється в турнірі, де цей клуб не грає (так ловиться, наприклад, плутанина «Локомотив» Гребінка / «Локомотив» Київ).

**Перед запуском** перевірте `SITE` у `src/data.ts`: пошту, Facebook, Telegram (порожнє поле ховає посилання).

## Як влаштований код

```
src/data.ts                 усі дані сайту
src/router.tsx              адреса → сторінка, title/description, перелік усіх сторінок
src/pages/                  Home, Clubs, Tournaments, Matches, Content, Misc
src/components/site/        шапка з мегаменю, підвал, картки, таблиці, матчі, зміст головної
src/components/ui/          button, badge, card, tabs, sheet, dropdown-menu (shadcn/ui)
src/lib/                    formatText і дати, шляхи, вибірки, визначення base path
scripts/prerender.mjs       статична генерація, редиректи, RSS і sitemap
```

Жирний текст у будь-якому абзаці пишеться як `**так**` і перетворюється на `<strong>` функцією `formatText` (`src/lib/format.tsx`).

## Шрифти

Cinzel і Plus Jakarta Sans не мають базової кирилиці, тому для українських літер підключено Cormorant SC (заголовки) та Inter (інтерфейс); латиниця й цифри лишаються у фірмових шрифтах, Lora покриває кирилицю сама. Усі шрифти вбудовані через `@fontsource`.
