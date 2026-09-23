# Yadesh PRD

## Product positioning

Yadesh is a personalized Christian micro-learning and discovery platform for ages 16 to 40.

Core promise: "Trade scrolling. Feed your faith. Five minutes of something worth knowing."

Yadesh provides a quiet, focused alternative to mindless scrolling, helping Christians use small daily moments to discover meaningful ideas, stories, teachings, people, books, testimonies, and history from across the faith.

Yadesh is NOT:
- a generic Bible app
- a church website
- a sermon streaming platform
- a Christian social network
- a motivational quote app
- a miracle-only website

Yadesh IS:
- a modern Christian learning platform
- a daily antidote to doomscrolling
- a discovery engine for Christian knowledge
- an editorial experience
- a source-aware knowledge archive
- a structured series platform with 21-day guided journeys
- a social sharing tool (client-side quote card builder)
- a connected network of people, books, ideas, stories, teachings, and history

Core product loop: DISCOVER, LEARN, SAVE, GO DEEPER, RETURN

---

## Feature tiers

| Feature | Free | Premium |
|---|---|---|
| Full reading library | Yes | Yes |
| Save to personal library | Yes | Yes |
| Reading streak tracking | Yes | Yes |
| Share quote graphics | Yes | Yes |
| PWA (home screen install) | Yes | Yes |
| 21-day guided series | No | Yes |

Payment gateway: Pebble. Upgrade page at `/upgrade`.

---

## Architecture

### Layout

The authenticated app uses a persistent route group layout at `app/(product)/layout.tsx`. This mounts `ProductChrome`, a client component containing the sidebar, mobile header, and bottom nav. Next.js keeps it mounted across all navigations within the group, so only the page content slot swaps. This eliminates the white flash that occurred with the old per-page `ProductShell` pattern.

Product pages live at: `app/(product)/learn/`, `app/(product)/explore/`, `app/(product)/saved/`, `app/(product)/search/`, `app/(product)/people/`, `app/(product)/books/`, `app/(product)/you/`, `app/(product)/learn/[id]/`, `app/(product)/series/[slug]/`, `app/(product)/series/[slug]/day/[day]/`

Route groups are transparent to URLs. All routes remain unchanged.

### Middleware

`proxy.ts` at the project root is the Next.js 16 middleware file. It exports `async function proxy()`. It refreshes the Supabase session token on every request and writes updated auth cookies back to the response. This is required for authenticated Supabase calls to work. Do not rename it to `middleware.ts`.

---

## Navigation

### Public site
Floating pill nav via `SharedNav`. Transparent header, no full-width background strip. Desktop and mobile share the same component.

Routes: `/`, `/explore`, `/about`, `/login`, `/register`

### Authenticated app
Persistent left sidebar on desktop via `ProductChrome` route group layout. Fixed bottom nav on mobile.

Nav items: Home (`/learn`), Explore (`/explore`), Saved (`/saved`), People (`/people`), Books (`/books`), You (`/you`)

Series pages (`/series/*`) are accessible via the learn feed entry card and series progress card. Series is not a standalone nav item in v1.

Community is removed from v1 navigation. The `/community` route is archived for v2.

---

## Authentication

Implemented with Supabase Auth via `@supabase/ssr`.

- Email and password only (no email confirmation in v1)
- On register: `full_name` stored in `user_metadata`, profile row created automatically via database trigger
- On login: session stored in cookies via `@supabase/ssr`
- Password reset via `resetPasswordForEmail` with redirect to `/reset-password`
- Unauthenticated users hitting `/you` are redirected to `/login`

### Supabase client pattern
- `lib/supabase/client.ts`: browser client, instantiated with `useMemo` to avoid prerender errors
- `lib/supabase/server.ts`: server client using cookie store from `next/headers`
- `lib/supabase/admin.ts`: admin client using service role key, used only in API route handlers

---

## Database

### profiles
Auto-created on every registration via trigger on `auth.users`.

```sql
create table if not exists public.profiles (
  id          uuid primary key references auth.users (id) on delete cascade,
  full_name   text,
  email       text,
  bio         text,
  avatar_url  text,
  is_premium  boolean not null default false,
  created_at  timestamptz not null default now()
);
```

RLS: users can select and update their own row only.

Trigger:
```sql
create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name, email)
  values (new.id, new.raw_user_meta_data->>'full_name', new.email);
  return new;
end;
$$;

create or replace trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();
```

If `is_premium` column is missing from an existing deployment, run:
```sql
ALTER TABLE public.profiles ADD COLUMN IF NOT EXISTS is_premium boolean NOT NULL DEFAULT false;
```

### saved_items
One row per user per content item. Referenced by `content_key` which matches the `id` field in `lib/learning-data.ts`.

```sql
create table if not exists public.saved_items (
  id           uuid primary key default gen_random_uuid(),
  user_id      uuid not null references auth.users (id) on delete cascade,
  content_key  text not null,
  saved_at     timestamptz not null default now(),
  unique (user_id, content_key)
);
```

RLS policies required:
- SELECT: `auth.uid() = user_id`
- INSERT: `auth.uid() = user_id`
- DELETE: `auth.uid() = user_id`

The save hook uses `upsert` with `ignoreDuplicates: true` to prevent 409 conflict errors on the unique constraint.

### content (future)
Schema designed and ready. Not yet populated. Mirrors `lib/learning-data.ts`. Migration to Supabase planned once content volume justifies it.

---

## Content

### v1 reading content (static, lib/learning-data.ts)
21 curated pieces across five types.

Types: `IDEA`, `LIFE`, `BOOK`, `HISTORY`, `TEACHING`

Each card has the following fields:
- `id`: kebab-case unique string, used as `content_key` in `saved_items`. Never change.
- `type`: one of the types above
- `title`: card headline
- `source`: person or source name
- `body`: preview paragraph shown on the card
- `fullBody`: array of full paragraphs shown on the detail page
- `pullQuote`: one sentence shown as a blockquote on the detail page
- `takeaway`: one-line practical conclusion shown in the takeaway block
- `time`: read time string (e.g. "4 min read")

People covered: C.S. Lewis, Dietrich Bonhoeffer, Corrie ten Boom, Oswald Chambers, William Wilberforce, Fanny Crosby, Augustine of Hippo, Charles Spurgeon, Smith Wigglesworth

Books covered: Mere Christianity, The Cost of Discipleship, The Pursuit of God, Confessions, My Utmost for His Highest

History: Council of Nicaea (325 AD), The Reformation (1517)

### v1 series content (static, lib/series-data-*.ts)
Three 21-day guided series for premium members.

- 21 Days of Breakthrough (`slug: 'breakthrough'`)
- 21 Days of Prayer (`slug: 'prayer'`)
- 21 Days of the Kingdom of God (`slug: 'kingdom-of-god'`)

Each series day has: `day`, `title`, `source`, `body`, `pullQuote`, `fullBody` (array), `takeaway`, and optionally `cardId`.

Series progress is tracked in `localStorage` via `hooks/use-series-progress.ts`. No database writes required. Free-tier safe.

Content principles:
- Not dominated by healing and miracles. Range across theology, biography, history, character, and practical faith.
- Every piece is source-aware. Reported testimonies are labelled as such.
- No lorem ipsum. All content is realistic, editorial, and human.
- Public copy should speak to a person in a real spiritual or practical situation, not to an abstract audience.
- Prefer concrete descriptions over generic phrases such as "go deeper", "meaningful", "timeless", "journey", and "framework" when they add no information.
- Do not promise transformation, breakthrough, healing, emotional outcomes, or lasting habits. Describe what the reading offers and let the reader decide what it means for them.
- Attribute testimonies, miracles, and historical claims. Use "reported", "according to", and visible source information when independent verification is not established.
- Keep Premium claims accurate: the full reading library is free; Premium adds 21-day guided series and unlimited bookmarks.
- Avoid corporate conversion language such as "unlock", "all-access", "zero risk", "instant activation", and "bank-grade".
- Keep copy ecumenically clear when content reflects charismatic, Word of Faith, or other specific Christian traditions.
- No em dashes in any content, copy, metadata, comments, or documentation.

### Card colour by type

| Type | Background |
|---|---|
| LIFE | `#ede5f8` (soft purple) |
| IDEA | `#edfba0` (lime tint) |
| HISTORY | `#e4e2ff` (periwinkle tint) |
| BOOK | `#fdf0d8` (warm amber) |
| TEACHING | `#d8f5e4` (green tint) |
| STORY | `#fff` |

### Content range (required for v1 identity)
The product must not read as a Pentecostal or Word of Faith product exclusively. Content spans reformed theology, evangelical biography, church history, and Christian thought across traditions.

---

## Reading detail page

Each card links to `/learn/[id]`. The detail page at `app/(product)/learn/[id]/page.tsx` renders:
- Back link and type badge
- Coloured hero header (colour matched to card type)
- Pull quote block
- Full body paragraphs from `card.fullBody`
- Key takeaway block
- Save, mark-as-read, and share quote action buttons (`ReadingDetailActions` client component)
- Previous and next card navigation

All detail pages are pre-rendered at build time via `generateStaticParams`.

---

## Series pages

### Series overview (`/series/[slug]`)
Server component at `app/(product)/series/[slug]/page.tsx`.
- Checks `profiles.is_premium`. Redirects to `/upgrade` if false.
- Renders series title, subtitle, theme header, `SeriesProgress` (client), and list of 21 days.
- Days lock sequentially: each day is only clickable if the previous is complete.

### Series day reading (`/series/[slug]/day/[day]`)
Server component at `app/(product)/series/[slug]/day/[day]/page.tsx`.
- Checks `profiles.is_premium`. Redirects to `/upgrade` if false.
- Renders: series nav, day label, theme hero, pull quote, full body, takeaway, `SeriesDayActions`.
- `SeriesDayActions` receives `title`, `quote`, and `source` to power the share modal.

Both routes use `generateStaticParams` for build-time pre-rendering.

---

## Share quote feature

`components/share-quote-modal.tsx` generates high-resolution social media graphics 100% client-side.

- Square format: 1080x1080 px. Optimized for X, WhatsApp messages, Instagram feed.
- Story format: 1080x1920 px. Optimized for Instagram Stories, WhatsApp Status.
- Three themes: Periwinkle (dark), Lime Dark (dark editorial), Warm Cream (light).
- Share: uses `navigator.share` with file blob on supported mobile browsers. Falls back to PNG download.
- Zero storage, zero Supabase egress, zero server calls. Entirely on-device.
- Available on both reading detail pages and series day pages.

---

## Save feature

Implemented via `hooks/use-save.ts`.

- Uses `upsert` with `onConflict: 'user_id,content_key'` and `ignoreDuplicates: true`
- Optimistic UI update on toggle
- Rollback on failure
- Unauthenticated users are redirected to `/login` on save attempt

Save buttons are present on: `LearningCard` (grid and saved page), `ReadingDetailActions` (detail page)

---

## Profile feature

Located at `/you`. Server-side rendered, redirects unauthenticated users to `/login`.

Data fetched in parallel:
- `profiles` row for the current user
- `saved_items` count

Fallback: if the trigger has not yet created a profile row, the page falls back to `user_metadata` from the auth session.

Profile card uses `--lavender` background to match the app theme.

Edit: inline form updates `full_name` and `bio` via Supabase client. Refreshes the page on success.

The profile card footer has two centered pill buttons: Edit profile (left) and Sign out (right).

Sign out: clears session and redirects to `/`.

---

## PWA

Installable PWA with web app manifest at `public/manifest.json` and service worker at `public/sw.js`.
- Caching strategy: Stale-While-Revalidate with `yadesh-pages-v3`.
- Instant route transitions from cache, background updates without blocking.
- Pre-hydration branded splash screen in `app/layout.tsx` for immediate native launch feel.
- Install prompt: `components/mobile-pwa-prompt.tsx` mounted globally in `app/layout.tsx`.
  - Strict mobile and tablet detection: `pointer: coarse` + UA string. PCs are excluded.
  - Android: uses `beforeinstallprompt` for one-tap install.
  - iOS: shows manual Share > Add to Home Screen instructions.
  - 7-day cooldown after user dismisses.

---

## Supabase keep-alive

Free-tier Supabase projects pause after 7 days of inactivity.

`app/api/cron/keepalive/route.ts` exposes a GET endpoint that runs a minimal `profiles` query (`.select('id').limit(1)`) and returns `{ status: 'active', database: 'connected', latencyMs, timestamp }`.

Register this endpoint with a daily free cron service such as cron-job.org or Vercel Cron to prevent project pausing.

---

## Pages

| Route | Type | Description |
|---|---|---|
| `/` | Static | Public marketing homepage |
| `/learn` | Static | Authenticated home feed with daily card and series entry |
| `/learn/[id]` | Static (pre-rendered) | Full reading detail page |
| `/series/[slug]` | Static (pre-rendered) | 21-day series overview, premium only |
| `/series/[slug]/day/[day]` | Static (pre-rendered) | Series day reading, premium only |
| `/upgrade` | Static | Premium upgrade page with Pebble payment |
| `/explore` | Static | Topic and content discovery |
| `/saved` | Dynamic | Personal library, fetches saved_items |
| `/you` | Dynamic | Profile view, edit, sign out |
| `/login` | Static | Sign in form |
| `/register` | Static | Register form |
| `/forgot-password` | Static | Password reset request |
| `/people` | Static | Christian figures grid |
| `/books` | Static | Book library grid |
| `/search` | Dynamic | Global search |
| `/about` | Static | About page with FAQ |
| `/community` | Static | Archived, not in nav |
| `/archive` | Static | Redirects to `/explore` |
| `/api/cron/keepalive` | API | Supabase keep-alive endpoint |

---

## Navigation constraints

- `.app-header` must remain transparent. No full-width background strip.
- `.desktop-nav` owns all visible surface, radius, border, and shadow.
- Page or hero background continues behind the nav.
- Clicking outside any open navigation menu closes it automatically.
- No horizontal overflow at any breakpoint.
- Hamburger button preserves `aria-expanded` and keyboard accessibility.

---

## Copy rules

- No em dashes anywhere: not in UI text, card content, metadata titles, code comments, or documentation.
- Use `|` as the separator in page `<title>` metadata (e.g. `Card Title | Yadesh`).
- Preferred CTAs: Start reading for free, Read the summary, Explore this person, Read the source, Save this reading, Continue learning, View all, See Premium plans.
- Avoid unsupported feature claims. The full reading library is free. Premium adds guided 21-day series and unlimited bookmarks.
- Avoid language that sounds like a guarantee or a sales template. Replace "unlock", "all-access", "zero risk", "instant activation", and "bank-grade" with plain descriptions.
- Use modest, human language that acknowledges the reader's situation without claiming a spiritual result for them.
- Avoid: Enter the archive, Save to Altar, Choose your pressure.
- Footer line: Read. Keep. Remember.
- Tagline: Trade scrolling. Feed your faith. Five minutes of something worth knowing.

---

## Design constraints

- Do not reproduce the narrow mobile-like column on desktop. Use the full canvas.
- Interface stays mostly off-white and near-black. Lime and violet are intentional accents.
- No gradients everywhere, no excessive glassmorphism, no generic SaaS blue.
- Cards should not be overloaded. Use visual hierarchy.
- Animations should be restrained. The product should feel calm and intentional, not gamified.
- Profile card uses `--lavender` (`#e9c7f5`) as background.

---

## v2 backlog

- Community feature (prayer, book requests, testimonies)
- People detail pages as knowledge hubs
- Book detail pages with key ideas and related content
- Content migration from static files to Supabase content table
- Avatar upload to Supabase Storage
- Push notifications for daily reading reminders
- Offline saved content sync
- Additional 21-day series (suggested: Faith, Healing, Discipleship)
