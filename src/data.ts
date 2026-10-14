/* =====================================================================
   ДАНІ САЙТУ «Футбол Полтавщини»
   Знімок станом на 13 жовтня 2026 року. Таблиці, результати й розклад
   узято з видимих сторінок офіційних джерел (див. лист «Парсинг»):
   ПФЛ, ААФУ, УАФ, офіційні сайти клубів. Парсер замінює ці масиви
   свіжими даними; структура полів не змінюється.
   ===================================================================== */
import {
  Award, Ban, CalendarClock, ChartColumn, CirclePause, Goal, History, Hourglass, ListOrdered, ListTree,
  MapPin, Radio, Route, ScrollText, ShieldAlert, Table2, Target, Trophy, Users, Wallet, Swords, Flag, Sprout, Building2,
} from "lucide-react";
import type {
  Article, Author, Club, FormResult, Match, Person, Rubric, Scorer, Series, SiteInfo, Stadium, StandingRow, Tournament,
} from "./types";

/* ------------------------------------------------------------------ ARTICLES_DATA */
export const ARTICLES_DATA: Article[] = [
  {
    id: "poltava-bez-kobzaria-ta-veremiienka",
    title: "«Полтава» зіграє з «Прикарпаттям-Благо» без Кобзаря та Веремієнка",
    excerpt:
      "Після прямої червоної картки в Городенці **Богдан Кобзар** потрапив до списку дискваліфікованих ПФЛ. **Олег Веремієнко** продовжує відбувати тривале відсторонення. Матч 12-го туру — у суботу, 17 жовтня, о 14:00.",
    body: [
      "Богдан Кобзар отримав пряму червону картку в компенсований час матчу 11-го туру, який «Полтава» програла «Пробою» 3:2. У списку дискваліфікованих на сайті ПФЛ навпроти його прізвища поки немає кількості матчів: остаточне рішення ухвалює контрольно-дисциплінарний комітет.",
      "**Олег Веремієнко** продовжує відбувати дискваліфікацію — за даними ліги, йому залишається пропустити сім матчів. Раніше клуб оприлюднив офіційну заяву про незгоду з рішенням КДК УАФ.",
      "Поєдинок 12-го туру проти «Прикарпаття-Благо» відбудеться в суботу, 17 жовтня, о 14:00 на стадіоні «Ворскла» імені Олексія Бутовського.",
    ],
    type: "ofitsiino", category: "СК Полтава", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-12T10:15",
    commentsCount: 0, imageBg: bg("c"), imageIcon: ShieldAlert, isBreaking: true, matchId: "persha-12-sk-poltava-prykarpattia-blaho", author: "oksana-filipova",
  },
  {
    id: "persha-liha-strichka-12-tur",
    title: "Наживо: стрічка Першої ліги перед 12-м туром",
    excerpt: "Склади, дискваліфікації та анонси в одному місці. Тур стартує **16 жовтня матчем «Агробізнес» — «Металіст»**.",
    body: [
      "Стрічка оновлюється щодня до завершення туру. Першим 16 жовтня о 13:00 зіграють «Агробізнес» і «Металіст».",
      "17 жовтня о 11:00 лідер, «Вікторія», прийме «Чернігів», а о 14:00 СК «Полтава» зустрінеться вдома з «Прикарпаттям-Благо».",
    ],
    type: "onlain", category: "Перша ліга", primary: { kind: "tournament", id: "persha-liha" },
    clubs: [], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-12T08:00",
    commentsCount: 0, imageBg: bg("a"), imageIcon: Radio, isLive: true, author: "oksana-filipova",
  },
  {
    id: "persha-liha-pislia-11-turu",
    title: "Перша ліга після 11 турів: «Полтава» п’ята, до зони підвищення два очки",
    excerpt: "Поразка в Городенці відкинула команду з третього місця. Лідирує **«Вікторія» з 21 очком**, «Куликів-Білка» та «Агробізнес» мають по 20.",
    body: [
      "Після завершального матчу туру, в якому «Куликів-Білка» обіграла «Полісся-2» 4:1, лідирує «Вікторія» — 21 очко. По 20 мають «Куликів-Білка» та «Агробізнес», 19 — «Олександрія». «Полтава» з 18 очками п’ята.",
      "Дві найкращі команди підвищаться в класі, а 3-тє та 4-те місця дають право на плей-оф із клубами УПЛ. «Інгулець» і «Чернігів» мають по матчу в запасі.",
    ],
    type: "ohliady-turu", category: "СК Полтава", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-12T18:30",
    commentsCount: 0, imageBg: bg("b"), imageIcon: ListOrdered, author: "oksana-filipova",
  },
  {
    id: "kulykiv-bilka-polissia-2",
    title: "Перша ліга: «Куликів-Білка» розгромила «Полісся-2» й піднялася на друге місце",
    excerpt: "Завершальний матч 11-го туру закінчився **перемогою гостей 4:1**. «Вікторія» після нічиєї з «Металістом» зберегла лідерство.",
    body: [
      "«Куликів-Білка» набрала 20 очок і за кращою різницею м’ячів випередила «Агробізнес». «Полісся-2» залишається останнім із 7 очками.",
      "«Вікторія» в п’ятницю зіграла внічию з «Металістом» (2:2) і зберегла одноочкову перевагу.",
    ],
    type: "zvity", category: "Перша ліга", primary: { kind: "tournament", id: "persha-liha" },
    clubs: [], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-12T16:20",
    commentsCount: 0, imageBg: bg("d"), imageIcon: ListOrdered, author: "oksana-filipova",
  },
  {
    id: "sad-naikrashchyi-bombardyr",
    title: "Валерій Сад очолює список бомбардирів Першої ліги: сім голів за 11 турів",
    excerpt: "Гравець «Полтави» реалізував пенальті в Городенці й тепер має **7 м’ячів**. Найближчі переслідувачі мають по п’ять.",
    body: [
      "За даними ПФЛ, Валерій Сад забив 7 м’ячів в 11 матчах, один із них — з пенальті.",
      "Друге місце ділять Андрій Фесенко («Пробій») і Василь Цюцюра («Прикарпаття-Благо») — по п’ять голів. Цюцюра 17 жовтня зіграє в Полтаві: його команда — найближчий суперник «Полтави».",
    ],
    type: "analityka", category: "СК Полтава", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-11T11:15",
    commentsCount: 0, imageBg: bg("d"), imageIcon: Goal, author: "oksana-filipova",
  },
  {
    id: "probii-poltava-3-2",
    title: "«Пробій» — «Полтава» — 3:2: як команда втратила перевагу в Городенці",
    excerpt: "Полтавці вели після голів **Валерія Сада з пенальті та Володимира Одарюка**, але пропустили наприкінці першого тайму й на 61-й хвилині.",
    body: [
      "«Пробій» відкрив рахунок на 7-й хвилині — відзначився Андрій Фесенко. Валерій Сад реалізував пенальті на 13-й, а на 25-й Володимир Одарюк вивів «Полтаву» вперед.",
      "До перерви Валентин Напуда зрівняв рахунок, а на 61-й хвилині Ігор Гук забив переможний м’яч. У компенсований час «Полтава» залишилася в меншості після вилучення Богдана Кобзаря.",
      "Перед туром полтавці йшли третіми, а «Пробій» — останнім. Після матчу «Полтава» опустилася на п’яте місце.",
    ],
    type: "zvity", category: "СК Полтава", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-10T17:40",
    commentsCount: 0, imageBg: bg("a"), imageIcon: Target, matchId: "persha-11-probii-sk-poltava", author: "oksana-filipova",
  },
  {
    id: "kalendar-poltavy-do-pauzy",
    title: "Календар «Полтави» до зимової паузи: сім турів, чотири з них удома",
    excerpt: "Після «Прикарпаття-Благо» команду чекають виїзд до «Полісся-2», домашній матч із **лідером, «Вікторією»**, і завершення року грою з «Фенікс-Маріуполем» 28 листопада.",
    body: [
      "17 жовтня — «Прикарпаття-Благо» (вдома), 24 жовтня — «Полісся-2» (виїзд), 31 жовтня — «Вікторія» (вдома), 7 листопада — «Олександрія» (виїзд).",
      "14 листопада — «Агробізнес» (вдома), 21 листопада — «Нива» (виїзд), 28 листопада — «Фенікс-Маріуполь» (вдома). Друге коло для «Полтави» стартує 20 березня 2027 року виїздом до ЮКСА.",
    ],
    type: "analityka", category: "СК Полтава", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-11T15:00",
    commentsCount: 0, imageBg: bg("e"), imageIcon: CalendarClock, author: "oksana-filipova",
  },
  {
    id: "poltava-2-druha-liha",
    title: "«Полтава-2» п’ята в групі Б Другої ліги",
    excerpt: "Друга команда має **11 очок після дев’яти матчів**. Наступний матч — 17 жовтня вдома з «Пенуелом».",
    body: [
      "У активі команди три перемоги, дві нічиї та чотири поразки, різниця м’ячів 5:7. Останню перемогу «Полтава-2» здобула 3 жовтня над «Олександрією-2» (1:0).",
      "10 жовтня команда поступилася запорізькому «Металургу». Попереду — домашній матч з «Пенуелом» 17 жовтня та виїзд до «Ребела» 24 жовтня.",
    ],
    type: "zvity", category: "СК Полтава-2", primary: { kind: "club", id: "sk-poltava-2" },
    clubs: ["sk-poltava-2", "sk-poltava"], tournaments: ["druha-liha"], season: "2026/27", date: "2026-10-11T19:00",
    commentsCount: 0, imageBg: bg("f"), imageIcon: Users, author: "oksana-filipova",
  },
  {
    id: "kubok-poltava-maiak",
    title: "Кубок України: «Полтава» вибула в 1/32 фіналу, поступившись «Маяку» в серії пенальті",
    excerpt: "Основний час у Сарнах завершився **0:0**, а в серії пенальті точнішими були аматори — 4:2.",
    body: [
      "Розіграш Кубка України проходить в один матч, і в разі нічиєї команди одразу б’ють пенальті — без додаткового часу.",
      "«Маяк» із Сарн виступає в чемпіонаті України серед аматорів. Для «Полтави» кубковий сезон завершився вже в серпні.",
    ],
    type: "zvity", category: "Кубок України", primary: { kind: "club", id: "sk-poltava" },
    clubs: ["sk-poltava"], tournaments: ["kubok-ukrainy"], season: "2026/27", date: "2026-08-22T16:10",
    commentsCount: 0, imageBg: bg("c"), imageIcon: Award, matchId: "kubok-1-32-maiak-sk-poltava", author: "oksana-filipova",
  },
  {
    id: "kubok-kluby-poltavshchyny",
    title: "Кубок України 2026/27: як виступили клуби Полтавщини",
    excerpt: "У розіграші взяли участь **чотири команди області**: СК «Полтава», «Решетилівка», «Рокита» та «Олімпія» із Савинців.",
    body: [
      "«Решетилівка» пройшла кваліфікаційний раунд, розгромивши Ukrainian Team 5:0, але в 1/32 фіналу поступилася «Прикарпаттю-Благо» 1:4. СК «Полтава» вибула в 1/32 у серії пенальті з «Маяком».",
      "Матчі 1/8 фіналу заплановані на 27–29 жовтня, чвертьфінали — на 2–4 березня, фінал — на 19 травня 2027 року.",
    ],
    type: "analityka", category: "Кубок України", primary: { kind: "tournament", id: "kubok-ukrainy" },
    clubs: ["sk-poltava", "reshetylivka"], tournaments: ["kubok-ukrainy"], season: "2026/27", date: "2026-09-10T12:00",
    commentsCount: 0, imageBg: bg("c"), imageIcon: Award, author: "oksana-filipova",
  },
  {
    id: "amatory-kubok-budivelnyk-olimpiia-0-3",
    title: "Кубок України серед аматорів: «Олімпія» виграла в Кременчуці 3:0 у першому чвертьфіналі",
    excerpt: "Усі три м’ячі гості забили в першому таймі: **Ковтун, Почернін і Кошман**. Матч-відповідь — 14 жовтня.",
    body: [
      "Дербі двох полтавських команд відбулося 7 жовтня на стадіоні «Шахтар Академі Арена» в Кременчуці. «Олімпія» повела вже на 8-й хвилині, а до перерви довела рахунок до 3:0.",
      "За даними ААФУ, автор другого гола Денис Почернін внесений до списку дискваліфікованих на 14 жовтня — день матчу-відповіді.",
    ],
    type: "zvity", category: "Олімпія (Савинці)", primary: { kind: "club", id: "olimpiia-savyntsi" },
    clubs: ["olimpiia-savyntsi", "budivelnyk-kremenchuk"], tournaments: ["kubok-ukrainy-amatory"], season: "2026/27", date: "2026-10-07T15:00",
    commentsCount: 0, imageBg: bg("a"), imageIcon: Trophy, matchId: "amkubok-1-4-budivelnyk-olimpiia", author: "oksana-filipova",
  },
  {
    id: "amatory-hrupa-2-rokyta-lider",
    title: "Чемпіонат України серед аматорів: «Рокита» очолює групу 2, «Будівельник» — другий",
    excerpt: "За даними ААФУ після чотирьох турів **«Рокита» має 8 очок** і не програла жодного матчу. Найкращий бомбардир групи — Андрій Дарда.",
    body: [
      "У групі 2 грають три команди Полтавщини. «Рокита» здобула дві перемоги й двічі зіграла внічию, «Будівельник» має 6 очок після трьох матчів, «Олімпія» — 4.",
      "Андрій Дарда з «Рокити» забив 5 м’ячів, два з них — з пенальті. По три голи в активі Кларо Кавана та Максима Скрипкевича з «Будівельника».",
    ],
    type: "ohliady-turu", category: "ЧУ серед аматорів", primary: { kind: "tournament", id: "chempionat-ukrainy-amatory" },
    clubs: ["rokyta", "budivelnyk-kremenchuk", "olimpiia-savyntsi"], tournaments: ["chempionat-ukrainy-amatory"], season: "2026/27", date: "2026-10-12T12:00",
    commentsCount: 0, imageBg: bg("b"), imageIcon: Table2, author: "oksana-filipova",
  },
  {
    id: "budivelnyk-ahrotekh-5-3",
    title: "«Будівельник» виграв у Тишківці 5:3: дублі Скрипкевича й Кларо",
    excerpt: "Кременчужани програвали після першого тайму **2:3**, але в другій половині забили ще двічі.",
    body: [
      "«Агротех» вів завдяки голам Сурженка та дублю Загальського. За «Будівельник» до перерви відзначилися Максим Скрипкевич і Кларо Каван.",
      "Після перерви Кларо зрівняв рахунок, Скрипкевич вивів гостей уперед, а Ногейра реалізував пенальті на 81-й хвилині.",
    ],
    type: "zvity", category: "Будівельник (Кременчук)", primary: { kind: "club", id: "budivelnyk-kremenchuk" },
    clubs: ["budivelnyk-kremenchuk"], tournaments: ["chempionat-ukrainy-amatory"], season: "2026/27", date: "2026-09-12T18:00",
    commentsCount: 0, imageBg: bg("d"), imageIcon: Swords, matchId: "amchu-4-ahrotekh-budivelnyk", author: "oksana-filipova",
  },
  {
    id: "budivelnyk-debiut-chu",
    title: "Кременчуцький «Будівельник» дебютує в чемпіонаті України серед аматорів",
    excerpt: "Новачок національної аматорської першості грає домашні матчі на **«Шахтар Академі Арені»** в Кременчуці.",
    body: [
      "Перша гра «Будівельника» проти охтирського «Нафтовика» мала стати історичною, але «Нафтовик» знявся зі змагань, і результат матчу анулювали.",
      "Окрім чемпіонату, кременчужани грають у Кубку України серед аматорів і Кубку Полтавської області.",
    ],
    type: "istoriia", category: "Будівельник (Кременчук)", primary: { kind: "club", id: "budivelnyk-kremenchuk" },
    clubs: ["budivelnyk-kremenchuk"], tournaments: ["chempionat-ukrainy-amatory"], season: "2026/27", date: "2026-08-13T14:10",
    commentsCount: 0, imageBg: bg("e"), imageIcon: Sprout, author: "oksana-filipova",
  },
  {
    id: "chempionat-oblasti-format-2026-27",
    title: "Чемпіонат області 2026/27: 10 команд, два етапи й перехід на систему «осінь — весна»",
    excerpt: "Уперше обласна першість синхронізована з національними змаганнями. Після першого кола **команди з 1–5 місць утворять Вищу лігу**, з 6–10 — Першу.",
    body: [
      "Регламент затвердила Асоціація футболу Полтавщини. На першому етапі всі десять команд зіграють одна з одною по одному разу — по дев’ять матчів.",
      "Переможець Вищої ліги стане чемпіоном області сезону 2026/2027. Серед учасників — дві юнацькі команди з Полтави: «Молодь» U-19 і «Колос Академія» U-19.",
    ],
    type: "anonsy", category: "Чемпіонат області", primary: { kind: "tournament", id: "chempionat-oblasti" },
    clubs: [], tournaments: ["chempionat-oblasti"], season: "2026/27", date: "2026-08-14T10:00",
    commentsCount: 0, imageBg: bg("b"), imageIcon: ListTree, author: "oksana-filipova",
  },
  {
    id: "kubok-oblasti-1-4-finalu",
    title: "Кубок Полтавської області: пари 1/4 фіналу та дати матчів",
    excerpt: "Перші матчі пройшли 12–13 вересня, **матчі-відповіді — 17–18 жовтня**. Півфінали й фінал перенесено на 2027 рік.",
    body: [
      "Пари чвертьфіналу: «Олімпія» — «Лубни», «Перемога» — «Аврора», «Молодь» U-19 — «Будівельник», «Рокита» — «Решетилівка».",
      "Оскільки аматорський сезон тепер проходить за системою «осінь — весна», вирішальні стадії Кубка відбудуться навесні.",
    ],
    type: "anonsy", category: "Кубок області", primary: { kind: "tournament", id: "kubok-oblasti" },
    clubs: ["olimpiia-savyntsi", "rokyta", "budivelnyk-kremenchuk"], tournaments: ["kubok-oblasti"], season: "2026/27", date: "2026-09-08T10:00",
    commentsCount: 0, imageBg: bg("c"), imageIcon: Trophy, author: "oksana-filipova",
  },
  {
    id: "lider-atex-nichyia",
    title: "Жіноча Перша ліга: «Лідер» на виїзді зіграв унічию з «Атексом»",
    excerpt: "Кобеляцька команда продовжує сезон у **Першій лізі жіночого чемпіонату України**.",
    body: [
      "«Лідер» із Кобеляк виступає в жіночому футболі й футзалі. Повні результати й таблицю Першої ліги публікує Українська асоціація футболу.",
    ],
    type: "zvity", category: "ЖФК «Лідер»", primary: { kind: "club", id: "lider-kobeliaky" },
    clubs: ["lider-kobeliaky"], tournaments: ["persha-liha-zhinky"], season: "2026/27", date: "2026-10-10T18:00",
    commentsCount: 0, imageBg: bg("f"), imageIcon: Flag, author: "oksana-filipova",
  },
  {
    id: "vorskla-plan-povernennia",
    title: "Сезон без «Ворскли»: що відомо про план повернення клубу в професійний футбол",
    excerpt: "«Ворскла» не отримала атестат на 2026/27 через **борги, що накопичувалися з 2021 року**. Мета клубу — атестація на сезон 2027/28.",
    body: [
      "Відмову в атестаті клуб пояснив фінансовими критеріями: борги, що накопичувалися з 2021 року, не вдалося закрити до завершення процедури.",
      "У заяві «Ворскли» названо можливі кроки: реструктуризацію, оптимізацію процесів і пошук інвесторів та спонсорів. Це має дати шанс отримати атестат ПФЛ на сезон 2027/28.",
    ],
    type: "analityka", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla"], tournaments: [], season: "2026/27", date: "2026-10-09T11:00",
    commentsCount: 0, imageBg: bg("a"), imageIcon: Hourglass, series: "vorskla-bez-profi", author: "oksana-filipova",
  },
  {
    id: "vorskla-holovni-storinky-istorii",
    title: "Кубок-2009, дві бронзи та Ліга Європи: головні сторінки історії «Ворскли»",
    excerpt: "Від дебютної бронзи 1997 року до **перемоги над «Шахтарем» у фіналі Кубка України 2009-го** і групових етапів Ліги Європи.",
    body: [
      "У першому ж сезоні у вищій лізі, 1996/97, «Ворскла» стала бронзовою призеркою чемпіонату.",
      "Головний трофей клубу — Кубок України 2009 року: у фіналі полтавці обіграли «Шахтар». Ще одну бронзу команда здобула в сезоні 2017/18, а двічі грала в груповому етапі Ліги Європи.",
    ],
    type: "istoriia", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla"], tournaments: [], season: "2026/27", date: "2026-10-11T09:30",
    commentsCount: 0, imageBg: bg("c"), imageIcon: Trophy, isPremium: true, series: "istoriia-futbolu-poltavshchyny", author: "oksana-filipova",
  },
  {
    id: "stadion-vorskla-pryimaie-poltavu",
    title: "Стадіон «Ворскла» імені Олексія Бутовського цієї осені приймає СК «Полтава»",
    excerpt: "Після повернення до рідного міста «Полтава» грає вдома на центральній арені області й поки **не програла на ній жодного разу**.",
    body: [
      "У п’яти домашніх матчах сезону «Полтава» здобула дві перемоги та тричі зіграла внічию: 1:1 з «Нивою», 0:0 з ЮКСА та «Інгульцем», 3:0 з «Металістом» і 3:2 з «Черніговом».",
      "Наступні матчі на «Ворсклі» — 17 жовтня з «Прикарпаттям-Благо» та 31 жовтня з лідером, «Вікторією».",
    ],
    type: "analityka", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla", "sk-poltava"], tournaments: ["persha-liha"], season: "2026/27", date: "2026-10-07T14:20",
    commentsCount: 0, imageBg: bg("e"), imageIcon: MapPin, author: "oksana-filipova",
  },
  {
    id: "vorskla-dva-sezony-v-tsyfrakh",
    title: "Перший виліт в історії та 14-те місце в Першій лізі: два останні сезони «Ворскли» в цифрах",
    excerpt: "Сезон 2024/25 завершився першим вильотом з еліти, а в Першій лізі 2025/26 команда набрала **30 очок у 30 матчах**.",
    body: [
      "У 2024/25 «Ворскла» посіла 13-те місце в УПЛ і в перехідних матчах поступилася «Кудрівці» в серії пенальті — це був перший виліт клубу з вищого дивізіону.",
      "У Першій лізі 2025/26 полтавці фінішували 14-ми з 30 очками, після чого клуб не пройшов атестацію на новий сезон.",
    ],
    type: "istoriia", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla"], tournaments: [], season: "2026/27", date: "2026-10-05T10:00",
    commentsCount: 0, imageBg: bg("b"), imageIcon: ChartColumn, series: "vorskla-bez-profi", author: "oksana-filipova",
  },
  {
    id: "vid-kolhospnyka-do-vorskly",
    title: "Від «Колгоспника» до «Ворскли»: звідки походить головний клуб Полтави",
    excerpt: "Клуб веде історію з **1955 року**, а прямим попередником «Ворскли» був «Колгоспник».",
    body: [
      "Під нинішньою назвою клуб виступає з 1984 року: тоді на базі другої команди та футбольної школи полтавського «Колоса» була створена «Ворскла».",
      "Попри паузу в професійному футболі, історія клубу залишається однією з головних тем для вболівальників Полтави.",
    ],
    type: "istoriia", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla"], tournaments: [], season: "2026/27", date: "2026-10-02T16:00",
    commentsCount: 0, imageBg: bg("f"), imageIcon: History, series: "istoriia-futbolu-poltavshchyny", author: "oksana-filipova",
  },
  {
    id: "vorskla-khronolohiia-atestatu",
    title: "Хронологія: як «Ворскла» залишилася без атестату на сезон 2026/27",
    excerpt: "1 червня 2026 року стало відомо, що **ПФЛ не допустила «Ворсклу» до змагань** нового сезону.",
    body: [
      "Під час атестації клуб отримав відмову в допуску до змагань ПФЛ за фінансовими критеріями регламенту УАФ. Згідно з регламентом «Ворскла» мала грати перехідні матчі за місце в Першій лізі, але без атестату цей шлях закрився.",
      "Пізніше з’ясувалося, що сезон пропустить і жіноча команда клубу.",
    ],
    type: "ofitsiino", category: "Ворскла", primary: { kind: "club", id: "vorskla" },
    clubs: ["vorskla"], tournaments: [], season: "2026/27", date: "2026-09-29T12:30",
    commentsCount: 0, imageBg: bg("d"), imageIcon: ScrollText, series: "vorskla-bez-profi", author: "oksana-filipova",
  },
  {
    id: "vorskla-zhinky-propuskaie-sezon",
    title: "Жіноча «Ворскла» пропускає сезон 2026/27 і не зіграє в єврокубках",
    excerpt: "Шестиразова чемпіонка України не пройшла атестацію через **заборгованість перед колишніми футболістками**.",
    body: [
      "За підсумками сезону 2025/26 команда виборола бронзу Вищої ліги та путівку до кваліфікації Кубка Європи, але виступити в новому сезоні не зможе.",
      "«Ворскла» (раніше — «Житлобуд-2») шість разів вигравала чемпіонат — третій показник в історії Вищої ліги.",
    ],
    type: "ofitsiino", category: "Ворскла (жінки)", primary: { kind: "club", id: "vorskla-zhinky" },
    clubs: ["vorskla-zhinky", "vorskla"], tournaments: [], season: "2026/27", date: "2026-06-09T12:00",
    commentsCount: 0, imageBg: bg("a"), imageIcon: Ban, series: "vorskla-bez-profi", author: "oksana-filipova",
  },
  {
    id: "hirnyk-sport-propuskaie-sezon",
    title: "«Гірник-Спорт» пропускає сезон 2026/27: клуб розраховує повернутися до Другої ліги",
    excerpt: "У клубі пояснили рішення **відсутністю коштів у головного спонсора**. Команду й тренерський штаб розпустили.",
    body: [
      "Про рішення повідомив спортивний директор клубу Олексій Шалаєв. Причина — відсутність фінансування від головного спонсора, групи Ferrexpo.",
      "Заборгованість перед гравцями й тренерами, за словами клубу, незначна. У «Гірнику-Спорт» сподіваються заявитися до Другої ліги наступного сезону.",
    ],
    type: "ofitsiino", category: "Гірник-Спорт", primary: { kind: "club", id: "hirnyk-sport" },
    clubs: ["hirnyk-sport"], tournaments: [], season: "2026/27", date: "2026-07-03T11:40",
    commentsCount: 0, imageBg: bg("b"), imageIcon: CirclePause, author: "oksana-filipova",
  },
  {
    id: "druha-liha-bez-hirnyka",
    title: "Друга ліга без «Гірника-Спорт»: хто представляє Полтавщину в турнірі",
    excerpt: "Цього сезону Друга ліга — це **дві групи по дев’ять команд**. Єдиною командою області залишилася «Полтава-2» з групи Б.",
    body: [
      "У групі Б разом із «Полтавою-2» грають «Карбон», «Атлет», «Авангард», «Ребел», «Олександрія-2», «Тростянець», «Металург» і «Пенуел».",
      "Через непарну кількість команд у кожному турі одна відпочиває, тому кількість зіграних матчів у таблиці різниться.",
    ],
    type: "analityka", category: "Друга ліга", primary: { kind: "tournament", id: "druha-liha" },
    clubs: ["sk-poltava-2", "hirnyk-sport"], tournaments: ["druha-liha"], season: "2026/27", date: "2026-10-11T13:40",
    commentsCount: 0, imageBg: bg("a"), imageIcon: ListTree, author: "oksana-filipova",
  },
  {
    id: "hirnyk-sezon-2025-26",
    title: "Сезон 2025/26 у цифрах: «Гірник-Спорт» фінішував 11-м у групі В з 14 очками",
    excerpt: "Останнє місце в групі стало підсумком **непростого року для команди з Горішніх Плавнів**.",
    body: ["Після сезону клуб ухвалив рішення про паузу: фінансування від головного спонсора припинилося."],
    type: "istoriia", category: "Гірник-Спорт", primary: { kind: "club", id: "hirnyk-sport" },
    clubs: ["hirnyk-sport"], tournaments: ["druha-liha"], season: "2025/26", date: "2026-10-03T10:30",
    commentsCount: 0, imageBg: bg("f"), imageIcon: ChartColumn, author: "oksana-filipova",
  },
  {
    id: "shliakh-hirnyka-sport",
    title: "Шлях «Гірника-Спорт»: від перемоги в Другій лізі до вимушеної паузи",
    excerpt: "Клуб з Горішніх Плавнів виграв Другу лігу 2014/15, а **в сезоні 2015/16 став бронзовим призером Першої ліги**.",
    body: [
      "Кілька сезонів «Гірник-Спорт» провів у Першій лізі, а головним партнером команди залишалася група Ferrexpo.",
      "Повернення до професійного футболу залежатиме від фінансування: саме його відсутність стала причиною паузи.",
    ],
    type: "istoriia", category: "Гірник-Спорт", primary: { kind: "club", id: "hirnyk-sport" },
    clubs: ["hirnyk-sport"], tournaments: [], season: "2026/27", date: "2026-09-26T09:00",
    commentsCount: 0, imageBg: bg("d"), imageIcon: Route, isPremium: true, series: "istoriia-futbolu-poltavshchyny", author: "oksana-filipova",
  },
  {
    id: "hirnyk-borhy-pered-hravtsiamy",
    title: "Борги перед гравцями «Гірника-Спорт» обіцяли закрити до кінця липня",
    excerpt: "За словами спортивного директора клубу, заборгованість перед футболістами й тренерами **була незначною**.",
    body: ["Клуб також повідомив, що офіційно поінформує ПФЛ про зняття з розіграшу Другої ліги."],
    type: "ofitsiino", category: "Гірник-Спорт", primary: { kind: "club", id: "hirnyk-sport" },
    clubs: ["hirnyk-sport"], tournaments: [], season: "2026/27", date: "2026-07-03T12:10",
    commentsCount: 0, imageBg: bg("e"), imageIcon: Wallet, author: "oksana-filipova",
  },
  {
    id: "kremin-ne-vystupaie",
    title: "«Кремінь» не виступає в професійних змаганнях із сезону 2025/26",
    excerpt: "Кременчуцький клуб офіційно відмовився від участі в **Другій лізі 2025/26**.",
    body: [
      "Тепер Кременчук представляє в національних аматорських змаганнях «Будівельник», який дебютував у чемпіонаті України серед аматорів 2026/27.",
    ],
    type: "ofitsiino", category: "Кремінь", primary: { kind: "club", id: "kremin" },
    clubs: ["kremin", "budivelnyk-kremenchuk"], tournaments: [], season: "2026/27", date: "2026-09-15T10:00",
    commentsCount: 0, imageBg: bg("c"), imageIcon: Building2, author: "oksana-filipova",
  },
  {
    id: "upl-pislia-8-turu",
    title: "УПЛ після 8-го туру: «Шахтар» лідирує, «Полісся» втратило очки в Чернівцях",
    excerpt: "Донеччани мають **21 очко**, житомиряни після нічиєї з «Буковиною» (2:2) — 19, «Динамо» з 16 очками третє.",
    body: [
      "Полтавських клубів в УПЛ цього сезону немає: СК «Полтава» вилетіла за підсумками 2025/26.",
      "Матчі УПЛ транслює телеканал UPL.TV.",
    ],
    type: "ohliady-turu", category: "Прем’єр-ліга", primary: { kind: "tournament", id: "upl" },
    clubs: [], tournaments: ["upl"], season: "2026/27", date: "2026-10-11T22:00",
    commentsCount: 0, imageBg: bg("d"), imageIcon: Table2, author: "oksana-filipova",
  },
];

/* ------------------------------------------------------------------ CLUBS_DATA */
export const CLUBS_DATA: Club[] = [
  {
    id: "sk-poltava", name: "СК Полтава", city: "Полтава", group: "profesiini", status: "active",
    tournaments: ["persha-liha", "kubok-ukrainy"], crestBg: "linear-gradient(160deg, #8a5262 0%, #5a2f3d 55%, #3b1f2a 100%)",
    crestText: "П", crestShape: "round", founded: 2011, stadium: "vorskla-butovskoho", officialUrl: "https://scpoltava.com/",
    socialUrl: "https://www.facebook.com/SCPoltava/", tableNames: ["Полтава", "СК Полтава"], matchName: "СК Полтава", related: ["sk-poltava-2"],
    summary: "Після вильоту з УПЛ «Полтава» грає в Першій лізі: **п’яте місце після 11 турів** і найкращий бомбардир ліги у складі.",
    history: [
      { season: "2025/26", tournament: "Прем’єр-ліга", place: "16-те", note: "виліт до Першої ліги" },
      { season: "2024/25", tournament: "Перша ліга", place: "2-ге", note: "підвищення до УПЛ" },
    ],
    sources: [{ label: "ПФЛ: таблиця Першої ліги", url: "https://pfl.ua/standing/1353" }, { label: "ПФЛ: команда", url: "https://pfl.ua/team/view/1499" }, { label: "Офіційний сайт клубу", url: "https://scpoltava.com/" }],
  },
  {
    id: "sk-poltava-2", name: "СК Полтава-2", city: "Полтава", group: "profesiini", status: "active", badge: "Друга команда",
    tournaments: ["druha-liha"], crestBg: "linear-gradient(160deg, #7a4a58 0%, #4f2a37 55%, #341c26 100%)", crestText: "П2", crestShape: "round",
    officialUrl: "https://scpoltava.com/seasons/202627/", tableNames: ["Полтава-2", "СК Полтава-2"], matchName: "СК Полтава-2", related: ["sk-poltava"],
    summary: "Друга команда СК «Полтава» виступає в **групі Б Другої ліги**.",
    sources: [{ label: "ПФЛ: таблиця Другої ліги, група Б", url: "https://pfl.ua/standing/1355" }, { label: "Календар на сайті клубу", url: "https://scpoltava.com/seasons/202627/" }],
  },
  {
    id: "olimpiia-savyntsi", name: "Олімпія (Савинці)", city: "Савинці", group: "amatory", status: "active",
    tournaments: ["chempionat-ukrainy-amatory", "kubok-ukrainy-amatory", "chempionat-oblasti", "kubok-oblasti"],
    crestBg: "linear-gradient(160deg, #4f6b8f 0%, #2d3f5a 55%, #1f2b40 100%)", crestText: "О", crestShape: "heater", stadium: "start-myrhorod",
    tableNames: ["Олімпія", "Олімпія (Савинці)"], matchName: "Олімпія",
    summary: "Чемпіон області 2023 року грає водночас у **чемпіонаті України серед аматорів**, Кубку аматорів і обласних турнірах.",
    history: [{ season: "2023", tournament: "Чемпіонат області", place: "1-ше", note: "чемпіон" }],
    sources: [{ label: "ААФУ: група 2", url: "https://aafu.org.ua/championship/group_2" }, { label: "ААФУ: Кубок", url: "https://aafu.org.ua/cup" }],
  },
  {
    id: "rokyta", name: "ФК «Рокита»", city: "Рокита", group: "amatory", status: "active",
    tournaments: ["chempionat-ukrainy-amatory", "kubok-oblasti"], crestBg: "linear-gradient(160deg, #5c7a4f 0%, #34492d 55%, #24331f 100%)",
    crestText: "Р", crestShape: "angular", stadium: "arena-rokyta", tableNames: ["ФК Рокита", "Рокита"], matchName: "Рокита",
    summary: "Лідер групи 2 **чемпіонату України серед аматорів** після чотирьох турів.",
    sources: [{ label: "ААФУ: група 2", url: "https://aafu.org.ua/championship/group_2" }],
  },
  {
    id: "budivelnyk-kremenchuk", name: "Будівельник (Кременчук)", city: "Кременчук", group: "amatory", status: "active",
    tournaments: ["chempionat-ukrainy-amatory", "kubok-ukrainy-amatory", "kubok-oblasti"], crestBg: "linear-gradient(160deg, #8a6a3e 0%, #5a4427 55%, #3b2d1b 100%)",
    crestText: "Б", crestShape: "heater", stadium: "shakhtar-akademi-arena", tableNames: ["Будівельник", "Будівельник (Кременчук)"], matchName: "Будівельник",
    summary: "Дебютант **чемпіонату України серед аматорів** представляє Кременчук у національних змаганнях.",
    sources: [{ label: "ААФУ: група 2", url: "https://aafu.org.ua/championship/group_2" }, { label: "ААФУ: Кубок, 1/4 фіналу", url: "https://aafu.org.ua/cup/round_1-4" }],
  },
  ...oblastClubs(),
  {
    id: "lider-kobeliaky", name: "ЖФК «Лідер» (Кобеляки)", city: "Кобеляки", group: "zhinochi", status: "active", badge: "Жінки",
    tournaments: ["persha-liha-zhinky"], crestBg: "linear-gradient(160deg, #7d5f8a 0%, #4b3856 55%, #33263b 100%)", crestText: "Л", crestShape: "round",
    tableNames: ["Лідер"], matchName: "Лідер", summary: "Кобеляцька команда грає в **Першій лізі жіночого чемпіонату України** та у футзалі.",
    sources: [{ label: "УАФ: жіночі турніри", url: "https://uaf.ua/" }],
  },
  {
    id: "vorskla", name: "Ворскла", city: "Полтава", group: "poza-zmahanniamy", status: "paused", statusLabel: "Пропускає сезон 2026/27",
    statusNote: "Клуб не отримав атестат ПФЛ через борги, що накопичувалися з 2021 року, і **готується до атестації на сезон 2027/28**.",
    tournaments: [], crestBg: "linear-gradient(160deg, #557f74 0%, #2c4a44 55%, #1d3330 100%)", crestText: "В", crestShape: "heater",
    founded: 1955, stadium: "vorskla-butovskoho", officialUrl: "http://vorskla.com.ua/", tableNames: ["Ворскла"], matchName: "Ворскла", related: ["vorskla-zhinky"],
    summary: "Найтитулованіший клуб області пропускає сезон 2026/27: **ПФЛ не допустила «Ворсклу» до змагань** через борги.",
    history: [
      { season: "2025/26", tournament: "Перша ліга", place: "14-те", note: "відмова в атестаті на 2026/27" },
      { season: "2024/25", tournament: "Прем’єр-ліга", place: "13-те", note: "виліт після перехідних матчів" },
      { season: "2017/18", tournament: "Прем’єр-ліга", place: "3-тє", note: "бронза" },
      { season: "2008/09", tournament: "Кубок України", place: "Володар" },
      { season: "1996/97", tournament: "Вища ліга", place: "3-тє", note: "бронза в дебютному сезоні" },
    ],
    sources: [{ label: "Офіційний сайт клубу", url: "http://vorskla.com.ua/" }, { label: "Новини ПФЛ", url: "https://pfl.ua/news" }],
  },
  {
    id: "vorskla-zhinky", name: "Ворскла (жінки)", city: "Полтава", group: "poza-zmahanniamy", status: "paused", badge: "Жінки",
    statusLabel: "Пропускає сезон 2026/27", statusNote: "Команда не пройшла атестацію через **заборгованість перед колишніми футболістками**.",
    tournaments: [], crestBg: "linear-gradient(160deg, #4f7a70 0%, #2a4741 55%, #1c312d 100%)", crestText: "В", crestShape: "heater",
    officialUrl: "http://vorskla.com.ua/", tableNames: [], matchName: "Ворскла (жінки)", related: ["vorskla"],
    summary: "Шестиразова чемпіонка України серед жінок пропускає сезон 2026/27 і єврокубки.",
    history: [{ season: "2025/26", tournament: "Вища ліга (жінки)", place: "3-тє", note: "бронза" }],
    sources: [{ label: "Офіційний сайт клубу", url: "http://vorskla.com.ua/" }],
  },
  {
    id: "hirnyk-sport", name: "Гірник-Спорт", city: "Горішні Плавні", group: "poza-zmahanniamy", status: "withdrawn", statusLabel: "Знявся з Другої ліги 2026/27",
    statusNote: "Клуб відмовився від участі в сезоні 2026/27 через брак фінансування й **розраховує заявитися наступного року**.",
    tournaments: [], crestBg: "linear-gradient(160deg, #62677d 0%, #3a3e51 55%, #262938 100%)", crestText: "ГС", crestShape: "angular",
    tableNames: ["Гірник-Спорт"], matchName: "Гірник-Спорт",
    summary: "Команда з Горішніх Плавнів **відмовилася від участі в Другій лізі 2026/27** через брак фінансування.",
    history: [
      { season: "2025/26", tournament: "Друга ліга, група В", place: "11-те", note: "14 очок" },
      { season: "2015/16", tournament: "Перша ліга", place: "3-тє", note: "бронза" },
      { season: "2014/15", tournament: "Друга ліга", place: "1-ше", note: "переможець" },
    ],
    sources: [{ label: "Новини ПФЛ", url: "https://pfl.ua/news" }],
  },
  {
    id: "kremin", name: "Кремінь (Кременчук)", city: "Кременчук", group: "poza-zmahanniamy", status: "inactive", statusLabel: "Не виступає з сезону 2025/26",
    statusNote: "Клуб офіційно відмовився від участі в Другій лізі 2025/26.",
    tournaments: [], crestBg: "linear-gradient(160deg, #6e5a4f 0%, #43362f 55%, #2d2420 100%)", crestText: "К", crestShape: "angular",
    officialUrl: "https://www.fckremen.com.ua/", tableNames: ["Кремінь"], matchName: "Кремінь",
    summary: "Кременчуцький клуб **не виступає в професійних змаганнях** із сезону 2025/26.",
    sources: [{ label: "Офіційний сайт клубу", url: "https://www.fckremen.com.ua/" }],
  },
];

/* ------------------------------------------------------------------ MATCHES_DATA */
export const MATCHES_DATA: Match[] = [
  ...pershaMatches(),
  ...druhaMatches(),
  ...uplMatches(),
  ...cupMatches(),
  ...amateurMatches(),
  ...oblastCupMatches(),
];

/* ------------------------------------------------------------------ STANDINGS_DATA */
export const STANDINGS_DATA: StandingRow[] = [
  /* Перша ліга після 11-го туру — pfl.ua/standing/1353; форма — з календаря ПФЛ */
  r("persha-liha", 1, "Вікторія", 6, 3, 2, 14, 8, "LLDWD"),
  r("persha-liha", 2, "Куликів-Білка", 6, 2, 3, 24, 12, "WLWLW"),
  r("persha-liha", 3, "Агробізнес", 6, 2, 3, 18, 14, "LWDWW"),
  r("persha-liha", 4, "Олександрія", 5, 4, 2, 16, 10, "WLDWL"),
  r("persha-liha", 5, "Полтава", 5, 3, 3, 18, 10, "LWLWL"),
  r("persha-liha", 6, "Фенікс-Маріуполь", 5, 3, 3, 14, 12, "WWDDW"),
  r("persha-liha", 7, "Локомотив", 4, 4, 3, 15, 13, "WWWDW"),
  r("persha-liha", 8, "Прикарпаття-Благо", 4, 3, 4, 12, 10, "WWLDL"),
  r("persha-liha", 9, "Металіст", 4, 3, 4, 13, 13, "LLWDD"),
  r("persha-liha", 10, "Нива", 3, 5, 3, 12, 10, "LWDDW"),
  r("persha-liha", 11, "Інгулець", 4, 2, 4, 10, 12, "DWWLL"),
  r("persha-liha", 12, "Колос-2", 4, 0, 7, 12, 20, "LWWLL"),
  r("persha-liha", 13, "ЮКСА", 2, 4, 5, 15, 19, "WLDLL"),
  r("persha-liha", 14, "Чернігів", 2, 4, 4, 11, 14, "WLLLW"),
  r("persha-liha", 15, "Пробій", 2, 2, 7, 11, 29, "LLLWW"),
  r("persha-liha", 16, "Полісся-2", 1, 4, 6, 15, 24, "WLLDL"),
  /* Друга ліга, група Б — pfl.ua/standing/1355 */
  r("druha-liha", 1, "Карбон", 5, 3, 1, 17, 9),
  r("druha-liha", 2, "Атлет", 3, 4, 2, 16, 12),
  r("druha-liha", 3, "Авангард", 4, 1, 3, 9, 9),
  r("druha-liha", 4, "Ребел", 3, 3, 3, 15, 15),
  r("druha-liha", 5, "Полтава-2", 3, 2, 4, 5, 7),
  r("druha-liha", 6, "Олександрія-2", 2, 4, 2, 8, 7),
  r("druha-liha", 7, "Тростянець", 2, 4, 1, 8, 5),
  r("druha-liha", 8, "Металург", 2, 3, 3, 9, 10),
  r("druha-liha", 9, "Пенуел", 1, 2, 6, 6, 19),
  /* ЧУ серед аматорів, група 2 — aafu.org.ua/championship/group_2 (опубліковано 1–4 тури) */
  r("chempionat-ukrainy-amatory", 1, "ФК Рокита", 2, 2, 0, 10, 6),
  r("chempionat-ukrainy-amatory", 2, "Будівельник", 2, 0, 1, 8, 6),
  r("chempionat-ukrainy-amatory", 3, "Агротех", 2, 0, 2, 9, 9),
  r("chempionat-ukrainy-amatory", 4, "IRON", 1, 1, 0, 6, 3),
  r("chempionat-ukrainy-amatory", 5, "Олімпія", 1, 1, 1, 2, 3),
  r("chempionat-ukrainy-amatory", 6, "Пальміра", 0, 0, 0, 0, 0),
  r("chempionat-ukrainy-amatory", 7, "Реал Фарма", 0, 0, 4, 4, 12),
  /* Прем’єр-ліга після 8-го туру (без «Лівий Берег» — «Зоря» та перерваного «Оболонь» — «Кривбас») */
  r("upl", 1, "Шахтар", 7, 0, 1, 18, 4),
  r("upl", 2, "Полісся", 6, 1, 1, 17, 7),
  r("upl", 3, "Динамо Київ", 5, 1, 1, 10, 5),
  r("upl", 4, "Харків", 5, 0, 2, 14, 5),
  r("upl", 5, "Карпати", 4, 2, 2, 15, 6),
  r("upl", 6, "ЛНЗ", 3, 2, 3, 7, 9),
  r("upl", 7, "Верес", 2, 3, 3, 6, 9),
  r("upl", 8, "Зоря", 2, 2, 3, 7, 11),
  r("upl", 9, "Колос", 2, 2, 3, 9, 11),
  r("upl", 10, "Буковина", 1, 5, 2, 6, 8),
  r("upl", 11, "Епіцентр", 2, 2, 4, 7, 10),
  r("upl", 12, "Лівий Берег", 1, 4, 1, 4, 3),
  r("upl", 13, "Чорноморець", 1, 2, 4, 4, 9),
  r("upl", 14, "Кривбас", 1, 2, 3, 7, 10),
  r("upl", 15, "Оболонь", 0, 4, 3, 2, 12),
  r("upl", 16, "Кудрівка", 0, 2, 6, 6, 20),
];

/* ------------------------------------------------------------------ TOURNAMENTS_DATA */
export const TOURNAMENTS_DATA: Tournament[] = [
  {
    id: "persha-liha", name: "Перша ліга", shortName: "1Л", group: "Національні", format: "league", organizer: "ПФЛ", organizerUrl: "https://pfl.ua/",
    sourceUrl: "https://pfl.ua/standing/1353", sourceLabel: "ПФЛ: турнірна таблиця", season: "2026/27",
    about: "Другий за силою дивізіон чемпіонату України. **Дві найкращі команди підвищуються в класі**, 3-тє та 4-те місця грають плей-оф із клубами УПЛ.",
    tableCaption: "Після 11-го туру. «Інгулець» і «Чернігів» мають матч у запасі.",
    zones: [{ from: 1, to: 2, tone: "sage", label: "Підвищення в класі" }, { from: 3, to: 4, tone: "pure", label: "Плей-оф з клубами УПЛ" }],
    hasScorers: true, scorersSourceUrl: "https://pfl.ua/standing/1353",
    reglament: ["Чемпіонат проходить у два кола: команди грають одна з одною вдома й на виїзді.", "Дві найкращі команди напряму виходять до УПЛ, команди з 3-го та 4-го місць грають перехідні матчі з клубами УПЛ."],
    archives: [{ slug: "2025-26", label: "Сезон 2025/26", summary: "«Ворскла» фінішувала 14-ю з 30 очками, після чого не отримала атестат на 2026/27.", sourceUrl: "https://pfl.ua/standing/1353" }],
  },
  {
    id: "druha-liha", name: "Друга ліга", shortName: "2Л", group: "Національні", format: "groups", organizer: "ПФЛ", organizerUrl: "https://pfl.ua/",
    sourceUrl: "https://pfl.ua/standing/1355", sourceLabel: "ПФЛ: група Б", season: "2026/27",
    about: "Третій дивізіон: **дві групи по дев’ять команд**. Полтавщину представляє «Полтава-2» у групі Б.",
    tableLabel: "Група Б", tableCaption: "У групі дев’ять команд, тому щотуру одна відпочиває й кількість матчів різниться.",
    zones: [], hasScorers: true, scorersSourceUrl: "https://pfl.ua/standing/1355",
    reglament: ["Команди розділено на групи А та Б за територіальним принципом.", "Через непарну кількість учасників у кожному турі одна команда групи відпочиває."],
    archives: [{ slug: "2025-26", label: "Сезон 2025/26", summary: "«Гірник-Спорт» посів 11-те місце в групі В із 14 очками й знявся з турніру на 2026/27.", sourceUrl: "https://pfl.ua/standing/1355" }],
  },
  {
    id: "kubok-ukrainy", name: "Кубок України", shortName: "КУ", group: "Національні", format: "cup", organizer: "УАФ", organizerUrl: "https://uaf.ua/",
    sourceUrl: "https://uaf.ua/", sourceLabel: "УАФ: Кубок України", season: "2026/27",
    about: "Кожна стадія — **один матч**; у разі нічиєї одразу б’ють пенальті. 1/8 фіналу — 27–29 жовтня, фінал — 19 травня 2027 року.",
    zones: [], hasScorers: false,
    reglament: ["Розклад і час матчів затверджує Дирекція з проведення Кубка України.", "Базові дати: 1/8 фіналу — 27–29 жовтня, 1/4 — 2–4 березня, 1/2 — 20–22 квітня, фінал — 19 травня 2027 року."],
    archives: [],
  },
  {
    id: "chempionat-ukrainy-amatory", name: "Чемпіонат України серед аматорів", shortName: "ЧУА", group: "Аматорські", format: "groups",
    organizer: "ААФУ", organizerUrl: "https://aafu.org.ua/", sourceUrl: "https://aafu.org.ua/championship/group_2", sourceLabel: "ААФУ: група 2", season: "2026/27",
    about: "Національна аматорська першість. У **групі 2** грають три команди Полтавщини: «Рокита», «Будівельник» і «Олімпія».",
    tableLabel: "Група 2", tableCaption: "За даними ААФУ; на офіційній сторінці опубліковано результати 1–4 турів.",
    zones: [], hasScorers: true, scorersSourceUrl: "https://aafu.org.ua/championship/group_2",
    reglament: ["Перший етап — у групах за територіальним принципом, у кілька кіл.", "Фінальна частина — плей-оф: чвертьфінали й півфінали з двох матчів, фінал — один матч."],
    archives: [],
  },
  {
    id: "kubok-ukrainy-amatory", name: "Кубок України серед аматорів", shortName: "КУА", group: "Аматорські", format: "cup", organizer: "ААФУ",
    organizerUrl: "https://aafu.org.ua/", sourceUrl: "https://aafu.org.ua/cup", sourceLabel: "ААФУ: Кубок", season: "2026/27",
    about: "У чвертьфіналі зустрілися дві полтавські команди: **«Будівельник» і «Олімпія»**. Півфінали й фінал — у 2027 році.",
    zones: [], hasScorers: false,
    reglament: ["Базові ігрові дні 1/4 фіналу — 7 та 14 жовтня 2026 року.", "Матчі 1/2 фіналу та фінал пройдуть у 2027 році."],
    archives: [],
  },
  {
    id: "chempionat-oblasti", name: "Чемпіонат Полтавської області", shortName: "ЧО", group: "Обласні", format: "stages", organizer: "Асоціація футболу Полтавщини",
    organizerUrl: "https://ffp.org.ua/", sourceUrl: "https://ffp.org.ua/", sourceLabel: "Асоціація футболу Полтавщини", season: "2026/27",
    about: "Уперше за системою «осінь — весна». Після першого кола **команди з 1–5 місць утворять Вищу лігу**, з 6–10 — Першу.",
    tableLabel: "Етап 1", zones: [{ from: 1, to: 5, tone: "sage", label: "Вища ліга (2-й етап)" }, { from: 6, to: 10, tone: "muted", label: "Перша ліга (2-й етап)" }],
    hasScorers: false,
    reglament: ["I етап: усі 10 команд грають в одне коло — по дев’ять матчів.", "Команди з 1–5 місць формують Вищу лігу, з 6–10 — Першу. Переможець Вищої ліги стає чемпіоном області сезону 2026/2027."],
    archives: [{ slug: "2026", label: "Перехідний сезон 2026", summary: "Весняний чемпіонат за календарним роком: 10 команд в одне коло перед переходом на систему «осінь — весна».", sourceUrl: "https://uaf.ua/tournaments/details/30005509" }],
    participants: ["Аврора (Полтава)", "Колос Академія U-19 (Полтава)", "Локомотив (Гребінка)", "ФК «Лубни»", "Молодь U-19 (Полтава)", "Олімпія (Савинці)", "ФК «Опішня»", "Перемога (Клепачі)", "ФК «Пирятин»", "ФК «Решетилівка»"],
  },
  {
    id: "kubok-oblasti", name: "Кубок Полтавської області", shortName: "КО", group: "Обласні", format: "cup", organizer: "Асоціація футболу Полтавщини",
    organizerUrl: "https://ffp.org.ua/", sourceUrl: "https://ffp.org.ua/", sourceLabel: "Асоціація футболу Полтавщини", season: "2026/27",
    about: "Чвертьфінали з двох матчів: перші пройшли 12–13 вересня, **матчі-відповіді — 17–18 жовтня**. Півфінали й фінал — у 2027 році.",
    zones: [], hasScorers: false, reglament: ["Чвертьфінал і подальші стадії проходять у два матчі.", "Півфінальні матчі та фінал відбудуться у 2027 році."], archives: [],
  },
  {
    id: "superkubok-oblasti", name: "Суперкубок Полтавської області", shortName: "СКО", group: "Обласні", format: "single", organizer: "Асоціація футболу Полтавщини",
    organizerUrl: "https://ffp.org.ua/", sourceUrl: "https://ffp.org.ua/", sourceLabel: "Асоціація футболу Полтавщини", season: "2026/27",
    about: "Один матч між чемпіоном області та володарем Кубка області.", zones: [], hasScorers: false,
    reglament: ["Матч грають переможці чемпіонату та Кубка області попереднього сезону."], archives: [],
  },
  {
    id: "chempionat-poltavy", name: "Чемпіонат Полтави", shortName: "ЧП", group: "Обласні", format: "league", organizer: "Міська федерація футболу",
    season: "2026/27", about: "Міська першість. Результати вносить редакція за протоколами організатора — **офіційного онлайн-джерела немає**.",
    zones: [], hasScorers: false, reglament: ["Регламент публікується за даними організатора."], archives: [],
  },
  {
    id: "persha-liha-zhinky", name: "Перша ліга серед жінок", shortName: "1ЛЖ", group: "Жіночі", format: "league", organizer: "УАФ", organizerUrl: "https://uaf.ua/",
    sourceUrl: "https://uaf.ua/", sourceLabel: "УАФ: жіночі турніри", season: "2026/27",
    about: "Другий дивізіон жіночого чемпіонату України. Полтавщину представляє **ЖФК «Лідер» із Кобеляк**.", zones: [], hasScorers: false,
    reglament: ["Змагання проводить Українська асоціація футболу."], archives: [], participants: ["ЖФК «Лідер» (Кобеляки)"],
  },
  {
    id: "upl", name: "Прем’єр-ліга", shortName: "УПЛ", group: "Огляд", format: "league", organizer: "УПЛ", organizerUrl: "https://upl.ua/ua",
    sourceUrl: "https://upl.ua/ua", sourceLabel: "УПЛ", season: "2026/27",
    about: "Елітний дивізіон. **Полтавських клубів у сезоні 2026/27 немає**: СК «Полтава» вилетіла за підсумками 2025/26. Матчі транслює UPL.TV.",
    tableCaption: "Після 8-го туру. Без урахування матчу «Лівий Берег» — «Зоря» та перерваного поєдинку «Оболонь» — «Кривбас».",
    zones: [{ from: 1, to: 1, tone: "sage", label: "Ліга чемпіонів, кваліфікація" }, { from: 13, to: 14, tone: "muted", label: "Перехідні матчі" }, { from: 15, to: 16, tone: "red", label: "Виліт" }],
    hasScorers: false, reglament: ["16 клубів грають у два кола. Дві останні команди вилітають, 13-та й 14-та грають перехідні матчі."],
    archives: [{ slug: "2025-26", label: "Сезон 2025/26", summary: "СК «Полтава» посіла 16-те місце й вилетіла до Першої ліги.", sourceUrl: "https://upl.ua/ua" }],
  },
];

/* ------------------------------------------------------------------ PEOPLE_DATA */
export const PEOPLE_DATA: Person[] = [
  { id: "pavlo-matviichenko", name: "Павло Матвійченко", role: "Тренер", club: "sk-poltava", note: "Головний тренер СК «Полтава» у сезоні 2026/27.", sourceUrl: "https://scpoltava.com/" },
  { id: "valerii-sad", name: "Валерій Сад", role: "Гравець", club: "sk-poltava", note: "Найкращий бомбардир Першої ліги після 11 турів.", stats: [{ tournament: "persha-liha", goals: 7, penalties: 1, matches: 11 }], sourceUrl: "https://pfl.ua/standing/1353" },
  { id: "volodymyr-odariuk", name: "Володимир Одарюк", role: "Гравець", club: "sk-poltava", note: "Забив у матчі 11-го туру з «Пробоєм».", sourceUrl: "https://pfl.ua/calendar/1353" },
  { id: "bohdan-kobzar", name: "Богдан Кобзар", role: "Гравець", club: "sk-poltava", note: "Вилучений у матчі з «Пробоєм»; у списку дискваліфікованих ПФЛ.", sourceUrl: "https://pfl.ua/standing/1353" },
  { id: "oleh-veremiienko", name: "Олег Веремієнко", role: "Гравець", club: "sk-poltava", note: "Відбуває дискваліфікацію: за даними ПФЛ, залишилося сім матчів.", sourceUrl: "https://pfl.ua/standing/1353" },
  { id: "dmytro-kasimov", name: "Дмитро Касімов", role: "Гравець", club: "sk-poltava", note: "Забив у матчі з «Черніговом» (3:2).", sourceUrl: "https://pfl.ua/calendar/1353" },
  { id: "suleiman-seitkhalilov", name: "Сулейман Сейтхалілов", role: "Гравець", club: "sk-poltava", note: "Автор переможного гола в матчі з «Черніговом».", sourceUrl: "https://pfl.ua/calendar/1353" },
  { id: "mykyta-kononov", name: "Микита Кононов", role: "Гравець", club: "sk-poltava", note: "Забив у матчі з «Черніговом».", sourceUrl: "https://pfl.ua/calendar/1353" },
  { id: "hlib-ziniar", name: "Гліб Зіняр", role: "Гравець", club: "sk-poltava-2", note: "Найкращий бомбардир «Полтави-2».", stats: [{ tournament: "druha-liha", goals: 3 }], sourceUrl: "https://pfl.ua/standing/1355" },
  { id: "andrii-darda", name: "Андрій Дарда", role: "Гравець", club: "rokyta", note: "Найкращий бомбардир групи 2 чемпіонату України серед аматорів.", stats: [{ tournament: "chempionat-ukrainy-amatory", goals: 5, penalties: 2, matches: 3 }], sourceUrl: "https://aafu.org.ua/championship/group_2" },
  { id: "klaro-kavan", name: "Кларо Каван", role: "Гравець", club: "budivelnyk-kremenchuk", note: "Дубль у матчі з «Агротехом» (5:3).", stats: [{ tournament: "chempionat-ukrainy-amatory", goals: 3, matches: 3 }], sourceUrl: "https://aafu.org.ua/championship/group_2" },
  { id: "maksym-skrypkevych", name: "Максим Скрипкевич", role: "Гравець", club: "budivelnyk-kremenchuk", note: "Дубль у матчі з «Агротехом» (5:3).", stats: [{ tournament: "chempionat-ukrainy-amatory", goals: 3, penalties: 1, matches: 3 }], sourceUrl: "https://aafu.org.ua/championship/group_2" },
  { id: "denys-pochernin", name: "Денис Почернін", role: "Гравець", club: "olimpiia-savyntsi", note: "Забив у чвертьфіналі Кубка аматорів; за даними ААФУ, дискваліфікований на 14 жовтня.", sourceUrl: "https://aafu.org.ua/cup" },
];

/* ------------------------------------------------------------------ SCORERS_DATA */
/* Перша ліга — pfl.ua/standing/1353; ЧУ серед аматорів, група 2 — aafu.org.ua/championship/group_2 */
export const SCORERS_DATA: Scorer[] = [
  { tournament: "persha-liha", player: "Валерій Сад", team: "Полтава", goals: 7, penalties: 1, matches: 11, personId: "valerii-sad" },
  { tournament: "persha-liha", player: "Андрій Фесенко", team: "Пробій", goals: 5, penalties: 0, matches: 11 },
  { tournament: "persha-liha", player: "Василь Цюцюра", team: "Прикарпаття-Благо", goals: 5, penalties: 1, matches: 11 },
  { tournament: "persha-liha", player: "Богдан Мордас", team: "Локомотив", goals: 4, penalties: 0, matches: 9 },
  { tournament: "persha-liha", player: "Даніїл Приходько", team: "Металіст", goals: 4, penalties: 2, matches: 10 },
  { tournament: "persha-liha", player: "Пабло Рамон Кастро Гонсалез", team: "ЮКСА", goals: 4, penalties: 2, matches: 10 },
  { tournament: "persha-liha", player: "Андрій Борячук", team: "Нива", goals: 4, penalties: 0, matches: 11 },
  { tournament: "persha-liha", player: "Ростислав Тарануха", team: "Колос-2", goals: 4, penalties: 0, matches: 11 },
  { tournament: "persha-liha", player: "Даніель Вернаттус", team: "Металіст", goals: 4, penalties: 0, matches: 11 },
  { tournament: "persha-liha", player: "Олександр Дихтярук", team: "Олександрія", goals: 4, penalties: 0, matches: 11 },
  { tournament: "chempionat-ukrainy-amatory", player: "Андрій Дарда", team: "ФК Рокита", goals: 5, penalties: 2, matches: 3, personId: "andrii-darda" },
  { tournament: "chempionat-ukrainy-amatory", player: "Андрій Вареник", team: "Реал Фарма", goals: 3, matches: 4 },
  { tournament: "chempionat-ukrainy-amatory", player: "Кларо Каван", team: "Будівельник", goals: 3, matches: 3, personId: "klaro-kavan" },
  { tournament: "chempionat-ukrainy-amatory", player: "Максим Скрипкевич", team: "Будівельник", goals: 3, penalties: 1, matches: 3, personId: "maksym-skrypkevych" },
  { tournament: "chempionat-ukrainy-amatory", player: "Ігор Загальський", team: "Агротех", goals: 3, penalties: 1, matches: 4 },
];

/* ------------------------------------------------------------------ STADIUMS_DATA */
export const STADIUMS_DATA: Stadium[] = [
  { id: "vorskla-butovskoho", name: "Стадіон «Ворскла» імені Олексія Бутовського", city: "Полтава", note: "Центральна арена області. У сезоні 2026/27 тут грає домашні матчі СК «Полтава».", clubs: ["sk-poltava", "vorskla"] },
  { id: "start-myrhorod", name: "Стадіон «Старт»", city: "Миргород", note: "Тут «Олімпія» проводить домашні матчі чемпіонату України серед аматорів.", clubs: ["olimpiia-savyntsi"] },
  { id: "arena-rokyta", name: "«Арена Рокита»", city: "Рокита", note: "Домашня арена ФК «Рокита».", clubs: ["rokyta"] },
  { id: "shakhtar-akademi-arena", name: "«Шахтар Академі Арена»", city: "Кременчук", note: "Домашній стадіон «Будівельника» (вул. Флотська, 5).", clubs: ["budivelnyk-kremenchuk"] },
  { id: "lokomotyv-poltava", name: "Стадіон «Локомотив»", city: "Полтава", note: "Приймає матчі чемпіонату області.", clubs: ["avrora-poltava"] },
  { id: "dynamo-poltava", name: "Стадіон «Динамо»", city: "Полтава", note: "Приймає матчі чемпіонату області.", clubs: ["kolos-akademiia-u19"] },
];

/* ------------------------------------------------------------------ довідники */
export const RUBRICS_DATA: Rubric[] = [
  { id: "anonsy", name: "Анонси", description: "Що чекає на команди Полтавщини в найближчих турах.", inMenu: true },
  { id: "zvity", name: "Звіти", description: "Розбори зіграних матчів.", inMenu: true },
  { id: "onlain", name: "Онлайн", description: "Текстові трансляції та стрічки турів.", inMenu: false },
  { id: "intervyu", name: "Інтерв’ю", description: "Розмови з гравцями, тренерами та керівниками клубів.", inMenu: true },
  { id: "analityka", name: "Аналітика", description: "Цифри, календарі та тенденції.", inMenu: true },
  { id: "istoriia", name: "Історія", description: "Сторінки історії футболу Полтавщини.", inMenu: true },
  { id: "transfery", name: "Трансфери", description: "Переходи, оренди та зміни в складах.", inMenu: true },
  { id: "ofitsiino", name: "Офіційно", description: "Рішення ліг, федерацій і клубів.", inMenu: true },
  { id: "ohliady-turu", name: "Огляди туру", description: "Результати й таблиці після кожного туру.", inMenu: false },
  { id: "video", name: "Відео", description: "Огляди матчів і голи.", inMenu: true },
];

export const SERIES_DATA: Series[] = [
  { id: "vorskla-bez-profi", title: "«Ворскла»: сезон без професійного футболу", description: "Що сталося з клубом, хронологія рішень і план повернення." },
  { id: "istoriia-futbolu-poltavshchyny", title: "Історія футболу Полтавщини", description: "Головні сторінки історії клубів області." },
];

export const AUTHORS_DATA: Author[] = [
  { id: "oksana-filipova", name: "Оксана Філіпова", role: "Головний редактор", bio: "Відповідає за редакційну політику, перевірку фактів і випуск матеріалів видання.", email: "editor@football.poltava.ua" },
];

export const SITE: SiteInfo = {
  name: "Футбол Полтавщини",
  tagline: "новини, матчі, таблиці",
  edition: "2026-10-13T10:00",
  season: "2026/27",
  intro: "Щоденна хроніка футболу області: **СК «Полтава» в Першій лізі**, аматори в національних змаганнях, чемпіонат і Кубок області, а також клуби, що пропускають сезон.",
  description: "Видання про футбол Полтавщини: професійні клуби, аматори, обласні турніри та історія. Дані таблиць і календарів — з **офіційних джерел** ПФЛ, ААФУ та УАФ.",
  socialText: "Анонси матчів, результати й обговорення. **Головне публікуємо одразу після фінального свистка.**",
  email: "editor@football.poltava.ua",
  facebookUrl: "https://www.facebook.com/pages/footballpoltavaua/1427629314207086",
  telegramUrl: "",
};

/* =====================================================================
   ДОПОМІЖНІ ФУНКЦІЇ (оголошені як function, тому доступні вище)
   ===================================================================== */
function bg(k: "a" | "b" | "c" | "d" | "e" | "f"): string {
  return {
    a: "radial-gradient(120% 90% at 18% 12%, var(--color-lapis-pure) 0%, var(--color-lapis-surface) 46%, var(--color-lapis-deep) 100%)",
    b: "linear-gradient(140deg, var(--color-lapis-elevated) 0%, var(--color-lapis-bg) 55%, var(--color-lapis-deep) 100%)",
    c: "radial-gradient(90% 80% at 85% 18%, color-mix(in oklab, var(--color-gold) 16%, transparent) 0%, transparent 55%), linear-gradient(160deg, var(--color-lapis-surface) 0%, var(--color-lapis-deep) 100%)",
    d: "linear-gradient(200deg, var(--color-lapis-pure) 0%, var(--color-lapis-bg) 62%, var(--color-lapis-deep) 100%)",
    e: "radial-gradient(100% 100% at 50% 115%, var(--color-lapis-pure) 0%, var(--color-lapis-bg) 58%, var(--color-lapis-deep) 100%)",
    f: "linear-gradient(115deg, var(--color-lapis-deep) 0%, var(--color-lapis-elevated) 52%, var(--color-lapis-bg) 100%)",
  }[k];
}

function r(tournament: string, position: number, club: string, won: number, drawn: number, lost: number, goalsFor: number, goalsAgainst: number, form = ""): StandingRow {
  return {
    tournament, position, club, played: won + drawn + lost, won, drawn, lost, goalsFor, goalsAgainst,
    points: won * 3 + drawn, form: form.split("").filter(Boolean) as FormResult[],
  };
}

function oblastClubs(): Club[] {
  const base = (id: string, name: string, city: string, crest: string, text: string, inCup: boolean, badge?: "U-19"): Club => ({
    id, name, city, group: "oblast", status: "active", badge,
    tournaments: [...(inCup ? ["chempionat-oblasti", "kubok-oblasti"] : ["chempionat-oblasti"]), ...(id === "reshetylivka" ? ["kubok-ukrainy"] : [])],
    crestBg: crest, crestText: text, crestShape: "angular", tableNames: [name],
    /* Short match name, except where it would clash with a club from another league («Локомотив» Київ) */
    matchName: id === "lokomotyv-hrebinka" ? name : name.replace(/ \(.*\)$/, "").replace(/^ФК «(.+)»$/, "$1"),
    summary: inCup ? "Учасник **чемпіонату та Кубка Полтавської області** сезону 2026/27." : "Учасник **чемпіонату Полтавської області** сезону 2026/27.",
    sources: [{ label: "Асоціація футболу Полтавщини", url: "https://ffp.org.ua/" }, { label: "УАФ: архів чемпіонату області 2026", url: "https://uaf.ua/tournaments/details/30005509" }],
  });
  const g = (a: string, b: string) => `linear-gradient(160deg, ${a} 0%, ${b} 100%)`;
  return [
    base("avrora-poltava", "Аврора (Полтава)", "Полтава", g("#5a6f8f", "#2a3550"), "А", true),
    base("kolos-akademiia-u19", "Колос Академія U-19 (Полтава)", "Полтава", g("#6f7f4f", "#36402a"), "К", false, "U-19"),
    base("lokomotyv-hrebinka", "Локомотив (Гребінка)", "Гребінка", g("#7f5f4f", "#40302a"), "Л", false),
    base("lubny", "ФК «Лубни»", "Лубни", g("#4f7f7a", "#2a403d"), "Л", true),
    base("molod-u19-poltava", "Молодь U-19 (Полтава)", "Полтава", g("#6a5f8a", "#352f45"), "М", true, "U-19"),
    base("opishnia", "ФК «Опішня»", "Опішня", g("#8a704f", "#45382a"), "О", false),
    base("peremoha-klepachi", "Перемога (Клепачі)", "Клепачі", g("#4f6a8a", "#2a3545"), "П", true),
    base("pyriatyn", "ФК «Пирятин»", "Пирятин", g("#7a4f6a", "#3d2a35"), "П", false),
    base("reshetylivka", "ФК «Решетилівка»", "Решетилівка", g("#5f8a5f", "#2f452f"), "Р", true),
  ];
}

const POLTAVA_HOME = "Полтава, стадіон «Ворскла» ім. О. Бутовського";

function slugTeam(s: string) { return translit(s); }

function mk(t: string, prefix: string, roundNo: number | undefined, round: string, date: string, time: string | null,
  home: string, away: string, score: string | null, extra: Partial<Match> = {}): Match {
  const sc = score && /^\d+:\d+$/.test(score) ? { home: +score.split(":")[0], away: +score.split(":")[1] } : null;
  return {
    id: `${prefix}-${slugTeam(home)}-${slugTeam(away)}`, tournament: t, round, roundNo,
    date: `${date}T${time ?? "00:00"}`, timeKnown: !!time, homeTeam: home, awayTeam: away, score: sc,
    status: sc ? "finished" : "scheduled", ...extra,
  };
}

function pershaMatches(): Match[] {
  const raw = `1|24.07 14:00|Фенікс-Маріуполь|0:1|Вікторія
1|24.07 16:00|Олександрія|1:1|Нива
1|25.07 12:00|Агробізнес|0:3|Полтава
1|25.07 14:00|Локомотив|1:1|Чернігів
1|25.07 16:00|Полісся-2|2:2|ЮКСА
1|26.07 12:00|Колос-2|1:0|Прикарпаття-Благо
1|26.07 14:00|Пробій|2:2|Інгулець
1|26.07 16:00|Куликів-Білка|2:1|Металіст
2|31.07 13:00|ЮКСА|4:4|Олександрія
2|31.07 16:00|Агробізнес|2:0|Фенікс-Маріуполь
2|01.08 11:00|Чернігів|1:1|Куликів-Білка
2|01.08 13:00|Металіст|3:1|Пробій
2|01.08 15:30|Полтава|1:1|Нива
2|02.08 11:00|Вікторія|2:0|Колос-2
2|02.08 14:00|Прикарпаття-Благо|2:2|Локомотив
2|03.08 13:00|Інгулець|2:1|Полісся-2
3|07.08 13:00|ЮКСА|1:0|Нива
3|08.08 12:00|Локомотив|0:1|Вікторія
3|08.08 13:30|Олександрія|3:0|Інгулець
3|08.08 15:00|Колос-2|1:2|Агробізнес
3|08.08 16:30|Куликів-Білка|2:1|Прикарпаття-Благо
3|09.08 12:00|Полісся-2|0:1|Металіст
3|09.08 14:00|Пробій|1:1|Чернігів
3|09.08 16:00|Фенікс-Маріуполь|0:3|Полтава
4|14.08 13:00|Агробізнес|0:0|Локомотив
4|14.08 16:00|Прикарпаття-Благо|3:0|Пробій
4|15.08 11:00|Вікторія|2:1|Куликів-Білка
4|15.08 12:00|Чернігів|2:2|Полісся-2
4|15.08 13:00|Металіст|0:2|Олександрія
4|15.08 15:00|Полтава|0:0|ЮКСА
4|16.08 12:00|Фенікс-Маріуполь|3:1|Колос-2
4|16.08 14:00|Інгулець|1:2|Нива
5|28.08 12:00|Локомотив|1:3|Фенікс-Маріуполь
5|28.08 14:00|Колос-2|0:1|Полтава
5|29.08 12:00|ЮКСА|1:2|Інгулець
5|29.08 13:45|Полісся-2|1:2|Прикарпаття-Благо
5|29.08 15:30|Олександрія|1:0|Чернігів
5|30.08 13:00|Пробій|0:3|Вікторія
5|30.08 14:45|Металіст|1:1|Нива
5|30.08 16:30|Куликів-Білка|5:1|Агробізнес
6|04.09 13:00|Колос-2|1:0|Локомотив
6|04.09 15:00|Полтава|0:0|Інгулець
6|05.09 11:00|Чернігів|1:0|Нива
6|05.09 12:00|Вікторія|1:1|Полісся-2
6|05.09 12:30|Фенікс-Маріуполь|1:1|Куликів-Білка
6|05.09 13:00|Металіст|3:1|ЮКСА
6|05.09 14:00|Агробізнес|6:0|Пробій
6|05.09 15:00|Прикарпаття-Благо|0:0|Олександрія
7|11.09 12:30|ЮКСА|3:2|Чернігів
7|12.09 12:00|Інгулець|1:0|Металіст
7|12.09 13:30|Локомотив|2:1|Полтава
7|12.09 15:00|Куликів-Білка|5:0|Колос-2
7|13.09 13:00|Пробій|0:2|Фенікс-Маріуполь
7|13.09 15:00|Нива|1:2|Прикарпаття-Благо
7|14.09 13:00|Полісся-2|3:2|Агробізнес
7|14.09 15:00|Олександрія|1:0|Вікторія
8|19.09 12:00|Колос-2|4:2|Пробій
8|20.09 11:00|Полтава|3:0|Металіст
8|20.09 12:30|Локомотив|1:0|Куликів-Білка
8|20.09 13:30|Прикарпаття-Благо|1:0|ЮКСА
8|20.09 14:30|Агробізнес|1:0|Олександрія
8|20.09 15:30|Фенікс-Маріуполь|2:1|Полісся-2
8|21.09 11:00|Вікторія|1:3|Нива
9|26.09 12:00|Інгулець|2:1|Прикарпаття-Благо
9|26.09 13:00|ЮКСА|0:0|Вікторія
9|26.09 14:00|Пробій|0:2|Локомотив
9|26.09 15:30|Куликів-Білка|2:1|Полтава
9|27.09 12:00|Металіст|2:0|Чернігів
9|27.09 14:00|Олександрія|1:1|Фенікс-Маріуполь
9|27.09 15:30|Нива|0:0|Агробізнес
9|28.09 13:00|Полісся-2|0:3|Колос-2
10|02.10 14:00|Полтава|3:2|Чернігів
10|03.10 11:00|Вікторія|1:0|Інгулець
10|03.10 12:30|Локомотив|3:3|Полісся-2
10|03.10 14:30|Прикарпаття-Благо|0:0|Металіст
10|04.10 12:30|Колос-2|0:2|Олександрія
10|04.10 13:30|Агробізнес|3:2|ЮКСА
10|04.10 15:00|Куликів-Білка|1:2|Пробій
10|05.10 15:30|Фенікс-Маріуполь|0:0|Нива
11|09.10 12:00|Металіст|2:2|Вікторія
11|10.10 11:30|Інгулець|0:1|Агробізнес
11|10.10 13:30|Пробій|3:2|Полтава
11|11.10 12:00|ЮКСА|1:2|Фенікс-Маріуполь
11|11.10 12:30|Прикарпаття-Благо|0:1|Чернігів
11|11.10 13:00|Олександрія|1:3|Локомотив
11|11.10 15:00|Нива|3:1|Колос-2
11|12.10 14:00|Полісся-2|1:4|Куликів-Білка`;
  const fix = (n: string) => (n === "Полтава" ? "СК Полтава" : n);
  const list = raw.trim().split("\n").map((line) => {
    const [rnd, dt, h, s, a] = line.split("|");
    const [d, t] = dt.split(" ");
    const [dd, mm] = d.split(".");
    const home = fix(h), away = fix(a);
    return mk("persha-liha", `persha-${rnd}`, +rnd, `${rnd}-й тур`, `2026-${mm}-${dd}`, t, home, away, s,
      home === "СК Полтава" ? { venue: POLTAVA_HOME } : {});
  });
  const probii = list.find((m) => m.homeTeam === "Пробій" && m.awayTeam === "СК Полтава")!;
  Object.assign(probii, {
    venue: "Городенка, «Пробій-Арена»",
    events: [
      { minute: "7", type: "goal", team: "home", player: "Андрій Фесенко" },
      { minute: "13", type: "penalty", team: "away", player: "Валерій Сад" },
      { minute: "25", type: "goal", team: "away", player: "Володимир Одарюк" },
      { minute: "41", type: "goal", team: "home", player: "Валентин Напуда" },
      { minute: "61", type: "goal", team: "home", player: "Ігор Гук" },
      { minute: "90+", type: "red", team: "away", player: "Богдан Кобзар" },
    ],
  });
  const che = list.find((m) => m.homeTeam === "СК Полтава" && m.awayTeam === "Чернігів")!;
  che.note = "З урахуванням перерв через повітряні тривоги матч тривав майже шість годин.";
  const future: Match[] = [
    mk("persha-liha", "persha-8", 8, "8-й тур", "2026-11-11", null, "Чернігів", "Інгулець", null, { status: "postponed", note: "Перенесений матч 8-го туру" }),
    mk("persha-liha", "persha-12", 12, "12-й тур", "2026-10-16", "13:00", "Агробізнес", "Металіст", null),
    mk("persha-liha", "persha-12", 12, "12-й тур", "2026-10-17", "11:00", "Вікторія", "Чернігів", null),
    mk("persha-liha", "persha-12", 12, "12-й тур", "2026-10-17", "14:00", "СК Полтава", "Прикарпаття-Благо", null, { venue: POLTAVA_HOME }),
    mk("persha-liha", "persha-13", 13, "13-й тур", "2026-10-24", null, "Полісся-2", "СК Полтава", null),
    mk("persha-liha", "persha-14", 14, "14-й тур", "2026-10-31", null, "СК Полтава", "Вікторія", null, { venue: POLTAVA_HOME }),
    mk("persha-liha", "persha-15", 15, "15-й тур", "2026-11-07", null, "Олександрія", "СК Полтава", null),
    mk("persha-liha", "persha-16", 16, "16-й тур", "2026-11-14", null, "СК Полтава", "Агробізнес", null, { venue: POLTAVA_HOME }),
    mk("persha-liha", "persha-17", 17, "17-й тур", "2026-11-21", null, "Нива", "СК Полтава", null),
    mk("persha-liha", "persha-18", 18, "18-й тур", "2026-11-28", null, "СК Полтава", "Фенікс-Маріуполь", null, { venue: POLTAVA_HOME }),
  ];
  return [...list, ...future];
}

function druhaMatches(): Match[] {
  const P = "СК Полтава-2";
  return [
    mk("druha-liha", "druha-1", 1, "1-й тур", "2026-08-02", null, P, "Металург", "0:0"),
    mk("druha-liha", "druha-2", 2, "2-й тур", "2026-08-08", null, "Пенуел", P, "1:2"),
    mk("druha-liha", "druha-3", 3, "3-й тур", "2026-08-16", null, P, "Ребел", "2:0"),
    mk("druha-liha", "druha-9", 9, "9-й тур", "2026-10-03", null, P, "Олександрія-2", "1:0"),
    mk("druha-liha", "druha-10", 10, "10-й тур", "2026-10-10", null, "Металург", P, null, { status: "finished", resultNote: "Поразка «Полтави-2»; рахунок — на сайті ПФЛ" }),
    mk("druha-liha", "druha-11", 11, "11-й тур", "2026-10-17", null, P, "Пенуел", null),
    mk("druha-liha", "druha-12", 12, "12-й тур", "2026-10-24", null, "Ребел", P, null),
    mk("druha-liha", "druha-15", 15, "15-й тур", "2026-11-14", null, P, "Авангард", null),
    mk("druha-liha", "druha-16", 16, "16-й тур", "2026-11-21", null, "Атлет", P, null),
    mk("druha-liha", "druha-17", 17, "17-й тур", "2026-11-28", null, P, "Карбон", null),
  ];
}

function uplMatches(): Match[] {
  const b = { broadcaster: "UPL.TV" };
  return [
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-09", "15:30", "Верес", "Шахтар", "0:3", b),
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-10", "13:00", "Колос", "Епіцентр", "3:1", b),
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-10", "13:00", "Чорноморець", "Харків", "1:2", b),
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-11", "13:00", "Динамо Київ", "Карпати", "1:0", b),
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-11", "13:00", "ЛНЗ", "Кудрівка", "2:1", b),
    mk("upl", "upl-8", 8, "8-й тур", "2026-10-11", "18:00", "Буковина", "Полісся", "2:2", b),
    mk("upl", "upl-9", 9, "9-й тур", "2026-10-17", "18:00", "Шахтар", "Колос", null, b),
    mk("upl", "upl-9", 9, "9-й тур", "2026-10-18", "13:00", "Полісся", "Динамо Київ", null, b),
    mk("upl", "upl-9", 9, "9-й тур", "2026-10-19", "13:00", "Харків", "Лівий Берег", null, b),
  ];
}

function cupMatches(): Match[] {
  return [
    mk("kubok-ukrainy", "kubok-kv", undefined, "Кваліфікаційний раунд", "2026-08-09", "14:00", "Ukrainian Team", "Решетилівка", "0:5"),
    mk("kubok-ukrainy", "kubok-1-32", undefined, "1/32 фіналу", "2026-08-22", "13:00", "Решетилівка", "Прикарпаття-Благо", "1:4"),
    mk("kubok-ukrainy", "kubok-1-32", undefined, "1/32 фіналу", "2026-08-22", "13:00", "Маяк", "СК Полтава", "0:0", { penalties: { home: 4, away: 2 }, venue: "Сарни" }),
  ];
}

function amateurMatches(): Match[] {
  const t = "chempionat-ukrainy-amatory";
  const ev = (list: [string, "goal" | "penalty", "home" | "away", string][]) => list.map(([minute, type, team, player]) => ({ minute, type, team, player }));
  return [
    mk(t, "amchu-1", 1, "1-й тур", "2026-08-15", "12:00", "Олімпія", "Агротех", "0:2", { venue: "Миргород, стадіон «Старт»", events: ev([["45", "goal", "away", "Чичиков"], ["81", "goal", "away", "Каранга"]]) }),
    mk(t, "amchu-1", 1, "1-й тур", "2026-08-16", "11:00", "Реал Фарма", "Рокита", "1:3", { venue: "Одеса, стадіон «Іван»", events: ev([["25", "goal", "away", "Андрій Дарда"], ["69", "goal", "away", "Андрій Дарда"], ["75", "goal", "away", "Коркішко"], ["81", "goal", "home", "Андрій Вареник"]]) }),
    mk(t, "amchu-2", 2, "2-й тур", "2026-08-29", "13:00", "Олімпія", "Будівельник", "1:0", { venue: "Миргород, стадіон «Старт»", events: ev([["90", "goal", "home", "Стрельцов"]]) }),
    mk(t, "amchu-2", 2, "2-й тур", "2026-08-30", "15:00", "IRON", "Рокита", "3:3", { venue: "Білозір’я, стадіон «Зоря»", events: ev([["9", "goal", "home", "Соколовський"], ["37", "penalty", "away", "Андрій Дарда"], ["45", "goal", "away", "Андрій Дарда"], ["63", "goal", "home", "Мачулян"], ["85", "goal", "away", "Заїченко"], ["90+2", "goal", "home", "Рудика"]]) }),
    mk(t, "amchu-2", 2, "2-й тур", "2026-08-30", "11:00", "Реал Фарма", "Агротех", "1:3", { venue: "Одеса, стадіон «Іван»" }),
    mk(t, "amchu-3", 3, "3-й тур", "2026-09-05", "10:00", "Будівельник", "Реал Фарма", "3:2", { venue: "Кременчук, «Шахтар Академі Арена»", events: ev([["28", "goal", "away", "Андрій Вареник"], ["39", "goal", "home", "Еррера"], ["78", "penalty", "home", "Максим Скрипкевич"], ["83", "goal", "away", "Андрій Вареник"], ["87", "goal", "home", "Кларо Каван"]]) }),
    mk(t, "amchu-3", 3, "3-й тур", "2026-09-05", "13:00", "Рокита", "Агротех", "3:1", { venue: "Рокита, «Арена Рокита»", events: ev([["44", "penalty", "home", "Андрій Дарда"], ["55", "goal", "home", "Коркішко"], ["61", "goal", "home", "Громенко"], ["90+2", "goal", "away", "Фальковський"]]) }),
    mk(t, "amchu-4", 4, "4-й тур", "2026-09-12", "14:00", "Агротех", "Будівельник", "3:5", { venue: "Тишківка, «Ліцей-Арена»", events: ev([["9", "goal", "home", "Сурженко"], ["30", "goal", "home", "Загальський"], ["40", "penalty", "home", "Загальський"], ["42", "goal", "away", "Максим Скрипкевич"], ["44", "goal", "away", "Кларо Каван"], ["54", "goal", "away", "Кларо Каван"], ["71", "goal", "away", "Максим Скрипкевич"], ["81", "penalty", "away", "Ногейра"]]) }),
    mk(t, "amchu-4", 4, "4-й тур", "2026-09-13", "10:00", "Реал Фарма", "IRON", "0:3", { venue: "Одеса, стадіон «Іван»" }),
    mk(t, "amchu-4", 4, "4-й тур", "2026-09-13", "13:00", "Рокита", "Олімпія", "1:1", { venue: "Рокита, «Арена Рокита»", events: ev([["53", "goal", "away", "Денис Почернін"], ["60", "goal", "home", "Мохначук"]]) }),
    mk("kubok-ukrainy-amatory", "amkubok-1-4", undefined, "1/4 фіналу, перший матч", "2026-10-07", "11:00", "Будівельник", "Олімпія", "0:3",
      { venue: "Кременчук, «Шахтар Академі Арена»", events: ev([["8", "goal", "away", "Ковтун"], ["20", "goal", "away", "Денис Почернін"], ["41", "goal", "away", "Кошман"]]) }),
    mk("kubok-ukrainy-amatory", "amkubok-1-4-2", undefined, "1/4 фіналу, матч-відповідь", "2026-10-14", null, "Олімпія", "Будівельник", null, { note: "Перший матч — 3:0 на користь «Олімпії»" }),
  ];
}

function oblastCupMatches(): Match[] {
  const t = "kubok-oblasti";
  const n = { note: "Базові дати матчів-відповідей — 17–18 жовтня" };
  return [
    mk(t, "kubokobl-1-4", undefined, "1/4 фіналу, матч-відповідь", "2026-10-17", null, "Лубни", "Олімпія", null, n),
    mk(t, "kubokobl-1-4", undefined, "1/4 фіналу, матч-відповідь", "2026-10-17", null, "Аврора", "Перемога", null, n),
    mk(t, "kubokobl-1-4", undefined, "1/4 фіналу, матч-відповідь", "2026-10-18", null, "Будівельник", "Молодь U-19", null, n),
    mk(t, "kubokobl-1-4", undefined, "1/4 фіналу, матч-відповідь", "2026-10-18", null, "Решетилівка", "Рокита", null, n),
  ];
}

/** Транслітерація за постановою КМУ № 55 (2010) */
export function translit(input: string): string {
  const map: Record<string, string> = {
    а: "a", б: "b", в: "v", г: "h", ґ: "g", д: "d", е: "e", є: "ie", ж: "zh", з: "z", и: "y", і: "i", ї: "i", й: "i",
    к: "k", л: "l", м: "m", н: "n", о: "o", п: "p", р: "r", с: "s", т: "t", у: "u", ф: "f", х: "kh", ц: "ts", ч: "ch",
    ш: "sh", щ: "shch", ь: "", ю: "iu", я: "ia", "’": "", "'": "", ы: "y", э: "e", ё: "io",
  };
  const start: Record<string, string> = { є: "ye", ї: "yi", й: "y", ю: "yu", я: "ya" };
  return input
    .toLowerCase()
    .replace(/зг/g, "zgh")
    .split(/([^a-zа-яіїєґ0-9’']+)/)
    .map((word) => word.split("").map((ch, i) => (i === 0 && start[ch] ? start[ch] : map[ch] ?? ch)).join(""))
    .join("")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}
